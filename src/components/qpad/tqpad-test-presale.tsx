"use client";

import confetti from "canvas-confetti";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AccountId } from "@polkadot-api/substrate-bindings";
import {
  createPublicClient,
  erc20Abi,
  formatUnits,
  getAddress,
  http,
  keccak256,
  parseAbi,
  parseUnits,
  toHex,
  type Address,
  type Abi,
  type Hex,
} from "viem";
import { mainnet } from "viem/chains";
import { toast } from "sonner";
import { useConnectModal as useEvmConnectModal } from "@rainbow-me/rainbowkit";
import {
  useAccount as useEvmAccount,
  useChainId as useEvmChainId,
  useDisconnect as useEvmDisconnect,
  useSwitchChain,
  useWriteContract as useEvmWriteContract,
} from "wagmi";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import qpadFiestaBanner from "@/assets/QPAD fiesta.png";
import type { QpadExternalSaleConfig } from "@/config/static-presales";
import {
  useAccount as useQfAccount,
  useReadContracts as useQfReadContracts,
  useWriteContract as useQfWriteContract,
} from "@/lib/papi/hooks";
import { getFriendlyTxErrorMessage } from "@/lib/utils/tx-errors";
import {
  fetchQpadPurchaseStatus,
  type QpadPurchaseStatusResponse,
} from "@/lib/qpad/purchase-status";

const ETH_MAINNET_RPC_URL =
  import.meta.env.VITE_ETH_MAINNET_RPC_URL || "https://ethereum-rpc.publicnode.com";
const USDC_DECIMALS = 6;
const QPAD_DECIMALS = 18;
const USDC_UNIT = 1_000_000n;
const CONFIRMATIONS_REQUIRED = 5;

const ethereumClient = createPublicClient({
  chain: mainnet,
  transport: http(ETH_MAINNET_RPC_URL),
});

const qpadPresaleAbi = parseAbi([
  "function buy(uint256 usdcAmount, bytes32 qfAccountId32, address qfMappedRecipient, uint256 nonce)",
  "function quoteQpadAmount(uint256 usdcAmount) view returns (uint256)",
  "function isSaleOpen() view returns (bool)",
  "function remainingUsdcCap() view returns (uint256)",
  "function totalRaised() view returns (uint256)",
  "function totalQpadSold() view returns (uint256)",
  "function purchasedUsdc(address buyer) view returns (uint256)",
  "function purchasedQpad(address buyer) view returns (uint256)",
  "function saleConfig() view returns (uint64 startTime,uint64 endTime,uint256 qpadPerUsdc,uint256 qpadForSale,uint256 softCap,uint256 hardCap,uint256 minPurchase,uint256 maxPurchase)",
]);

const qpadClaimVaultAbi = parseAbi([
  "function claim()",
  "function claimFor(address recipient)",
  "function claimsEnabled() view returns (bool)",
  "function claimableNow(address recipient) view returns (uint256)",
  "function claimed(address recipient) view returns (uint256)",
  "function totalAllocated() view returns (uint256)",
  "function totalClaimed() view returns (uint256)",
  "function maxTotalAllocation() view returns (uint256)",
]);

interface SaleState {
  isSaleOpen: boolean;
  totalRaised: bigint;
  totalQpadSold: bigint;
  remainingUsdcCap: bigint;
  buyerUsdc: bigint;
  buyerQpad: bigint;
  usdcBalance: bigint;
  usdcAllowance: bigint;
}

interface QfReadCall {
  abi: Abi | readonly unknown[];
  address: Address;
  functionName: string;
  args?: unknown[];
}

type PurchaseTrackerStage =
  | "submitted"
  | "waiting_confirmations"
  | "waiting_runner"
  | "registering"
  | "registered"
  | "failed"
  | "status_unavailable";

interface PurchaseTracker {
  txHash: Hex;
  stage: PurchaseTrackerStage;
  confirmations: number;
  confirmationsRequired: number;
  qpadAmount?: string;
  qfTxHash?: Hex | null;
  qfAccountSs58?: string | null;
  qfMappedRecipient?: Address;
  error?: string | null;
}

const emptySaleState: SaleState = {
  isSaleOpen: false,
  totalRaised: 0n,
  totalQpadSold: 0n,
  remainingUsdcCap: 0n,
  buyerUsdc: 0n,
  buyerQpad: 0n,
  usdcBalance: 0n,
  usdcAllowance: 0n,
};

const accountIdEnc = AccountId().enc;

function shortAddress(address?: string) {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function formatAmount(value: bigint, decimals: number, maxFractionDigits = 2) {
  const formatted = Number(formatUnits(value, decimals));
  return formatted.toLocaleString(undefined, {
    maximumFractionDigits: maxFractionDigits,
  });
}

function formatCountdown(targetTimestamp: bigint, nowMs: number) {
  const remainingMs = Math.max(0, Number(targetTimestamp) * 1000 - nowMs);
  const totalSeconds = Math.floor(remainingMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${days}D ${hours}H ${minutes}M ${seconds}S`;
}

function toQfAccountId32(ss58Address: string | undefined): Hex | undefined {
  if (!ss58Address) return undefined;
  try {
    return toHex(accountIdEnc(ss58Address)) as Hex;
  } catch {
    return undefined;
  }
}

function getManualQfRecipient(ss58Address: string) {
  const accountId32 = toQfAccountId32(ss58Address);
  if (!accountId32) return null;
  const hash = keccak256(accountId32);
  return {
    accountId32,
    mappedRecipient: getAddress(`0x${hash.slice(-40)}`) as Address,
  };
}

function getAmountRaw(amount: string) {
  try {
    return amount.trim() ? parseUnits(amount, USDC_DECIMALS) : 0n;
  } catch {
    return 0n;
  }
}

function getInputError(amountRaw: bigint, sale: SaleState) {
  if (amountRaw === 0n) return null;
  if (amountRaw < 50n * USDC_UNIT) return "Minimum is 50 USDC.";
  if (amountRaw > 1_600n * USDC_UNIT) return "Maximum is 1,600 USDC.";
  if (sale.buyerUsdc + amountRaw > 1_600n * USDC_UNIT) return "This exceeds the wallet max.";
  if (amountRaw > sale.remainingUsdcCap) return "This exceeds the remaining cap.";
  if (amountRaw > sale.usdcBalance) return "Insufficient USDC.";
  return null;
}

function getTrackerStage(status: QpadPurchaseStatusResponse["status"], found: boolean): PurchaseTrackerStage {
  if (!found || status === "pending_confirmation") return "waiting_runner";
  if (status === "registered") return "registered";
  if (status === "failed") return "failed";
  if (status === "registering") return "registering";
  return "waiting_runner";
}

export function QpadExternalPresale({ sale }: { sale: QpadExternalSaleConfig }) {
  const { address: connectedQfMappedRecipient, ss58Address: connectedSs58Address } = useQfAccount();
  const { writeContractAsync, isPending: isClaimPending, error: claimError } = useQfWriteContract();
  const { address: ethAccount, isConnected: isEvmConnected } = useEvmAccount();
  const ethChainId = useEvmChainId();
  const { openConnectModal: openEvmConnectModal } = useEvmConnectModal();
  const { disconnect: disconnectEvmWallet } = useEvmDisconnect();
  const { switchChainAsync, isPending: isSwitchingChain } = useSwitchChain();
  const { writeContractAsync: writeEvmContractAsync } = useEvmWriteContract();

  const [amount, setAmount] = useState("");
  const [manualQfAddress, setManualQfAddress] = useState("");
  const [nowMs, setNowMs] = useState(() => Date.now());
  const [saleState, setSaleState] = useState<SaleState>(emptySaleState);
  const [isApproving, setIsApproving] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const [trackedPurchase, setTrackedPurchase] = useState<PurchaseTracker | null>(null);
  const [isFiestaOpen, setIsFiestaOpen] = useState(false);
  const [hasDismissedFiesta, setHasDismissedFiesta] = useState(false);

  const manualQfAddressTrimmed = manualQfAddress.trim();
  const manualQfRecipient = useMemo(
    () => (manualQfAddressTrimmed ? getManualQfRecipient(manualQfAddressTrimmed) : null),
    [manualQfAddressTrimmed],
  );
  const manualQfError = manualQfAddressTrimmed && !manualQfRecipient ? "Enter a valid QF address." : null;
  const qfMappedRecipient = connectedQfMappedRecipient ?? manualQfRecipient?.mappedRecipient;
  const qfAccountId32 = connectedSs58Address ? toQfAccountId32(connectedSs58Address) : manualQfRecipient?.accountId32;
  const hasConnectedQfWallet = !!connectedQfMappedRecipient;
  const hasQfRecipient = !!qfMappedRecipient && !!qfAccountId32;
  const amountRaw = useMemo(() => getAmountRaw(amount), [amount]);
  const expectedQpad = useMemo(() => (amountRaw * 225n * 10n ** 18n) / USDC_UNIT, [amountRaw]);
  const saleCountdown = useMemo(() => formatCountdown(sale.endTime, nowMs), [sale.endTime, nowMs]);
  const progress = saleState.totalRaised > 0n
    ? Math.min(Number((saleState.totalRaised * 10000n) / (40_000n * USDC_UNIT)) / 100, 100)
    : 0;

  const qfContracts = useMemo(() => {
    const contracts: QfReadCall[] = [];

    if (qfMappedRecipient) {
      contracts.push(
        { abi: qpadClaimVaultAbi, address: sale.claimVaultAddress, functionName: "claimsEnabled" },
        { abi: qpadClaimVaultAbi, address: sale.claimVaultAddress, functionName: "claimableNow", args: [qfMappedRecipient] },
        { abi: qpadClaimVaultAbi, address: sale.claimVaultAddress, functionName: "claimed", args: [qfMappedRecipient] },
        { abi: erc20Abi, address: sale.qfTokenAddress, functionName: "balanceOf", args: [qfMappedRecipient] },
      );
    }

    return contracts;
  }, [qfMappedRecipient, sale.claimVaultAddress, sale.qfTokenAddress]);

  const { data: qfReadResults, refetch: refetchQfState } = useQfReadContracts({
    contracts: qfContracts,
    query: {
      enabled: qfContracts.length > 0,
      refetchInterval: 10_000,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  });

  const claimsEnabled = qfMappedRecipient ? ((qfReadResults?.[0]?.result as boolean | undefined) ?? false) : false;
  const claimableNow = qfMappedRecipient ? ((qfReadResults?.[1]?.result as bigint | undefined) ?? 0n) : 0n;
  const claimedByRecipient = qfMappedRecipient ? ((qfReadResults?.[2]?.result as bigint | undefined) ?? 0n) : 0n;
  const recipientQpadBalance = qfMappedRecipient ? ((qfReadResults?.[3]?.result as bigint | undefined) ?? 0n) : 0n;

  const refreshSaleState = useCallback(async (account?: Address) => {
    try {
      const [isSaleOpen, totalRaised, totalQpadSold, remainingUsdcCap] = await Promise.all([
        ethereumClient.readContract({ address: sale.presaleAddress, abi: qpadPresaleAbi, functionName: "isSaleOpen" }),
        ethereumClient.readContract({ address: sale.presaleAddress, abi: qpadPresaleAbi, functionName: "totalRaised" }),
        ethereumClient.readContract({ address: sale.presaleAddress, abi: qpadPresaleAbi, functionName: "totalQpadSold" }),
        ethereumClient.readContract({ address: sale.presaleAddress, abi: qpadPresaleAbi, functionName: "remainingUsdcCap" }),
      ]);

      let buyerUsdc = 0n;
      let buyerQpad = 0n;
      let usdcBalance = 0n;
      let usdcAllowance = 0n;

      if (account) {
        [buyerUsdc, buyerQpad, usdcBalance, usdcAllowance] = await Promise.all([
          ethereumClient.readContract({ address: sale.presaleAddress, abi: qpadPresaleAbi, functionName: "purchasedUsdc", args: [account] }),
          ethereumClient.readContract({ address: sale.presaleAddress, abi: qpadPresaleAbi, functionName: "purchasedQpad", args: [account] }),
          ethereumClient.readContract({ address: sale.usdcAddress, abi: erc20Abi, functionName: "balanceOf", args: [account] }),
          ethereumClient.readContract({ address: sale.usdcAddress, abi: erc20Abi, functionName: "allowance", args: [account, sale.presaleAddress] }),
        ]);
      }

      setSaleState({
        isSaleOpen,
        totalRaised,
        totalQpadSold,
        remainingUsdcCap,
        buyerUsdc,
        buyerQpad,
        usdcBalance,
        usdcAllowance,
      });
    } catch (error) {
      console.error("Failed to refresh QPAD sale state", error);
      toast.error("Unable to refresh QPAD sale data.");
    }
  }, [sale.presaleAddress, sale.usdcAddress]);

  useEffect(() => {
    void refreshSaleState(ethAccount);
  }, [ethAccount, refreshSaleState]);

  useEffect(() => {
    const timer = window.setInterval(() => setNowMs(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsFiestaOpen(true), 360);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!isFiestaOpen) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timeout = window.setTimeout(() => {
      const colors = ["#B8EF53", "#42C9FF", "#FF7F41", "#F95D9B", "#FFFFFF"];
      void confetti({
        particleCount: 70,
        angle: 60,
        spread: 68,
        origin: { x: 0.12, y: 0.24 },
        colors,
      });
      void confetti({
        particleCount: 70,
        angle: 120,
        spread: 68,
        origin: { x: 0.88, y: 0.24 },
        colors,
      });
    }, 560);

    return () => window.clearTimeout(timeout);
  }, [isFiestaOpen]);

  useEffect(() => {
    if (!isFiestaOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsFiestaOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isFiestaOpen]);

  useEffect(() => {
    if (!isFiestaOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isFiestaOpen]);

  const handleCloseFiesta = useCallback(() => {
    setIsFiestaOpen(false);
    setHasDismissedFiesta(true);
  }, []);

  const refreshPurchaseTracking = useCallback(async (txHash: Hex) => {
    const currentBlock = await ethereumClient.getBlockNumber();

    try {
      let receipt: Awaited<ReturnType<typeof ethereumClient.getTransactionReceipt>>;
      try {
        receipt = await ethereumClient.getTransactionReceipt({ hash: txHash });
      } catch (receiptError) {
        const message = receiptError instanceof Error ? receiptError.message : String(receiptError);
        if (message.toLowerCase().includes("not found")) {
          setTrackedPurchase((previous) => previous?.txHash === txHash
            ? {
                ...previous,
                stage: "submitted",
                confirmations: 0,
                error: null,
              }
            : previous);
          return;
        }
        throw receiptError;
      }

      const confirmations = receipt.blockNumber
        ? Math.max(Number(currentBlock - receipt.blockNumber + 1n), 0)
        : 0;

      if (receipt.status !== "success") {
        setTrackedPurchase((previous) => previous?.txHash === txHash
          ? {
              ...previous,
              stage: "failed",
              confirmations,
              error: "Ethereum transaction reverted.",
            }
          : previous);
        return;
      }

      if (confirmations < CONFIRMATIONS_REQUIRED) {
        setTrackedPurchase((previous) => previous?.txHash === txHash
          ? {
              ...previous,
              stage: "waiting_confirmations",
              confirmations,
              confirmationsRequired: CONFIRMATIONS_REQUIRED,
              error: null,
            }
          : previous);
        return;
      }

      const status = await fetchQpadPurchaseStatus({
        txHash,
        chainId: mainnet.id,
        presaleAddress: sale.presaleAddress,
      });
      const stage = getTrackerStage(status.status, status.found);
      const shouldToastRegistered =
        trackedPurchase?.txHash === txHash &&
        trackedPurchase.stage !== "registered" &&
        stage === "registered";

      setTrackedPurchase((previous) => previous?.txHash === txHash
        ? {
            ...previous,
            stage,
            confirmations: status.confirmations ?? confirmations,
            confirmationsRequired: status.confirmationsRequired,
            qpadAmount: status.qpadAmount,
            qfTxHash: status.qfTxHash,
            qfAccountSs58: status.qfAccountSs58,
            qfMappedRecipient: status.qfMappedRecipient,
            error: status.error,
          }
        : previous);

      if (shouldToastRegistered) {
        toast.success("QPAD allocation registered.");
        await refetchQfState();
        await refreshSaleState(ethAccount);
      }
    } catch (error) {
      console.error("Purchase tracking failed", error);
      setTrackedPurchase((previous) => previous?.txHash === txHash
        ? {
            ...previous,
            stage: "status_unavailable",
            error: "Runner status is temporarily unavailable.",
          }
        : previous);
    }
  }, [ethAccount, refetchQfState, refreshSaleState, sale.presaleAddress, sale.symbol, trackedPurchase?.stage, trackedPurchase?.txHash]);

  useEffect(() => {
    if (!trackedPurchase || trackedPurchase.stage === "registered" || trackedPurchase.stage === "failed") return;

    let cancelled = false;
    const poll = async () => {
      if (!cancelled) {
        await refreshPurchaseTracking(trackedPurchase.txHash);
      }
    };

    void poll();
    const timer = window.setInterval(() => void poll(), 6_000);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [refreshPurchaseTracking, trackedPurchase]);

  const connectEthereumWallet = useCallback(async () => {
    if (!openEvmConnectModal) {
      toast.error("Ethereum wallet connector unavailable.");
      return;
    }
    openEvmConnectModal();
  }, [openEvmConnectModal]);

  const switchToEthereum = useCallback(async () => {
    if (!isEvmConnected) {
      connectEthereumWallet();
      return;
    }
    try {
      await switchChainAsync({ chainId: mainnet.id });
    } catch (error) {
      console.error("Ethereum switch failed", error);
      toast.error(getFriendlyTxErrorMessage(error, "Network switch"));
    }
  }, [connectEthereumWallet, isEvmConnected, switchChainAsync]);

  const ensureEthereum = useCallback(async () => {
    if (!isEvmConnected || !ethAccount) {
      connectEthereumWallet();
      throw new Error("Connect an Ethereum wallet first");
    }
    if (ethChainId !== mainnet.id) {
      await switchChainAsync({ chainId: mainnet.id });
    }
  }, [connectEthereumWallet, ethAccount, ethChainId, isEvmConnected, switchChainAsync]);

  const inputError = useMemo(() => getInputError(amountRaw, saleState), [amountRaw, saleState]);
  const needsApproval = amountRaw > 0n && saleState.usdcAllowance < amountRaw;
  const canSubmit =
    saleState.isSaleOpen &&
    !!ethAccount &&
    ethChainId === mainnet.id &&
    hasQfRecipient &&
    amountRaw > 0n &&
    !inputError &&
    !isSwitchingChain &&
    !isApproving &&
    !isBuying;

  const approveUsdc = useCallback(async () => {
    if (!ethAccount || amountRaw === 0n) return;
    setIsApproving(true);
    try {
      await ensureEthereum();
      const hash = await writeEvmContractAsync({
        chainId: mainnet.id,
        address: sale.usdcAddress,
        abi: erc20Abi,
        functionName: "approve",
        args: [sale.presaleAddress, amountRaw],
      });
      await ethereumClient.waitForTransactionReceipt({ hash });
      toast.success("USDC approved.");
      await refreshSaleState(ethAccount);
    } catch (error) {
      console.error("USDC approval failed", error);
      toast.error(getFriendlyTxErrorMessage(error, "Approval"));
    } finally {
      setIsApproving(false);
    }
  }, [amountRaw, ensureEthereum, ethAccount, refreshSaleState, sale.presaleAddress, sale.usdcAddress, writeEvmContractAsync]);

  const buyQpad = useCallback(async () => {
    if (!ethAccount || !qfMappedRecipient || !qfAccountId32 || amountRaw === 0n) return;
    setIsBuying(true);
    try {
      await ensureEthereum();
      const nonce = BigInt(Date.now());
      const hash = await writeEvmContractAsync({
        chainId: mainnet.id,
        address: sale.presaleAddress,
        abi: qpadPresaleAbi,
        functionName: "buy",
        args: [amountRaw, qfAccountId32, qfMappedRecipient, nonce],
      });
      setTrackedPurchase({
        txHash: hash,
        stage: "submitted",
        confirmations: 0,
        confirmationsRequired: CONFIRMATIONS_REQUIRED,
      });
      await ethereumClient.waitForTransactionReceipt({ hash });
      toast.success("QPAD purchase confirmed on Ethereum. Waiting for QF allocation.");
      setAmount("");
      await refreshSaleState(ethAccount);
      await refetchQfState();
    } catch (error) {
      console.error("QPAD purchase failed", error);
      toast.error(getFriendlyTxErrorMessage(error, "Contribution"));
    } finally {
      setIsBuying(false);
    }
  }, [amountRaw, ensureEthereum, ethAccount, qfAccountId32, qfMappedRecipient, refreshSaleState, refetchQfState, sale.presaleAddress, writeEvmContractAsync]);

  const claimQpad = useCallback(async () => {
    const claimedAmount = claimableNow;
    try {
      await writeContractAsync({
        address: sale.claimVaultAddress,
        abi: qpadClaimVaultAbi,
        functionName: "claim",
      });
      toast.success(`Claimed: ${formatAmount(claimedAmount, QPAD_DECIMALS)} ${sale.symbol}`);
      await refetchQfState();
    } catch (error) {
      console.error("QPAD claim failed", error);
      toast.error(getFriendlyTxErrorMessage(error, "Claim"));
    }
  }, [claimableNow, refetchQfState, sale.claimVaultAddress, sale.symbol, writeContractAsync]);

  const ethCta = !isEvmConnected
    ? "Contribute"
    : ethChainId !== mainnet.id
      ? "Switch to Ethereum"
      : needsApproval
        ? "Approve USDC"
        : "Contribute";
  const claimCta = !hasConnectedQfWallet
    ? "Connect QF Wallet to Claim"
    : isClaimPending
      ? "Claiming..."
      : claimsEnabled
        ? `Claim ${sale.symbol}`
        : "Claims Not Enabled";

  return (
    <div className="container mx-auto px-4 py-8 text-black md:py-12">
      {isFiestaOpen && <QpadFiestaOverlay onClose={handleCloseFiesta} />}

      <section className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-[3px] border-black bg-white sm:h-20 sm:w-20">
            <AvatarImage src="/qfpad-logo.png" alt={`${sale.symbol} logo`} />
            <AvatarFallback className="font-black">{sale.symbol.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight sm:text-4xl">
              {sale.name} ({sale.symbol})
            </h1>
            <p className="mt-2 max-w-2xl text-lg font-bold text-black/70">{sale.description}</p>
          </div>
        </div>
      </section>

      <QpadFiestaInlineBanner visible={hasDismissedFiesta} />
      <QpadFiestaMarquee />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="contents lg:block lg:col-span-2 lg:space-y-8">
          <Card className="order-1 before:hidden">
            <CardHeader>
              <CardTitle>Sale Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-black uppercase tracking-[0.14em]">
                  {formatAmount(saleState.totalRaised, USDC_DECIMALS)} / 40,000 USDC
                </span>
                <Badge className={saleState.isSaleOpen ? "bg-[#42C9FF]" : "bg-[#FF7F41]"}>
                  {saleState.isSaleOpen ? "Live" : "Closed"}
                </Badge>
              </div>
              <Progress value={progress} className="h-4 border-[3px] border-black" />
              <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-4 text-sm font-bold sm:grid-cols-4 sm:gap-x-2">
                <Metric label="Sold" value={`${formatAmount(saleState.totalQpadSold, QPAD_DECIMALS)} ${sale.symbol}`} />
                <Metric label="Rate" value={sale.rateLabel} />
                <Metric label="Soft Cap" value={sale.softCapLabel} />
                <Metric label="Hard Cap" value={sale.hardCapLabel} />
              </div>
            </CardContent>
          </Card>

          <Card className="order-4 before:hidden">
            <CardHeader>
              <CardTitle>Claim $QPAD on QF</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                className={`border-[3px] border-black px-3 py-2 text-xs font-black uppercase tracking-[0.14em] ${
                  claimsEnabled ? "bg-[#B6F569]" : "bg-[#FFF6BF]"
                }`}
              >
                {claimsEnabled
                  ? `Claims are open - claim your ${sale.symbol} below.`
                  : "Claims are not yet enabled - check back once the sale closes."}
              </div>
              <div className="divide-y-2 divide-black/10">
                <DetailRow label="Your Claimable" value={`${formatAmount(claimableNow, QPAD_DECIMALS)} ${sale.symbol}`} />
                <DetailRow label="Already Claimed" value={`${formatAmount(claimedByRecipient, QPAD_DECIMALS)} ${sale.symbol}`} />
                <DetailRow label={`${sale.symbol} Balance`} value={`${formatAmount(recipientQpadBalance, QPAD_DECIMALS)} ${sale.symbol}`} />
              </div>
              <Button
                type="button"
                className="w-full"
                onClick={claimQpad}
                disabled={!hasConnectedQfWallet || !claimsEnabled || claimableNow === 0n || isClaimPending}
              >
                {claimCta}
              </Button>
              {claimedByRecipient > 0n && (
                <p className="text-sm font-bold text-black/70">
                  Claimed: {formatAmount(claimedByRecipient, QPAD_DECIMALS)} {sale.symbol}
                </p>
              )}
              {claimError && <p className="text-sm font-bold text-[#B42318]">{getFriendlyTxErrorMessage(claimError, "Claim")}</p>}
            </CardContent>
          </Card>
        </div>

        <div className="contents lg:block lg:space-y-6">
          <Card className="hidden before:hidden lg:block">
            <CardHeader>
              <CardTitle>Wallets</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-xs font-black uppercase tracking-[0.14em]">Ethereum Wallet</p>
                {ethAccount ? (
                  <div className="space-y-3">
                    <div className="space-y-1 text-sm font-bold text-black/70">
                      <p>{shortAddress(ethAccount)}</p>
                      <p>{ethChainId === mainnet.id ? "Ethereum" : "Wrong network"}</p>
                    </div>
                    <Button type="button" variant="outline" className="w-full" onClick={() => disconnectEvmWallet()}>
                      Disconnect Metamask
                    </Button>
                  </div>
                ) : (
                  <Button type="button" className="mt-3 w-full" onClick={connectEthereumWallet}>
                    Connect Metamask
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="order-2 before:hidden">
            <CardHeader>
              <CardTitle>Contribute</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-b-[3px] border-black pb-4">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-black/55">
                  Sale Ends In
                </p>
                <p className="mt-1 font-mono text-xl font-black">{saleCountdown}</p>
              </div>
              <div className="divide-y-2 divide-black/10">
                <DetailRow label="Your USDC" value={formatAmount(saleState.usdcBalance, USDC_DECIMALS)} compact />
                <DetailRow label="Already Bought" value={`${formatAmount(saleState.buyerQpad, QPAD_DECIMALS)} ${sale.symbol}`} compact />
              </div>
              <div>
                <label htmlFor="qpad-amount" className="mb-2 block text-xs font-black uppercase tracking-[0.14em]">
                  USDC Amount
                </label>
                <Input
                  id="qpad-amount"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  inputMode="decimal"
                  placeholder="50"
                />
              </div>
              <div className="space-y-3 border-[3px] border-black bg-[#FFF6BF] px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <label htmlFor="qpad-qf-address" className="text-xs font-black uppercase tracking-[0.14em]">
                    QF Claim Address
                  </label>
                  <Badge className={hasQfRecipient ? "bg-[#B6F569]" : "bg-[#FF7F41]"}>
                    {hasQfRecipient ? "Set" : "Required"}
                  </Badge>
                </div>
                {connectedQfMappedRecipient ? (
                  <div className="space-y-1 text-sm font-bold text-black/70">
                    <p>SS58 {shortAddress(connectedSs58Address)}</p>
                    <p>Mapped {shortAddress(connectedQfMappedRecipient)}</p>
                  </div>
                ) : (
                  <>
                    <Input
                      id="qpad-qf-address"
                      value={manualQfAddress}
                      onChange={(event) => setManualQfAddress(event.target.value)}
                      placeholder="Paste QF SS58 address"
                      autoComplete="off"
                    />
                    {qfMappedRecipient && (
                      <p className="text-xs font-black uppercase tracking-[0.1em] text-black/60">
                        Mapped {shortAddress(qfMappedRecipient)}
                      </p>
                    )}
                    {manualQfError && <p className="text-sm font-bold text-[#B42318]">{manualQfError}</p>}
                  </>
                )}
              </div>
              {expectedQpad > 0n && (
                <div className="bg-[#E8F7FF] px-4 py-3 font-bold">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-black/60">Expected {sale.symbol}</p>
                  <p className="mt-1 text-lg font-black">{formatAmount(expectedQpad, QPAD_DECIMALS)} {sale.symbol}</p>
                </div>
              )}
              {inputError && <p className="text-sm font-bold text-[#B42318]">{inputError}</p>}
              <Button
                type="button"
                className="w-full"
                onClick={
                  !isEvmConnected
                    ? undefined
                    : ethChainId !== mainnet.id
                      ? switchToEthereum
                    : needsApproval
                      ? approveUsdc
                      : buyQpad
                }
                disabled={
                  !isEvmConnected ||
                  (isEvmConnected && ethChainId === mainnet.id && !canSubmit) ||
                  isSwitchingChain ||
                  isApproving ||
                  isBuying
                }
              >
                {isSwitchingChain ? "Switching..." : isApproving ? "Approving..." : isBuying ? "Contributing..." : ethCta}
              </Button>
              {!hasQfRecipient && (
                <p className="text-sm font-bold text-black/65">Connect a QF wallet or paste a QF address before contributing.</p>
              )}
              {trackedPurchase && <PurchaseStatusPanel tracker={trackedPurchase} />}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function QpadFiestaOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div
      aria-modal="true"
      className="animate-fiesta-overlay-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm"
      role="dialog"
      onClick={onClose}
    >
      <div
        className="animate-fiesta-banner-in relative w-full max-w-4xl overflow-hidden border-[3px] border-black bg-[#FFF8EC] shadow-[10px_10px_0_rgba(0,0,0,1)]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close QPAD Fiesta"
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center border-[3px] border-black bg-white text-black shadow-[3px_3px_0_rgba(0,0,0,1)] transition-transform hover:-translate-y-0.5"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>

        <img
          src={qpadFiestaBanner}
          alt="QPAD Fiesta presale incentives"
          className="block h-auto w-full object-cover"
        />
      </div>
    </div>
  );
}

function QpadFiestaMarquee() {
  const items = [
    "QPAD Fiesta",
    "Early buyers get more upside",
    "$1,000 USDC community draw",
    "20 whale rebate slots",
    "6.25% USDC cashback",
    "+5% bonus QPAD allocation",
  ];

  return (
    <section className="neo-frame mb-6 overflow-hidden bg-[#111111] text-white">
      <div className="overflow-hidden px-3 py-4 sm:px-4">
        <div className="flex w-max items-center animate-launch-bar-slide">
          {[0, 1].map((loop) => (
            <div
              key={`qpad-fiesta-message-${loop}`}
              aria-hidden={loop === 1}
              className="flex shrink-0 items-center gap-2 px-4 text-[10px] font-black uppercase tracking-[0.1em] whitespace-nowrap sm:gap-8 sm:px-10 sm:text-sm sm:tracking-[0.2em]"
            >
              {items.map((item, index) => (
                <span key={`${loop}-${item}`} className="flex items-center gap-2 sm:gap-8">
                  <span>{item}</span>
                  <span className={index % 2 === 0 ? "text-[#B8EF53]" : "text-[#42C9FF]"}>•</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function QpadFiestaInlineBanner({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <section className="animate-fiesta-inline-banner-in neo-frame mx-auto mb-8 w-full max-w-4xl overflow-hidden bg-white lg:hidden">
      <div>
        <img
          src={qpadFiestaBanner}
          alt="QPAD Fiesta presale incentives"
          className="block h-auto w-full"
        />
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] font-black uppercase tracking-[0.12em] text-black/55">{label}</p>
      <p className="mt-1 text-sm font-black uppercase leading-tight sm:text-[13px]">{value}</p>
    </div>
  );
}

function DetailRow({ label, value, compact = false }: { label: string; value: string; compact?: boolean }) {
  return (
    <div className={`flex items-start justify-between gap-4 ${compact ? "py-2" : "py-3"}`}>
      <p className="text-xs font-black uppercase tracking-[0.14em] text-black/55">{label}</p>
      <p className="max-w-[60%] break-words text-right text-sm font-black leading-tight">{value}</p>
    </div>
  );
}

function PurchaseStatusPanel({ tracker }: { tracker: PurchaseTracker }) {
  const isComplete = tracker.stage === "registered";
  const isFailed = tracker.stage === "failed";
  const title =
    tracker.stage === "submitted"
      ? "Purchase Submitted"
      : tracker.stage === "waiting_confirmations"
        ? "Waiting For Confirmations"
        : tracker.stage === "waiting_runner"
          ? "Waiting For QF Allocation"
          : tracker.stage === "registering"
            ? "Registering On QF"
            : tracker.stage === "status_unavailable"
              ? "Checking Runner Status"
              : isComplete
                ? "QF Allocation Registered"
                : "Allocation Failed";

  return (
    <div
      className={`border-[3px] border-black px-4 py-3 text-sm font-bold ${
        isComplete ? "bg-[#B6F569]" : isFailed ? "bg-[#FFD0D0]" : "bg-[#FFF6BF]"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.14em] text-black/60">Runner Status</p>
          <p className="mt-1 text-base font-black">{title}</p>
        </div>
        <p className="shrink-0 font-mono text-xs font-black">
          {Math.min(tracker.confirmations, tracker.confirmationsRequired)}/{tracker.confirmationsRequired} confirmations
        </p>
      </div>
      {(isFailed || tracker.stage === "status_unavailable") && tracker.error && (
        <p className="mt-2 text-black/70">{tracker.error}</p>
      )}
    </div>
  );
}
