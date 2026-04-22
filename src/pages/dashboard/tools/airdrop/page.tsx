import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AirdropMultisenderContract } from "@/config";
import { useChainContracts } from "@/lib/hooks/useChainContracts";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { erc20Abi, formatUnits, maxUint256, parseUnits } from "viem";
import { getFriendlyTxErrorMessage } from "@/lib/utils/tx-errors";
import {
  useAccount,
  useBalance,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "@/lib/papi/hooks";
import {
  Send,
  Coins,
  Upload,
  CheckCircle2,
  AlertCircle,
  Users,
  Wallet,
} from "lucide-react";

export default function AirdropPage() {
  const [searchParams] = useSearchParams();
  const { address } = useAccount();
  const { airdropMultisender } = useChainContracts();

  const {
    data: sendHash,
    writeContract: sendTokens,
    isPending: isSending,
    error: sendError,
    reset: resetSend,
  } = useWriteContract();
  const {
    data: approveHash,
    writeContract: approve,
    isPending: isApproving,
    error: approveError,
    reset: resetApprove,
  } = useWriteContract();

  // Check if token came from URL
  const tokenFromUrl = searchParams.get("token")?.trim() ?? "";
  const [tokenAddress, setTokenAddress] = useState(tokenFromUrl);
  const [recipientsData, setRecipientsData] = useState("");
  const [sendType, setSendType] = useState<"erc20" | "react">(
    tokenFromUrl ? "erc20" : "react"
  );

  // Normalize token address
  const normalizedTokenAddress = useMemo(() => {
    return tokenAddress.trim().toLowerCase() as `0x${string}`;
  }, [tokenAddress]);

  const isValidTokenAddress = useMemo(() => {
    return (
      !!tokenAddress &&
      tokenAddress.trim().length === 42 &&
      tokenAddress.startsWith("0x")
    );
  }, [tokenAddress]);

  // Token info
  const { data: tokenDecimals } = useReadContract({
    abi: erc20Abi,
    address: normalizedTokenAddress,
    functionName: "decimals",
    query: {
      enabled: isValidTokenAddress && sendType === "erc20",
    },
  });

  const { data: tokenSymbol } = useReadContract({
    abi: erc20Abi,
    address: normalizedTokenAddress,
    functionName: "symbol",
    query: {
      enabled: isValidTokenAddress && sendType === "erc20",
    },
  });

  const { data: tokenBalance, refetch: refetchTokenBalance } = useReadContract({
    abi: erc20Abi,
    address: normalizedTokenAddress,
    functionName: "balanceOf",
    args: [address!],
    query: {
      enabled: !!address && isValidTokenAddress && sendType === "erc20",
    },
  });

  // Native QF balance
  const { data: reactBalance, refetch: refetchReactBalance } = useBalance({
    address: address,
    query: {
      enabled: !!address && sendType === "react",
    },
  });

  // Parse recipients data
  const parsedRecipients = useMemo(() => {
    if (!recipientsData) {
      return { recipients: [], amounts: [], errors: [] as string[] };
    }

    const decimals = sendType === "erc20" ? tokenDecimals ?? 18 : 18;
    const errors: string[] = [];

    const result = recipientsData.split("\n").reduce(
      (acc, line, index) => {
        const trimmedLine = line.trim();
        if (!trimmedLine) return acc; // Skip empty lines

        const parts = trimmedLine.split(",");
        if (parts.length !== 2) {
          errors.push(
            `Line ${index + 1}: Invalid format (expected: address,amount)`
          );
          return acc;
        }

        const recipient = parts[0].trim();
        const amountStr = parts[1].trim();

        // Validate address
        if (!recipient.startsWith("0x") || recipient.length !== 42) {
          errors.push(`Line ${index + 1}: Invalid address`);
          return acc;
        }

        // Parse amount
        if (!amountStr || isNaN(Number(amountStr)) || Number(amountStr) <= 0) {
          errors.push(`Line ${index + 1}: Invalid amount`);
          return acc;
        }

        try {
          const amount = parseUnits(amountStr, decimals);
          acc.recipients.push(recipient as `0x${string}`);
          acc.amounts.push(amount);
        } catch {
          errors.push(
            `Line ${index + 1}: Could not parse amount "${amountStr}"`
          );
        }

        return acc;
      },
      { recipients: [] as `0x${string}`[], amounts: [] as bigint[], errors }
    );

    result.errors = errors;
    return result;
  }, [recipientsData, tokenDecimals, sendType]);

  const totalAmount = useMemo(() => {
    return parsedRecipients.amounts.reduce(
      (acc, curr) => acc + curr,
      BigInt(0)
    );
  }, [parsedRecipients]);

  const displayDecimals = sendType === "erc20" ? tokenDecimals ?? 18 : 18;
  const displaySymbol =
    sendType === "erc20" ? tokenSymbol ?? "tokens" : "QF";

  // Allowance check for ERC-20
  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    abi: erc20Abi,
    address: normalizedTokenAddress,
    functionName: "allowance",
    args: [address!, airdropMultisender],
    query: {
      enabled: !!address && isValidTokenAddress && sendType === "erc20",
    },
  });

  const needsApproval = useMemo(() => {
    if (sendType === "react") return false;
    if (allowance === undefined) return true;
    return allowance < totalAmount;
  }, [allowance, totalAmount, sendType]);

  // Check sufficient balance
  const hasSufficientBalance = useMemo(() => {
    if (totalAmount === 0n) return true;
    if (sendType === "erc20") {
      return tokenBalance !== undefined && tokenBalance >= totalAmount;
    } else {
      return reactBalance !== undefined && reactBalance.value >= totalAmount;
    }
  }, [sendType, tokenBalance, reactBalance, totalAmount]);

  const handleApprove = () => {
    approve({
      address: normalizedTokenAddress,
      abi: erc20Abi,
      functionName: "approve",
      args: [airdropMultisender, maxUint256],
    });
  };

  const handleSend = () => {
    if (parsedRecipients.recipients.length === 0) {
      toast.error("No valid recipients found");
      return;
    }

    if (!hasSufficientBalance) {
      toast.error("Insufficient balance");
      return;
    }

    if (sendType === "react") {
      sendTokens({
        address: airdropMultisender,
        abi: AirdropMultisenderContract.abi,
        functionName: "sendETH",
        args: [parsedRecipients.recipients, parsedRecipients.amounts],
        value: totalAmount,
      });
    } else {
      sendTokens({
        address: airdropMultisender,
        abi: AirdropMultisenderContract.abi,
        functionName: "sendERC20",
        args: [
          normalizedTokenAddress,
          parsedRecipients.recipients,
          parsedRecipients.amounts,
        ],
      });
    }
  };

  const { isLoading: isApproveConfirming, isSuccess: isApproveConfirmed } =
    useWaitForTransactionReceipt({ hash: approveHash });
  const { isLoading: isSendConfirming, isSuccess: isSendConfirmed } =
    useWaitForTransactionReceipt({ hash: sendHash });

  // Track toast IDs to prevent duplicates
  const approveToastId = useRef<string | number | null>(null);
  const sendToastId = useRef<string | number | null>(null);

  useEffect(() => {
    if (isApproveConfirming && !approveToastId.current) {
      approveToastId.current = toast.loading("Approval confirming...");
    } else if (!isApproveConfirming && approveToastId.current) {
      toast.dismiss(approveToastId.current);
      approveToastId.current = null;
    }
  }, [isApproveConfirming]);

  useEffect(() => {
    if (isSendConfirming && !sendToastId.current) {
      sendToastId.current = toast.loading("Transaction confirming...");
    } else if (!isSendConfirming && sendToastId.current) {
      toast.dismiss(sendToastId.current);
      sendToastId.current = null;
    }
  }, [isSendConfirming]);

  useEffect(() => {
    if (isApproveConfirmed && approveHash) {
      toast.success("Approval successful! You can now send your tokens.");
      void Promise.allSettled([
        refetchAllowance(),
        sendType === "erc20" ? refetchTokenBalance() : Promise.resolve(),
      ]);
      resetApprove();
    }
  }, [
    approveHash,
    isApproveConfirmed,
    refetchAllowance,
    refetchTokenBalance,
    resetApprove,
    sendType,
  ]);

  useEffect(() => {
    if (isSendConfirmed && sendHash) {
      toast.success("Airdrop sent successfully!");
      setRecipientsData("");
      void Promise.allSettled(
        sendType === "erc20"
          ? [refetchAllowance(), refetchTokenBalance()]
          : [refetchReactBalance()]
      );
      resetSend();
    }
  }, [
    isSendConfirmed,
    refetchAllowance,
    refetchReactBalance,
    refetchTokenBalance,
    resetSend,
    sendHash,
    sendType,
  ]);

  useEffect(() => {
    if (approveError) {
      toast.error(getFriendlyTxErrorMessage(approveError, "Approval"));
    }
  }, [approveError]);

  useEffect(() => {
    if (sendError) {
      console.error("Send error:", sendError);
      toast.error(getFriendlyTxErrorMessage(sendError, "Transfer"));
    }
  }, [sendError]);

  const isFormValid = useMemo(() => {
    if (parsedRecipients.recipients.length === 0) return false;
    if (parsedRecipients.errors.length > 0) return false;
    if (sendType === "erc20" && !isValidTokenAddress) return false;
    return true;
  }, [parsedRecipients, sendType, isValidTokenAddress]);

  return (
    <div className="container mx-auto px-4 py-8 text-black">
      {/* Header */}
      <div className="mb-8">
        <div className="-rotate-[0.45deg] sm:-rotate-[0.2deg] border-4 border-black bg-[#90EE90] p-6 shadow-[4px_4px_0_rgba(0,0,0,1)]">
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wider flex items-center gap-3">
            <Send className="w-7 h-7 md:w-8 md:h-8" /> Airdrop
          </h1>
          <p className="text-sm text-gray-700 mt-2">
            Send tokens to multiple addresses in one transaction.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Send Type Selection */}
        <Card className="before:hidden -rotate-[0.35deg] border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] p-0 gap-0">
          <CardHeader className="border-b-2 border-black bg-[#42C9FF] p-4">
            <CardTitle className="font-black uppercase tracking-wider flex items-center gap-2">
              <Coins className="w-5 h-5" />
              Select Token Type
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSendType("erc20")}
                className={`-rotate-[0.35deg] p-4 border-4 border-black text-left transition-all ${
                  sendType === "erc20"
                    ? "bg-[#90EE90] shadow-[4px_4px_0_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]"
                    : "bg-white shadow-[2px_2px_0_rgba(0,0,0,1)] hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 flex-shrink-0 rounded-full border-2 border-black ${
                      sendType === "erc20" ? "bg-black" : ""
                    }`}
                  />
                  <div>
                    <p className="font-black uppercase text-sm sm:text-base">
                      ERC-20 Token
                    </p>
                    <p className="text-xs text-gray-600">Any ERC-20 token</p>
                  </div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSendType("react");
                  setTokenAddress("");
                }}
                className={`rotate-[0.35deg] p-4 border-4 border-black text-left transition-all ${
                  sendType === "react"
                    ? "bg-[#90EE90] shadow-[4px_4px_0_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]"
                    : "bg-white shadow-[2px_2px_0_rgba(0,0,0,1)] hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 flex-shrink-0 rounded-full border-2 border-black ${
                      sendType === "react" ? "bg-black" : ""
                    }`}
                  />
                  <div>
                    <p className="font-black uppercase text-sm sm:text-base">
                      QF
                    </p>
                    <p className="text-xs text-gray-600">Native currency</p>
                  </div>
                </div>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Token Address (for ERC-20) */}
        {sendType === "erc20" && (
          <Card className="before:hidden rotate-[0.35deg] border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] p-0 gap-0">
            <CardHeader className="border-b-2 border-black bg-[#FFE38A] p-4">
              <CardTitle className="font-black uppercase tracking-wider flex items-center gap-2">
                <Wallet className="w-5 h-5" />
                Token Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="token-address"
                  className="font-bold uppercase text-xs"
                >
                  Token Address
                </Label>
                <Input
                  id="token-address"
                  placeholder="0x..."
                  value={tokenAddress}
                  onChange={(e) => setTokenAddress(e.target.value)}
                  className="border-2 border-black font-mono"
                />
              </div>
              {isValidTokenAddress && tokenSymbol && (
                <div className="p-3 bg-gray-100 border-2 border-black">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 text-xs uppercase font-bold">
                        Token
                      </p>
                      <p className="font-black">{tokenSymbol}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs uppercase font-bold">
                        Your Balance
                      </p>
                      <p className="font-black">
                        {tokenBalance !== undefined
                          ? `${Number(
                              formatUnits(tokenBalance, tokenDecimals ?? 18)
                            ).toLocaleString()} ${tokenSymbol}`
                          : "Loading..."}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* QF Balance (for native) */}
        {sendType === "react" && reactBalance && (
          <Card className="before:hidden -rotate-[0.25deg] border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] p-0 gap-0">
            <CardContent className="p-4">
              <div className="p-3 bg-gray-100 border-2 border-black">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 text-xs uppercase font-bold">
                      Your QF Balance
                    </p>
                    <p className="font-black text-lg">
                      {Number(
                        formatUnits(reactBalance.value, 18)
                      ).toLocaleString()}{" "}
                      QF
                    </p>
                  </div>
                  <Coins className="w-8 h-8 text-[#42C9FF]" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recipients */}
        <Card className="before:hidden rotate-[0.45deg] border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] p-0 gap-0">
          <CardHeader className="border-b-2 border-black bg-[#FFB6C1] p-4">
            <CardTitle className="font-black uppercase tracking-wider flex items-center gap-2">
              <Users className="w-5 h-5" />
              Recipients
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="recipients"
                className="font-bold uppercase text-xs"
              >
                Addresses and Amounts
              </Label>
              <Textarea
                id="recipients"
                placeholder={`0x1234...abcd,100\n0x5678...efgh,200\n0x9012...ijkl,50`}
                value={recipientsData}
                onChange={(e) => setRecipientsData(e.target.value)}
                className="min-h-[200px] border-2 border-black font-mono text-sm"
              />
              <p className="text-xs text-gray-500">
                Enter one address and amount per line, separated by a comma.
                Example: <code className="bg-gray-100 px-1">0x123...,100</code>
              </p>
            </div>

            {/* Parsing Errors */}
            {parsedRecipients.errors.length > 0 && (
              <div className="p-3 bg-red-50 border-2 border-red-500 space-y-1">
                <p className="font-bold text-red-600 text-sm flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> Errors found:
                </p>
                {parsedRecipients.errors.slice(0, 5).map((error, i) => (
                  <p key={i} className="text-xs text-red-600">
                    {error}
                  </p>
                ))}
                {parsedRecipients.errors.length > 5 && (
                  <p className="text-xs text-red-600">
                    ...and {parsedRecipients.errors.length - 5} more errors
                  </p>
                )}
              </div>
            )}

            {/* Summary */}
            {parsedRecipients.recipients.length > 0 && (
              <div className="p-4 bg-gray-100 border-2 border-black">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-white border-2 border-black">
                    <p className="text-xs text-gray-500 uppercase font-bold">
                      Recipients
                    </p>
                    <p className="text-2xl font-black">
                      {parsedRecipients.recipients.length}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-white border-2 border-black">
                    <p className="text-xs text-gray-500 uppercase font-bold">
                      Total Amount
                    </p>
                    <p className="text-2xl font-black">
                      {Number(
                        formatUnits(totalAmount, displayDecimals)
                      ).toLocaleString()}
                    </p>
                    <p className="text-xs font-bold text-gray-600">
                      {displaySymbol}
                    </p>
                  </div>
                </div>
                {!hasSufficientBalance && totalAmount > 0n && (
                  <div className="mt-3 p-2 bg-red-100 border-2 border-red-500 text-center">
                    <p className="text-red-600 font-bold text-sm">
                      ⚠️ Insufficient balance
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Card className="before:hidden -rotate-[0.35deg] border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] p-0 gap-0">
          <CardContent className="p-4">
            {sendType === "erc20" && needsApproval && isFormValid ? (
              <div className="space-y-3">
                <p className="text-center text-sm text-gray-600">
                  Step 1: Approve tokens for the airdrop contract
                </p>
                <Button
                  onClick={handleApprove}
                  disabled={isApproving || isApproveConfirming || !isFormValid}
                  className="-rotate-[0.35deg] w-full border-4 border-black bg-[#FFE38A] text-black font-black uppercase tracking-wider shadow-[4px_4px_0_rgba(0,0,0,1)] hover:bg-[#F6CF62] hover:shadow-[6px_6px_0_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all py-6 text-lg"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  {isApproving || isApproveConfirming
                    ? "Approving..."
                    : "Approve Tokens"}
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {sendType === "erc20" && !needsApproval && isFormValid && (
                  <p className="text-center text-sm text-green-600 font-bold flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Tokens approved
                  </p>
                )}
                <Button
                  onClick={handleSend}
                  disabled={
                    isSending ||
                    isSendConfirming ||
                    !isFormValid ||
                    !hasSufficientBalance
                  }
                  className="rotate-[0.35deg] w-full border-4 border-black bg-[#90EE90] text-black font-black uppercase tracking-wider shadow-[4px_4px_0_rgba(0,0,0,1)] hover:bg-[#7DE07D] hover:shadow-[6px_6px_0_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all py-6 text-lg"
                >
                  <Send className="w-5 h-5 mr-2" />
                  {isSending || isSendConfirming
                    ? "Sending..."
                    : `Send Airdrop`}
                </Button>
              </div>
            )}

            {!isFormValid && recipientsData && (
              <p className="text-center text-xs text-gray-500 mt-2">
                {sendType === "erc20" && !isValidTokenAddress
                  ? "Enter a valid token address"
                  : parsedRecipients.recipients.length === 0
                  ? "Add valid recipients"
                  : "Fix errors above to continue"}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
