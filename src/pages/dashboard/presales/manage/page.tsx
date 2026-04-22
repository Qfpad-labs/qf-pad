import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LaunchpadPresaleContract } from "@/config";
import { useChainContracts } from "@/lib/hooks/useChainContracts";
import {
  useLaunchpadPresale,
  type PresaleWithStatus,
} from "@/lib/hooks/useLaunchpadPresales";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { erc20Abi, formatUnits, isAddress, type Address } from "viem";
import { getFriendlyTxErrorMessage } from "@/lib/utils/tx-errors";
import {
  useAccount,
  useReadContract,
  useReadContracts,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "@/lib/papi/hooks";

export default function ManagePresalePage() {
  const { address: presaleAddress } = useParams<{ address: string }>();
  const navigate = useNavigate();
  const { address: userAddress } = useAccount();

  if (!presaleAddress || !isAddress(presaleAddress)) {
    return (
      <div className="container mx-auto px-4 py-12 text-black">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            <p className="text-center text-red-600">Invalid presale address</p>
            <Button
              onClick={() => navigate("/dashboard/create/presale")}
              className="mt-4 w-full"
            >
              Create New Presale
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const {
    presale,
    isLoading: isLoadingPresale,
    refetch: refetchPresale,
  } = useLaunchpadPresale(presaleAddress as Address, false);

  if (isLoadingPresale) {
    return (
      <div className="container mx-auto px-4 py-12 text-black">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            <p className="text-center">Loading presale data...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!presale) {
    return (
      <div className="container mx-auto px-4 py-12 text-black">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            <p className="text-center text-red-600">
              Presale not found at address {presaleAddress}
            </p>
            <Button
              onClick={() => navigate("/dashboard/create/presale")}
              className="mt-4 w-full"
            >
              Create New Presale
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Check if user is the owner
  if (
    userAddress &&
    presale.owner.toLowerCase() !== userAddress.toLowerCase()
  ) {
    return (
      <div className="container mx-auto px-4 py-12 text-black">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            <p className="text-center text-red-600">
              You are not the owner of this presale
            </p>
            <Button
              onClick={() => navigate("/dashboard/create/presale")}
              className="mt-4 w-full"
            >
              Create New Presale
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Ensure we have required presale data before rendering
  if (!presale.saleToken || !presale.hardCap || !presale.rate) {
    return (
      <div className="container mx-auto px-4 py-12 text-black">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            <p className="text-center text-red-600">
              Presale data is incomplete. Please try again.
            </p>
            <Button
              onClick={() => navigate("/dashboard/user")}
              className="mt-4 w-full"
            >
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 text-black">
      <Card className="max-w-2xl mx-auto p-0 gap-0">
        <CardHeader className="border-b-4 border-black bg-[#FFE38A] p-6">
          <CardTitle className="text-3xl text-center font-black uppercase tracking-wider">
            Manage Your Presale
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <ManagePresaleView
            presaleAddress={presaleAddress as Address}
            presale={presale}
            refetchPresale={refetchPresale}
          />
        </CardContent>
      </Card>
    </div>
  );
}

function ManagePresaleView({
  presaleAddress,
  presale,
  refetchPresale,
}: {
  presaleAddress: Address;
  presale: PresaleWithStatus;
  refetchPresale: () => void;
}) {
  const { explorerUrl } = useChainContracts();
  const [singleWhitelist, setSingleWhitelist] = useState("");
  const [bulkWhitelist, setBulkWhitelist] = useState("");
  const [removeAddress, setRemoveAddress] = useState("");
  const [activeOwnerAction, setActiveOwnerAction] = useState<string | null>(
    null
  );
  const [activeWhitelistAction, setActiveWhitelistAction] = useState<
    string | null
  >(null);

  // Safety check - ensure we have required data
  if (!presale.saleToken) {
    return (
      <div className="text-center p-6">
        <p className="text-red-600">
          Invalid presale data: missing sale token address
        </p>
      </div>
    );
  }

  const { data: saleTokenInfo } = useReadContracts({
    contracts: [
      {
        address: presale.saleToken,
        abi: erc20Abi,
        functionName: "symbol" as const,
      },
      {
        address: presale.saleToken,
        abi: erc20Abi,
        functionName: "decimals" as const,
      },
    ],
    query: {
      enabled: Boolean(presale.saleToken),
    },
  });

  const { address: userAddress } = useAccount();

  const saleTokenSymbol =
    (saleTokenInfo?.[0]?.result as string) ||
    presale.saleTokenSymbol ||
    "TOKEN";
  const saleTokenDecimals =
    (saleTokenInfo?.[1]?.result as number) || presale.saleTokenDecimals || 18;

  // Check token allowance
  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: presale.saleToken,
    abi: erc20Abi,
    functionName: "allowance",
    args:
      userAddress && presaleAddress ? [userAddress, presaleAddress] : undefined,
    query: {
      enabled: Boolean(userAddress && presaleAddress && presale.saleToken),
      refetchInterval: 5000, // Refetch every 5 seconds
    },
  });

  // Check contract token balance (to detect if deposit has been made)
  const { data: contractBalance, refetch: refetchBalance } = useReadContract({
    address: presale.saleToken,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [presaleAddress],
    query: {
      enabled: Boolean(presaleAddress && presale.saleToken),
      refetchInterval: 5000, // Refetch every 5 seconds to detect deposits
    },
  });

  // Fetch total token supply for fee calculation
  const { data: totalSupply } = useReadContract({
    address: presale.saleToken,
    abi: erc20Abi,
    functionName: "totalSupply",
    query: {
      enabled: Boolean(presale.saleToken),
    },
  });

  const saleAmount = useMemo(() => {
    if (!presale?.hardCap || !presale?.rate) return 0n;
    try {
      // Rate is stored as scaled by 100 (e.g., 20000 = 200 tokens per QF)
      return (presale.hardCap * presale.rate) / 100n;
    } catch (error) {
      console.error("Error calculating sale amount:", error);
      return 0n;
    }
  }, [presale?.hardCap, presale?.rate]);

  // Fee is now 2% of total token supply, not 2% of sale amount
  const launchpadFee = useMemo(() => {
    if (!totalSupply) return 0n;
    return totalSupply / 50n; // 2% of total supply
  }, [totalSupply]);

  const totalRequiredAmount = saleAmount + launchpadFee;

  const formatTokenDisplay = useCallback(
    (value: bigint, maximumFractionDigits = 4) => {
      const numeric = Number(formatUnits(value, saleTokenDecimals));
      if (!Number.isFinite(numeric)) return "0";
      return numeric.toLocaleString(undefined, { maximumFractionDigits });
    },
    [saleTokenDecimals]
  );

  const {
    writeContract: writeApprove,
    data: approveHash,
    isPending: isApprovePending,
    error: approveError,
    reset: resetApprove,
  } = useWriteContract();
  const { isLoading: isApproveConfirming, isSuccess: isApproveSuccess } =
    useWaitForTransactionReceipt({ hash: approveHash });

  const {
    writeContract: writeDeposit,
    data: depositHash,
    isPending: isDepositPending,
    error: depositError,
    reset: resetDeposit,
  } = useWriteContract();
  const { isLoading: isDepositConfirming, isSuccess: isDepositSuccess } =
    useWaitForTransactionReceipt({ hash: depositHash });

  const {
    writeContract: writeOwnerAction,
    data: ownerActionHash,
    isPending: isOwnerActionPending,
    error: ownerActionError,
    reset: resetOwnerAction,
  } = useWriteContract();
  const {
    isLoading: isOwnerActionConfirming,
    isSuccess: isOwnerActionSuccess,
  } = useWaitForTransactionReceipt({ hash: ownerActionHash });

  const {
    writeContract: writeWhitelist,
    data: whitelistHash,
    isPending: isWhitelistPending,
    error: whitelistError,
    reset: resetWhitelist,
  } = useWriteContract();
  const { isLoading: isWhitelistConfirming, isSuccess: isWhitelistSuccess } =
    useWaitForTransactionReceipt({ hash: whitelistHash });

  useEffect(() => {
    if (approveError) {
      toast.error(getFriendlyTxErrorMessage(approveError, "Approval"));
    }
  }, [approveError]);

  useEffect(() => {
    if (depositError) {
      toast.error(getFriendlyTxErrorMessage(depositError, "Deposit"));
    }
  }, [depositError]);

  useEffect(() => {
    if (ownerActionError) {
      toast.error(getFriendlyTxErrorMessage(ownerActionError, "Action"));
    }
  }, [ownerActionError]);

  useEffect(() => {
    if (whitelistError) {
      toast.error(getFriendlyTxErrorMessage(whitelistError, "Whitelist update"));
    }
  }, [whitelistError]);

  useEffect(() => {
    if (isApproveSuccess) {
      toast.success("Token allowance approved");
      resetApprove();
      // Refetch allowance after approval
      refetchAllowance();
      refetchPresale();
    }
  }, [isApproveSuccess, resetApprove, refetchAllowance, refetchPresale]);

  useEffect(() => {
    if (isDepositSuccess) {
      toast.success("Sale tokens deposited and fee forwarded 🎉");
      resetDeposit();
      // Refetch balance after deposit
      refetchBalance();
      refetchPresale();
    }
  }, [isDepositSuccess, resetDeposit, refetchBalance, refetchPresale]);

  useEffect(() => {
    if (isOwnerActionSuccess && activeOwnerAction) {
      const labels: Record<string, string> = {
        finalize: "Presale finalized",
        cancel: "Presale cancelled",
        withdrawProceeds: "Proceeds withdrawn",
        withdrawTokens: "Unsold tokens withdrawn",
      };
      toast.success(labels[activeOwnerAction] || "Transaction confirmed");
      setActiveOwnerAction(null);
      resetOwnerAction();
      refetchPresale();
    }
  }, [
    isOwnerActionSuccess,
    activeOwnerAction,
    resetOwnerAction,
    refetchPresale,
  ]);

  useEffect(() => {
    if (isWhitelistSuccess && activeWhitelistAction) {
      const messages: Record<string, string> = {
        addOne: "Wallet added to whitelist",
        bulkAdd: "Wallet list uploaded",
        remove: "Wallet removed from whitelist",
      };
      toast.success(messages[activeWhitelistAction] || "Whitelist updated");
      setActiveWhitelistAction(null);
      resetWhitelist();
      if (activeWhitelistAction === "addOne") setSingleWhitelist("");
      if (activeWhitelistAction === "bulkAdd") setBulkWhitelist("");
      if (activeWhitelistAction === "remove") setRemoveAddress("");
      refetchPresale();
    }
  }, [
    isWhitelistSuccess,
    activeWhitelistAction,
    resetWhitelist,
    refetchPresale,
  ]);

  const handleApproveTokens = () => {
    if (totalRequiredAmount === 0n) {
      toast.error(
        "Unable to determine the token amount. Double-check your hard cap and rate."
      );
      return;
    }
    writeApprove({
      abi: erc20Abi,
      address: presale.saleToken,
      functionName: "approve",
      args: [presaleAddress, totalRequiredAmount],
    });
  };

  const handleDepositTokens = () => {
    if (saleAmount === 0n) {
      toast.error(
        "Unable to determine the token amount. Double-check your hard cap and rate."
      );
      return;
    }
    // The contract calculates the fee internally (2% of total token supply)
    // So we only deposit the saleAmount, but we need to approve totalRequiredAmount
    // (saleAmount + fee) so the contract can take the fee from total supply
    writeDeposit({
      abi: LaunchpadPresaleContract.abi,
      address: presaleAddress,
      functionName: "depositSaleTokens",
      args: [saleAmount],
    });
  };

  const runOwnerAction = (
    action: string,
    config: Parameters<typeof writeOwnerAction>[0]
  ) => {
    setActiveOwnerAction(action);
    writeOwnerAction(config);
  };

  const handleFinalize = () =>
    runOwnerAction("finalize", {
      abi: LaunchpadPresaleContract.abi,
      address: presaleAddress,
      functionName: "finalize",
    });

  const handleCancel = () =>
    runOwnerAction("cancel", {
      abi: LaunchpadPresaleContract.abi,
      address: presaleAddress,
      functionName: "cancelPresale",
    });

  const handleWithdrawProceeds = () => {
    if (!presale.claimEnabled) {
      toast.error("Please finalize the presale before withdrawing proceeds.");
      return;
    }
    runOwnerAction("withdrawProceeds", {
      abi: LaunchpadPresaleContract.abi,
      address: presaleAddress,
      functionName: "withdrawProceeds",
      args: [0n],
    });
  };

  const handleWithdrawTokens = () => {
    if (!presale.claimEnabled) {
      toast.error(
        "Please finalize the presale before withdrawing unsold tokens."
      );
      return;
    }
    runOwnerAction("withdrawTokens", {
      abi: LaunchpadPresaleContract.abi,
      address: presaleAddress,
      functionName: "withdrawUnusedTokens",
      args: [0n],
    });
  };

  const runWhitelistAction = (
    action: string,
    config: Parameters<typeof writeWhitelist>[0]
  ) => {
    setActiveWhitelistAction(action);
    writeWhitelist(config);
  };

  const handleAddSingleWhitelist = () => {
    if (!singleWhitelist) {
      toast.error("Enter a wallet address to whitelist.");
      return;
    }
    if (!isAddress(singleWhitelist)) {
      toast.error("Invalid wallet address.");
      return;
    }
    runWhitelistAction("addOne", {
      abi: LaunchpadPresaleContract.abi,
      address: presaleAddress,
      functionName: "addToWhitelist",
      args: [singleWhitelist as Address],
    });
  };

  const handleBulkWhitelist = () => {
    const entries = bulkWhitelist
      .split(/[\s,]+/)
      .map((addr) => addr.trim())
      .filter(Boolean);
    if (entries.length === 0) {
      toast.error(
        "Paste one or more wallet addresses separated by commas or line breaks."
      );
      return;
    }
    const invalid = entries.find((addr) => !isAddress(addr));
    if (invalid) {
      toast.error(`Invalid wallet: ${invalid}`);
      return;
    }
    runWhitelistAction("bulkAdd", {
      abi: LaunchpadPresaleContract.abi,
      address: presaleAddress,
      functionName: "addManyToWhitelist",
      args: [entries as Address[]],
    });
  };

  const handleRemoveWhitelist = () => {
    if (!removeAddress) {
      toast.error("Enter a wallet address to remove.");
      return;
    }
    if (!isAddress(removeAddress)) {
      toast.error("Invalid wallet address.");
      return;
    }
    runWhitelistAction("remove", {
      abi: LaunchpadPresaleContract.abi,
      address: presaleAddress,
      functionName: "removeFromWhitelist",
      args: [removeAddress as Address],
    });
  };

  const ownerActionBusy = isOwnerActionPending || isOwnerActionConfirming;
  const whitelistBusy = isWhitelistPending || isWhitelistConfirming;
  const depositBusy = isDepositPending || isDepositConfirming;
  const approveBusy = isApprovePending || isApproveConfirming;

  // Check if approval is sufficient
  const hasSufficientAllowance = useMemo(() => {
    if (!allowance || !totalRequiredAmount) return false;
    return allowance >= totalRequiredAmount;
  }, [allowance, totalRequiredAmount]);

  // Check if deposit has been made (contract has tokens)
  const hasDeposited = useMemo(() => {
    if (!contractBalance || !saleAmount) return false;
    // Consider deposit made if contract has at least the sale amount
    // (it might have more due to the fee)
    return contractBalance >= saleAmount;
  }, [contractBalance, saleAmount]);

  // Check if presale has ended (finalized or cancelled)
  const presaleHasEnded = presale.claimEnabled || presale.refundsEnabled;
  const explorerHref = `${explorerUrl}/address/${presaleAddress}`;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-xl font-bold">Presale is live on-chain!</h3>
        <p>
          Manage contract{" "}
          <a
            href={explorerHref}
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-medium break-all sm:break-normal"
          >
            <span className="sm:hidden">
              {presaleAddress.slice(0, 6)}...{presaleAddress.slice(-4)}
            </span>
            <span className="hidden sm:inline">{presaleAddress}</span>
          </a>
        </p>
        <p className="text-gray-500 mt-2">
          Follow the steps below to prep your sale.
        </p>
      </div>

      <div className="border-4 border-black bg-[#FFF2D5] p-6 shadow-[4px_4px_0_rgba(0,0,0,1)] space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-black uppercase tracking-wider">
            Step 1 · Deposit Sale Tokens
          </p>
          <span className="text-xs font-bold text-gray-600">
            Fee: 2% of total token supply
          </span>
        </div>
        <p className="text-sm text-gray-700">
          Selling out your hard cap would require approximately{" "}
          <span className="font-semibold">
            {formatTokenDisplay(saleAmount)} {saleTokenSymbol}
          </span>{" "}
          for contributors.
        </p>
        <p className="text-sm text-gray-700">
          The launchpad fee is 2% of the total token supply (
          <span className="font-semibold">
            {formatTokenDisplay(launchpadFee)} {saleTokenSymbol}
          </span>
          ). Approve and deposit the total below.
        </p>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-center">
          <Button
            onClick={handleApproveTokens}
            disabled={
              approveBusy ||
              totalRequiredAmount === 0n ||
              hasSufficientAllowance ||
              hasDeposited ||
              presaleHasEnded
            }
            className={`border-4 border-black font-black uppercase tracking-wider shadow-[3px_3px_0_rgba(0,0,0,1)] ${
              hasSufficientAllowance || hasDeposited || presaleHasEnded
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-white text-black"
            }`}
          >
            {approveBusy
              ? "Approving..."
              : presaleHasEnded
              ? "Presale Ended"
              : hasSufficientAllowance || hasDeposited
              ? "✓ Approved"
              : `Approve ${formatTokenDisplay(
                  totalRequiredAmount
                )} ${saleTokenSymbol}`}
          </Button>
          <Button
            onClick={handleDepositTokens}
            disabled={
              depositBusy ||
              saleAmount === 0n ||
              !hasSufficientAllowance ||
              hasDeposited ||
              presaleHasEnded
            }
            className={`border-4 border-black font-black uppercase tracking-wider shadow-[3px_3px_0_rgba(0,0,0,1)] ${
              hasDeposited || presaleHasEnded
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : hasSufficientAllowance
                ? "bg-[#42C9FF] text-black ring-4 ring-yellow-400 ring-opacity-75"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {depositBusy
              ? "Depositing..."
              : presaleHasEnded
              ? "Presale Ended"
              : hasDeposited
              ? "✓ Deposited"
              : "Deposit & Cover Fee"}
          </Button>
        </div>
        {(hasSufficientAllowance || hasDeposited) && (
          <div className="mt-2 p-3 bg-green-50 border-2 border-green-400 rounded">
            <p className="text-sm font-semibold text-green-800">
              {hasDeposited
                ? "✓ Tokens have been deposited successfully!"
                : "✓ Approval confirmed. You can now deposit your tokens."}
            </p>
          </div>
        )}
        <p className="text-xs text-gray-600">
          Contributors receive {formatTokenDisplay(saleAmount)}{" "}
          {saleTokenSymbol}. The launchpad fee is{" "}
          {formatTokenDisplay(launchpadFee)} {saleTokenSymbol} (2% of total
          supply).
        </p>
      </div>

      {presale.requiresWhitelist ? (
        <div className="border-4 border-black bg-[#E0F2FE] p-6 shadow-[4px_4px_0_rgba(0,0,0,1)] space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-lg font-black uppercase tracking-wider">
              Step 2 · Curate Your Whitelist
            </p>
            <span className="text-xs font-bold text-gray-600">
              Only these wallets can contribute
            </span>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <Label className="font-bold uppercase text-xs">
                Add a single wallet
              </Label>
              <div className="flex gap-2">
                <Input
                  placeholder="0x..."
                  value={singleWhitelist}
                  onChange={(e) => setSingleWhitelist(e.target.value)}
                />
                <Button
                  type="button"
                  onClick={handleAddSingleWhitelist}
                  disabled={whitelistBusy || !singleWhitelist}
                  className="border-4 border-black bg-[#C4F1BE] text-black font-black uppercase tracking-wider shadow-[3px_3px_0_rgba(0,0,0,1)]"
                >
                  {whitelistBusy && activeWhitelistAction === "addOne"
                    ? "Adding..."
                    : "Add"}
                </Button>
              </div>
            </div>
            <div className="space-y-3">
              <Label className="font-bold uppercase text-xs">
                Remove a wallet
              </Label>
              <div className="flex gap-2">
                <Input
                  placeholder="0x..."
                  value={removeAddress}
                  onChange={(e) => setRemoveAddress(e.target.value)}
                />
                <Button
                  type="button"
                  onClick={handleRemoveWhitelist}
                  disabled={whitelistBusy || !removeAddress}
                  className="border-4 border-black bg-[#FFD1DC] text-black font-black uppercase tracking-wider shadow-[3px_3px_0_rgba(0,0,0,1)]"
                >
                  {whitelistBusy && activeWhitelistAction === "remove"
                    ? "Removing..."
                    : "Remove"}
                </Button>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <Label className="font-bold uppercase text-xs">
              Bulk upload (comma or line separated)
            </Label>
            <Textarea
              rows={3}
              placeholder="0xabc...
0xdef..."
              value={bulkWhitelist}
              onChange={(e) => setBulkWhitelist(e.target.value)}
            />
            <Button
              type="button"
              onClick={handleBulkWhitelist}
              disabled={whitelistBusy || !bulkWhitelist}
              className="border-4 border-black bg-[#FFE38A] text-black font-black uppercase tracking-wider shadow-[3px_3px_0_rgba(0,0,0,1)]"
            >
              {whitelistBusy && activeWhitelistAction === "bulkAdd"
                ? "Uploading..."
                : "Add Many"}
            </Button>
          </div>
        </div>
      ) : (
        <div className="border-4 border-black bg-[#E0F2FE] p-6 shadow-[4px_4px_0_rgba(0,0,0,1)]">
          <p className="text-lg font-black uppercase tracking-wider">
            Step 2 · Open Access
          </p>
          <p className="text-sm text-gray-700">
            Whitelisting is disabled for this presale. Anyone can participate
            while it is live.
          </p>
        </div>
      )}

      <div className="border-4 border-black bg-white p-6 shadow-[4px_4px_0_rgba(0,0,0,1)] space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-black uppercase tracking-wider">
            Step 3 · Finalize & Withdraw
          </p>
          <span className="text-xs font-bold text-gray-600">
            3% fee when withdrawing proceeds
          </span>
        </div>
        <p className="text-sm text-gray-700">
          Once the sale ends, finalize to enable claiming. Cancelling will
          refund contributors. Proceeds withdrawals automatically skim the 3%
          launchpad fee before the transfer.
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          <Button
            onClick={handleFinalize}
            disabled={
              ownerActionBusy || presale.claimEnabled || presale.refundsEnabled
            }
            className="border-4 border-black bg-[#42C9FF] text-black font-black uppercase tracking-wider shadow-[3px_3px_0_rgba(0,0,0,1)]"
          >
            {ownerActionBusy && activeOwnerAction === "finalize"
              ? "Finalizing..."
              : presale.claimEnabled
              ? "Already Finalized"
              : presale.refundsEnabled
              ? "Cancelled"
              : "Finalize Presale"}
          </Button>
          <Button
            onClick={handleCancel}
            disabled={ownerActionBusy}
            className="border-4 border-black bg-[#FFD1DC] text-black font-black uppercase tracking-wider shadow-[3px_3px_0_rgba(0,0,0,1)]"
          >
            {ownerActionBusy && activeOwnerAction === "cancel"
              ? "Cancelling..."
              : "Cancel Presale"}
          </Button>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <Button
            onClick={handleWithdrawProceeds}
            disabled={ownerActionBusy || !presale.claimEnabled}
            className={`border-4 border-black font-black uppercase tracking-wider shadow-[3px_3px_0_rgba(0,0,0,1)] ${
              !presale.claimEnabled
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#C4F1BE] text-black"
            }`}
          >
            {ownerActionBusy && activeOwnerAction === "withdrawProceeds"
              ? "Withdrawing..."
              : "Withdraw Proceeds"}
          </Button>
          <Button
            onClick={handleWithdrawTokens}
            disabled={ownerActionBusy || !presale.claimEnabled}
            className={`border-4 border-black font-black uppercase tracking-wider shadow-[3px_3px_0_rgba(0,0,0,1)] ${
              !presale.claimEnabled
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#FFE38A] text-black"
            }`}
          >
            {ownerActionBusy && activeOwnerAction === "withdrawTokens"
              ? "Withdrawing..."
              : "Withdraw Unsold Tokens"}
          </Button>
        </div>
        {!presale.claimEnabled && (
          <div className="mt-2 p-3 bg-yellow-50 border-2 border-yellow-400 rounded">
            <p className="text-sm font-semibold text-yellow-800">
              ⚠️ You must finalize the presale before withdrawing proceeds or
              unsold tokens.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
