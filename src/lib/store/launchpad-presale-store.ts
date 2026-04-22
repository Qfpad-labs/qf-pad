import { type Address } from 'viem';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type PresaleStatus = 'upcoming' | 'live' | 'ended' | 'finalized' | 'cancelled';
export type PresaleCategory = 'defi' | 'ai' | 'gaming' | 'infrastructure' | 'meme' | 'other';

export interface PresaleSocials {
  twitter?: string;
  telegram?: string;
  discord?: string;
  website?: string;
}

export interface PresaleData {
  address: Address;
  saleToken: Address;
  paymentToken: Address;
  isPaymentETH: boolean;
  requiresWhitelist?: boolean;
  startTime: bigint;
  endTime: bigint;
  rate: bigint;
  softCap: bigint;
  hardCap: bigint;
  minContribution: bigint;
  maxContribution: bigint;
  totalRaised: bigint;
  committedTokens: bigint;
  totalTokensDeposited: bigint;
  claimEnabled: boolean;
  refundsEnabled: boolean;
  owner: Address;
  // Token info
  saleTokenSymbol?: string;
  saleTokenName?: string;
  saleTokenDecimals?: number;
  paymentTokenSymbol?: string;
  paymentTokenName?: string;
  paymentTokenDecimals?: number;
  // Metadata (from external source)
  category?: PresaleCategory;
  socials?: PresaleSocials;
  description?: string;
  logo?: string;
}

export interface UserPresaleData {
  contribution: bigint;
  purchasedTokens: bigint;
}

interface CacheMetadata {
  timestamp: number;
  isLoading: boolean;
}

interface LaunchpadPresaleStore {
  // Presale addresses from factory
  presaleAddresses: {
    data: Address[];
    metadata: CacheMetadata;
  };

  // Individual presale data cache
  presales: Record<string, {
    data: PresaleData;
    metadata: CacheMetadata;
  }>;

  // User-specific data per presale
  userPresaleData: Record<string, Record<string, {
    data: UserPresaleData;
    metadata: CacheMetadata;
  }>>;

  // Actions for presale addresses
  setPresaleAddresses: (addresses: Address[]) => void;
  setPresaleAddressesLoading: (isLoading: boolean) => void;
  getPresaleAddresses: () => Address[] | null;
  isPresaleAddressesStale: (maxAge?: number) => boolean;

  // Actions for individual presales
  setPresale: (address: Address, data: PresaleData) => void;
  setPresaleLoading: (address: Address, isLoading: boolean) => void;
  getPresale: (address: Address) => PresaleData | null;
  isPresaleStale: (address: Address, maxAge?: number) => boolean;
  invalidatePresale: (address: Address) => void;

  // Actions for user presale data
  setUserPresaleData: (userAddress: string, presaleAddress: Address, data: UserPresaleData) => void;
  getUserPresaleData: (userAddress: string, presaleAddress: Address) => UserPresaleData | null;
  isUserPresaleDataStale: (userAddress: string, presaleAddress: Address, maxAge?: number) => boolean;
  invalidateUserPresaleData: (userAddress: string, presaleAddress: Address) => void;

  // Utility functions
  getPresaleStatus: (presale: PresaleData) => PresaleStatus;
  getPresalesByStatus: (status: PresaleStatus) => PresaleData[];

  // Clear cache
  clearCache: () => void;
  clearUserCache: (userAddress: string) => void;
}

const DEFAULT_CACHE_TIME = 30 * 1000; // 30 seconds for presale data (more dynamic)
const ADDRESSES_CACHE_TIME = 5 * 60 * 1000; // 5 minutes for addresses list

export const useLaunchpadPresaleStore = create<LaunchpadPresaleStore>()(
  persist(
    (set, get) => ({
      // Initial state
      presaleAddresses: {
        data: [],
        metadata: { timestamp: 0, isLoading: false },
      },
      presales: {},
      userPresaleData: {},

      // Presale addresses actions
      setPresaleAddresses: (addresses) =>
        set({
          presaleAddresses: {
            data: addresses,
            metadata: { timestamp: Date.now(), isLoading: false },
          },
        }),

      setPresaleAddressesLoading: (isLoading) =>
        set((state) => ({
          presaleAddresses: {
            ...state.presaleAddresses,
            metadata: { ...state.presaleAddresses.metadata, isLoading },
          },
        })),

      getPresaleAddresses: () => {
        const { presaleAddresses } = get();
        return presaleAddresses.data.length > 0 ? presaleAddresses.data : null;
      },

      isPresaleAddressesStale: (maxAge = ADDRESSES_CACHE_TIME) => {
        const { presaleAddresses } = get();
        if (!presaleAddresses.metadata.timestamp) return true;
        return Date.now() - presaleAddresses.metadata.timestamp > maxAge;
      },

      // Individual presale actions
      setPresale: (address, data) =>
        set((state) => ({
          presales: {
            ...state.presales,
            [address.toLowerCase()]: {
              data,
              metadata: { timestamp: Date.now(), isLoading: false },
            },
          },
        })),

      setPresaleLoading: (address, isLoading) =>
        set((state) => ({
          presales: {
            ...state.presales,
            [address.toLowerCase()]: {
              data: state.presales[address.toLowerCase()]?.data || {} as PresaleData,
              metadata: {
                timestamp: state.presales[address.toLowerCase()]?.metadata.timestamp || 0,
                isLoading,
              },
            },
          },
        })),

      getPresale: (address) => {
        const cached = get().presales[address.toLowerCase()];
        return cached ? cached.data : null;
      },

      isPresaleStale: (address, maxAge = DEFAULT_CACHE_TIME) => {
        const cached = get().presales[address.toLowerCase()];
        if (!cached) return true;
        return Date.now() - cached.metadata.timestamp > maxAge;
      },

      invalidatePresale: (address) =>
        set((state) => {
          const { [address.toLowerCase()]: _, ...rest } = state.presales;
          return { presales: rest };
        }),

      // User presale data actions
      setUserPresaleData: (userAddress, presaleAddress, data) =>
        set((state) => ({
          userPresaleData: {
            ...state.userPresaleData,
            [userAddress.toLowerCase()]: {
              ...state.userPresaleData[userAddress.toLowerCase()],
              [presaleAddress.toLowerCase()]: {
                data,
                metadata: { timestamp: Date.now(), isLoading: false },
              },
            },
          },
        })),

      getUserPresaleData: (userAddress, presaleAddress) => {
        const userCache = get().userPresaleData[userAddress.toLowerCase()];
        if (!userCache) return null;
        const presaleCache = userCache[presaleAddress.toLowerCase()];
        return presaleCache ? presaleCache.data : null;
      },

      isUserPresaleDataStale: (userAddress, presaleAddress, maxAge = DEFAULT_CACHE_TIME) => {
        const userCache = get().userPresaleData[userAddress.toLowerCase()];
        if (!userCache) return true;
        const presaleCache = userCache[presaleAddress.toLowerCase()];
        if (!presaleCache) return true;
        return Date.now() - presaleCache.metadata.timestamp > maxAge;
      },

      invalidateUserPresaleData: (userAddress, presaleAddress) =>
        set((state) => {
          const userCache = state.userPresaleData[userAddress.toLowerCase()];
          if (!userCache) return state;
          const { [presaleAddress.toLowerCase()]: _, ...rest } = userCache;
          return {
            userPresaleData: {
              ...state.userPresaleData,
              [userAddress.toLowerCase()]: rest,
            },
          };
        }),

      // Utility functions
      getPresaleStatus: (presale) => {
        const now = BigInt(Math.floor(Date.now() / 1000));

        if (presale.refundsEnabled) return 'cancelled';
        if (presale.claimEnabled) return 'finalized';
        if (now < presale.startTime) return 'upcoming';
        if (now > presale.endTime) return 'ended';
        return 'live';
      },

      getPresalesByStatus: (status) => {
        const { presales, getPresaleStatus } = get();
        return Object.values(presales)
          .map((p) => p.data)
          .filter((presale) => presale.address && getPresaleStatus(presale) === status);
      },

      // Cache management
      clearCache: () =>
        set({
          presaleAddresses: {
            data: [],
            metadata: { timestamp: 0, isLoading: false },
          },
          presales: {},
          userPresaleData: {},
        }),

      clearUserCache: (userAddress) =>
        set((state) => {
          const { [userAddress.toLowerCase()]: _, ...rest } = state.userPresaleData;
          return { userPresaleData: rest };
        }),
    }),
    {
      name: 'launchpad-presale-storage',
      // Custom storage to handle BigInt serialization
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          return JSON.parse(str, (_, value) => {
            if (typeof value === 'string' && value.startsWith('__bigint__:')) {
              return BigInt(value.slice(11));
            }
            return value;
          });
        },
        setItem: (name, value) => {
          localStorage.setItem(
            name,
            JSON.stringify(value, (_, val) => {
              if (typeof val === 'bigint') {
                return `__bigint__:${val.toString()}`;
              }
              return val;
            })
          );
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
      // Only persist the data, not loading states
      partialize: (state) => ({
        presaleAddresses: {
          ...state.presaleAddresses,
          metadata: { ...state.presaleAddresses.metadata, isLoading: false },
        },
        presales: Object.fromEntries(
          Object.entries(state.presales).map(([key, value]) => [
            key,
            { ...value, metadata: { ...value.metadata, isLoading: false } },
          ])
        ),
        userPresaleData: Object.fromEntries(
          Object.entries(state.userPresaleData).map(([userKey, userValue]) => [
            userKey,
            Object.fromEntries(
              Object.entries(userValue).map(([presaleKey, presaleValue]) => [
                presaleKey,
                { ...presaleValue, metadata: { ...presaleValue.metadata, isLoading: false } },
              ])
            ),
          ])
        ),
      }) as LaunchpadPresaleStore,
    }
  )
);
