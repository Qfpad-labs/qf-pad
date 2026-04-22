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

function getErrorText(err: unknown): string {
  if (err == null) return "";
  if (err instanceof Error) {
    return `${err.name} ${err.message} ${collectErrorText(err)}`.toLowerCase();
  }
  return collectErrorText(err).toLowerCase();
}

function isUserRejection(err: unknown): boolean {
  const text = getErrorText(err);
  return (
    text.includes("user rejected") ||
    text.includes("user denied") ||
    text.includes("rejected request") ||
    text.includes("denied request") ||
    text.includes("cancelled") ||
    text.includes("canceled")
  );
}

/**
 * Transient wallet/chain signing failures that typically resolve on a fresh
 * submission: BadProof/BadSigner (signed payload did not verify against the
 * extrinsic — most often caused by Talisman building its payload against
 * stale cached metadata), BadMetadataHash/BadSpecVersion (wallet's cached
 * metadata drifted from chain), and the runtime-reported InvalidTransaction
 * wrappers around those. Excludes user-initiated rejections — we must not
 * re-prompt a user who explicitly canceled.
 */
export function isRetryableSigningError(err: unknown): boolean {
  if (isUserRejection(err)) return false;
  const text = getErrorText(err);
  return (
    text.includes("badproof") ||
    text.includes("badsigner") ||
    text.includes("invalidtxerror") ||
    text.includes("badmetadatahash") ||
    text.includes("badspecversion")
  );
}

/**
 * Wraps a signAndSubmit call with a single automatic retry on transient
 * signing failures. The builder must be idempotent — each invocation
 * should construct a fresh transaction so the retry gets a new nonce,
 * block hash, and metadata snapshot (PAPI's `typedApi.tx.X.Y(...).signAndSubmit`
 * does this by design).
 *
 * The wallet will prompt the user again on retry. This is acceptable
 * because it replaces the user manually clicking "send" a second time
 * after the first attempt fails — they now just approve in the wallet.
 */
export async function signAndSubmitWithRetry<T>(
  build: () => Promise<T>,
  maxAttempts = 2
): Promise<T> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await build();
    } catch (err) {
      lastError = err;
      if (attempt === maxAttempts || !isRetryableSigningError(err)) {
        throw err;
      }
      console.warn(
        `[papi] transient signing failure on attempt ${attempt}/${maxAttempts}; retrying with a fresh payload`,
        err
      );
    }
  }
  throw lastError;
}
