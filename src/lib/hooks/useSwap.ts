import { useMemo, useState, useEffect } from "react";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "@/lib/papi/hooks";
import { RouterContract, Weth9Contract } from "@/config";
import { erc20Abi } from "@/config";
import { formatUnits, parseUnits, maxUint256 } from "viem";

export function useSwap({
  fromToken,
  toToken,
  fromAmount,
}: {
  fromToken: { address: `0x${string}`; decimals: number; symbol: string } | undefined;
  toToken: { address: `0x${string}`; decimals: number; symbol: string } | undefined;
  fromAmount: string;
}) {
  const { address } = useAccount();
  const { writeContractAsync, data: hash, isPending: isSwapLoading } = useWriteContract();

  const [toAmount, setToAmount] = useState("");

  const amountIn = useMemo(() => {
    if (!fromAmount || !fromToken) return BigInt(0);
    try {
      return parseUnits(fromAmount, fromToken.decimals);
    } catch (e) {
      console.error(e);
      return BigInt(0);
    }
  }, [fromAmount, fromToken]);

  const { data: amountsOut } = useReadContract({
    ...RouterContract,
    functionName: "getAmountsOut",
    args: fromToken && toToken ? [amountIn, [fromToken.address, toToken.address]] : undefined,
    query: {
      enabled: Boolean(amountIn > 0 && fromToken && toToken),
    },
  });

  useEffect(() => {
    if (amountsOut && toToken) {
      const formattedAmount = formatUnits((amountsOut as bigint[])[1], toToken.decimals);
      setToAmount(formattedAmount);
    } else {
      setToAmount("");
    }
  }, [amountsOut, toToken]);

  const { data: allowance, refetch } = useReadContract({
    address: fromToken?.address,
    abi: erc20Abi,
    functionName: "allowance",
    args: address ? [address, RouterContract.address] : undefined,
    query: {
      enabled: Boolean(address && fromToken && fromToken.address !== Weth9Contract.address),
    },
  });

  const { isPending: isApproveLoading, writeContractAsync: approveAsync } = useWriteContract();

  const needsApproval = useMemo(() => {
    if (!fromToken || fromToken.address === Weth9Contract.address || !allowance) return false;
    return allowance < amountIn;
  }, [allowance, amountIn, fromToken]);

  const approve = async () => {
    if (!fromToken) return;
    await approveAsync({
      address: fromToken.address,
      abi: erc20Abi,
      functionName: "approve",
      args: [RouterContract.address, maxUint256],
    });
    refetch();
  };

  const swap = async () => {
    if (!fromToken || !toToken || !address || !amountsOut) return;

    const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from now

    let swapArgs;
    let functionName: "swapExactETHForTokens" | "swapExactTokensForETH" | "swapExactTokensForTokens";

    if (fromToken.address === Weth9Contract.address) {
      functionName = "swapExactETHForTokens";
      swapArgs = [
        amountsOut[1],
        [fromToken.address, toToken.address],
        address,
        deadline
      ];
    } else if (toToken.address === Weth9Contract.address) {
      functionName = "swapExactTokensForETH";
      swapArgs = [
        amountIn,
        amountsOut[1],
        [fromToken.address, toToken.address],
        address,
        deadline
      ];
    } else {
      functionName = "swapExactTokensForTokens";
      swapArgs = [
        amountIn,
        amountsOut[1],
        [fromToken.address, toToken.address],
        address,
        deadline
      ];
    }

    await writeContractAsync({
      ...RouterContract,
      functionName,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      args: swapArgs as any,
      value: fromToken.address === Weth9Contract.address ? amountIn : BigInt(0),
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return {
    toAmount,
    swap,
    approve,
    needsApproval,
    isLoading: isSwapLoading || isApproveLoading || isConfirming,
    isSuccess: isConfirmed,
    hash
  };
}
