import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useChainContracts } from '@/lib/hooks/useChainContracts';
import { usePublicClient, useReadContract, useReadContracts } from '@/lib/papi/hooks';
import { erc20Abi, parseAbiItem, type Abi, type Address, type PublicClient } from 'viem';
import { PresaleFactoryContract, LaunchpadPresaleContract } from '@/config';
import {
  useLaunchpadPresaleStore,
  type PresaleData,
  type PresaleStatus
} from '@/lib/store/launchpad-presale-store';

const AUTO_REFRESH_INTERVAL = 10000;

const PRESALE_CREATED_EVENT = parseAbiItem(
  'event PresaleCreated(address indexed creator, address indexed presale, address indexed saleToken, address paymentToken, bool requiresWhitelist)'
);

type WhitelistMap = Record<string, boolean>;

async function fetchAllWhitelistFlags(
  client: PublicClient,
  presaleFactoryAddress: Address
): Promise<WhitelistMap> {
  const logs = await client.getLogs({
    address: presaleFactoryAddress,
    event: PRESALE_CREATED_EVENT,
    fromBlock: 0n,
  });

  const map: WhitelistMap = {};
  for (const log of logs) {
    const presaleAddr = (log.args?.presale as Address | undefined)?.toLowerCase();
    if (presaleAddr) {
      map[presaleAddr] = Boolean(log.args?.requiresWhitelist);
    }
  }
  return map;
}

async function fetchWhitelistFlag(
  client: PublicClient,
  presaleFactoryAddress: Address,
  presaleAddress: Address
): Promise<boolean> {
  const logs = await client.getLogs({
    address: presaleFactoryAddress,
    event: PRESALE_CREATED_EVENT,
    args: { presale: presaleAddress },
    fromBlock: 0n,
  });

  if (logs.length === 0) return false;
  const latest = logs[logs.length - 1];
  return Boolean(latest.args?.requiresWhitelist);
}

const presaleFactoryAbi = PresaleFactoryContract.abi as unknown as Abi;
const launchpadPresaleAbi = LaunchpadPresaleContract.abi as unknown as Abi;

export type LaunchpadPresaleFilter = 'all' | 'live' | 'upcoming' | 'ended' | 'finalized' | 'cancelled';

export interface PresaleWithStatus extends PresaleData {
  status: PresaleStatus;
  progress: number; // 0-100
}

export function useLaunchpadPresales(filter: LaunchpadPresaleFilter = 'all', forceRefetch = false) {
  const {
    getPresaleAddresses,
    setPresaleAddresses,
    setPresaleAddressesLoading,
    setPresale,
    getPresale,
    getPresaleStatus,
    presales: presaleCache,
  } = useLaunchpadPresaleStore();

  const publicClient = usePublicClient();
  const { presaleFactory } = useChainContracts();
  const [whitelistMap, setWhitelistMap] = useState<WhitelistMap>({});

  useEffect(() => {
    setWhitelistMap({});
  }, [presaleFactory]);

  const cachedAddresses = getPresaleAddresses();
  const shouldFetchAddresses = Boolean(presaleFactory);

  // Fetch total number of presales
  const { data: totalPresales, isLoading: isLoadingTotal, refetch: refetchTotal } = useReadContract({
    abi: presaleFactoryAbi,
    address: presaleFactory,
    functionName: 'totalPresales',
    query: {
      enabled: shouldFetchAddresses,
      refetchInterval: shouldFetchAddresses ? AUTO_REFRESH_INTERVAL : false,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  });

  // Build queries to fetch all presale addresses
  const addressQueries = useMemo(() => {
    if (!totalPresales || totalPresales === 0n) return [];
    const count = Number(totalPresales);
    return Array.from({ length: count }, (_, i) => ({
      abi: presaleFactoryAbi,
      address: presaleFactory,
      functionName: 'allPresales',
      args: [BigInt(i)],
    } as const));
  }, [presaleFactory, totalPresales]);

  const { data: addressResults, isLoading: isLoadingAddresses, refetch: refetchAddresses } = useReadContracts({
    contracts: addressQueries,
    query: {
      enabled: addressQueries.length > 0,
      refetchInterval: addressQueries.length > 0 ? AUTO_REFRESH_INTERVAL : false,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  });

  // Extract addresses from results
  const presaleAddresses = useMemo(() => {
    if (!addressResults) return cachedAddresses || [];
    return addressResults
      .map((r) => r.result as Address | undefined)
      .filter((addr): addr is Address => !!addr);
  }, [addressResults, cachedAddresses]);

  const unknownWhitelistCount = useMemo(() => {
    if (!presaleAddresses || presaleAddresses.length === 0) return 0;
    return presaleAddresses.reduce((count, addr) => {
      return count + (whitelistMap[addr.toLowerCase()] === undefined ? 1 : 0);
    }, 0);
  }, [presaleAddresses, whitelistMap]);

  useEffect(() => {
    if (!publicClient) return;
    if (!presaleAddresses || presaleAddresses.length === 0) return;
    if (unknownWhitelistCount === 0) return;

    let cancelled = false;
    (async () => {
      try {
        const latest = await fetchAllWhitelistFlags(publicClient, presaleFactory);
        if (!cancelled) {
          setWhitelistMap((prev) => ({ ...prev, ...latest }));
        }
      } catch (error) {
        console.error('Failed to read whitelist flags', error);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [presaleFactory, publicClient, presaleAddresses, unknownWhitelistCount]);

  // Update cache when addresses are fetched
  useEffect(() => {
    if (presaleAddresses.length > 0 && !isLoadingAddresses && addressResults) {
      // Only update if we have new data from the blockchain
      const currentCache = getPresaleAddresses();
      const hasChanged = !currentCache ||
        currentCache.length !== presaleAddresses.length ||
        currentCache.some((addr, i) => addr !== presaleAddresses[i]);

      if (hasChanged) {
        setPresaleAddresses(presaleAddresses);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressResults, isLoadingAddresses]);

  useEffect(() => {
    if (shouldFetchAddresses && (isLoadingTotal || isLoadingAddresses)) {
      setPresaleAddressesLoading(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldFetchAddresses, isLoadingTotal, isLoadingAddresses]);

  // Filter addresses that need fresh data
  const addressesToFetch = useMemo(() => presaleAddresses, [presaleAddresses]);

  // Build queries for presale data
  const presaleDataQueries = useMemo(() => {
    if (addressesToFetch.length === 0) return [];

    return addressesToFetch.flatMap((addr) =>
      [
        'saleToken',
        'paymentToken',
        'isPaymentETH',
        'startTime',
        'endTime',
        'rate',
        'softCap',
        'hardCap',
        'minContribution',
        'maxContribution',
        'totalRaised',
        'committedTokens',
        'totalTokensDeposited',
        'claimEnabled',
        'refundsEnabled',
        'owner',
      ]
        .map((functionName) => ({
          abi: launchpadPresaleAbi,
          address: addr,
          functionName,
        } as const))
      );
  }, [addressesToFetch]);

  const { data: presaleDataResults, isLoading: isLoadingPresaleData, refetch: refetchPresaleData } = useReadContracts({
    contracts: presaleDataQueries,
    query: {
      enabled: presaleDataQueries.length > 0,
      refetchInterval: presaleDataQueries.length > 0 ? AUTO_REFRESH_INTERVAL : false,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  });

  // Parse presale data and update cache
  const parsedPresales = useMemo(() => {
    if (!presaleDataResults || addressesToFetch.length === 0) return [];

    const FIELDS_PER_PRESALE = 16;
    const parsed: PresaleData[] = [];

    for (let i = 0; i < addressesToFetch.length; i++) {
      const baseIdx = i * FIELDS_PER_PRESALE;
      const addr = addressesToFetch[i];
      const whitelistKey = addr.toLowerCase();

      const presale: PresaleData = {
        address: addr,
        saleToken: presaleDataResults[baseIdx]?.result as Address,
        paymentToken: presaleDataResults[baseIdx + 1]?.result as Address,
        isPaymentETH: presaleDataResults[baseIdx + 2]?.result as boolean,
        requiresWhitelist: whitelistMap[whitelistKey] ?? false,
        startTime: presaleDataResults[baseIdx + 3]?.result as bigint,
        endTime: presaleDataResults[baseIdx + 4]?.result as bigint,
        rate: presaleDataResults[baseIdx + 5]?.result as bigint,
        softCap: presaleDataResults[baseIdx + 6]?.result as bigint,
        hardCap: presaleDataResults[baseIdx + 7]?.result as bigint,
        minContribution: presaleDataResults[baseIdx + 8]?.result as bigint,
        maxContribution: presaleDataResults[baseIdx + 9]?.result as bigint,
        totalRaised: presaleDataResults[baseIdx + 10]?.result as bigint,
        committedTokens: presaleDataResults[baseIdx + 11]?.result as bigint,
        totalTokensDeposited: presaleDataResults[baseIdx + 12]?.result as bigint,
        claimEnabled: presaleDataResults[baseIdx + 13]?.result as boolean,
        refundsEnabled: presaleDataResults[baseIdx + 14]?.result as boolean,
        owner: presaleDataResults[baseIdx + 15]?.result as Address,
      };

      parsed.push(presale);
    }

    return parsed;
  }, [presaleDataResults, addressesToFetch, whitelistMap]);

  // Get unique token addresses for fetching token info
  const uniqueTokenAddresses = useMemo(() => {
    const tokens = new Set<Address>();
    for (const presale of parsedPresales) {
      if (presale.saleToken) tokens.add(presale.saleToken);
      if (presale.paymentToken && !presale.isPaymentETH) tokens.add(presale.paymentToken);
    }
    return Array.from(tokens);
  }, [parsedPresales]);

  // Fetch token info
  const tokenInfoQueries = useMemo(() => {
    if (uniqueTokenAddresses.length === 0) return [];
    return uniqueTokenAddresses.flatMap((addr) => [
      { abi: erc20Abi, address: addr, functionName: 'symbol' } as const,
      { abi: erc20Abi, address: addr, functionName: 'name' } as const,
      { abi: erc20Abi, address: addr, functionName: 'decimals' } as const,
    ]);
  }, [uniqueTokenAddresses]);

  const { data: tokenInfoResults, isLoading: isLoadingTokenInfo } = useReadContracts({
    contracts: tokenInfoQueries,
    query: {
      enabled: tokenInfoQueries.length > 0,
    },
  });

  // Build token info map
  const tokenInfoMap = useMemo(() => {
    if (!tokenInfoResults || uniqueTokenAddresses.length === 0) return new Map();

    const map = new Map<string, { symbol: string; name: string; decimals: number }>();
    for (let i = 0; i < uniqueTokenAddresses.length; i++) {
      const addr = uniqueTokenAddresses[i];
      const symbol = tokenInfoResults[i * 3]?.result as string;
      const name = tokenInfoResults[i * 3 + 1]?.result as string;
      const decimals = tokenInfoResults[i * 3 + 2]?.result as number;
      map.set(addr.toLowerCase(), { symbol, name, decimals });
    }
    return map;
  }, [tokenInfoResults, uniqueTokenAddresses]);

  // Update cache with complete presale data
  useEffect(() => {
    if (parsedPresales.length > 0 && !isLoadingPresaleData && !isLoadingTokenInfo) {
      for (const presale of parsedPresales) {
        const saleTokenInfo = presale.saleToken
          ? tokenInfoMap.get(presale.saleToken.toLowerCase())
          : undefined;
        const paymentTokenInfo = presale.paymentToken && !presale.isPaymentETH
          ? tokenInfoMap.get(presale.paymentToken.toLowerCase())
          : undefined;

        setPresale(presale.address, {
          ...presale,
          saleTokenSymbol: saleTokenInfo?.symbol,
          saleTokenName: saleTokenInfo?.name,
          saleTokenDecimals: saleTokenInfo?.decimals,
          paymentTokenSymbol: presale.isPaymentETH ? 'QF' : paymentTokenInfo?.symbol,
          paymentTokenName: presale.isPaymentETH ? 'QF Network' : paymentTokenInfo?.name,
          paymentTokenDecimals: presale.isPaymentETH ? 18 : paymentTokenInfo?.decimals,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parsedPresales, tokenInfoMap, isLoadingPresaleData, isLoadingTokenInfo]);

  // Get all presales with status and progress
  const allPresales = useMemo((): PresaleWithStatus[] => {
    return presaleAddresses.map((addr) => {
      const cached = getPresale(addr);
      if (!cached) return null;

      const status = getPresaleStatus(cached);
      const progress = cached.hardCap && cached.hardCap > 0n
        ? Number((cached.totalRaised * 100n) / cached.hardCap)
        : 0;

      return {
        ...cached,
        status,
        progress: Math.min(progress, 100),
      };
    }).filter((p): p is PresaleWithStatus => p !== null);
  }, [presaleAddresses, getPresale, getPresaleStatus, presaleCache]);

  // Filter presales by status
  const filteredPresales = useMemo(() => {
    if (filter === 'all') return allPresales;
    if (filter === 'ended') {
      return allPresales.filter((p) => p.status === 'ended' || p.claimEnabled || p.refundsEnabled);
    }
    return allPresales.filter((p) => p.status === filter);
  }, [allPresales, filter]);

  const refetch = useCallback(async () => {
    setPresaleAddressesLoading(true);
    await refetchTotal();
    await refetchAddresses();
    await refetchPresaleData();
  }, [refetchAddresses, refetchPresaleData, refetchTotal, setPresaleAddressesLoading]);

  const isLoading = isLoadingTotal || isLoadingAddresses || isLoadingPresaleData || isLoadingTokenInfo;

  useEffect(() => {
    if (forceRefetch) {
      refetch();
    }
  }, [forceRefetch, refetch]);

  return {
    presales: filteredPresales,
    allPresales,
    presaleAddresses,
    isLoading,
    refetch,
  };
}

// Hook to get a single presale by address
export function useLaunchpadPresale(presaleAddress: Address | undefined, forceRefetch = false) {
  const {
    getPresale,
    setPresale,
    getPresaleStatus,
  } = useLaunchpadPresaleStore();

  const publicClient = usePublicClient();
  const { presaleFactory } = useChainContracts();
  const cachedPresale = presaleAddress ? getPresale(presaleAddress) : null;
  const [requiresWhitelist, setRequiresWhitelist] = useState<boolean | undefined>(cachedPresale?.requiresWhitelist);

  const shouldFetch = Boolean(presaleAddress);

  useEffect(() => {
    if (cachedPresale?.requiresWhitelist !== undefined) {
      setRequiresWhitelist(cachedPresale.requiresWhitelist);
    }
  }, [cachedPresale?.requiresWhitelist]);

  useEffect(() => {
    if (!publicClient || !presaleAddress) return;
    if (requiresWhitelist !== undefined) return;

    let cancelled = false;
    (async () => {
      try {
        const flag = await fetchWhitelistFlag(publicClient, presaleFactory, presaleAddress);
        if (!cancelled) {
          setRequiresWhitelist(flag);
        }
      } catch (error) {
        console.error('Failed to fetch whitelist flag', error);
        if (!cancelled) {
          setRequiresWhitelist(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [presaleFactory, publicClient, presaleAddress, requiresWhitelist]);

  // Fetch presale data
  const presaleDataQueries = useMemo(() => {
    if (!presaleAddress || !shouldFetch) return [];
    return [
      { abi: launchpadPresaleAbi, address: presaleAddress, functionName: 'saleToken' },
      { abi: launchpadPresaleAbi, address: presaleAddress, functionName: 'paymentToken' },
      { abi: launchpadPresaleAbi, address: presaleAddress, functionName: 'isPaymentETH' },
      { abi: launchpadPresaleAbi, address: presaleAddress, functionName: 'startTime' },
      { abi: launchpadPresaleAbi, address: presaleAddress, functionName: 'endTime' },
      { abi: launchpadPresaleAbi, address: presaleAddress, functionName: 'rate' },
      { abi: launchpadPresaleAbi, address: presaleAddress, functionName: 'softCap' },
      { abi: launchpadPresaleAbi, address: presaleAddress, functionName: 'hardCap' },
      { abi: launchpadPresaleAbi, address: presaleAddress, functionName: 'minContribution' },
      { abi: launchpadPresaleAbi, address: presaleAddress, functionName: 'maxContribution' },
      { abi: launchpadPresaleAbi, address: presaleAddress, functionName: 'totalRaised' },
      { abi: launchpadPresaleAbi, address: presaleAddress, functionName: 'committedTokens' },
      { abi: launchpadPresaleAbi, address: presaleAddress, functionName: 'totalTokensDeposited' },
      { abi: launchpadPresaleAbi, address: presaleAddress, functionName: 'claimEnabled' },
      { abi: launchpadPresaleAbi, address: presaleAddress, functionName: 'refundsEnabled' },
      { abi: launchpadPresaleAbi, address: presaleAddress, functionName: 'owner' },
    ];
  }, [presaleAddress, shouldFetch]);

  const { data: presaleDataResults, isLoading: isLoadingPresaleData, refetch: refetchPresale } = useReadContracts({
    contracts: presaleDataQueries,
    query: {
      enabled: presaleDataQueries.length > 0,
      refetchInterval: presaleDataQueries.length > 0 ? AUTO_REFRESH_INTERVAL : false,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  });

  useEffect(() => {
    if (forceRefetch && presaleAddress) {
      refetchPresale();
    }
  }, [forceRefetch, presaleAddress, refetchPresale]);

  // Parse presale data
  const presaleData = useMemo((): PresaleData | null => {
    if (!presaleAddress) return null;
    if (!presaleDataResults || presaleDataResults.length === 0) {
      return cachedPresale;
    }

    // Check if we got valid results (not errors)
    const hasValidResults = presaleDataResults.every(r => r.status === 'success');
    if (!hasValidResults) {
      return cachedPresale;
    }

    return {
      address: presaleAddress,
      saleToken: (presaleDataResults[0]?.result ?? cachedPresale?.saleToken) as Address,
      paymentToken: (presaleDataResults[1]?.result ?? cachedPresale?.paymentToken) as Address,
      isPaymentETH: (presaleDataResults[2]?.result ?? cachedPresale?.isPaymentETH ?? false) as boolean,
      requiresWhitelist: requiresWhitelist ?? cachedPresale?.requiresWhitelist ?? false,
      startTime: (presaleDataResults[3]?.result ?? cachedPresale?.startTime ?? 0n) as bigint,
      endTime: (presaleDataResults[4]?.result ?? cachedPresale?.endTime ?? 0n) as bigint,
      rate: (presaleDataResults[5]?.result ?? cachedPresale?.rate ?? 0n) as bigint,
      softCap: (presaleDataResults[6]?.result ?? cachedPresale?.softCap ?? 0n) as bigint,
      hardCap: (presaleDataResults[7]?.result ?? cachedPresale?.hardCap ?? 0n) as bigint,
      minContribution: (presaleDataResults[8]?.result ?? cachedPresale?.minContribution ?? 0n) as bigint,
      maxContribution: (presaleDataResults[9]?.result ?? cachedPresale?.maxContribution ?? 0n) as bigint,
      totalRaised: (presaleDataResults[10]?.result ?? cachedPresale?.totalRaised ?? 0n) as bigint,
      committedTokens: (presaleDataResults[11]?.result ?? cachedPresale?.committedTokens ?? 0n) as bigint,
      totalTokensDeposited: (presaleDataResults[12]?.result ?? cachedPresale?.totalTokensDeposited ?? 0n) as bigint,
      claimEnabled: (presaleDataResults[13]?.result ?? cachedPresale?.claimEnabled ?? false) as boolean,
      refundsEnabled: (presaleDataResults[14]?.result ?? cachedPresale?.refundsEnabled ?? false) as boolean,
      owner: (presaleDataResults[15]?.result ?? cachedPresale?.owner) as Address,
    };
  }, [presaleAddress, presaleDataResults, cachedPresale, requiresWhitelist]);

  // Fetch token info
  const tokenAddresses = useMemo(() => {
    if (!presaleData) return [];
    const addrs: Address[] = [];
    if (presaleData.saleToken) addrs.push(presaleData.saleToken);
    if (presaleData.paymentToken && !presaleData.isPaymentETH) addrs.push(presaleData.paymentToken);
    return addrs;
  }, [presaleData]);

  const tokenInfoQueries = useMemo(() => {
    return tokenAddresses.flatMap((addr) => [
      { abi: erc20Abi, address: addr, functionName: 'symbol' } as const,
      { abi: erc20Abi, address: addr, functionName: 'name' } as const,
      { abi: erc20Abi, address: addr, functionName: 'decimals' } as const,
    ]);
  }, [tokenAddresses]);

  const { data: tokenInfoResults, isLoading: isLoadingTokenInfo } = useReadContracts({
    contracts: tokenInfoQueries,
    query: {
      enabled: tokenInfoQueries.length > 0,
    },
  });

  // Build complete presale with token info
  const completePresale = useMemo((): PresaleWithStatus | null => {
    if (!presaleData) return null;

    // Start with cached token info as fallback
    let saleTokenSymbol: string | undefined = cachedPresale?.saleTokenSymbol;
    let saleTokenName: string | undefined = cachedPresale?.saleTokenName;
    let saleTokenDecimals: number | undefined = cachedPresale?.saleTokenDecimals;
    let paymentTokenSymbol: string | undefined = cachedPresale?.paymentTokenSymbol;
    let paymentTokenName: string | undefined = cachedPresale?.paymentTokenName;
    let paymentTokenDecimals: number | undefined = cachedPresale?.paymentTokenDecimals;

    // Override with fresh data if available
    if (tokenInfoResults && tokenAddresses.length > 0) {
      // Sale token is always first
      saleTokenSymbol = tokenInfoResults[0]?.result as string ?? saleTokenSymbol;
      saleTokenName = tokenInfoResults[1]?.result as string ?? saleTokenName;
      saleTokenDecimals = tokenInfoResults[2]?.result as number ?? saleTokenDecimals;

      if (tokenAddresses.length > 1) {
        paymentTokenSymbol = tokenInfoResults[3]?.result as string ?? paymentTokenSymbol;
        paymentTokenName = tokenInfoResults[4]?.result as string ?? paymentTokenName;
        paymentTokenDecimals = tokenInfoResults[5]?.result as number ?? paymentTokenDecimals;
      }
    }

    // Set native token values if payment is QF
    if (presaleData.isPaymentETH) {
      paymentTokenSymbol = 'QF';
      paymentTokenName = 'QF Network';
      paymentTokenDecimals = 18;
    }

    const status = getPresaleStatus(presaleData);
    const progress = presaleData.hardCap && presaleData.hardCap > 0n
      ? Number((presaleData.totalRaised * 100n) / presaleData.hardCap)
      : 0;

    return {
      ...presaleData,
      saleTokenSymbol,
      saleTokenName,
      saleTokenDecimals,
      paymentTokenSymbol,
      paymentTokenName,
      paymentTokenDecimals,
      status,
      progress: Math.min(progress, 100),
    };
  }, [presaleData, tokenInfoResults, tokenAddresses, getPresaleStatus, cachedPresale]);

  // Track last update to prevent unnecessary cache writes
  const lastUpdateRef = useRef<{ address: string; timestamp: number } | null>(null);

  // Update cache when loading completes with fresh data
  useEffect(() => {
    if (isLoadingPresaleData || isLoadingTokenInfo || !completePresale) {
      return;
    }

    const addressKey = completePresale.address.toLowerCase();
    const now = Date.now();

    // Debounce updates - only update if address changed or 1 second has passed
    const lastUpdate = lastUpdateRef.current;
    const shouldUpdate = !lastUpdate ||
      lastUpdate.address !== addressKey ||
      (now - lastUpdate.timestamp) > 1000;

    if (shouldUpdate) {
      setPresale(completePresale.address, completePresale);
      lastUpdateRef.current = { address: addressKey, timestamp: now };
    }
  }, [completePresale, isLoadingPresaleData, isLoadingTokenInfo, setPresale]);

  return {
    presale: completePresale,
    isLoading: isLoadingPresaleData || isLoadingTokenInfo,
    refetch: refetchPresale,
  };
}

// Hook to get user's contribution data for a presale
export function useUserPresaleContribution(
  presaleAddress: Address | undefined,
  userAddress: Address | undefined
) {
  const {
    getUserPresaleData,
    setUserPresaleData,
    isUserPresaleDataStale,
    invalidateUserPresaleData,
  } = useLaunchpadPresaleStore();

  const shouldFetch = presaleAddress && userAddress &&
    isUserPresaleDataStale(userAddress, presaleAddress);

  const userDataQueries = useMemo(() => {
    if (!presaleAddress || !userAddress || !shouldFetch) return [];
    return [
      {
        abi: launchpadPresaleAbi,
        address: presaleAddress,
        functionName: 'contributions',
        args: [userAddress]
      },
      {
        abi: launchpadPresaleAbi,
        address: presaleAddress,
        functionName: 'purchasedTokens',
        args: [userAddress]
      },
    ];
  }, [presaleAddress, userAddress, shouldFetch]);

  const { data: userDataResults, isLoading, refetch } = useReadContracts({
    contracts: userDataQueries,
    query: {
      enabled: userDataQueries.length > 0,
    },
  });

  const userData = useMemo(() => {
    if (!presaleAddress || !userAddress) return null;

    const cachedData = getUserPresaleData(userAddress, presaleAddress);

    if (userDataResults && userDataResults.length >= 2) {
      // Check if results are valid
      const hasValidResults = userDataResults.every(r => r.status === 'success');
      if (hasValidResults) {
      return {
          contribution: (userDataResults[0]?.result ?? cachedData?.contribution ?? 0n) as bigint,
          purchasedTokens: (userDataResults[1]?.result ?? cachedData?.purchasedTokens ?? 0n) as bigint,
      };
      }
    }

    return cachedData;
  }, [presaleAddress, userAddress, userDataResults, getUserPresaleData]);

  // Update cache
  useEffect(() => {
    if (userData && presaleAddress && userAddress && !isLoading) {
      setUserPresaleData(userAddress, presaleAddress, userData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData, presaleAddress, userAddress, isLoading]);

  const invalidate = () => {
    if (userAddress && presaleAddress) {
      invalidateUserPresaleData(userAddress, presaleAddress);
    }
  };

  return {
    contribution: userData?.contribution ?? 0n,
    purchasedTokens: userData?.purchasedTokens ?? 0n,
    isLoading,
    refetch,
    invalidate,
  };
}
