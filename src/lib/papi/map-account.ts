import type { PolkadotSigner } from "polkadot-api";
import { typedApi } from "./client";
import { signAndSubmitWithRetry } from "./sign-retry";

const MAPPED_KEY_PREFIX = "qfpad:mapped:";

function getStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  return window.localStorage;
}

function collectErrorText(input: unknown): string {
  if (input == null) return "";
  if (typeof input === "string") return input;
  if (
    typeof input === "number" ||
    typeof input === "boolean" ||
    typeof input === "bigint"
  ) {
    return String(input);
  }
  if (Array.isArray(input)) {
    return input.map((item) => collectErrorText(item)).join(" ");
  }
  if (typeof input === "object") {
    return Object.values(input as Record<string, unknown>)
      .map((value) => collectErrorText(value))
      .join(" ");
  }
  return "";
}

function isAlreadyMappedError(input: unknown): boolean {
  const text = collectErrorText(input).toLowerCase();
  return text.includes("accountalreadymapped") || text.includes("alreadymapped");
}

function isAlreadyMappedDispatchError(dispatchError: unknown): boolean {
  if (!dispatchError || typeof dispatchError !== "object") return false;
  const maybeDispatch = dispatchError as { type?: unknown; value?: unknown };
  if (maybeDispatch.type !== "Revive") return false;
  if (!maybeDispatch.value || typeof maybeDispatch.value !== "object") {
    return false;
  }
  const reviveError = maybeDispatch.value as { type?: unknown };
  return reviveError.type === "AccountAlreadyMapped";
}

function formatDispatchError(dispatchError: unknown): string {
  if (!dispatchError || typeof dispatchError !== "object") {
    return String(dispatchError ?? "unknown dispatch error");
  }
  const maybeDispatch = dispatchError as { type?: unknown; value?: unknown };
  if (
    typeof maybeDispatch.type === "string" &&
    maybeDispatch.value &&
    typeof maybeDispatch.value === "object"
  ) {
    const nested = maybeDispatch.value as { type?: unknown };
    if (typeof nested.type === "string") {
      return `${maybeDispatch.type}.${nested.type}`;
    }
  }
  const text = collectErrorText(dispatchError).trim();
  return text || "unknown dispatch error";
}

async function isMappedOnChain(ss58Address: string): Promise<boolean> {
  try {
    const evmAddress = await typedApi.apis.ReviveApi.address(ss58Address);
    const originalAccount = await typedApi.query.Revive.OriginalAccount.getValue(
      evmAddress
    );
    return originalAccount === ss58Address;
  } catch {
    return false;
  }
}

/**
 * Ensure the user's SS58 account is mapped to an EVM address via Revive.map_account.
 * This is a one-time operation per account. Results are cached in localStorage.
 */
export async function ensureMapped(
  signer: PolkadotSigner,
  ss58Address: string
): Promise<void> {
  if (ss58Address.startsWith("0x")) {
    throw new Error(
      "Revive.map_account requires a Substrate SS58 account. Select a Polkadot account in Talisman/SubWallet, not an Ethereum account."
    );
  }

  const cacheKey = `${MAPPED_KEY_PREFIX}${ss58Address}`;
  const storage = getStorage();

  // Check if already mapped (cached)
  if (storage?.getItem(cacheKey) === "true") {
    return;
  }

  // Avoid submitting map_account if this account is already mapped on-chain.
  if (await isMappedOnChain(ss58Address)) {
    storage?.setItem(cacheKey, "true");
    return;
  }

  try {
    const result = await signAndSubmitWithRetry(() =>
      typedApi.tx.Revive.map_account().signAndSubmit(signer)
    );

    if (result.ok || isAlreadyMappedDispatchError(result.dispatchError)) {
      storage?.setItem(cacheKey, "true");
      return;
    }

    throw new Error(
      `Revive.map_account failed: ${formatDispatchError(result.dispatchError)}`
    );
  } catch (err: unknown) {
    // "AccountAlreadyMapped" (or similar) means mapping already exists.
    if (isAlreadyMappedError(err)) {
      storage?.setItem(cacheKey, "true");
      return;
    }
    throw err;
  }
}
