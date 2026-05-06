import { ApiPromise, WsProvider } from "@polkadot/api";
import type { Signer } from "@polkadot/api/types";
import { QF_WS_RPC_URL } from "./client";

let apiPromise: Promise<ApiPromise> | null = null;

export function getQfPolkadotApi() {
  if (!apiPromise) {
    apiPromise = ApiPromise.create({
      provider: new WsProvider(QF_WS_RPC_URL),
    });
  }

  return apiPromise;
}

function decodeDispatchError(api: ApiPromise, dispatchError: unknown) {
  if (!dispatchError) {
    return null;
  }

  const error = dispatchError as {
    isModule?: boolean;
    asModule?: unknown;
    toString?: () => string;
  };

  if (error.isModule && error.asModule) {
    const decoded = api.registry.findMetaError(error.asModule as never);
    return `${decoded.section}.${decoded.name}: ${decoded.docs.join(" ")}`;
  }

  return error.toString?.() ?? String(dispatchError);
}

function getFailureFromEvents(api: ApiPromise, events: unknown[]) {
  for (const record of events) {
    const event = (record as { event?: unknown }).event as
      | {
          section?: string;
          method?: string;
          data?: unknown[];
        }
      | undefined;

    if (event?.section === "system" && event.method === "ExtrinsicFailed") {
      return decodeDispatchError(api, event.data?.[0]);
    }
  }

  return null;
}

export async function submitTxAndWait({
  api,
  signerAddress,
  signer,
  tx,
  label,
  timeoutMs = 180000,
}: {
  api: ApiPromise;
  signerAddress: string;
  signer: unknown;
  tx: {
    hash?: { toHex?: () => string };
    signAndSend: (
      address: string,
      options: Record<string, unknown>,
      callback: (result: {
        status: {
          isFinalized?: boolean;
          asFinalized?: { toHex?: () => string };
        };
        events?: unknown[];
        dispatchError?: unknown;
      }) => void,
    ) => Promise<() => void>;
  };
  label: string;
  timeoutMs?: number;
}): Promise<{ txHash: string; blockHash: string | null; ok: boolean; events: unknown[] }> {
  const txHash = tx.hash?.toHex?.() ?? "";

  return new Promise((resolve, reject) => {
    let unsubscribe: (() => void) | null = null;
    let settled = false;

    const timeout = window.setTimeout(() => {
      finish(reject, new Error(`${label} timed out after ${Math.round(timeoutMs / 1000)} seconds`));
    }, timeoutMs);

    function finish<T>(fn: (value: T) => void, value: T) {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      unsubscribe?.();
      fn(value);
    }

    tx
      .signAndSend(
        signerAddress,
        {
          signer: signer as Signer,
          withSignedTransaction: false,
        },
        ({ status, events = [], dispatchError }) => {
          if (dispatchError) {
            finish(reject, new Error(decodeDispatchError(api, dispatchError) ?? `${label} failed`));
            return;
          }

          const eventFailure = getFailureFromEvents(api, events);
          if (eventFailure) {
            finish(reject, new Error(eventFailure));
            return;
          }

          if (status.isFinalized) {
            finish(resolve, {
              txHash,
              blockHash: status.asFinalized?.toHex?.() ?? null,
              ok: true,
              events,
            });
          }
        },
      )
      .then((unsub) => {
        unsubscribe = unsub;
      })
      .catch((error) => {
        finish(reject, error instanceof Error ? error : new Error(String(error)));
      });
  });
}
