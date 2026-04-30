import type { Address, Hex } from "viem";

const STATUS_API_BASE_URL = (import.meta.env.VITE_QPAD_STATUS_API_BASE_URL ?? "").replace(/\/$/, "");

export type QpadRunnerPurchaseStatus =
  | "pending_confirmation"
  | "seen"
  | "registering"
  | "registered"
  | "failed";

export interface QpadPurchaseStatusResponse {
  found: boolean;
  status: QpadRunnerPurchaseStatus;
  confirmations: number | null;
  confirmationsRequired: number;
  purchaseId?: Hex;
  txHash?: Hex;
  blockNumber?: number;
  ethBuyer?: Address;
  usdcAmount?: string;
  qpadAmount?: string;
  qfTxHash?: Hex | null;
  qfAccountSs58?: string | null;
  qfMappedRecipient?: Address;
  error?: string | null;
  registeredAt?: string | null;
}

export async function fetchQpadPurchaseStatus(input: {
  txHash: Hex;
  chainId: number;
  presaleAddress: Address;
}) {
  const params = new URLSearchParams({
    tx: input.txHash,
    chainId: String(input.chainId),
    presale: input.presaleAddress,
  });

  const response = await fetch(`${STATUS_API_BASE_URL}/api/qpad/purchase-status?${params.toString()}`, {
    headers: { accept: "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Purchase status request failed with ${response.status}`);
  }

  return response.json() as Promise<QpadPurchaseStatusResponse>;
}
