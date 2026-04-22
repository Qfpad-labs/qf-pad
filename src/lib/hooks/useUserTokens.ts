import { useEffect } from 'react';
import { useAccount, useReadContract } from '@/lib/papi/hooks';
import { TokenFactory } from '../../config';
import { useChainContracts } from '@/lib/hooks/useChainContracts';
import { useBlockchainStore } from '@/lib/store/blockchain-store';

const AUTO_REFRESH_INTERVAL = 10000;

export function useUserTokens(forceRefetch = false) {
  const { address } = useAccount();
  const { tokenFactory } = useChainContracts();

  const {
    getUserTokens,
    setUserTokens,
    setUserTokensLoading,
  } = useBlockchainStore();

  const cachedTokens = address ? getUserTokens(address) : null;
  const shouldFetch = Boolean(address);

  const { data: tokens, isLoading, refetch } = useReadContract({
    abi: TokenFactory.abi,
    address: tokenFactory,
    functionName: 'tokensCreatedBy',
    args: [address as `0x${string}`],
    query: {
      enabled: shouldFetch,
      refetchInterval: shouldFetch ? AUTO_REFRESH_INTERVAL : false,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  });

  useEffect(() => {
    if (address && isLoading) {
      setUserTokensLoading(address, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, isLoading]);

  useEffect(() => {
    if (address && tokens && !isLoading) {
      setUserTokens(address, tokens as `0x${string}`[]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, tokens, isLoading]);

  useEffect(() => {
    if (forceRefetch && address) {
      refetch();
    }
  }, [forceRefetch, address, refetch]);

  const handleRefetch = async () => {
    if (address) {
      setUserTokensLoading(address, true);
      await refetch();
    }
  };

  return {
    tokens: cachedTokens || (tokens as `0x${string}`[]) || [],
    isLoading: address ? isLoading : false,
    refetch: handleRefetch,
  };
}
