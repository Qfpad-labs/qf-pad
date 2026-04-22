type TxErrorLike = {
  name?: string;
  message?: string;
  shortMessage?: string;
  cause?: {
    message?: string;
    shortMessage?: string;
  };
};

const collectErrorText = (value: unknown): string => {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (
    typeof value === "number" ||
    typeof value === "boolean" ||
    typeof value === "bigint"
  ) {
    return String(value);
  }
  if (Array.isArray(value)) {
    return value.map((item) => collectErrorText(item)).join(" ");
  }
  if (typeof value === "object") {
    return Object.values(value as Record<string, unknown>)
      .map((item) => collectErrorText(item))
      .join(" ");
  }
  return "";
};

const getErrorText = (error: unknown) => {
  if (!error) return "";
  if (typeof error !== "object") {
    return collectErrorText(error).toLowerCase();
  }
  const err = error as TxErrorLike;
  return [
    err.name,
    err.shortMessage,
    err.message,
    err.cause?.shortMessage,
    err.cause?.message,
    collectErrorText(error),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
};

export const getFriendlyTxErrorMessage = (
  error: unknown,
  actionLabel = "Transaction"
) => {
  const text = getErrorText(error);
  if (
    text.includes("user rejected") ||
    text.includes("user denied") ||
    text.includes("rejected request") ||
    text.includes("denied request") ||
    text.includes("rejected") ||
    text.includes("denied") ||
    text.includes("canceled") ||
    text.includes("cancelled")
  ) {
    return `${actionLabel} canceled.`;
  }
  if (text.includes("insufficient funds")) {
    return "Insufficient funds for gas.";
  }
  if (text.includes("storagedepositnotenoughfunds")) {
    return "Insufficient balance for required storage deposit.";
  }
  if (text.includes("storagedepositlimitexhausted")) {
    return "Storage deposit limit was too low.";
  }
  if (text.includes("accountunmapped")) {
    return "Wallet mapping is missing. Approve the mapping request and retry.";
  }
  if (text.includes("accountalreadymapped")) {
    return "Wallet is already mapped on-chain. Retry the action.";
  }
  if (text.includes("contractreverted") || text.includes("would revert")) {
    return `${actionLabel} reverted by contract. Check your input values.`;
  }
  if (
    text.includes("metadatahash") ||
    text.includes("checkmetadatahash") ||
    text.includes("badspecversion")
  ) {
    return "Wallet metadata for QF looks stale. Disconnect and reconnect the wallet, then retry.";
  }
  if (
    text.includes("badproof") ||
    text.includes("badsigner")
  ) {
    return "The signed payload did not match the selected wallet account. Re-select the same SS58 account in Talisman/SubWallet and retry.";
  }
  if (
    text.includes("invalidtxerror")
  ) {
    return "Transaction was rejected before execution. Retry once; if it persists, reconnect the wallet.";
  }
  return `${actionLabel} failed. Please try again.`;
};
