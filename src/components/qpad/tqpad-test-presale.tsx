"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AccountId } from "@polkadot-api/substrate-bindings";
import {
  createPublicClient,
  erc20Abi,
  formatUnits,
  http,
  parseAbi,
  parseUnits,
  toHex,
  type Address,
  type Abi,
  type Hex,
} from "viem";
import { sepolia } from "viem/chains";
import { toast } from "sonner";
import { useConnectModal as useEvmConnectModal } from "@rainbow-me/rainbowkit";
import {
  useAccount as useEvmAccount,
  useChainId as useEvmChainId,
  useDisconnect as useEvmDisconnect,
  useSwitchChain,
  useWriteContract as useEvmWriteContract,
} from "wagmi";
import { ArrowUpRight, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { QpadExternalSaleConfig } from "@/config/static-presales";
import {
  useAccount as useQfAccount,
  useConnectModal as useQfConnectModal,
  useReadContracts as useQfReadContracts,
  useWriteContract as useQfWriteContract,
} from "@/lib/papi/hooks";
import { getFriendlyTxErrorMessage } from "@/lib/utils/tx-errors";

const SEPOLIA_RPC_URL = "https://ethereum-sepolia-rpc.publicnode.com";
const SEPOLIA_EXPLORER_URL = "https://sepolia.etherscan.io";
const USDC_DECIMALS = 6;
const QPAD_DECIMALS = 18;
const USDC_UNIT = 1_000_000n;

const sepoliaClient = createPublicClient({
  chain: sepolia,
  transport: http(SEPOLIA_RPC_URL),
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
  if (amountRaw > sale.usdcBalance) return "Insufficient Sepolia USDC.";
  return null;
}

export function TqpadTestPresale({ sale }: { sale: QpadExternalSaleConfig }) {
  const { address: qfMappedRecipient, ss58Address } = useQfAccount();
  const { openConnectModal: openQfConnectModal } = useQfConnectModal();
  const { writeContractAsync, isPending: isClaimPending, error: claimError } = useQfWriteContract();
  const { address: ethAccount, isConnected: isEvmConnected } = useEvmAccount();
  const ethChainId = useEvmChainId();
  const { openConnectModal: openEvmConnectModal } = useEvmConnectModal();
  const { disconnect: disconnectEvmWallet } = useEvmDisconnect();
  const { switchChainAsync, isPending: isSwitchingChain } = useSwitchChain();
  const { writeContractAsync: writeEvmContractAsync } = useEvmWriteContract();

  const [amount, setAmount] = useState("");
  const [nowMs, setNowMs] = useState(() => Date.now());
  const [saleState, setSaleState] = useState<SaleState>(emptySaleState);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const [lastEthTxHash, setLastEthTxHash] = useState<Hex | undefined>();

  const qfAccountId32 = useMemo(() => toQfAccountId32(ss58Address), [ss58Address]);
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
  const recipientTqpadBalance = qfMappedRecipient ? ((qfReadResults?.[3]?.result as bigint | undefined) ?? 0n) : 0n;

  const refreshSaleState = useCallback(async (account?: Address) => {
    setIsRefreshing(true);
    try {
      const [isSaleOpen, totalRaised, totalQpadSold, remainingUsdcCap] = await Promise.all([
        sepoliaClient.readContract({ address: sale.presaleAddress, abi: qpadPresaleAbi, functionName: "isSaleOpen" }),
        sepoliaClient.readContract({ address: sale.presaleAddress, abi: qpadPresaleAbi, functionName: "totalRaised" }),
        sepoliaClient.readContract({ address: sale.presaleAddress, abi: qpadPresaleAbi, functionName: "totalQpadSold" }),
        sepoliaClient.readContract({ address: sale.presaleAddress, abi: qpadPresaleAbi, functionName: "remainingUsdcCap" }),
      ]);

      let buyerUsdc = 0n;
      let buyerQpad = 0n;
      let usdcBalance = 0n;
      let usdcAllowance = 0n;

      if (account) {
        [buyerUsdc, buyerQpad, usdcBalance, usdcAllowance] = await Promise.all([
          sepoliaClient.readContract({ address: sale.presaleAddress, abi: qpadPresaleAbi, functionName: "purchasedUsdc", args: [account] }),
          sepoliaClient.readContract({ address: sale.presaleAddress, abi: qpadPresaleAbi, functionName: "purchasedQpad", args: [account] }),
          sepoliaClient.readContract({ address: sale.usdcAddress, abi: erc20Abi, functionName: "balanceOf", args: [account] }),
          sepoliaClient.readContract({ address: sale.usdcAddress, abi: erc20Abi, functionName: "allowance", args: [account, sale.presaleAddress] }),
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
      console.error("Failed to refresh TQPAD sale state", error);
      toast.error("Unable to refresh TQPAD sale data.");
    } finally {
      setIsRefreshing(false);
    }
  }, [sale.presaleAddress, sale.usdcAddress]);

  useEffect(() => {
    void refreshSaleState(ethAccount);
  }, [ethAccount, refreshSaleState]);

  useEffect(() => {
    const timer = window.setInterval(() => setNowMs(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const connectEthereumWallet = useCallback(async () => {
    if (!openEvmConnectModal) {
      toast.error("Ethereum wallet connector unavailable.");
      return;
    }
    openEvmConnectModal();
  }, [openEvmConnectModal]);

  const switchToSepolia = useCallback(async () => {
    if (!isEvmConnected) {
      connectEthereumWallet();
      return;
    }
    try {
      await switchChainAsync({ chainId: sepolia.id });
    } catch (error) {
      console.error("Sepolia switch failed", error);
      toast.error(getFriendlyTxErrorMessage(error, "Network switch"));
    }
  }, [connectEthereumWallet, isEvmConnected, switchChainAsync]);

  const ensureSepolia = useCallback(async () => {
    if (!isEvmConnected || !ethAccount) {
      connectEthereumWallet();
      throw new Error("Connect an Ethereum wallet first");
    }
    if (ethChainId !== sepolia.id) {
      await switchChainAsync({ chainId: sepolia.id });
    }
  }, [connectEthereumWallet, ethAccount, ethChainId, isEvmConnected, switchChainAsync]);

  const inputError = useMemo(() => getInputError(amountRaw, saleState), [amountRaw, saleState]);
  const needsApproval = amountRaw > 0n && saleState.usdcAllowance < amountRaw;
  const canSubmit =
    saleState.isSaleOpen &&
    !!ethAccount &&
    ethChainId === sepolia.id &&
    !!qfMappedRecipient &&
    !!qfAccountId32 &&
    amountRaw > 0n &&
    !inputError &&
    !isSwitchingChain &&
    !isApproving &&
    !isBuying;

  const approveUsdc = useCallback(async () => {
    if (!ethAccount || amountRaw === 0n) return;
    setIsApproving(true);
    try {
      await ensureSepolia();
      const hash = await writeEvmContractAsync({
        chainId: sepolia.id,
        address: sale.usdcAddress,
        abi: erc20Abi,
        functionName: "approve",
        args: [sale.presaleAddress, amountRaw],
      });
      await sepoliaClient.waitForTransactionReceipt({ hash });
      toast.success("USDC approved.");
      await refreshSaleState(ethAccount);
    } catch (error) {
      console.error("USDC approval failed", error);
      toast.error(getFriendlyTxErrorMessage(error, "Approval"));
    } finally {
      setIsApproving(false);
    }
  }, [amountRaw, ensureSepolia, ethAccount, refreshSaleState, sale.presaleAddress, sale.usdcAddress, writeEvmContractAsync]);

  const buyTqpad = useCallback(async () => {
    if (!ethAccount || !qfMappedRecipient || !qfAccountId32 || amountRaw === 0n) return;
    setIsBuying(true);
    try {
      await ensureSepolia();
      const nonce = BigInt(Date.now());
      const hash = await writeEvmContractAsync({
        chainId: sepolia.id,
        address: sale.presaleAddress,
        abi: qpadPresaleAbi,
        functionName: "buy",
        args: [amountRaw, qfAccountId32, qfMappedRecipient, nonce],
      });
      setLastEthTxHash(hash);
      await sepoliaClient.waitForTransactionReceipt({ hash });
      toast.success("TQPAD purchase confirmed on Sepolia.");
      setAmount("");
      await refreshSaleState(ethAccount);
      await refetchQfState();
    } catch (error) {
      console.error("TQPAD purchase failed", error);
      toast.error(getFriendlyTxErrorMessage(error, "Contribution"));
    } finally {
      setIsBuying(false);
    }
  }, [amountRaw, ensureSepolia, ethAccount, qfAccountId32, qfMappedRecipient, refreshSaleState, refetchQfState, sale.presaleAddress, writeEvmContractAsync]);

  const claimTqpad = useCallback(async () => {
    const claimedAmount = claimableNow;
    try {
      await writeContractAsync({
        address: sale.claimVaultAddress,
        abi: qpadClaimVaultAbi,
        functionName: "claim",
      });
      toast.success(`Claimed: ${formatAmount(claimedAmount, QPAD_DECIMALS)} TQPAD`);
      await refetchQfState();
    } catch (error) {
      console.error("TQPAD claim failed", error);
      toast.error(getFriendlyTxErrorMessage(error, "Claim"));
    }
  }, [claimableNow, refetchQfState, sale.claimVaultAddress, writeContractAsync]);

  const ethCta = !isEvmConnected
    ? "Connect Ethereum Wallet"
    : ethChainId !== sepolia.id
      ? "Switch to Sepolia"
      : needsApproval
        ? "Approve USDC"
        : "Contribute";

  return (
    <div className="container mx-auto px-4 py-8 text-black md:py-12">
      <section className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-[3px] border-black bg-white sm:h-20 sm:w-20">
            <AvatarImage src="/qfpad-logo.png" alt={`${sale.symbol} logo`} />
            <AvatarFallback className="font-black">{sale.symbol.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <Badge className="mb-3 hidden bg-[#B8EF53] sm:inline-flex">Sepolia Test Sale</Badge>
            <h1 className="text-3xl font-black uppercase tracking-tight sm:text-4xl">
              {sale.name} ({sale.symbol})
            </h1>
            <p className="mt-2 max-w-2xl text-lg font-bold text-black/70">{sale.description}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          {!qfMappedRecipient && (
            <Button type="button" onClick={openQfConnectModal}>
              Connect Wallet
            </Button>
          )}
          <Button type="button" variant="outline" onClick={() => refreshSaleState(ethAccount)} disabled={isRefreshing}>
            <RefreshCw className={isRefreshing ? "animate-spin" : ""} />
            Refresh
          </Button>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="contents lg:block lg:col-span-2 lg:space-y-8">
          <Card className="order-1">
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
              <div className="mt-5 grid gap-4 text-sm font-bold sm:grid-cols-3">
                <Metric label="Sold" value={`${formatAmount(saleState.totalQpadSold, QPAD_DECIMALS)} TQPAD`} />
                <Metric label="Soft Cap" value={sale.softCapLabel} />
                <Metric label="Hard Cap" value={sale.hardCapLabel} />
              </div>
            </CardContent>
          </Card>

          <Card className="order-3">
            <CardHeader>
              <CardTitle>Sale Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-0 divide-y-2 divide-black/10">
              <DetailRow label="Status" value={saleState.isSaleOpen ? "Live" : "Closed"} />
              <DetailRow label="Rate" value={sale.rateLabel} />
              <DetailRow label="Sale" value={sale.saleAmountLabel} />
              <DetailRow label="Soft Cap" value={sale.softCapLabel} />
              <DetailRow label="Hard Cap" value={sale.hardCapLabel} />
            </CardContent>
          </Card>

          <Card className="order-4">
            <CardHeader>
              <CardTitle>Claim $QPAD on QF</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                className={`border-[3px] border-black px-3 py-2 text-xs font-black uppercase tracking-[0.14em] ${
                  claimsEnabled ? "bg-[#B6F569]" : "bg-[#FFD93D]"
                }`}
              >
                {claimsEnabled
                  ? "Claims are open — claim your TQPAD below."
                  : "Claims are not yet enabled — check back once the sale closes."}
              </div>
              <div className="divide-y-2 divide-black/10">
                <DetailRow label="Your Claimable" value={`${formatAmount(claimableNow, QPAD_DECIMALS)} TQPAD`} />
                <DetailRow label="Already Claimed" value={`${formatAmount(claimedByRecipient, QPAD_DECIMALS)} TQPAD`} />
                <DetailRow label="TQPAD Balance" value={`${formatAmount(recipientTqpadBalance, QPAD_DECIMALS)} TQPAD`} />
              </div>
              <Button
                type="button"
                className="w-full"
                onClick={claimTqpad}
                disabled={!qfMappedRecipient || !claimsEnabled || claimableNow === 0n || isClaimPending}
              >
                {isClaimPending ? "Claiming..." : claimsEnabled ? "Claim TQPAD" : "Claims Not Enabled"}
              </Button>
              {claimedByRecipient > 0n && (
                <p className="text-sm font-bold text-black/70">
                  Claimed: {formatAmount(claimedByRecipient, QPAD_DECIMALS)} TQPAD
                </p>
              )}
              {claimError && <p className="text-sm font-bold text-[#B42318]">{getFriendlyTxErrorMessage(claimError, "Claim")}</p>}
            </CardContent>
          </Card>
        </div>

        <div className="contents lg:block lg:space-y-6">
          <Card className="hidden lg:block">
            <CardHeader>
              <CardTitle>Wallets</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 border-b-[3px] border-black pb-4">
                <p className="text-xs font-black uppercase tracking-[0.14em]">QF Wallet</p>
                {qfMappedRecipient ? (
                  <div className="space-y-1 text-sm font-bold text-black/70">
                    <p>SS58 {shortAddress(ss58Address)}</p>
                    <p>Mapped {shortAddress(qfMappedRecipient)}</p>
                  </div>
                ) : (
                  <Button type="button" className="mt-3 w-full" onClick={openQfConnectModal}>
                    Connect QF Wallet
                  </Button>
                )}
              </div>

              <div className="space-y-2">
                <p className="text-xs font-black uppercase tracking-[0.14em]">Ethereum Wallet</p>
                {ethAccount ? (
                  <div className="space-y-3">
                    <div className="space-y-1 text-sm font-bold text-black/70">
                      <p>{shortAddress(ethAccount)}</p>
                      <p>{ethChainId === sepolia.id ? "Sepolia" : "Wrong network"}</p>
                    </div>
                    <Button type="button" variant="outline" className="w-full" onClick={() => disconnectEvmWallet()}>
                      Disconnect Ethereum
                    </Button>
                  </div>
                ) : (
                  <Button type="button" className="mt-3 w-full" onClick={connectEthereumWallet}>
                    Connect Ethereum
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="order-2">
            <CardHeader>
              <CardTitle>Contribute</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-y-[3px] border-black py-3">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-black/55">
                  Sale Ends In
                </p>
                <p className="mt-1 font-mono text-xl font-black">{saleCountdown}</p>
              </div>
              <div className="divide-y-2 divide-black/10 border-y-[3px] border-black py-1">
                <DetailRow label="Your USDC" value={formatAmount(saleState.usdcBalance, USDC_DECIMALS)} compact />
                <DetailRow label="Already Bought" value={`${formatAmount(saleState.buyerQpad, QPAD_DECIMALS)} TQPAD`} compact />
              </div>
              <div>
                <label htmlFor="tqpad-amount" className="mb-2 block text-xs font-black uppercase tracking-[0.14em]">
                  USDC Amount
                </label>
                <Input
                  id="tqpad-amount"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  inputMode="decimal"
                  placeholder="50"
                />
              </div>
              {expectedQpad > 0n && (
                <div className="bg-[#E8F7FF] px-4 py-3 font-bold">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-black/60">Expected TQPAD</p>
                  <p className="mt-1 text-lg font-black">{formatAmount(expectedQpad, QPAD_DECIMALS)} TQPAD</p>
                </div>
              )}
              {inputError && <p className="text-sm font-bold text-[#B42318]">{inputError}</p>}
              <Button
                type="button"
                className="w-full"
                onClick={
                  !isEvmConnected
                    ? connectEthereumWallet
                    : ethChainId !== sepolia.id
                      ? switchToSepolia
                    : needsApproval
                      ? approveUsdc
                      : buyTqpad
                }
                disabled={
                  (isEvmConnected && ethChainId === sepolia.id && !canSubmit) ||
                  isSwitchingChain ||
                  isApproving ||
                  isBuying
                }
              >
                {isSwitchingChain ? "Switching..." : isApproving ? "Approving..." : isBuying ? "Contributing..." : ethCta}
              </Button>
              {!qfMappedRecipient && (
                <p className="text-sm font-bold text-black/65">Connect a QF wallet before contributing.</p>
              )}
              {lastEthTxHash && (
                <a
                  href={`${SEPOLIA_EXPLORER_URL}/tx/${lastEthTxHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-[0.14em] underline"
                >
                  View Sepolia Tx <ArrowUpRight className="h-3 w-3" />
                </a>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-black uppercase tracking-[0.14em] text-black/55">{label}</p>
      <p className="mt-1 text-base font-black uppercase leading-tight">{value}</p>
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
