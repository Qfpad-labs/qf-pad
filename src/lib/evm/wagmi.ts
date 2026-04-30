import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

const WALLETCONNECT_PROJECT_ID = "13e76db15cd90ceba29a7a96ecb52519";

export const evmConfig = getDefaultConfig({
  appName: "QFPad",
  projectId: WALLETCONNECT_PROJECT_ID,
  chains: [sepolia, mainnet],
  transports: {
    [sepolia.id]: http("https://ethereum-sepolia-rpc.publicnode.com"),
    [mainnet.id]: http(),
  },
});
