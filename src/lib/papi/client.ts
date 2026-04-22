import { createClient } from "polkadot-api";
import { getWsProvider } from "polkadot-api/ws-provider/web";
import { qf_network } from "@polkadot-api/descriptors";
import { createPublicClient, http } from "viem";

export const QF_WS_RPC_URL = "wss://mainnet.qfnode.net";
export const QF_ETH_RPC_URL = "https://archive.mainnet.qfnode.net/eth";

// PAPI client singleton
const wsProvider = getWsProvider(QF_WS_RPC_URL);
export const papiClient = createClient(wsProvider);
export const typedApi = papiClient.getTypedApi(qf_network);

// Viem public client for getLogs fallback (ETH-RPC only)
export const ethPublicClient = createPublicClient({
  transport: http(QF_ETH_RPC_URL),
});
