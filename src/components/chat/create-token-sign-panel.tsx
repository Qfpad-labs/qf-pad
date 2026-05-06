import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, ExternalLink, PenLine } from "lucide-react";
import { TokenFactory } from "@/config";
import { useChainContracts } from "@/lib/hooks/useChainContracts";
import { useAccount, useConnectModal, useWriteContract } from "@/lib/papi/hooks";
import { contractRead } from "@/lib/papi/contract-read";
import { getFriendlyTxErrorMessage } from "@/lib/utils/tx-errors";
import { useChatbotActionStore } from "@/lib/store/chatbot-action-store";
import { useChatbotTxStore } from "@/lib/store/chatbot-tx-store";
import type { ActionDraft } from "@/lib/chat/types";
import { parseUnits, type Address } from "viem";

const TOKEN_TYPE_LABELS: Record<string, string> = {
  "0": "Plain",
  "1": "Mintable",
  "2": "Burnable",
  "3": "Taxable",
  "4": "Non-mintable",
};

function buildExplorerTxUrl(explorerUrl: string, txHash: string) {
  return `${explorerUrl}/tx/${txHash}`;
}

function buildExplorerAddressUrl(explorerUrl: string, address: string) {
  return `${explorerUrl}/address/${address}`;
}

function delay(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function isUserCancelled(message: string) {
  return /cancel(?:led)?|rejected|denied/i.test(message);
}

export function CreateTokenSignPanel({
  draft,
  onAppendAssistantMessage,
}: {
  draft: ActionDraft;
  onAppendAssistantMessage: (content: string) => void;
}) {
  const navigate = useNavigate();
  const { tokenFactory, explorerUrl } = useChainContracts();
  const { address, ss58Address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const setPreviewDraft = useChatbotActionStore((state) => state.setDraft);
  const {
    phase,
    primaryTxHash,
    resultAddress,
    errorMessage,
    signRequestId,
    updateFlow,
    clearFlow,
  } = useChatbotTxStore();
  const { writeContractAsync } = useWriteContract();
  const [hasSignedOnce, setHasSignedOnce] = useState(false);
  const lastHandledSignRequestId = useRef(0);

  const name = draft.prefill.name?.trim() ?? "";
  const symbol = draft.prefill.symbol?.trim() ?? "";
  const decimalsText = draft.prefill.decimals?.trim() || "18";
  const supplyText = draft.prefill.initialSupply?.trim() ?? "";
  const tokenType = draft.prefill.tokenType?.trim() || "0";
  const tokenTypeLabel = TOKEN_TYPE_LABELS[tokenType] ?? "Plain";
  const isBusy = phase === "creating";
  const isTaxableManualOnly = tokenType === "3";

  const handleManualPreview = () => {
    setPreviewDraft({
      ...draft,
      prefill: {
        ...draft.prefill,
        initialRecipient: draft.prefill.initialRecipient || address || "",
      },
    });
    navigate(draft.targetRoute);
  };

  const readCreatedTokens = useCallback(async () => {
    if (!address || !ss58Address) return [];

    const tokens = await contractRead({
      address: tokenFactory,
      abi: TokenFactory.abi,
      functionName: "tokensCreatedBy",
      args: [address],
      callerAddress: ss58Address,
    });

    return Array.isArray(tokens) ? (tokens as Address[]) : [];
  }, [address, ss58Address, tokenFactory]);

  const findCreatedTokenByReadback = useCallback(
    async (before: Set<string>) => {
      for (let attempt = 0; attempt < 5; attempt += 1) {
        try {
          const tokens = await readCreatedTokens();
          const created = tokens.find((token) => !before.has(token.toLowerCase()));
          if (created) return created;

          if (tokens.length > 0) {
            return tokens[tokens.length - 1];
          }
        } catch (err) {
          console.warn("Could not read created tokens after creation", err);
        }

        await delay(1500);
      }

      return null;
    },
    [readCreatedTokens],
  );

  const handleSignNow = useCallback(async () => {
    if (!ss58Address || !address) {
      openConnectModal();
      return;
    }

    if (isTaxableManualOnly) {
      updateFlow({ phase: "error", errorMessage: "Taxable tokens stay manual for now." });
      onAppendAssistantMessage("Taxable token setup stays manual for now. Open manual preview and finish it there.");
      return;
    }

    if (!name || !symbol || !supplyText) {
      updateFlow({ phase: "error", errorMessage: "Token details are incomplete." });
      onAppendAssistantMessage("I’m still missing part of the token setup. Open manual preview and tighten it up there.");
      return;
    }

    let decimals = 18;
    try {
      decimals = Number.parseInt(decimalsText || "18", 10);
      if (!Number.isFinite(decimals) || decimals < 0) {
        throw new Error("Invalid decimals");
      }
    } catch {
      updateFlow({ phase: "error", errorMessage: "Token decimals look invalid." });
      onAppendAssistantMessage("Those token decimals look invalid. Open manual preview and fix them there.");
      return;
    }

    let initialSupply: bigint;
    try {
      initialSupply = parseUnits(supplyText, decimals);
    } catch {
      updateFlow({ phase: "error", errorMessage: "Token supply looks invalid." });
      onAppendAssistantMessage("That token supply looks invalid. Open manual preview and fix it there.");
      return;
    }

    try {
      setHasSignedOnce(true);
      updateFlow({
        phase: "creating",
        approvalTxHash: null,
        primaryTxHash: null,
        resultAddress: null,
        errorMessage: null,
      });
      onAppendAssistantMessage("Creating token…");

      const beforeTokens = new Set((await readCreatedTokens()).map((token) => token.toLowerCase()));
      const tokenParams = {
        name,
        symbol,
        decimals,
        initialSupply,
        initialRecipient: (draft.prefill.initialRecipient || address) as `0x${string}`,
      };

      let functionName:
        | "createPlainToken"
        | "createMintableToken"
        | "createBurnableToken"
        | "createNonMintableToken" = "createPlainToken";

      if (tokenType === "1") functionName = "createMintableToken";
      if (tokenType === "2") functionName = "createBurnableToken";
      if (tokenType === "4") functionName = "createNonMintableToken";

      const txHash = await writeContractAsync({
        address: tokenFactory,
        abi: TokenFactory.abi,
        functionName,
        args: [tokenParams],
      });

      const createdToken = await findCreatedTokenByReadback(beforeTokens);
      updateFlow({
        phase: "success",
        primaryTxHash: txHash,
        resultAddress: createdToken,
        errorMessage: null,
      });

      if (createdToken) {
        onAppendAssistantMessage(`Token created. [View tx](${buildExplorerTxUrl(explorerUrl, txHash)})`);
      } else {
        onAppendAssistantMessage("Token created. I couldn’t read back the new address yet, but it should show in your dashboard shortly.");
      }
    } catch (error) {
      const friendlyMessage = getFriendlyTxErrorMessage(error, "Token creation");

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
    decimalsText,
    draft.prefill.initialRecipient,
    explorerUrl,
    findCreatedTokenByReadback,
    isTaxableManualOnly,
    name,
    onAppendAssistantMessage,
    openConnectModal,
    readCreatedTokens,
    ss58Address,
    supplyText,
    symbol,
    tokenFactory,
    tokenType,
    updateFlow,
    writeContractAsync,
  ]);

  useEffect(() => {
    if (signRequestId === 0) return;
    if (lastHandledSignRequestId.current === signRequestId) return;
    if (phase === "creating") return;

    lastHandledSignRequestId.current = signRequestId;
    void handleSignNow();
  }, [handleSignNow, phase, signRequestId]);

  const primaryLabel = !ss58Address || !address
    ? "Connect QF wallet"
    : phase === "creating"
      ? "Creating…"
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
            <p className="text-[9px] font-black uppercase tracking-[0.14em] text-black/45">Name</p>
            <p className="truncate text-xs font-bold text-black">{name || "—"}</p>
          </div>
          <div className="min-w-0">
            <p className="text-[9px] font-black uppercase tracking-[0.14em] text-black/45">Symbol</p>
            <p className="truncate text-xs font-bold text-black">{symbol || "—"}</p>
          </div>
          <div className="min-w-0">
            <p className="text-[9px] font-black uppercase tracking-[0.14em] text-black/45">Supply</p>
            <p className="truncate text-xs font-bold text-black">{supplyText || "—"}</p>
          </div>
          <div className="min-w-0">
            <p className="text-[9px] font-black uppercase tracking-[0.14em] text-black/45">Type</p>
            <p className="truncate text-xs font-bold text-black">{tokenTypeLabel}</p>
          </div>
        </div>
        {isTaxableManualOnly && (
          <div className="rounded-[14px] border border-black/15 bg-white px-3 py-2.5 text-xs font-bold text-black/70">
            Taxable tokens stay manual for now. Open manual preview to set the tax wallet and tax rate.
          </div>
        )}
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => void handleSignNow()}
            disabled={isBusy || isTaxableManualOnly}
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

        {(phase !== "ready" || primaryTxHash || resultAddress || errorMessage) && (
          <div className="rounded-[16px] border border-black/15 bg-white px-3 py-2.5 text-xs font-bold text-black/70">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <span>
                {phase === "creating" && "Token transaction sent."}
                {phase === "success" && "Token created."}
                {phase === "error" && (errorMessage || "Something went wrong.")}
              </span>
              {primaryTxHash && (
                <a
                  href={buildExplorerTxUrl(explorerUrl, primaryTxHash)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 underline underline-offset-2"
                >
                  View tx <ExternalLink className="h-3 w-3" />
                </a>
              )}
              {resultAddress && (
                <a
                  href={buildExplorerAddressUrl(explorerUrl, resultAddress)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 underline underline-offset-2"
                >
                  View token <ExternalLink className="h-3 w-3" />
                </a>
              )}
              {phase === "success" && resultAddress && (
                <span className="inline-flex items-center gap-1 text-green-700">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Address ready
                </span>
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
