import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";
import { mainnet } from "wagmi/chains";

const WALLETCONNECT_PROJECT_ID = "13e76db15cd90ceba29a7a96ecb52519";
const ETH_MAINNET_RPC_URL =
  import.meta.env.VITE_ETH_MAINNET_RPC_URL || "https://eth-mainnet.g.alchemy.com/v2/GRqk_Y0D98nc4YsmnLM1p-PhLjupA2pT";

export const evmConfig = getDefaultConfig({
  appName: "QFPad",
  projectId: WALLETCONNECT_PROJECT_ID,
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(ETH_MAINNET_RPC_URL),
  },
});
