/**
 * Drop-in replacement for wagmi's useSwitchChain.
 * No-op since we only support QF Network.
 */
export function useSwitchChain() {
  return {
    switchChain: (_params: { chainId: number }) => {
      // no-op: single chain
    },
  };
}
