import { useWallet } from "@/lib/papi/wallet-context";

/**
 * Drop-in replacement for RainbowKit's useConnectModal.
 */
export function useConnectModal() {
  const { openConnectModal } = useWallet();
  return { openConnectModal };
}
