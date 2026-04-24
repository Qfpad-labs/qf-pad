import { useCallback, useState } from "react";
import { contractWrite } from "@/lib/papi/contract-write";
import { useWallet } from "@/lib/papi/wallet-context";
import type { Abi, Address } from "viem";
import { txReceiptStore } from "./useWaitForTransactionReceipt";

interface WriteContractParams {
  address: Address;
  abi: Abi | readonly unknown[];
  functionName: string;
  args?: unknown[];
  value?: bigint;
}

type HexLike = {
  asHex?: () => string;
};

function toHex(value: unknown): `0x${string}` | null {
  if (typeof value === "string" && value.startsWith("0x")) {
    return value as `0x${string}`;
  }
  if (value && typeof value === "object" && typeof (value as HexLike).asHex === "function") {
    const hex = (value as HexLike).asHex?.();
    if (typeof hex === "string" && hex.startsWith("0x")) {
      return hex as `0x${string}`;
    }
  }
  return null;
}

function extractContractLogs(
  events: unknown[]
): Array<{ data: `0x${string}`; topics: `0x${string}`[] }> {
  return events.flatMap((raw) => {
    const maybeOuter = raw as { event?: unknown };
    const event = maybeOuter?.event ?? raw;
    if (!event || typeof event !== "object") return [];

    const palletEvent = event as {
      type?: unknown;
      value?: { type?: unknown; value?: unknown };
    };

    if (palletEvent.type !== "Revive") return [];
    if (!palletEvent.value || typeof palletEvent.value !== "object") return [];
    if ((palletEvent.value as { type?: unknown }).type !== "ContractEmitted") {
      return [];
    }

    const payload = (palletEvent.value as { value?: unknown }).value as
      | {
          data?: unknown;
          topics?: unknown[];
        }
      | undefined;
    if (!payload) return [];

    const dataHex = toHex(payload.data);
    if (!dataHex) return [];

    const topics = (payload.topics ?? [])
      .map((topic) => toHex(topic))
      .filter((topic): topic is `0x${string}` => !!topic);

    return [{ data: dataHex, topics }];
  });
}

/**
 * Drop-in replacement for wagmi's useWriteContract.
 *
 * Key difference from wagmi: PAPI's signAndSubmit resolves on finalization,
 * so isPending covers both signing and confirmation. The returned hash is
 * stored in txReceiptStore so useWaitForTransactionReceipt can pick it up.
 */
export function useWriteContract() {
  const { account } = useWallet();

  const [hash, setHash] = useState<string | undefined>();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const reset = useCallback(() => {
    setHash(undefined);
    setIsPending(false);
    setError(null);
    setIsSuccess(false);
  }, []);

  const writeContractAsync = useCallback(
    async (params: WriteContractParams) => {
      if (!account) {
        throw new Error("Wallet not connected");
      }

      setIsPending(true);
      setError(null);
      setIsSuccess(false);
      setHash(undefined);

      try {
        const result = await contractWrite({
          address: params.address,
          abi: params.abi,
          functionName: params.functionName,
          args: params.args,
          value: params.value,
          signer: account.polkadotSigner,
          ss58Address: account.ss58Address,
        });

        setHash(result.txHash);
        setIsSuccess(result.ok);
        setIsPending(false);

        // Store the receipt for useWaitForTransactionReceipt
        txReceiptStore.set(result.txHash, {
          ok: result.ok,
          events: result.events,
          logs: extractContractLogs(result.events),
        });

        return result.txHash;
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error(String(err));
        console.error("QF contract write failed", {
          address: params.address,
          functionName: params.functionName,
          args: params.args,
          value: params.value,
          error: err,
        });
        setError(error);
        setIsPending(false);
        throw error;
      }
    },
    [account]
  );

  const writeContract = useCallback(
    (
      params: WriteContractParams,
      callbacks?: { onSuccess?: (hash: string) => void }
    ) => {
      writeContractAsync(params)
        .then((txHash) => {
          callbacks?.onSuccess?.(txHash);
        })
        .catch(() => {
          // Error is captured in state
        });
    },
    [writeContractAsync]
  );

  return {
    writeContract,
    writeContractAsync,
    data: hash,
    isPending,
    isSuccess,
    error,
    reset,
    isError: !!error,
  };
}
