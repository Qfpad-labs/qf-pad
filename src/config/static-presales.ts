import type { PresaleWithStatus } from "@/lib/hooks/useLaunchpadPresales";
import { parseUnits, type Address } from "viem";

export const QPAD_TOKEN_ADDRESS = "0xA1F13F120Ca2F7A5d84E524406fa4eE9BbD26E93" as Address;
export const TQPAD_TEST_PRESALE_ADDRESS = "0xE58DF12d3bc04173704cc1dBACfBB3dF4bf28A8A" as Address;
export const TQPAD_TEST_USDC_ADDRESS = "0xD4baA11361cFf694F9Ae6f7CB91Ebffceb4C62cC" as Address;
export const TQPAD_QF_TOKEN_ADDRESS = "0x7B8089775c60cf8E413Bd400Af703F2329405809" as Address;
export const TQPAD_CLAIM_VAULT_ADDRESS = "0x2c9c9d0127233089023654ddb00369f4ac9b6f53" as Address;

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000" as Address;
const QPAD_START_TIME = 1777550400n; // April 30, 2026, 12:00 UTC
const QPAD_PLACEHOLDER_END_TIME = 1780142400n; // May 30, 2026, 12:00 UTC
const QPAD_SALE_AMOUNT = parseUnits("9000000", 18);
const QPAD_SOFT_CAP = parseUnits("30000", 18);
const QPAD_HARD_CAP = parseUnits("40000", 18);
const QPAD_MIN_CONTRIBUTION = parseUnits("50", 18);
const QPAD_MAX_CONTRIBUTION = parseUnits("1600", 18);
const TQPAD_START_TIME = 1777518672n; // April 30, 2026, 03:11:12 UTC
const TQPAD_END_TIME = 1778123472n; // May 7, 2026, 03:11:12 UTC
const TQPAD_SALE_AMOUNT = parseUnits("9000000", 18);
const TQPAD_SOFT_CAP = parseUnits("30000", 6);
const TQPAD_HARD_CAP = parseUnits("40000", 6);
const TQPAD_MIN_CONTRIBUTION = parseUnits("50", 6);
const TQPAD_MAX_CONTRIBUTION = parseUnits("1600", 6);

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

export const TQPAD_TEST_SALE: QpadExternalSaleConfig = {
  id: TQPAD_TEST_PRESALE_ADDRESS,
  presaleAddress: TQPAD_TEST_PRESALE_ADDRESS,
  usdcAddress: TQPAD_TEST_USDC_ADDRESS,
  qfTokenAddress: TQPAD_QF_TOKEN_ADDRESS,
  claimVaultAddress: TQPAD_CLAIM_VAULT_ADDRESS,
  name: "Test QPAD",
  symbol: "TQPAD",
  description: "Participate in the TQPAD test launch with Sepolia USDC, then claim TQPAD on QF Network.",
  startTime: TQPAD_START_TIME,
  endTime: TQPAD_END_TIME,
  rateLabel: "1 USDC = 225 TQPAD",
  saleAmountLabel: "9,000,000 TQPAD",
  softCapLabel: "$30,000",
  hardCapLabel: "$40,000",
  minLabel: "$50",
  maxLabel: "$1,600",
};

export function getQpadStaticPresale(nowMs: number): PresaleWithStatus {
  const now = BigInt(Math.floor(nowMs / 1000));
  const status =
    now < QPAD_START_TIME
      ? "upcoming"
      : now > QPAD_PLACEHOLDER_END_TIME
        ? "ended"
        : "live";

  return {
    address: QPAD_TOKEN_ADDRESS,
    saleToken: QPAD_TOKEN_ADDRESS,
    paymentToken: ZERO_ADDRESS,
    isPaymentETH: false,
    requiresWhitelist: false,
    startTime: QPAD_START_TIME,
    endTime: QPAD_PLACEHOLDER_END_TIME,
    rate: 22500n,
    softCap: QPAD_SOFT_CAP,
    hardCap: QPAD_HARD_CAP,
    minContribution: QPAD_MIN_CONTRIBUTION,
    maxContribution: QPAD_MAX_CONTRIBUTION,
    totalRaised: 0n,
    committedTokens: 0n,
    totalTokensDeposited: QPAD_SALE_AMOUNT,
    claimEnabled: false,
    refundsEnabled: false,
    owner: ZERO_ADDRESS,
    saleTokenSymbol: "QPAD",
    saleTokenName: "QFPAD (QPAD)",
    saleTokenDecimals: 18,
    paymentTokenSymbol: "USDC",
    paymentTokenName: "USD Coin",
    paymentTokenDecimals: 18,
    category: "infrastructure",
    description: "Participate in the QPAD launch with USDC on Ethereum, then claim QPAD on QF Network.",
    logo: "/qfpad-logo.png",
    socials: {
      twitter: "https://x.com/qfpad_",
      telegram: "https://t.me/qfpad",
      website: "",
      discord: "",
    },
    status,
    progress: 0,
  };
}

export function getTqpadStaticPresale(nowMs: number): PresaleWithStatus {
  const now = BigInt(Math.floor(nowMs / 1000));
  const status =
    now < TQPAD_START_TIME
      ? "upcoming"
      : now > TQPAD_END_TIME
        ? "ended"
        : "live";

  return {
    address: TQPAD_TEST_PRESALE_ADDRESS,
    saleToken: TQPAD_QF_TOKEN_ADDRESS,
    paymentToken: TQPAD_TEST_USDC_ADDRESS,
    isPaymentETH: false,
    requiresWhitelist: false,
    startTime: TQPAD_START_TIME,
    endTime: TQPAD_END_TIME,
    rate: 22500n,
    softCap: TQPAD_SOFT_CAP,
    hardCap: TQPAD_HARD_CAP,
    minContribution: TQPAD_MIN_CONTRIBUTION,
    maxContribution: TQPAD_MAX_CONTRIBUTION,
    totalRaised: 0n,
    committedTokens: 0n,
    totalTokensDeposited: TQPAD_SALE_AMOUNT,
    claimEnabled: false,
    refundsEnabled: false,
    owner: ZERO_ADDRESS,
    saleTokenSymbol: "TQPAD",
    saleTokenName: "Test QPAD",
    saleTokenDecimals: 18,
    paymentTokenSymbol: "USDC",
    paymentTokenName: "Sepolia USDC",
    paymentTokenDecimals: 6,
    category: "infrastructure",
    description: TQPAD_TEST_SALE.description,
    logo: "/qfpad-logo.png",
    socials: {
      twitter: "https://x.com/qfpad_",
      telegram: "https://t.me/qfpad",
      website: "",
      discord: "",
    },
    status,
    progress: 0,
  };
}

export function getQpadStaticPresales(nowMs: number): PresaleWithStatus[] {
  return [getQpadStaticPresale(nowMs), getTqpadStaticPresale(nowMs)];
}

export function getQpadExternalSaleById(id: string | undefined): QpadExternalSaleConfig | undefined {
  if (!id) return undefined;
  return id.toLowerCase() === TQPAD_TEST_SALE.id.toLowerCase()
    ? TQPAD_TEST_SALE
    : undefined;
}
