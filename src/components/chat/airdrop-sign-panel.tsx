import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExternalLink, PenLine } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { AirdropMultisenderContract } from "@/config";
import { useChainContracts } from "@/lib/hooks/useChainContracts";
import { useAccount, useConnectModal, useReadContract, useWriteContract } from "@/lib/papi/hooks";
import { getFriendlyTxErrorMessage } from "@/lib/utils/tx-errors";
import { useChatbotActionStore } from "@/lib/store/chatbot-action-store";
import { useChatbotTxStore } from "@/lib/store/chatbot-tx-store";
import type { ActionDraft } from "@/lib/chat/types";
import { erc20Abi, formatUnits, maxUint256, parseUnits } from "viem";

function buildExplorerTxUrl(explorerUrl: string, txHash: string) {
  return `${explorerUrl}/tx/${txHash}`;
}

function isUserCancelled(message: string) {
  return /cancel(?:led)?|rejected|denied/i.test(message);
}

function formatTokenLabel(token: string) {
  return `${token.slice(0, 6)}...${token.slice(-4)}`;
}

function parseRecipientLines(recipientsData: string, decimals: number) {
  const errors: string[] = [];
  const recipients: `0x${string}`[] = [];
  const amounts: bigint[] = [];

  recipientsData.split("\n").forEach((line, index) => {
    const trimmedLine = line.trim();
    if (!trimmedLine) return;

    const parts = trimmedLine.split(",");
    if (parts.length !== 2) {
      errors.push(`Line ${index + 1}: expected address,amount`);
      return;
    }

    const recipient = parts[0].trim();
    const amountText = parts[1].trim();

    if (!/^0x[a-fA-F0-9]{40}$/.test(recipient)) {
      errors.push(`Line ${index + 1}: invalid address`);
      return;
    }

    try {
      const amount = parseUnits(amountText, decimals);
      if (amount <= 0n) {
        errors.push(`Line ${index + 1}: invalid amount`);
        return;
      }

      recipients.push(recipient as `0x${string}`);
      amounts.push(amount);
    } catch {
      errors.push(`Line ${index + 1}: invalid amount`);
    }
  });

  return { recipients, amounts, errors };
}

export function AirdropSignPanel({
  draft,
  onAppendAssistantMessage,
}: {
  draft: ActionDraft;
  onAppendAssistantMessage: (content: string) => void;
}) {
  const navigate = useNavigate();
  const { address, ss58Address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { airdropMultisender, explorerUrl } = useChainContracts();
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
  const { writeContractAsync: approveAsync } = useWriteContract();
  const { writeContractAsync: sendAsync } = useWriteContract();
  const [hasSignedOnce, setHasSignedOnce] = useState(false);
  const [recipientsData, setRecipientsData] = useState(draft.prefill.recipientsData?.trim() ?? "");
  const lastHandledSignRequestId = useRef(0);

  const tokenAddress = draft.prefill.token?.trim() as `0x${string}` | undefined;
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

  const decimals = tokenDecimals ?? 18;
  const parsedRecipients = useMemo(
    () => parseRecipientLines(recipientsData, decimals),
    [decimals, recipientsData],
  );

  const totalAmount = useMemo(
    () => parsedRecipients.amounts.reduce((acc, amount) => acc + amount, 0n),
    [parsedRecipients.amounts],
  );

  const { data: tokenBalance } = useReadContract({
    abi: erc20Abi,
    address: tokenAddress,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(address && isValidTokenAddress),
    },
  });

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    abi: erc20Abi,
    address: tokenAddress,
    functionName: "allowance",
    args: address ? [address, airdropMultisender] : undefined,
    query: {
      enabled: Boolean(address && isValidTokenAddress),
    },
  });

  const needsApproval = useMemo(() => {
    if (allowance === undefined) return totalAmount > 0n;
    return allowance < totalAmount;
  }, [allowance, totalAmount]);

  const hasSufficientBalance = useMemo(() => {
    if (totalAmount === 0n) return true;
    return tokenBalance !== undefined && tokenBalance >= totalAmount;
  }, [tokenBalance, totalAmount]);

  const isBusy =
    phase === "checking_allowance" ||
    phase === "approving" ||
    phase === "sending";

  const handleManualPreview = () => {
    setPreviewDraft({
      ...draft,
      prefill: {
        ...draft.prefill,
        recipientsData,
      },
    });
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

    if (parsedRecipients.recipients.length === 0) {
      updateFlow({ phase: "error", errorMessage: "Add at least one recipient." });
      onAppendAssistantMessage("Add at least one valid recipient before signing.");
      return;
    }

    if (parsedRecipients.errors.length > 0) {
      updateFlow({ phase: "error", errorMessage: "Fix the recipient list first." });
      onAppendAssistantMessage("That recipient list still has errors. Tighten it up, then tap Sign now again.");
      return;
    }

    if (!hasSufficientBalance) {
      updateFlow({ phase: "error", errorMessage: "Insufficient token balance." });
      onAppendAssistantMessage("That wallet does not hold enough tokens for this airdrop.");
      return;
    }

    try {
      setHasSignedOnce(true);
      updateFlow({
        phase: "checking_allowance",
        approvalTxHash: null,
        primaryTxHash: null,
        resultAddress: null,
        errorMessage: null,
      });
      onAppendAssistantMessage("Checking allowance…");

      if (needsApproval) {
        updateFlow({ phase: "approving" });
        onAppendAssistantMessage("Approving token…");

        const approveHash = await approveAsync({
          address: tokenAddress,
          abi: erc20Abi,
          functionName: "approve",
          args: [airdropMultisender, maxUint256],
        });

        updateFlow({ phase: "approving", approvalTxHash: approveHash });
        await refetchAllowance();
        onAppendAssistantMessage("Approved.");
      }

      updateFlow({ phase: "sending" });
      onAppendAssistantMessage("Sending airdrop…");

      const sendHash = await sendAsync({
        address: airdropMultisender,
        abi: AirdropMultisenderContract.abi,
        functionName: "sendERC20",
        args: [
          tokenAddress,
          parsedRecipients.recipients,
          parsedRecipients.amounts,
        ],
      });

      updateFlow({ phase: "success", primaryTxHash: sendHash, errorMessage: null });
      onAppendAssistantMessage(`Airdrop sent. [View tx](${buildExplorerTxUrl(explorerUrl, sendHash)})`);
    } catch (error) {
      const friendlyMessage = getFriendlyTxErrorMessage(
        error,
        phase === "approving" ? "Approval" : "Airdrop",
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
    airdropMultisender,
    approveAsync,
    explorerUrl,
    hasSufficientBalance,
    needsApproval,
    onAppendAssistantMessage,
    openConnectModal,
    parsedRecipients.amounts,
    parsedRecipients.errors.length,
    parsedRecipients.recipients,
    phase,
    recipientsData,
    refetchAllowance,
    sendAsync,
    ss58Address,
    tokenAddress,
    updateFlow,
  ]);

  useEffect(() => {
    if (signRequestId === 0) return;
    if (lastHandledSignRequestId.current === signRequestId) return;
    if (phase === "checking_allowance" || phase === "approving" || phase === "sending") return;

    lastHandledSignRequestId.current = signRequestId;
    void handleSignNow();
  }, [handleSignNow, phase, signRequestId]);

  const primaryLabel = !ss58Address || !address
    ? "Connect QF wallet"
    : phase === "approving"
      ? "Approving…"
      : phase === "sending"
        ? "Sending…"
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
            <p className="text-[9px] font-black uppercase tracking-[0.14em] text-black/45">Recipients</p>
            <p className="truncate text-xs font-bold text-black">{parsedRecipients.recipients.length}</p>
          </div>
          <div className="min-w-0">
            <p className="text-[9px] font-black uppercase tracking-[0.14em] text-black/45">Total</p>
            <p className="truncate text-xs font-bold text-black">
              {totalAmount > 0n ? `${Number(formatUnits(totalAmount, decimals)).toLocaleString()} ${tokenSymbol ?? "tokens"}` : "—"}
            </p>
          </div>
          <div className="min-w-0">
            <p className="text-[9px] font-black uppercase tracking-[0.14em] text-black/45">Status</p>
            <p className="truncate text-xs font-bold text-black">{needsApproval ? "Needs approval" : "Ready"}</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-[9px] font-black uppercase tracking-[0.14em] text-black/45">
            Recipients list
          </p>
          <Textarea
            value={recipientsData}
            onChange={(event) => setRecipientsData(event.target.value.slice(0, 4000))}
            placeholder={`0x1234...abcd,100\n0x5678...efgh,200`}
            className="min-h-[120px] border-[2px] border-black bg-white font-mono text-xs"
          />
          <p className="text-[10px] font-bold text-black/55">
            One address and amount per line. Example: 0x123…,100
          </p>
          {parsedRecipients.errors.length > 0 && (
            <div className="rounded-[14px] border border-red-300 bg-red-50 px-3 py-2 text-[11px] font-bold text-red-700">
              {parsedRecipients.errors.slice(0, 3).join(" ")}
            </div>
          )}
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
                {phase === "sending" && "Airdrop transaction sent."}
                {phase === "success" && "Airdrop complete."}
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
                  View airdrop <ExternalLink className="h-3 w-3" />
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
