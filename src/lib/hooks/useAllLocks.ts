import { TokenLocker } from '@/config';
import { useChainContracts } from '@/lib/hooks/useChainContracts';
import { useMemo } from 'react';
import { erc20Abi, formatUnits, type Address, type Abi } from 'viem';
import { useReadContracts } from '@/lib/papi/hooks';
import { useUserLocks } from './useUserLocks';

interface LockResult {
  token: Address;
  owner: Address;
  amount: bigint;
  lockDate: bigint;
  unlockDate: bigint;
  withdrawn: boolean;
  name: string;
  description: string;
}

const AUTO_REFRESH_INTERVAL = 10000;

export function useAllLocks(forceRefetch = false) {
  const { tokenLocker } = useChainContracts();
  const { lockIds, isLoading: isLoadingLocks, refetch: refetchLocks } = useUserLocks(forceRefetch);

  const lockQueries = useMemo(() => {
    if (!lockIds || lockIds.length === 0) return [];
    return (lockIds as bigint[]).flatMap(lockId => [
      {
        abi: TokenLocker.abi as Abi,
        address: tokenLocker,
        functionName: 'getLock',
        args: [lockId],
      }
    ]);
  }, [lockIds, tokenLocker]);

  const { data: lockData, isLoading: isLoadingLockData, refetch: refetchLockData } = useReadContracts({
    contracts: lockQueries,
    query: {
      enabled: !!lockIds && lockIds.length > 0,
      refetchInterval: lockQueries.length > 0 ? AUTO_REFRESH_INTERVAL : false,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    }
  });

  // Get unique token addresses to avoid redundant queries
  const uniqueTokenAddresses = useMemo(() => {
    if (!lockData) return [];
    const tokens = lockData
      .map(d => (d.result as LockResult | undefined)?.token)
      .filter((t): t is `0x${string}` => !!t);
    return [...new Set(tokens)];
  }, [lockData]);

  const tokenInfoQueries = useMemo(() => {
    if (uniqueTokenAddresses.length === 0) return [];
    return uniqueTokenAddresses.flatMap(tokenAddress => [
      {
        abi: erc20Abi,
        address: tokenAddress,
        functionName: 'symbol',
      },
      {
        abi: erc20Abi,
        address: tokenAddress,
        functionName: 'decimals',
      }
    ]);
  }, [uniqueTokenAddresses]);

  const { data: tokenInfoData, isLoading: isLoadingTokenInfo } = useReadContracts({
    contracts: tokenInfoQueries,
    query: {
      enabled: uniqueTokenAddresses.length > 0,
    }
  });

  // Build a map of token address -> {symbol, decimals} for O(1) lookup
  const tokenInfoMap = useMemo(() => {
    if (!tokenInfoData || uniqueTokenAddresses.length === 0) return new Map();

    const map = new Map<string, { symbol: string; decimals: number }>();
    uniqueTokenAddresses.forEach((tokenAddress, i) => {
      const symbol = tokenInfoData[i * 2]?.result as string;
      const decimals = tokenInfoData[i * 2 + 1]?.result as number;
      if (tokenAddress) {
        map.set(tokenAddress.toLowerCase(), { symbol, decimals });
      }
    });
    return map;
  }, [tokenInfoData, uniqueTokenAddresses]);

  const locks = useMemo(() => {
    if (!lockData || !lockIds) return [];

    return lockData.map((d, i) => {
      try {
        const lock = d.result as LockResult | undefined;
        if (!lock) return null;

        const tokenAddress = lock.token as `0x${string}`;
        const tokenInfo = tokenAddress ? tokenInfoMap.get(tokenAddress.toLowerCase()) : undefined;
        const tokenSymbol = tokenInfo?.symbol || 'Unknown';
        const tokenDecimals = tokenInfo?.decimals ?? 18;

        let formattedAmount = '0';
        try {
          formattedAmount = lock.amount !== undefined 
            ? formatUnits(lock.amount, tokenDecimals)
            : '0';
        } catch (e) {
          console.error("Error formatting lock amount:", e);
          formattedAmount = lock.amount?.toString() || '0';
        }

        const lockId = lockIds[i];
        if (lockId === undefined || lockId === null) return null;

        return {
          id: lockId,
          ...lock,
          tokenSymbol,
          formattedAmount,
        };
      } catch (e) {
        console.error("Error processing lock at index", i, ":", e);
        return null;
      }
    }).filter(l => l !== null);

  }, [lockData, tokenInfoMap, lockIds]);

  const refetch = async () => {
    await refetchLocks();
    refetchLockData();
  }

  return {
    locks,
    isLoading: isLoadingLocks || isLoadingLockData || isLoadingTokenInfo,
    refetch,
  };
}
