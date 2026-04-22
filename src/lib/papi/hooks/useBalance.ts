import { useQuery } from "@tanstack/react-query";
import { getNativeBalance } from "@/lib/papi/balance";
import { contractRead } from "@/lib/papi/contract-read";
import { useWallet } from "@/lib/papi/wallet-context";
import { erc20Abi, formatUnits, type Address } from "viem";

interface BalanceQueryOptions {
  enabled?: boolean;
  refetchInterval?: number | false;
  refetchOnWindowFocus?: boolean;
  refetchOnReconnect?: boolean;
}

/**
 * Drop-in replacement for wagmi's useBalance.
 * Supports native QF balance and ERC20 token balance via `token` param.
 */
export function useBalance({
  address: _evmAddress,
  token,
  query,
}: { address?: string | Address; token?: Address; query?: BalanceQueryOptions } = {}) {
  const { ss58Address, address: evmAddress } = useWallet();

  const isErc20 = !!token;
  const enabled =
    query?.enabled !== false && (isErc20 ? !!evmAddress : !!ss58Address);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["balance", ss58Address, token ?? "native"],
    queryFn: async () => {
      if (isErc20) {
        // ERC20 token balance via contract read
        if (!evmAddress) return null;
        const balance = (await contractRead({
          address: token,
          abi: erc20Abi,
          functionName: "balanceOf",
          args: [evmAddress],
          callerAddress: ss58Address,
        })) as bigint;

        // Also fetch decimals and symbol
        const [decimals, symbol] = await Promise.all([
          contractRead({
            address: token,
            abi: erc20Abi,
            functionName: "decimals",
            callerAddress: ss58Address,
          }) as Promise<number>,
          contractRead({
            address: token,
            abi: erc20Abi,
            functionName: "symbol",
            callerAddress: ss58Address,
          }) as Promise<string>,
        ]);

        return {
          value: balance,
          decimals,
          symbol,
          formatted: formatUnits(balance, decimals),
        };
      } else {
        // Native QF balance
        if (!ss58Address) return null;
        const balanceInfo = await getNativeBalance(ss58Address);
        return {
          value: balanceInfo.free,
          decimals: 18,
          symbol: "QF",
          formatted: formatUnits(balanceInfo.free, 18),
        };
      }
    },
    enabled,
    refetchInterval:
      query?.refetchInterval === false
        ? false
        : query?.refetchInterval ?? 15000,
    refetchOnWindowFocus: query?.refetchOnWindowFocus ?? true,
    refetchOnReconnect: query?.refetchOnReconnect ?? true,
  });

  return {
    data: data ?? undefined,
    isLoading,
    refetch,
  };
}
