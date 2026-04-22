import { Enum, GetEnum, FixedSizeBinary, Binary, SS58String, ResultPayload, FixedSizeArray, TxCallData } from "polkadot-api";
type AnonymousEnum<T extends {}> = T & {
    __anonymous: true;
};
type MyTuple<T> = [T, ...T[]];
type SeparateUndefined<T> = undefined extends T ? undefined | Exclude<T, undefined> : T;
type Anonymize<T> = SeparateUndefined<T extends FixedSizeBinary<infer L> ? number extends L ? Binary : FixedSizeBinary<L> : T extends string | number | bigint | boolean | void | undefined | null | symbol | Uint8Array | Enum<any> ? T : T extends AnonymousEnum<infer V> ? Enum<V> : T extends MyTuple<any> ? {
    [K in keyof T]: T[K];
} : T extends [] ? [] : T extends FixedSizeArray<infer L, infer T> ? number extends L ? Array<T> : FixedSizeArray<L, T> : {
    [K in keyof T & string]: T[K];
}>;
export type I5sesotjlssv2d = {
    "nonce": number;
    "consumers": number;
    "providers": number;
    "sufficients": number;
    "data": Anonymize<I1q8tnt1cluu5j>;
};
export type I1q8tnt1cluu5j = {
    "free": bigint;
    "reserved": bigint;
    "frozen": bigint;
    "flags": bigint;
};
export type Iffmde3ekjedi9 = {
    "normal": Anonymize<I4q39t5hn830vp>;
    "operational": Anonymize<I4q39t5hn830vp>;
    "mandatory": Anonymize<I4q39t5hn830vp>;
};
export type I4q39t5hn830vp = {
    "ref_time": bigint;
    "proof_size": bigint;
};
export type I4mddgoa69c0a2 = Array<DigestItem>;
export type DigestItem = Enum<{
    "PreRuntime": Anonymize<I82jm9g7pufuel>;
    "Consensus": Anonymize<I82jm9g7pufuel>;
    "Seal": Anonymize<I82jm9g7pufuel>;
    "Other": Binary;
    "RuntimeEnvironmentUpdated": undefined;
}>;
export declare const DigestItem: GetEnum<DigestItem>;
export type I82jm9g7pufuel = [FixedSizeBinary<4>, Binary];
export type Iblsm8o95r585i = Array<{
    "phase": Phase;
    "event": Enum<{
        "System": Anonymize<Ibe305d30upkr0>;
        "Utility": Anonymize<I2r3suha7i0c8t>;
        "Multisig": Anonymize<I4e7eadedr2uqe>;
        "Proxy": Anonymize<Ib7g7c1igdjvip>;
        "Balances": Anonymize<Ib2ifamughfdjj>;
        "TransactionPayment": TransactionPaymentEvent;
        "Vesting": Anonymize<I7uu9ebnucfti5>;
        "Claims": CommonClaimsEvent;
        "Session": Anonymize<I6ue0ck5fc3u44>;
        "Grandpa": GrandpaEvent;
        "Spin": Anonymize<Ie9iaq87qat88g>;
        "SpinAnchoring": Anonymize<I3ktp65v4pfuvj>;
        "Staking": Anonymize<I8n4qjnlkvth8n>;
        "Sudo": Anonymize<Ie0p0b6g756n13>;
        "Revive": Anonymize<I8jc1offjjqsua>;
        "Assets": Anonymize<I6avancvg8fd05>;
    }>;
    "topics": Anonymize<Ic5m5lp1oioo8r>;
}>;
export type Phase = Enum<{
    "ApplyExtrinsic": number;
    "Finalization": undefined;
    "Initialization": undefined;
}>;
export declare const Phase: GetEnum<Phase>;
export type Ibe305d30upkr0 = AnonymousEnum<{
    /**
     * An extrinsic completed successfully.
     */
    "ExtrinsicSuccess": Anonymize<Ia82mnkmeo2rhc>;
    /**
     * An extrinsic failed.
     */
    "ExtrinsicFailed": Anonymize<Idl6a7r4skqaq2>;
    /**
     * `:code` was updated.
     */
    "CodeUpdated": undefined;
    /**
     * A new account was created.
     */
    "NewAccount": Anonymize<Icbccs0ug47ilf>;
    /**
     * An account was reaped.
     */
    "KilledAccount": Anonymize<Icbccs0ug47ilf>;
    /**
     * On on-chain remark happened.
     */
    "Remarked": Anonymize<I855j4i3kr8ko1>;
    /**
     * An upgrade was authorized.
     */
    "UpgradeAuthorized": Anonymize<Ibgl04rn6nbfm6>;
    /**
     * An invalid authorized upgrade was rejected while trying to apply it.
     */
    "RejectedInvalidAuthorizedUpgrade": Anonymize<I1731pqhub6t8e>;
}>;
export type Ia82mnkmeo2rhc = {
    "dispatch_info": Anonymize<Ic9s8f85vjtncc>;
};
export type Ic9s8f85vjtncc = {
    "weight": Anonymize<I4q39t5hn830vp>;
    "class": DispatchClass;
    "pays_fee": Enum<{
        "Yes": undefined;
        "No": undefined;
    }>;
};
export type DispatchClass = Enum<{
    "Normal": undefined;
    "Operational": undefined;
    "Mandatory": undefined;
}>;
export declare const DispatchClass: GetEnum<DispatchClass>;
export type Idl6a7r4skqaq2 = {
    "dispatch_error": Anonymize<I6m2rvq1qrtfa>;
    "dispatch_info": Anonymize<Ic9s8f85vjtncc>;
};
export type I6m2rvq1qrtfa = AnonymousEnum<{
    "Other": undefined;
    "CannotLookup": undefined;
    "BadOrigin": undefined;
    "Module": Enum<{
        "System": Anonymize<I5o0s7c8q1cc9b>;
        "Timestamp": undefined;
        "Utility": Anonymize<I8dt2g2hcrgh36>;
        "Multisig": Anonymize<Ia76qmhhg4jvb9>;
        "Proxy": Anonymize<Iuvt54ei4cehc>;
        "Balances": Anonymize<Idj13i7adlomht>;
        "TransactionPayment": undefined;
        "Vesting": Anonymize<Icof2acl69lq3c>;
        "Claims": Anonymize<Ijh2jbbqvb176>;
        "Authorship": undefined;
        "Session": Anonymize<I1e07dgbaqd1sq>;
        "Grandpa": Anonymize<I7q8i0pp1gkas6>;
        "Spin": Anonymize<Iamu3qsdn11h59>;
        "SpinAnchoring": undefined;
        "Staking": Anonymize<Ileu8a8k5fbnr>;
        "Sudo": Anonymize<Iaug04qjhbli00>;
        "Revive": Anonymize<Id1qlto7be0ig7>;
        "Assets": Anonymize<Ieqmcndp78shme>;
    }>;
    "ConsumerRemaining": undefined;
    "NoProviders": undefined;
    "TooManyConsumers": undefined;
    "Token": TokenError;
    "Arithmetic": ArithmeticError;
    "Transactional": TransactionalError;
    "Exhausted": undefined;
    "Corruption": undefined;
    "Unavailable": undefined;
    "RootNotAllowed": undefined;
    "Trie": Enum<{
        "InvalidStateRoot": undefined;
        "IncompleteDatabase": undefined;
        "ValueAtIncompleteKey": undefined;
        "DecoderError": undefined;
        "InvalidHash": undefined;
        "DuplicateKey": undefined;
        "ExtraneousNode": undefined;
        "ExtraneousValue": undefined;
        "ExtraneousHashReference": undefined;
        "InvalidChildReference": undefined;
        "ValueMismatch": undefined;
        "IncompleteProof": undefined;
        "RootMismatch": undefined;
        "DecodeError": undefined;
    }>;
}>;
export type I5o0s7c8q1cc9b = AnonymousEnum<{
    /**
     * The name of specification does not match between the current runtime
     * and the new runtime.
     */
    "InvalidSpecName": undefined;
    /**
     * The specification version is not allowed to decrease between the current runtime
     * and the new runtime.
     */
    "SpecVersionNeedsToIncrease": undefined;
    /**
     * Failed to extract the runtime version from the new runtime.
     *
     * Either calling `Core_version` or decoding `RuntimeVersion` failed.
     */
    "FailedToExtractRuntimeVersion": undefined;
    /**
     * Suicide called when the account has non-default composite data.
     */
    "NonDefaultComposite": undefined;
    /**
     * There is a non-zero reference count preventing the account from being purged.
     */
    "NonZeroRefCount": undefined;
    /**
     * The origin filter prevent the call to be dispatched.
     */
    "CallFiltered": undefined;
    /**
     * A multi-block migration is ongoing and prevents the current code from being replaced.
     */
    "MultiBlockMigrationsOngoing": undefined;
    /**
     * No upgrade authorized.
     */
    "NothingAuthorized": undefined;
    /**
     * The submitted code is not authorized.
     */
    "Unauthorized": undefined;
}>;
export type I8dt2g2hcrgh36 = AnonymousEnum<{
    /**
     * Too many calls batched.
     */
    "TooManyCalls": undefined;
}>;
export type Ia76qmhhg4jvb9 = AnonymousEnum<{
    /**
     * Threshold must be 2 or greater.
     */
    "MinimumThreshold": undefined;
    /**
     * Call is already approved by this signatory.
     */
    "AlreadyApproved": undefined;
    /**
     * Call doesn't need any (more) approvals.
     */
    "NoApprovalsNeeded": undefined;
    /**
     * There are too few signatories in the list.
     */
    "TooFewSignatories": undefined;
    /**
     * There are too many signatories in the list.
     */
    "TooManySignatories": undefined;
    /**
     * The signatories were provided out of order; they should be ordered.
     */
    "SignatoriesOutOfOrder": undefined;
    /**
     * The sender was contained in the other signatories; it shouldn't be.
     */
    "SenderInSignatories": undefined;
    /**
     * Multisig operation not found in storage.
     */
    "NotFound": undefined;
    /**
     * Only the account that originally created the multisig is able to cancel it or update
     * its deposits.
     */
    "NotOwner": undefined;
    /**
     * No timepoint was given, yet the multisig operation is already underway.
     */
    "NoTimepoint": undefined;
    /**
     * A different timepoint was given to the multisig operation that is underway.
     */
    "WrongTimepoint": undefined;
    /**
     * A timepoint was given, yet no multisig operation is underway.
     */
    "UnexpectedTimepoint": undefined;
    /**
     * The maximum weight information provided was too low.
     */
    "MaxWeightTooLow": undefined;
    /**
     * The data to be stored is already stored.
     */
    "AlreadyStored": undefined;
}>;
export type Iuvt54ei4cehc = AnonymousEnum<{
    /**
     * There are too many proxies registered or too many announcements pending.
     */
    "TooMany": undefined;
    /**
     * Proxy registration not found.
     */
    "NotFound": undefined;
    /**
     * Sender is not a proxy of the account to be proxied.
     */
    "NotProxy": undefined;
    /**
     * A call which is incompatible with the proxy type's filter was attempted.
     */
    "Unproxyable": undefined;
    /**
     * Account is already a proxy.
     */
    "Duplicate": undefined;
    /**
     * Call may not be made by proxy because it may escalate its privileges.
     */
    "NoPermission": undefined;
    /**
     * Announcement, if made at all, was made too recently.
     */
    "Unannounced": undefined;
    /**
     * Cannot add self as proxy.
     */
    "NoSelfProxy": undefined;
}>;
export type Idj13i7adlomht = AnonymousEnum<{
    /**
     * Vesting balance too high to send value.
     */
    "VestingBalance": undefined;
    /**
     * Account liquidity restrictions prevent withdrawal.
     */
    "LiquidityRestrictions": undefined;
    /**
     * Balance too low to send value.
     */
    "InsufficientBalance": undefined;
    /**
     * Value too low to create account due to existential deposit.
     */
    "ExistentialDeposit": undefined;
    /**
     * Transfer/payment would kill account.
     */
    "Expendability": undefined;
    /**
     * A vesting schedule already exists for this account.
     */
    "ExistingVestingSchedule": undefined;
    /**
     * Beneficiary account must pre-exist.
     */
    "DeadAccount": undefined;
    /**
     * Number of named reserves exceed `MaxReserves`.
     */
    "TooManyReserves": undefined;
    /**
     * Number of holds exceed `VariantCountOf<T::RuntimeHoldReason>`.
     */
    "TooManyHolds": undefined;
    /**
     * Number of freezes exceed `MaxFreezes`.
     */
    "TooManyFreezes": undefined;
    /**
     * The issuance cannot be modified since it is already deactivated.
     */
    "IssuanceDeactivated": undefined;
    /**
     * The delta cannot be zero.
     */
    "DeltaZero": undefined;
}>;
export type Icof2acl69lq3c = AnonymousEnum<{
    /**
     * The account given is not vesting.
     */
    "NotVesting": undefined;
    /**
     * The account already has `MaxVestingSchedules` count of schedules and thus
     * cannot add another one. Consider merging existing schedules in order to add another.
     */
    "AtMaxVestingSchedules": undefined;
    /**
     * Amount being transferred is too low to create a vesting schedule.
     */
    "AmountLow": undefined;
    /**
     * An index was out of bounds of the vesting schedules.
     */
    "ScheduleIndexOutOfBounds": undefined;
    /**
     * Failed to create a new schedule because some parameter was invalid.
     */
    "InvalidScheduleParams": undefined;
}>;
export type Ijh2jbbqvb176 = AnonymousEnum<{
    /**
     * Invalid Ethereum signature.
     */
    "InvalidEthereumSignature": undefined;
    /**
     * Ethereum address has no claim.
     */
    "SignerHasNoClaim": undefined;
    /**
     * Account ID sending transaction has no claim.
     */
    "SenderHasNoClaim": undefined;
    /**
     * There's not enough in the pot to pay out some unvested amount. Generally implies a
     * logic error.
     */
    "PotUnderflow": undefined;
    /**
     * A needed statement was not included.
     */
    "InvalidStatement": undefined;
    /**
     * The account already has a vested balance.
     */
    "VestedBalanceExists": undefined;
}>;
export type I1e07dgbaqd1sq = AnonymousEnum<{
    /**
     * Invalid ownership proof.
     */
    "InvalidProof": undefined;
    /**
     * No associated validator ID for account.
     */
    "NoAssociatedValidatorId": undefined;
    /**
     * Registered duplicate key.
     */
    "DuplicatedKey": undefined;
    /**
     * No keys are associated with this account.
     */
    "NoKeys": undefined;
    /**
     * Key setting account is not live, so it's impossible to associate keys.
     */
    "NoAccount": undefined;
}>;
export type I7q8i0pp1gkas6 = AnonymousEnum<{
    /**
     * Attempt to signal GRANDPA pause when the authority set isn't live
     * (either paused or already pending pause).
     */
    "PauseFailed": undefined;
    /**
     * Attempt to signal GRANDPA resume when the authority set isn't paused
     * (either live or already pending resume).
     */
    "ResumeFailed": undefined;
    /**
     * Attempt to signal GRANDPA change with one already pending.
     */
    "ChangePending": undefined;
    /**
     * Cannot signal forced change so soon after last.
     */
    "TooSoon": undefined;
    /**
     * A key ownership proof provided as part of an equivocation report is invalid.
     */
    "InvalidKeyOwnershipProof": undefined;
    /**
     * An equivocation proof provided as part of an equivocation report is invalid.
     */
    "InvalidEquivocationProof": undefined;
    /**
     * A given equivocation report is valid but already previously reported.
     */
    "DuplicateOffenceReport": undefined;
}>;
export type Iamu3qsdn11h59 = AnonymousEnum<{
    /**
     * Zero session length.
     */
    "SessionLengthZero": undefined;
}>;
export type Ileu8a8k5fbnr = AnonymousEnum<{
    /**
     * Not a controller account.
     */
    "NotController": undefined;
    /**
     * Not a stash account.
     */
    "NotStash": undefined;
    /**
     * Stash is already bonded.
     */
    "AlreadyBonded": undefined;
    /**
     * Controller is already paired.
     */
    "AlreadyPaired": undefined;
    /**
     * Targets cannot be empty.
     */
    "EmptyTargets": undefined;
    /**
     * Duplicate index.
     */
    "DuplicateIndex": undefined;
    /**
     * Slash record index out of bounds.
     */
    "InvalidSlashIndex": undefined;
    /**
     * Cannot have a validator or nominator role, with value less than the minimum defined by
     * governance (see `MinValidatorBond` and `MinNominatorBond`). If unbonding is the
     * intention, `chill` first to remove one's role as validator/nominator.
     */
    "InsufficientBond": undefined;
    /**
     * Can not schedule more unlock chunks.
     */
    "NoMoreChunks": undefined;
    /**
     * Can not rebond without unlocking chunks.
     */
    "NoUnlockChunk": undefined;
    /**
     * Attempting to target a stash that still has funds.
     */
    "FundedTarget": undefined;
    /**
     * Invalid era to reward.
     */
    "InvalidEraToReward": undefined;
    /**
     * Invalid number of nominations.
     */
    "InvalidNumberOfNominations": undefined;
    /**
     * Items are not sorted and unique.
     */
    "NotSortedAndUnique": undefined;
    /**
     * Rewards for this era have already been claimed for this validator.
     */
    "AlreadyClaimed": undefined;
    /**
     * No nominators exist on this page.
     */
    "InvalidPage": undefined;
    /**
     * Incorrect previous history depth input provided.
     */
    "IncorrectHistoryDepth": undefined;
    /**
     * Incorrect number of slashing spans provided.
     */
    "IncorrectSlashingSpans": undefined;
    /**
     * Internal state has become somehow corrupted and the operation cannot continue.
     */
    "BadState": undefined;
    /**
     * Too many nomination targets supplied.
     */
    "TooManyTargets": undefined;
    /**
     * A nomination target was supplied that was blocked or otherwise not a validator.
     */
    "BadTarget": undefined;
    /**
     * The user has enough bond and thus cannot be chilled forcefully by an external person.
     */
    "CannotChillOther": undefined;
    /**
     * There are too many nominators in the system. Governance needs to adjust the staking
     * settings to keep things safe for the runtime.
     */
    "TooManyNominators": undefined;
    /**
     * There are too many validator candidates in the system. Governance needs to adjust the
     * staking settings to keep things safe for the runtime.
     */
    "TooManyValidators": undefined;
    /**
     * Commission is too low. Must be at least `MinCommission`.
     */
    "CommissionTooLow": undefined;
    /**
     * Some bound is not met.
     */
    "BoundNotMet": undefined;
    /**
     * Used when attempting to use deprecated controller account logic.
     */
    "ControllerDeprecated": undefined;
    /**
     * Cannot reset a ledger.
     */
    "CannotRestoreLedger": undefined;
    /**
     * Provided reward destination is not allowed.
     */
    "RewardDestinationRestricted": undefined;
    /**
     * Not enough funds available to withdraw.
     */
    "NotEnoughFunds": undefined;
    /**
     * Operation not allowed for virtual stakers.
     */
    "VirtualStakerNotAllowed": undefined;
    /**
     * Stash could not be reaped as other pallet might depend on it.
     */
    "CannotReapStash": undefined;
    /**
     * The stake of this account is already migrated to `Fungible` holds.
     */
    "AlreadyMigrated": undefined;
    /**
     * Account is restricted from participation in staking. This may happen if the account is
     * staking in another way already, such as via pool.
     */
    "Restricted": undefined;
}>;
export type Iaug04qjhbli00 = AnonymousEnum<{
    /**
     * Sender must be the Sudo account.
     */
    "RequireSudo": undefined;
}>;
export type Id1qlto7be0ig7 = AnonymousEnum<{
    /**
     * Invalid schedule supplied, e.g. with zero weight of a basic operation.
     */
    "InvalidSchedule": undefined;
    /**
     * Invalid combination of flags supplied to `seal_call` or `seal_delegate_call`.
     */
    "InvalidCallFlags": undefined;
    /**
     * The executed contract exhausted its gas limit.
     */
    "OutOfGas": undefined;
    /**
     * Performing the requested transfer failed. Probably because there isn't enough
     * free balance in the sender's account.
     */
    "TransferFailed": undefined;
    /**
     * Performing a call was denied because the calling depth reached the limit
     * of what is specified in the schedule.
     */
    "MaxCallDepthReached": undefined;
    /**
     * No contract was found at the specified address.
     */
    "ContractNotFound": undefined;
    /**
     * No code could be found at the supplied code hash.
     */
    "CodeNotFound": undefined;
    /**
     * No code info could be found at the supplied code hash.
     */
    "CodeInfoNotFound": undefined;
    /**
     * A buffer outside of sandbox memory was passed to a contract API function.
     */
    "OutOfBounds": undefined;
    /**
     * Input passed to a contract API function failed to decode as expected type.
     */
    "DecodingFailed": undefined;
    /**
     * Contract trapped during execution.
     */
    "ContractTrapped": undefined;
    /**
     * Event body or storage item exceeds [`limits::PAYLOAD_BYTES`].
     */
    "ValueTooLarge": undefined;
    /**
     * Termination of a contract is not allowed while the contract is already
     * on the call stack. Can be triggered by `seal_terminate`.
     */
    "TerminatedWhileReentrant": undefined;
    /**
     * `seal_call` forwarded this contracts input. It therefore is no longer available.
     */
    "InputForwarded": undefined;
    /**
     * The amount of topics passed to `seal_deposit_events` exceeds the limit.
     */
    "TooManyTopics": undefined;
    /**
     * A contract with the same AccountId already exists.
     */
    "DuplicateContract": undefined;
    /**
     * A contract self destructed in its constructor.
     *
     * This can be triggered by a call to `seal_terminate`.
     */
    "TerminatedInConstructor": undefined;
    /**
     * A call tried to invoke a contract that is flagged as non-reentrant.
     */
    "ReentranceDenied": undefined;
    /**
     * A contract called into the runtime which then called back into this pallet.
     */
    "ReenteredPallet": undefined;
    /**
     * A contract attempted to invoke a state modifying API while being in read-only mode.
     */
    "StateChangeDenied": undefined;
    /**
     * Origin doesn't have enough balance to pay the required storage deposits.
     */
    "StorageDepositNotEnoughFunds": undefined;
    /**
     * More storage was created than allowed by the storage deposit limit.
     */
    "StorageDepositLimitExhausted": undefined;
    /**
     * Code removal was denied because the code is still in use by at least one contract.
     */
    "CodeInUse": undefined;
    /**
     * The contract ran to completion but decided to revert its storage changes.
     * Please note that this error is only returned from extrinsics. When called directly
     * or via RPC an `Ok` will be returned. In this case the caller needs to inspect the flags
     * to determine whether a reversion has taken place.
     */
    "ContractReverted": undefined;
    /**
     * The contract failed to compile or is missing the correct entry points.
     *
     * A more detailed error can be found on the node console if debug messages are enabled
     * by supplying `-lruntime::revive=debug`.
     */
    "CodeRejected": undefined;
    /**
     * The code blob supplied is larger than [`limits::code::BLOB_BYTES`].
     */
    "BlobTooLarge": undefined;
    /**
     * The contract declares too much memory (ro + rw + stack).
     */
    "StaticMemoryTooLarge": undefined;
    /**
     * The program contains a basic block that is larger than allowed.
     */
    "BasicBlockTooLarge": undefined;
    /**
     * The program contains an invalid instruction.
     */
    "InvalidInstruction": undefined;
    /**
     * The contract has reached its maximum number of delegate dependencies.
     */
    "MaxDelegateDependenciesReached": undefined;
    /**
     * The dependency was not found in the contract's delegate dependencies.
     */
    "DelegateDependencyNotFound": undefined;
    /**
     * The contract already depends on the given delegate dependency.
     */
    "DelegateDependencyAlreadyExists": undefined;
    /**
     * Can not add a delegate dependency to the code hash of the contract itself.
     */
    "CannotAddSelfAsDelegateDependency": undefined;
    /**
     * Can not add more data to transient storage.
     */
    "OutOfTransientStorage": undefined;
    /**
     * The contract tried to call a syscall which does not exist (at its current api level).
     */
    "InvalidSyscall": undefined;
    /**
     * Invalid storage flags were passed to one of the storage syscalls.
     */
    "InvalidStorageFlags": undefined;
    /**
     * PolkaVM failed during code execution. Probably due to a malformed program.
     */
    "ExecutionFailed": undefined;
    /**
     * Failed to convert a U256 to a Balance.
     */
    "BalanceConversionFailed": undefined;
    /**
     * Immutable data can only be set during deploys and only be read during calls.
     * Additionally, it is only valid to set the data once and it must not be empty.
     */
    "InvalidImmutableAccess": undefined;
    /**
     * An `AccountID32` account tried to interact with the pallet without having a mapping.
     *
     * Call [`Pallet::map_account`] in order to create a mapping for the account.
     */
    "AccountUnmapped": undefined;
    /**
     * Tried to map an account that is already mapped.
     */
    "AccountAlreadyMapped": undefined;
    /**
     * The transaction used to dry-run a contract is invalid.
     */
    "InvalidGenericTransaction": undefined;
    /**
     * The refcount of a code either over or underflowed.
     */
    "RefcountOverOrUnderflow": undefined;
    /**
     * Unsupported precompile address.
     */
    "UnsupportedPrecompileAddress": undefined;
    /**
     * The calldata exceeds [`limits::CALLDATA_BYTES`].
     */
    "CallDataTooLarge": undefined;
    /**
     * The return data exceeds [`limits::CALLDATA_BYTES`].
     */
    "ReturnDataTooLarge": undefined;
}>;
export type Ieqmcndp78shme = AnonymousEnum<{
    /**
     * Account balance must be greater than or equal to the transfer amount.
     */
    "BalanceLow": undefined;
    /**
     * The account to alter does not exist.
     */
    "NoAccount": undefined;
    /**
     * The signing account has no permission to do the operation.
     */
    "NoPermission": undefined;
    /**
     * The given asset ID is unknown.
     */
    "Unknown": undefined;
    /**
     * The origin account is frozen.
     */
    "Frozen": undefined;
    /**
     * The asset ID is already taken.
     */
    "InUse": undefined;
    /**
     * Invalid witness data given.
     */
    "BadWitness": undefined;
    /**
     * Minimum balance should be non-zero.
     */
    "MinBalanceZero": undefined;
    /**
     * Unable to increment the consumer reference counters on the account. Either no provider
     * reference exists to allow a non-zero balance of a non-self-sufficient asset, or one
     * fewer then the maximum number of consumers has been reached.
     */
    "UnavailableConsumer": undefined;
    /**
     * Invalid metadata given.
     */
    "BadMetadata": undefined;
    /**
     * No approval exists that would allow the transfer.
     */
    "Unapproved": undefined;
    /**
     * The source account would not survive the transfer and it needs to stay alive.
     */
    "WouldDie": undefined;
    /**
     * The asset-account already exists.
     */
    "AlreadyExists": undefined;
    /**
     * The asset-account doesn't have an associated deposit.
     */
    "NoDeposit": undefined;
    /**
     * The operation would result in funds being burned.
     */
    "WouldBurn": undefined;
    /**
     * The asset is a live asset and is actively being used. Usually emit for operations such
     * as `start_destroy` which require the asset to be in a destroying state.
     */
    "LiveAsset": undefined;
    /**
     * The asset is not live, and likely being destroyed.
     */
    "AssetNotLive": undefined;
    /**
     * The asset status is not the expected status.
     */
    "IncorrectStatus": undefined;
    /**
     * The asset should be frozen before the given operation.
     */
    "NotFrozen": undefined;
    /**
     * Callback action resulted in error
     */
    "CallbackFailed": undefined;
    /**
     * The asset ID must be equal to the [`NextAssetId`].
     */
    "BadAssetId": undefined;
    /**
     * The asset cannot be destroyed because some accounts for this asset contain freezes.
     */
    "ContainsFreezes": undefined;
    /**
     * The asset cannot be destroyed because some accounts for this asset contain holds.
     */
    "ContainsHolds": undefined;
}>;
export type TokenError = Enum<{
    "FundsUnavailable": undefined;
    "OnlyProvider": undefined;
    "BelowMinimum": undefined;
    "CannotCreate": undefined;
    "UnknownAsset": undefined;
    "Frozen": undefined;
    "Unsupported": undefined;
    "CannotCreateHold": undefined;
    "NotExpendable": undefined;
    "Blocked": undefined;
}>;
export declare const TokenError: GetEnum<TokenError>;
export type ArithmeticError = Enum<{
    "Underflow": undefined;
    "Overflow": undefined;
    "DivisionByZero": undefined;
}>;
export declare const ArithmeticError: GetEnum<ArithmeticError>;
export type TransactionalError = Enum<{
    "LimitReached": undefined;
    "NoLayer": undefined;
}>;
export declare const TransactionalError: GetEnum<TransactionalError>;
export type Icbccs0ug47ilf = {
    "account": SS58String;
};
export type I855j4i3kr8ko1 = {
    "sender": SS58String;
    "hash": FixedSizeBinary<32>;
};
export type Ibgl04rn6nbfm6 = {
    "code_hash": FixedSizeBinary<32>;
    "check_version": boolean;
};
export type I1731pqhub6t8e = {
    "code_hash": FixedSizeBinary<32>;
    "error": Anonymize<I6m2rvq1qrtfa>;
};
export type I2r3suha7i0c8t = AnonymousEnum<{
    /**
     * Batch of dispatches did not complete fully. Index of first failing dispatch given, as
     * well as the error.
     */
    "BatchInterrupted": Anonymize<I2p3nip7bnnmf8>;
    /**
     * Batch of dispatches completed fully with no error.
     */
    "BatchCompleted": undefined;
    /**
     * Batch of dispatches completed but has errors.
     */
    "BatchCompletedWithErrors": undefined;
    /**
     * A single item within a Batch of dispatches has completed with no error.
     */
    "ItemCompleted": undefined;
    /**
     * A single item within a Batch of dispatches has completed with error.
     */
    "ItemFailed": Anonymize<I3l007jkd0230v>;
    /**
     * A call was dispatched.
     */
    "DispatchedAs": Anonymize<I6cjcevouls47l>;
    /**
     * Main call was dispatched.
     */
    "IfElseMainSuccess": undefined;
    /**
     * The fallback call was dispatched.
     */
    "IfElseFallbackCalled": Anonymize<Io573kme6lgag>;
}>;
export type I2p3nip7bnnmf8 = {
    "index": number;
    "error": Anonymize<I6m2rvq1qrtfa>;
};
export type I3l007jkd0230v = {
    "error": Anonymize<I6m2rvq1qrtfa>;
};
export type I6cjcevouls47l = {
    "result": Anonymize<I68f9r4l875gfd>;
};
export type I68f9r4l875gfd = ResultPayload<undefined, Anonymize<I6m2rvq1qrtfa>>;
export type Io573kme6lgag = {
    "main_error": Anonymize<I6m2rvq1qrtfa>;
};
export type I4e7eadedr2uqe = AnonymousEnum<{
    /**
     * A new multisig operation has begun.
     */
    "NewMultisig": Anonymize<Iep27ialq4a7o7>;
    /**
     * A multisig operation has been approved by someone.
     */
    "MultisigApproval": Anonymize<I9pa9lkcl3m04m>;
    /**
     * A multisig operation has been executed.
     */
    "MultisigExecuted": Anonymize<I1iorg71osages>;
    /**
     * A multisig operation has been cancelled.
     */
    "MultisigCancelled": Anonymize<Ic9sq0g5877186>;
    /**
     * The deposit for a multisig operation has been updated/poked.
     */
    "DepositPoked": Anonymize<I8gtde5abn1g9a>;
}>;
export type Iep27ialq4a7o7 = {
    "approving": SS58String;
    "multisig": SS58String;
    "call_hash": FixedSizeBinary<32>;
};
export type I9pa9lkcl3m04m = {
    "approving": SS58String;
    "timepoint": Anonymize<I83nkmvi3lsg6r>;
    "multisig": SS58String;
    "call_hash": FixedSizeBinary<32>;
};
export type I83nkmvi3lsg6r = {
    "height": bigint;
    "index": number;
};
export type I1iorg71osages = {
    "approving": SS58String;
    "timepoint": Anonymize<I83nkmvi3lsg6r>;
    "multisig": SS58String;
    "call_hash": FixedSizeBinary<32>;
    "result": Anonymize<I68f9r4l875gfd>;
};
export type Ic9sq0g5877186 = {
    "cancelling": SS58String;
    "timepoint": Anonymize<I83nkmvi3lsg6r>;
    "multisig": SS58String;
    "call_hash": FixedSizeBinary<32>;
};
export type I8gtde5abn1g9a = {
    "who": SS58String;
    "call_hash": FixedSizeBinary<32>;
    "old_deposit": bigint;
    "new_deposit": bigint;
};
export type Ib7g7c1igdjvip = AnonymousEnum<{
    /**
     * A proxy was executed correctly, with the given.
     */
    "ProxyExecuted": Anonymize<I6cjcevouls47l>;
    /**
     * A pure account has been created by new proxy with given
     * disambiguation index and proxy type.
     */
    "PureCreated": Anonymize<I7dqtifd54vt87>;
    /**
     * A pure proxy was killed by its spawner.
     */
    "PureKilled": Anonymize<I7nrsqbg7da4kn>;
    /**
     * An announcement was placed to make a call in the future.
     */
    "Announced": Anonymize<I2ur0oeqg495j8>;
    /**
     * A proxy was added.
     */
    "ProxyAdded": Anonymize<I8etnn6hovgc5s>;
    /**
     * A proxy was removed.
     */
    "ProxyRemoved": Anonymize<I8etnn6hovgc5s>;
    /**
     * A deposit stored for proxies or announcements was poked / updated.
     */
    "DepositPoked": Anonymize<I1bhd210c3phjj>;
}>;
export type I7dqtifd54vt87 = {
    "pure": SS58String;
    "who": SS58String;
    "proxy_type": Anonymize<Ifld93hq4fhrsi>;
    "disambiguation_index": number;
    "at": bigint;
    "extrinsic_index": number;
};
export type Ifld93hq4fhrsi = AnonymousEnum<{
    "Any": undefined;
    "NonTransfer": undefined;
    "CancelProxy": undefined;
    "Assets": undefined;
    "AssetOwner": undefined;
    "AssetManager": undefined;
    "Governance": undefined;
    "Staking": undefined;
}>;
export type I7nrsqbg7da4kn = {
    "pure": SS58String;
    "spawner": SS58String;
    "proxy_type": Anonymize<Ifld93hq4fhrsi>;
    "disambiguation_index": number;
};
export type I2ur0oeqg495j8 = {
    "real": SS58String;
    "proxy": SS58String;
    "call_hash": FixedSizeBinary<32>;
};
export type I8etnn6hovgc5s = {
    "delegator": SS58String;
    "delegatee": SS58String;
    "proxy_type": Anonymize<Ifld93hq4fhrsi>;
    "delay": bigint;
};
export type I1bhd210c3phjj = {
    "who": SS58String;
    "kind": Enum<{
        "Proxies": undefined;
        "Announcements": undefined;
    }>;
    "old_deposit": bigint;
    "new_deposit": bigint;
};
export type Ib2ifamughfdjj = AnonymousEnum<{
    /**
     * An account was created with some free balance.
     */
    "Endowed": Anonymize<Icv68aq8841478>;
    /**
     * An account was removed whose balance was non-zero but below ExistentialDeposit,
     * resulting in an outright loss.
     */
    "DustLost": Anonymize<Ic262ibdoec56a>;
    /**
     * Transfer succeeded.
     */
    "Transfer": Anonymize<Iflcfm9b6nlmdd>;
    /**
     * A balance was set by root.
     */
    "BalanceSet": Anonymize<Ijrsf4mnp3eka>;
    /**
     * Some balance was reserved (moved from free to reserved).
     */
    "Reserved": Anonymize<Id5fm4p8lj5qgi>;
    /**
     * Some balance was unreserved (moved from reserved to free).
     */
    "Unreserved": Anonymize<Id5fm4p8lj5qgi>;
    /**
     * Some balance was moved from the reserve of the first account to the second account.
     * Final argument indicates the destination balance type.
     */
    "ReserveRepatriated": Anonymize<I8tjvj9uq4b7hi>;
    /**
     * Some amount was deposited (e.g. for transaction fees).
     */
    "Deposit": Anonymize<Id5fm4p8lj5qgi>;
    /**
     * Some amount was withdrawn from the account (e.g. for transaction fees).
     */
    "Withdraw": Anonymize<Id5fm4p8lj5qgi>;
    /**
     * Some amount was removed from the account (e.g. for misbehavior).
     */
    "Slashed": Anonymize<Id5fm4p8lj5qgi>;
    /**
     * Some amount was minted into an account.
     */
    "Minted": Anonymize<Id5fm4p8lj5qgi>;
    /**
     * Some credit was balanced and added to the TotalIssuance.
     */
    "MintedCredit": Anonymize<I3qt1hgg4djhgb>;
    /**
     * Some amount was burned from an account.
     */
    "Burned": Anonymize<Id5fm4p8lj5qgi>;
    /**
     * Some debt has been dropped from the Total Issuance.
     */
    "BurnedDebt": Anonymize<I3qt1hgg4djhgb>;
    /**
     * Some amount was suspended from an account (it can be restored later).
     */
    "Suspended": Anonymize<Id5fm4p8lj5qgi>;
    /**
     * Some amount was restored into an account.
     */
    "Restored": Anonymize<Id5fm4p8lj5qgi>;
    /**
     * An account was upgraded.
     */
    "Upgraded": Anonymize<I4cbvqmqadhrea>;
    /**
     * Total issuance was increased by `amount`, creating a credit to be balanced.
     */
    "Issued": Anonymize<I3qt1hgg4djhgb>;
    /**
     * Total issuance was decreased by `amount`, creating a debt to be balanced.
     */
    "Rescinded": Anonymize<I3qt1hgg4djhgb>;
    /**
     * Some balance was locked.
     */
    "Locked": Anonymize<Id5fm4p8lj5qgi>;
    /**
     * Some balance was unlocked.
     */
    "Unlocked": Anonymize<Id5fm4p8lj5qgi>;
    /**
     * Some balance was frozen.
     */
    "Frozen": Anonymize<Id5fm4p8lj5qgi>;
    /**
     * Some balance was thawed.
     */
    "Thawed": Anonymize<Id5fm4p8lj5qgi>;
    /**
     * The `TotalIssuance` was forcefully changed.
     */
    "TotalIssuanceForced": Anonymize<I4fooe9dun9o0t>;
    /**
     * Some balance was placed on hold.
     */
    "Held": Anonymize<I7spgnoibfesv6>;
    /**
     * Held balance was burned from an account.
     */
    "BurnedHeld": Anonymize<I7spgnoibfesv6>;
    /**
     * A transfer of `amount` on hold from `source` to `dest` was initiated.
     */
    "TransferOnHold": Anonymize<Id10ir17qugnsk>;
    /**
     * The `transferred` balance is placed on hold at the `dest` account.
     */
    "TransferAndHold": Anonymize<If3dpbe8nibcsc>;
    /**
     * Some balance was released from hold.
     */
    "Released": Anonymize<I7spgnoibfesv6>;
    /**
     * An unexpected/defensive event was triggered.
     */
    "Unexpected": Anonymize<Iph9c4rn81ub2>;
}>;
export type Icv68aq8841478 = {
    "account": SS58String;
    "free_balance": bigint;
};
export type Ic262ibdoec56a = {
    "account": SS58String;
    "amount": bigint;
};
export type Iflcfm9b6nlmdd = {
    "from": SS58String;
    "to": SS58String;
    "amount": bigint;
};
export type Ijrsf4mnp3eka = {
    "who": SS58String;
    "free": bigint;
};
export type Id5fm4p8lj5qgi = {
    "who": SS58String;
    "amount": bigint;
};
export type I8tjvj9uq4b7hi = {
    "from": SS58String;
    "to": SS58String;
    "amount": bigint;
    "destination_status": BalanceStatus;
};
export type BalanceStatus = Enum<{
    "Free": undefined;
    "Reserved": undefined;
}>;
export declare const BalanceStatus: GetEnum<BalanceStatus>;
export type I3qt1hgg4djhgb = {
    "amount": bigint;
};
export type I4cbvqmqadhrea = {
    "who": SS58String;
};
export type I4fooe9dun9o0t = {
    "old": bigint;
    "new": bigint;
};
export type I7spgnoibfesv6 = {
    "reason": Anonymize<Ibljeftf4h1k0i>;
    "who": SS58String;
    "amount": bigint;
};
export type Ibljeftf4h1k0i = AnonymousEnum<{
    "Session": Enum<{
        "Keys": undefined;
    }>;
    "Staking": Enum<{
        "Staking": undefined;
    }>;
    "Revive": Enum<{
        "CodeUploadDepositReserve": undefined;
        "StorageDepositReserve": undefined;
        "AddressMapping": undefined;
    }>;
}>;
export type Id10ir17qugnsk = {
    "reason": Anonymize<Ibljeftf4h1k0i>;
    "source": SS58String;
    "dest": SS58String;
    "amount": bigint;
};
export type If3dpbe8nibcsc = {
    "reason": Anonymize<Ibljeftf4h1k0i>;
    "source": SS58String;
    "dest": SS58String;
    "transferred": bigint;
};
export type Iph9c4rn81ub2 = AnonymousEnum<{
    "BalanceUpdated": undefined;
    "FailedToMutateAccount": undefined;
}>;
export type TransactionPaymentEvent = Enum<{
    /**
     * A transaction fee `actual_fee`, of which `tip` was added to the minimum inclusion fee,
     * has been paid by `who`.
     */
    "TransactionFeePaid": Anonymize<Ier2cke86dqbr2>;
}>;
export declare const TransactionPaymentEvent: GetEnum<TransactionPaymentEvent>;
export type Ier2cke86dqbr2 = {
    "who": SS58String;
    "actual_fee": bigint;
    "tip": bigint;
};
export type I7uu9ebnucfti5 = AnonymousEnum<{
    /**
     * A vesting schedule has been created.
     */
    "VestingCreated": Anonymize<Ih04jp733tqqa>;
    /**
     * The amount vested has been updated. This could indicate a change in funds available.
     * The balance given is the amount which is left unvested (and thus locked).
     */
    "VestingUpdated": Anonymize<Ievr89968437gm>;
    /**
     * An \[account\] has become fully vested.
     */
    "VestingCompleted": Anonymize<Icbccs0ug47ilf>;
}>;
export type Ih04jp733tqqa = {
    "account": SS58String;
    "schedule_index": number;
};
export type Ievr89968437gm = {
    "account": SS58String;
    "unvested": bigint;
};
export type CommonClaimsEvent = Enum<{
    /**
     * Someone claimed some DOTs.
     */
    "Claimed": Anonymize<Ie3hcrrq6r18fs>;
}>;
export declare const CommonClaimsEvent: GetEnum<CommonClaimsEvent>;
export type Ie3hcrrq6r18fs = {
    "who": SS58String;
    "ethereum_address": FixedSizeBinary<20>;
    "amount": bigint;
};
export type I6ue0ck5fc3u44 = AnonymousEnum<{
    /**
     * New session has happened. Note that the argument is the session index, not the
     * block number as the type might suggest.
     */
    "NewSession": Anonymize<I2hq50pu2kdjpo>;
    /**
     * The `NewSession` event in the current block also implies a new validator set to be
     * queued.
     */
    "NewQueued": undefined;
    /**
     * Validator has been disabled.
     */
    "ValidatorDisabled": Anonymize<I9acqruh7322g2>;
    /**
     * Validator has been re-enabled.
     */
    "ValidatorReenabled": Anonymize<I9acqruh7322g2>;
}>;
export type I2hq50pu2kdjpo = {
    "session_index": number;
};
export type I9acqruh7322g2 = {
    "validator": SS58String;
};
export type GrandpaEvent = Enum<{
    /**
     * New authority set has been applied.
     */
    "NewAuthorities": Anonymize<I5768ac424h061>;
    /**
     * Current authority set has been paused.
     */
    "Paused": undefined;
    /**
     * Current authority set has been resumed.
     */
    "Resumed": undefined;
}>;
export declare const GrandpaEvent: GetEnum<GrandpaEvent>;
export type I5768ac424h061 = {
    "authority_set": Anonymize<I3geksg000c171>;
};
export type I3geksg000c171 = Array<[FixedSizeBinary<32>, bigint]>;
export type Ie9iaq87qat88g = AnonymousEnum<{
    /**
     * New session length set.
     */
    "NewSessionLength": bigint;
}>;
export type I3ktp65v4pfuvj = AnonymousEnum<{
    /**
     * Secure finality advanced to `up_to`.
     */
    "SecureFinalityAdvanced": Anonymize<Ibft7pgbru2gi2>;
}>;
export type Ibft7pgbru2gi2 = {
    "up_to": bigint;
};
export type I8n4qjnlkvth8n = AnonymousEnum<{
    /**
     * The era payout has been set; the first balance is the validator-payout; the second is
     * the remainder from the maximum amount of reward.
     */
    "EraPaid": Anonymize<I1au3fq4n84nv3>;
    /**
     * The nominator has been rewarded by this amount to this destination.
     */
    "Rewarded": Anonymize<Iejaj7m7qka9tr>;
    /**
     * A staker (validator or nominator) has been slashed by the given amount.
     */
    "Slashed": Anonymize<Idnak900lt5lm8>;
    /**
     * A slash for the given validator, for the given percentage of their stake, at the given
     * era as been reported.
     */
    "SlashReported": Anonymize<I27n7lbd66730p>;
    /**
     * An old slashing report from a prior era was discarded because it could
     * not be processed.
     */
    "OldSlashingReportDiscarded": Anonymize<I2hq50pu2kdjpo>;
    /**
     * A new set of stakers was elected.
     */
    "StakersElected": undefined;
    /**
     * An account has bonded this amount. \[stash, amount\]
     *
     * NOTE: This event is only emitted when funds are bonded via a dispatchable. Notably,
     * it will not be emitted for staking rewards when they are added to stake.
     */
    "Bonded": Anonymize<Ifk8eme5o7mukf>;
    /**
     * An account has unbonded this amount.
     */
    "Unbonded": Anonymize<Ifk8eme5o7mukf>;
    /**
     * An account has called `withdraw_unbonded` and removed unbonding chunks worth `Balance`
     * from the unlocking queue.
     */
    "Withdrawn": Anonymize<Ifk8eme5o7mukf>;
    /**
     * A nominator has been kicked from a validator.
     */
    "Kicked": Anonymize<Iau4cgm6ih61cf>;
    /**
     * The election failed. No new era is planned.
     */
    "StakingElectionFailed": undefined;
    /**
     * An account has stopped participating as either a validator or nominator.
     */
    "Chilled": Anonymize<Idl3umm12u5pa>;
    /**
     * A Page of stakers rewards are getting paid. `next` is `None` if all pages are claimed.
     */
    "PayoutStarted": Anonymize<Ith132hqfb27q>;
    /**
     * A validator has set their preferences.
     */
    "ValidatorPrefsSet": Anonymize<Ic19as7nbst738>;
    /**
     * Voters size limit reached.
     */
    "SnapshotVotersSizeExceeded": Anonymize<I54umskavgc9du>;
    /**
     * Targets size limit reached.
     */
    "SnapshotTargetsSizeExceeded": Anonymize<I54umskavgc9du>;
    /**
     * A new force era mode was set.
     */
    "ForceEra": Anonymize<I2ip7o9e2tc5sf>;
    /**
     * Report of a controller batch deprecation.
     */
    "ControllerBatchDeprecated": Anonymize<I5egvk6hadac5h>;
    /**
     * Staking balance migrated from locks to holds, with any balance that could not be held
     * is force withdrawn.
     */
    "CurrencyMigrated": Anonymize<I1td4upnup9gqv>;
}>;
export type I1au3fq4n84nv3 = {
    "era_index": number;
    "validator_payout": bigint;
    "remainder": bigint;
};
export type Iejaj7m7qka9tr = {
    "stash": SS58String;
    "dest": StakingRewardDestination;
    "amount": bigint;
};
export type StakingRewardDestination = Enum<{
    "Staked": undefined;
    "Stash": undefined;
    "Controller": undefined;
    "Account": SS58String;
    "None": undefined;
}>;
export declare const StakingRewardDestination: GetEnum<StakingRewardDestination>;
export type Idnak900lt5lm8 = {
    "staker": SS58String;
    "amount": bigint;
};
export type I27n7lbd66730p = {
    "validator": SS58String;
    "fraction": number;
    "slash_era": number;
};
export type Ifk8eme5o7mukf = {
    "stash": SS58String;
    "amount": bigint;
};
export type Iau4cgm6ih61cf = {
    "nominator": SS58String;
    "stash": SS58String;
};
export type Idl3umm12u5pa = {
    "stash": SS58String;
};
export type Ith132hqfb27q = {
    "era_index": number;
    "validator_stash": SS58String;
    "page": number;
    "next"?: Anonymize<I4arjljr6dpflb>;
};
export type I4arjljr6dpflb = (number) | undefined;
export type Ic19as7nbst738 = {
    "stash": SS58String;
    "prefs": Anonymize<I9o7ssi9vmhmgr>;
};
export type I9o7ssi9vmhmgr = {
    "commission": number;
    "blocked": boolean;
};
export type I54umskavgc9du = {
    "size": number;
};
export type I2ip7o9e2tc5sf = {
    "mode": StakingForcing;
};
export type StakingForcing = Enum<{
    "NotForcing": undefined;
    "ForceNew": undefined;
    "ForceNone": undefined;
    "ForceAlways": undefined;
}>;
export declare const StakingForcing: GetEnum<StakingForcing>;
export type I5egvk6hadac5h = {
    "failures": number;
};
export type I1td4upnup9gqv = {
    "stash": SS58String;
    "force_withdraw": bigint;
};
export type Ie0p0b6g756n13 = AnonymousEnum<{
    /**
     * A sudo call just took place.
     */
    "Sudid": Anonymize<I97oh0ugnukh6b>;
    /**
     * The sudo key has been updated.
     */
    "KeyChanged": Anonymize<I5rtkmhm2dng4u>;
    /**
     * The key was permanently removed.
     */
    "KeyRemoved": undefined;
    /**
     * A [sudo_as](Pallet::sudo_as) call just took place.
     */
    "SudoAsDone": Anonymize<I97oh0ugnukh6b>;
}>;
export type I97oh0ugnukh6b = {
    /**
     * The result of the call made by the sudo user.
     */
    "sudo_result": Anonymize<I68f9r4l875gfd>;
};
export type I5rtkmhm2dng4u = {
    /**
     * The old sudo key (if one was previously set).
     */
    "old"?: Anonymize<Ihfphjolmsqq1>;
    /**
     * The new sudo key (if one was set).
     */
    "new": SS58String;
};
export type Ihfphjolmsqq1 = (SS58String) | undefined;
export type I8jc1offjjqsua = AnonymousEnum<{
    /**
     * A custom event emitted by the contract.
     */
    "ContractEmitted": Anonymize<I7svbvm6hg57aj>;
    /**
     * Contract deployed by deployer at the specified address.
     */
    "Instantiated": Anonymize<I8jhsbaiultviu>;
}>;
export type I7svbvm6hg57aj = {
    /**
     * The contract that emitted the event.
     */
    "contract": FixedSizeBinary<20>;
    /**
     * Data supplied by the contract. Metadata generated during contract compilation
     * is needed to decode it.
     */
    "data": Binary;
    /**
     * A list of topics used to index the event.
     * Number of topics is capped by [`limits::NUM_EVENT_TOPICS`].
     */
    "topics": Anonymize<Ic5m5lp1oioo8r>;
};
export type Ic5m5lp1oioo8r = Array<FixedSizeBinary<32>>;
export type I8jhsbaiultviu = {
    "deployer": FixedSizeBinary<20>;
    "contract": FixedSizeBinary<20>;
};
export type I6avancvg8fd05 = AnonymousEnum<{
    /**
     * Some asset class was created.
     */
    "Created": Anonymize<I88ff3u4dpivk>;
    /**
     * Some assets were issued.
     */
    "Issued": Anonymize<I33cp947glv1ks>;
    /**
     * Some assets were transferred.
     */
    "Transferred": Anonymize<Ic9om1gmmqu7rq>;
    /**
     * Some assets were destroyed.
     */
    "Burned": Anonymize<I5hfov2b68ppb6>;
    /**
     * The management team changed.
     */
    "TeamChanged": Anonymize<Ibthhb2m9vneds>;
    /**
     * The owner changed.
     */
    "OwnerChanged": Anonymize<Iaitn5bqfacj7k>;
    /**
     * Some account `who` was frozen.
     */
    "Frozen": Anonymize<If4ebvclj2ugvi>;
    /**
     * Some account `who` was thawed.
     */
    "Thawed": Anonymize<If4ebvclj2ugvi>;
    /**
     * Some asset `asset_id` was frozen.
     */
    "AssetFrozen": Anonymize<Ia5le7udkgbaq9>;
    /**
     * Some asset `asset_id` was thawed.
     */
    "AssetThawed": Anonymize<Ia5le7udkgbaq9>;
    /**
     * Accounts were destroyed for given asset.
     */
    "AccountsDestroyed": Anonymize<Ieduc1e6frq8rb>;
    /**
     * Approvals were destroyed for given asset.
     */
    "ApprovalsDestroyed": Anonymize<I9h6gbtabovtm4>;
    /**
     * An asset class is in the process of being destroyed.
     */
    "DestructionStarted": Anonymize<Ia5le7udkgbaq9>;
    /**
     * An asset class was destroyed.
     */
    "Destroyed": Anonymize<Ia5le7udkgbaq9>;
    /**
     * Some asset class was force-created.
     */
    "ForceCreated": Anonymize<Iaitn5bqfacj7k>;
    /**
     * New metadata has been set for an asset.
     */
    "MetadataSet": Anonymize<Ifnsa0dkkpf465>;
    /**
     * Metadata has been cleared for an asset.
     */
    "MetadataCleared": Anonymize<Ia5le7udkgbaq9>;
    /**
     * (Additional) funds have been approved for transfer to a destination account.
     */
    "ApprovedTransfer": Anonymize<I65dtqr2egjbc3>;
    /**
     * An approval for account `delegate` was cancelled by `owner`.
     */
    "ApprovalCancelled": Anonymize<Ibqj3vg5s5lk0c>;
    /**
     * An `amount` was transferred in its entirety from `owner` to `destination` by
     * the approved `delegate`.
     */
    "TransferredApproved": Anonymize<I6l73u513p8rna>;
    /**
     * An asset has had its attributes changed by the `Force` origin.
     */
    "AssetStatusChanged": Anonymize<Ia5le7udkgbaq9>;
    /**
     * The min_balance of an asset has been updated by the asset owner.
     */
    "AssetMinBalanceChanged": Anonymize<Iefqmt2htu1dlu>;
    /**
     * Some account `who` was created with a deposit from `depositor`.
     */
    "Touched": Anonymize<If8bgtgqrchjtu>;
    /**
     * Some account `who` was blocked.
     */
    "Blocked": Anonymize<If4ebvclj2ugvi>;
    /**
     * Some assets were deposited (e.g. for transaction fees).
     */
    "Deposited": Anonymize<Idusmq77988cmt>;
    /**
     * Some assets were withdrawn from the account (e.g. for transaction fees).
     */
    "Withdrawn": Anonymize<Idusmq77988cmt>;
}>;
export type I88ff3u4dpivk = {
    "asset_id": number;
    "creator": SS58String;
    "owner": SS58String;
};
export type I33cp947glv1ks = {
    "asset_id": number;
    "owner": SS58String;
    "amount": bigint;
};
export type Ic9om1gmmqu7rq = {
    "asset_id": number;
    "from": SS58String;
    "to": SS58String;
    "amount": bigint;
};
export type I5hfov2b68ppb6 = {
    "asset_id": number;
    "owner": SS58String;
    "balance": bigint;
};
export type Ibthhb2m9vneds = {
    "asset_id": number;
    "issuer": SS58String;
    "admin": SS58String;
    "freezer": SS58String;
};
export type Iaitn5bqfacj7k = {
    "asset_id": number;
    "owner": SS58String;
};
export type If4ebvclj2ugvi = {
    "asset_id": number;
    "who": SS58String;
};
export type Ia5le7udkgbaq9 = {
    "asset_id": number;
};
export type Ieduc1e6frq8rb = {
    "asset_id": number;
    "accounts_destroyed": number;
    "accounts_remaining": number;
};
export type I9h6gbtabovtm4 = {
    "asset_id": number;
    "approvals_destroyed": number;
    "approvals_remaining": number;
};
export type Ifnsa0dkkpf465 = {
    "asset_id": number;
    "name": Binary;
    "symbol": Binary;
    "decimals": number;
    "is_frozen": boolean;
};
export type I65dtqr2egjbc3 = {
    "asset_id": number;
    "source": SS58String;
    "delegate": SS58String;
    "amount": bigint;
};
export type Ibqj3vg5s5lk0c = {
    "asset_id": number;
    "owner": SS58String;
    "delegate": SS58String;
};
export type I6l73u513p8rna = {
    "asset_id": number;
    "owner": SS58String;
    "delegate": SS58String;
    "destination": SS58String;
    "amount": bigint;
};
export type Iefqmt2htu1dlu = {
    "asset_id": number;
    "new_min_balance": bigint;
};
export type If8bgtgqrchjtu = {
    "asset_id": number;
    "who": SS58String;
    "depositor": SS58String;
};
export type Idusmq77988cmt = {
    "asset_id": number;
    "who": SS58String;
    "amount": bigint;
};
export type Ifip05kcrl65am = Array<[bigint, number]>;
export type Ieniouoqkq4icf = {
    "spec_version": number;
    "spec_name": string;
};
export type Iahvoath23ldhv = {
    "when": Anonymize<I83nkmvi3lsg6r>;
    "deposit": bigint;
    "depositor": SS58String;
    "approvals": Anonymize<Ia2lhg7l2hilo3>;
};
export type Ia2lhg7l2hilo3 = Array<SS58String>;
export type I8uo3fpd3bcc6f = [SS58String, FixedSizeBinary<32>];
export type Ibfh8ogcpe64jg = [Array<{
    "delegate": SS58String;
    "proxy_type": Anonymize<Ifld93hq4fhrsi>;
    "delay": bigint;
}>, bigint];
export type I43vorjrsfs83q = [Array<{
    "real": SS58String;
    "call_hash": FixedSizeBinary<32>;
    "height": bigint;
}>, bigint];
export type I8ds64oj6581v0 = Array<{
    "id": FixedSizeBinary<8>;
    "amount": bigint;
    "reasons": BalancesTypesReasons;
}>;
export type BalancesTypesReasons = Enum<{
    "Fee": undefined;
    "Misc": undefined;
    "All": undefined;
}>;
export declare const BalancesTypesReasons: GetEnum<BalancesTypesReasons>;
export type Ia7pdug7cdsg8g = Array<{
    "id": FixedSizeBinary<8>;
    "amount": bigint;
}>;
export type I9hc9s58q2f30r = Array<{
    "id": Anonymize<Ibljeftf4h1k0i>;
    "amount": bigint;
}>;
export type I9bin2jc70qt6q = Array<Anonymize<I3qt1hgg4djhgb>>;
export type TransactionPaymentReleases = Enum<{
    "V1Ancient": undefined;
    "V2": undefined;
}>;
export declare const TransactionPaymentReleases: GetEnum<TransactionPaymentReleases>;
export type I63js2b08d3e38 = Array<Anonymize<I4sun88f8jcj4r>>;
export type I4sun88f8jcj4r = {
    "locked": bigint;
    "per_block": bigint;
    "starting_block": bigint;
};
export type Version = Enum<{
    "V0": undefined;
    "V1": undefined;
}>;
export declare const Version: GetEnum<Version>;
export type Idflv32oq2s29f = [bigint, bigint, bigint];
export type ClaimsStatementKind = Enum<{
    "Regular": undefined;
    "Saft": undefined;
}>;
export declare const ClaimsStatementKind: GetEnum<ClaimsStatementKind>;
export type I6lotbh1p748lj = Array<[SS58String, Anonymize<I137grj3cf9c1v>]>;
export type I137grj3cf9c1v = {
    "spin": FixedSizeBinary<32>;
    "grandpa": FixedSizeBinary<32>;
};
export type I95g6i7ilua7lq = Array<FixedSizeArray<2, number>>;
export type Ia24s7cuas271t = AnonymousEnum<{
    "Live": undefined;
    "PendingPause": {
        "scheduled_at": bigint;
        "delay": bigint;
    };
    "Paused": undefined;
    "PendingResume": {
        "scheduled_at": bigint;
        "delay": bigint;
    };
}>;
export type I30cqmm2kaidet = {
    "scheduled_at": bigint;
    "delay": bigint;
    "next_authorities": Anonymize<I3geksg000c171>;
    "forced"?: Anonymize<I35p85j063s0il>;
};
export type I35p85j063s0il = (bigint) | undefined;
export type I200n1ov5tbcvr = FixedSizeArray<2, bigint>;
export type Ic12aht5vh2sen = {
    "stash": SS58String;
    "total": bigint;
    "active": bigint;
    "unlocking": Anonymize<I9nc4v1upo2c8e>;
    "legacy_claimed_rewards": Anonymize<Icgljjb6j82uhn>;
};
export type I9nc4v1upo2c8e = Array<{
    "value": bigint;
    "era": number;
}>;
export type Icgljjb6j82uhn = Array<number>;
export type Ic3m9d6tdl6gi2 = {
    "targets": Anonymize<Ia2lhg7l2hilo3>;
    "submitted_in": number;
    "suppressed": boolean;
};
export type Ib3j7gb0jgs38u = {
    "index": number;
    "start"?: Anonymize<I35p85j063s0il>;
};
export type Ifekshcrgkl12g = {
    "total": bigint;
    "own": bigint;
    "others": Anonymize<I252o97fo263q7>;
};
export type I252o97fo263q7 = Array<{
    "who": SS58String;
    "value": bigint;
}>;
export type I7svnfko10tq2e = [number, SS58String];
export type I6flrronqs3l6n = {
    "total": bigint;
    "own": bigint;
    "nominator_count": number;
    "page_count": number;
};
export type I97fulj5h3ik95 = {
    "page_total": bigint;
    "others": Anonymize<I252o97fo263q7>;
};
export type Ia8896dq44k9m4 = [number, SS58String, number];
export type Iff9p3c7k6pfoi = {
    "total": number;
    "individual": Array<Anonymize<I6ouflveob4eli>>;
};
export type I6ouflveob4eli = [SS58String, number];
export type Iafq6t4rgheait = Array<{
    "validator": SS58String;
    "own": bigint;
    "others": Array<Anonymize<I95l2k9b1re95f>>;
    "reporters": Anonymize<Ia2lhg7l2hilo3>;
    "payout": bigint;
}>;
export type I95l2k9b1re95f = [SS58String, bigint];
export type I4ojmnsk1dchql = [number, bigint];
export type Iinkhfdlka9ch = {
    "span_index": number;
    "last_start": number;
    "last_nonzero_slash": number;
    "prior": Anonymize<Icgljjb6j82uhn>;
};
export type I2kj4j6mp68hf8 = {
    "slashed": bigint;
    "paid_out": bigint;
};
export type I834nfrf667ag1 = {
    "owner": SS58String;
    "deposit": bigint;
    "refcount": bigint;
    "code_len": number;
    "code_type": Enum<{
        "Pvm": undefined;
        "Evm": undefined;
    }>;
    "behaviour_version": number;
};
export type I14i9pui8lc778 = {
    "account_type": Enum<{
        "Contract": {
            "trie_id": Binary;
            "code_hash": FixedSizeBinary<32>;
            "storage_bytes": number;
            "storage_items": number;
            "storage_byte_deposit": bigint;
            "storage_item_deposit": bigint;
            "storage_base_deposit": bigint;
            "immutable_data_len": number;
        };
        "EOA": undefined;
    }>;
    "dust": number;
};
export type I8t4pajubp34g3 = {
    "insert_counter": number;
    "delete_counter": number;
};
export type I3qklfjubrljqh = {
    "owner": SS58String;
    "issuer": SS58String;
    "admin": SS58String;
    "freezer": SS58String;
    "supply": bigint;
    "deposit": bigint;
    "min_balance": bigint;
    "is_sufficient": boolean;
    "accounts": number;
    "sufficients": number;
    "approvals": number;
    "status": Enum<{
        "Live": undefined;
        "Frozen": undefined;
        "Destroying": undefined;
    }>;
};
export type Iag3f1hum3p4c8 = {
    "balance": bigint;
    "status": Enum<{
        "Liquid": undefined;
        "Frozen": undefined;
        "Blocked": undefined;
    }>;
    "reason": Enum<{
        "Consumer": undefined;
        "Sufficient": undefined;
        "DepositHeld": bigint;
        "DepositRefunded": undefined;
        "DepositFrom": Anonymize<I95l2k9b1re95f>;
    }>;
};
export type I4s6jkha20aoh0 = {
    "amount": bigint;
    "deposit": bigint;
};
export type I2brm5b9jij1st = [number, SS58String, SS58String];
export type I78s05f59eoi8b = {
    "deposit": bigint;
    "name": Binary;
    "symbol": Binary;
    "decimals": number;
    "is_frozen": boolean;
};
export type In7a38730s6qs = {
    "base_block": Anonymize<I4q39t5hn830vp>;
    "max_block": Anonymize<I4q39t5hn830vp>;
    "per_class": {
        "normal": {
            "base_extrinsic": Anonymize<I4q39t5hn830vp>;
            "max_extrinsic"?: Anonymize<Iasb8k6ash5mjn>;
            "max_total"?: Anonymize<Iasb8k6ash5mjn>;
            "reserved"?: Anonymize<Iasb8k6ash5mjn>;
        };
        "operational": {
            "base_extrinsic": Anonymize<I4q39t5hn830vp>;
            "max_extrinsic"?: Anonymize<Iasb8k6ash5mjn>;
            "max_total"?: Anonymize<Iasb8k6ash5mjn>;
            "reserved"?: Anonymize<Iasb8k6ash5mjn>;
        };
        "mandatory": {
            "base_extrinsic": Anonymize<I4q39t5hn830vp>;
            "max_extrinsic"?: Anonymize<Iasb8k6ash5mjn>;
            "max_total"?: Anonymize<Iasb8k6ash5mjn>;
            "reserved"?: Anonymize<Iasb8k6ash5mjn>;
        };
    };
};
export type Iasb8k6ash5mjn = (Anonymize<I4q39t5hn830vp>) | undefined;
export type If15el53dd76v9 = {
    "normal": number;
    "operational": number;
    "mandatory": number;
};
export type I9s0ave7t0vnrk = {
    "read": bigint;
    "write": bigint;
};
export type I4fo08joqmcqnm = {
    "spec_name": string;
    "impl_name": string;
    "authoring_version": number;
    "spec_version": number;
    "impl_version": number;
    "apis": Array<[FixedSizeBinary<8>, number]>;
    "transaction_version": number;
    "system_version": number;
};
export type Iekve0i6djpd9f = AnonymousEnum<{
    /**
     * Make some on-chain remark.
     *
     * Can be executed by every `origin`.
     */
    "remark": Anonymize<I8ofcg5rbj0g2c>;
    /**
     * Set the number of pages in the WebAssembly environment's heap.
     */
    "set_heap_pages": Anonymize<I4adgbll7gku4i>;
    /**
     * Set the new runtime code.
     */
    "set_code": Anonymize<I6pjjpfvhvcfru>;
    /**
     * Set the new runtime code without doing any checks of the given `code`.
     *
     * Note that runtime upgrades will not run if this is called with a not-increasing spec
     * version!
     */
    "set_code_without_checks": Anonymize<I6pjjpfvhvcfru>;
    /**
     * Set some items of storage.
     */
    "set_storage": Anonymize<I9pj91mj79qekl>;
    /**
     * Kill some items from storage.
     */
    "kill_storage": Anonymize<I39uah9nss64h9>;
    /**
     * Kill all storage items with a key that starts with the given prefix.
     *
     * **NOTE:** We rely on the Root origin to provide us the number of subkeys under
     * the prefix we are removing to accurately calculate the weight of this function.
     */
    "kill_prefix": Anonymize<Ik64dknsq7k08>;
    /**
     * Make some on-chain remark and emit event.
     */
    "remark_with_event": Anonymize<I8ofcg5rbj0g2c>;
    /**
     * Authorize an upgrade to a given `code_hash` for the runtime. The runtime can be supplied
     * later.
     *
     * This call requires Root origin.
     */
    "authorize_upgrade": Anonymize<Ib51vk42m1po4n>;
    /**
     * Authorize an upgrade to a given `code_hash` for the runtime. The runtime can be supplied
     * later.
     *
     * WARNING: This authorizes an upgrade that will take place without any safety checks, for
     * example that the spec name remains the same and that the version number increases. Not
     * recommended for normal use. Use `authorize_upgrade` instead.
     *
     * This call requires Root origin.
     */
    "authorize_upgrade_without_checks": Anonymize<Ib51vk42m1po4n>;
    /**
     * Provide the preimage (runtime binary) `code` for an upgrade that has been authorized.
     *
     * If the authorization required a version check, this call will ensure the spec name
     * remains unchanged and that the spec version has increased.
     *
     * Depending on the runtime's `OnSetCode` configuration, this function may directly apply
     * the new `code` in the same block or attempt to schedule the upgrade.
     *
     * All origins are allowed.
     */
    "apply_authorized_upgrade": Anonymize<I6pjjpfvhvcfru>;
}>;
export type I8ofcg5rbj0g2c = {
    "remark": Binary;
};
export type I4adgbll7gku4i = {
    "pages": bigint;
};
export type I6pjjpfvhvcfru = {
    "code": Binary;
};
export type I9pj91mj79qekl = {
    "items": Array<FixedSizeArray<2, Binary>>;
};
export type I39uah9nss64h9 = {
    "keys": Anonymize<Itom7fk49o0c9>;
};
export type Itom7fk49o0c9 = Array<Binary>;
export type Ik64dknsq7k08 = {
    "prefix": Binary;
    "subkeys": number;
};
export type Ib51vk42m1po4n = {
    "code_hash": FixedSizeBinary<32>;
};
export type I7d75gqfg6jh9c = AnonymousEnum<{
    /**
     * Set the current time.
     *
     * This call should be invoked exactly once per block. It will panic at the finalization
     * phase, if this call hasn't been invoked by that time.
     *
     * The timestamp should be greater than the previous one by the amount specified by
     * [`Config::MinimumPeriod`].
     *
     * The dispatch origin for this call must be _None_.
     *
     * This dispatch class is _Mandatory_ to ensure it gets executed in the block. Be aware
     * that changing the complexity of this call could result exhausting the resources in a
     * block to execute any other calls.
     *
     * ## Complexity
     * - `O(1)` (Note that implementations of `OnTimestampSet` must also be `O(1)`)
     * - 1 storage read and 1 storage mutation (codec `O(1)` because of `DidUpdate::take` in
     * `on_finalize`)
     * - 1 event handler `on_timestamp_set`. Must be `O(1)`.
     */
    "set": Anonymize<Idcr6u6361oad9>;
}>;
export type Idcr6u6361oad9 = {
    "now": bigint;
};
export type I1v3u8v6hvsvju = AnonymousEnum<{
    /**
     * Send a batch of dispatch calls.
     *
     * May be called from any origin except `None`.
     *
     * - `calls`: The calls to be dispatched from the same origin. The number of call must not
     * exceed the constant: `batched_calls_limit` (available in constant metadata).
     *
     * If origin is root then the calls are dispatched without checking origin filter. (This
     * includes bypassing `frame_system::Config::BaseCallFilter`).
     *
     * ## Complexity
     * - O(C) where C is the number of calls to be batched.
     *
     * This will return `Ok` in all circumstances. To determine the success of the batch, an
     * event is deposited. If a call failed and the batch was interrupted, then the
     * `BatchInterrupted` event is deposited, along with the number of successful calls made
     * and the error of the failed call. If all were successful, then the `BatchCompleted`
     * event is deposited.
     */
    "batch": Anonymize<I4qh1793baku96>;
    /**
     * Send a call through an indexed pseudonym of the sender.
     *
     * Filter from origin are passed along. The call will be dispatched with an origin which
     * use the same filter as the origin of this call.
     *
     * NOTE: If you need to ensure that any account-based filtering is not honored (i.e.
     * because you expect `proxy` to have been used prior in the call stack and you do not want
     * the call restrictions to apply to any sub-accounts), then use `as_multi_threshold_1`
     * in the Multisig pallet instead.
     *
     * NOTE: Prior to version *12, this was called `as_limited_sub`.
     *
     * The dispatch origin for this call must be _Signed_.
     */
    "as_derivative": Anonymize<I34nlbmoo268ff>;
    /**
     * Send a batch of dispatch calls and atomically execute them.
     * The whole transaction will rollback and fail if any of the calls failed.
     *
     * May be called from any origin except `None`.
     *
     * - `calls`: The calls to be dispatched from the same origin. The number of call must not
     * exceed the constant: `batched_calls_limit` (available in constant metadata).
     *
     * If origin is root then the calls are dispatched without checking origin filter. (This
     * includes bypassing `frame_system::Config::BaseCallFilter`).
     *
     * ## Complexity
     * - O(C) where C is the number of calls to be batched.
     */
    "batch_all": Anonymize<I4qh1793baku96>;
    /**
     * Dispatches a function call with a provided origin.
     *
     * The dispatch origin for this call must be _Root_.
     *
     * ## Complexity
     * - O(1).
     */
    "dispatch_as": Anonymize<I4lk3lbgonnmc1>;
    /**
     * Send a batch of dispatch calls.
     * Unlike `batch`, it allows errors and won't interrupt.
     *
     * May be called from any origin except `None`.
     *
     * - `calls`: The calls to be dispatched from the same origin. The number of call must not
     * exceed the constant: `batched_calls_limit` (available in constant metadata).
     *
     * If origin is root then the calls are dispatch without checking origin filter. (This
     * includes bypassing `frame_system::Config::BaseCallFilter`).
     *
     * ## Complexity
     * - O(C) where C is the number of calls to be batched.
     */
    "force_batch": Anonymize<I4qh1793baku96>;
    /**
     * Dispatch a function call with a specified weight.
     *
     * This function does not check the weight of the call, and instead allows the
     * Root origin to specify the weight of the call.
     *
     * The dispatch origin for this call must be _Root_.
     */
    "with_weight": Anonymize<Idvlr5eokt20kr>;
    /**
     * Dispatch a fallback call in the event the main call fails to execute.
     * May be called from any origin except `None`.
     *
     * This function first attempts to dispatch the `main` call.
     * If the `main` call fails, the `fallback` is attemted.
     * if the fallback is successfully dispatched, the weights of both calls
     * are accumulated and an event containing the main call error is deposited.
     *
     * In the event of a fallback failure the whole call fails
     * with the weights returned.
     *
     * - `main`: The main call to be dispatched. This is the primary action to execute.
     * - `fallback`: The fallback call to be dispatched in case the `main` call fails.
     *
     * ## Dispatch Logic
     * - If the origin is `root`, both the main and fallback calls are executed without
     * applying any origin filters.
     * - If the origin is not `root`, the origin filter is applied to both the `main` and
     * `fallback` calls.
     *
     * ## Use Case
     * - Some use cases might involve submitting a `batch` type call in either main, fallback
     * or both.
     */
    "if_else": Anonymize<Ic2atn8at9f5dr>;
    /**
     * Dispatches a function call with a provided origin.
     *
     * Almost the same as [`Pallet::dispatch_as`] but forwards any error of the inner call.
     *
     * The dispatch origin for this call must be _Root_.
     */
    "dispatch_as_fallible": Anonymize<I4lk3lbgonnmc1>;
}>;
export type I4qh1793baku96 = {
    "calls": Array<TxCallData>;
};
export type I34nlbmoo268ff = {
    "index": number;
    "call": TxCallData;
};
export type I4lk3lbgonnmc1 = {
    "as_origin": Enum<{
        "system": Enum<{
            "Root": undefined;
            "Signed": SS58String;
            "None": undefined;
            "Authorized": undefined;
        }>;
    }>;
    "call": TxCallData;
};
export type Idvlr5eokt20kr = {
    "call": TxCallData;
    "weight": Anonymize<I4q39t5hn830vp>;
};
export type Ic2atn8at9f5dr = {
    "main": TxCallData;
    "fallback": TxCallData;
};
export type I6ilbd3tq77psg = AnonymousEnum<{
    /**
     * Immediately dispatch a multi-signature call using a single approval from the caller.
     *
     * The dispatch origin for this call must be _Signed_.
     *
     * - `other_signatories`: The accounts (other than the sender) who are part of the
     * multi-signature, but do not participate in the approval process.
     * - `call`: The call to be executed.
     *
     * Result is equivalent to the dispatched result.
     *
     * ## Complexity
     * O(Z + C) where Z is the length of the call and C its execution weight.
     */
    "as_multi_threshold_1": Anonymize<Ie0lfcqf4d8glo>;
    /**
     * Register approval for a dispatch to be made from a deterministic composite account if
     * approved by a total of `threshold - 1` of `other_signatories`.
     *
     * If there are enough, then dispatch the call.
     *
     * Payment: `DepositBase` will be reserved if this is the first approval, plus
     * `threshold` times `DepositFactor`. It is returned once this dispatch happens or
     * is cancelled.
     *
     * The dispatch origin for this call must be _Signed_.
     *
     * - `threshold`: The total number of approvals for this dispatch before it is executed.
     * - `other_signatories`: The accounts (other than the sender) who can approve this
     * dispatch. May not be empty.
     * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
     * not the first approval, then it must be `Some`, with the timepoint (block number and
     * transaction index) of the first approval transaction.
     * - `call`: The call to be executed.
     *
     * NOTE: Unless this is the final approval, you will generally want to use
     * `approve_as_multi` instead, since it only requires a hash of the call.
     *
     * Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
     * on success, result is `Ok` and the result from the interior call, if it was executed,
     * may be found in the deposited `MultisigExecuted` event.
     *
     * ## Complexity
     * - `O(S + Z + Call)`.
     * - Up to one balance-reserve or unreserve operation.
     * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
     * signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
     * - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
     * - One encode & hash, both of complexity `O(S)`.
     * - Up to one binary search and insert (`O(logS + S)`).
     * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
     * - One event.
     * - The weight of the `call`.
     * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
     * taken for its lifetime of `DepositBase + threshold * DepositFactor`.
     */
    "as_multi": Anonymize<Id9v0e9k2imv>;
    /**
     * Register approval for a dispatch to be made from a deterministic composite account if
     * approved by a total of `threshold - 1` of `other_signatories`.
     *
     * Payment: `DepositBase` will be reserved if this is the first approval, plus
     * `threshold` times `DepositFactor`. It is returned once this dispatch happens or
     * is cancelled.
     *
     * The dispatch origin for this call must be _Signed_.
     *
     * - `threshold`: The total number of approvals for this dispatch before it is executed.
     * - `other_signatories`: The accounts (other than the sender) who can approve this
     * dispatch. May not be empty.
     * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
     * not the first approval, then it must be `Some`, with the timepoint (block number and
     * transaction index) of the first approval transaction.
     * - `call_hash`: The hash of the call to be executed.
     *
     * NOTE: If this is the final approval, you will want to use `as_multi` instead.
     *
     * ## Complexity
     * - `O(S)`.
     * - Up to one balance-reserve or unreserve operation.
     * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
     * signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
     * - One encode & hash, both of complexity `O(S)`.
     * - Up to one binary search and insert (`O(logS + S)`).
     * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
     * - One event.
     * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
     * taken for its lifetime of `DepositBase + threshold * DepositFactor`.
     */
    "approve_as_multi": Anonymize<I44imsiesapsp9>;
    /**
     * Cancel a pre-existing, on-going multisig transaction. Any deposit reserved previously
     * for this operation will be unreserved on success.
     *
     * The dispatch origin for this call must be _Signed_.
     *
     * - `threshold`: The total number of approvals for this dispatch before it is executed.
     * - `other_signatories`: The accounts (other than the sender) who can approve this
     * dispatch. May not be empty.
     * - `timepoint`: The timepoint (block number and transaction index) of the first approval
     * transaction for this dispatch.
     * - `call_hash`: The hash of the call to be executed.
     *
     * ## Complexity
     * - `O(S)`.
     * - Up to one balance-reserve or unreserve operation.
     * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
     * signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
     * - One encode & hash, both of complexity `O(S)`.
     * - One event.
     * - I/O: 1 read `O(S)`, one remove.
     * - Storage: removes one item.
     */
    "cancel_as_multi": Anonymize<Icr6ao0t0ec3r6>;
    /**
     * Poke the deposit reserved for an existing multisig operation.
     *
     * The dispatch origin for this call must be _Signed_ and must be the original depositor of
     * the multisig operation.
     *
     * The transaction fee is waived if the deposit amount has changed.
     *
     * - `threshold`: The total number of approvals needed for this multisig.
     * - `other_signatories`: The accounts (other than the sender) who are part of the
     * multisig.
     * - `call_hash`: The hash of the call this deposit is reserved for.
     *
     * Emits `DepositPoked` if successful.
     */
    "poke_deposit": Anonymize<I6lqh1vgb4mcja>;
}>;
export type Ie0lfcqf4d8glo = {
    "other_signatories": Anonymize<Ia2lhg7l2hilo3>;
    "call": TxCallData;
};
export type Id9v0e9k2imv = {
    "threshold": number;
    "other_signatories": Anonymize<Ia2lhg7l2hilo3>;
    "maybe_timepoint"?: Anonymize<I6grb980qgjf06>;
    "call": TxCallData;
    "max_weight": Anonymize<I4q39t5hn830vp>;
};
export type I6grb980qgjf06 = (Anonymize<I83nkmvi3lsg6r>) | undefined;
export type I44imsiesapsp9 = {
    "threshold": number;
    "other_signatories": Anonymize<Ia2lhg7l2hilo3>;
    "maybe_timepoint"?: Anonymize<I6grb980qgjf06>;
    "call_hash": FixedSizeBinary<32>;
    "max_weight": Anonymize<I4q39t5hn830vp>;
};
export type Icr6ao0t0ec3r6 = {
    "threshold": number;
    "other_signatories": Anonymize<Ia2lhg7l2hilo3>;
    "timepoint": Anonymize<I83nkmvi3lsg6r>;
    "call_hash": FixedSizeBinary<32>;
};
export type I6lqh1vgb4mcja = {
    "threshold": number;
    "other_signatories": Anonymize<Ia2lhg7l2hilo3>;
    "call_hash": FixedSizeBinary<32>;
};
export type I2clil4olgr5i3 = AnonymousEnum<{
    /**
     * Dispatch the given `call` from an account that the sender is authorised for through
     * `add_proxy`.
     *
     * The dispatch origin for this call must be _Signed_.
     *
     * Parameters:
     * - `real`: The account that the proxy will make a call on behalf of.
     * - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
     * - `call`: The call to be made by the `real` account.
     */
    "proxy": Anonymize<Ifcvepim6uel89>;
    /**
     * Register a proxy account for the sender that is able to make calls on its behalf.
     *
     * The dispatch origin for this call must be _Signed_.
     *
     * Parameters:
     * - `proxy`: The account that the `caller` would like to make a proxy.
     * - `proxy_type`: The permissions allowed for this proxy account.
     * - `delay`: The announcement period required of the initial proxy. Will generally be
     * zero.
     */
    "add_proxy": Anonymize<Iafrqv9avnq6ck>;
    /**
     * Unregister a proxy account for the sender.
     *
     * The dispatch origin for this call must be _Signed_.
     *
     * Parameters:
     * - `proxy`: The account that the `caller` would like to remove as a proxy.
     * - `proxy_type`: The permissions currently enabled for the removed proxy account.
     */
    "remove_proxy": Anonymize<Iafrqv9avnq6ck>;
    /**
     * Unregister all proxy accounts for the sender.
     *
     * The dispatch origin for this call must be _Signed_.
     *
     * WARNING: This may be called on accounts created by `create_pure`, however if done, then
     * the unreserved fees will be inaccessible. **All access to this account will be lost.**
     */
    "remove_proxies": undefined;
    /**
     * Spawn a fresh new account that is guaranteed to be otherwise inaccessible, and
     * initialize it with a proxy of `proxy_type` for `origin` sender.
     *
     * Requires a `Signed` origin.
     *
     * - `proxy_type`: The type of the proxy that the sender will be registered as over the
     * new account. This will almost always be the most permissive `ProxyType` possible to
     * allow for maximum flexibility.
     * - `index`: A disambiguation index, in case this is called multiple times in the same
     * transaction (e.g. with `utility::batch`). Unless you're using `batch` you probably just
     * want to use `0`.
     * - `delay`: The announcement period required of the initial proxy. Will generally be
     * zero.
     *
     * Fails with `Duplicate` if this has already been called in this transaction, from the
     * same sender, with the same parameters.
     *
     * Fails if there are insufficient funds to pay for deposit.
     */
    "create_pure": Anonymize<If10pbv4q37qmd>;
    /**
     * Removes a previously spawned pure proxy.
     *
     * WARNING: **All access to this account will be lost.** Any funds held in it will be
     * inaccessible.
     *
     * Requires a `Signed` origin, and the sender account must have been created by a call to
     * `create_pure` with corresponding parameters.
     *
     * - `spawner`: The account that originally called `create_pure` to create this account.
     * - `index`: The disambiguation index originally passed to `create_pure`. Probably `0`.
     * - `proxy_type`: The proxy type originally passed to `create_pure`.
     * - `height`: The height of the chain when the call to `create_pure` was processed.
     * - `ext_index`: The extrinsic index in which the call to `create_pure` was processed.
     *
     * Fails with `NoPermission` in case the caller is not a previously created pure
     * account whose `create_pure` call has corresponding parameters.
     */
    "kill_pure": Anonymize<I42tjisrl273pv>;
    /**
     * Publish the hash of a proxy-call that will be made in the future.
     *
     * This must be called some number of blocks before the corresponding `proxy` is attempted
     * if the delay associated with the proxy relationship is greater than zero.
     *
     * No more than `MaxPending` announcements may be made at any one time.
     *
     * This will take a deposit of `AnnouncementDepositFactor` as well as
     * `AnnouncementDepositBase` if there are no other pending announcements.
     *
     * The dispatch origin for this call must be _Signed_ and a proxy of `real`.
     *
     * Parameters:
     * - `real`: The account that the proxy will make a call on behalf of.
     * - `call_hash`: The hash of the call to be made by the `real` account.
     */
    "announce": Anonymize<I2eb501t8s6hsq>;
    /**
     * Remove a given announcement.
     *
     * May be called by a proxy account to remove a call they previously announced and return
     * the deposit.
     *
     * The dispatch origin for this call must be _Signed_.
     *
     * Parameters:
     * - `real`: The account that the proxy will make a call on behalf of.
     * - `call_hash`: The hash of the call to be made by the `real` account.
     */
    "remove_announcement": Anonymize<I2eb501t8s6hsq>;
    /**
     * Remove the given announcement of a delegate.
     *
     * May be called by a target (proxied) account to remove a call that one of their delegates
     * (`delegate`) has announced they want to execute. The deposit is returned.
     *
     * The dispatch origin for this call must be _Signed_.
     *
     * Parameters:
     * - `delegate`: The account that previously announced the call.
     * - `call_hash`: The hash of the call to be made.
     */
    "reject_announcement": Anonymize<Ianmuoljk2sk1u>;
    /**
     * Dispatch the given `call` from an account that the sender is authorized for through
     * `add_proxy`.
     *
     * Removes any corresponding announcement(s).
     *
     * The dispatch origin for this call must be _Signed_.
     *
     * Parameters:
     * - `real`: The account that the proxy will make a call on behalf of.
     * - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
     * - `call`: The call to be made by the `real` account.
     */
    "proxy_announced": Anonymize<Icfa6nb4v5a36n>;
    /**
     * Poke / Adjust deposits made for proxies and announcements based on current values.
     * This can be used by accounts to possibly lower their locked amount.
     *
     * The dispatch origin for this call must be _Signed_.
     *
     * The transaction fee is waived if the deposit amount has changed.
     *
     * Emits `DepositPoked` if successful.
     */
    "poke_deposit": undefined;
}>;
export type Ifcvepim6uel89 = {
    "real": MultiAddress;
    "force_proxy_type"?: Anonymize<I5sslgo0j1kvs4>;
    "call": TxCallData;
};
export type MultiAddress = Enum<{
    "Id": SS58String;
    "Index": undefined;
    "Raw": Binary;
    "Address32": FixedSizeBinary<32>;
    "Address20": FixedSizeBinary<20>;
}>;
export declare const MultiAddress: GetEnum<MultiAddress>;
export type I5sslgo0j1kvs4 = (Anonymize<Ifld93hq4fhrsi>) | undefined;
export type Iafrqv9avnq6ck = {
    "delegate": MultiAddress;
    "proxy_type": Anonymize<Ifld93hq4fhrsi>;
    "delay": bigint;
};
export type If10pbv4q37qmd = {
    "proxy_type": Anonymize<Ifld93hq4fhrsi>;
    "delay": bigint;
    "index": number;
};
export type I42tjisrl273pv = {
    "spawner": MultiAddress;
    "proxy_type": Anonymize<Ifld93hq4fhrsi>;
    "index": number;
    "height": bigint;
    "ext_index": number;
};
export type I2eb501t8s6hsq = {
    "real": MultiAddress;
    "call_hash": FixedSizeBinary<32>;
};
export type Ianmuoljk2sk1u = {
    "delegate": MultiAddress;
    "call_hash": FixedSizeBinary<32>;
};
export type Icfa6nb4v5a36n = {
    "delegate": MultiAddress;
    "real": MultiAddress;
    "force_proxy_type"?: Anonymize<I5sslgo0j1kvs4>;
    "call": TxCallData;
};
export type I9svldsp29mh87 = AnonymousEnum<{
    /**
     * Transfer some liquid free balance to another account.
     *
     * `transfer_allow_death` will set the `FreeBalance` of the sender and receiver.
     * If the sender's account is below the existential deposit as a result
     * of the transfer, the account will be reaped.
     *
     * The dispatch origin for this call must be `Signed` by the transactor.
     */
    "transfer_allow_death": Anonymize<I4ktuaksf5i1gk>;
    /**
     * Exactly as `transfer_allow_death`, except the origin must be root and the source account
     * may be specified.
     */
    "force_transfer": Anonymize<I9bqtpv2ii35mp>;
    /**
     * Same as the [`transfer_allow_death`] call, but with a check that the transfer will not
     * kill the origin account.
     *
     * 99% of the time you want [`transfer_allow_death`] instead.
     *
     * [`transfer_allow_death`]: struct.Pallet.html#method.transfer
     */
    "transfer_keep_alive": Anonymize<I4ktuaksf5i1gk>;
    /**
     * Transfer the entire transferable balance from the caller account.
     *
     * NOTE: This function only attempts to transfer _transferable_ balances. This means that
     * any locked, reserved, or existential deposits (when `keep_alive` is `true`), will not be
     * transferred by this function. To ensure that this function results in a killed account,
     * you might need to prepare the account by removing any reference counters, storage
     * deposits, etc...
     *
     * The dispatch origin of this call must be Signed.
     *
     * - `dest`: The recipient of the transfer.
     * - `keep_alive`: A boolean to determine if the `transfer_all` operation should send all
     * of the funds the account has, causing the sender account to be killed (false), or
     * transfer everything except at least the existential deposit, which will guarantee to
     * keep the sender account alive (true).
     */
    "transfer_all": Anonymize<I9j7pagd6d4bda>;
    /**
     * Unreserve some balance from a user by force.
     *
     * Can only be called by ROOT.
     */
    "force_unreserve": Anonymize<I2h9pmio37r7fb>;
    /**
     * Upgrade a specified account.
     *
     * - `origin`: Must be `Signed`.
     * - `who`: The account to be upgraded.
     *
     * This will waive the transaction fee if at least all but 10% of the accounts needed to
     * be upgraded. (We let some not have to be upgraded just in order to allow for the
     * possibility of churn).
     */
    "upgrade_accounts": Anonymize<Ibmr18suc9ikh9>;
    /**
     * Set the regular balance of a given account.
     *
     * The dispatch origin for this call is `root`.
     */
    "force_set_balance": Anonymize<I9iq22t0burs89>;
    /**
     * Adjust the total issuance in a saturating way.
     *
     * Can only be called by root and always needs a positive `delta`.
     *
     * # Example
     */
    "force_adjust_total_issuance": Anonymize<I5u8olqbbvfnvf>;
    /**
     * Burn the specified liquid free balance from the origin account.
     *
     * If the origin's account ends up below the existential deposit as a result
     * of the burn and `keep_alive` is false, the account will be reaped.
     *
     * Unlike sending funds to a _burn_ address, which merely makes the funds inaccessible,
     * this `burn` operation will reduce total issuance by the amount _burned_.
     */
    "burn": Anonymize<I5utcetro501ir>;
}>;
export type I4ktuaksf5i1gk = {
    "dest": MultiAddress;
    "value": bigint;
};
export type I9bqtpv2ii35mp = {
    "source": MultiAddress;
    "dest": MultiAddress;
    "value": bigint;
};
export type I9j7pagd6d4bda = {
    "dest": MultiAddress;
    "keep_alive": boolean;
};
export type I2h9pmio37r7fb = {
    "who": MultiAddress;
    "amount": bigint;
};
export type Ibmr18suc9ikh9 = {
    "who": Anonymize<Ia2lhg7l2hilo3>;
};
export type I9iq22t0burs89 = {
    "who": MultiAddress;
    "new_free": bigint;
};
export type I5u8olqbbvfnvf = {
    "direction": BalancesAdjustmentDirection;
    "delta": bigint;
};
export type BalancesAdjustmentDirection = Enum<{
    "Increase": undefined;
    "Decrease": undefined;
}>;
export declare const BalancesAdjustmentDirection: GetEnum<BalancesAdjustmentDirection>;
export type I5utcetro501ir = {
    "value": bigint;
    "keep_alive": boolean;
};
export type I8cfe4jnuoj2j7 = AnonymousEnum<{
    /**
     * Unlock any vested funds of the sender account.
     *
     * The dispatch origin for this call must be _Signed_ and the sender must have funds still
     * locked under this pallet.
     *
     * Emits either `VestingCompleted` or `VestingUpdated`.
     *
     * ## Complexity
     * - `O(1)`.
     */
    "vest": undefined;
    /**
     * Unlock any vested funds of a `target` account.
     *
     * The dispatch origin for this call must be _Signed_.
     *
     * - `target`: The account whose vested funds should be unlocked. Must have funds still
     * locked under this pallet.
     *
     * Emits either `VestingCompleted` or `VestingUpdated`.
     *
     * ## Complexity
     * - `O(1)`.
     */
    "vest_other": Anonymize<Id9uqtigc0il3v>;
    /**
     * Create a vested transfer.
     *
     * The dispatch origin for this call must be _Signed_.
     *
     * - `target`: The account receiving the vested funds.
     * - `schedule`: The vesting schedule attached to the transfer.
     *
     * Emits `VestingCreated`.
     *
     * NOTE: This will unlock all schedules through the current block.
     *
     * ## Complexity
     * - `O(1)`.
     */
    "vested_transfer": Anonymize<Ie1ni9fvcthisk>;
    /**
     * Force a vested transfer.
     *
     * The dispatch origin for this call must be _Root_.
     *
     * - `source`: The account whose funds should be transferred.
     * - `target`: The account that should be transferred the vested funds.
     * - `schedule`: The vesting schedule attached to the transfer.
     *
     * Emits `VestingCreated`.
     *
     * NOTE: This will unlock all schedules through the current block.
     *
     * ## Complexity
     * - `O(1)`.
     */
    "force_vested_transfer": Anonymize<Ia7e8nb66rbo53>;
    /**
     * Merge two vesting schedules together, creating a new vesting schedule that unlocks over
     * the highest possible start and end blocks. If both schedules have already started the
     * current block will be used as the schedule start; with the caveat that if one schedule
     * is finished by the current block, the other will be treated as the new merged schedule,
     * unmodified.
     *
     * NOTE: If `schedule1_index == schedule2_index` this is a no-op.
     * NOTE: This will unlock all schedules through the current block prior to merging.
     * NOTE: If both schedules have ended by the current block, no new schedule will be created
     * and both will be removed.
     *
     * Merged schedule attributes:
     * - `starting_block`: `MAX(schedule1.starting_block, scheduled2.starting_block,
     * current_block)`.
     * - `ending_block`: `MAX(schedule1.ending_block, schedule2.ending_block)`.
     * - `locked`: `schedule1.locked_at(current_block) + schedule2.locked_at(current_block)`.
     *
     * The dispatch origin for this call must be _Signed_.
     *
     * - `schedule1_index`: index of the first schedule to merge.
     * - `schedule2_index`: index of the second schedule to merge.
     */
    "merge_schedules": Anonymize<Ict9ivhr2c5hv0>;
    /**
     * Force remove a vesting schedule
     *
     * The dispatch origin for this call must be _Root_.
     *
     * - `target`: An account that has a vesting schedule
     * - `schedule_index`: The vesting schedule index that should be removed
     */
    "force_remove_vesting_schedule": Anonymize<I8t4vv03357lk9>;
}>;
export type Id9uqtigc0il3v = {
    "target": MultiAddress;
};
export type Ie1ni9fvcthisk = {
    "target": MultiAddress;
    "schedule": Anonymize<I4sun88f8jcj4r>;
};
export type Ia7e8nb66rbo53 = {
    "source": MultiAddress;
    "target": MultiAddress;
    "schedule": Anonymize<I4sun88f8jcj4r>;
};
export type Ict9ivhr2c5hv0 = {
    "schedule1_index": number;
    "schedule2_index": number;
};
export type I8t4vv03357lk9 = {
    "target": MultiAddress;
    "schedule_index": number;
};
export type Icbj7ln7smk5ds = AnonymousEnum<{
    /**
     * Make a claim to collect your DOTs.
     *
     * The dispatch origin for this call must be _None_.
     *
     * Unsigned Validation:
     * A call to claim is deemed valid if the signature provided matches
     * the expected signed message of:
     *
     * > Ethereum Signed Message:
     * > (configured prefix string)(address)
     *
     * and `address` matches the `dest` account.
     *
     * Parameters:
     * - `dest`: The destination account to payout the claim.
     * - `ethereum_signature`: The signature of an ethereum signed message matching the format
     * described above.
     *
     * <weight>
     * The weight of this call is invariant over the input parameters.
     * Weight includes logic to validate unsigned `claim` call.
     *
     * Total Complexity: O(1)
     * </weight>
     */
    "claim": Anonymize<I6uag8j5aql8q>;
    /**
     * Mint a new claim to collect DOTs.
     *
     * The dispatch origin for this call must be _Root_.
     *
     * Parameters:
     * - `who`: The Ethereum address allowed to collect this claim.
     * - `value`: The number of DOTs that will be claimed.
     * - `vesting_schedule`: An optional vesting schedule for these DOTs.
     *
     * <weight>
     * The weight of this call is invariant over the input parameters.
     * We assume worst case that both vesting and statement is being inserted.
     *
     * Total Complexity: O(1)
     * </weight>
     */
    "mint_claim": Anonymize<I54a6pqb8nsfv0>;
    /**
     * Make a claim to collect your DOTs by signing a statement.
     *
     * The dispatch origin for this call must be _None_.
     *
     * Unsigned Validation:
     * A call to `claim_attest` is deemed valid if the signature provided matches
     * the expected signed message of:
     *
     * > Ethereum Signed Message:
     * > (configured prefix string)(address)(statement)
     *
     * and `address` matches the `dest` account; the `statement` must match that which is
     * expected according to your purchase arrangement.
     *
     * Parameters:
     * - `dest`: The destination account to payout the claim.
     * - `ethereum_signature`: The signature of an ethereum signed message matching the format
     * described above.
     * - `statement`: The identity of the statement which is being attested to in the
     * signature.
     *
     * <weight>
     * The weight of this call is invariant over the input parameters.
     * Weight includes logic to validate unsigned `claim_attest` call.
     *
     * Total Complexity: O(1)
     * </weight>
     */
    "claim_attest": Anonymize<I1dqiovk0tpoah>;
    /**
     * Attest to a statement, needed to finalize the claims process.
     *
     * WARNING: Insecure unless your chain includes `PrevalidateAttests` as a
     * `TransactionExtension`.
     *
     * Unsigned Validation:
     * A call to attest is deemed valid if the sender has a `Preclaim` registered
     * and provides a `statement` which is expected for the account.
     *
     * Parameters:
     * - `statement`: The identity of the statement which is being attested to in the
     * signature.
     *
     * <weight>
     * The weight of this call is invariant over the input parameters.
     * Weight includes logic to do pre-validation on `attest` call.
     *
     * Total Complexity: O(1)
     * </weight>
     */
    "attest": Anonymize<I1ntko0oih7v1a>;
    "move_claim": Anonymize<I2tf5qmg09624f>;
    "set_mint_claim_origin": Anonymize<Idhlknhp7vndhp>;
    "set_move_claim_origin": Anonymize<Idhlknhp7vndhp>;
}>;
export type I6uag8j5aql8q = {
    "dest": SS58String;
    "ethereum_signature": FixedSizeBinary<65>;
};
export type I54a6pqb8nsfv0 = {
    "who": FixedSizeBinary<20>;
    "value": bigint;
    "vesting_schedule"?: (Anonymize<Idflv32oq2s29f>) | undefined;
    "statement"?: (ClaimsStatementKind) | undefined;
};
export type I1dqiovk0tpoah = {
    "dest": SS58String;
    "ethereum_signature": FixedSizeBinary<65>;
    "statement": Binary;
};
export type I1ntko0oih7v1a = {
    "statement": Binary;
};
export type I2tf5qmg09624f = {
    "old": FixedSizeBinary<20>;
    "new": FixedSizeBinary<20>;
    "maybe_preclaim"?: Anonymize<Ihfphjolmsqq1>;
};
export type Idhlknhp7vndhp = {
    "new": SS58String;
};
export type Ibd2vdhiqqoobu = AnonymousEnum<{
    /**
     * Sets the session key(s) of the function caller to `keys`.
     * Allows an account to set its session key prior to becoming a validator.
     * This doesn't take effect until the next session.
     *
     * The dispatch origin of this function must be signed.
     *
     * ## Complexity
     * - `O(1)`. Actual cost depends on the number of length of `T::Keys::key_ids()` which is
     * fixed.
     */
    "set_keys": Anonymize<I52551i13hrevr>;
    /**
     * Removes any session key(s) of the function caller.
     *
     * This doesn't take effect until the next session.
     *
     * The dispatch origin of this function must be Signed and the account must be either be
     * convertible to a validator ID using the chain's typical addressing system (this usually
     * means being a controller account) or directly convertible into a validator ID (which
     * usually means being a stash account).
     *
     * ## Complexity
     * - `O(1)` in number of key types. Actual cost depends on the number of length of
     * `T::Keys::key_ids()` which is fixed.
     */
    "purge_keys": undefined;
}>;
export type I52551i13hrevr = {
    "keys": Anonymize<I137grj3cf9c1v>;
    "proof": Binary;
};
export type I6v9j95kvocn9v = AnonymousEnum<{
    /**
     * Report voter equivocation/misbehavior. This method will verify the
     * equivocation proof and validate the given key ownership proof
     * against the extracted offender. If both are valid, the offence
     * will be reported.
     */
    "report_equivocation": Anonymize<Ibmti75jifitr0>;
    /**
     * Report voter equivocation/misbehavior. This method will verify the
     * equivocation proof and validate the given key ownership proof
     * against the extracted offender. If both are valid, the offence
     * will be reported.
     *
     * This extrinsic must be called unsigned and it is expected that only
     * block authors will call it (validated in `ValidateUnsigned`), as such
     * if the block author is defined it will be defined as the equivocation
     * reporter.
     */
    "report_equivocation_unsigned": Anonymize<Ibmti75jifitr0>;
    /**
     * Note that the current authority set of the GRANDPA finality gadget has stalled.
     *
     * This will trigger a forced authority set change at the beginning of the next session, to
     * be enacted `delay` blocks after that. The `delay` should be high enough to safely assume
     * that the block signalling the forced change will not be re-orged e.g. 1000 blocks.
     * The block production rate (which may be slowed down because of finality lagging) should
     * be taken into account when choosing the `delay`. The GRANDPA voters based on the new
     * authority will start voting on top of `best_finalized_block_number` for new finalized
     * blocks. `best_finalized_block_number` should be the highest of the latest finalized
     * block of all validators of the new authority set.
     *
     * Only callable by root.
     */
    "note_stalled": Anonymize<Ichu6a94bm67kd>;
}>;
export type Ibmti75jifitr0 = {
    "equivocation_proof": Anonymize<Ifh2vvcsf9090p>;
};
export type Ifh2vvcsf9090p = {
    "set_id": bigint;
    "equivocation": Enum<{
        "Prevote": {
            "round_number": bigint;
            "identity": FixedSizeBinary<32>;
            "first": [{
                "target_hash": FixedSizeBinary<32>;
                "target_number": bigint;
            }, FixedSizeBinary<64>];
            "second": [{
                "target_hash": FixedSizeBinary<32>;
                "target_number": bigint;
            }, FixedSizeBinary<64>];
        };
        "Precommit": {
            "round_number": bigint;
            "identity": FixedSizeBinary<32>;
            "first": [{
                "target_hash": FixedSizeBinary<32>;
                "target_number": bigint;
            }, FixedSizeBinary<64>];
            "second": [{
                "target_hash": FixedSizeBinary<32>;
                "target_number": bigint;
            }, FixedSizeBinary<64>];
        };
    }>;
};
export type Ichu6a94bm67kd = {
    "delay": bigint;
    "best_finalized_block_number": bigint;
};
export type Ibu7tkacvbngph = AnonymousEnum<{
    /**
     * Set new session length.
     *
     * Origin must be root.
     */
    "set_session_length": Anonymize<Imsf4ordm6qea>;
}>;
export type Imsf4ordm6qea = {
    "session_len": bigint;
};
export type I9m9ocf4hcmi0g = AnonymousEnum<{
    /**
     * Call when anchor verification completes
     */
    "note_anchor_verified": Anonymize<Ibft7pgbru2gi2>;
    "set_relayer": Anonymize<Ibseqhnve5i1n3>;
}>;
export type Ibseqhnve5i1n3 = {
    "new_relayer": SS58String;
};
export type Icm294co91mkfj = AnonymousEnum<{
    /**
     * Take the origin account as a stash and lock up `value` of its balance. `controller` will
     * be the account that controls it.
     *
     * `value` must be more than the `minimum_balance` specified by `T::Currency`.
     *
     * The dispatch origin for this call must be _Signed_ by the stash account.
     *
     * Emits `Bonded`.
     * ## Complexity
     * - Independent of the arguments. Moderate complexity.
     * - O(1).
     * - Three extra DB entries.
     *
     * NOTE: Two of the storage writes (`Self::bonded`, `Self::payee`) are _never_ cleaned
     * unless the `origin` falls below _existential deposit_ (or equal to 0) and gets removed
     * as dust.
     */
    "bond": Anonymize<I2eip8tc75dpje>;
    /**
     * Add some extra amount that have appeared in the stash `free_balance` into the balance up
     * for staking.
     *
     * The dispatch origin for this call must be _Signed_ by the stash, not the controller.
     *
     * Use this if there are additional funds in your stash account that you wish to bond.
     * Unlike [`bond`](Self::bond) or [`unbond`](Self::unbond) this function does not impose
     * any limitation on the amount that can be added.
     *
     * Emits `Bonded`.
     *
     * ## Complexity
     * - Independent of the arguments. Insignificant complexity.
     * - O(1).
     */
    "bond_extra": Anonymize<I564va64vtidbq>;
    /**
     * Schedule a portion of the stash to be unlocked ready for transfer out after the bond
     * period ends. If this leaves an amount actively bonded less than
     * [`asset::existential_deposit`], then it is increased to the full amount.
     *
     * The stash may be chilled if the ledger total amount falls to 0 after unbonding.
     *
     * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
     *
     * Once the unlock period is done, you can call `withdraw_unbonded` to actually move
     * the funds out of management ready for transfer.
     *
     * No more than a limited number of unlocking chunks (see `MaxUnlockingChunks`)
     * can co-exists at the same time. If there are no unlocking chunks slots available
     * [`Call::withdraw_unbonded`] is called to remove some of the chunks (if possible).
     *
     * If a user encounters the `InsufficientBond` error when calling this extrinsic,
     * they should call `chill` first in order to free up their bonded funds.
     *
     * Emits `Unbonded`.
     *
     * See also [`Call::withdraw_unbonded`].
     */
    "unbond": Anonymize<Ie5v6njpckr05b>;
    /**
     * Remove any unlocked chunks from the `unlocking` queue from our management.
     *
     * This essentially frees up that balance to be used by the stash account to do whatever
     * it wants.
     *
     * The dispatch origin for this call must be _Signed_ by the controller.
     *
     * Emits `Withdrawn`.
     *
     * See also [`Call::unbond`].
     *
     * ## Parameters
     *
     * - `num_slashing_spans` indicates the number of metadata slashing spans to clear when
     * this call results in a complete removal of all the data related to the stash account.
     * In this case, the `num_slashing_spans` must be larger or equal to the number of
     * slashing spans associated with the stash account in the [`SlashingSpans`] storage type,
     * otherwise the call will fail. The call weight is directly proportional to
     * `num_slashing_spans`.
     *
     * ## Complexity
     * O(S) where S is the number of slashing spans to remove
     * NOTE: Weight annotation is the kill scenario, we refund otherwise.
     */
    "withdraw_unbonded": Anonymize<I328av3j0bgmjb>;
    /**
     * Declare the desire to validate for the origin controller.
     *
     * Effects will be felt at the beginning of the next era.
     *
     * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
     */
    "validate": Anonymize<I4tuqm9ato907i>;
    /**
     * Declare the desire to nominate `targets` for the origin controller.
     *
     * Effects will be felt at the beginning of the next era.
     *
     * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
     *
     * ## Complexity
     * - The transaction's complexity is proportional to the size of `targets` (N)
     * which is capped at CompactAssignments::LIMIT (T::MaxNominations).
     * - Both the reads and writes follow a similar pattern.
     */
    "nominate": Anonymize<Iagi89qt4h1lqg>;
    /**
     * Declare no desire to either validate or nominate.
     *
     * Effects will be felt at the beginning of the next era.
     *
     * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
     *
     * ## Complexity
     * - Independent of the arguments. Insignificant complexity.
     * - Contains one read.
     * - Writes are limited to the `origin` account key.
     */
    "chill": undefined;
    /**
     * (Re-)set the payment target for a controller.
     *
     * Effects will be felt instantly (as soon as this function is completed successfully).
     *
     * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
     *
     * ## Complexity
     * - O(1)
     * - Independent of the arguments. Insignificant complexity.
     * - Contains a limited number of reads.
     * - Writes are limited to the `origin` account key.
     * ---------
     */
    "set_payee": Anonymize<I9dgmcnuamt5p8>;
    /**
     * (Re-)sets the controller of a stash to the stash itself. This function previously
     * accepted a `controller` argument to set the controller to an account other than the
     * stash itself. This functionality has now been removed, now only setting the controller
     * to the stash, if it is not already.
     *
     * Effects will be felt instantly (as soon as this function is completed successfully).
     *
     * The dispatch origin for this call must be _Signed_ by the stash, not the controller.
     *
     * ## Complexity
     * O(1)
     * - Independent of the arguments. Insignificant complexity.
     * - Contains a limited number of reads.
     * - Writes are limited to the `origin` account key.
     */
    "set_controller": undefined;
    /**
     * Sets the ideal number of validators.
     *
     * The dispatch origin must be Root.
     *
     * ## Complexity
     * O(1)
     */
    "set_validator_count": Anonymize<I3vh014cqgmrfd>;
    /**
     * Increments the ideal number of validators up to maximum of
     * `ElectionProviderBase::MaxWinners`.
     *
     * The dispatch origin must be Root.
     *
     * ## Complexity
     * Same as [`Self::set_validator_count`].
     */
    "increase_validator_count": Anonymize<Ifhs60omlhvt3>;
    /**
     * Scale up the ideal number of validators by a factor up to maximum of
     * `ElectionProviderBase::MaxWinners`.
     *
     * The dispatch origin must be Root.
     *
     * ## Complexity
     * Same as [`Self::set_validator_count`].
     */
    "scale_validator_count": Anonymize<If34udpd5e57vi>;
    /**
     * Force there to be no new eras indefinitely.
     *
     * The dispatch origin must be Root.
     *
     * # Warning
     *
     * The election process starts multiple blocks before the end of the era.
     * Thus the election process may be ongoing when this is called. In this case the
     * election will continue until the next era is triggered.
     *
     * ## Complexity
     * - No arguments.
     * - Weight: O(1)
     */
    "force_no_eras": undefined;
    /**
     * Force there to be a new era at the end of the next session. After this, it will be
     * reset to normal (non-forced) behaviour.
     *
     * The dispatch origin must be Root.
     *
     * # Warning
     *
     * The election process starts multiple blocks before the end of the era.
     * If this is called just before a new era is triggered, the election process may not
     * have enough blocks to get a result.
     *
     * ## Complexity
     * - No arguments.
     * - Weight: O(1)
     */
    "force_new_era": undefined;
    /**
     * Set the validators who cannot be slashed (if any).
     *
     * The dispatch origin must be Root.
     */
    "set_invulnerables": Anonymize<I39t01nnod9109>;
    /**
     * Force a current staker to become completely unstaked, immediately.
     *
     * The dispatch origin must be Root.
     *
     * ## Parameters
     *
     * - `num_slashing_spans`: Refer to comments on [`Call::withdraw_unbonded`] for more
     * details.
     */
    "force_unstake": Anonymize<Ie5vbnd9198quk>;
    /**
     * Force there to be a new era at the end of sessions indefinitely.
     *
     * The dispatch origin must be Root.
     *
     * # Warning
     *
     * The election process starts multiple blocks before the end of the era.
     * If this is called just before a new era is triggered, the election process may not
     * have enough blocks to get a result.
     */
    "force_new_era_always": undefined;
    /**
     * Cancel enactment of a deferred slash.
     *
     * Can be called by the `T::AdminOrigin`.
     *
     * Parameters: era and indices of the slashes for that era to kill.
     * They **must** be sorted in ascending order, *and* unique.
     */
    "cancel_deferred_slash": Anonymize<I3h6murn8bd4v5>;
    /**
     * Pay out next page of the stakers behind a validator for the given era.
     *
     * - `validator_stash` is the stash account of the validator.
     * - `era` may be any era between `[current_era - history_depth; current_era]`.
     *
     * The origin of this call must be _Signed_. Any account can call this function, even if
     * it is not one of the stakers.
     *
     * The reward payout could be paged in case there are too many nominators backing the
     * `validator_stash`. This call will payout unpaid pages in an ascending order. To claim a
     * specific page, use `payout_stakers_by_page`.`
     *
     * If all pages are claimed, it returns an error `InvalidPage`.
     */
    "payout_stakers": Anonymize<I6k6jf8ncesuu3>;
    /**
     * Rebond a portion of the stash scheduled to be unlocked.
     *
     * The dispatch origin must be signed by the controller.
     *
     * ## Complexity
     * - Time complexity: O(L), where L is unlocking chunks
     * - Bounded by `MaxUnlockingChunks`.
     */
    "rebond": Anonymize<Ie5v6njpckr05b>;
    /**
     * Remove all data structures concerning a staker/stash once it is at a state where it can
     * be considered `dust` in the staking system. The requirements are:
     *
     * 1. the `total_balance` of the stash is below existential deposit.
     * 2. or, the `ledger.total` of the stash is below existential deposit.
     * 3. or, existential deposit is zero and either `total_balance` or `ledger.total` is zero.
     *
     * The former can happen in cases like a slash; the latter when a fully unbonded account
     * is still receiving staking rewards in `RewardDestination::Staked`.
     *
     * It can be called by anyone, as long as `stash` meets the above requirements.
     *
     * Refunds the transaction fees upon successful execution.
     *
     * ## Parameters
     *
     * - `num_slashing_spans`: Refer to comments on [`Call::withdraw_unbonded`] for more
     * details.
     */
    "reap_stash": Anonymize<Ie5vbnd9198quk>;
    /**
     * Remove the given nominations from the calling validator.
     *
     * Effects will be felt at the beginning of the next era.
     *
     * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
     *
     * - `who`: A list of nominator stash accounts who are nominating this validator which
     * should no longer be nominating this validator.
     *
     * Note: Making this call only makes sense if you first set the validator preferences to
     * block any further nominations.
     */
    "kick": Anonymize<I3qhk481i120pk>;
    /**
     * Update the various staking configurations .
     *
     * * `min_nominator_bond`: The minimum active bond needed to be a nominator.
     * * `min_validator_bond`: The minimum active bond needed to be a validator.
     * * `max_nominator_count`: The max number of users who can be a nominator at once. When
     * set to `None`, no limit is enforced.
     * * `max_validator_count`: The max number of users who can be a validator at once. When
     * set to `None`, no limit is enforced.
     * * `chill_threshold`: The ratio of `max_nominator_count` or `max_validator_count` which
     * should be filled in order for the `chill_other` transaction to work.
     * * `min_commission`: The minimum amount of commission that each validators must maintain.
     * This is checked only upon calling `validate`. Existing validators are not affected.
     *
     * RuntimeOrigin must be Root to call this function.
     *
     * NOTE: Existing nominators and validators will not be affected by this update.
     * to kick people under the new limits, `chill_other` should be called.
     */
    "set_staking_configs": Anonymize<If1qr0kbbl298c>;
    /**
     * Declare a `controller` to stop participating as either a validator or nominator.
     *
     * Effects will be felt at the beginning of the next era.
     *
     * The dispatch origin for this call must be _Signed_, but can be called by anyone.
     *
     * If the caller is the same as the controller being targeted, then no further checks are
     * enforced, and this function behaves just like `chill`.
     *
     * If the caller is different than the controller being targeted, the following conditions
     * must be met:
     *
     * * `controller` must belong to a nominator who has become non-decodable,
     *
     * Or:
     *
     * * A `ChillThreshold` must be set and checked which defines how close to the max
     * nominators or validators we must reach before users can start chilling one-another.
     * * A `MaxNominatorCount` and `MaxValidatorCount` must be set which is used to determine
     * how close we are to the threshold.
     * * A `MinNominatorBond` and `MinValidatorBond` must be set and checked, which determines
     * if this is a person that should be chilled because they have not met the threshold
     * bond required.
     *
     * This can be helpful if bond requirements are updated, and we need to remove old users
     * who do not satisfy these requirements.
     */
    "chill_other": Anonymize<Idl3umm12u5pa>;
    /**
     * Force a validator to have at least the minimum commission. This will not affect a
     * validator who already has a commission greater than or equal to the minimum. Any account
     * can call this.
     */
    "force_apply_min_commission": Anonymize<I5ont0141q9ss5>;
    /**
     * Sets the minimum amount of commission that each validators must maintain.
     *
     * This call has lower privilege requirements than `set_staking_config` and can be called
     * by the `T::AdminOrigin`. Root can always call this.
     */
    "set_min_commission": Anonymize<I3vh014cqgmrfd>;
    /**
     * Pay out a page of the stakers behind a validator for the given era and page.
     *
     * - `validator_stash` is the stash account of the validator.
     * - `era` may be any era between `[current_era - history_depth; current_era]`.
     * - `page` is the page index of nominators to pay out with value between 0 and
     * `num_nominators / T::MaxExposurePageSize`.
     *
     * The origin of this call must be _Signed_. Any account can call this function, even if
     * it is not one of the stakers.
     *
     * If a validator has more than [`Config::MaxExposurePageSize`] nominators backing
     * them, then the list of nominators is paged, with each page being capped at
     * [`Config::MaxExposurePageSize`.] If a validator has more than one page of nominators,
     * the call needs to be made for each page separately in order for all the nominators
     * backing a validator to receive the reward. The nominators are not sorted across pages
     * and so it should not be assumed the highest staker would be on the topmost page and vice
     * versa. If rewards are not claimed in [`Config::HistoryDepth`] eras, they are lost.
     */
    "payout_stakers_by_page": Anonymize<Ie6j49utvii126>;
    /**
     * Migrates an account's `RewardDestination::Controller` to
     * `RewardDestination::Account(controller)`.
     *
     * Effects will be felt instantly (as soon as this function is completed successfully).
     *
     * This will waive the transaction fee if the `payee` is successfully migrated.
     */
    "update_payee": Anonymize<I3v6ks33uluhnj>;
    /**
     * Updates a batch of controller accounts to their corresponding stash account if they are
     * not the same. Ignores any controller accounts that do not exist, and does not operate if
     * the stash and controller are already the same.
     *
     * Effects will be felt instantly (as soon as this function is completed successfully).
     *
     * The dispatch origin must be `T::AdminOrigin`.
     */
    "deprecate_controller_batch": Anonymize<I3kiiim1cds68i>;
    /**
     * Restores the state of a ledger which is in an inconsistent state.
     *
     * The requirements to restore a ledger are the following:
     * * The stash is bonded; or
     * * The stash is not bonded but it has a staking lock left behind; or
     * * If the stash has an associated ledger and its state is inconsistent; or
     * * If the ledger is not corrupted *but* its staking lock is out of sync.
     *
     * The `maybe_*` input parameters will overwrite the corresponding data and metadata of the
     * ledger associated with the stash. If the input parameters are not set, the ledger will
     * be reset values from on-chain state.
     */
    "restore_ledger": Anonymize<I4k60mkh2r6jjg>;
    /**
     * Removes the legacy Staking locks if they exist.
     *
     * This removes the legacy lock on the stake with [`Config::OldCurrency`] and creates a
     * hold on it if needed. If all stake cannot be held, the best effort is made to hold as
     * much as possible. The remaining stake is forced withdrawn from the ledger.
     *
     * The fee is waived if the migration is successful.
     */
    "migrate_currency": Anonymize<Idl3umm12u5pa>;
    /**
     * This function allows governance to manually slash a validator and is a
     * **fallback mechanism**.
     *
     * The dispatch origin must be `T::AdminOrigin`.
     *
     * ## Parameters
     * - `validator_stash` - The stash account of the validator to slash.
     * - `era` - The era in which the validator was in the active set.
     * - `slash_fraction` - The percentage of the stake to slash, expressed as a Perbill.
     *
     * ## Behavior
     *
     * The slash will be applied using the standard slashing mechanics, respecting the
     * configured `SlashDeferDuration`.
     *
     * This means:
     * - If the validator was already slashed by a higher percentage for the same era, this
     * slash will have no additional effect.
     * - If the validator was previously slashed by a lower percentage, only the difference
     * will be applied.
     * - The slash will be deferred by `SlashDeferDuration` eras before being enacted.
     */
    "manual_slash": Anonymize<Ic5njrpnvi3f8g>;
}>;
export type I2eip8tc75dpje = {
    "value": bigint;
    "payee": StakingRewardDestination;
};
export type I564va64vtidbq = {
    "max_additional": bigint;
};
export type Ie5v6njpckr05b = {
    "value": bigint;
};
export type I328av3j0bgmjb = {
    "num_slashing_spans": number;
};
export type I4tuqm9ato907i = {
    "prefs": Anonymize<I9o7ssi9vmhmgr>;
};
export type Iagi89qt4h1lqg = {
    "targets": Anonymize<I28gn91b2ttnbk>;
};
export type I28gn91b2ttnbk = Array<MultiAddress>;
export type I9dgmcnuamt5p8 = {
    "payee": StakingRewardDestination;
};
export type I3vh014cqgmrfd = {
    "new": number;
};
export type Ifhs60omlhvt3 = {
    "additional": number;
};
export type If34udpd5e57vi = {
    "factor": number;
};
export type I39t01nnod9109 = {
    "invulnerables": Anonymize<Ia2lhg7l2hilo3>;
};
export type Ie5vbnd9198quk = {
    "stash": SS58String;
    "num_slashing_spans": number;
};
export type I3h6murn8bd4v5 = {
    "era": number;
    "slash_indices": Anonymize<Icgljjb6j82uhn>;
};
export type I6k6jf8ncesuu3 = {
    "validator_stash": SS58String;
    "era": number;
};
export type I3qhk481i120pk = {
    "who": Anonymize<I28gn91b2ttnbk>;
};
export type If1qr0kbbl298c = {
    "min_nominator_bond": StakingPalletConfigOpBig;
    "min_validator_bond": StakingPalletConfigOpBig;
    "max_nominator_count": StakingPalletConfigOp;
    "max_validator_count": StakingPalletConfigOp;
    "chill_threshold": StakingPalletConfigOp;
    "min_commission": StakingPalletConfigOp;
    "max_staked_rewards": StakingPalletConfigOp;
};
export type StakingPalletConfigOpBig = Enum<{
    "Noop": undefined;
    "Set": bigint;
    "Remove": undefined;
}>;
export declare const StakingPalletConfigOpBig: GetEnum<StakingPalletConfigOpBig>;
export type StakingPalletConfigOp = Enum<{
    "Noop": undefined;
    "Set": number;
    "Remove": undefined;
}>;
export declare const StakingPalletConfigOp: GetEnum<StakingPalletConfigOp>;
export type I5ont0141q9ss5 = {
    "validator_stash": SS58String;
};
export type Ie6j49utvii126 = {
    "validator_stash": SS58String;
    "era": number;
    "page": number;
};
export type I3v6ks33uluhnj = {
    "controller": SS58String;
};
export type I3kiiim1cds68i = {
    "controllers": Anonymize<Ia2lhg7l2hilo3>;
};
export type I4k60mkh2r6jjg = {
    "stash": SS58String;
    "maybe_controller"?: Anonymize<Ihfphjolmsqq1>;
    "maybe_total"?: Anonymize<I35p85j063s0il>;
    "maybe_unlocking"?: (Anonymize<I9nc4v1upo2c8e>) | undefined;
};
export type Ic5njrpnvi3f8g = {
    "validator_stash": SS58String;
    "era": number;
    "slash_fraction": number;
};
export type Ib915m284nsdtp = AnonymousEnum<{
    /**
     * Authenticates the sudo key and dispatches a function call with `Root` origin.
     */
    "sudo": Anonymize<I5olhh6bc9dcp6>;
    /**
     * Authenticates the sudo key and dispatches a function call with `Root` origin.
     * This function does not check the weight of the call, and instead allows the
     * Sudo user to specify the weight of the call.
     *
     * The dispatch origin for this call must be _Signed_.
     */
    "sudo_unchecked_weight": Anonymize<Idvlr5eokt20kr>;
    /**
     * Authenticates the current sudo key and sets the given AccountId (`new`) as the new sudo
     * key.
     */
    "set_key": Anonymize<I8k3rnvpeeh4hv>;
    /**
     * Authenticates the sudo key and dispatches a function call with `Signed` origin from
     * a given account.
     *
     * The dispatch origin for this call must be _Signed_.
     */
    "sudo_as": Anonymize<I8pa56fhgq0tog>;
    /**
     * Permanently removes the sudo key.
     *
     * **This cannot be un-done.**
     */
    "remove_key": undefined;
}>;
export type I5olhh6bc9dcp6 = {
    "call": TxCallData;
};
export type I8k3rnvpeeh4hv = {
    "new": MultiAddress;
};
export type I8pa56fhgq0tog = {
    "who": MultiAddress;
    "call": TxCallData;
};
export type I6a4mba5e4puc6 = AnonymousEnum<{
    /**
     * A raw EVM transaction, typically dispatched by an Ethereum JSON-RPC server.
     *
     * # Parameters
     *
     * * `payload`: The encoded [`crate::evm::TransactionSigned`].
     * * `gas_limit`: The gas limit enforced during contract execution.
     * * `storage_deposit_limit`: The maximum balance that can be charged to the caller for
     * storage usage.
     *
     * # Note
     *
     * This call cannot be dispatched directly; attempting to do so will result in a failed
     * transaction. It serves as a wrapper for an Ethereum transaction. When submitted, the
     * runtime converts it into a [`sp_runtime::generic::CheckedExtrinsic`] by recovering the
     * signer and validating the transaction.
     */
    "eth_transact": Anonymize<Ida37oe44osb06>;
    /**
     * Makes a call to an account, optionally transferring some balance.
     *
     * # Parameters
     *
     * * `dest`: Address of the contract to call.
     * * `value`: The balance to transfer from the `origin` to `dest`.
     * * `gas_limit`: The gas limit enforced when executing the constructor.
     * * `storage_deposit_limit`: The maximum amount of balance that can be charged from the
     * caller to pay for the storage consumed.
     * * `data`: The input data to pass to the contract.
     *
     * * If the account is a smart-contract account, the associated code will be
     * executed and any value will be transferred.
     * * If the account is a regular account, any value will be transferred.
     * * If no account exists and the call value is not less than `existential_deposit`,
     * a regular account will be created and any value will be transferred.
     */
    "call": Anonymize<Idsg8aod8e8fqn>;
    /**
     * Instantiates a contract from a previously deployed vm binary.
     *
     * This function is identical to [`Self::instantiate_with_code`] but without the
     * code deployment step. Instead, the `code_hash` of an on-chain deployed vm binary
     * must be supplied.
     */
    "instantiate": Anonymize<I46nktn22m6hbi>;
    /**
     * Instantiates a new contract from the supplied `code` optionally transferring
     * some balance.
     *
     * This dispatchable has the same effect as calling [`Self::upload_code`] +
     * [`Self::instantiate`]. Bundling them together provides efficiency gains. Please
     * also check the documentation of [`Self::upload_code`].
     *
     * # Parameters
     *
     * * `value`: The balance to transfer from the `origin` to the newly created contract.
     * * `gas_limit`: The gas limit enforced when executing the constructor.
     * * `storage_deposit_limit`: The maximum amount of balance that can be charged/reserved
     * from the caller to pay for the storage consumed.
     * * `code`: The contract code to deploy in raw bytes.
     * * `data`: The input data to pass to the contract constructor.
     * * `salt`: Used for the address derivation. If `Some` is supplied then `CREATE2`
     * semantics are used. If `None` then `CRATE1` is used.
     *
     *
     * Instantiation is executed as follows:
     *
     * - The supplied `code` is deployed, and a `code_hash` is created for that code.
     * - If the `code_hash` already exists on the chain the underlying `code` will be shared.
     * - The destination address is computed based on the sender, code_hash and the salt.
     * - The smart-contract account is created at the computed address.
     * - The `value` is transferred to the new account.
     * - The `deploy` function is executed in the context of the newly-created account.
     */
    "instantiate_with_code": Anonymize<Ibgj1cthra7lte>;
    /**
     * Same as [`Self::instantiate_with_code`], but intended to be dispatched **only**
     * by an EVM transaction through the EVM compatibility layer.
     *
     * Calling this dispatchable ensures that the origin's nonce is bumped only once,
     * via the `CheckNonce` transaction extension. In contrast, [`Self::instantiate_with_code`]
     * also bumps the nonce after contract instantiation, since it may be invoked multiple
     * times within a batch call transaction.
     */
    "eth_instantiate_with_code": Anonymize<I7kuv3rqu2fb7t>;
    /**
     * Same as [`Self::call`], but intended to be dispatched **only**
     * by an EVM transaction through the EVM compatibility layer.
     */
    "eth_call": Anonymize<Ic3bd1cop3eccm>;
    /**
     * Upload new `code` without instantiating a contract from it.
     *
     * If the code does not already exist a deposit is reserved from the caller
     * The size of the reserve depends on the size of the supplied `code`.
     *
     * # Note
     *
     * Anyone can instantiate a contract from any uploaded code and thus prevent its removal.
     * To avoid this situation a constructor could employ access control so that it can
     * only be instantiated by permissioned entities. The same is true when uploading
     * through [`Self::instantiate_with_code`].
     *
     * If the refcount of the code reaches zero after terminating the last contract that
     * references this code, the code will be removed automatically.
     */
    "upload_code": Anonymize<I10ra4g1rl6k2f>;
    /**
     * Remove the code stored under `code_hash` and refund the deposit to its owner.
     *
     * A code can only be removed by its original uploader (its owner) and only if it is
     * not used by any contract.
     */
    "remove_code": Anonymize<Ib51vk42m1po4n>;
    /**
     * Privileged function that changes the code of an existing contract.
     *
     * This takes care of updating refcounts and all other necessary operations. Returns
     * an error if either the `code_hash` or `dest` do not exist.
     *
     * # Note
     *
     * This does **not** change the address of the contract in question. This means
     * that the contract address is no longer derived from its code hash after calling
     * this dispatchable.
     */
    "set_code": Anonymize<I1uihehkdsggvp>;
    /**
     * Register the callers account id so that it can be used in contract interactions.
     *
     * This will error if the origin is already mapped or is a eth native `Address20`. It will
     * take a deposit that can be released by calling [`Self::unmap_account`].
     */
    "map_account": undefined;
    /**
     * Unregister the callers account id in order to free the deposit.
     *
     * There is no reason to ever call this function other than freeing up the deposit.
     * This is only useful when the account should no longer be used.
     */
    "unmap_account": undefined;
    /**
     * Dispatch an `call` with the origin set to the callers fallback address.
     *
     * Every `AccountId32` can control its corresponding fallback account. The fallback account
     * is the `AccountId20` with the last 12 bytes set to `0xEE`. This is essentially a
     * recovery function in case an `AccountId20` was used without creating a mapping first.
     */
    "dispatch_as_fallback_account": Anonymize<I5olhh6bc9dcp6>;
}>;
export type Ida37oe44osb06 = {
    "payload": Binary;
};
export type Idsg8aod8e8fqn = {
    "dest": FixedSizeBinary<20>;
    "value": bigint;
    "gas_limit": Anonymize<I4q39t5hn830vp>;
    "storage_deposit_limit": bigint;
    "data": Binary;
};
export type I46nktn22m6hbi = {
    "value": bigint;
    "gas_limit": Anonymize<I4q39t5hn830vp>;
    "storage_deposit_limit": bigint;
    "code_hash": FixedSizeBinary<32>;
    "data": Binary;
    "salt"?: Anonymize<I4s6vifaf8k998>;
};
export type I4s6vifaf8k998 = (FixedSizeBinary<32>) | undefined;
export type Ibgj1cthra7lte = {
    "value": bigint;
    "gas_limit": Anonymize<I4q39t5hn830vp>;
    "storage_deposit_limit": bigint;
    "code": Binary;
    "data": Binary;
    "salt"?: Anonymize<I4s6vifaf8k998>;
};
export type I7kuv3rqu2fb7t = {
    "value": Anonymize<I4totqt881mlti>;
    "gas_limit": Anonymize<I4q39t5hn830vp>;
    "storage_deposit_limit": bigint;
    "code": Binary;
    "data": Binary;
};
export type I4totqt881mlti = FixedSizeArray<4, bigint>;
export type Ic3bd1cop3eccm = {
    "dest": FixedSizeBinary<20>;
    "value": Anonymize<I4totqt881mlti>;
    "gas_limit": Anonymize<I4q39t5hn830vp>;
    "storage_deposit_limit": bigint;
    "data": Binary;
};
export type I10ra4g1rl6k2f = {
    "code": Binary;
    "storage_deposit_limit": bigint;
};
export type I1uihehkdsggvp = {
    "dest": FixedSizeBinary<20>;
    "code_hash": FixedSizeBinary<32>;
};
export type I84851acvod2ic = AnonymousEnum<{
    /**
     * Issue a new class of fungible assets from a public origin.
     *
     * This new asset class has no assets initially and its owner is the origin.
     *
     * The origin must conform to the configured `CreateOrigin` and have sufficient funds free.
     *
     * Funds of sender are reserved by `AssetDeposit`.
     *
     * Parameters:
     * - `id`: The identifier of the new asset. This must not be currently in use to identify
     * an existing asset. If [`NextAssetId`] is set, then this must be equal to it.
     * - `admin`: The admin of this class of assets. The admin is the initial address of each
     * member of the asset class's admin team.
     * - `min_balance`: The minimum balance of this new asset that any single account must
     * have. If an account's balance is reduced below this, then it collapses to zero.
     *
     * Emits `Created` event when successful.
     *
     * Weight: `O(1)`
     */
    "create": Anonymize<Ic357tcepuvo5c>;
    /**
     * Issue a new class of fungible assets from a privileged origin.
     *
     * This new asset class has no assets initially.
     *
     * The origin must conform to `ForceOrigin`.
     *
     * Unlike `create`, no funds are reserved.
     *
     * - `id`: The identifier of the new asset. This must not be currently in use to identify
     * an existing asset. If [`NextAssetId`] is set, then this must be equal to it.
     * - `owner`: The owner of this class of assets. The owner has full superuser permissions
     * over this asset, but may later change and configure the permissions using
     * `transfer_ownership` and `set_team`.
     * - `min_balance`: The minimum balance of this new asset that any single account must
     * have. If an account's balance is reduced below this, then it collapses to zero.
     *
     * Emits `ForceCreated` event when successful.
     *
     * Weight: `O(1)`
     */
    "force_create": Anonymize<I2rnoam876ruhj>;
    /**
     * Start the process of destroying a fungible asset class.
     *
     * `start_destroy` is the first in a series of extrinsics that should be called, to allow
     * destruction of an asset class.
     *
     * The origin must conform to `ForceOrigin` or must be `Signed` by the asset's `owner`.
     *
     * - `id`: The identifier of the asset to be destroyed. This must identify an existing
     * asset.
     *
     * It will fail with either [`Error::ContainsHolds`] or [`Error::ContainsFreezes`] if
     * an account contains holds or freezes in place.
     */
    "start_destroy": Anonymize<Ic5b47dj4coa3r>;
    /**
     * Destroy all accounts associated with a given asset.
     *
     * `destroy_accounts` should only be called after `start_destroy` has been called, and the
     * asset is in a `Destroying` state.
     *
     * Due to weight restrictions, this function may need to be called multiple times to fully
     * destroy all accounts. It will destroy `RemoveItemsLimit` accounts at a time.
     *
     * - `id`: The identifier of the asset to be destroyed. This must identify an existing
     * asset.
     *
     * Each call emits the `Event::DestroyedAccounts` event.
     */
    "destroy_accounts": Anonymize<Ic5b47dj4coa3r>;
    /**
     * Destroy all approvals associated with a given asset up to the max (T::RemoveItemsLimit).
     *
     * `destroy_approvals` should only be called after `start_destroy` has been called, and the
     * asset is in a `Destroying` state.
     *
     * Due to weight restrictions, this function may need to be called multiple times to fully
     * destroy all approvals. It will destroy `RemoveItemsLimit` approvals at a time.
     *
     * - `id`: The identifier of the asset to be destroyed. This must identify an existing
     * asset.
     *
     * Each call emits the `Event::DestroyedApprovals` event.
     */
    "destroy_approvals": Anonymize<Ic5b47dj4coa3r>;
    /**
     * Complete destroying asset and unreserve currency.
     *
     * `finish_destroy` should only be called after `start_destroy` has been called, and the
     * asset is in a `Destroying` state. All accounts or approvals should be destroyed before
     * hand.
     *
     * - `id`: The identifier of the asset to be destroyed. This must identify an existing
     * asset.
     *
     * Each successful call emits the `Event::Destroyed` event.
     */
    "finish_destroy": Anonymize<Ic5b47dj4coa3r>;
    /**
     * Mint assets of a particular class.
     *
     * The origin must be Signed and the sender must be the Issuer of the asset `id`.
     *
     * - `id`: The identifier of the asset to have some amount minted.
     * - `beneficiary`: The account to be credited with the minted assets.
     * - `amount`: The amount of the asset to be minted.
     *
     * Emits `Issued` event when successful.
     *
     * Weight: `O(1)`
     * Modes: Pre-existing balance of `beneficiary`; Account pre-existence of `beneficiary`.
     */
    "mint": Anonymize<Ib3qnc19gu633c>;
    /**
     * Reduce the balance of `who` by as much as possible up to `amount` assets of `id`.
     *
     * Origin must be Signed and the sender should be the Manager of the asset `id`.
     *
     * Bails with `NoAccount` if the `who` is already dead.
     *
     * - `id`: The identifier of the asset to have some amount burned.
     * - `who`: The account to be debited from.
     * - `amount`: The maximum amount by which `who`'s balance should be reduced.
     *
     * Emits `Burned` with the actual amount burned. If this takes the balance to below the
     * minimum for the asset, then the amount burned is increased to take it to zero.
     *
     * Weight: `O(1)`
     * Modes: Post-existence of `who`; Pre & post Zombie-status of `who`.
     */
    "burn": Anonymize<Ifira6u9hi7cu1>;
    /**
     * Move some assets from the sender account to another.
     *
     * Origin must be Signed.
     *
     * - `id`: The identifier of the asset to have some amount transferred.
     * - `target`: The account to be credited.
     * - `amount`: The amount by which the sender's balance of assets should be reduced and
     * `target`'s balance increased. The amount actually transferred may be slightly greater in
     * the case that the transfer would otherwise take the sender balance above zero but below
     * the minimum balance. Must be greater than zero.
     *
     * Emits `Transferred` with the actual amount transferred. If this takes the source balance
     * to below the minimum for the asset, then the amount transferred is increased to take it
     * to zero.
     *
     * Weight: `O(1)`
     * Modes: Pre-existence of `target`; Post-existence of sender; Account pre-existence of
     * `target`.
     */
    "transfer": Anonymize<I72tqocvdoqfff>;
    /**
     * Move some assets from the sender account to another, keeping the sender account alive.
     *
     * Origin must be Signed.
     *
     * - `id`: The identifier of the asset to have some amount transferred.
     * - `target`: The account to be credited.
     * - `amount`: The amount by which the sender's balance of assets should be reduced and
     * `target`'s balance increased. The amount actually transferred may be slightly greater in
     * the case that the transfer would otherwise take the sender balance above zero but below
     * the minimum balance. Must be greater than zero.
     *
     * Emits `Transferred` with the actual amount transferred. If this takes the source balance
     * to below the minimum for the asset, then the amount transferred is increased to take it
     * to zero.
     *
     * Weight: `O(1)`
     * Modes: Pre-existence of `target`; Post-existence of sender; Account pre-existence of
     * `target`.
     */
    "transfer_keep_alive": Anonymize<I72tqocvdoqfff>;
    /**
     * Move some assets from one account to another.
     *
     * Origin must be Signed and the sender should be the Admin of the asset `id`.
     *
     * - `id`: The identifier of the asset to have some amount transferred.
     * - `source`: The account to be debited.
     * - `dest`: The account to be credited.
     * - `amount`: The amount by which the `source`'s balance of assets should be reduced and
     * `dest`'s balance increased. The amount actually transferred may be slightly greater in
     * the case that the transfer would otherwise take the `source` balance above zero but
     * below the minimum balance. Must be greater than zero.
     *
     * Emits `Transferred` with the actual amount transferred. If this takes the source balance
     * to below the minimum for the asset, then the amount transferred is increased to take it
     * to zero.
     *
     * Weight: `O(1)`
     * Modes: Pre-existence of `dest`; Post-existence of `source`; Account pre-existence of
     * `dest`.
     */
    "force_transfer": Anonymize<I2i27f3sfmvc05>;
    /**
     * Disallow further unprivileged transfers of an asset `id` from an account `who`. `who`
     * must already exist as an entry in `Account`s of the asset. If you want to freeze an
     * account that does not have an entry, use `touch_other` first.
     *
     * Origin must be Signed and the sender should be the Freezer of the asset `id`.
     *
     * - `id`: The identifier of the asset to be frozen.
     * - `who`: The account to be frozen.
     *
     * Emits `Frozen`.
     *
     * Weight: `O(1)`
     */
    "freeze": Anonymize<I1nlrtd1epki2d>;
    /**
     * Allow unprivileged transfers to and from an account again.
     *
     * Origin must be Signed and the sender should be the Admin of the asset `id`.
     *
     * - `id`: The identifier of the asset to be frozen.
     * - `who`: The account to be unfrozen.
     *
     * Emits `Thawed`.
     *
     * Weight: `O(1)`
     */
    "thaw": Anonymize<I1nlrtd1epki2d>;
    /**
     * Disallow further unprivileged transfers for the asset class.
     *
     * Origin must be Signed and the sender should be the Freezer of the asset `id`.
     *
     * - `id`: The identifier of the asset to be frozen.
     *
     * Emits `Frozen`.
     *
     * Weight: `O(1)`
     */
    "freeze_asset": Anonymize<Ic5b47dj4coa3r>;
    /**
     * Allow unprivileged transfers for the asset again.
     *
     * Origin must be Signed and the sender should be the Admin of the asset `id`.
     *
     * - `id`: The identifier of the asset to be thawed.
     *
     * Emits `Thawed`.
     *
     * Weight: `O(1)`
     */
    "thaw_asset": Anonymize<Ic5b47dj4coa3r>;
    /**
     * Change the Owner of an asset.
     *
     * Origin must be Signed and the sender should be the Owner of the asset `id`.
     *
     * - `id`: The identifier of the asset.
     * - `owner`: The new Owner of this asset.
     *
     * Emits `OwnerChanged`.
     *
     * Weight: `O(1)`
     */
    "transfer_ownership": Anonymize<I3abtumcmempjs>;
    /**
     * Change the Issuer, Admin and Freezer of an asset.
     *
     * Origin must be Signed and the sender should be the Owner of the asset `id`.
     *
     * - `id`: The identifier of the asset to be frozen.
     * - `issuer`: The new Issuer of this asset.
     * - `admin`: The new Admin of this asset.
     * - `freezer`: The new Freezer of this asset.
     *
     * Emits `TeamChanged`.
     *
     * Weight: `O(1)`
     */
    "set_team": Anonymize<Id81m8flopt8ha>;
    /**
     * Set the metadata for an asset.
     *
     * Origin must be Signed and the sender should be the Owner of the asset `id`.
     *
     * Funds of sender are reserved according to the formula:
     * `MetadataDepositBase + MetadataDepositPerByte * (name.len + symbol.len)` taking into
     * account any already reserved funds.
     *
     * - `id`: The identifier of the asset to update.
     * - `name`: The user friendly name of this asset. Limited in length by `StringLimit`.
     * - `symbol`: The exchange symbol for this asset. Limited in length by `StringLimit`.
     * - `decimals`: The number of decimals this asset uses to represent one unit.
     *
     * Emits `MetadataSet`.
     *
     * Weight: `O(1)`
     */
    "set_metadata": Anonymize<I8hff7chabggkd>;
    /**
     * Clear the metadata for an asset.
     *
     * Origin must be Signed and the sender should be the Owner of the asset `id`.
     *
     * Any deposit is freed for the asset owner.
     *
     * - `id`: The identifier of the asset to clear.
     *
     * Emits `MetadataCleared`.
     *
     * Weight: `O(1)`
     */
    "clear_metadata": Anonymize<Ic5b47dj4coa3r>;
    /**
     * Force the metadata for an asset to some value.
     *
     * Origin must be ForceOrigin.
     *
     * Any deposit is left alone.
     *
     * - `id`: The identifier of the asset to update.
     * - `name`: The user friendly name of this asset. Limited in length by `StringLimit`.
     * - `symbol`: The exchange symbol for this asset. Limited in length by `StringLimit`.
     * - `decimals`: The number of decimals this asset uses to represent one unit.
     *
     * Emits `MetadataSet`.
     *
     * Weight: `O(N + S)` where N and S are the length of the name and symbol respectively.
     */
    "force_set_metadata": Anonymize<I49i39mtj1ivbs>;
    /**
     * Clear the metadata for an asset.
     *
     * Origin must be ForceOrigin.
     *
     * Any deposit is returned.
     *
     * - `id`: The identifier of the asset to clear.
     *
     * Emits `MetadataCleared`.
     *
     * Weight: `O(1)`
     */
    "force_clear_metadata": Anonymize<Ic5b47dj4coa3r>;
    /**
     * Alter the attributes of a given asset.
     *
     * Origin must be `ForceOrigin`.
     *
     * - `id`: The identifier of the asset.
     * - `owner`: The new Owner of this asset.
     * - `issuer`: The new Issuer of this asset.
     * - `admin`: The new Admin of this asset.
     * - `freezer`: The new Freezer of this asset.
     * - `min_balance`: The minimum balance of this new asset that any single account must
     * have. If an account's balance is reduced below this, then it collapses to zero.
     * - `is_sufficient`: Whether a non-zero balance of this asset is deposit of sufficient
     * value to account for the state bloat associated with its balance storage. If set to
     * `true`, then non-zero balances may be stored without a `consumer` reference (and thus
     * an ED in the Balances pallet or whatever else is used to control user-account state
     * growth).
     * - `is_frozen`: Whether this asset class is frozen except for permissioned/admin
     * instructions.
     *
     * Emits `AssetStatusChanged` with the identity of the asset.
     *
     * Weight: `O(1)`
     */
    "force_asset_status": Anonymize<Ifkr2kcak2vto1>;
    /**
     * Approve an amount of asset for transfer by a delegated third-party account.
     *
     * Origin must be Signed.
     *
     * Ensures that `ApprovalDeposit` worth of `Currency` is reserved from signing account
     * for the purpose of holding the approval. If some non-zero amount of assets is already
     * approved from signing account to `delegate`, then it is topped up or unreserved to
     * meet the right value.
     *
     * NOTE: The signing account does not need to own `amount` of assets at the point of
     * making this call.
     *
     * - `id`: The identifier of the asset.
     * - `delegate`: The account to delegate permission to transfer asset.
     * - `amount`: The amount of asset that may be transferred by `delegate`. If there is
     * already an approval in place, then this acts additively.
     *
     * Emits `ApprovedTransfer` on success.
     *
     * Weight: `O(1)`
     */
    "approve_transfer": Anonymize<I1ju6r8q0cs9jt>;
    /**
     * Cancel all of some asset approved for delegated transfer by a third-party account.
     *
     * Origin must be Signed and there must be an approval in place between signer and
     * `delegate`.
     *
     * Unreserves any deposit previously reserved by `approve_transfer` for the approval.
     *
     * - `id`: The identifier of the asset.
     * - `delegate`: The account delegated permission to transfer asset.
     *
     * Emits `ApprovalCancelled` on success.
     *
     * Weight: `O(1)`
     */
    "cancel_approval": Anonymize<I4kpeq6j7cd5bu>;
    /**
     * Cancel all of some asset approved for delegated transfer by a third-party account.
     *
     * Origin must be either ForceOrigin or Signed origin with the signer being the Admin
     * account of the asset `id`.
     *
     * Unreserves any deposit previously reserved by `approve_transfer` for the approval.
     *
     * - `id`: The identifier of the asset.
     * - `delegate`: The account delegated permission to transfer asset.
     *
     * Emits `ApprovalCancelled` on success.
     *
     * Weight: `O(1)`
     */
    "force_cancel_approval": Anonymize<I5na1ka76k6811>;
    /**
     * Transfer some asset balance from a previously delegated account to some third-party
     * account.
     *
     * Origin must be Signed and there must be an approval in place by the `owner` to the
     * signer.
     *
     * If the entire amount approved for transfer is transferred, then any deposit previously
     * reserved by `approve_transfer` is unreserved.
     *
     * - `id`: The identifier of the asset.
     * - `owner`: The account which previously approved for a transfer of at least `amount` and
     * from which the asset balance will be withdrawn.
     * - `destination`: The account to which the asset balance of `amount` will be transferred.
     * - `amount`: The amount of assets to transfer.
     *
     * Emits `TransferredApproved` on success.
     *
     * Weight: `O(1)`
     */
    "transfer_approved": Anonymize<I59mhdb9omdqfa>;
    /**
     * Create an asset account for non-provider assets.
     *
     * A deposit will be taken from the signer account.
     *
     * - `origin`: Must be Signed; the signer account must have sufficient funds for a deposit
     * to be taken.
     * - `id`: The identifier of the asset for the account to be created.
     *
     * Emits `Touched` event when successful.
     */
    "touch": Anonymize<Ic5b47dj4coa3r>;
    /**
     * Return the deposit (if any) of an asset account or a consumer reference (if any) of an
     * account.
     *
     * The origin must be Signed.
     *
     * - `id`: The identifier of the asset for which the caller would like the deposit
     * refunded.
     * - `allow_burn`: If `true` then assets may be destroyed in order to complete the refund.
     *
     * It will fail with either [`Error::ContainsHolds`] or [`Error::ContainsFreezes`] if
     * the asset account contains holds or freezes in place.
     *
     * Emits `Refunded` event when successful.
     */
    "refund": Anonymize<I9vl5kpk0fpakt>;
    /**
     * Sets the minimum balance of an asset.
     *
     * Only works if there aren't any accounts that are holding the asset or if
     * the new value of `min_balance` is less than the old one.
     *
     * Origin must be Signed and the sender has to be the Owner of the
     * asset `id`.
     *
     * - `id`: The identifier of the asset.
     * - `min_balance`: The new value of `min_balance`.
     *
     * Emits `AssetMinBalanceChanged` event when successful.
     */
    "set_min_balance": Anonymize<I717jt61hu19b4>;
    /**
     * Create an asset account for `who`.
     *
     * A deposit will be taken from the signer account.
     *
     * - `origin`: Must be Signed; the signer account must have sufficient funds for a deposit
     * to be taken.
     * - `id`: The identifier of the asset for the account to be created, the asset status must
     * be live.
     * - `who`: The account to be created.
     *
     * Emits `Touched` event when successful.
     */
    "touch_other": Anonymize<I1nlrtd1epki2d>;
    /**
     * Return the deposit (if any) of a target asset account. Useful if you are the depositor.
     *
     * The origin must be Signed and either the account owner, depositor, or asset `Admin`. In
     * order to burn a non-zero balance of the asset, the caller must be the account and should
     * use `refund`.
     *
     * - `id`: The identifier of the asset for the account holding a deposit.
     * - `who`: The account to refund.
     *
     * It will fail with either [`Error::ContainsHolds`] or [`Error::ContainsFreezes`] if
     * the asset account contains holds or freezes in place.
     *
     * Emits `Refunded` event when successful.
     */
    "refund_other": Anonymize<I1nlrtd1epki2d>;
    /**
     * Disallow further unprivileged transfers of an asset `id` to and from an account `who`.
     *
     * Origin must be Signed and the sender should be the Freezer of the asset `id`.
     *
     * - `id`: The identifier of the account's asset.
     * - `who`: The account to be unblocked.
     *
     * Emits `Blocked`.
     *
     * Weight: `O(1)`
     */
    "block": Anonymize<I1nlrtd1epki2d>;
    /**
     * Transfer the entire transferable balance from the caller asset account.
     *
     * NOTE: This function only attempts to transfer _transferable_ balances. This means that
     * any held, frozen, or minimum balance (when `keep_alive` is `true`), will not be
     * transferred by this function. To ensure that this function results in a killed account,
     * you might need to prepare the account by removing any reference counters, storage
     * deposits, etc...
     *
     * The dispatch origin of this call must be Signed.
     *
     * - `id`: The identifier of the asset for the account holding a deposit.
     * - `dest`: The recipient of the transfer.
     * - `keep_alive`: A boolean to determine if the `transfer_all` operation should send all
     * of the funds the asset account has, causing the sender asset account to be killed
     * (false), or transfer everything except at least the minimum balance, which will
     * guarantee to keep the sender asset account alive (true).
     */
    "transfer_all": Anonymize<I7f7v8192r1lmq>;
}>;
export type Ic357tcepuvo5c = {
    "id": number;
    "admin": MultiAddress;
    "min_balance": bigint;
};
export type I2rnoam876ruhj = {
    "id": number;
    "owner": MultiAddress;
    "is_sufficient": boolean;
    "min_balance": bigint;
};
export type Ic5b47dj4coa3r = {
    "id": number;
};
export type Ib3qnc19gu633c = {
    "id": number;
    "beneficiary": MultiAddress;
    "amount": bigint;
};
export type Ifira6u9hi7cu1 = {
    "id": number;
    "who": MultiAddress;
    "amount": bigint;
};
export type I72tqocvdoqfff = {
    "id": number;
    "target": MultiAddress;
    "amount": bigint;
};
export type I2i27f3sfmvc05 = {
    "id": number;
    "source": MultiAddress;
    "dest": MultiAddress;
    "amount": bigint;
};
export type I1nlrtd1epki2d = {
    "id": number;
    "who": MultiAddress;
};
export type I3abtumcmempjs = {
    "id": number;
    "owner": MultiAddress;
};
export type Id81m8flopt8ha = {
    "id": number;
    "issuer": MultiAddress;
    "admin": MultiAddress;
    "freezer": MultiAddress;
};
export type I8hff7chabggkd = {
    "id": number;
    "name": Binary;
    "symbol": Binary;
    "decimals": number;
};
export type I49i39mtj1ivbs = {
    "id": number;
    "name": Binary;
    "symbol": Binary;
    "decimals": number;
    "is_frozen": boolean;
};
export type Ifkr2kcak2vto1 = {
    "id": number;
    "owner": MultiAddress;
    "issuer": MultiAddress;
    "admin": MultiAddress;
    "freezer": MultiAddress;
    "min_balance": bigint;
    "is_sufficient": boolean;
    "is_frozen": boolean;
};
export type I1ju6r8q0cs9jt = {
    "id": number;
    "delegate": MultiAddress;
    "amount": bigint;
};
export type I4kpeq6j7cd5bu = {
    "id": number;
    "delegate": MultiAddress;
};
export type I5na1ka76k6811 = {
    "id": number;
    "owner": MultiAddress;
    "delegate": MultiAddress;
};
export type I59mhdb9omdqfa = {
    "id": number;
    "owner": MultiAddress;
    "destination": MultiAddress;
    "amount": bigint;
};
export type I9vl5kpk0fpakt = {
    "id": number;
    "allow_burn": boolean;
};
export type I717jt61hu19b4 = {
    "id": number;
    "min_balance": bigint;
};
export type I7f7v8192r1lmq = {
    "id": number;
    "dest": MultiAddress;
    "keep_alive": boolean;
};
export type Id8d6irn91bma1 = AnonymousEnum<{
    "System": Anonymize<Iekve0i6djpd9f>;
    "Timestamp": Anonymize<I7d75gqfg6jh9c>;
    "Utility": Anonymize<I1v3u8v6hvsvju>;
    "Multisig": Anonymize<I6ilbd3tq77psg>;
    "Proxy": Anonymize<I2clil4olgr5i3>;
    "Balances": Anonymize<I9svldsp29mh87>;
    "Vesting": Anonymize<I8cfe4jnuoj2j7>;
    "Claims": Anonymize<Icbj7ln7smk5ds>;
    "Session": Anonymize<Ibd2vdhiqqoobu>;
    "Grandpa": Anonymize<I6v9j95kvocn9v>;
    "Spin": Anonymize<Ibu7tkacvbngph>;
    "SpinAnchoring": Anonymize<I9m9ocf4hcmi0g>;
    "Staking": Anonymize<Icm294co91mkfj>;
    "Sudo": Anonymize<Ib915m284nsdtp>;
    "Revive": Anonymize<I6a4mba5e4puc6>;
    "Assets": Anonymize<I84851acvod2ic>;
}>;
export type I1e13lcoj2ijct = {
    "header": Anonymize<Idcpi3jpt0c03v>;
    "extrinsics": Anonymize<Itom7fk49o0c9>;
};
export type Idcpi3jpt0c03v = {
    "parent_hash": FixedSizeBinary<32>;
    "number": bigint;
    "state_root": FixedSizeBinary<32>;
    "extrinsics_root": FixedSizeBinary<32>;
    "digest": Anonymize<I4mddgoa69c0a2>;
};
export type I2v50gu3s1aqk6 = AnonymousEnum<{
    "AllExtrinsics": undefined;
    "OnlyInherents": undefined;
}>;
export type Iabpgqcjikia83 = (Binary) | undefined;
export type Ib7pnmuv68c0ei = ResultPayload<Anonymize<I68f9r4l875gfd>, Anonymize<I5nrjkj9qumobs>>;
export type I5nrjkj9qumobs = AnonymousEnum<{
    "Invalid": Enum<{
        "Call": undefined;
        "Payment": undefined;
        "Future": undefined;
        "Stale": undefined;
        "BadProof": undefined;
        "AncientBirthBlock": undefined;
        "ExhaustsResources": undefined;
        "Custom": number;
        "BadMandatory": undefined;
        "MandatoryValidation": undefined;
        "BadSigner": undefined;
        "IndeterminateImplicit": undefined;
        "UnknownOrigin": undefined;
    }>;
    "Unknown": TransactionValidityUnknownTransaction;
}>;
export type TransactionValidityUnknownTransaction = Enum<{
    "CannotLookup": undefined;
    "NoUnsignedValidator": undefined;
    "Custom": number;
}>;
export declare const TransactionValidityUnknownTransaction: GetEnum<TransactionValidityUnknownTransaction>;
export type If7uv525tdvv7a = Array<[FixedSizeBinary<8>, Binary]>;
export type I2an1fs2eiebjp = {
    "okay": boolean;
    "fatal_error": boolean;
    "errors": Anonymize<If7uv525tdvv7a>;
};
export type TransactionValidityTransactionSource = Enum<{
    "InBlock": undefined;
    "Local": undefined;
    "External": undefined;
}>;
export declare const TransactionValidityTransactionSource: GetEnum<TransactionValidityTransactionSource>;
export type I9ask1o4tfvcvs = ResultPayload<{
    "priority": bigint;
    "requires": Anonymize<Itom7fk49o0c9>;
    "provides": Anonymize<Itom7fk49o0c9>;
    "longevity": bigint;
    "propagate": boolean;
}, Anonymize<I5nrjkj9qumobs>>;
export type Ie4s4u839msund = [Anonymize<Ic5m5lp1oioo8r>, bigint];
export type Icerf8h8pdu8ss = (Array<[Binary, FixedSizeBinary<4>]>) | undefined;
export type I6spmpef2c7svf = {
    "weight": Anonymize<I4q39t5hn830vp>;
    "class": DispatchClass;
    "partial_fee": bigint;
};
export type Iei2mvq0mjvt81 = {
    "inclusion_fee"?: ({
        "base_fee": bigint;
        "len_fee": bigint;
        "adjusted_weight_fee": bigint;
    }) | undefined;
    "tip": bigint;
};
export type Ie9sr1iqcg3cgm = ResultPayload<undefined, string>;
export type I1mqgk2tmnn9i2 = (string) | undefined;
export type I6lr8sctk0bi4e = Array<string>;
export type Iehlhev3qpj3hp = {
    "gas_consumed": Anonymize<I4q39t5hn830vp>;
    "gas_required": Anonymize<I4q39t5hn830vp>;
    "storage_deposit": Anonymize<If7bmpttbdmqu4>;
    "result": ResultPayload<Anonymize<I620n7irgfspm4>, Anonymize<I6m2rvq1qrtfa>>;
};
export type If7bmpttbdmqu4 = AnonymousEnum<{
    "Refund": bigint;
    "Charge": bigint;
}>;
export type I620n7irgfspm4 = {
    "flags": number;
    "data": Binary;
};
export type I9sijb8gfrns29 = AnonymousEnum<{
    "Upload": Binary;
    "Existing": FixedSizeBinary<32>;
}>;
export type I8tujuiip3mogh = {
    "gas_consumed": Anonymize<I4q39t5hn830vp>;
    "gas_required": Anonymize<I4q39t5hn830vp>;
    "storage_deposit": Anonymize<If7bmpttbdmqu4>;
    "result": ResultPayload<{
        "result": Anonymize<I620n7irgfspm4>;
        "addr": FixedSizeBinary<20>;
    }, Anonymize<I6m2rvq1qrtfa>>;
};
export type I6f9v7emp7t5ba = {
    "access_list"?: (Array<{
        "address": FixedSizeBinary<20>;
        "storage_keys": Anonymize<Ic5m5lp1oioo8r>;
    }>) | undefined;
    "authorization_list": Array<{
        "chain_id": Anonymize<I4totqt881mlti>;
        "address": FixedSizeBinary<20>;
        "nonce": Anonymize<I4totqt881mlti>;
        "y_parity": Anonymize<I4totqt881mlti>;
        "r": Anonymize<I4totqt881mlti>;
        "s": Anonymize<I4totqt881mlti>;
    }>;
    "blob_versioned_hashes": Anonymize<Ic5m5lp1oioo8r>;
    "blobs": Anonymize<Itom7fk49o0c9>;
    "chain_id"?: Anonymize<Ic4rgfgksgmm3e>;
    "from"?: Anonymize<If7b8240vgt2q5>;
    "gas"?: Anonymize<Ic4rgfgksgmm3e>;
    "gas_price"?: Anonymize<Ic4rgfgksgmm3e>;
    "input": {
        "input"?: Anonymize<Iabpgqcjikia83>;
        "data"?: Anonymize<Iabpgqcjikia83>;
    };
    "max_fee_per_blob_gas"?: Anonymize<Ic4rgfgksgmm3e>;
    "max_fee_per_gas"?: Anonymize<Ic4rgfgksgmm3e>;
    "max_priority_fee_per_gas"?: Anonymize<Ic4rgfgksgmm3e>;
    "nonce"?: Anonymize<Ic4rgfgksgmm3e>;
    "to"?: Anonymize<If7b8240vgt2q5>;
    "r#type"?: Anonymize<I4arjljr6dpflb>;
    "value"?: Anonymize<Ic4rgfgksgmm3e>;
};
export type Ic4rgfgksgmm3e = (Anonymize<I4totqt881mlti>) | undefined;
export type If7b8240vgt2q5 = (FixedSizeBinary<20>) | undefined;
export type I8abab09ak4pi1 = ResultPayload<{
    "gas_required": Anonymize<I4q39t5hn830vp>;
    "storage_deposit": bigint;
    "eth_gas": Anonymize<I4totqt881mlti>;
    "data": Binary;
}, Anonymize<I8mb9f26m2cgi5>>;
export type I8mb9f26m2cgi5 = AnonymousEnum<{
    "Data": Binary;
    "Message": string;
}>;
export type I34m9oklu85ug5 = ResultPayload<{
    "code_hash": FixedSizeBinary<32>;
    "deposit": bigint;
}, Anonymize<I6m2rvq1qrtfa>>;
export type Iehnkjehe1oeva = ResultPayload<Anonymize<Iabpgqcjikia83>, Enum<{
    "DoesntExist": undefined;
    "KeyDecodingFailed": undefined;
}>>;
export type I63nhnkgg114n5 = AnonymousEnum<{
    "CallTracer"?: ({
        "with_logs": boolean;
        "only_top_call": boolean;
    }) | undefined;
    "PrestateTracer"?: ({
        "diff_mode": boolean;
        "disable_storage": boolean;
        "disable_code": boolean;
    }) | undefined;
}>;
export type I2mbbhvaji2ui8 = Array<[number, Anonymize<I7av8cgp239d6m>]>;
export type I7av8cgp239d6m = AnonymousEnum<{
    "Call": Anonymize<Ibem6ug2es1tq1>;
    "Prestate": Enum<{
        "Prestate": Anonymize<I4ra24jtob05ku>;
        "DiffMode": {
            "pre": Anonymize<I4ra24jtob05ku>;
            "post": Anonymize<I4ra24jtob05ku>;
        };
    }>;
}>;
export type Ibem6ug2es1tq1 = {
    "from": FixedSizeBinary<20>;
    "gas": Anonymize<I4totqt881mlti>;
    "gas_used": Anonymize<I4totqt881mlti>;
    "to": FixedSizeBinary<20>;
    "input": Binary;
    "output": Binary;
    "error"?: Anonymize<I1mqgk2tmnn9i2>;
    "revert_reason"?: Anonymize<I1mqgk2tmnn9i2>;
    "calls": Array<Anonymize<Ibem6ug2es1tq1>>;
    "logs": Array<{
        "address": FixedSizeBinary<20>;
        "topics": Anonymize<Ic5m5lp1oioo8r>;
        "data": Binary;
        "position": number;
    }>;
    "value"?: Anonymize<Ic4rgfgksgmm3e>;
    "call_type": Enum<{
        "Call": undefined;
        "StaticCall": undefined;
        "DelegateCall": undefined;
        "Create": undefined;
        "Create2": undefined;
    }>;
};
export type I4ra24jtob05ku = Array<[FixedSizeBinary<20>, {
    "balance"?: Anonymize<Ic4rgfgksgmm3e>;
    "nonce"?: Anonymize<I4arjljr6dpflb>;
    "code"?: Anonymize<Iabpgqcjikia83>;
    "storage": Array<[Binary, Anonymize<Iabpgqcjikia83>]>;
}]>;
export type I7sj68ug65e0t0 = (Anonymize<I7av8cgp239d6m>) | undefined;
export type Icifup6o102f4c = ResultPayload<Anonymize<I7av8cgp239d6m>, Anonymize<I8mb9f26m2cgi5>>;
export {};
