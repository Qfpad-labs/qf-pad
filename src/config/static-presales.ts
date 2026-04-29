import type { PresaleWithStatus } from "@/lib/hooks/useLaunchpadPresales";
import { parseUnits, type Address } from "viem";

export const QPAD_TOKEN_ADDRESS = "0xA1F13F120Ca2F7A5d84E524406fa4eE9BbD26E93" as Address;

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000" as Address;
const QPAD_START_TIME = 1777550400n; // April 30, 2026, 12:00 UTC
const QPAD_PLACEHOLDER_END_TIME = 1780142400n; // May 30, 2026, 12:00 UTC
const QPAD_SALE_AMOUNT = parseUnits("9000000", 18);
const QPAD_SOFT_CAP = parseUnits("30000", 18);
const QPAD_HARD_CAP = parseUnits("40000", 18);
const QPAD_MIN_CONTRIBUTION = parseUnits("50", 18);
const QPAD_MAX_CONTRIBUTION = parseUnits("1600", 18);

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
