import { ethPublicClient } from "@/lib/papi/client";

/**
 * Drop-in replacement for wagmi's usePublicClient.
 * Returns the viem ethPublicClient (ETH-RPC) for getLogs compatibility.
 */
export function usePublicClient() {
  return ethPublicClient;
}
