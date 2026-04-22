import { PresaleFactory, LaunchpadPresaleContract } from '@/config';
import { useChainContracts } from '@/lib/hooks/useChainContracts';
import { useWriteContract, useWaitForTransactionReceipt } from '@/lib/papi/hooks';
import type { Address } from 'viem';

/**
 * Hook for factory owner to manage whitelisted creators
 */
export function useSetWhitelistedCreator() {
  const { presaleFactory } = useChainContracts();
  const {
    writeContract,
    data: hash,
    isPending,
    isError,
    error,
    reset,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const setWhitelistedCreator = (creatorAddress: Address, whitelisted: boolean) => {
    writeContract({
      address: presaleFactory,
      abi: PresaleFactory.abi,
      functionName: 'setWhitelistedCreator',
      args: [creatorAddress, whitelisted],
    });
  };

  return {
    setWhitelistedCreator,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    isError,
    error,
    reset,
    isBusy: isPending || isConfirming,
  };
}

/**
 * Hook for factory owner to update fee recipient
 */
export function useSetFeeRecipient() {
  const { presaleFactory } = useChainContracts();
  const {
    writeContract,
    data: hash,
    isPending,
    isError,
    error,
    reset,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const setFeeRecipient = (newRecipient: Address) => {
    writeContract({
      address: presaleFactory,
      abi: PresaleFactory.abi,
      functionName: 'setFeeRecipient',
      args: [newRecipient],
    });
  };

  return {
    setFeeRecipient,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    isError,
    error,
    reset,
    isBusy: isPending || isConfirming,
  };
}

/**
 * Hook for fee recipient to update fees on a specific presale
 */
export function useUpdatePresaleFees() {
  const {
    writeContract,
    data: hash,
    isPending,
    isError,
    error,
    reset,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const updateFees = (
    presaleAddress: Address,
    newTokenFeeBps: number,
    newProceedsFeeBps: number
  ) => {
    writeContract({
      address: presaleAddress,
      abi: LaunchpadPresaleContract.abi,
      functionName: 'updateFees',
      args: [BigInt(newTokenFeeBps), BigInt(newProceedsFeeBps)],
    });
  };

  return {
    updateFees,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    isError,
    error,
    reset,
    isBusy: isPending || isConfirming,
  };
}
