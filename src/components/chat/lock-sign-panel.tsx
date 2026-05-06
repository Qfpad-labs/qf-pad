import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExternalLink, PenLine } from "lucide-react";
import { TokenLocker } from "@/config";
import { useChainContracts } from "@/lib/hooks/useChainContracts";
import { useAccount, useConnectModal, useReadContract, useWriteContract } from "@/lib/papi/hooks";
import { contractRead } from "@/lib/papi/contract-read";
import { isRetryableSigningError } from "@/lib/papi/sign-retry";
import { getFriendlyTxErrorMessage } from "@/lib/utils/tx-errors";
import { useChatbotActionStore } from "@/lib/store/chatbot-action-store";
import { useChatbotTxStore } from "@/lib/store/chatbot-tx-store";
import type { ActionDraft } from "@/lib/chat/types";
import { erc20Abi, maxUint256, parseUnits, type Abi } from "viem";

function isUserCancelled(message: string) {
  return /cancel(?:led)?|rejected|denied/i.test(message);
}

function formatTokenLabel(token: string) {
  return `${token.slice(0, 6)}...${token.slice(-4)}`;
}

function buildExplorerTxUrl(explorerUrl: string, txHash: string) {
  return `${explorerUrl}/tx/${txHash}`;
}

function delay(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function lockIdKey(id: bigint) {
  return id.toString();
}

function getLockField(lock: unknown, key: "token" | "amount" | "name") {
  if (!lock || typeof lock !== "object") return undefined;

  const asRecord = lock as Record<string, unknown>;
  if (asRecord[key] !== undefined) return asRecord[key];

  if (Array.isArray(lock)) {
    if (key === "token") return lock[0];
    if (key === "amount") return lock[2];
    if (key === "name") return lock[6];
  }

  return undefined;
}

export function LockSignPanel({
  draft,
  onAppendAssistantMessage,
}: {
  draft: ActionDraft;
  onAppendAssistantMessage: (content: string) => void;
}) {
  const navigate = useNavigate();
  const { tokenLocker, explorerUrl } = useChainContracts();
  const { address, ss58Address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const setPreviewDraft = useChatbotActionStore((state) => state.setDraft);
  const {
    phase,
    approvalTxHash,
    primaryTxHash,
    errorMessage,
    signRequestId,
    updateFlow,
    clearFlow,
  } = useChatbotTxStore();
  const [hasSignedOnce, setHasSignedOnce] = useState(false);
  const lastHandledSignRequestId = useRef(0);

  const tokenAddress = draft.prefill.token?.trim() as `0x${string}` | undefined;
  const amountText = draft.prefill.amount?.trim() ?? "";
  const durationText = draft.prefill.duration?.trim() ?? "";
  const lockName = draft.prefill.name?.trim() || draft.prefill.description?.trim() || "Token lock";
  const descriptionText = draft.prefill.description?.trim() || draft.prefill.name?.trim() || "";

  const isValidTokenAddress = Boolean(tokenAddress && /^0x[a-fA-F0-9]{40}$/.test(tokenAddress));

  const { data: tokenDecimals } = useReadContract({
    abi: erc20Abi,
    address: tokenAddress,
    functionName: "decimals",
    query: {
      enabled: Boolean(address && isValidTokenAddress),
    },
  });

  const { data: tokenSymbol } = useReadContract({
    abi: erc20Abi,
    address: tokenAddress,
    functionName: "symbol",
    query: {
      enabled: Boolean(address && isValidTokenAddress),
    },
  });

  const parsedAmount = useMemo(() => {
    if (!amountText || tokenDecimals === undefined) return null;
    try {
      return parseUnits(amountText, tokenDecimals);
    } catch {
      return null;
    }
  }, [amountText, tokenDecimals]);

  const durationDays = useMemo(() => {
    const parsed = Number.parseInt(durationText, 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
  }, [durationText]);

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    abi: erc20Abi,
    address: tokenAddress,
    functionName: "allowance",
    args: address ? [address, tokenLocker] : undefined,
    query: {
      enabled: Boolean(address && isValidTokenAddress),
    },
  });

  const { data: tokenBalance } = useReadContract({
    abi: erc20Abi,
    address: tokenAddress,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(address && isValidTokenAddress),
    },
  });

  const { writeContractAsync: approveAsync } = useWriteContract();
  const { writeContractAsync: lockAsync } = useWriteContract();

  const readLockIds = useCallback(async () => {
    if (!address || !ss58Address) return [];

    const value = await contractRead({
      address: tokenLocker,
      abi: TokenLocker.abi as Abi,
      functionName: "locksOfOwner",
      args: [address],
      callerAddress: ss58Address,
    });

    return Array.isArray(value) ? (value as bigint[]) : [];
  }, [address, ss58Address, tokenLocker]);

  const waitForMatchingLock = useCallback(
    async (beforeIds: Set<string>) => {
      if (!tokenAddress || parsedAmount === null || !address || !ss58Address) {
        return false;
      }

      for (let attempt = 0; attempt < 8; attempt += 1) {
        await delay(2500);

        const ids = await readLockIds();
        const newIds = ids.filter((id) => !beforeIds.has(lockIdKey(id)));

        for (const id of newIds) {
          const lock = await contractRead({
            address: tokenLocker,
            abi: TokenLocker.abi as Abi,
            functionName: "getLock",
            args: [id],
            callerAddress: ss58Address,
          });

          const lockToken = String(getLockField(lock, "token") ?? "").toLowerCase();
          const lockAmount = getLockField(lock, "amount");
          const lockNameValue = String(getLockField(lock, "name") ?? "");

          if (
            lockToken === tokenAddress.toLowerCase() &&
            lockAmount === parsedAmount &&
            (!lockName || lockNameValue === lockName)
          ) {
            return true;
          }
        }
      }

      return false;
    },
    [address, lockName, parsedAmount, readLockIds, ss58Address, tokenAddress, tokenLocker],
  );

  const isBusy =
    phase === "checking_allowance" ||
    phase === "approving" ||
    phase === "locking";

  const handleManualPreview = () => {
    setPreviewDraft(draft);
    navigate(draft.targetRoute);
  };

  const handleSignNow = useCallback(async () => {
    if (!ss58Address || !address) {
      openConnectModal();
      return;
    }

    if (!isValidTokenAddress || !tokenAddress) {
      updateFlow({ phase: "error", errorMessage: "That token address looks off." });
      onAppendAssistantMessage("That token address looks off. Update it in manual preview and try again.");
      return;
    }

    if (tokenDecimals === undefined || parsedAmount === null) {
      updateFlow({ phase: "error", errorMessage: "Token details are still loading." });
      onAppendAssistantMessage("Token details are still loading. Give it a second, then tap Sign now again.");
      return;
    }

    if (!durationDays) {
      updateFlow({ phase: "error", errorMessage: "Lock duration is missing." });
      onAppendAssistantMessage("The lock duration is missing. Open manual preview and fix it there.");
      return;
    }

    if (tokenBalance !== undefined && tokenBalance < parsedAmount) {
      updateFlow({ phase: "error", errorMessage: "Insufficient token balance." });
      onAppendAssistantMessage("That wallet does not hold enough tokens for this lock.");
      return;
    }

    let currentStep: "approval" | "lock" = "lock";
    let beforeLockIds = new Set<string>();

    try {
      setHasSignedOnce(true);
      updateFlow({
        phase: "checking_allowance",
        approvalTxHash: null,
        primaryTxHash: null,
        errorMessage: null,
        resultAddress: null,
      });
      onAppendAssistantMessage("Checking allowance…");

      if (allowance === undefined || allowance < parsedAmount) {
        currentStep = "approval";
        updateFlow({ phase: "approving" });
        onAppendAssistantMessage("Approving token…");

        const approveHash = await approveAsync({
          address: tokenAddress,
          abi: erc20Abi,
          functionName: "approve",
          args: [tokenLocker, maxUint256],
        });

        updateFlow({ phase: "approving", approvalTxHash: approveHash });
        await refetchAllowance();
        onAppendAssistantMessage("Approved.");
      }

      updateFlow({ phase: "locking" });
      onAppendAssistantMessage("Locking…");
      beforeLockIds = new Set((await readLockIds()).map(lockIdKey));

      const lockHash = await lockAsync({
        address: tokenLocker,
        abi: TokenLocker.abi as Abi,
        functionName: "lockTokens",
        args: [
          tokenAddress,
          parsedAmount,
          BigInt(durationDays * 24 * 60 * 60),
          lockName,
          descriptionText,
        ],
      });

      updateFlow({ phase: "success", primaryTxHash: lockHash, errorMessage: null });
      onAppendAssistantMessage(`Locked. [View tx](${buildExplorerTxUrl(explorerUrl, lockHash)})`);
    } catch (error) {
      if (currentStep === "lock" && isRetryableSigningError(error)) {
        updateFlow({ phase: "checking_allowance", errorMessage: null });
        onAppendAssistantMessage("Wallet response was unstable. Checking chain…");

        const foundLock = await waitForMatchingLock(beforeLockIds);
        if (foundLock) {
          updateFlow({ phase: "success", errorMessage: null });
          onAppendAssistantMessage("Locked. I found the lock on-chain.");
          return;
        }

        const pendingMessage = "I could not confirm the lock yet. Tap Sign now to retry.";
        updateFlow({ phase: "error", errorMessage: pendingMessage });
        onAppendAssistantMessage(pendingMessage);
        return;
      }

      const friendlyMessage = getFriendlyTxErrorMessage(
        error,
        currentStep === "approval" ? "Approval" : "Lock",
      );

      if (isUserCancelled(friendlyMessage)) {
        updateFlow({ phase: "error", errorMessage: "Sign was cancelled." });
        onAppendAssistantMessage("Sign was cancelled — tap Sign now if you want to retry.");
        return;
      }

      updateFlow({ phase: "error", errorMessage: friendlyMessage });
      onAppendAssistantMessage(friendlyMessage);
    }
  }, [
    address,
    allowance,
    approveAsync,
    descriptionText,
    durationDays,
    explorerUrl,
    lockAsync,
    lockName,
    onAppendAssistantMessage,
    openConnectModal,
    parsedAmount,
    readLockIds,
    refetchAllowance,
    ss58Address,
    tokenAddress,
    tokenBalance,
    tokenDecimals,
    tokenLocker,
    updateFlow,
    waitForMatchingLock,
  ]);

  useEffect(() => {
    if (signRequestId === 0) return;
    if (lastHandledSignRequestId.current === signRequestId) return;
    if (phase === "checking_allowance" || phase === "approving" || phase === "locking") return;

    lastHandledSignRequestId.current = signRequestId;
    void handleSignNow();
  }, [handleSignNow, phase, signRequestId]);

  const primaryLabel = !ss58Address || !address
    ? "Connect QF wallet"
    : phase === "approving"
      ? "Approving…"
      : phase === "locking"
        ? "Locking…"
        : phase === "checking_allowance"
          ? "Checking…"
          : hasSignedOnce && phase === "error"
            ? "Retry sign"
            : "Sign now";

  return (
    <div className="mt-3 rounded-[20px] border-[2px] border-black bg-[#FFF7E8] px-3 py-3">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <PenLine className="h-4 w-4" />
          <p className="text-[11px] font-black uppercase tracking-[0.12em] text-black/60">
            Sign to continue
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-2.5">
          <div className="min-w-0">
            <p className="text-[9px] font-black uppercase tracking-[0.14em] text-black/45">Token</p>
            <p className="truncate text-xs font-bold text-black">
              {tokenSymbol ? String(tokenSymbol) : formatTokenLabel(tokenAddress ?? "")}
            </p>
            {tokenSymbol && tokenAddress && (
              <p className="truncate font-mono text-[10px] text-black/45">{formatTokenLabel(tokenAddress)}</p>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-[9px] font-black uppercase tracking-[0.14em] text-black/45">Amount</p>
            <p className="truncate text-xs font-bold text-black">{amountText || "—"}</p>
          </div>
          <div className="min-w-0">
            <p className="text-[9px] font-black uppercase tracking-[0.14em] text-black/45">Duration</p>
            <p className="truncate text-xs font-bold text-black">
              {durationText ? `${durationText} day${durationText === "1" ? "" : "s"}` : "—"}
            </p>
          </div>
          <div className="min-w-0">
            <p className="text-[9px] font-black uppercase tracking-[0.14em] text-black/45">Label</p>
            <p className="truncate text-xs font-bold text-black">{lockName}</p>
          </div>
        </div>
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => void handleSignNow()}
            disabled={isBusy}
            className="inline-flex w-full items-center justify-center rounded-full border-[2px] border-black bg-[#42C9FF] px-4 py-2.5 text-sm font-black uppercase tracking-[0.08em] text-black shadow-[3px_3px_0_rgba(0,0,0,1)] transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {primaryLabel}
          </button>
          <button
            type="button"
            onClick={handleManualPreview}
            className="block w-full text-center text-[11px] font-black uppercase tracking-[0.12em] text-black/55 underline underline-offset-2 hover:text-black"
          >
            Manual preview
          </button>
        </div>

        {(phase !== "ready" || approvalTxHash || primaryTxHash || errorMessage) && (
          <div className="rounded-[16px] border border-black/15 bg-white px-3 py-2.5 text-xs font-bold text-black/70">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <span>
                {phase === "checking_allowance" && "Checking allowance…"}
                {phase === "approving" && "Approval sent."}
                {phase === "locking" && "Lock transaction sent."}
                {phase === "success" && "Lock complete."}
                {phase === "error" && (errorMessage || "Something went wrong.")}
              </span>
              {approvalTxHash && (
                <a
                  href={buildExplorerTxUrl(explorerUrl, approvalTxHash)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 underline underline-offset-2"
                >
                  View approval <ExternalLink className="h-3 w-3" />
                </a>
              )}
              {primaryTxHash && (
                <a
                  href={buildExplorerTxUrl(explorerUrl, primaryTxHash)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 underline underline-offset-2"
                >
                  View lock <ExternalLink className="h-3 w-3" />
                </a>
              )}
              {(phase === "success" || phase === "error") && (
                <button
                  type="button"
                  onClick={clearFlow}
                  className="ml-auto inline-flex items-center justify-center rounded-full border-[2px] border-black bg-white px-3.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-black shadow-[2px_2px_0_rgba(0,0,0,1)] transition-transform hover:-translate-y-0.5"
                >
                  Done
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
