
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { useState } from "react";
import { WalletProvider } from "@/lib/papi/wallet-context";
import { WalletConnectDialog } from "@/components/ui/wallet-connect-dialog";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <WalletProvider>
        <QueryClientProvider client={queryClient}>
          {children}
          <WalletConnectDialog />
        </QueryClientProvider>
      </WalletProvider>
    </ThemeProvider>
  );
}
