"use client";

import { useState, useEffect, useMemo } from "react";
import { formatUnits, parseUnits } from "viem";
import { useAccount, usePublicClient } from "@/lib/papi/hooks";
import { toast } from "sonner";
import { getFriendlyTxErrorMessage } from "@/lib/utils/tx-errors";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LaunchpadPresaleContract } from "@/config";
import {
  usePresaleContribute,
  usePresaleClaimTokens,
  usePresaleClaimRefund,
  usePresaleCalculation,
} from "@/lib/hooks/usePresaleActions";
import {
  useLaunchpadPresale,
  useUserPresaleContribution,
  type PresaleWithStatus,
} from "@/lib/hooks/useLaunchpadPresales";
import { usePresaleApproval } from "@/lib/hooks/usePresaleApproval";

interface PresaleParticipationFormProps {
  presale: PresaleWithStatus;
}

export function PresaleParticipationForm({
  presale,
}: PresaleParticipationFormProps) {
  const [amount, setAmount] = useState("");
  const { address: account } = useAccount();

  const { presale: updatedPresale, refetch: refetchPresale } =
    useLaunchpadPresale(presale.address, true);
  const presaleData = updatedPresale || presale;
  const publicClient = usePublicClient();
  const [isWhitelisted, setIsWhitelisted] = useState(
    !presaleData.requiresWhitelist
  );
  const [isCheckingWhitelist, setIsCheckingWhitelist] = useState(false);
  const [whitelistError, setWhitelistError] = useState<string | null>(null);

  const {
    contribution: userContribution,
    purchasedTokens: userPurchasedTokens,
    refetch: refetchContribution,
  } = useUserPresaleContribution(presaleData.address, account);

  const { contribute, isPending, isConfirming, isSuccess, error } =
    usePresaleContribute();

  const {
    claimTokens,
    isPending: isClaimTokensPending,
    isConfirming: isClaimTokensConfirming,
    isSuccess: isClaimTokensSuccess,
    error: claimTokensError,
  } = usePresaleClaimTokens();

  const {
    claimRefund,
    isPending: isClaimRefundPending,
    isConfirming: isClaimRefundConfirming,
    isSuccess: isClaimRefundSuccess,
    error: claimRefundError,
  } = usePresaleClaimRefund();

  const { calculateTokenAmount } = usePresaleCalculation();

  const paymentTokenDecimals = presaleData.paymentTokenDecimals || 18;
  const saleTokenDecimals = presaleData.saleTokenDecimals || 18;

  const amountAsBigInt = useMemo(() => {
    try {
      return parseUnits(amount, paymentTokenDecimals);
    } catch {
      return 0n;
    }
  }, [amount, paymentTokenDecimals]);

  // Calculate expected tokens for the input amount
  const expectedTokens = useMemo(() => {
    if (amountAsBigInt === 0n || !presaleData.rate) return 0n;
    return calculateTokenAmount(amountAsBigInt, presaleData.rate);
  }, [amountAsBigInt, presaleData.rate, calculateTokenAmount]);

  const { needsApproval, approve, isApproving } = usePresaleApproval({
    presaleAddress: presaleData.address,
    paymentToken: {
      address: presaleData.paymentToken,
      decimals: paymentTokenDecimals,
    },
    amount: amountAsBigInt,
    isPaymentETH: presaleData.isPaymentETH,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!presaleData) return;

    await contribute({
      presaleAddress: presaleData.address,
      amount: amountAsBigInt,
      isPaymentETH: presaleData.isPaymentETH,
      paymentTokenDecimals: presaleData.paymentTokenDecimals,
    });
  };

  useEffect(() => {
    if (!presaleData.requiresWhitelist) {
      setIsWhitelisted(true);
      setWhitelistError(null);
      return;
    }
    if (!account || !publicClient) {
      setIsWhitelisted(false);
      setWhitelistError(
        account ? null : "Connect your wallet to verify access."
      );
      return;
    }
    let cancelled = false;
    setIsCheckingWhitelist(true);
    setWhitelistError(null);

    (async () => {
      try {
        const allowed = await publicClient.readContract({
          abi: LaunchpadPresaleContract.abi,
          address: presaleData.address,
          functionName: "whitelist",
          args: [account],
        });
        if (!cancelled) {
          setIsWhitelisted(Boolean(allowed));
        }
      } catch (error) {
        console.error("Whitelist check failed", error);
        if (!cancelled) {
          setIsWhitelisted(false);
          setWhitelistError("Unable to verify whitelist status right now.");
        }
      } finally {
        if (!cancelled) {
          setIsCheckingWhitelist(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [
    presaleData.requiresWhitelist,
    presaleData.address,
    account,
    publicClient,
  ]);

  useEffect(() => {
    if (isSuccess) {
      refetchContribution();
      refetchPresale();
      setAmount("");
      toast.success("Contribution successful!");
    }
  }, [isSuccess, refetchContribution, refetchPresale]);

  // Handle claim tokens success
  useEffect(() => {
    if (isClaimTokensSuccess) {
      refetchContribution();
      refetchPresale();
      toast.success("Tokens claimed successfully! 🎉");
    }
  }, [isClaimTokensSuccess, refetchContribution, refetchPresale]);

  // Handle claim refund success
  useEffect(() => {
    if (isClaimRefundSuccess) {
      refetchContribution();
      refetchPresale();
      toast.success("Refund claimed successfully!");
    }
  }, [isClaimRefundSuccess, refetchContribution, refetchPresale]);

  // Handle errors
  useEffect(() => {
    if (claimTokensError) {
      toast.error(getFriendlyTxErrorMessage(claimTokensError, "Claim"));
    }
  }, [claimTokensError]);

  useEffect(() => {
    if (claimRefundError) {
      toast.error(getFriendlyTxErrorMessage(claimRefundError, "Refund"));
    }
  }, [claimRefundError]);

  const minContribution = BigInt(presaleData.minContribution);
  const maxContribution = BigInt(presaleData.maxContribution);
  const currentContribution = BigInt(userContribution);
  const currentPurchasedTokens = BigInt(userPurchasedTokens);

  const whitelistGateOpen =
    !presaleData.requiresWhitelist || (account && isWhitelisted);

  // Check if presale is currently live (between start and end time)
  const isPresaleLive = presaleData.status === "live";
  const isPresaleUpcoming = presaleData.status === "upcoming";

  // Determine presale state
  const isPresaleFinalized = presaleData.claimEnabled === true;
  const isPresaleCancelled = presaleData.refundsEnabled === true;

  // Check if presale has ended (based on endTime)
  const presaleHasEnded = presaleData.endTime
    ? Date.now() > Number(presaleData.endTime) * 1000
    : false;

  // Countdown until claim time (presale end)
  const [claimCountdown, setClaimCountdown] = useState<string | null>(null);

  useEffect(() => {
    if (!presaleData.endTime) {
      setClaimCountdown(null);
      return;
    }

    const endMs = Number(presaleData.endTime) * 1000;

    const format = (ms: number) => {
      const totalSeconds = Math.max(0, Math.floor(ms / 1000));
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      const hh = hours.toString().padStart(2, "0");
      const mm = minutes.toString().padStart(2, "0");
      const ss = seconds.toString().padStart(2, "0");
      return days > 0 ? `${days}d ${hh}:${mm}:${ss}` : `${hh}:${mm}:${ss}`;
    };

    const update = () => {
      const remaining = endMs - Date.now();
      setClaimCountdown(format(remaining));
    };

    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [presaleData.endTime]);


  const canContribute =
    amountAsBigInt > 0 &&
    amountAsBigInt >= minContribution &&
    (maxContribution === 0n || amountAsBigInt <= maxContribution) &&
    whitelistGateOpen &&
    isPresaleLive &&
    !isPresaleFinalized &&
    !isPresaleCancelled;

  const canClaimTokens = isPresaleFinalized && currentPurchasedTokens > 0n;
  const canClaimRefund = isPresaleCancelled && currentContribution > 0n;

  // Check if contribution section should be disabled
  const isContributionDisabled =
    isPresaleFinalized || isPresaleCancelled || !isPresaleLive;

  const handleClaimTokens = () => {
    if (!presaleData.address) return;
    claimTokens(presaleData.address);
  };

  const handleClaimRefund = () => {
    if (!presaleData.address) return;
    claimRefund(presaleData.address);
  };

  const getButtonText = () => {
    if (isPresaleFinalized) return "Presale Finalized";
    if (isPresaleCancelled) return "Presale Cancelled";
    if (isPresaleUpcoming) return "Presale Not Started Yet";
    if (presaleHasEnded) return "Presale Ended";
    if (presaleData.requiresWhitelist && !whitelistGateOpen) {
      if (!account) return "Connect wallet";
      if (isCheckingWhitelist) return "Checking access...";
      if (whitelistError) return "Retry whitelist check";
      return "Not whitelisted";
    }
    if (isApproving) return "Approving...";
    if (isPending) return "Confirming...";
    if (isConfirming) return "Waiting for transaction...";
    if (needsApproval) return `Approve ${presaleData.paymentTokenSymbol}`;
    return "Contribute";
  };

  // Render claim section component
  const renderClaimSection = () => {
    // Only show if user has tokens or contribution
    if (currentPurchasedTokens === 0n && currentContribution === 0n) {
      return null;
    }

    return (
      <div className="space-y-3 border-t-2 border-gray-300 pt-4 mt-4">
        {/* Status Banner */}
        <div
          className={`p-3 text-center font-black uppercase tracking-wide text-sm ${isPresaleFinalized
              ? "bg-[#C4F1BE] text-green-800"
              : isPresaleCancelled
                ? "bg-[#FFD1DC] text-red-800"
                : presaleHasEnded
                  ? "bg-[#FFE38A] text-yellow-900"
                  : "bg-[#FFE38A] text-yellow-900"
            }`}
        >
          {isPresaleFinalized
            ? "✓ Presale Finalized - Claim Your Tokens"
            : isPresaleCancelled
              ? "✗ Presale Cancelled - Claim Your Refund"
              : presaleHasEnded
                ? "Presale Ended - Awaiting Finalization"
                : `Claims start in ${claimCountdown ?? "..."}`}
        </div>

        {/* User's Position */}
        <div className="space-y-2 rounded border-2 border-gray-300 bg-white p-3">
          <h4 className="font-bold uppercase text-xs text-gray-500">
            Your Position
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500 text-xs">Contributed</p>
              <p className="font-semibold">
                {formatUnits(currentContribution, paymentTokenDecimals)}{" "}
                {presaleData.paymentTokenSymbol}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Tokens to Receive</p>
              <p className="font-semibold">
                {formatUnits(currentPurchasedTokens, saleTokenDecimals)}{" "}
                {presaleData.saleTokenSymbol}
              </p>
            </div>
          </div>
        </div>

        {/* Claim Tokens Button - Always visible, disabled until finalized */}
        <Button
          onClick={handleClaimTokens}
          disabled={
            !canClaimTokens ||
            isClaimTokensPending ||
            isClaimTokensConfirming ||
            isPresaleCancelled
          }
          className={`w-full border-4 border-black font-black uppercase tracking-wider shadow-[3px_3px_0_rgba(0,0,0,1)] ${isPresaleCancelled
              ? "hidden"
              : canClaimTokens
                ? "bg-[#42C9FF] text-black"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          {isClaimTokensPending || isClaimTokensConfirming
            ? "Claiming..."
            : isPresaleFinalized && currentPurchasedTokens === 0n
              ? "✓ Already Claimed"
              : canClaimTokens
                ? `Claim ${formatUnits(
                  currentPurchasedTokens,
                  saleTokenDecimals
                )} ${presaleData.saleTokenSymbol}`
                : presaleHasEnded
                  ? "Awaiting Finalization..."
                  : "Claim Tokens"}
        </Button>

        {/* Claim Refund Button - Only visible when cancelled */}
        {isPresaleCancelled && (
          <Button
            onClick={handleClaimRefund}
            disabled={
              !canClaimRefund || isClaimRefundPending || isClaimRefundConfirming
            }
            className={`w-full border-4 border-black font-black uppercase tracking-wider shadow-[3px_3px_0_rgba(0,0,0,1)] ${canClaimRefund
                ? "bg-[#FFD1DC] text-black"
                : "bg-gray-300 text-gray-500"
              }`}
          >
            {isClaimRefundPending || isClaimRefundConfirming
              ? "Claiming refund..."
              : canClaimRefund
                ? `Claim Refund: ${formatUnits(
                  currentContribution,
                  paymentTokenDecimals
                )} ${presaleData.paymentTokenSymbol}`
                : currentContribution === 0n
                  ? "No refund available"
                  : "✓ Already Refunded"}
          </Button>
        )}

        {!account && (
          <p className="text-center text-xs text-gray-500">
            Connect your wallet to claim
          </p>
        )}
      </div>
    );
  };

  const isContributionHidden =
    isPresaleFinalized || isPresaleCancelled || presaleHasEnded;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 border-4 border-black bg-[#FFF2D5] p-6 shadow-[4px_4px_0_rgba(0,0,0,1)]"
    >
      {/* Whitelist Status */}
      {presaleData.requiresWhitelist && (
        <div className="border-2 border-black bg-[#FFE38A] p-3 text-sm font-semibold uppercase tracking-wide">
          {!account
            ? "Connect your wallet to check whitelist status."
            : isCheckingWhitelist
              ? "Checking whitelist status..."
              : isWhitelisted
                ? "✓ You're approved to participate."
                : "✗ You are not on the whitelist yet."}
        </div>
      )}
      {whitelistError && (
        <p className="text-xs text-red-600">{whitelistError}</p>
      )}

      {!isContributionHidden && (
        <>
          {/* Contribution Limits */}
          <div className="rounded border-2 border-gray-300 bg-white p-3 space-y-1">
            <h4 className="font-bold uppercase text-xs text-gray-500">
              Contribution Limits
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-500">Min:</span>{" "}
                <span className="font-semibold">
                  {formatUnits(minContribution, paymentTokenDecimals)}{" "}
                  {presaleData.paymentTokenSymbol}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Max:</span>{" "}
                <span className="font-semibold">
                  {formatUnits(maxContribution, paymentTokenDecimals)}{" "}
                  {presaleData.paymentTokenSymbol}
                </span>
              </div>
            </div>
          </div>

          {/* Amount Input */}
      <div>
        <label htmlFor="amount" className="mb-1 block font-medium">
          Amount to Contribute ({presaleData.paymentTokenSymbol})
        </label>
        <Input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.0"
          className="w-full"
        />
      </div>

          {/* Expected Tokens */}
          {expectedTokens > 0n && (
            <div className="rounded border-2 border-[#42C9FF] bg-[#E0F7FA] p-3">
              <p className="text-sm">
                <span className="text-gray-600">You will receive:</span>{" "}
                <span className="font-bold text-lg">
                  {formatUnits(expectedTokens, saleTokenDecimals)}{" "}
                  {presaleData.saleTokenSymbol}
                </span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Rate: {Number(presaleData.rate) / 100}{" "}
                {presaleData.saleTokenSymbol} per{" "}
          {presaleData.paymentTokenSymbol}
        </p>
      </div>
          )}

          {/* Contribute Button */}
      <Button
        type={needsApproval ? "button" : "submit"}
        onClick={needsApproval ? approve : undefined}
        disabled={
          isPending ||
          isConfirming ||
          isApproving ||
              isContributionDisabled ||
          !whitelistGateOpen ||
          (needsApproval ? false : !canContribute)
        }
            className={`w-full border-4 border-black font-black uppercase tracking-wider shadow-[3px_3px_0_rgba(0,0,0,1)] ${isContributionDisabled
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#42C9FF] text-black"
              }`}
      >
        {getButtonText()}
      </Button>
        </>
      )}

      {isContributionHidden && (
        <div className="rounded border-2 border-black bg-gray-100 p-4 text-center">
          <p className="font-black uppercase tracking-wider text-gray-500">
            {isPresaleCancelled
              ? "Presale Cancelled"
              : isPresaleFinalized
                ? "Presale Finalized"
                : "Presale Ended"}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Contributions are no longer accepted.
          </p>
        </div>
      )}

      {error && (
        <p className="text-red-500 text-sm">
          {getFriendlyTxErrorMessage(error, "Contribution")}
        </p>
      )}

      {/* Claim Section - Always visible if user has tokens */}
      {renderClaimSection()}
    </form>
  );
}
