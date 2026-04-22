import { useEffect, useMemo } from 'react';
import { PresaleFactoryContract } from '@/config';
import { useChainContracts } from '@/lib/hooks/useChainContracts';
import { useReadContract, useReadContracts } from '@/lib/papi/hooks';
import { useBlockchainStore } from '@/lib/store/blockchain-store';
import type { Address } from 'viem';

export function usePresales(forceRefetch = false) {
  const {
    getPresales,
    setPresales,
    setPresalesLoading,
    isPresalesStale,
  } = useBlockchainStore();

  const cachedPresales = getPresales();
  const isStale = isPresalesStale();
  const shouldFetch = isStale || forceRefetch || !cachedPresales;
  const { presaleFactory } = useChainContracts();

  // First get total count of presales
  const { data: totalPresales, isLoading: isLoadingTotal, refetch: refetchTotal } = useReadContract({
    abi: PresaleFactoryContract.abi,
    address: presaleFactory,
    functionName: 'totalPresales',
    query: {
      enabled: shouldFetch,
    },
  });

  // Build queries to fetch all presale addresses
  const addressQueries = useMemo(() => {
    if (!totalPresales || totalPresales === 0n) return [];
    const count = Number(totalPresales);
    return Array.from({ length: count }, (_, i) => ({
      abi: PresaleFactoryContract.abi,
      address: presaleFactory,
      functionName: 'allPresales' as const,
      args: [BigInt(i)],
    }));
  }, [presaleFactory, totalPresales]);

  const { data: addressResults, isLoading: isLoadingAddresses, refetch: refetchAddresses } = useReadContracts({
    contracts: addressQueries,
    query: {
      enabled: addressQueries.length > 0,
    },
  });

  // Extract addresses from results
  const presaleAddresses = useMemo(() => {
    if (!addressResults) return null;
    return addressResults
      .map((r) => r.result as Address | undefined)
      .filter((addr): addr is Address => !!addr);
  }, [addressResults]);

  const isLoading = isLoadingTotal || isLoadingAddresses;

  useEffect(() => {
    if (shouldFetch && isLoading) {
      setPresalesLoading(true);
    }
  }, [shouldFetch, isLoading, setPresalesLoading]);

  useEffect(() => {
    if (presaleAddresses && !isLoading) {
      setPresales(presaleAddresses);
    }
  }, [presaleAddresses, isLoading, setPresales]);

  const handleRefetch = async () => {
    setPresalesLoading(true);
    await refetchTotal();
    await refetchAddresses();
  };

  return {
    presales: cachedPresales || presaleAddresses || [],
    isLoading: shouldFetch ? isLoading : false,
    refetch: handleRefetch,
  };
}
