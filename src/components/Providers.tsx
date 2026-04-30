import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { ThemeProvider } from "next-themes";
import { useState } from "react";
import { WagmiProvider } from "wagmi";
import { WalletProvider } from "@/lib/papi/wallet-context";
import { WalletConnectDialog } from "@/components/ui/wallet-connect-dialog";
import { evmConfig } from "@/lib/evm/wagmi";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <WalletProvider>
        <WagmiProvider config={evmConfig}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider modalSize="compact">
              {children}
              <WalletConnectDialog />
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </WalletProvider>
    </ThemeProvider>
  );
}
