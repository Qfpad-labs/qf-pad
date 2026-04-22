import { default as qf_network, type Qf_networkWhitelistEntry } from "./qf_network";
export { qf_network };
export type * from "./qf_network";
export { DigestItem, Phase, DispatchClass, TokenError, ArithmeticError, TransactionalError, BalanceStatus, TransactionPaymentEvent, CommonClaimsEvent, GrandpaEvent, StakingRewardDestination, StakingForcing, BalancesTypesReasons, TransactionPaymentReleases, Version, ClaimsStatementKind, MultiAddress, BalancesAdjustmentDirection, StakingPalletConfigOpBig, StakingPalletConfigOp, TransactionValidityUnknownTransaction, TransactionValidityTransactionSource } from './common-types';
export declare const getMetadata: (codeHash: string) => Promise<Uint8Array | null>;
export type WhitelistEntry = Qf_networkWhitelistEntry;
export type WhitelistEntriesByChain = Partial<{
    "*": WhitelistEntry[];
    qf_network: WhitelistEntry[];
}>;
