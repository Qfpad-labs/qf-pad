import { useQuery } from "@tanstack/react-query";
import { contractReadBatch } from "@/lib/papi/contract-read";
import { useWallet } from "@/lib/papi/wallet-context";
import type { Abi, Address } from "viem";

interface ContractCall {
  address: Address;
  abi: Abi | readonly unknown[];
  functionName: string;
  args?: readonly unknown[] | unknown[];
}

// Wagmi-compatible result shape: .result is always accessible (undefined on failure)
interface ContractResult {
  result: unknown;
  status: "success" | "failure";
  error?: Error;
}

interface UseReadContractsParams {
  contracts: readonly ContractCall[];
  query?: {
    enabled?: boolean;
    refetchInterval?: number | false;
    refetchOnWindowFocus?: boolean;
    refetchOnReconnect?: boolean;
  };
}

/**
 * Drop-in replacement for wagmi's useReadContracts.
 * Batches multiple contract reads via parallel ReviveApi.call.
 */
export function useReadContracts({
  contracts,
  query: queryOptions,
}: UseReadContractsParams) {
  const { ss58Address } = useWallet();

  const enabled = queryOptions?.enabled !== false && contracts.length > 0;

  // Build a stable query key from the contracts array
  const queryKey = [
    "contractReadBatch",
    ss58Address ?? "no-caller",
    contracts.map((c) => ({
      a: c.address,
      f: c.functionName,
      args: JSON.stringify(c.args, (_k, v) =>
        typeof v === "bigint" ? v.toString() : v
      ),
    })),
  ];

  const { data, isLoading, error, refetch } = useQuery<ContractResult[]>({
    queryKey,
    queryFn: async () => {
      if (contracts.length === 0) return [];
      const results = await contractReadBatch(
        contracts.map((c) => ({
          address: c.address,
          abi: c.abi,
          functionName: c.functionName,
          args: c.args ? [...c.args] : undefined,
        })),
        ss58Address
      );
      // Normalize to wagmi-compatible shape where .result always exists
      return results.map((r): ContractResult => {
        if (r.status === "success") {
          return { result: r.result, status: "success" };
        }
        return { result: undefined, status: "failure", error: r.error };
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
