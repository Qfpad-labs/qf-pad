import { QF_CHAIN_ID } from "@/config";

/**
 * Drop-in replacement for wagmi's useChainId.
 * Returns a constant since we only support QF Network.
 */
export function useChainId(): number {
  return QF_CHAIN_ID;
}
