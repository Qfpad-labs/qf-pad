import { useEffect } from 'react';
import { useAccount, useReadContract } from '@/lib/papi/hooks';
import { TokenLocker } from '@/config';
import { useChainContracts } from '@/lib/hooks/useChainContracts';
import { useBlockchainStore } from '@/lib/store/blockchain-store';

const AUTO_REFRESH_INTERVAL = 10000;

export function useUserLocks(forceRefetch = false) {
  const { address } = useAccount();
  const { tokenLocker } = useChainContracts();

  const {
    getUserLocks,
    setUserLocks,
    setUserLocksLoading,
  } = useBlockchainStore();

  const cachedLockIds = address ? getUserLocks(address) : null;
  const shouldFetch = Boolean(address);

  const { data: lockIds, isLoading, refetch } = useReadContract({
    abi: TokenLocker.abi,
    address: tokenLocker,
    functionName: 'locksOfOwner',
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
      setUserLocksLoading(address, true);
    }
  }, [address, isLoading, setUserLocksLoading]);

  useEffect(() => {
    if (address && lockIds && !isLoading) {
      setUserLocks(address, lockIds as bigint[]);
    }
  }, [address, lockIds, isLoading, setUserLocks]);

  useEffect(() => {
    if (forceRefetch && address) {
      refetch();
    }
  }, [forceRefetch, address, refetch]);

  const handleRefetch = async () => {
    if (address) {
      setUserLocksLoading(address, true);
      await refetch();
    }
  };

  return {
    lockIds: cachedLockIds || (lockIds as bigint[]) || [],
    isLoading: address ? isLoading : false,
    refetch: handleRefetch,
  };
}
