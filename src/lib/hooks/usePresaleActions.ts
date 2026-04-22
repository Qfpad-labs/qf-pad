import { LaunchpadPresaleContract } from '@/config';
import { useLaunchpadPresaleStore } from '@/lib/store/launchpad-presale-store';
import { useCallback } from 'react';
import { type Address } from 'viem';
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from '@/lib/papi/hooks';

export interface ContributeParams {
  presaleAddress: Address;
  amount: bigint;
  isPaymentETH: boolean;
  paymentTokenDecimals?: number;
}

export function usePresaleContribute() {
  const { address: userAddress } = useAccount();
  const { invalidatePresale, invalidateUserPresaleData } = useLaunchpadPresaleStore();

  const {
    data: hash,
    writeContract,
    isPending: isWritePending,
    error: writeError,
    reset,
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess,
    error: confirmError,
  } = useWaitForTransactionReceipt({ hash });

  const contribute = useCallback(
    async ({ presaleAddress, amount, isPaymentETH }: ContributeParams) => {
      if (isPaymentETH) {
        // For QF payments, send QF value and pass 0 as amount parameter
        writeContract({
          abi: LaunchpadPresaleContract.abi,
          address: presaleAddress,
          functionName: 'contribute',
          args: [0n],
          value: amount,
        });
      } else {
        // For ERC20 payments, pass amount as parameter with no QF value
        writeContract({
          abi: LaunchpadPresaleContract.abi,
          address: presaleAddress,
          functionName: 'contribute',
          args: [amount],
        });
      }
    },
    [writeContract]
  );

  // Invalidate cache after successful transaction
  const invalidateOnSuccess = useCallback(
    (presaleAddress: Address) => {
      if (isSuccess && userAddress) {
        invalidatePresale(presaleAddress);
        invalidateUserPresaleData(userAddress, presaleAddress);
      }
    },
    [isSuccess, userAddress, invalidatePresale, invalidateUserPresaleData]
  );

  return {
    contribute,
    hash,
    isPending: isWritePending,
    isConfirming,
    isSuccess,
    error: writeError || confirmError,
    reset,
    invalidateOnSuccess,
  };
}

export function usePresaleClaimTokens() {
  const { address: userAddress } = useAccount();
  const { invalidatePresale, invalidateUserPresaleData } = useLaunchpadPresaleStore();

  const {
    data: hash,
    writeContract,
    isPending: isWritePending,
    error: writeError,
    reset,
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess,
    error: confirmError,
  } = useWaitForTransactionReceipt({ hash });

  const claimTokens = useCallback(
    (presaleAddress: Address) => {
      writeContract({
        abi: LaunchpadPresaleContract.abi,
        address: presaleAddress,
        functionName: 'claimTokens',
      });
    },
    [writeContract]
  );

  const invalidateOnSuccess = useCallback(
    (presaleAddress: Address) => {
      if (isSuccess && userAddress) {
        invalidatePresale(presaleAddress);
        invalidateUserPresaleData(userAddress, presaleAddress);
      }
    },
    [isSuccess, userAddress, invalidatePresale, invalidateUserPresaleData]
  );

  return {
    claimTokens,
    hash,
    isPending: isWritePending,
    isConfirming,
    isSuccess,
    error: writeError || confirmError,
    reset,
    invalidateOnSuccess,
  };
}

export function usePresaleClaimRefund() {
  const { address: userAddress } = useAccount();
  const { invalidatePresale, invalidateUserPresaleData } = useLaunchpadPresaleStore();

  const {
    data: hash,
    writeContract,
    isPending: isWritePending,
    error: writeError,
    reset,
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess,
    error: confirmError,
  } = useWaitForTransactionReceipt({ hash });

  const claimRefund = useCallback(
    (presaleAddress: Address) => {
      writeContract({
        abi: LaunchpadPresaleContract.abi,
        address: presaleAddress,
        functionName: 'claimRefund',
      });
    },
    [writeContract]
  );

  const invalidateOnSuccess = useCallback(
    (presaleAddress: Address) => {
      if (isSuccess && userAddress) {
        invalidatePresale(presaleAddress);
        invalidateUserPresaleData(userAddress, presaleAddress);
      }
    },
    [isSuccess, userAddress, invalidatePresale, invalidateUserPresaleData]
  );

  return {
    claimRefund,
    hash,
    isPending: isWritePending,
    isConfirming,
    isSuccess,
    error: writeError || confirmError,
    reset,
    invalidateOnSuccess,
  };
}

// Owner-only actions
export function usePresaleOwnerActions() {
  const { invalidatePresale } = useLaunchpadPresaleStore();

  const {
    data: hash,
    writeContract,
    isPending: isWritePending,
    error: writeError,
    reset,
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess,
    error: confirmError,
  } = useWaitForTransactionReceipt({ hash });

  const depositSaleTokens = useCallback(
    (presaleAddress: Address, amount: bigint) => {
      writeContract({
        abi: LaunchpadPresaleContract.abi,
        address: presaleAddress,
        functionName: 'depositSaleTokens',
        args: [amount],
      });
    },
    [writeContract]
  );

  const finalize = useCallback(
    (presaleAddress: Address) => {
      writeContract({
        abi: LaunchpadPresaleContract.abi,
        address: presaleAddress,
        functionName: 'finalize',
      });
    },
    [writeContract]
  );

  const cancelPresale = useCallback(
    (presaleAddress: Address) => {
      writeContract({
        abi: LaunchpadPresaleContract.abi,
        address: presaleAddress,
        functionName: 'cancelPresale',
      });
    },
    [writeContract]
  );

  const withdrawProceeds = useCallback(
    (presaleAddress: Address, amount: bigint = 0n) => {
      writeContract({
        abi: LaunchpadPresaleContract.abi,
        address: presaleAddress,
        functionName: 'withdrawProceeds',
        args: [amount],
      });
    },
    [writeContract]
  );

  const withdrawUnusedTokens = useCallback(
    (presaleAddress: Address, amount: bigint = 0n) => {
      writeContract({
        abi: LaunchpadPresaleContract.abi,
        address: presaleAddress,
        functionName: 'withdrawUnusedTokens',
        args: [amount],
      });
    },
    [writeContract]
  );

  const invalidateOnSuccess = useCallback(
    (presaleAddress: Address) => {
      if (isSuccess) {
        invalidatePresale(presaleAddress);
      }
    },
    [isSuccess, invalidatePresale]
  );

  return {
    depositSaleTokens,
    finalize,
    cancelPresale,
    withdrawProceeds,
    withdrawUnusedTokens,
    hash,
    isPending: isWritePending,
    isConfirming,
    isSuccess,
    error: writeError || confirmError,
    reset,
    invalidateOnSuccess,
  };
}

// Utility hook for calculating token amounts from payment
export function usePresaleCalculation() {
  const RATE_DIVISOR = 100n;

  const calculateTokenAmount = useCallback(
    (paymentAmount: bigint, rate: bigint): bigint => {
      return (paymentAmount * rate) / RATE_DIVISOR;
    },
    []
  );

  const calculatePaymentAmount = useCallback(
    (tokenAmount: bigint, rate: bigint): bigint => {
      if (rate === 0n) return 0n;
      return (tokenAmount * RATE_DIVISOR) / rate;
    },
    []
  );

  return {
    calculateTokenAmount,
    calculatePaymentAmount,
    RATE_DIVISOR,
  };
}
