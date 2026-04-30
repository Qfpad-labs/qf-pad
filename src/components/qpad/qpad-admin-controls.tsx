"use client";

import { useCallback, useMemo, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { toast } from "sonner";
import {
  createPublicClient,
  erc20Abi,
  formatUnits,
  http,
  isAddress,
  parseAbi,
  parseUnits,
  type Address,
} from "viem";
import { sepolia } from "viem/chains";
import {
  useAccount as useEvmAccount,
  useChainId as useEvmChainId,
  useReadContracts as useEvmReadContracts,
  useSwitchChain,
  useWriteContract as useEvmWriteContract,
} from "wagmi";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  TQPAD_CLAIM_VAULT_ADDRESS,
  TQPAD_QF_TOKEN_ADDRESS,
  TQPAD_TEST_PRESALE_ADDRESS,
} from "@/config/static-presales";
import {
  useAccount as useQfAccount,
  useReadContracts as useQfReadContracts,
  useWriteContract as useQfWriteContract,
} from "@/lib/papi/hooks";
import { getFriendlyTxErrorMessage } from "@/lib/utils/tx-errors";

const QPAD_DECIMALS = 18;
const USDC_DECIMALS = 6;
const SEPOLIA_RPC_URL = "https://ethereum-sepolia-rpc.publicnode.com";

const sepoliaClient = createPublicClient({
  chain: sepolia,
  transport: http(SEPOLIA_RPC_URL),
});

const qpadClaimVaultAbi = parseAbi([
  "function owner() view returns (address)",
  "function allocator() view returns (address)",
  "function claimsEnabled() view returns (bool)",
  "function paused() view returns (bool)",
  "function maxTotalAllocation() view returns (uint256)",
  "function totalAllocated() view returns (uint256)",
  "function totalClaimed() view returns (uint256)",
  "function unallocatedTokenBalance() view returns (uint256)",
  "function enableClaims()",
  "function disableClaims()",
  "function pause()",
  "function unpause()",
  "function setAllocator(address newAllocator)",
  "function setMaxTotalAllocation(uint256 newCap)",
  "function recoverUnallocatedTokens(address to, uint256 amount)",
]);

const qpadPresaleAbi = parseAbi([
  "function owner() view returns (address)",
  "function paused() view returns (bool)",
  "function isSaleOpen() view returns (bool)",
  "function endedEarly() view returns (bool)",
  "function endedAt() view returns (uint64)",
  "function totalRaised() view returns (uint256)",
  "function totalQpadSold() view returns (uint256)",
  "function remainingUsdcCap() view returns (uint256)",
  "function remainingQpadForSale() view returns (uint256)",
  "function saleConfig() view returns (uint64 startTime,uint64 endTime,uint256 qpadPerUsdc,uint256 qpadForSale,uint256 softCap,uint256 hardCap,uint256 minPurchase,uint256 maxPurchase)",
  "function pause()",
  "function unpause()",
  "function endPresaleEarly()",
  "function extendSaleEnd(uint64 newEndTime)",
]);

type SaleConfigTuple = readonly [
  bigint,
  bigint,
  bigint,
  bigint,
  bigint,
  bigint,
  bigint,
  bigint,
];

type EvmPresaleAction = "pause" | "unpause" | "endPresaleEarly" | "extendSaleEnd";

function shortAddress(address?: string) {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function formatAmount(value: unknown, decimals: number, maxFractionDigits = 2) {
  const amount = typeof value === "bigint" ? value : 0n;
  return Number(formatUnits(amount, decimals)).toLocaleString(undefined, {
    maximumFractionDigits: maxFractionDigits,
  });
}

function formatDate(value: unknown) {
  if (typeof value !== "bigint" || value === 0n) return "Not set";
  return new Date(Number(value) * 1000).toLocaleString();
}

function parseTokenAmount(value: string, decimals: number) {
  return parseUnits(value.trim() || "0", decimals);
}

function AdminMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-2 border-black bg-white p-3">
      <p className="text-[10px] font-black uppercase tracking-[0.14em] text-black/55">{label}</p>
      <p className="mt-1 break-words text-sm font-black">{value}</p>
    </div>
  );
}

function WalletConnectStatus() {
  return (
    <ConnectButton.Custom>
      {({ account, chain, mounted, openAccountModal, openChainModal, openConnectModal }) => {
        const connected = mounted && account && chain;
        return (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              if (!connected) {
                openConnectModal();
                return;
              }
              if (chain.unsupported) {
                openChainModal();
                return;
              }
              openAccountModal();
            }}
          >
            {!connected
              ? "Connect EVM Wallet"
              : chain.unsupported
                ? "Wrong EVM Network"
                : `${account.displayName} on ${chain.name}`}
          </Button>
        );
      }}
    </ConnectButton.Custom>
  );
}

export function QpadAdminControls() {
  const { address: qfMappedAddress } = useQfAccount();
  const { writeContractAsync: writeQfContractAsync } = useQfWriteContract();
  const { address: evmAddress, isConnected: isEvmConnected } = useEvmAccount();
  const evmChainId = useEvmChainId();
  const { switchChainAsync, isPending: isSwitchingChain } = useSwitchChain();
  const { writeContractAsync: writeEvmContractAsync } = useEvmWriteContract();

  const [qfAction, setQfAction] = useState<string | null>(null);
  const [evmAction, setEvmAction] = useState<string | null>(null);
  const [newAllocator, setNewAllocator] = useState("");
  const [newAllocationCap, setNewAllocationCap] = useState("");
  const [recoverTo, setRecoverTo] = useState("");
  const [recoverAmount, setRecoverAmount] = useState("");
  const [newEndTimestamp, setNewEndTimestamp] = useState("");

  const qfVaultContracts = useMemo(() => [
    { abi: qpadClaimVaultAbi, address: TQPAD_CLAIM_VAULT_ADDRESS, functionName: "owner" },
    { abi: qpadClaimVaultAbi, address: TQPAD_CLAIM_VAULT_ADDRESS, functionName: "allocator" },
    { abi: qpadClaimVaultAbi, address: TQPAD_CLAIM_VAULT_ADDRESS, functionName: "claimsEnabled" },
    { abi: qpadClaimVaultAbi, address: TQPAD_CLAIM_VAULT_ADDRESS, functionName: "paused" },
    { abi: qpadClaimVaultAbi, address: TQPAD_CLAIM_VAULT_ADDRESS, functionName: "maxTotalAllocation" },
    { abi: qpadClaimVaultAbi, address: TQPAD_CLAIM_VAULT_ADDRESS, functionName: "totalAllocated" },
    { abi: qpadClaimVaultAbi, address: TQPAD_CLAIM_VAULT_ADDRESS, functionName: "totalClaimed" },
    { abi: qpadClaimVaultAbi, address: TQPAD_CLAIM_VAULT_ADDRESS, functionName: "unallocatedTokenBalance" },
    { abi: erc20Abi, address: TQPAD_QF_TOKEN_ADDRESS, functionName: "balanceOf", args: [TQPAD_CLAIM_VAULT_ADDRESS] },
  ], []);

  const {
    data: qfVaultResults,
    refetch: refetchQfVault,
  } = useQfReadContracts({
    contracts: qfVaultContracts,
    query: {
      refetchInterval: 15_000,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  });

  const {
    data: evmPresaleResults,
    refetch: refetchEvmPresale,
  } = useEvmReadContracts({
    contracts: [
      { abi: qpadPresaleAbi, address: TQPAD_TEST_PRESALE_ADDRESS, functionName: "owner", chainId: sepolia.id },
      { abi: qpadPresaleAbi, address: TQPAD_TEST_PRESALE_ADDRESS, functionName: "paused", chainId: sepolia.id },
      { abi: qpadPresaleAbi, address: TQPAD_TEST_PRESALE_ADDRESS, functionName: "isSaleOpen", chainId: sepolia.id },
      { abi: qpadPresaleAbi, address: TQPAD_TEST_PRESALE_ADDRESS, functionName: "endedEarly", chainId: sepolia.id },
      { abi: qpadPresaleAbi, address: TQPAD_TEST_PRESALE_ADDRESS, functionName: "endedAt", chainId: sepolia.id },
      { abi: qpadPresaleAbi, address: TQPAD_TEST_PRESALE_ADDRESS, functionName: "totalRaised", chainId: sepolia.id },
      { abi: qpadPresaleAbi, address: TQPAD_TEST_PRESALE_ADDRESS, functionName: "totalQpadSold", chainId: sepolia.id },
      { abi: qpadPresaleAbi, address: TQPAD_TEST_PRESALE_ADDRESS, functionName: "remainingUsdcCap", chainId: sepolia.id },
      { abi: qpadPresaleAbi, address: TQPAD_TEST_PRESALE_ADDRESS, functionName: "remainingQpadForSale", chainId: sepolia.id },
      { abi: qpadPresaleAbi, address: TQPAD_TEST_PRESALE_ADDRESS, functionName: "saleConfig", chainId: sepolia.id },
    ],
    query: {
      refetchInterval: 15_000,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  });

  const vaultOwner = qfVaultResults?.[0]?.result as Address | undefined;
  const vaultAllocator = qfVaultResults?.[1]?.result as Address | undefined;
  const claimsEnabled = (qfVaultResults?.[2]?.result as boolean | undefined) ?? false;
  const vaultPaused = (qfVaultResults?.[3]?.result as boolean | undefined) ?? false;
  const maxTotalAllocation = qfVaultResults?.[4]?.result;
  const totalAllocated = qfVaultResults?.[5]?.result;
  const totalClaimed = qfVaultResults?.[6]?.result;
  const unallocatedBalance = qfVaultResults?.[7]?.result;
  const vaultTokenBalance = qfVaultResults?.[8]?.result;

  const presaleOwner = evmPresaleResults?.[0]?.result as Address | undefined;
  const presalePaused = (evmPresaleResults?.[1]?.result as boolean | undefined) ?? false;
  const isSaleOpen = (evmPresaleResults?.[2]?.result as boolean | undefined) ?? false;
  const endedEarly = (evmPresaleResults?.[3]?.result as boolean | undefined) ?? false;
  const endedAt = evmPresaleResults?.[4]?.result;
  const totalRaised = evmPresaleResults?.[5]?.result;
  const totalQpadSold = evmPresaleResults?.[6]?.result;
  const remainingUsdcCap = evmPresaleResults?.[7]?.result;
  const remainingQpadForSale = evmPresaleResults?.[8]?.result;
  const saleConfig = evmPresaleResults?.[9]?.result as SaleConfigTuple | undefined;

  const qfIsOwner = qfMappedAddress?.toLowerCase() === vaultOwner?.toLowerCase();
  const evmIsOwner = evmAddress?.toLowerCase() === presaleOwner?.toLowerCase();
  const qfBusy = !!qfAction;
  const evmBusy = !!evmAction || isSwitchingChain;

  const runQfVaultAction = useCallback(async (
    label: string,
    functionName: string,
    args?: unknown[],
  ) => {
    setQfAction(label);
    try {
      await writeQfContractAsync({
        address: TQPAD_CLAIM_VAULT_ADDRESS,
        abi: qpadClaimVaultAbi,
        functionName,
        args,
      });
      toast.success(`${label} confirmed on QF Network.`);
      await refetchQfVault();
    } catch (error) {
      console.error(`${label} failed`, error);
      toast.error(getFriendlyTxErrorMessage(error, label));
    } finally {
      setQfAction(null);
    }
  }, [refetchQfVault, writeQfContractAsync]);

  const ensureSepolia = useCallback(async () => {
    if (!isEvmConnected || !evmAddress) {
      throw new Error("Connect the owner EVM wallet first.");
    }
    if (evmChainId !== sepolia.id) {
      await switchChainAsync({ chainId: sepolia.id });
    }
  }, [evmAddress, evmChainId, isEvmConnected, switchChainAsync]);

  const runEvmPresaleAction = useCallback(async (
    label: string,
    functionName: EvmPresaleAction,
    args?: [bigint],
  ) => {
    setEvmAction(label);
    try {
      await ensureSepolia();
      const hash = functionName === "extendSaleEnd"
        ? await writeEvmContractAsync({
          chainId: sepolia.id,
          address: TQPAD_TEST_PRESALE_ADDRESS,
          abi: qpadPresaleAbi,
          functionName,
          args: args ?? [0n],
        })
        : await writeEvmContractAsync({
          chainId: sepolia.id,
          address: TQPAD_TEST_PRESALE_ADDRESS,
          abi: qpadPresaleAbi,
          functionName,
        });
      toast.success(`${label} sent on Sepolia.`);
      await sepoliaClient.waitForTransactionReceipt({ hash });
      toast.success(`${label} confirmed on Sepolia.`);
      await refetchEvmPresale();
    } catch (error) {
      console.error(`${label} failed`, error);
      toast.error(getFriendlyTxErrorMessage(error, label));
    } finally {
      setEvmAction(null);
    }
  }, [ensureSepolia, refetchEvmPresale, writeEvmContractAsync]);

  const handleSetAllocator = () => {
    if (!isAddress(newAllocator)) {
      toast.error("Enter a valid allocator address.");
      return;
    }
    void runQfVaultAction("Set allocator", "setAllocator", [newAllocator as Address]);
  };

  const handleSetAllocationCap = () => {
    try {
      const cap = parseTokenAmount(newAllocationCap, QPAD_DECIMALS);
      void runQfVaultAction("Set allocation cap", "setMaxTotalAllocation", [cap]);
    } catch {
      toast.error("Enter a valid TQPAD cap.");
    }
  };

  const handleRecoverUnallocated = () => {
    if (!isAddress(recoverTo)) {
      toast.error("Enter a valid recipient address.");
      return;
    }
    try {
      const amount = parseTokenAmount(recoverAmount, QPAD_DECIMALS);
      void runQfVaultAction("Recover unallocated TQPAD", "recoverUnallocatedTokens", [
        recoverTo as Address,
        amount,
      ]);
    } catch {
      toast.error("Enter a valid TQPAD recovery amount. Leave blank for all.");
    }
  };

  const handleExtendSale = () => {
    try {
      const nextEnd = BigInt(newEndTimestamp.trim() || "0");
      if (nextEnd === 0n) {
        toast.error("Enter a Unix timestamp for the new end time.");
        return;
      }
      void runEvmPresaleAction("Extend presale", "extendSaleEnd", [nextEnd]);
    } catch {
      toast.error("Enter a valid Unix timestamp.");
    }
  };

  return (
    <div className="mb-8 grid gap-6 xl:grid-cols-2">
      <Card className="before:hidden border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)]">
        <CardHeader className="border-b-2 border-black bg-[#E8F7FF]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CardTitle className="font-black uppercase tracking-wider">QPAD Claim Vault</CardTitle>
            <Badge className="bg-[#B8EF53]">Signed with SubWallet</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-5 p-6">
          <div className="grid gap-3 sm:grid-cols-2">
            <AdminMetric label="Vault" value={shortAddress(TQPAD_CLAIM_VAULT_ADDRESS)} />
            <AdminMetric label="Owner" value={shortAddress(vaultOwner)} />
            <AdminMetric label="Allocator" value={shortAddress(vaultAllocator)} />
            <AdminMetric label="Claims" value={claimsEnabled ? "Enabled" : "Disabled"} />
            <AdminMetric label="Paused" value={vaultPaused ? "Yes" : "No"} />
            <AdminMetric label="Vault Balance" value={`${formatAmount(vaultTokenBalance, QPAD_DECIMALS)} TQPAD`} />
            <AdminMetric label="Allocated" value={`${formatAmount(totalAllocated, QPAD_DECIMALS)} TQPAD`} />
            <AdminMetric label="Claimed" value={`${formatAmount(totalClaimed, QPAD_DECIMALS)} TQPAD`} />
            <AdminMetric label="Unallocated" value={`${formatAmount(unallocatedBalance, QPAD_DECIMALS)} TQPAD`} />
            <AdminMetric label="Allocation Cap" value={`${formatAmount(maxTotalAllocation, QPAD_DECIMALS)} TQPAD`} />
          </div>

          <div className="border-2 border-black bg-[#FFF2D5] p-3 text-xs font-bold">
            QF signer: {qfMappedAddress ? shortAddress(qfMappedAddress) : "Not connected"}
            {qfIsOwner ? " - owner wallet connected" : " - owner wallet required for actions"}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Button
              type="button"
              disabled={qfBusy || !qfMappedAddress || claimsEnabled}
              onClick={() => runQfVaultAction("Enable claims", "enableClaims")}
            >
              {qfAction === "Enable claims" ? "Enabling..." : "Enable Claims"}
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={qfBusy || !qfMappedAddress || !claimsEnabled}
              onClick={() => runQfVaultAction("Disable claims", "disableClaims")}
            >
              {qfAction === "Disable claims" ? "Disabling..." : "Disable Claims"}
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={qfBusy || !qfMappedAddress || vaultPaused}
              onClick={() => runQfVaultAction("Pause vault", "pause")}
            >
              Pause Vault
            </Button>
            <Button
              type="button"
              variant="secondary"
              disabled={qfBusy || !qfMappedAddress || !vaultPaused}
              onClick={() => runQfVaultAction("Unpause vault", "unpause")}
            >
              Unpause Vault
            </Button>
          </div>

          <div className="space-y-3 border-t-2 border-black pt-4">
            <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <Input
                value={newAllocator}
                onChange={(event) => setNewAllocator(event.target.value)}
                placeholder="New allocator address"
                className="border-2 border-black font-mono"
              />
              <Button type="button" disabled={qfBusy || !qfMappedAddress} onClick={handleSetAllocator}>
                Set Allocator
              </Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <Input
                value={newAllocationCap}
                onChange={(event) => setNewAllocationCap(event.target.value)}
                placeholder="Allocation cap in TQPAD"
                className="border-2 border-black"
              />
              <Button type="button" disabled={qfBusy || !qfMappedAddress} onClick={handleSetAllocationCap}>
                Set Cap
              </Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                value={recoverTo}
                onChange={(event) => setRecoverTo(event.target.value)}
                placeholder="Recover recipient"
                className="border-2 border-black font-mono"
              />
              <Input
                value={recoverAmount}
                onChange={(event) => setRecoverAmount(event.target.value)}
                placeholder="Amount, blank = all unallocated"
                className="border-2 border-black"
              />
            </div>
            <Button type="button" variant="outline" disabled={qfBusy || !qfMappedAddress} onClick={handleRecoverUnallocated}>
              Recover Unallocated
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="before:hidden border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)]">
        <CardHeader className="border-b-2 border-black bg-[#FFF2D5]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CardTitle className="font-black uppercase tracking-wider">Sepolia Presale</CardTitle>
            <Badge className="bg-[#42C9FF]">Signed with EVM Wallet</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-5 p-6">
          <div className="flex flex-wrap items-center gap-3">
            <WalletConnectStatus />
            <span className="text-xs font-bold">
              {evmIsOwner ? "Owner wallet connected" : "Owner EVM wallet required for owner actions"}
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <AdminMetric label="Presale" value={shortAddress(TQPAD_TEST_PRESALE_ADDRESS)} />
            <AdminMetric label="Owner" value={shortAddress(presaleOwner)} />
            <AdminMetric label="Status" value={isSaleOpen ? "Open" : "Closed"} />
            <AdminMetric label="Paused" value={presalePaused ? "Yes" : "No"} />
            <AdminMetric label="Ended Early" value={endedEarly ? "Yes" : "No"} />
            <AdminMetric label="Ended At" value={formatDate(endedAt)} />
            <AdminMetric label="Raised" value={`${formatAmount(totalRaised, USDC_DECIMALS)} USDC`} />
            <AdminMetric label="QPAD Sold" value={`${formatAmount(totalQpadSold, QPAD_DECIMALS)} TQPAD`} />
            <AdminMetric label="USDC Remaining" value={`${formatAmount(remainingUsdcCap, USDC_DECIMALS)} USDC`} />
            <AdminMetric label="QPAD Remaining" value={`${formatAmount(remainingQpadForSale, QPAD_DECIMALS)} TQPAD`} />
            <AdminMetric label="Start" value={formatDate(saleConfig?.[0])} />
            <AdminMetric label="End" value={formatDate(saleConfig?.[1])} />
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <Button
              type="button"
              variant="destructive"
              disabled={evmBusy || !isEvmConnected || presalePaused}
              onClick={() => runEvmPresaleAction("Pause presale", "pause")}
            >
              Pause
            </Button>
            <Button
              type="button"
              variant="secondary"
              disabled={evmBusy || !isEvmConnected || !presalePaused}
              onClick={() => runEvmPresaleAction("Unpause presale", "unpause")}
            >
              Unpause
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={evmBusy || !isEvmConnected || endedEarly}
              onClick={() => runEvmPresaleAction("End presale early", "endPresaleEarly")}
            >
              End Early
            </Button>
          </div>

          <div className="grid gap-3 border-t-2 border-black pt-4 sm:grid-cols-[1fr_auto]">
            <Input
              value={newEndTimestamp}
              onChange={(event) => setNewEndTimestamp(event.target.value)}
              placeholder="New end Unix timestamp"
              className="border-2 border-black"
            />
            <Button type="button" disabled={evmBusy || !isEvmConnected} onClick={handleExtendSale}>
              Extend Sale
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
