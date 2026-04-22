/**
 * Admin utility functions for authentication and authorization
 * Admin is determined by the factoryOwner on the PresaleFactory contract
 */

import { useChainContracts } from '@/lib/hooks/useChainContracts';
import { PresaleFactory } from '@/config';
import { useReadContract } from '@/lib/papi/hooks';
import type { Address } from 'viem';

/**
 * Hook to get the factory owner address
 */
export function useFactoryOwner() {
  const { presaleFactory } = useChainContracts();
  const { data: factoryOwner, isLoading, refetch } = useReadContract({
    address: presaleFactory,
    abi: PresaleFactory.abi,
    functionName: 'factoryOwner',
    query: {
      refetchInterval: 30000, // Refetch every 30 seconds
    },
  });

  return {
    factoryOwner: factoryOwner as Address | undefined,
    isLoading,
    refetch,
  };
}

/**
 * Hook to get the fee recipient address
 */
export function useFeeRecipient() {
  const { presaleFactory } = useChainContracts();
  const { data: feeRecipient, isLoading, refetch } = useReadContract({
    address: presaleFactory,
    abi: PresaleFactory.abi,
    functionName: 'feeRecipient',
    query: {
      refetchInterval: 30000, // Refetch every 30 seconds
    },
  });

  return {
    feeRecipient: feeRecipient as Address | undefined,
    isLoading,
    refetch,
  };
}

/**
 * Hook to check if the current user is an admin (factory owner)
 */
export function useIsAdmin(address: Address | undefined) {
  const { factoryOwner, isLoading } = useFactoryOwner();

  const isAdmin = Boolean(
    address &&
    factoryOwner &&
    address.toLowerCase() === factoryOwner.toLowerCase()
  );

  return {
    isAdmin,
    isLoading,
    factoryOwner,
  };
}

/**
 * Hook to check if the current user is the fee recipient
 */
export function useIsFeeRecipient(address: Address | undefined) {
  const { feeRecipient, isLoading } = useFeeRecipient();

  const isFeeRecipient = Boolean(
    address &&
    feeRecipient &&
    address.toLowerCase() === feeRecipient.toLowerCase()
  );

  return {
    isFeeRecipient,
    isLoading,
    feeRecipient,
  };
}

/**
 * Legacy function for backward compatibility - now always returns false
 * Use useIsAdmin hook instead for proper on-chain verification
 * @deprecated Use useIsAdmin hook instead
 */
export function isAdmin(_address: string | undefined): boolean {
  // This function is deprecated - admin check now happens on-chain
  // Returning false to prevent accidental access
  // The AdminRoute component should use useIsAdmin hook instead
  console.warn('isAdmin() is deprecated. Use useIsAdmin() hook for on-chain verification.');
  return false;
}

/**
 * Legacy function - deprecated
 * @deprecated Use useIsAdmin hook instead
 */
export function useIsAdminLegacy(_address: string | undefined): boolean {
  return isAdmin(_address);
}

/**
 * Legacy function - deprecated
 * @deprecated Admin check now happens on-chain
 */
export function requireAdmin(_address: string | undefined): void {
  console.warn('requireAdmin() is deprecated. Use on-chain admin verification instead.');
  throw new Error('Unauthorized: Admin access requires on-chain verification');
  }

/**
 * Legacy function - deprecated
 * @deprecated Admin addresses are now determined by factoryOwner on-chain
 */
export function getAdminAddresses(): string[] {
  console.warn('getAdminAddresses() is deprecated. Use useFactoryOwner() hook instead.');
  return [];
}
