import { useWallet } from "@/lib/papi/wallet-context";

/**
 * Drop-in replacement for wagmi's useDisconnect.
 */
export function useDisconnect() {
  const { disconnect } = useWallet();
  return { disconnect };
}
