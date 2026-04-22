/**
 * Shared store for transaction receipts.
 * PAPI's signAndSubmit already waits for finalization, so receipts
 * are available immediately after the write resolves.
 */
export const txReceiptStore = new Map<
  string,
  { ok: boolean; events: unknown[]; logs: unknown[] }
>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ReceiptData = { ok: boolean; events: unknown[]; logs: any[] } | undefined;

/**
 * Drop-in replacement for wagmi's useWaitForTransactionReceipt.
 *
 * Since PAPI transactions are finalized when signAndSubmit resolves,
 * this hook simply checks if the receipt exists in the shared store.
 */
export function useWaitForTransactionReceipt({
  hash,
}: {
  hash?: string;
}): {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  data: ReceiptData;
  error: null;
} {
  if (!hash) {
    return {
      isLoading: false,
      isSuccess: false,
      isError: false,
      data: undefined,
      error: null,
    };
  }

  const receipt = txReceiptStore.get(hash);

  if (receipt) {
    return {
      isLoading: false,
      isSuccess: receipt.ok,
      isError: !receipt.ok,
      data: receipt,
      error: null,
    };
  }

  // Hash exists but no receipt yet
  return {
    isLoading: true,
    isSuccess: false,
    isError: false,
    data: undefined,
    error: null,
  };
}
