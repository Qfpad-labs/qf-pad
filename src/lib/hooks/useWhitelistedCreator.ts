import { useReadContract } from "@/lib/papi/hooks";
import { PresaleFactory } from "@/config";
import { useChainContracts } from "@/lib/hooks/useChainContracts";
import type { Address } from "viem";

/**
 * Hook to check if a creator address is whitelisted in the PresaleFactory
 */
export function useWhitelistedCreator(creatorAddress: Address | undefined) {
  const { presaleFactory } = useChainContracts();
  const { data: isWhitelisted, isLoading } = useReadContract({
    address: presaleFactory,
    abi: PresaleFactory.abi,
    functionName: "whitelistedCreators",
    args: creatorAddress ? [creatorAddress] : undefined,
    query: {
      enabled: Boolean(creatorAddress),
    },
  });

  return {
    isWhitelisted: isWhitelisted as boolean | undefined,
    isLoading,
  };
}
