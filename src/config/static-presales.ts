import type { PresaleWithStatus } from "@/lib/hooks/useLaunchpadPresales";
import { parseUnits, type Address } from "viem";

export const QPAD_TOKEN_ADDRESS = "0xA1F13F120Ca2F7A5d84E524406fa4eE9BbD26E93" as Address;
export const QPAD_ETH_MAINNET_PRESALE_ADDRESS = "0xed11eF1cA37f12635ffF6ad6163486F884A521Ca" as Address;
export const QPAD_ETH_MAINNET_USDC_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" as Address;
export const QPAD_CLAIM_VAULT_ADDRESS = "0x0b90a02382c9492616d0eb2c74d28b87e02c60b4" as Address;

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000" as Address;
const QPAD_START_TIME = 1777550400n; // April 30, 2026, 12:00 UTC
const QPAD_END_TIME = 1778155200n; // May 7, 2026, 12:00 UTC
const QPAD_SALE_AMOUNT = parseUnits("9000000", 18);
const QPAD_SOFT_CAP = parseUnits("30000", 6);
const QPAD_HARD_CAP = parseUnits("40000", 6);
const QPAD_MIN_CONTRIBUTION = parseUnits("50", 6);
const QPAD_MAX_CONTRIBUTION = parseUnits("1600", 6);

export interface QpadStaticPresaleState {
  isSaleOpen?: boolean;
  totalRaised?: bigint;
  totalQpadSold?: bigint;
}

export interface QpadExternalSaleConfig {
  id: Address;
  presaleAddress: Address;
  usdcAddress: Address;
  qfTokenAddress: Address;
  claimVaultAddress: Address;
  name: string;
  symbol: string;
  description: string;
  startTime: bigint;
  endTime: bigint;
  rateLabel: string;
  saleAmountLabel: string;
  softCapLabel: string;
  hardCapLabel: string;
  minLabel: string;
  maxLabel: string;
}

export const QPAD_MAINNET_SALE: QpadExternalSaleConfig = {
  id: QPAD_ETH_MAINNET_PRESALE_ADDRESS,
  presaleAddress: QPAD_ETH_MAINNET_PRESALE_ADDRESS,
  usdcAddress: QPAD_ETH_MAINNET_USDC_ADDRESS,
  qfTokenAddress: QPAD_TOKEN_ADDRESS,
  claimVaultAddress: QPAD_CLAIM_VAULT_ADDRESS,
  name: "QFPAD",
  symbol: "QPAD",
  description: "Secure your allocation with USDC on Ethereum, then claim your QPAD on QF Network.",
  startTime: QPAD_START_TIME,
  endTime: QPAD_END_TIME,
  rateLabel: "1 USDC = 225 QPAD",
  saleAmountLabel: "9,000,000 QPAD",
  softCapLabel: "$30,000",
  hardCapLabel: "$40,000",
  minLabel: "$50",
  maxLabel: "$1,600",
};

export function getQpadStaticPresale(nowMs: number, saleState?: QpadStaticPresaleState): PresaleWithStatus {
  const now = BigInt(Math.floor(nowMs / 1000));
  const status =
    now < QPAD_START_TIME
      ? "upcoming"
      : now > QPAD_END_TIME
        ? "ended"
        : saleState?.isSaleOpen === false
          ? "ended"
          : "live";
  const totalRaised = saleState?.totalRaised ?? 0n;
  const totalQpadSold = saleState?.totalQpadSold ?? 0n;
  const progress =
    QPAD_HARD_CAP > 0n
      ? Math.min(Number((totalRaised * 10000n) / QPAD_HARD_CAP) / 100, 100)
      : 0;

  return {
    address: QPAD_ETH_MAINNET_PRESALE_ADDRESS,
    saleToken: QPAD_TOKEN_ADDRESS,
    paymentToken: QPAD_ETH_MAINNET_USDC_ADDRESS,
    isPaymentETH: false,
    requiresWhitelist: false,
    startTime: QPAD_START_TIME,
    endTime: QPAD_END_TIME,
    rate: 22500n,
    softCap: QPAD_SOFT_CAP,
    hardCap: QPAD_HARD_CAP,
    minContribution: QPAD_MIN_CONTRIBUTION,
    maxContribution: QPAD_MAX_CONTRIBUTION,
    totalRaised,
    committedTokens: totalQpadSold,
    totalTokensDeposited: QPAD_SALE_AMOUNT,
    claimEnabled: false,
    refundsEnabled: false,
    owner: ZERO_ADDRESS,
    saleTokenSymbol: "QPAD",
    saleTokenName: "QFPAD (QPAD)",
    saleTokenDecimals: 18,
    paymentTokenSymbol: "USDC",
    paymentTokenName: "USD Coin",
    paymentTokenDecimals: 6,
    category: "infrastructure",
    description: "Secure your allocation with USDC on Ethereum, then claim your QPAD on QF Network.",
    logo: "/qfpad-logo.png",
    socials: {
      twitter: "https://x.com/qfpad_",
      telegram: "https://t.me/qfpad",
      website: "",
      discord: "",
    },
    status,
    progress,
  };
}

export function getQpadStaticPresales(nowMs: number, saleState?: QpadStaticPresaleState): PresaleWithStatus[] {
  return [getQpadStaticPresale(nowMs, saleState)];
}

export function getQpadExternalSaleById(id: string | undefined): QpadExternalSaleConfig | undefined {
  if (!id) return undefined;
  return id.toLowerCase() === QPAD_MAINNET_SALE.id.toLowerCase()
    ? QPAD_MAINNET_SALE
    : undefined;
}
