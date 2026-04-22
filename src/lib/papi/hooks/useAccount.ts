import { useWallet } from "@/lib/papi/wallet-context";
import type { Address } from "viem";

/**
 * Drop-in replacement for wagmi's useAccount.
 * Returns the derived EVM address for backward compatibility.
 */
export function useAccount(): {
  address: Address | undefined;
  isConnected: boolean;
  isConnecting: boolean;
  ss58Address: string | undefined;
} {
  const { address, isConnected, ss58Address } = useWallet();
  return {
    address,
    isConnected,
    isConnecting: false,
    ss58Address,
  };
}
