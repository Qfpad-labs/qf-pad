import { useQuery } from "@tanstack/react-query";
import { contractRead } from "@/lib/papi/contract-read";
import { useWallet } from "@/lib/papi/wallet-context";
import type { Abi, Address } from "viem";

interface UseReadContractParams {
  address?: Address;
  abi: Abi | readonly unknown[];
  functionName: string;
  args?: unknown[];
  query?: {
    enabled?: boolean;
    refetchInterval?: number | false;
    refetchOnWindowFocus?: boolean;
    refetchOnReconnect?: boolean;
    refetchIntervalInBackground?: boolean;
  };
}

/**
 * Drop-in replacement for wagmi's useReadContract.
 * Uses react-query + PAPI's ReviveApi.call under the hood.
 */
export function useReadContract({
  address,
  abi,
  functionName,
  args,
  query: queryOptions,
  ...rest
}: UseReadContractParams & Record<string, unknown>) {
  const { ss58Address } = useWallet();

  // Support the spread pattern: { ...ContractObj, functionName }
  const contractAddress = address ?? (rest as { address?: Address }).address;
  const contractAbi = abi ?? (rest as { abi?: Abi }).abi;

  const enabled = queryOptions?.enabled !== false && !!contractAddress;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, isLoading, error, refetch } = useQuery<any>({
    queryKey: [
      "contractRead",
      ss58Address ?? "no-caller",
      contractAddress,
      functionName,
      JSON.stringify(args, (_k, v) =>
        typeof v === "bigint" ? v.toString() : v
      ),
    ],
    queryFn: async () => {
      if (!contractAddress || !contractAbi) return undefined;
      return contractRead({
        address: contractAddress,
        abi: contractAbi,
        functionName,
        args: args as unknown[] | undefined,
        callerAddress: ss58Address,
      });
    },
    enabled,
    refetchInterval: queryOptions?.refetchInterval || undefined,
    refetchOnWindowFocus: queryOptions?.refetchOnWindowFocus ?? false,
    refetchOnReconnect: queryOptions?.refetchOnReconnect ?? false,
  });

  return {
    data,
    isLoading,
    error,
    refetch,
  };
}
