import { StorageDescriptor, PlainDescriptor, TxDescriptor, RuntimeDescriptor, Enum, ApisFromDef, QueryFromPalletsDef, TxFromPalletsDef, EventsFromPalletsDef, ErrorsFromPalletsDef, ConstFromPalletsDef, ViewFnsFromPalletsDef, SS58String, FixedSizeBinary, Binary, FixedSizeArray } from "polkadot-api";
import { I5sesotjlssv2d, Iffmde3ekjedi9, I4mddgoa69c0a2, Iblsm8o95r585i, Ifip05kcrl65am, Ieniouoqkq4icf, Phase, Ibgl04rn6nbfm6, I4q39t5hn830vp, Iahvoath23ldhv, I8uo3fpd3bcc6f, Ibfh8ogcpe64jg, I43vorjrsfs83q, I1q8tnt1cluu5j, I8ds64oj6581v0, Ia7pdug7cdsg8g, I9hc9s58q2f30r, I9bin2jc70qt6q, TransactionPaymentReleases, I63js2b08d3e38, Version, Idflv32oq2s29f, ClaimsStatementKind, Ia2lhg7l2hilo3, I6lotbh1p748lj, I95g6i7ilua7lq, I137grj3cf9c1v, I82jm9g7pufuel, Ia24s7cuas271t, I30cqmm2kaidet, I200n1ov5tbcvr, I3geksg000c171, Ic5m5lp1oioo8r, Ic12aht5vh2sen, StakingRewardDestination, I9o7ssi9vmhmgr, Ic3m9d6tdl6gi2, Ib3j7gb0jgs38u, Ifekshcrgkl12g, I7svnfko10tq2e, I6flrronqs3l6n, I97fulj5h3ik95, Ia8896dq44k9m4, Icgljjb6j82uhn, Iff9p3c7k6pfoi, StakingForcing, Iafq6t4rgheait, I4ojmnsk1dchql, Iinkhfdlka9ch, I2kj4j6mp68hf8, I6ouflveob4eli, I834nfrf667ag1, I14i9pui8lc778, I8t4pajubp34g3, I3qklfjubrljqh, Iag3f1hum3p4c8, I4s6jkha20aoh0, I2brm5b9jij1st, I78s05f59eoi8b, In7a38730s6qs, If15el53dd76v9, I9s0ave7t0vnrk, I4fo08joqmcqnm, I8ofcg5rbj0g2c, I4adgbll7gku4i, I6pjjpfvhvcfru, I9pj91mj79qekl, I39uah9nss64h9, Ik64dknsq7k08, Ib51vk42m1po4n, Idcr6u6361oad9, I4qh1793baku96, I34nlbmoo268ff, I4lk3lbgonnmc1, Idvlr5eokt20kr, Ic2atn8at9f5dr, Ie0lfcqf4d8glo, Id9v0e9k2imv, I44imsiesapsp9, Icr6ao0t0ec3r6, I6lqh1vgb4mcja, Ifcvepim6uel89, Iafrqv9avnq6ck, If10pbv4q37qmd, I42tjisrl273pv, I2eb501t8s6hsq, Ianmuoljk2sk1u, Icfa6nb4v5a36n, I4ktuaksf5i1gk, I9bqtpv2ii35mp, I9j7pagd6d4bda, I2h9pmio37r7fb, Ibmr18suc9ikh9, I9iq22t0burs89, I5u8olqbbvfnvf, I5utcetro501ir, Id9uqtigc0il3v, Ie1ni9fvcthisk, Ia7e8nb66rbo53, Ict9ivhr2c5hv0, I8t4vv03357lk9, I6uag8j5aql8q, I54a6pqb8nsfv0, I1dqiovk0tpoah, I1ntko0oih7v1a, I2tf5qmg09624f, Idhlknhp7vndhp, I52551i13hrevr, Ibmti75jifitr0, Ichu6a94bm67kd, Imsf4ordm6qea, Ibft7pgbru2gi2, Ibseqhnve5i1n3, I2eip8tc75dpje, I564va64vtidbq, Ie5v6njpckr05b, I328av3j0bgmjb, I4tuqm9ato907i, Iagi89qt4h1lqg, I9dgmcnuamt5p8, I3vh014cqgmrfd, Ifhs60omlhvt3, If34udpd5e57vi, I39t01nnod9109, Ie5vbnd9198quk, I3h6murn8bd4v5, I6k6jf8ncesuu3, I3qhk481i120pk, If1qr0kbbl298c, Idl3umm12u5pa, I5ont0141q9ss5, Ie6j49utvii126, I3v6ks33uluhnj, I3kiiim1cds68i, I4k60mkh2r6jjg, Ic5njrpnvi3f8g, I5olhh6bc9dcp6, I8k3rnvpeeh4hv, I8pa56fhgq0tog, Ida37oe44osb06, Idsg8aod8e8fqn, I46nktn22m6hbi, Ibgj1cthra7lte, I7kuv3rqu2fb7t, Ic3bd1cop3eccm, I10ra4g1rl6k2f, I1uihehkdsggvp, Ic357tcepuvo5c, I2rnoam876ruhj, Ic5b47dj4coa3r, Ib3qnc19gu633c, Ifira6u9hi7cu1, I72tqocvdoqfff, I2i27f3sfmvc05, I1nlrtd1epki2d, I3abtumcmempjs, Id81m8flopt8ha, I8hff7chabggkd, I49i39mtj1ivbs, Ifkr2kcak2vto1, I1ju6r8q0cs9jt, I4kpeq6j7cd5bu, I5na1ka76k6811, I59mhdb9omdqfa, I9vl5kpk0fpakt, I717jt61hu19b4, I7f7v8192r1lmq, Ia82mnkmeo2rhc, Idl6a7r4skqaq2, Icbccs0ug47ilf, I855j4i3kr8ko1, I1731pqhub6t8e, I2p3nip7bnnmf8, I3l007jkd0230v, I6cjcevouls47l, Io573kme6lgag, Iep27ialq4a7o7, I9pa9lkcl3m04m, I1iorg71osages, Ic9sq0g5877186, I8gtde5abn1g9a, I7dqtifd54vt87, I7nrsqbg7da4kn, I2ur0oeqg495j8, I8etnn6hovgc5s, I1bhd210c3phjj, Icv68aq8841478, Ic262ibdoec56a, Iflcfm9b6nlmdd, Ijrsf4mnp3eka, Id5fm4p8lj5qgi, I8tjvj9uq4b7hi, I3qt1hgg4djhgb, I4cbvqmqadhrea, I4fooe9dun9o0t, I7spgnoibfesv6, Id10ir17qugnsk, If3dpbe8nibcsc, Iph9c4rn81ub2, Ier2cke86dqbr2, Ih04jp733tqqa, Ievr89968437gm, Ie3hcrrq6r18fs, I2hq50pu2kdjpo, I9acqruh7322g2, I5768ac424h061, I1au3fq4n84nv3, Iejaj7m7qka9tr, Idnak900lt5lm8, I27n7lbd66730p, Ifk8eme5o7mukf, Iau4cgm6ih61cf, Ith132hqfb27q, Ic19as7nbst738, I54umskavgc9du, I2ip7o9e2tc5sf, I5egvk6hadac5h, I1td4upnup9gqv, I97oh0ugnukh6b, I5rtkmhm2dng4u, I7svbvm6hg57aj, I8jhsbaiultviu, I88ff3u4dpivk, I33cp947glv1ks, Ic9om1gmmqu7rq, I5hfov2b68ppb6, Ibthhb2m9vneds, Iaitn5bqfacj7k, If4ebvclj2ugvi, Ia5le7udkgbaq9, Ieduc1e6frq8rb, I9h6gbtabovtm4, Ifnsa0dkkpf465, I65dtqr2egjbc3, Ibqj3vg5s5lk0c, I6l73u513p8rna, Iefqmt2htu1dlu, If8bgtgqrchjtu, Idusmq77988cmt, Id8d6irn91bma1, Ifld93hq4fhrsi, I1e13lcoj2ijct, Idcpi3jpt0c03v, I2v50gu3s1aqk6, Iabpgqcjikia83, Ib7pnmuv68c0ei, If7uv525tdvv7a, Itom7fk49o0c9, I2an1fs2eiebjp, TransactionValidityTransactionSource, I9ask1o4tfvcvs, Ie4s4u839msund, Icerf8h8pdu8ss, Ifh2vvcsf9090p, I6spmpef2c7svf, Iei2mvq0mjvt81, Ie9sr1iqcg3cgm, I1mqgk2tmnn9i2, I6lr8sctk0bi4e, I4totqt881mlti, Iasb8k6ash5mjn, I35p85j063s0il, Iehlhev3qpj3hp, I9sijb8gfrns29, I4s6vifaf8k998, I8tujuiip3mogh, I6f9v7emp7t5ba, I8abab09ak4pi1, I34m9oklu85ug5, Iehnkjehe1oeva, I63nhnkgg114n5, I2mbbhvaji2ui8, I7sj68ug65e0t0, Icifup6o102f4c, If7b8240vgt2q5, I6m2rvq1qrtfa } from "./common-types";
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
type IStorage = {
    System: {
        /**
         * The full account information for a particular account ID.
         */
        Account: StorageDescriptor<[Key: SS58String], Anonymize<I5sesotjlssv2d>, false, never>;
        /**
         * Total extrinsics count for the current block.
         */
        ExtrinsicCount: StorageDescriptor<[], number, true, never>;
        /**
         * Whether all inherents have been applied.
         */
        InherentsApplied: StorageDescriptor<[], boolean, false, never>;
        /**
         * The current weight for the block.
         */
        BlockWeight: StorageDescriptor<[], Anonymize<Iffmde3ekjedi9>, false, never>;
        /**
         * Total length (in bytes) for all extrinsics put together, for the current block.
         */
        AllExtrinsicsLen: StorageDescriptor<[], number, true, never>;
        /**
         * Map of block numbers to block hashes.
         */
        BlockHash: StorageDescriptor<[Key: bigint], FixedSizeBinary<32>, false, never>;
        /**
         * Extrinsics data for the current block (maps an extrinsic's index to its data).
         */
        ExtrinsicData: StorageDescriptor<[Key: number], Binary, false, never>;
        /**
         * The current block number being processed. Set by `execute_block`.
         */
        Number: StorageDescriptor<[], bigint, false, never>;
        /**
         * Hash of the previous block.
         */
        ParentHash: StorageDescriptor<[], FixedSizeBinary<32>, false, never>;
        /**
         * Digest of the current block, also part of the block header.
         */
        Digest: StorageDescriptor<[], Anonymize<I4mddgoa69c0a2>, false, never>;
        /**
         * Events deposited for the current block.
         *
         * NOTE: The item is unbound and should therefore never be read on chain.
         * It could otherwise inflate the PoV size of a block.
         *
         * Events have a large in-memory size. Box the events to not go out-of-memory
         * just in case someone still reads them from within the runtime.
         */
        Events: StorageDescriptor<[], Anonymize<Iblsm8o95r585i>, false, never>;
        /**
         * The number of events in the `Events<T>` list.
         */
        EventCount: StorageDescriptor<[], number, false, never>;
        /**
         * Mapping between a topic (represented by T::Hash) and a vector of indexes
         * of events in the `<Events<T>>` list.
         *
         * All topic vectors have deterministic storage locations depending on the topic. This
         * allows light-clients to leverage the changes trie storage tracking mechanism and
         * in case of changes fetch the list of events of interest.
         *
         * The value has the type `(BlockNumberFor<T>, EventIndex)` because if we used only just
         * the `EventIndex` then in case if the topic has the same contents on the next block
         * no notification will be triggered thus the event might be lost.
         */
        EventTopics: StorageDescriptor<[Key: FixedSizeBinary<32>], Anonymize<Ifip05kcrl65am>, false, never>;
        /**
         * Stores the `spec_version` and `spec_name` of when the last runtime upgrade happened.
         */
        LastRuntimeUpgrade: StorageDescriptor<[], Anonymize<Ieniouoqkq4icf>, true, never>;
        /**
         * True if we have upgraded so that `type RefCount` is `u32`. False (default) if not.
         */
        UpgradedToU32RefCount: StorageDescriptor<[], boolean, false, never>;
        /**
         * True if we have upgraded so that AccountInfo contains three types of `RefCount`. False
         * (default) if not.
         */
        UpgradedToTripleRefCount: StorageDescriptor<[], boolean, false, never>;
        /**
         * The execution phase of the block.
         */
        ExecutionPhase: StorageDescriptor<[], Phase, true, never>;
        /**
         * `Some` if a code upgrade has been authorized.
         */
        AuthorizedUpgrade: StorageDescriptor<[], Anonymize<Ibgl04rn6nbfm6>, true, never>;
        /**
         * The weight reclaimed for the extrinsic.
         *
         * This information is available until the end of the extrinsic execution.
         * More precisely this information is removed in `note_applied_extrinsic`.
         *
         * Logic doing some post dispatch weight reduction must update this storage to avoid duplicate
         * reduction.
         */
        ExtrinsicWeightReclaimed: StorageDescriptor<[], Anonymize<I4q39t5hn830vp>, false, never>;
    };
    Timestamp: {
        /**
         * The current time for the current block.
         */
        Now: StorageDescriptor<[], bigint, false, never>;
        /**
         * Whether the timestamp has been updated in this block.
         *
         * This value is updated to `true` upon successful submission of a timestamp by a node.
         * It is then checked at the end of each block execution in the `on_finalize` hook.
         */
        DidUpdate: StorageDescriptor<[], boolean, false, never>;
    };
    Multisig: {
        /**
         * The set of open multisig operations.
         */
        Multisigs: StorageDescriptor<Anonymize<I8uo3fpd3bcc6f>, Anonymize<Iahvoath23ldhv>, true, never>;
    };
    Proxy: {
        /**
         * The set of account proxies. Maps the account which has delegated to the accounts
         * which are being delegated to, together with the amount held on deposit.
         */
        Proxies: StorageDescriptor<[Key: SS58String], Anonymize<Ibfh8ogcpe64jg>, false, never>;
        /**
         * The announcements made by the proxy (key).
         */
        Announcements: StorageDescriptor<[Key: SS58String], Anonymize<I43vorjrsfs83q>, false, never>;
    };
    Balances: {
        /**
         * The total units issued in the system.
         */
        TotalIssuance: StorageDescriptor<[], bigint, false, never>;
        /**
         * The total units of outstanding deactivated balance in the system.
         */
        InactiveIssuance: StorageDescriptor<[], bigint, false, never>;
        /**
         * The Balances pallet example of storing the balance of an account.
         *
         * # Example
         *
         * ```nocompile
         * impl pallet_balances::Config for Runtime {
         * type AccountStore = StorageMapShim<Self::Account<Runtime>, frame_system::Provider<Runtime>, AccountId, Self::AccountData<Balance>>
         * }
         * ```
         *
         * You can also store the balance of an account in the `System` pallet.
         *
         * # Example
         *
         * ```nocompile
         * impl pallet_balances::Config for Runtime {
         * type AccountStore = System
         * }
         * ```
         *
         * But this comes with tradeoffs, storing account balances in the system pallet stores
         * `frame_system` data alongside the account data contrary to storing account balances in the
         * `Balances` pallet, which uses a `StorageMap` to store balances data only.
         * NOTE: This is only used in the case that this pallet is used to store balances.
         */
        Account: StorageDescriptor<[Key: SS58String], Anonymize<I1q8tnt1cluu5j>, false, never>;
        /**
         * Any liquidity locks on some account balances.
         * NOTE: Should only be accessed when setting, changing and freeing a lock.
         *
         * Use of locks is deprecated in favour of freezes. See `https://github.com/paritytech/substrate/pull/12951/`
         */
        Locks: StorageDescriptor<[Key: SS58String], Anonymize<I8ds64oj6581v0>, false, never>;
        /**
         * Named reserves on some account balances.
         *
         * Use of reserves is deprecated in favour of holds. See `https://github.com/paritytech/substrate/pull/12951/`
         */
        Reserves: StorageDescriptor<[Key: SS58String], Anonymize<Ia7pdug7cdsg8g>, false, never>;
        /**
         * Holds on account balances.
         */
        Holds: StorageDescriptor<[Key: SS58String], Anonymize<I9hc9s58q2f30r>, false, never>;
        /**
         * Freeze locks on account balances.
         */
        Freezes: StorageDescriptor<[Key: SS58String], Anonymize<I9bin2jc70qt6q>, false, never>;
    };
    TransactionPayment: {
        /**
        
         */
        NextFeeMultiplier: StorageDescriptor<[], bigint, false, never>;
        /**
        
         */
        StorageVersion: StorageDescriptor<[], TransactionPaymentReleases, false, never>;
    };
    Vesting: {
        /**
         * Information regarding the vesting of a given account.
         */
        Vesting: StorageDescriptor<[Key: SS58String], Anonymize<I63js2b08d3e38>, true, never>;
        /**
         * Storage version of the pallet.
         *
         * New networks start with latest version, as determined by the genesis build.
         */
        StorageVersion: StorageDescriptor<[], Version, false, never>;
    };
    Claims: {
        /**
        
         */
        Claims: StorageDescriptor<[Key: FixedSizeBinary<20>], bigint, true, never>;
        /**
        
         */
        Total: StorageDescriptor<[], bigint, false, never>;
        /**
         * Vesting schedule for a claim.
         * First balance is the total amount that should be held for vesting.
         * Second balance is how much should be unlocked per block.
         * The block number is when the vesting should start.
         */
        Vesting: StorageDescriptor<[Key: FixedSizeBinary<20>], Anonymize<Idflv32oq2s29f>, true, never>;
        /**
         * The statement kind that must be signed, if any.
         */
        Signing: StorageDescriptor<[Key: FixedSizeBinary<20>], ClaimsStatementKind, true, never>;
        /**
         * Pre-claimed Ethereum accounts, by the Account ID that they are claimed to.
         */
        Preclaims: StorageDescriptor<[Key: SS58String], FixedSizeBinary<20>, true, never>;
        /**
        
         */
        MintClaimOrigin: StorageDescriptor<[], SS58String, true, never>;
        /**
        
         */
        MoveClaimOrigin: StorageDescriptor<[], SS58String, true, never>;
    };
    Authorship: {
        /**
         * Author of current block.
         */
        Author: StorageDescriptor<[], SS58String, true, never>;
    };
    Session: {
        /**
         * The current set of validators.
         */
        Validators: StorageDescriptor<[], Anonymize<Ia2lhg7l2hilo3>, false, never>;
        /**
         * Current index of the session.
         */
        CurrentIndex: StorageDescriptor<[], number, false, never>;
        /**
         * True if the underlying economic identities or weighting behind the validators
         * has changed in the queued validator set.
         */
        QueuedChanged: StorageDescriptor<[], boolean, false, never>;
        /**
         * The queued keys for the next session. When the next session begins, these keys
         * will be used to determine the validator's session keys.
         */
        QueuedKeys: StorageDescriptor<[], Anonymize<I6lotbh1p748lj>, false, never>;
        /**
         * Indices of disabled validators.
         *
         * The vec is always kept sorted so that we can find whether a given validator is
         * disabled using binary search. It gets cleared when `on_session_ending` returns
         * a new set of identities.
         */
        DisabledValidators: StorageDescriptor<[], Anonymize<I95g6i7ilua7lq>, false, never>;
        /**
         * The next session keys for a validator.
         */
        NextKeys: StorageDescriptor<[Key: SS58String], Anonymize<I137grj3cf9c1v>, true, never>;
        /**
         * The owner of a key. The key is the `KeyTypeId` + the encoded key.
         */
        KeyOwner: StorageDescriptor<[Key: Anonymize<I82jm9g7pufuel>], SS58String, true, never>;
    };
    Grandpa: {
        /**
         * State of the current authority set.
         */
        State: StorageDescriptor<[], Anonymize<Ia24s7cuas271t>, false, never>;
        /**
         * Pending change: (signaled at, scheduled change).
         */
        PendingChange: StorageDescriptor<[], Anonymize<I30cqmm2kaidet>, true, never>;
        /**
         * next block number where we can force a change.
         */
        NextForced: StorageDescriptor<[], bigint, true, never>;
        /**
         * `true` if we are currently stalled.
         */
        Stalled: StorageDescriptor<[], Anonymize<I200n1ov5tbcvr>, true, never>;
        /**
         * The number of changes (both in terms of keys and underlying economic responsibilities)
         * in the "set" of Grandpa validators from genesis.
         */
        CurrentSetId: StorageDescriptor<[], bigint, false, never>;
        /**
         * A mapping from grandpa set ID to the index of the *most recent* session for which its
         * members were responsible.
         *
         * This is only used for validating equivocation proofs. An equivocation proof must
         * contains a key-ownership proof for a given session, therefore we need a way to tie
         * together sessions and GRANDPA set ids, i.e. we need to validate that a validator
         * was the owner of a given key on a given session, and what the active set ID was
         * during that session.
         *
         * TWOX-NOTE: `SetId` is not under user control.
         */
        SetIdSession: StorageDescriptor<[Key: bigint], number, true, never>;
        /**
         * The current list of authorities.
         */
        Authorities: StorageDescriptor<[], Anonymize<I3geksg000c171>, false, never>;
    };
    Spin: {
        /**
         * The current authority set.
         */
        Authorities: StorageDescriptor<[], Anonymize<Ic5m5lp1oioo8r>, false, never>;
        /**
         * The current slot of this block.
         *
         * This will be set in `on_initialize`.
         */
        CurrentSlot: StorageDescriptor<[], bigint, false, never>;
        /**
         * Session length in blocks
         *
         * Selected leader produces blocks for `SessionLength` blocks.
         */
        SessionLength: StorageDescriptor<[], bigint, false, never>;
    };
    SpinAnchoring: {
        /**
        
         */
        Relayer: StorageDescriptor<[], SS58String, true, never>;
        /**
         * Highest fast-chain block number that is securely anchored.
         */
        SecureUpTo: StorageDescriptor<[], bigint, false, never>;
    };
    Staking: {
        /**
         * The ideal number of active validators.
         */
        ValidatorCount: StorageDescriptor<[], number, false, never>;
        /**
         * Minimum number of staking participants before emergency conditions are imposed.
         */
        MinimumValidatorCount: StorageDescriptor<[], number, false, never>;
        /**
         * Any validators that may never be slashed or forcibly kicked. It's a Vec since they're
         * easy to initialize and the performance hit is minimal (we expect no more than four
         * invulnerables) and restricted to testnets.
         */
        Invulnerables: StorageDescriptor<[], Anonymize<Ia2lhg7l2hilo3>, false, never>;
        /**
         * Map from all locked "stash" accounts to the controller account.
         *
         * TWOX-NOTE: SAFE since `AccountId` is a secure hash.
         */
        Bonded: StorageDescriptor<[Key: SS58String], SS58String, true, never>;
        /**
         * The minimum active bond to become and maintain the role of a nominator.
         */
        MinNominatorBond: StorageDescriptor<[], bigint, false, never>;
        /**
         * The minimum active bond to become and maintain the role of a validator.
         */
        MinValidatorBond: StorageDescriptor<[], bigint, false, never>;
        /**
         * The minimum active nominator stake of the last successful election.
         */
        MinimumActiveStake: StorageDescriptor<[], bigint, false, never>;
        /**
         * The minimum amount of commission that validators can set.
         *
         * If set to `0`, no limit exists.
         */
        MinCommission: StorageDescriptor<[], number, false, never>;
        /**
         * Map from all (unlocked) "controller" accounts to the info regarding the staking.
         *
         * Note: All the reads and mutations to this storage *MUST* be done through the methods exposed
         * by [`StakingLedger`] to ensure data and lock consistency.
         */
        Ledger: StorageDescriptor<[Key: SS58String], Anonymize<Ic12aht5vh2sen>, true, never>;
        /**
         * Where the reward payment should be made. Keyed by stash.
         *
         * TWOX-NOTE: SAFE since `AccountId` is a secure hash.
         */
        Payee: StorageDescriptor<[Key: SS58String], StakingRewardDestination, true, never>;
        /**
         * The map from (wannabe) validator stash key to the preferences of that validator.
         *
         * TWOX-NOTE: SAFE since `AccountId` is a secure hash.
         */
        Validators: StorageDescriptor<[Key: SS58String], Anonymize<I9o7ssi9vmhmgr>, false, never>;
        /**
         * Counter for the related counted storage map
         */
        CounterForValidators: StorageDescriptor<[], number, false, never>;
        /**
         * The maximum validator count before we stop allowing new validators to join.
         *
         * When this value is not set, no limits are enforced.
         */
        MaxValidatorsCount: StorageDescriptor<[], number, true, never>;
        /**
         * The map from nominator stash key to their nomination preferences, namely the validators that
         * they wish to support.
         *
         * Note that the keys of this storage map might become non-decodable in case the
         * account's [`NominationsQuota::MaxNominations`] configuration is decreased.
         * In this rare case, these nominators
         * are still existent in storage, their key is correct and retrievable (i.e. `contains_key`
         * indicates that they exist), but their value cannot be decoded. Therefore, the non-decodable
         * nominators will effectively not-exist, until they re-submit their preferences such that it
         * is within the bounds of the newly set `Config::MaxNominations`.
         *
         * This implies that `::iter_keys().count()` and `::iter().count()` might return different
         * values for this map. Moreover, the main `::count()` is aligned with the former, namely the
         * number of keys that exist.
         *
         * Lastly, if any of the nominators become non-decodable, they can be chilled immediately via
         * [`Call::chill_other`] dispatchable by anyone.
         *
         * TWOX-NOTE: SAFE since `AccountId` is a secure hash.
         */
        Nominators: StorageDescriptor<[Key: SS58String], Anonymize<Ic3m9d6tdl6gi2>, true, never>;
        /**
         * Counter for the related counted storage map
         */
        CounterForNominators: StorageDescriptor<[], number, false, never>;
        /**
         * Stakers whose funds are managed by other pallets.
         *
         * This pallet does not apply any locks on them, therefore they are only virtually bonded. They
         * are expected to be keyless accounts and hence should not be allowed to mutate their ledger
         * directly via this pallet. Instead, these accounts are managed by other pallets and accessed
         * via low level apis. We keep track of them to do minimal integrity checks.
         */
        VirtualStakers: StorageDescriptor<[Key: SS58String], null, true, never>;
        /**
         * Counter for the related counted storage map
         */
        CounterForVirtualStakers: StorageDescriptor<[], number, false, never>;
        /**
         * The maximum nominator count before we stop allowing new validators to join.
         *
         * When this value is not set, no limits are enforced.
         */
        MaxNominatorsCount: StorageDescriptor<[], number, true, never>;
        /**
         * The current era index.
         *
         * This is the latest planned era, depending on how the Session pallet queues the validator
         * set, it might be active or not.
         */
        CurrentEra: StorageDescriptor<[], number, true, never>;
        /**
         * The active era information, it holds index and start.
         *
         * The active era is the era being currently rewarded. Validator set of this era must be
         * equal to [`SessionInterface::validators`].
         */
        ActiveEra: StorageDescriptor<[], Anonymize<Ib3j7gb0jgs38u>, true, never>;
        /**
         * The session index at which the era start for the last [`Config::HistoryDepth`] eras.
         *
         * Note: This tracks the starting session (i.e. session index when era start being active)
         * for the eras in `[CurrentEra - HISTORY_DEPTH, CurrentEra]`.
         */
        ErasStartSessionIndex: StorageDescriptor<[Key: number], number, true, never>;
        /**
         * Exposure of validator at era.
         *
         * This is keyed first by the era index to allow bulk deletion and then the stash account.
         *
         * Is it removed after [`Config::HistoryDepth`] eras.
         * If stakers hasn't been set or has been removed then empty exposure is returned.
         *
         * Note: Deprecated since v14. Use `EraInfo` instead to work with exposures.
         */
        ErasStakers: StorageDescriptor<Anonymize<I7svnfko10tq2e>, Anonymize<Ifekshcrgkl12g>, false, never>;
        /**
         * Summary of validator exposure at a given era.
         *
         * This contains the total stake in support of the validator and their own stake. In addition,
         * it can also be used to get the number of nominators backing this validator and the number of
         * exposure pages they are divided into. The page count is useful to determine the number of
         * pages of rewards that needs to be claimed.
         *
         * This is keyed first by the era index to allow bulk deletion and then the stash account.
         * Should only be accessed through `EraInfo`.
         *
         * Is it removed after [`Config::HistoryDepth`] eras.
         * If stakers hasn't been set or has been removed then empty overview is returned.
         */
        ErasStakersOverview: StorageDescriptor<Anonymize<I7svnfko10tq2e>, Anonymize<I6flrronqs3l6n>, true, never>;
        /**
         * Clipped Exposure of validator at era.
         *
         * Note: This is deprecated, should be used as read-only and will be removed in the future.
         * New `Exposure`s are stored in a paged manner in `ErasStakersPaged` instead.
         *
         * This is similar to [`ErasStakers`] but number of nominators exposed is reduced to the
         * `T::MaxExposurePageSize` biggest stakers.
         * (Note: the field `total` and `own` of the exposure remains unchanged).
         * This is used to limit the i/o cost for the nominator payout.
         *
         * This is keyed fist by the era index to allow bulk deletion and then the stash account.
         *
         * It is removed after [`Config::HistoryDepth`] eras.
         * If stakers hasn't been set or has been removed then empty exposure is returned.
         *
         * Note: Deprecated since v14. Use `EraInfo` instead to work with exposures.
         */
        ErasStakersClipped: StorageDescriptor<Anonymize<I7svnfko10tq2e>, Anonymize<Ifekshcrgkl12g>, false, never>;
        /**
         * Paginated exposure of a validator at given era.
         *
         * This is keyed first by the era index to allow bulk deletion, then stash account and finally
         * the page. Should only be accessed through `EraInfo`.
         *
         * This is cleared after [`Config::HistoryDepth`] eras.
         */
        ErasStakersPaged: StorageDescriptor<Anonymize<Ia8896dq44k9m4>, Anonymize<I97fulj5h3ik95>, true, never>;
        /**
         * History of claimed paged rewards by era and validator.
         *
         * This is keyed by era and validator stash which maps to the set of page indexes which have
         * been claimed.
         *
         * It is removed after [`Config::HistoryDepth`] eras.
         */
        ClaimedRewards: StorageDescriptor<Anonymize<I7svnfko10tq2e>, Anonymize<Icgljjb6j82uhn>, false, never>;
        /**
         * Similar to `ErasStakers`, this holds the preferences of validators.
         *
         * This is keyed first by the era index to allow bulk deletion and then the stash account.
         *
         * Is it removed after [`Config::HistoryDepth`] eras.
         */
        ErasValidatorPrefs: StorageDescriptor<Anonymize<I7svnfko10tq2e>, Anonymize<I9o7ssi9vmhmgr>, false, never>;
        /**
         * The total validator era payout for the last [`Config::HistoryDepth`] eras.
         *
         * Eras that haven't finished yet or has been removed doesn't have reward.
         */
        ErasValidatorReward: StorageDescriptor<[Key: number], bigint, true, never>;
        /**
         * Rewards for the last [`Config::HistoryDepth`] eras.
         * If reward hasn't been set or has been removed then 0 reward is returned.
         */
        ErasRewardPoints: StorageDescriptor<[Key: number], Anonymize<Iff9p3c7k6pfoi>, false, never>;
        /**
         * The total amount staked for the last [`Config::HistoryDepth`] eras.
         * If total hasn't been set or has been removed then 0 stake is returned.
         */
        ErasTotalStake: StorageDescriptor<[Key: number], bigint, false, never>;
        /**
         * Mode of era forcing.
         */
        ForceEra: StorageDescriptor<[], StakingForcing, false, never>;
        /**
         * Maximum staked rewards, i.e. the percentage of the era inflation that
         * is used for stake rewards.
         * See [Era payout](./index.html#era-payout).
         */
        MaxStakedRewards: StorageDescriptor<[], number, true, never>;
        /**
         * The percentage of the slash that is distributed to reporters.
         *
         * The rest of the slashed value is handled by the `Slash`.
         */
        SlashRewardFraction: StorageDescriptor<[], number, false, never>;
        /**
         * The amount of currency given to reporters of a slash event which was
         * canceled by extraordinary circumstances (e.g. governance).
         */
        CanceledSlashPayout: StorageDescriptor<[], bigint, false, never>;
        /**
         * All unapplied slashes that are queued for later.
         */
        UnappliedSlashes: StorageDescriptor<[Key: number], Anonymize<Iafq6t4rgheait>, false, never>;
        /**
         * A mapping from still-bonded eras to the first session index of that era.
         *
         * Must contains information for eras for the range:
         * `[active_era - bounding_duration; active_era]`
         */
        BondedEras: StorageDescriptor<[], Anonymize<I95g6i7ilua7lq>, false, never>;
        /**
         * All slashing events on validators, mapped by era to the highest slash proportion
         * and slash value of the era.
         */
        ValidatorSlashInEra: StorageDescriptor<Anonymize<I7svnfko10tq2e>, Anonymize<I4ojmnsk1dchql>, true, never>;
        /**
         * All slashing events on nominators, mapped by era to the highest slash value of the era.
         */
        NominatorSlashInEra: StorageDescriptor<Anonymize<I7svnfko10tq2e>, bigint, true, never>;
        /**
         * Slashing spans for stash accounts.
         */
        SlashingSpans: StorageDescriptor<[Key: SS58String], Anonymize<Iinkhfdlka9ch>, true, never>;
        /**
         * Records information about the maximum slash of a stash within a slashing span,
         * as well as how much reward has been paid out.
         */
        SpanSlash: StorageDescriptor<[Key: Anonymize<I6ouflveob4eli>], Anonymize<I2kj4j6mp68hf8>, false, never>;
        /**
         * The last planned session scheduled by the session pallet.
         *
         * This is basically in sync with the call to [`pallet_session::SessionManager::new_session`].
         */
        CurrentPlannedSession: StorageDescriptor<[], number, false, never>;
        /**
         * The threshold for when users can start calling `chill_other` for other validators /
         * nominators. The threshold is compared to the actual number of validators / nominators
         * (`CountFor*`) in the system compared to the configured max (`Max*Count`).
         */
        ChillThreshold: StorageDescriptor<[], number, true, never>;
    };
    Sudo: {
        /**
         * The `AccountId` of the sudo key.
         */
        Key: StorageDescriptor<[], SS58String, true, never>;
    };
    Revive: {
        /**
         * A mapping from a contract's code hash to its code.
         * The code's size is bounded by [`crate::limits::BLOB_BYTES`] for PVM and
         * [`revm::primitives::eip170::MAX_CODE_SIZE`] for EVM bytecode.
         */
        PristineCode: StorageDescriptor<[Key: FixedSizeBinary<32>], Binary, true, never>;
        /**
         * A mapping from a contract's code hash to its code info.
         */
        CodeInfoOf: StorageDescriptor<[Key: FixedSizeBinary<32>], Anonymize<I834nfrf667ag1>, true, never>;
        /**
         * The data associated to a contract or externally owned account.
         */
        AccountInfoOf: StorageDescriptor<[Key: FixedSizeBinary<20>], Anonymize<I14i9pui8lc778>, true, never>;
        /**
         * The immutable data associated with a given account.
         */
        ImmutableDataOf: StorageDescriptor<[Key: FixedSizeBinary<20>], Binary, true, never>;
        /**
         * Evicted contracts that await child trie deletion.
         *
         * Child trie deletion is a heavy operation depending on the amount of storage items
         * stored in said trie. Therefore this operation is performed lazily in `on_idle`.
         */
        DeletionQueue: StorageDescriptor<[Key: number], Binary, true, never>;
        /**
         * A pair of monotonic counters used to track the latest contract marked for deletion
         * and the latest deleted contract in queue.
         */
        DeletionQueueCounter: StorageDescriptor<[], Anonymize<I8t4pajubp34g3>, false, never>;
        /**
         * Map a Ethereum address to its original `AccountId32`.
         *
         * When deriving a `H160` from an `AccountId32` we use a hash function. In order to
         * reconstruct the original account we need to store the reverse mapping here.
         * Register your `AccountId32` using [`Pallet::map_account`] in order to
         * use it with this pallet.
         */
        OriginalAccount: StorageDescriptor<[Key: FixedSizeBinary<20>], SS58String, true, never>;
    };
    Assets: {
        /**
         * Details of an asset.
         */
        Asset: StorageDescriptor<[Key: number], Anonymize<I3qklfjubrljqh>, true, never>;
        /**
         * The holdings of a specific account for a specific asset.
         */
        Account: StorageDescriptor<Anonymize<I7svnfko10tq2e>, Anonymize<Iag3f1hum3p4c8>, true, never>;
        /**
         * Approved balance transfers. First balance is the amount approved for transfer. Second
         * is the amount of `T::Currency` reserved for storing this.
         * First key is the asset ID, second key is the owner and third key is the delegate.
         */
        Approvals: StorageDescriptor<Anonymize<I2brm5b9jij1st>, Anonymize<I4s6jkha20aoh0>, true, never>;
        /**
         * Metadata of an asset.
         */
        Metadata: StorageDescriptor<[Key: number], Anonymize<I78s05f59eoi8b>, false, never>;
        /**
         * The asset ID enforced for the next asset creation, if any present. Otherwise, this storage
         * item has no effect.
         *
         * This can be useful for setting up constraints for IDs of the new assets. For example, by
         * providing an initial [`NextAssetId`] and using the [`crate::AutoIncAssetId`] callback, an
         * auto-increment model can be applied to all new asset IDs.
         *
         * The initial next asset ID can be set using the [`GenesisConfig`] or the
         * [SetNextAssetId](`migration::next_asset_id::SetNextAssetId`) migration.
         */
        NextAssetId: StorageDescriptor<[], number, true, never>;
    };
};
type ICalls = {
    System: {
        /**
         * Make some on-chain remark.
         *
         * Can be executed by every `origin`.
         */
        remark: TxDescriptor<Anonymize<I8ofcg5rbj0g2c>>;
        /**
         * Set the number of pages in the WebAssembly environment's heap.
         */
        set_heap_pages: TxDescriptor<Anonymize<I4adgbll7gku4i>>;
        /**
         * Set the new runtime code.
         */
        set_code: TxDescriptor<Anonymize<I6pjjpfvhvcfru>>;
        /**
         * Set the new runtime code without doing any checks of the given `code`.
         *
         * Note that runtime upgrades will not run if this is called with a not-increasing spec
         * version!
         */
        set_code_without_checks: TxDescriptor<Anonymize<I6pjjpfvhvcfru>>;
        /**
         * Set some items of storage.
         */
        set_storage: TxDescriptor<Anonymize<I9pj91mj79qekl>>;
        /**
         * Kill some items from storage.
         */
        kill_storage: TxDescriptor<Anonymize<I39uah9nss64h9>>;
        /**
         * Kill all storage items with a key that starts with the given prefix.
         *
         * **NOTE:** We rely on the Root origin to provide us the number of subkeys under
         * the prefix we are removing to accurately calculate the weight of this function.
         */
        kill_prefix: TxDescriptor<Anonymize<Ik64dknsq7k08>>;
        /**
         * Make some on-chain remark and emit event.
         */
        remark_with_event: TxDescriptor<Anonymize<I8ofcg5rbj0g2c>>;
        /**
         * Authorize an upgrade to a given `code_hash` for the runtime. The runtime can be supplied
         * later.
         *
         * This call requires Root origin.
         */
        authorize_upgrade: TxDescriptor<Anonymize<Ib51vk42m1po4n>>;
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
        authorize_upgrade_without_checks: TxDescriptor<Anonymize<Ib51vk42m1po4n>>;
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
        apply_authorized_upgrade: TxDescriptor<Anonymize<I6pjjpfvhvcfru>>;
    };
    Timestamp: {
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
        set: TxDescriptor<Anonymize<Idcr6u6361oad9>>;
    };
    Utility: {
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
        batch: TxDescriptor<Anonymize<I4qh1793baku96>>;
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
        as_derivative: TxDescriptor<Anonymize<I34nlbmoo268ff>>;
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
        batch_all: TxDescriptor<Anonymize<I4qh1793baku96>>;
        /**
         * Dispatches a function call with a provided origin.
         *
         * The dispatch origin for this call must be _Root_.
         *
         * ## Complexity
         * - O(1).
         */
        dispatch_as: TxDescriptor<Anonymize<I4lk3lbgonnmc1>>;
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
        force_batch: TxDescriptor<Anonymize<I4qh1793baku96>>;
        /**
         * Dispatch a function call with a specified weight.
         *
         * This function does not check the weight of the call, and instead allows the
         * Root origin to specify the weight of the call.
         *
         * The dispatch origin for this call must be _Root_.
         */
        with_weight: TxDescriptor<Anonymize<Idvlr5eokt20kr>>;
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
        if_else: TxDescriptor<Anonymize<Ic2atn8at9f5dr>>;
        /**
         * Dispatches a function call with a provided origin.
         *
         * Almost the same as [`Pallet::dispatch_as`] but forwards any error of the inner call.
         *
         * The dispatch origin for this call must be _Root_.
         */
        dispatch_as_fallible: TxDescriptor<Anonymize<I4lk3lbgonnmc1>>;
    };
    Multisig: {
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
        as_multi_threshold_1: TxDescriptor<Anonymize<Ie0lfcqf4d8glo>>;
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
        as_multi: TxDescriptor<Anonymize<Id9v0e9k2imv>>;
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
        approve_as_multi: TxDescriptor<Anonymize<I44imsiesapsp9>>;
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
        cancel_as_multi: TxDescriptor<Anonymize<Icr6ao0t0ec3r6>>;
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
        poke_deposit: TxDescriptor<Anonymize<I6lqh1vgb4mcja>>;
    };
    Proxy: {
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
        proxy: TxDescriptor<Anonymize<Ifcvepim6uel89>>;
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
        add_proxy: TxDescriptor<Anonymize<Iafrqv9avnq6ck>>;
        /**
         * Unregister a proxy account for the sender.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `proxy`: The account that the `caller` would like to remove as a proxy.
         * - `proxy_type`: The permissions currently enabled for the removed proxy account.
         */
        remove_proxy: TxDescriptor<Anonymize<Iafrqv9avnq6ck>>;
        /**
         * Unregister all proxy accounts for the sender.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * WARNING: This may be called on accounts created by `create_pure`, however if done, then
         * the unreserved fees will be inaccessible. **All access to this account will be lost.**
         */
        remove_proxies: TxDescriptor<undefined>;
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
        create_pure: TxDescriptor<Anonymize<If10pbv4q37qmd>>;
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
        kill_pure: TxDescriptor<Anonymize<I42tjisrl273pv>>;
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
        announce: TxDescriptor<Anonymize<I2eb501t8s6hsq>>;
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
        remove_announcement: TxDescriptor<Anonymize<I2eb501t8s6hsq>>;
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
        reject_announcement: TxDescriptor<Anonymize<Ianmuoljk2sk1u>>;
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
        proxy_announced: TxDescriptor<Anonymize<Icfa6nb4v5a36n>>;
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
        poke_deposit: TxDescriptor<undefined>;
    };
    Balances: {
        /**
         * Transfer some liquid free balance to another account.
         *
         * `transfer_allow_death` will set the `FreeBalance` of the sender and receiver.
         * If the sender's account is below the existential deposit as a result
         * of the transfer, the account will be reaped.
         *
         * The dispatch origin for this call must be `Signed` by the transactor.
         */
        transfer_allow_death: TxDescriptor<Anonymize<I4ktuaksf5i1gk>>;
        /**
         * Exactly as `transfer_allow_death`, except the origin must be root and the source account
         * may be specified.
         */
        force_transfer: TxDescriptor<Anonymize<I9bqtpv2ii35mp>>;
        /**
         * Same as the [`transfer_allow_death`] call, but with a check that the transfer will not
         * kill the origin account.
         *
         * 99% of the time you want [`transfer_allow_death`] instead.
         *
         * [`transfer_allow_death`]: struct.Pallet.html#method.transfer
         */
        transfer_keep_alive: TxDescriptor<Anonymize<I4ktuaksf5i1gk>>;
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
        transfer_all: TxDescriptor<Anonymize<I9j7pagd6d4bda>>;
        /**
         * Unreserve some balance from a user by force.
         *
         * Can only be called by ROOT.
         */
        force_unreserve: TxDescriptor<Anonymize<I2h9pmio37r7fb>>;
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
        upgrade_accounts: TxDescriptor<Anonymize<Ibmr18suc9ikh9>>;
        /**
         * Set the regular balance of a given account.
         *
         * The dispatch origin for this call is `root`.
         */
        force_set_balance: TxDescriptor<Anonymize<I9iq22t0burs89>>;
        /**
         * Adjust the total issuance in a saturating way.
         *
         * Can only be called by root and always needs a positive `delta`.
         *
         * # Example
         */
        force_adjust_total_issuance: TxDescriptor<Anonymize<I5u8olqbbvfnvf>>;
        /**
         * Burn the specified liquid free balance from the origin account.
         *
         * If the origin's account ends up below the existential deposit as a result
         * of the burn and `keep_alive` is false, the account will be reaped.
         *
         * Unlike sending funds to a _burn_ address, which merely makes the funds inaccessible,
         * this `burn` operation will reduce total issuance by the amount _burned_.
         */
        burn: TxDescriptor<Anonymize<I5utcetro501ir>>;
    };
    Vesting: {
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
        vest: TxDescriptor<undefined>;
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
        vest_other: TxDescriptor<Anonymize<Id9uqtigc0il3v>>;
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
        vested_transfer: TxDescriptor<Anonymize<Ie1ni9fvcthisk>>;
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
        force_vested_transfer: TxDescriptor<Anonymize<Ia7e8nb66rbo53>>;
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
        merge_schedules: TxDescriptor<Anonymize<Ict9ivhr2c5hv0>>;
        /**
         * Force remove a vesting schedule
         *
         * The dispatch origin for this call must be _Root_.
         *
         * - `target`: An account that has a vesting schedule
         * - `schedule_index`: The vesting schedule index that should be removed
         */
        force_remove_vesting_schedule: TxDescriptor<Anonymize<I8t4vv03357lk9>>;
    };
    Claims: {
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
        claim: TxDescriptor<Anonymize<I6uag8j5aql8q>>;
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
        mint_claim: TxDescriptor<Anonymize<I54a6pqb8nsfv0>>;
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
        claim_attest: TxDescriptor<Anonymize<I1dqiovk0tpoah>>;
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
        attest: TxDescriptor<Anonymize<I1ntko0oih7v1a>>;
        /**
        
         */
        move_claim: TxDescriptor<Anonymize<I2tf5qmg09624f>>;
        /**
        
         */
        set_mint_claim_origin: TxDescriptor<Anonymize<Idhlknhp7vndhp>>;
        /**
        
         */
        set_move_claim_origin: TxDescriptor<Anonymize<Idhlknhp7vndhp>>;
    };
    Session: {
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
        set_keys: TxDescriptor<Anonymize<I52551i13hrevr>>;
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
        purge_keys: TxDescriptor<undefined>;
    };
    Grandpa: {
        /**
         * Report voter equivocation/misbehavior. This method will verify the
         * equivocation proof and validate the given key ownership proof
         * against the extracted offender. If both are valid, the offence
         * will be reported.
         */
        report_equivocation: TxDescriptor<Anonymize<Ibmti75jifitr0>>;
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
        report_equivocation_unsigned: TxDescriptor<Anonymize<Ibmti75jifitr0>>;
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
        note_stalled: TxDescriptor<Anonymize<Ichu6a94bm67kd>>;
    };
    Spin: {
        /**
         * Set new session length.
         *
         * Origin must be root.
         */
        set_session_length: TxDescriptor<Anonymize<Imsf4ordm6qea>>;
    };
    SpinAnchoring: {
        /**
         * Call when anchor verification completes
         */
        note_anchor_verified: TxDescriptor<Anonymize<Ibft7pgbru2gi2>>;
        /**
        
         */
        set_relayer: TxDescriptor<Anonymize<Ibseqhnve5i1n3>>;
    };
    Staking: {
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
        bond: TxDescriptor<Anonymize<I2eip8tc75dpje>>;
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
        bond_extra: TxDescriptor<Anonymize<I564va64vtidbq>>;
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
        unbond: TxDescriptor<Anonymize<Ie5v6njpckr05b>>;
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
        withdraw_unbonded: TxDescriptor<Anonymize<I328av3j0bgmjb>>;
        /**
         * Declare the desire to validate for the origin controller.
         *
         * Effects will be felt at the beginning of the next era.
         *
         * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
         */
        validate: TxDescriptor<Anonymize<I4tuqm9ato907i>>;
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
        nominate: TxDescriptor<Anonymize<Iagi89qt4h1lqg>>;
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
        chill: TxDescriptor<undefined>;
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
        set_payee: TxDescriptor<Anonymize<I9dgmcnuamt5p8>>;
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
        set_controller: TxDescriptor<undefined>;
        /**
         * Sets the ideal number of validators.
         *
         * The dispatch origin must be Root.
         *
         * ## Complexity
         * O(1)
         */
        set_validator_count: TxDescriptor<Anonymize<I3vh014cqgmrfd>>;
        /**
         * Increments the ideal number of validators up to maximum of
         * `ElectionProviderBase::MaxWinners`.
         *
         * The dispatch origin must be Root.
         *
         * ## Complexity
         * Same as [`Self::set_validator_count`].
         */
        increase_validator_count: TxDescriptor<Anonymize<Ifhs60omlhvt3>>;
        /**
         * Scale up the ideal number of validators by a factor up to maximum of
         * `ElectionProviderBase::MaxWinners`.
         *
         * The dispatch origin must be Root.
         *
         * ## Complexity
         * Same as [`Self::set_validator_count`].
         */
        scale_validator_count: TxDescriptor<Anonymize<If34udpd5e57vi>>;
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
        force_no_eras: TxDescriptor<undefined>;
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
        force_new_era: TxDescriptor<undefined>;
        /**
         * Set the validators who cannot be slashed (if any).
         *
         * The dispatch origin must be Root.
         */
        set_invulnerables: TxDescriptor<Anonymize<I39t01nnod9109>>;
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
        force_unstake: TxDescriptor<Anonymize<Ie5vbnd9198quk>>;
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
        force_new_era_always: TxDescriptor<undefined>;
        /**
         * Cancel enactment of a deferred slash.
         *
         * Can be called by the `T::AdminOrigin`.
         *
         * Parameters: era and indices of the slashes for that era to kill.
         * They **must** be sorted in ascending order, *and* unique.
         */
        cancel_deferred_slash: TxDescriptor<Anonymize<I3h6murn8bd4v5>>;
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
        payout_stakers: TxDescriptor<Anonymize<I6k6jf8ncesuu3>>;
        /**
         * Rebond a portion of the stash scheduled to be unlocked.
         *
         * The dispatch origin must be signed by the controller.
         *
         * ## Complexity
         * - Time complexity: O(L), where L is unlocking chunks
         * - Bounded by `MaxUnlockingChunks`.
         */
        rebond: TxDescriptor<Anonymize<Ie5v6njpckr05b>>;
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
        reap_stash: TxDescriptor<Anonymize<Ie5vbnd9198quk>>;
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
        kick: TxDescriptor<Anonymize<I3qhk481i120pk>>;
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
        set_staking_configs: TxDescriptor<Anonymize<If1qr0kbbl298c>>;
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
        chill_other: TxDescriptor<Anonymize<Idl3umm12u5pa>>;
        /**
         * Force a validator to have at least the minimum commission. This will not affect a
         * validator who already has a commission greater than or equal to the minimum. Any account
         * can call this.
         */
        force_apply_min_commission: TxDescriptor<Anonymize<I5ont0141q9ss5>>;
        /**
         * Sets the minimum amount of commission that each validators must maintain.
         *
         * This call has lower privilege requirements than `set_staking_config` and can be called
         * by the `T::AdminOrigin`. Root can always call this.
         */
        set_min_commission: TxDescriptor<Anonymize<I3vh014cqgmrfd>>;
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
        payout_stakers_by_page: TxDescriptor<Anonymize<Ie6j49utvii126>>;
        /**
         * Migrates an account's `RewardDestination::Controller` to
         * `RewardDestination::Account(controller)`.
         *
         * Effects will be felt instantly (as soon as this function is completed successfully).
         *
         * This will waive the transaction fee if the `payee` is successfully migrated.
         */
        update_payee: TxDescriptor<Anonymize<I3v6ks33uluhnj>>;
        /**
         * Updates a batch of controller accounts to their corresponding stash account if they are
         * not the same. Ignores any controller accounts that do not exist, and does not operate if
         * the stash and controller are already the same.
         *
         * Effects will be felt instantly (as soon as this function is completed successfully).
         *
         * The dispatch origin must be `T::AdminOrigin`.
         */
        deprecate_controller_batch: TxDescriptor<Anonymize<I3kiiim1cds68i>>;
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
        restore_ledger: TxDescriptor<Anonymize<I4k60mkh2r6jjg>>;
        /**
         * Removes the legacy Staking locks if they exist.
         *
         * This removes the legacy lock on the stake with [`Config::OldCurrency`] and creates a
         * hold on it if needed. If all stake cannot be held, the best effort is made to hold as
         * much as possible. The remaining stake is forced withdrawn from the ledger.
         *
         * The fee is waived if the migration is successful.
         */
        migrate_currency: TxDescriptor<Anonymize<Idl3umm12u5pa>>;
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
        manual_slash: TxDescriptor<Anonymize<Ic5njrpnvi3f8g>>;
    };
    Sudo: {
        /**
         * Authenticates the sudo key and dispatches a function call with `Root` origin.
         */
        sudo: TxDescriptor<Anonymize<I5olhh6bc9dcp6>>;
        /**
         * Authenticates the sudo key and dispatches a function call with `Root` origin.
         * This function does not check the weight of the call, and instead allows the
         * Sudo user to specify the weight of the call.
         *
         * The dispatch origin for this call must be _Signed_.
         */
        sudo_unchecked_weight: TxDescriptor<Anonymize<Idvlr5eokt20kr>>;
        /**
         * Authenticates the current sudo key and sets the given AccountId (`new`) as the new sudo
         * key.
         */
        set_key: TxDescriptor<Anonymize<I8k3rnvpeeh4hv>>;
        /**
         * Authenticates the sudo key and dispatches a function call with `Signed` origin from
         * a given account.
         *
         * The dispatch origin for this call must be _Signed_.
         */
        sudo_as: TxDescriptor<Anonymize<I8pa56fhgq0tog>>;
        /**
         * Permanently removes the sudo key.
         *
         * **This cannot be un-done.**
         */
        remove_key: TxDescriptor<undefined>;
    };
    Revive: {
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
        eth_transact: TxDescriptor<Anonymize<Ida37oe44osb06>>;
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
        call: TxDescriptor<Anonymize<Idsg8aod8e8fqn>>;
        /**
         * Instantiates a contract from a previously deployed vm binary.
         *
         * This function is identical to [`Self::instantiate_with_code`] but without the
         * code deployment step. Instead, the `code_hash` of an on-chain deployed vm binary
         * must be supplied.
         */
        instantiate: TxDescriptor<Anonymize<I46nktn22m6hbi>>;
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
        instantiate_with_code: TxDescriptor<Anonymize<Ibgj1cthra7lte>>;
        /**
         * Same as [`Self::instantiate_with_code`], but intended to be dispatched **only**
         * by an EVM transaction through the EVM compatibility layer.
         *
         * Calling this dispatchable ensures that the origin's nonce is bumped only once,
         * via the `CheckNonce` transaction extension. In contrast, [`Self::instantiate_with_code`]
         * also bumps the nonce after contract instantiation, since it may be invoked multiple
         * times within a batch call transaction.
         */
        eth_instantiate_with_code: TxDescriptor<Anonymize<I7kuv3rqu2fb7t>>;
        /**
         * Same as [`Self::call`], but intended to be dispatched **only**
         * by an EVM transaction through the EVM compatibility layer.
         */
        eth_call: TxDescriptor<Anonymize<Ic3bd1cop3eccm>>;
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
        upload_code: TxDescriptor<Anonymize<I10ra4g1rl6k2f>>;
        /**
         * Remove the code stored under `code_hash` and refund the deposit to its owner.
         *
         * A code can only be removed by its original uploader (its owner) and only if it is
         * not used by any contract.
         */
        remove_code: TxDescriptor<Anonymize<Ib51vk42m1po4n>>;
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
        set_code: TxDescriptor<Anonymize<I1uihehkdsggvp>>;
        /**
         * Register the callers account id so that it can be used in contract interactions.
         *
         * This will error if the origin is already mapped or is a eth native `Address20`. It will
         * take a deposit that can be released by calling [`Self::unmap_account`].
         */
        map_account: TxDescriptor<undefined>;
        /**
         * Unregister the callers account id in order to free the deposit.
         *
         * There is no reason to ever call this function other than freeing up the deposit.
         * This is only useful when the account should no longer be used.
         */
        unmap_account: TxDescriptor<undefined>;
        /**
         * Dispatch an `call` with the origin set to the callers fallback address.
         *
         * Every `AccountId32` can control its corresponding fallback account. The fallback account
         * is the `AccountId20` with the last 12 bytes set to `0xEE`. This is essentially a
         * recovery function in case an `AccountId20` was used without creating a mapping first.
         */
        dispatch_as_fallback_account: TxDescriptor<Anonymize<I5olhh6bc9dcp6>>;
    };
    Assets: {
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
        create: TxDescriptor<Anonymize<Ic357tcepuvo5c>>;
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
        force_create: TxDescriptor<Anonymize<I2rnoam876ruhj>>;
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
        start_destroy: TxDescriptor<Anonymize<Ic5b47dj4coa3r>>;
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
        destroy_accounts: TxDescriptor<Anonymize<Ic5b47dj4coa3r>>;
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
        destroy_approvals: TxDescriptor<Anonymize<Ic5b47dj4coa3r>>;
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
        finish_destroy: TxDescriptor<Anonymize<Ic5b47dj4coa3r>>;
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
        mint: TxDescriptor<Anonymize<Ib3qnc19gu633c>>;
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
        burn: TxDescriptor<Anonymize<Ifira6u9hi7cu1>>;
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
        transfer: TxDescriptor<Anonymize<I72tqocvdoqfff>>;
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
        transfer_keep_alive: TxDescriptor<Anonymize<I72tqocvdoqfff>>;
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
        force_transfer: TxDescriptor<Anonymize<I2i27f3sfmvc05>>;
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
        freeze: TxDescriptor<Anonymize<I1nlrtd1epki2d>>;
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
        thaw: TxDescriptor<Anonymize<I1nlrtd1epki2d>>;
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
        freeze_asset: TxDescriptor<Anonymize<Ic5b47dj4coa3r>>;
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
        thaw_asset: TxDescriptor<Anonymize<Ic5b47dj4coa3r>>;
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
        transfer_ownership: TxDescriptor<Anonymize<I3abtumcmempjs>>;
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
        set_team: TxDescriptor<Anonymize<Id81m8flopt8ha>>;
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
        set_metadata: TxDescriptor<Anonymize<I8hff7chabggkd>>;
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
        clear_metadata: TxDescriptor<Anonymize<Ic5b47dj4coa3r>>;
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
        force_set_metadata: TxDescriptor<Anonymize<I49i39mtj1ivbs>>;
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
        force_clear_metadata: TxDescriptor<Anonymize<Ic5b47dj4coa3r>>;
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
        force_asset_status: TxDescriptor<Anonymize<Ifkr2kcak2vto1>>;
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
        approve_transfer: TxDescriptor<Anonymize<I1ju6r8q0cs9jt>>;
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
        cancel_approval: TxDescriptor<Anonymize<I4kpeq6j7cd5bu>>;
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
        force_cancel_approval: TxDescriptor<Anonymize<I5na1ka76k6811>>;
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
        transfer_approved: TxDescriptor<Anonymize<I59mhdb9omdqfa>>;
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
        touch: TxDescriptor<Anonymize<Ic5b47dj4coa3r>>;
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
        refund: TxDescriptor<Anonymize<I9vl5kpk0fpakt>>;
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
        set_min_balance: TxDescriptor<Anonymize<I717jt61hu19b4>>;
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
        touch_other: TxDescriptor<Anonymize<I1nlrtd1epki2d>>;
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
        refund_other: TxDescriptor<Anonymize<I1nlrtd1epki2d>>;
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
        block: TxDescriptor<Anonymize<I1nlrtd1epki2d>>;
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
        transfer_all: TxDescriptor<Anonymize<I7f7v8192r1lmq>>;
    };
};
type IEvent = {
    System: {
        /**
         * An extrinsic completed successfully.
         */
        ExtrinsicSuccess: PlainDescriptor<Anonymize<Ia82mnkmeo2rhc>>;
        /**
         * An extrinsic failed.
         */
        ExtrinsicFailed: PlainDescriptor<Anonymize<Idl6a7r4skqaq2>>;
        /**
         * `:code` was updated.
         */
        CodeUpdated: PlainDescriptor<undefined>;
        /**
         * A new account was created.
         */
        NewAccount: PlainDescriptor<Anonymize<Icbccs0ug47ilf>>;
        /**
         * An account was reaped.
         */
        KilledAccount: PlainDescriptor<Anonymize<Icbccs0ug47ilf>>;
        /**
         * On on-chain remark happened.
         */
        Remarked: PlainDescriptor<Anonymize<I855j4i3kr8ko1>>;
        /**
         * An upgrade was authorized.
         */
        UpgradeAuthorized: PlainDescriptor<Anonymize<Ibgl04rn6nbfm6>>;
        /**
         * An invalid authorized upgrade was rejected while trying to apply it.
         */
        RejectedInvalidAuthorizedUpgrade: PlainDescriptor<Anonymize<I1731pqhub6t8e>>;
    };
    Utility: {
        /**
         * Batch of dispatches did not complete fully. Index of first failing dispatch given, as
         * well as the error.
         */
        BatchInterrupted: PlainDescriptor<Anonymize<I2p3nip7bnnmf8>>;
        /**
         * Batch of dispatches completed fully with no error.
         */
        BatchCompleted: PlainDescriptor<undefined>;
        /**
         * Batch of dispatches completed but has errors.
         */
        BatchCompletedWithErrors: PlainDescriptor<undefined>;
        /**
         * A single item within a Batch of dispatches has completed with no error.
         */
        ItemCompleted: PlainDescriptor<undefined>;
        /**
         * A single item within a Batch of dispatches has completed with error.
         */
        ItemFailed: PlainDescriptor<Anonymize<I3l007jkd0230v>>;
        /**
         * A call was dispatched.
         */
        DispatchedAs: PlainDescriptor<Anonymize<I6cjcevouls47l>>;
        /**
         * Main call was dispatched.
         */
        IfElseMainSuccess: PlainDescriptor<undefined>;
        /**
         * The fallback call was dispatched.
         */
        IfElseFallbackCalled: PlainDescriptor<Anonymize<Io573kme6lgag>>;
    };
    Multisig: {
        /**
         * A new multisig operation has begun.
         */
        NewMultisig: PlainDescriptor<Anonymize<Iep27ialq4a7o7>>;
        /**
         * A multisig operation has been approved by someone.
         */
        MultisigApproval: PlainDescriptor<Anonymize<I9pa9lkcl3m04m>>;
        /**
         * A multisig operation has been executed.
         */
        MultisigExecuted: PlainDescriptor<Anonymize<I1iorg71osages>>;
        /**
         * A multisig operation has been cancelled.
         */
        MultisigCancelled: PlainDescriptor<Anonymize<Ic9sq0g5877186>>;
        /**
         * The deposit for a multisig operation has been updated/poked.
         */
        DepositPoked: PlainDescriptor<Anonymize<I8gtde5abn1g9a>>;
    };
    Proxy: {
        /**
         * A proxy was executed correctly, with the given.
         */
        ProxyExecuted: PlainDescriptor<Anonymize<I6cjcevouls47l>>;
        /**
         * A pure account has been created by new proxy with given
         * disambiguation index and proxy type.
         */
        PureCreated: PlainDescriptor<Anonymize<I7dqtifd54vt87>>;
        /**
         * A pure proxy was killed by its spawner.
         */
        PureKilled: PlainDescriptor<Anonymize<I7nrsqbg7da4kn>>;
        /**
         * An announcement was placed to make a call in the future.
         */
        Announced: PlainDescriptor<Anonymize<I2ur0oeqg495j8>>;
        /**
         * A proxy was added.
         */
        ProxyAdded: PlainDescriptor<Anonymize<I8etnn6hovgc5s>>;
        /**
         * A proxy was removed.
         */
        ProxyRemoved: PlainDescriptor<Anonymize<I8etnn6hovgc5s>>;
        /**
         * A deposit stored for proxies or announcements was poked / updated.
         */
        DepositPoked: PlainDescriptor<Anonymize<I1bhd210c3phjj>>;
    };
    Balances: {
        /**
         * An account was created with some free balance.
         */
        Endowed: PlainDescriptor<Anonymize<Icv68aq8841478>>;
        /**
         * An account was removed whose balance was non-zero but below ExistentialDeposit,
         * resulting in an outright loss.
         */
        DustLost: PlainDescriptor<Anonymize<Ic262ibdoec56a>>;
        /**
         * Transfer succeeded.
         */
        Transfer: PlainDescriptor<Anonymize<Iflcfm9b6nlmdd>>;
        /**
         * A balance was set by root.
         */
        BalanceSet: PlainDescriptor<Anonymize<Ijrsf4mnp3eka>>;
        /**
         * Some balance was reserved (moved from free to reserved).
         */
        Reserved: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>;
        /**
         * Some balance was unreserved (moved from reserved to free).
         */
        Unreserved: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>;
        /**
         * Some balance was moved from the reserve of the first account to the second account.
         * Final argument indicates the destination balance type.
         */
        ReserveRepatriated: PlainDescriptor<Anonymize<I8tjvj9uq4b7hi>>;
        /**
         * Some amount was deposited (e.g. for transaction fees).
         */
        Deposit: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>;
        /**
         * Some amount was withdrawn from the account (e.g. for transaction fees).
         */
        Withdraw: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>;
        /**
         * Some amount was removed from the account (e.g. for misbehavior).
         */
        Slashed: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>;
        /**
         * Some amount was minted into an account.
         */
        Minted: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>;
        /**
         * Some credit was balanced and added to the TotalIssuance.
         */
        MintedCredit: PlainDescriptor<Anonymize<I3qt1hgg4djhgb>>;
        /**
         * Some amount was burned from an account.
         */
        Burned: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>;
        /**
         * Some debt has been dropped from the Total Issuance.
         */
        BurnedDebt: PlainDescriptor<Anonymize<I3qt1hgg4djhgb>>;
        /**
         * Some amount was suspended from an account (it can be restored later).
         */
        Suspended: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>;
        /**
         * Some amount was restored into an account.
         */
        Restored: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>;
        /**
         * An account was upgraded.
         */
        Upgraded: PlainDescriptor<Anonymize<I4cbvqmqadhrea>>;
        /**
         * Total issuance was increased by `amount`, creating a credit to be balanced.
         */
        Issued: PlainDescriptor<Anonymize<I3qt1hgg4djhgb>>;
        /**
         * Total issuance was decreased by `amount`, creating a debt to be balanced.
         */
        Rescinded: PlainDescriptor<Anonymize<I3qt1hgg4djhgb>>;
        /**
         * Some balance was locked.
         */
        Locked: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>;
        /**
         * Some balance was unlocked.
         */
        Unlocked: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>;
        /**
         * Some balance was frozen.
         */
        Frozen: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>;
        /**
         * Some balance was thawed.
         */
        Thawed: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>;
        /**
         * The `TotalIssuance` was forcefully changed.
         */
        TotalIssuanceForced: PlainDescriptor<Anonymize<I4fooe9dun9o0t>>;
        /**
         * Some balance was placed on hold.
         */
        Held: PlainDescriptor<Anonymize<I7spgnoibfesv6>>;
        /**
         * Held balance was burned from an account.
         */
        BurnedHeld: PlainDescriptor<Anonymize<I7spgnoibfesv6>>;
        /**
         * A transfer of `amount` on hold from `source` to `dest` was initiated.
         */
        TransferOnHold: PlainDescriptor<Anonymize<Id10ir17qugnsk>>;
        /**
         * The `transferred` balance is placed on hold at the `dest` account.
         */
        TransferAndHold: PlainDescriptor<Anonymize<If3dpbe8nibcsc>>;
        /**
         * Some balance was released from hold.
         */
        Released: PlainDescriptor<Anonymize<I7spgnoibfesv6>>;
        /**
         * An unexpected/defensive event was triggered.
         */
        Unexpected: PlainDescriptor<Anonymize<Iph9c4rn81ub2>>;
    };
    TransactionPayment: {
        /**
         * A transaction fee `actual_fee`, of which `tip` was added to the minimum inclusion fee,
         * has been paid by `who`.
         */
        TransactionFeePaid: PlainDescriptor<Anonymize<Ier2cke86dqbr2>>;
    };
    Vesting: {
        /**
         * A vesting schedule has been created.
         */
        VestingCreated: PlainDescriptor<Anonymize<Ih04jp733tqqa>>;
        /**
         * The amount vested has been updated. This could indicate a change in funds available.
         * The balance given is the amount which is left unvested (and thus locked).
         */
        VestingUpdated: PlainDescriptor<Anonymize<Ievr89968437gm>>;
        /**
         * An \[account\] has become fully vested.
         */
        VestingCompleted: PlainDescriptor<Anonymize<Icbccs0ug47ilf>>;
    };
    Claims: {
        /**
         * Someone claimed some DOTs.
         */
        Claimed: PlainDescriptor<Anonymize<Ie3hcrrq6r18fs>>;
    };
    Session: {
        /**
         * New session has happened. Note that the argument is the session index, not the
         * block number as the type might suggest.
         */
        NewSession: PlainDescriptor<Anonymize<I2hq50pu2kdjpo>>;
        /**
         * The `NewSession` event in the current block also implies a new validator set to be
         * queued.
         */
        NewQueued: PlainDescriptor<undefined>;
        /**
         * Validator has been disabled.
         */
        ValidatorDisabled: PlainDescriptor<Anonymize<I9acqruh7322g2>>;
        /**
         * Validator has been re-enabled.
         */
        ValidatorReenabled: PlainDescriptor<Anonymize<I9acqruh7322g2>>;
    };
    Grandpa: {
        /**
         * New authority set has been applied.
         */
        NewAuthorities: PlainDescriptor<Anonymize<I5768ac424h061>>;
        /**
         * Current authority set has been paused.
         */
        Paused: PlainDescriptor<undefined>;
        /**
         * Current authority set has been resumed.
         */
        Resumed: PlainDescriptor<undefined>;
    };
    Spin: {
        /**
         * New session length set.
         */
        NewSessionLength: PlainDescriptor<bigint>;
    };
    SpinAnchoring: {
        /**
         * Secure finality advanced to `up_to`.
         */
        SecureFinalityAdvanced: PlainDescriptor<Anonymize<Ibft7pgbru2gi2>>;
    };
    Staking: {
        /**
         * The era payout has been set; the first balance is the validator-payout; the second is
         * the remainder from the maximum amount of reward.
         */
        EraPaid: PlainDescriptor<Anonymize<I1au3fq4n84nv3>>;
        /**
         * The nominator has been rewarded by this amount to this destination.
         */
        Rewarded: PlainDescriptor<Anonymize<Iejaj7m7qka9tr>>;
        /**
         * A staker (validator or nominator) has been slashed by the given amount.
         */
        Slashed: PlainDescriptor<Anonymize<Idnak900lt5lm8>>;
        /**
         * A slash for the given validator, for the given percentage of their stake, at the given
         * era as been reported.
         */
        SlashReported: PlainDescriptor<Anonymize<I27n7lbd66730p>>;
        /**
         * An old slashing report from a prior era was discarded because it could
         * not be processed.
         */
        OldSlashingReportDiscarded: PlainDescriptor<Anonymize<I2hq50pu2kdjpo>>;
        /**
         * A new set of stakers was elected.
         */
        StakersElected: PlainDescriptor<undefined>;
        /**
         * An account has bonded this amount. \[stash, amount\]
         *
         * NOTE: This event is only emitted when funds are bonded via a dispatchable. Notably,
         * it will not be emitted for staking rewards when they are added to stake.
         */
        Bonded: PlainDescriptor<Anonymize<Ifk8eme5o7mukf>>;
        /**
         * An account has unbonded this amount.
         */
        Unbonded: PlainDescriptor<Anonymize<Ifk8eme5o7mukf>>;
        /**
         * An account has called `withdraw_unbonded` and removed unbonding chunks worth `Balance`
         * from the unlocking queue.
         */
        Withdrawn: PlainDescriptor<Anonymize<Ifk8eme5o7mukf>>;
        /**
         * A nominator has been kicked from a validator.
         */
        Kicked: PlainDescriptor<Anonymize<Iau4cgm6ih61cf>>;
        /**
         * The election failed. No new era is planned.
         */
        StakingElectionFailed: PlainDescriptor<undefined>;
        /**
         * An account has stopped participating as either a validator or nominator.
         */
        Chilled: PlainDescriptor<Anonymize<Idl3umm12u5pa>>;
        /**
         * A Page of stakers rewards are getting paid. `next` is `None` if all pages are claimed.
         */
        PayoutStarted: PlainDescriptor<Anonymize<Ith132hqfb27q>>;
        /**
         * A validator has set their preferences.
         */
        ValidatorPrefsSet: PlainDescriptor<Anonymize<Ic19as7nbst738>>;
        /**
         * Voters size limit reached.
         */
        SnapshotVotersSizeExceeded: PlainDescriptor<Anonymize<I54umskavgc9du>>;
        /**
         * Targets size limit reached.
         */
        SnapshotTargetsSizeExceeded: PlainDescriptor<Anonymize<I54umskavgc9du>>;
        /**
         * A new force era mode was set.
         */
        ForceEra: PlainDescriptor<Anonymize<I2ip7o9e2tc5sf>>;
        /**
         * Report of a controller batch deprecation.
         */
        ControllerBatchDeprecated: PlainDescriptor<Anonymize<I5egvk6hadac5h>>;
        /**
         * Staking balance migrated from locks to holds, with any balance that could not be held
         * is force withdrawn.
         */
        CurrencyMigrated: PlainDescriptor<Anonymize<I1td4upnup9gqv>>;
    };
    Sudo: {
        /**
         * A sudo call just took place.
         */
        Sudid: PlainDescriptor<Anonymize<I97oh0ugnukh6b>>;
        /**
         * The sudo key has been updated.
         */
        KeyChanged: PlainDescriptor<Anonymize<I5rtkmhm2dng4u>>;
        /**
         * The key was permanently removed.
         */
        KeyRemoved: PlainDescriptor<undefined>;
        /**
         * A [sudo_as](Pallet::sudo_as) call just took place.
         */
        SudoAsDone: PlainDescriptor<Anonymize<I97oh0ugnukh6b>>;
    };
    Revive: {
        /**
         * A custom event emitted by the contract.
         */
        ContractEmitted: PlainDescriptor<Anonymize<I7svbvm6hg57aj>>;
        /**
         * Contract deployed by deployer at the specified address.
         */
        Instantiated: PlainDescriptor<Anonymize<I8jhsbaiultviu>>;
    };
    Assets: {
        /**
         * Some asset class was created.
         */
        Created: PlainDescriptor<Anonymize<I88ff3u4dpivk>>;
        /**
         * Some assets were issued.
         */
        Issued: PlainDescriptor<Anonymize<I33cp947glv1ks>>;
        /**
         * Some assets were transferred.
         */
        Transferred: PlainDescriptor<Anonymize<Ic9om1gmmqu7rq>>;
        /**
         * Some assets were destroyed.
         */
        Burned: PlainDescriptor<Anonymize<I5hfov2b68ppb6>>;
        /**
         * The management team changed.
         */
        TeamChanged: PlainDescriptor<Anonymize<Ibthhb2m9vneds>>;
        /**
         * The owner changed.
         */
        OwnerChanged: PlainDescriptor<Anonymize<Iaitn5bqfacj7k>>;
        /**
         * Some account `who` was frozen.
         */
        Frozen: PlainDescriptor<Anonymize<If4ebvclj2ugvi>>;
        /**
         * Some account `who` was thawed.
         */
        Thawed: PlainDescriptor<Anonymize<If4ebvclj2ugvi>>;
        /**
         * Some asset `asset_id` was frozen.
         */
        AssetFrozen: PlainDescriptor<Anonymize<Ia5le7udkgbaq9>>;
        /**
         * Some asset `asset_id` was thawed.
         */
        AssetThawed: PlainDescriptor<Anonymize<Ia5le7udkgbaq9>>;
        /**
         * Accounts were destroyed for given asset.
         */
        AccountsDestroyed: PlainDescriptor<Anonymize<Ieduc1e6frq8rb>>;
        /**
         * Approvals were destroyed for given asset.
         */
        ApprovalsDestroyed: PlainDescriptor<Anonymize<I9h6gbtabovtm4>>;
        /**
         * An asset class is in the process of being destroyed.
         */
        DestructionStarted: PlainDescriptor<Anonymize<Ia5le7udkgbaq9>>;
        /**
         * An asset class was destroyed.
         */
        Destroyed: PlainDescriptor<Anonymize<Ia5le7udkgbaq9>>;
        /**
         * Some asset class was force-created.
         */
        ForceCreated: PlainDescriptor<Anonymize<Iaitn5bqfacj7k>>;
        /**
         * New metadata has been set for an asset.
         */
        MetadataSet: PlainDescriptor<Anonymize<Ifnsa0dkkpf465>>;
        /**
         * Metadata has been cleared for an asset.
         */
        MetadataCleared: PlainDescriptor<Anonymize<Ia5le7udkgbaq9>>;
        /**
         * (Additional) funds have been approved for transfer to a destination account.
         */
        ApprovedTransfer: PlainDescriptor<Anonymize<I65dtqr2egjbc3>>;
        /**
         * An approval for account `delegate` was cancelled by `owner`.
         */
        ApprovalCancelled: PlainDescriptor<Anonymize<Ibqj3vg5s5lk0c>>;
        /**
         * An `amount` was transferred in its entirety from `owner` to `destination` by
         * the approved `delegate`.
         */
        TransferredApproved: PlainDescriptor<Anonymize<I6l73u513p8rna>>;
        /**
         * An asset has had its attributes changed by the `Force` origin.
         */
        AssetStatusChanged: PlainDescriptor<Anonymize<Ia5le7udkgbaq9>>;
        /**
         * The min_balance of an asset has been updated by the asset owner.
         */
        AssetMinBalanceChanged: PlainDescriptor<Anonymize<Iefqmt2htu1dlu>>;
        /**
         * Some account `who` was created with a deposit from `depositor`.
         */
        Touched: PlainDescriptor<Anonymize<If8bgtgqrchjtu>>;
        /**
         * Some account `who` was blocked.
         */
        Blocked: PlainDescriptor<Anonymize<If4ebvclj2ugvi>>;
        /**
         * Some assets were deposited (e.g. for transaction fees).
         */
        Deposited: PlainDescriptor<Anonymize<Idusmq77988cmt>>;
        /**
         * Some assets were withdrawn from the account (e.g. for transaction fees).
         */
        Withdrawn: PlainDescriptor<Anonymize<Idusmq77988cmt>>;
    };
};
type IError = {
    System: {
        /**
         * The name of specification does not match between the current runtime
         * and the new runtime.
         */
        InvalidSpecName: PlainDescriptor<undefined>;
        /**
         * The specification version is not allowed to decrease between the current runtime
         * and the new runtime.
         */
        SpecVersionNeedsToIncrease: PlainDescriptor<undefined>;
        /**
         * Failed to extract the runtime version from the new runtime.
         *
         * Either calling `Core_version` or decoding `RuntimeVersion` failed.
         */
        FailedToExtractRuntimeVersion: PlainDescriptor<undefined>;
        /**
         * Suicide called when the account has non-default composite data.
         */
        NonDefaultComposite: PlainDescriptor<undefined>;
        /**
         * There is a non-zero reference count preventing the account from being purged.
         */
        NonZeroRefCount: PlainDescriptor<undefined>;
        /**
         * The origin filter prevent the call to be dispatched.
         */
        CallFiltered: PlainDescriptor<undefined>;
        /**
         * A multi-block migration is ongoing and prevents the current code from being replaced.
         */
        MultiBlockMigrationsOngoing: PlainDescriptor<undefined>;
        /**
         * No upgrade authorized.
         */
        NothingAuthorized: PlainDescriptor<undefined>;
        /**
         * The submitted code is not authorized.
         */
        Unauthorized: PlainDescriptor<undefined>;
    };
    Utility: {
        /**
         * Too many calls batched.
         */
        TooManyCalls: PlainDescriptor<undefined>;
    };
    Multisig: {
        /**
         * Threshold must be 2 or greater.
         */
        MinimumThreshold: PlainDescriptor<undefined>;
        /**
         * Call is already approved by this signatory.
         */
        AlreadyApproved: PlainDescriptor<undefined>;
        /**
         * Call doesn't need any (more) approvals.
         */
        NoApprovalsNeeded: PlainDescriptor<undefined>;
        /**
         * There are too few signatories in the list.
         */
        TooFewSignatories: PlainDescriptor<undefined>;
        /**
         * There are too many signatories in the list.
         */
        TooManySignatories: PlainDescriptor<undefined>;
        /**
         * The signatories were provided out of order; they should be ordered.
         */
        SignatoriesOutOfOrder: PlainDescriptor<undefined>;
        /**
         * The sender was contained in the other signatories; it shouldn't be.
         */
        SenderInSignatories: PlainDescriptor<undefined>;
        /**
         * Multisig operation not found in storage.
         */
        NotFound: PlainDescriptor<undefined>;
        /**
         * Only the account that originally created the multisig is able to cancel it or update
         * its deposits.
         */
        NotOwner: PlainDescriptor<undefined>;
        /**
         * No timepoint was given, yet the multisig operation is already underway.
         */
        NoTimepoint: PlainDescriptor<undefined>;
        /**
         * A different timepoint was given to the multisig operation that is underway.
         */
        WrongTimepoint: PlainDescriptor<undefined>;
        /**
         * A timepoint was given, yet no multisig operation is underway.
         */
        UnexpectedTimepoint: PlainDescriptor<undefined>;
        /**
         * The maximum weight information provided was too low.
         */
        MaxWeightTooLow: PlainDescriptor<undefined>;
        /**
         * The data to be stored is already stored.
         */
        AlreadyStored: PlainDescriptor<undefined>;
    };
    Proxy: {
        /**
         * There are too many proxies registered or too many announcements pending.
         */
        TooMany: PlainDescriptor<undefined>;
        /**
         * Proxy registration not found.
         */
        NotFound: PlainDescriptor<undefined>;
        /**
         * Sender is not a proxy of the account to be proxied.
         */
        NotProxy: PlainDescriptor<undefined>;
        /**
         * A call which is incompatible with the proxy type's filter was attempted.
         */
        Unproxyable: PlainDescriptor<undefined>;
        /**
         * Account is already a proxy.
         */
        Duplicate: PlainDescriptor<undefined>;
        /**
         * Call may not be made by proxy because it may escalate its privileges.
         */
        NoPermission: PlainDescriptor<undefined>;
        /**
         * Announcement, if made at all, was made too recently.
         */
        Unannounced: PlainDescriptor<undefined>;
        /**
         * Cannot add self as proxy.
         */
        NoSelfProxy: PlainDescriptor<undefined>;
    };
    Balances: {
        /**
         * Vesting balance too high to send value.
         */
        VestingBalance: PlainDescriptor<undefined>;
        /**
         * Account liquidity restrictions prevent withdrawal.
         */
        LiquidityRestrictions: PlainDescriptor<undefined>;
        /**
         * Balance too low to send value.
         */
        InsufficientBalance: PlainDescriptor<undefined>;
        /**
         * Value too low to create account due to existential deposit.
         */
        ExistentialDeposit: PlainDescriptor<undefined>;
        /**
         * Transfer/payment would kill account.
         */
        Expendability: PlainDescriptor<undefined>;
        /**
         * A vesting schedule already exists for this account.
         */
        ExistingVestingSchedule: PlainDescriptor<undefined>;
        /**
         * Beneficiary account must pre-exist.
         */
        DeadAccount: PlainDescriptor<undefined>;
        /**
         * Number of named reserves exceed `MaxReserves`.
         */
        TooManyReserves: PlainDescriptor<undefined>;
        /**
         * Number of holds exceed `VariantCountOf<T::RuntimeHoldReason>`.
         */
        TooManyHolds: PlainDescriptor<undefined>;
        /**
         * Number of freezes exceed `MaxFreezes`.
         */
        TooManyFreezes: PlainDescriptor<undefined>;
        /**
         * The issuance cannot be modified since it is already deactivated.
         */
        IssuanceDeactivated: PlainDescriptor<undefined>;
        /**
         * The delta cannot be zero.
         */
        DeltaZero: PlainDescriptor<undefined>;
    };
    Vesting: {
        /**
         * The account given is not vesting.
         */
        NotVesting: PlainDescriptor<undefined>;
        /**
         * The account already has `MaxVestingSchedules` count of schedules and thus
         * cannot add another one. Consider merging existing schedules in order to add another.
         */
        AtMaxVestingSchedules: PlainDescriptor<undefined>;
        /**
         * Amount being transferred is too low to create a vesting schedule.
         */
        AmountLow: PlainDescriptor<undefined>;
        /**
         * An index was out of bounds of the vesting schedules.
         */
        ScheduleIndexOutOfBounds: PlainDescriptor<undefined>;
        /**
         * Failed to create a new schedule because some parameter was invalid.
         */
        InvalidScheduleParams: PlainDescriptor<undefined>;
    };
    Claims: {
        /**
         * Invalid Ethereum signature.
         */
        InvalidEthereumSignature: PlainDescriptor<undefined>;
        /**
         * Ethereum address has no claim.
         */
        SignerHasNoClaim: PlainDescriptor<undefined>;
        /**
         * Account ID sending transaction has no claim.
         */
        SenderHasNoClaim: PlainDescriptor<undefined>;
        /**
         * There's not enough in the pot to pay out some unvested amount. Generally implies a
         * logic error.
         */
        PotUnderflow: PlainDescriptor<undefined>;
        /**
         * A needed statement was not included.
         */
        InvalidStatement: PlainDescriptor<undefined>;
        /**
         * The account already has a vested balance.
         */
        VestedBalanceExists: PlainDescriptor<undefined>;
    };
    Session: {
        /**
         * Invalid ownership proof.
         */
        InvalidProof: PlainDescriptor<undefined>;
        /**
         * No associated validator ID for account.
         */
        NoAssociatedValidatorId: PlainDescriptor<undefined>;
        /**
         * Registered duplicate key.
         */
        DuplicatedKey: PlainDescriptor<undefined>;
        /**
         * No keys are associated with this account.
         */
        NoKeys: PlainDescriptor<undefined>;
        /**
         * Key setting account is not live, so it's impossible to associate keys.
         */
        NoAccount: PlainDescriptor<undefined>;
    };
    Grandpa: {
        /**
         * Attempt to signal GRANDPA pause when the authority set isn't live
         * (either paused or already pending pause).
         */
        PauseFailed: PlainDescriptor<undefined>;
        /**
         * Attempt to signal GRANDPA resume when the authority set isn't paused
         * (either live or already pending resume).
         */
        ResumeFailed: PlainDescriptor<undefined>;
        /**
         * Attempt to signal GRANDPA change with one already pending.
         */
        ChangePending: PlainDescriptor<undefined>;
        /**
         * Cannot signal forced change so soon after last.
         */
        TooSoon: PlainDescriptor<undefined>;
        /**
         * A key ownership proof provided as part of an equivocation report is invalid.
         */
        InvalidKeyOwnershipProof: PlainDescriptor<undefined>;
        /**
         * An equivocation proof provided as part of an equivocation report is invalid.
         */
        InvalidEquivocationProof: PlainDescriptor<undefined>;
        /**
         * A given equivocation report is valid but already previously reported.
         */
        DuplicateOffenceReport: PlainDescriptor<undefined>;
    };
    Spin: {
        /**
         * Zero session length.
         */
        SessionLengthZero: PlainDescriptor<undefined>;
    };
    Staking: {
        /**
         * Not a controller account.
         */
        NotController: PlainDescriptor<undefined>;
        /**
         * Not a stash account.
         */
        NotStash: PlainDescriptor<undefined>;
        /**
         * Stash is already bonded.
         */
        AlreadyBonded: PlainDescriptor<undefined>;
        /**
         * Controller is already paired.
         */
        AlreadyPaired: PlainDescriptor<undefined>;
        /**
         * Targets cannot be empty.
         */
        EmptyTargets: PlainDescriptor<undefined>;
        /**
         * Duplicate index.
         */
        DuplicateIndex: PlainDescriptor<undefined>;
        /**
         * Slash record index out of bounds.
         */
        InvalidSlashIndex: PlainDescriptor<undefined>;
        /**
         * Cannot have a validator or nominator role, with value less than the minimum defined by
         * governance (see `MinValidatorBond` and `MinNominatorBond`). If unbonding is the
         * intention, `chill` first to remove one's role as validator/nominator.
         */
        InsufficientBond: PlainDescriptor<undefined>;
        /**
         * Can not schedule more unlock chunks.
         */
        NoMoreChunks: PlainDescriptor<undefined>;
        /**
         * Can not rebond without unlocking chunks.
         */
        NoUnlockChunk: PlainDescriptor<undefined>;
        /**
         * Attempting to target a stash that still has funds.
         */
        FundedTarget: PlainDescriptor<undefined>;
        /**
         * Invalid era to reward.
         */
        InvalidEraToReward: PlainDescriptor<undefined>;
        /**
         * Invalid number of nominations.
         */
        InvalidNumberOfNominations: PlainDescriptor<undefined>;
        /**
         * Items are not sorted and unique.
         */
        NotSortedAndUnique: PlainDescriptor<undefined>;
        /**
         * Rewards for this era have already been claimed for this validator.
         */
        AlreadyClaimed: PlainDescriptor<undefined>;
        /**
         * No nominators exist on this page.
         */
        InvalidPage: PlainDescriptor<undefined>;
        /**
         * Incorrect previous history depth input provided.
         */
        IncorrectHistoryDepth: PlainDescriptor<undefined>;
        /**
         * Incorrect number of slashing spans provided.
         */
        IncorrectSlashingSpans: PlainDescriptor<undefined>;
        /**
         * Internal state has become somehow corrupted and the operation cannot continue.
         */
        BadState: PlainDescriptor<undefined>;
        /**
         * Too many nomination targets supplied.
         */
        TooManyTargets: PlainDescriptor<undefined>;
        /**
         * A nomination target was supplied that was blocked or otherwise not a validator.
         */
        BadTarget: PlainDescriptor<undefined>;
        /**
         * The user has enough bond and thus cannot be chilled forcefully by an external person.
         */
        CannotChillOther: PlainDescriptor<undefined>;
        /**
         * There are too many nominators in the system. Governance needs to adjust the staking
         * settings to keep things safe for the runtime.
         */
        TooManyNominators: PlainDescriptor<undefined>;
        /**
         * There are too many validator candidates in the system. Governance needs to adjust the
         * staking settings to keep things safe for the runtime.
         */
        TooManyValidators: PlainDescriptor<undefined>;
        /**
         * Commission is too low. Must be at least `MinCommission`.
         */
        CommissionTooLow: PlainDescriptor<undefined>;
        /**
         * Some bound is not met.
         */
        BoundNotMet: PlainDescriptor<undefined>;
        /**
         * Used when attempting to use deprecated controller account logic.
         */
        ControllerDeprecated: PlainDescriptor<undefined>;
        /**
         * Cannot reset a ledger.
         */
        CannotRestoreLedger: PlainDescriptor<undefined>;
        /**
         * Provided reward destination is not allowed.
         */
        RewardDestinationRestricted: PlainDescriptor<undefined>;
        /**
         * Not enough funds available to withdraw.
         */
        NotEnoughFunds: PlainDescriptor<undefined>;
        /**
         * Operation not allowed for virtual stakers.
         */
        VirtualStakerNotAllowed: PlainDescriptor<undefined>;
        /**
         * Stash could not be reaped as other pallet might depend on it.
         */
        CannotReapStash: PlainDescriptor<undefined>;
        /**
         * The stake of this account is already migrated to `Fungible` holds.
         */
        AlreadyMigrated: PlainDescriptor<undefined>;
        /**
         * Account is restricted from participation in staking. This may happen if the account is
         * staking in another way already, such as via pool.
         */
        Restricted: PlainDescriptor<undefined>;
    };
    Sudo: {
        /**
         * Sender must be the Sudo account.
         */
        RequireSudo: PlainDescriptor<undefined>;
    };
    Revive: {
        /**
         * Invalid schedule supplied, e.g. with zero weight of a basic operation.
         */
        InvalidSchedule: PlainDescriptor<undefined>;
        /**
         * Invalid combination of flags supplied to `seal_call` or `seal_delegate_call`.
         */
        InvalidCallFlags: PlainDescriptor<undefined>;
        /**
         * The executed contract exhausted its gas limit.
         */
        OutOfGas: PlainDescriptor<undefined>;
        /**
         * Performing the requested transfer failed. Probably because there isn't enough
         * free balance in the sender's account.
         */
        TransferFailed: PlainDescriptor<undefined>;
        /**
         * Performing a call was denied because the calling depth reached the limit
         * of what is specified in the schedule.
         */
        MaxCallDepthReached: PlainDescriptor<undefined>;
        /**
         * No contract was found at the specified address.
         */
        ContractNotFound: PlainDescriptor<undefined>;
        /**
         * No code could be found at the supplied code hash.
         */
        CodeNotFound: PlainDescriptor<undefined>;
        /**
         * No code info could be found at the supplied code hash.
         */
        CodeInfoNotFound: PlainDescriptor<undefined>;
        /**
         * A buffer outside of sandbox memory was passed to a contract API function.
         */
        OutOfBounds: PlainDescriptor<undefined>;
        /**
         * Input passed to a contract API function failed to decode as expected type.
         */
        DecodingFailed: PlainDescriptor<undefined>;
        /**
         * Contract trapped during execution.
         */
        ContractTrapped: PlainDescriptor<undefined>;
        /**
         * Event body or storage item exceeds [`limits::PAYLOAD_BYTES`].
         */
        ValueTooLarge: PlainDescriptor<undefined>;
        /**
         * Termination of a contract is not allowed while the contract is already
         * on the call stack. Can be triggered by `seal_terminate`.
         */
        TerminatedWhileReentrant: PlainDescriptor<undefined>;
        /**
         * `seal_call` forwarded this contracts input. It therefore is no longer available.
         */
        InputForwarded: PlainDescriptor<undefined>;
        /**
         * The amount of topics passed to `seal_deposit_events` exceeds the limit.
         */
        TooManyTopics: PlainDescriptor<undefined>;
        /**
         * A contract with the same AccountId already exists.
         */
        DuplicateContract: PlainDescriptor<undefined>;
        /**
         * A contract self destructed in its constructor.
         *
         * This can be triggered by a call to `seal_terminate`.
         */
        TerminatedInConstructor: PlainDescriptor<undefined>;
        /**
         * A call tried to invoke a contract that is flagged as non-reentrant.
         */
        ReentranceDenied: PlainDescriptor<undefined>;
        /**
         * A contract called into the runtime which then called back into this pallet.
         */
        ReenteredPallet: PlainDescriptor<undefined>;
        /**
         * A contract attempted to invoke a state modifying API while being in read-only mode.
         */
        StateChangeDenied: PlainDescriptor<undefined>;
        /**
         * Origin doesn't have enough balance to pay the required storage deposits.
         */
        StorageDepositNotEnoughFunds: PlainDescriptor<undefined>;
        /**
         * More storage was created than allowed by the storage deposit limit.
         */
        StorageDepositLimitExhausted: PlainDescriptor<undefined>;
        /**
         * Code removal was denied because the code is still in use by at least one contract.
         */
        CodeInUse: PlainDescriptor<undefined>;
        /**
         * The contract ran to completion but decided to revert its storage changes.
         * Please note that this error is only returned from extrinsics. When called directly
         * or via RPC an `Ok` will be returned. In this case the caller needs to inspect the flags
         * to determine whether a reversion has taken place.
         */
        ContractReverted: PlainDescriptor<undefined>;
        /**
         * The contract failed to compile or is missing the correct entry points.
         *
         * A more detailed error can be found on the node console if debug messages are enabled
         * by supplying `-lruntime::revive=debug`.
         */
        CodeRejected: PlainDescriptor<undefined>;
        /**
         * The code blob supplied is larger than [`limits::code::BLOB_BYTES`].
         */
        BlobTooLarge: PlainDescriptor<undefined>;
        /**
         * The contract declares too much memory (ro + rw + stack).
         */
        StaticMemoryTooLarge: PlainDescriptor<undefined>;
        /**
         * The program contains a basic block that is larger than allowed.
         */
        BasicBlockTooLarge: PlainDescriptor<undefined>;
        /**
         * The program contains an invalid instruction.
         */
        InvalidInstruction: PlainDescriptor<undefined>;
        /**
         * The contract has reached its maximum number of delegate dependencies.
         */
        MaxDelegateDependenciesReached: PlainDescriptor<undefined>;
        /**
         * The dependency was not found in the contract's delegate dependencies.
         */
        DelegateDependencyNotFound: PlainDescriptor<undefined>;
        /**
         * The contract already depends on the given delegate dependency.
         */
        DelegateDependencyAlreadyExists: PlainDescriptor<undefined>;
        /**
         * Can not add a delegate dependency to the code hash of the contract itself.
         */
        CannotAddSelfAsDelegateDependency: PlainDescriptor<undefined>;
        /**
         * Can not add more data to transient storage.
         */
        OutOfTransientStorage: PlainDescriptor<undefined>;
        /**
         * The contract tried to call a syscall which does not exist (at its current api level).
         */
        InvalidSyscall: PlainDescriptor<undefined>;
        /**
         * Invalid storage flags were passed to one of the storage syscalls.
         */
        InvalidStorageFlags: PlainDescriptor<undefined>;
        /**
         * PolkaVM failed during code execution. Probably due to a malformed program.
         */
        ExecutionFailed: PlainDescriptor<undefined>;
        /**
         * Failed to convert a U256 to a Balance.
         */
        BalanceConversionFailed: PlainDescriptor<undefined>;
        /**
         * Immutable data can only be set during deploys and only be read during calls.
         * Additionally, it is only valid to set the data once and it must not be empty.
         */
        InvalidImmutableAccess: PlainDescriptor<undefined>;
        /**
         * An `AccountID32` account tried to interact with the pallet without having a mapping.
         *
         * Call [`Pallet::map_account`] in order to create a mapping for the account.
         */
        AccountUnmapped: PlainDescriptor<undefined>;
        /**
         * Tried to map an account that is already mapped.
         */
        AccountAlreadyMapped: PlainDescriptor<undefined>;
        /**
         * The transaction used to dry-run a contract is invalid.
         */
        InvalidGenericTransaction: PlainDescriptor<undefined>;
        /**
         * The refcount of a code either over or underflowed.
         */
        RefcountOverOrUnderflow: PlainDescriptor<undefined>;
        /**
         * Unsupported precompile address.
         */
        UnsupportedPrecompileAddress: PlainDescriptor<undefined>;
        /**
         * The calldata exceeds [`limits::CALLDATA_BYTES`].
         */
        CallDataTooLarge: PlainDescriptor<undefined>;
        /**
         * The return data exceeds [`limits::CALLDATA_BYTES`].
         */
        ReturnDataTooLarge: PlainDescriptor<undefined>;
    };
    Assets: {
        /**
         * Account balance must be greater than or equal to the transfer amount.
         */
        BalanceLow: PlainDescriptor<undefined>;
        /**
         * The account to alter does not exist.
         */
        NoAccount: PlainDescriptor<undefined>;
        /**
         * The signing account has no permission to do the operation.
         */
        NoPermission: PlainDescriptor<undefined>;
        /**
         * The given asset ID is unknown.
         */
        Unknown: PlainDescriptor<undefined>;
        /**
         * The origin account is frozen.
         */
        Frozen: PlainDescriptor<undefined>;
        /**
         * The asset ID is already taken.
         */
        InUse: PlainDescriptor<undefined>;
        /**
         * Invalid witness data given.
         */
        BadWitness: PlainDescriptor<undefined>;
        /**
         * Minimum balance should be non-zero.
         */
        MinBalanceZero: PlainDescriptor<undefined>;
        /**
         * Unable to increment the consumer reference counters on the account. Either no provider
         * reference exists to allow a non-zero balance of a non-self-sufficient asset, or one
         * fewer then the maximum number of consumers has been reached.
         */
        UnavailableConsumer: PlainDescriptor<undefined>;
        /**
         * Invalid metadata given.
         */
        BadMetadata: PlainDescriptor<undefined>;
        /**
         * No approval exists that would allow the transfer.
         */
        Unapproved: PlainDescriptor<undefined>;
        /**
         * The source account would not survive the transfer and it needs to stay alive.
         */
        WouldDie: PlainDescriptor<undefined>;
        /**
         * The asset-account already exists.
         */
        AlreadyExists: PlainDescriptor<undefined>;
        /**
         * The asset-account doesn't have an associated deposit.
         */
        NoDeposit: PlainDescriptor<undefined>;
        /**
         * The operation would result in funds being burned.
         */
        WouldBurn: PlainDescriptor<undefined>;
        /**
         * The asset is a live asset and is actively being used. Usually emit for operations such
         * as `start_destroy` which require the asset to be in a destroying state.
         */
        LiveAsset: PlainDescriptor<undefined>;
        /**
         * The asset is not live, and likely being destroyed.
         */
        AssetNotLive: PlainDescriptor<undefined>;
        /**
         * The asset status is not the expected status.
         */
        IncorrectStatus: PlainDescriptor<undefined>;
        /**
         * The asset should be frozen before the given operation.
         */
        NotFrozen: PlainDescriptor<undefined>;
        /**
         * Callback action resulted in error
         */
        CallbackFailed: PlainDescriptor<undefined>;
        /**
         * The asset ID must be equal to the [`NextAssetId`].
         */
        BadAssetId: PlainDescriptor<undefined>;
        /**
         * The asset cannot be destroyed because some accounts for this asset contain freezes.
         */
        ContainsFreezes: PlainDescriptor<undefined>;
        /**
         * The asset cannot be destroyed because some accounts for this asset contain holds.
         */
        ContainsHolds: PlainDescriptor<undefined>;
    };
};
type IConstants = {
    System: {
        /**
         * Block & extrinsics weights: base values and limits.
         */
        BlockWeights: PlainDescriptor<Anonymize<In7a38730s6qs>>;
        /**
         * The maximum length of a block (in bytes).
         */
        BlockLength: PlainDescriptor<Anonymize<If15el53dd76v9>>;
        /**
         * Maximum number of block number to block hash mappings to keep (oldest pruned first).
         */
        BlockHashCount: PlainDescriptor<bigint>;
        /**
         * The weight of runtime database operations the runtime can invoke.
         */
        DbWeight: PlainDescriptor<Anonymize<I9s0ave7t0vnrk>>;
        /**
         * Get the chain's in-code version.
         */
        Version: PlainDescriptor<Anonymize<I4fo08joqmcqnm>>;
        /**
         * The designated SS58 prefix of this chain.
         *
         * This replaces the "ss58Format" property declared in the chain spec. Reason is
         * that the runtime should know about the prefix in order to make use of it as
         * an identifier of the chain.
         */
        SS58Prefix: PlainDescriptor<number>;
    };
    Timestamp: {
        /**
         * The minimum period between blocks.
         *
         * Be aware that this is different to the *expected* period that the block production
         * apparatus provides. Your chosen consensus system will generally work with this to
         * determine a sensible block time. For example, in the Aura pallet it will be double this
         * period on default settings.
         */
        MinimumPeriod: PlainDescriptor<bigint>;
    };
    Utility: {
        /**
         * The limit on the number of batched calls.
         */
        batched_calls_limit: PlainDescriptor<number>;
    };
    Multisig: {
        /**
         * The base amount of currency needed to reserve for creating a multisig execution or to
         * store a dispatch call for later.
         *
         * This is held for an additional storage item whose value size is
         * `4 + sizeof((BlockNumber, Balance, AccountId))` bytes and whose key size is
         * `32 + sizeof(AccountId)` bytes.
         */
        DepositBase: PlainDescriptor<bigint>;
        /**
         * The amount of currency needed per unit threshold when creating a multisig execution.
         *
         * This is held for adding 32 bytes more into a pre-existing storage value.
         */
        DepositFactor: PlainDescriptor<bigint>;
        /**
         * The maximum amount of signatories allowed in the multisig.
         */
        MaxSignatories: PlainDescriptor<number>;
    };
    Proxy: {
        /**
         * The base amount of currency needed to reserve for creating a proxy.
         *
         * This is held for an additional storage item whose value size is
         * `sizeof(Balance)` bytes and whose key size is `sizeof(AccountId)` bytes.
         */
        ProxyDepositBase: PlainDescriptor<bigint>;
        /**
         * The amount of currency needed per proxy added.
         *
         * This is held for adding 32 bytes plus an instance of `ProxyType` more into a
         * pre-existing storage value. Thus, when configuring `ProxyDepositFactor` one should take
         * into account `32 + proxy_type.encode().len()` bytes of data.
         */
        ProxyDepositFactor: PlainDescriptor<bigint>;
        /**
         * The maximum amount of proxies allowed for a single account.
         */
        MaxProxies: PlainDescriptor<number>;
        /**
         * The maximum amount of time-delayed announcements that are allowed to be pending.
         */
        MaxPending: PlainDescriptor<number>;
        /**
         * The base amount of currency needed to reserve for creating an announcement.
         *
         * This is held when a new storage item holding a `Balance` is created (typically 16
         * bytes).
         */
        AnnouncementDepositBase: PlainDescriptor<bigint>;
        /**
         * The amount of currency needed per announcement made.
         *
         * This is held for adding an `AccountId`, `Hash` and `BlockNumber` (typically 68 bytes)
         * into a pre-existing storage value.
         */
        AnnouncementDepositFactor: PlainDescriptor<bigint>;
    };
    Balances: {
        /**
         * The minimum amount required to keep an account open. MUST BE GREATER THAN ZERO!
         *
         * If you *really* need it to be zero, you can enable the feature `insecure_zero_ed` for
         * this pallet. However, you do so at your own risk: this will open up a major DoS vector.
         * In case you have multiple sources of provider references, you may also get unexpected
         * behaviour if you set this to zero.
         *
         * Bottom line: Do yourself a favour and make it at least one!
         */
        ExistentialDeposit: PlainDescriptor<bigint>;
        /**
         * The maximum number of locks that should exist on an account.
         * Not strictly enforced, but used for weight estimation.
         *
         * Use of locks is deprecated in favour of freezes. See `https://github.com/paritytech/substrate/pull/12951/`
         */
        MaxLocks: PlainDescriptor<number>;
        /**
         * The maximum number of named reserves that can exist on an account.
         *
         * Use of reserves is deprecated in favour of holds. See `https://github.com/paritytech/substrate/pull/12951/`
         */
        MaxReserves: PlainDescriptor<number>;
        /**
         * The maximum number of individual freeze locks that can exist on an account at any time.
         */
        MaxFreezes: PlainDescriptor<number>;
    };
    TransactionPayment: {
        /**
         * A fee multiplier for `Operational` extrinsics to compute "virtual tip" to boost their
         * `priority`
         *
         * This value is multiplied by the `final_fee` to obtain a "virtual tip" that is later
         * added to a tip component in regular `priority` calculations.
         * It means that a `Normal` transaction can front-run a similarly-sized `Operational`
         * extrinsic (with no tip), by including a tip value greater than the virtual tip.
         *
         * ```rust,ignore
         * // For `Normal`
         * let priority = priority_calc(tip);
         *
         * // For `Operational`
         * let virtual_tip = (inclusion_fee + tip) * OperationalFeeMultiplier;
         * let priority = priority_calc(tip + virtual_tip);
         * ```
         *
         * Note that since we use `final_fee` the multiplier applies also to the regular `tip`
         * sent with the transaction. So, not only does the transaction get a priority bump based
         * on the `inclusion_fee`, but we also amplify the impact of tips applied to `Operational`
         * transactions.
         */
        OperationalFeeMultiplier: PlainDescriptor<number>;
    };
    Vesting: {
        /**
         * The minimum amount transferred to call `vested_transfer`.
         */
        MinVestedTransfer: PlainDescriptor<bigint>;
        /**
        
         */
        MaxVestingSchedules: PlainDescriptor<number>;
    };
    Claims: {
        /**
        
         */
        Prefix: PlainDescriptor<Binary>;
    };
    Session: {
        /**
         * The amount to be held when setting keys.
         */
        KeyDeposit: PlainDescriptor<bigint>;
    };
    Grandpa: {
        /**
         * Max Authorities in use
         */
        MaxAuthorities: PlainDescriptor<number>;
        /**
         * The maximum number of nominators for each validator.
         */
        MaxNominators: PlainDescriptor<number>;
        /**
         * The maximum number of entries to keep in the set id to session index mapping.
         *
         * Since the `SetIdSession` map is only used for validating equivocations this
         * value should relate to the bonding duration of whatever staking system is
         * being used (if any). If equivocation handling is not enabled then this value
         * can be zero.
         */
        MaxSetIdSessionEntries: PlainDescriptor<bigint>;
    };
    Spin: {
        /**
         * The slot duration SPIN should run with, expressed in milliseconds.
         * The effective value of this type should not change while the chain
         * is running.
         *
         * For backwards compatibility either use [`MinimumPeriodTimesTwo`] or
         * a const.
         */
        SlotDuration: PlainDescriptor<bigint>;
        /**
         * Default session length in blocks.
         */
        DefaultSessionLength: PlainDescriptor<bigint>;
    };
    Staking: {
        /**
         * Number of eras to keep in history.
         *
         * Following information is kept for eras in `[current_era -
         * HistoryDepth, current_era]`: `ErasStakers`, `ErasStakersClipped`,
         * `ErasValidatorPrefs`, `ErasValidatorReward`, `ErasRewardPoints`,
         * `ErasTotalStake`, `ErasStartSessionIndex`, `ClaimedRewards`, `ErasStakersPaged`,
         * `ErasStakersOverview`.
         *
         * Must be more than the number of eras delayed by session.
         * I.e. active era must always be in history. I.e. `active_era >
         * current_era - history_depth` must be guaranteed.
         *
         * If migrating an existing pallet from storage value to config value,
         * this should be set to same value or greater as in storage.
         *
         * Note: `HistoryDepth` is used as the upper bound for the `BoundedVec`
         * item `StakingLedger.legacy_claimed_rewards`. Setting this value lower than
         * the existing value can lead to inconsistencies in the
         * `StakingLedger` and will need to be handled properly in a migration.
         * The test `reducing_history_depth_abrupt` shows this effect.
         */
        HistoryDepth: PlainDescriptor<number>;
        /**
         * Number of sessions per era.
         */
        SessionsPerEra: PlainDescriptor<number>;
        /**
         * Number of eras that staked funds must remain bonded for.
         */
        BondingDuration: PlainDescriptor<number>;
        /**
         * Number of eras that slashes are deferred by, after computation.
         *
         * This should be less than the bonding duration. Set to 0 if slashes
         * should be applied immediately, without opportunity for intervention.
         */
        SlashDeferDuration: PlainDescriptor<number>;
        /**
         * The maximum size of each `T::ExposurePage`.
         *
         * An `ExposurePage` is weakly bounded to a maximum of `MaxExposurePageSize`
         * nominators.
         *
         * For older non-paged exposure, a reward payout was restricted to the top
         * `MaxExposurePageSize` nominators. This is to limit the i/o cost for the
         * nominator payout.
         *
         * Note: `MaxExposurePageSize` is used to bound `ClaimedRewards` and is unsafe to reduce
         * without handling it in a migration.
         */
        MaxExposurePageSize: PlainDescriptor<number>;
        /**
         * The absolute maximum of winner validators this pallet should return.
         */
        MaxValidatorSet: PlainDescriptor<number>;
        /**
         * The maximum number of `unlocking` chunks a [`StakingLedger`] can
         * have. Effectively determines how many unique eras a staker may be
         * unbonding in.
         *
         * Note: `MaxUnlockingChunks` is used as the upper bound for the
         * `BoundedVec` item `StakingLedger.unlocking`. Setting this value
         * lower than the existing value can lead to inconsistencies in the
         * `StakingLedger` and will need to be handled properly in a runtime
         * migration. The test `reducing_max_unlocking_chunks_abrupt` shows
         * this effect.
         */
        MaxUnlockingChunks: PlainDescriptor<number>;
    };
    Revive: {
        /**
         * The amount of balance a caller has to pay for each byte of storage.
         *
         * # Note
         *
         * It is safe to change this value on a live chain as all refunds are pro rata.
         */
        DepositPerByte: PlainDescriptor<bigint>;
        /**
         * The amount of balance a caller has to pay for each storage item.
         *
         * # Note
         *
         * It is safe to change this value on a live chain as all refunds are pro rata.
         */
        DepositPerItem: PlainDescriptor<bigint>;
        /**
         * The percentage of the storage deposit that should be held for using a code hash.
         * Instantiating a contract, protects the code from being removed. In order to prevent
         * abuse these actions are protected with a percentage of the code deposit.
         */
        CodeHashLockupDepositPercent: PlainDescriptor<number>;
        /**
         * Make contract callable functions marked as `#[unstable]` available.
         *
         * Contracts that use `#[unstable]` functions won't be able to be uploaded unless
         * this is set to `true`. This is only meant for testnets and dev nodes in order to
         * experiment with new features.
         *
         * # Warning
         *
         * Do **not** set to `true` on productions chains.
         */
        UnsafeUnstableInterface: PlainDescriptor<boolean>;
        /**
         * Allow EVM bytecode to be uploaded and instantiated.
         */
        AllowEVMBytecode: PlainDescriptor<boolean>;
        /**
         * The [EIP-155](https://eips.ethereum.org/EIPS/eip-155) chain ID.
         *
         * This is a unique identifier assigned to each blockchain network,
         * preventing replay attacks.
         */
        ChainId: PlainDescriptor<bigint>;
        /**
         * The ratio between the decimal representation of the native token and the ETH token.
         */
        NativeToEthRatio: PlainDescriptor<number>;
    };
    Assets: {
        /**
         * Max number of items to destroy per `destroy_accounts` and `destroy_approvals` call.
         *
         * Must be configured to result in a weight that makes each call fit in a block.
         */
        RemoveItemsLimit: PlainDescriptor<number>;
        /**
         * The basic amount of funds that must be reserved for an asset.
         */
        AssetDeposit: PlainDescriptor<bigint>;
        /**
         * The amount of funds that must be reserved for a non-provider asset account to be
         * maintained.
         */
        AssetAccountDeposit: PlainDescriptor<bigint>;
        /**
         * The basic amount of funds that must be reserved when adding metadata to your asset.
         */
        MetadataDepositBase: PlainDescriptor<bigint>;
        /**
         * The additional funds that must be reserved for the number of bytes you store in your
         * metadata.
         */
        MetadataDepositPerByte: PlainDescriptor<bigint>;
        /**
         * The amount of funds that must be reserved when creating a new approval.
         */
        ApprovalDeposit: PlainDescriptor<bigint>;
        /**
         * The maximum length of a name or symbol stored on-chain.
         */
        StringLimit: PlainDescriptor<number>;
    };
};
type IViewFns = {
    Proxy: {
        /**
         * Check if a `RuntimeCall` is allowed for a given `ProxyType`.
         */
        check_permissions: RuntimeDescriptor<[call: Anonymize<Id8d6irn91bma1>, proxy_type: Anonymize<Ifld93hq4fhrsi>], boolean>;
        /**
         * Check if one `ProxyType` is a subset of another `ProxyType`.
         */
        is_superset: RuntimeDescriptor<[to_check: Anonymize<Ifld93hq4fhrsi>, against: Anonymize<Ifld93hq4fhrsi>], boolean>;
    };
};
type IRuntimeCalls = {
    /**
     * The `Core` runtime api that every Substrate runtime needs to implement.
     */
    Core: {
        /**
         * Returns the version of the runtime.
         */
        version: RuntimeDescriptor<[], Anonymize<I4fo08joqmcqnm>>;
        /**
         * Execute the given block.
         */
        execute_block: RuntimeDescriptor<[block: Anonymize<I1e13lcoj2ijct>], undefined>;
        /**
         * Initialize a block with the given header and return the runtime executive mode.
         */
        initialize_block: RuntimeDescriptor<[header: Anonymize<Idcpi3jpt0c03v>], Anonymize<I2v50gu3s1aqk6>>;
    };
    /**
     * The `Metadata` api trait that returns metadata for the runtime.
     */
    Metadata: {
        /**
         * Returns the metadata of a runtime.
         */
        metadata: RuntimeDescriptor<[], Binary>;
        /**
         * Returns the metadata at a given version.
         *
         * If the given `version` isn't supported, this will return `None`.
         * Use [`Self::metadata_versions`] to find out about supported metadata version of the runtime.
         */
        metadata_at_version: RuntimeDescriptor<[version: number], Anonymize<Iabpgqcjikia83>>;
        /**
         * Returns the supported metadata versions.
         *
         * This can be used to call `metadata_at_version`.
         */
        metadata_versions: RuntimeDescriptor<[], Anonymize<Icgljjb6j82uhn>>;
    };
    /**
     * The `BlockBuilder` api trait that provides the required functionality for building a block.
     */
    BlockBuilder: {
        /**
         * Apply the given extrinsic.
         *
         * Returns an inclusion outcome which specifies if this extrinsic is included in
         * this block or not.
         */
        apply_extrinsic: RuntimeDescriptor<[extrinsic: Binary], Anonymize<Ib7pnmuv68c0ei>>;
        /**
         * Finish the current block.
         */
        finalize_block: RuntimeDescriptor<[], Anonymize<Idcpi3jpt0c03v>>;
        /**
         * Generate inherent extrinsics. The inherent data will vary from chain to chain.
         */
        inherent_extrinsics: RuntimeDescriptor<[inherent: Anonymize<If7uv525tdvv7a>], Anonymize<Itom7fk49o0c9>>;
        /**
         * Check that the inherents are valid. The inherent data will vary from chain to chain.
         */
        check_inherents: RuntimeDescriptor<[block: Anonymize<I1e13lcoj2ijct>, data: Anonymize<If7uv525tdvv7a>], Anonymize<I2an1fs2eiebjp>>;
    };
    /**
     * The `TaggedTransactionQueue` api trait for interfering with the transaction queue.
     */
    TaggedTransactionQueue: {
        /**
         * Validate the transaction.
         *
         * This method is invoked by the transaction pool to learn details about given transaction.
         * The implementation should make sure to verify the correctness of the transaction
         * against current state. The given `block_hash` corresponds to the hash of the block
         * that is used as current state.
         *
         * Note that this call may be performed by the pool multiple times and transactions
         * might be verified in any possible order.
         */
        validate_transaction: RuntimeDescriptor<[source: TransactionValidityTransactionSource, tx: Binary, block_hash: FixedSizeBinary<32>], Anonymize<I9ask1o4tfvcvs>>;
    };
    /**
     * The offchain worker api.
     */
    OffchainWorkerApi: {
        /**
         * Starts the off-chain task for given block header.
         */
        offchain_worker: RuntimeDescriptor<[header: Anonymize<Idcpi3jpt0c03v>], undefined>;
    };
    /**
     * API necessary for block authorship with SPIN.
     */
    SpinApi: {
        /**
         * Returns the slot duration for SPIN.
         *
         * Currently, only the value provided by this type at genesis will be used.
         */
        slot_duration: RuntimeDescriptor<[], bigint>;
        /**
         * Return the current set of authorities.
         */
        aux_data: RuntimeDescriptor<[], Anonymize<Ie4s4u839msund>>;
    };
    /**
    
     */
    StakingApi: {
        /**
         * Returns the nominations quota for a nominator with a given balance.
         */
        nominations_quota: RuntimeDescriptor<[balance: bigint], number>;
        /**
         * Returns the page count of exposures for a validator `account` in a given era.
         */
        eras_stakers_page_count: RuntimeDescriptor<[era: number, account: SS58String], number>;
        /**
         * Returns true if validator `account` has pages to be claimed for the given era.
         */
        pending_rewards: RuntimeDescriptor<[era: number, account: SS58String], boolean>;
    };
    /**
     * Session keys runtime api.
     */
    SessionKeys: {
        /**
         * Generate a set of session keys with optionally using the given seed.
         * The keys should be stored within the keystore exposed via runtime
         * externalities.
         *
         * The seed needs to be a valid `utf8` string.
         *
         * Returns the concatenated SCALE encoded public keys.
         */
        generate_session_keys: RuntimeDescriptor<[seed: Anonymize<Iabpgqcjikia83>], Binary>;
        /**
         * Decode the given public session keys.
         *
         * Returns the list of public raw public keys + key type.
         */
        decode_session_keys: RuntimeDescriptor<[encoded: Binary], Anonymize<Icerf8h8pdu8ss>>;
    };
    /**
     * APIs for integrating the GRANDPA finality gadget into runtimes.
     * This should be implemented on the runtime side.
     *
     * This is primarily used for negotiating authority-set changes for the
     * gadget. GRANDPA uses a signaling model of changing authority sets:
     * changes should be signaled with a delay of N blocks, and then automatically
     * applied in the runtime after those N blocks have passed.
     *
     * The consensus protocol will coordinate the handoff externally.
     */
    GrandpaApi: {
        /**
         * Get the current GRANDPA authorities and weights. This should not change except
         * for when changes are scheduled and the corresponding delay has passed.
         *
         * When called at block B, it will return the set of authorities that should be
         * used to finalize descendants of this block (B+1, B+2, ...). The block B itself
         * is finalized by the authorities from block B-1.
         */
        grandpa_authorities: RuntimeDescriptor<[], Anonymize<I3geksg000c171>>;
        /**
         * Submits an unsigned extrinsic to report an equivocation. The caller
         * must provide the equivocation proof and a key ownership proof
         * (should be obtained using `generate_key_ownership_proof`). The
         * extrinsic will be unsigned and should only be accepted for local
         * authorship (not to be broadcast to the network). This method returns
         * `None` when creation of the extrinsic fails, e.g. if equivocation
         * reporting is disabled for the given runtime (i.e. this method is
         * hardcoded to return `None`). Only useful in an offchain context.
         */
        submit_report_equivocation_unsigned_extrinsic: RuntimeDescriptor<[equivocation_proof: Anonymize<Ifh2vvcsf9090p>, key_owner_proof: Binary], boolean>;
        /**
         * Generates a proof of key ownership for the given authority in the
         * given set. An example usage of this module is coupled with the
         * session historical module to prove that a given authority key is
         * tied to a given staking identity during a specific session. Proofs
         * of key ownership are necessary for submitting equivocation reports.
         * NOTE: even though the API takes a `set_id` as parameter the current
         * implementations ignore this parameter and instead rely on this
         * method being called at the correct block height, i.e. any point at
         * which the given set id is live on-chain. Future implementations will
         * instead use indexed data through an offchain worker, not requiring
         * older states to be available.
         */
        generate_key_ownership_proof: RuntimeDescriptor<[set_id: bigint, authority_id: FixedSizeBinary<32>], Anonymize<Iabpgqcjikia83>>;
        /**
         * Get current GRANDPA authority set id.
         */
        current_set_id: RuntimeDescriptor<[], bigint>;
    };
    /**
     * The API to query account nonce.
     */
    AccountNonceApi: {
        /**
         * Get current account nonce of given `AccountId`.
         */
        account_nonce: RuntimeDescriptor<[account: SS58String], number>;
    };
    /**
    
     */
    TransactionPaymentApi: {
        /**
        
         */
        query_info: RuntimeDescriptor<[uxt: Binary, len: number], Anonymize<I6spmpef2c7svf>>;
        /**
        
         */
        query_fee_details: RuntimeDescriptor<[uxt: Binary, len: number], Anonymize<Iei2mvq0mjvt81>>;
        /**
        
         */
        query_weight_to_fee: RuntimeDescriptor<[weight: Anonymize<I4q39t5hn830vp>], bigint>;
        /**
        
         */
        query_length_to_fee: RuntimeDescriptor<[length: number], bigint>;
    };
    /**
    
     */
    TransactionPaymentCallApi: {
        /**
         * Query information of a dispatch class, weight, and fee of a given encoded `Call`.
         */
        query_call_info: RuntimeDescriptor<[call: Anonymize<Id8d6irn91bma1>, len: number], Anonymize<I6spmpef2c7svf>>;
        /**
         * Query fee details of a given encoded `Call`.
         */
        query_call_fee_details: RuntimeDescriptor<[call: Anonymize<Id8d6irn91bma1>, len: number], Anonymize<Iei2mvq0mjvt81>>;
        /**
         * Query the output of the current `WeightToFee` given some input.
         */
        query_weight_to_fee: RuntimeDescriptor<[weight: Anonymize<I4q39t5hn830vp>], bigint>;
        /**
         * Query the output of the current `LengthToFee` given some input.
         */
        query_length_to_fee: RuntimeDescriptor<[length: number], bigint>;
    };
    /**
     * API to interact with `RuntimeGenesisConfig` for the runtime
     */
    GenesisBuilder: {
        /**
         * Build `RuntimeGenesisConfig` from a JSON blob not using any defaults and store it in the
         * storage.
         *
         * In the case of a FRAME-based runtime, this function deserializes the full
         * `RuntimeGenesisConfig` from the given JSON blob and puts it into the storage. If the
         * provided JSON blob is incorrect or incomplete or the deserialization fails, an error
         * is returned.
         *
         * Please note that provided JSON blob must contain all `RuntimeGenesisConfig` fields, no
         * defaults will be used.
         */
        build_state: RuntimeDescriptor<[json: Binary], Anonymize<Ie9sr1iqcg3cgm>>;
        /**
         * Returns a JSON blob representation of the built-in `RuntimeGenesisConfig` identified by
         * `id`.
         *
         * If `id` is `None` the function should return JSON blob representation of the default
         * `RuntimeGenesisConfig` struct of the runtime. Implementation must provide default
         * `RuntimeGenesisConfig`.
         *
         * Otherwise function returns a JSON representation of the built-in, named
         * `RuntimeGenesisConfig` preset identified by `id`, or `None` if such preset does not
         * exist. Returned `Vec<u8>` contains bytes of JSON blob (patch) which comprises a list of
         * (potentially nested) key-value pairs that are intended for customizing the default
         * runtime genesis config. The patch shall be merged (rfc7386) with the JSON representation
         * of the default `RuntimeGenesisConfig` to create a comprehensive genesis config that can
         * be used in `build_state` method.
         */
        get_preset: RuntimeDescriptor<[id: Anonymize<I1mqgk2tmnn9i2>], Anonymize<Iabpgqcjikia83>>;
        /**
         * Returns a list of identifiers for available builtin `RuntimeGenesisConfig` presets.
         *
         * The presets from the list can be queried with [`GenesisBuilder::get_preset`] method. If
         * no named presets are provided by the runtime the list is empty.
         */
        preset_names: RuntimeDescriptor<[], Anonymize<I6lr8sctk0bi4e>>;
    };
    /**
     * The API used to dry-run contract interactions.
     */
    ReviveApi: {
        /**
         * Returns the block gas limit.
         */
        block_gas_limit: RuntimeDescriptor<[], Anonymize<I4totqt881mlti>>;
        /**
         * Returns the free balance of the given `[H160]` address, using EVM decimals.
         */
        balance: RuntimeDescriptor<[address: FixedSizeBinary<20>], Anonymize<I4totqt881mlti>>;
        /**
         * Returns the gas price.
         */
        gas_price: RuntimeDescriptor<[], Anonymize<I4totqt881mlti>>;
        /**
         * Returns the nonce of the given `[H160]` address.
         */
        nonce: RuntimeDescriptor<[address: FixedSizeBinary<20>], number>;
        /**
         * Perform a call from a specified account to a given contract.
         *
         * See [`crate::Pallet::bare_call`].
         */
        call: RuntimeDescriptor<[origin: SS58String, dest: FixedSizeBinary<20>, value: bigint, gas_limit: Anonymize<Iasb8k6ash5mjn>, storage_deposit_limit: Anonymize<I35p85j063s0il>, input_data: Binary], Anonymize<Iehlhev3qpj3hp>>;
        /**
         * Instantiate a new contract.
         *
         * See `[crate::Pallet::bare_instantiate]`.
         */
        instantiate: RuntimeDescriptor<[origin: SS58String, value: bigint, gas_limit: Anonymize<Iasb8k6ash5mjn>, storage_deposit_limit: Anonymize<I35p85j063s0il>, code: Anonymize<I9sijb8gfrns29>, data: Binary, salt: Anonymize<I4s6vifaf8k998>], Anonymize<I8tujuiip3mogh>>;
        /**
         * Perform an Ethereum call.
         *
         * See [`crate::Pallet::dry_run_eth_transact`]
         */
        eth_transact: RuntimeDescriptor<[tx: Anonymize<I6f9v7emp7t5ba>], Anonymize<I8abab09ak4pi1>>;
        /**
         * Upload new code without instantiating a contract from it.
         *
         * See [`crate::Pallet::bare_upload_code`].
         */
        upload_code: RuntimeDescriptor<[origin: SS58String, code: Binary, storage_deposit_limit: Anonymize<I35p85j063s0il>], Anonymize<I34m9oklu85ug5>>;
        /**
         * Query a given storage key in a given contract.
         *
         * Returns `Ok(Some(Vec<u8>))` if the storage value exists under the given key in the
         * specified account and `Ok(None)` if it doesn't. If the account specified by the address
         * doesn't exist, or doesn't have a contract then `Err` is returned.
         */
        get_storage: RuntimeDescriptor<[address: FixedSizeBinary<20>, key: FixedSizeBinary<32>], Anonymize<Iehnkjehe1oeva>>;
        /**
         * Query a given variable-sized storage key in a given contract.
         *
         * Returns `Ok(Some(Vec<u8>))` if the storage value exists under the given key in the
         * specified account and `Ok(None)` if it doesn't. If the account specified by the address
         * doesn't exist, or doesn't have a contract then `Err` is returned.
         */
        get_storage_var_key: RuntimeDescriptor<[address: FixedSizeBinary<20>, key: Binary], Anonymize<Iehnkjehe1oeva>>;
        /**
         * Traces the execution of an entire block and returns call traces.
         *
         * This is intended to be called through `state_call` to replay the block from the
         * parent block.
         *
         * See eth-rpc `debug_traceBlockByNumber` for usage.
         */
        trace_block: RuntimeDescriptor<[block: Anonymize<I1e13lcoj2ijct>, config: Anonymize<I63nhnkgg114n5>], Anonymize<I2mbbhvaji2ui8>>;
        /**
         * Traces the execution of a specific transaction within a block.
         *
         * This is intended to be called through `state_call` to replay the block from the
         * parent hash up to the transaction.
         *
         * See eth-rpc `debug_traceTransaction` for usage.
         */
        trace_tx: RuntimeDescriptor<[block: Anonymize<I1e13lcoj2ijct>, tx_index: number, config: Anonymize<I63nhnkgg114n5>], Anonymize<I7sj68ug65e0t0>>;
        /**
         * Dry run and return the trace of the given call.
         *
         * See eth-rpc `debug_traceCall` for usage.
         */
        trace_call: RuntimeDescriptor<[tx: Anonymize<I6f9v7emp7t5ba>, config: Anonymize<I63nhnkgg114n5>], Anonymize<Icifup6o102f4c>>;
        /**
         * The address of the validator that produced the current block.
         */
        block_author: RuntimeDescriptor<[], Anonymize<If7b8240vgt2q5>>;
        /**
         * Get the H160 address associated to this account id
         */
        address: RuntimeDescriptor<[account_id: SS58String], FixedSizeBinary<20>>;
        /**
         * The address used to call the runtime's pallets dispatchables
         */
        runtime_pallets_address: RuntimeDescriptor<[], FixedSizeBinary<20>>;
        /**
         * The code at the specified address taking pre-compiles into account.
         */
        code: RuntimeDescriptor<[address: FixedSizeBinary<20>], Binary>;
    };
};
export type Qf_networkDispatchError = Anonymize<I6m2rvq1qrtfa>;
type IAsset = PlainDescriptor<void>;
export type Qf_networkExtensions = {};
type PalletsTypedef = {
    __storage: IStorage;
    __tx: ICalls;
    __event: IEvent;
    __error: IError;
    __const: IConstants;
    __view: IViewFns;
};
export type Qf_network = {
    descriptors: {
        pallets: PalletsTypedef;
        apis: IRuntimeCalls;
    } & Promise<any>;
    metadataTypes: Promise<Uint8Array>;
    asset: IAsset;
    extensions: Qf_networkExtensions;
    getMetadata: () => Promise<Uint8Array>;
    genesis: string | undefined;
};
declare const _allDescriptors: Qf_network;
export default _allDescriptors;
export type Qf_networkApis = ApisFromDef<IRuntimeCalls>;
export type Qf_networkQueries = QueryFromPalletsDef<PalletsTypedef>;
export type Qf_networkCalls = TxFromPalletsDef<PalletsTypedef>;
export type Qf_networkEvents = EventsFromPalletsDef<PalletsTypedef>;
export type Qf_networkErrors = ErrorsFromPalletsDef<PalletsTypedef>;
export type Qf_networkConstants = ConstFromPalletsDef<PalletsTypedef>;
export type Qf_networkViewFns = ViewFnsFromPalletsDef<PalletsTypedef>;
export type Qf_networkCallData = Anonymize<Id8d6irn91bma1> & {
    value: {
        type: string;
    };
};
type AllInteractions = {
    storage: {
        System: ['Account', 'ExtrinsicCount', 'InherentsApplied', 'BlockWeight', 'AllExtrinsicsLen', 'BlockHash', 'ExtrinsicData', 'Number', 'ParentHash', 'Digest', 'Events', 'EventCount', 'EventTopics', 'LastRuntimeUpgrade', 'UpgradedToU32RefCount', 'UpgradedToTripleRefCount', 'ExecutionPhase', 'AuthorizedUpgrade', 'ExtrinsicWeightReclaimed'];
        Timestamp: ['Now', 'DidUpdate'];
        Multisig: ['Multisigs'];
        Proxy: ['Proxies', 'Announcements'];
        Balances: ['TotalIssuance', 'InactiveIssuance', 'Account', 'Locks', 'Reserves', 'Holds', 'Freezes'];
        TransactionPayment: ['NextFeeMultiplier', 'StorageVersion'];
        Vesting: ['Vesting', 'StorageVersion'];
        Claims: ['Claims', 'Total', 'Vesting', 'Signing', 'Preclaims', 'MintClaimOrigin', 'MoveClaimOrigin'];
        Authorship: ['Author'];
        Session: ['Validators', 'CurrentIndex', 'QueuedChanged', 'QueuedKeys', 'DisabledValidators', 'NextKeys', 'KeyOwner'];
        Grandpa: ['State', 'PendingChange', 'NextForced', 'Stalled', 'CurrentSetId', 'SetIdSession', 'Authorities'];
        Spin: ['Authorities', 'CurrentSlot', 'SessionLength'];
        SpinAnchoring: ['Relayer', 'SecureUpTo'];
        Staking: ['ValidatorCount', 'MinimumValidatorCount', 'Invulnerables', 'Bonded', 'MinNominatorBond', 'MinValidatorBond', 'MinimumActiveStake', 'MinCommission', 'Ledger', 'Payee', 'Validators', 'CounterForValidators', 'MaxValidatorsCount', 'Nominators', 'CounterForNominators', 'VirtualStakers', 'CounterForVirtualStakers', 'MaxNominatorsCount', 'CurrentEra', 'ActiveEra', 'ErasStartSessionIndex', 'ErasStakers', 'ErasStakersOverview', 'ErasStakersClipped', 'ErasStakersPaged', 'ClaimedRewards', 'ErasValidatorPrefs', 'ErasValidatorReward', 'ErasRewardPoints', 'ErasTotalStake', 'ForceEra', 'MaxStakedRewards', 'SlashRewardFraction', 'CanceledSlashPayout', 'UnappliedSlashes', 'BondedEras', 'ValidatorSlashInEra', 'NominatorSlashInEra', 'SlashingSpans', 'SpanSlash', 'CurrentPlannedSession', 'ChillThreshold'];
        Sudo: ['Key'];
        Revive: ['PristineCode', 'CodeInfoOf', 'AccountInfoOf', 'ImmutableDataOf', 'DeletionQueue', 'DeletionQueueCounter', 'OriginalAccount'];
        Assets: ['Asset', 'Account', 'Approvals', 'Metadata', 'NextAssetId'];
    };
    tx: {
        System: ['remark', 'set_heap_pages', 'set_code', 'set_code_without_checks', 'set_storage', 'kill_storage', 'kill_prefix', 'remark_with_event', 'authorize_upgrade', 'authorize_upgrade_without_checks', 'apply_authorized_upgrade'];
        Timestamp: ['set'];
        Utility: ['batch', 'as_derivative', 'batch_all', 'dispatch_as', 'force_batch', 'with_weight', 'if_else', 'dispatch_as_fallible'];
        Multisig: ['as_multi_threshold_1', 'as_multi', 'approve_as_multi', 'cancel_as_multi', 'poke_deposit'];
        Proxy: ['proxy', 'add_proxy', 'remove_proxy', 'remove_proxies', 'create_pure', 'kill_pure', 'announce', 'remove_announcement', 'reject_announcement', 'proxy_announced', 'poke_deposit'];
        Balances: ['transfer_allow_death', 'force_transfer', 'transfer_keep_alive', 'transfer_all', 'force_unreserve', 'upgrade_accounts', 'force_set_balance', 'force_adjust_total_issuance', 'burn'];
        Vesting: ['vest', 'vest_other', 'vested_transfer', 'force_vested_transfer', 'merge_schedules', 'force_remove_vesting_schedule'];
        Claims: ['claim', 'mint_claim', 'claim_attest', 'attest', 'move_claim', 'set_mint_claim_origin', 'set_move_claim_origin'];
        Session: ['set_keys', 'purge_keys'];
        Grandpa: ['report_equivocation', 'report_equivocation_unsigned', 'note_stalled'];
        Spin: ['set_session_length'];
        SpinAnchoring: ['note_anchor_verified', 'set_relayer'];
        Staking: ['bond', 'bond_extra', 'unbond', 'withdraw_unbonded', 'validate', 'nominate', 'chill', 'set_payee', 'set_controller', 'set_validator_count', 'increase_validator_count', 'scale_validator_count', 'force_no_eras', 'force_new_era', 'set_invulnerables', 'force_unstake', 'force_new_era_always', 'cancel_deferred_slash', 'payout_stakers', 'rebond', 'reap_stash', 'kick', 'set_staking_configs', 'chill_other', 'force_apply_min_commission', 'set_min_commission', 'payout_stakers_by_page', 'update_payee', 'deprecate_controller_batch', 'restore_ledger', 'migrate_currency', 'manual_slash'];
        Sudo: ['sudo', 'sudo_unchecked_weight', 'set_key', 'sudo_as', 'remove_key'];
        Revive: ['eth_transact', 'call', 'instantiate', 'instantiate_with_code', 'eth_instantiate_with_code', 'eth_call', 'upload_code', 'remove_code', 'set_code', 'map_account', 'unmap_account', 'dispatch_as_fallback_account'];
        Assets: ['create', 'force_create', 'start_destroy', 'destroy_accounts', 'destroy_approvals', 'finish_destroy', 'mint', 'burn', 'transfer', 'transfer_keep_alive', 'force_transfer', 'freeze', 'thaw', 'freeze_asset', 'thaw_asset', 'transfer_ownership', 'set_team', 'set_metadata', 'clear_metadata', 'force_set_metadata', 'force_clear_metadata', 'force_asset_status', 'approve_transfer', 'cancel_approval', 'force_cancel_approval', 'transfer_approved', 'touch', 'refund', 'set_min_balance', 'touch_other', 'refund_other', 'block', 'transfer_all'];
    };
    events: {
        System: ['ExtrinsicSuccess', 'ExtrinsicFailed', 'CodeUpdated', 'NewAccount', 'KilledAccount', 'Remarked', 'UpgradeAuthorized', 'RejectedInvalidAuthorizedUpgrade'];
        Utility: ['BatchInterrupted', 'BatchCompleted', 'BatchCompletedWithErrors', 'ItemCompleted', 'ItemFailed', 'DispatchedAs', 'IfElseMainSuccess', 'IfElseFallbackCalled'];
        Multisig: ['NewMultisig', 'MultisigApproval', 'MultisigExecuted', 'MultisigCancelled', 'DepositPoked'];
        Proxy: ['ProxyExecuted', 'PureCreated', 'PureKilled', 'Announced', 'ProxyAdded', 'ProxyRemoved', 'DepositPoked'];
        Balances: ['Endowed', 'DustLost', 'Transfer', 'BalanceSet', 'Reserved', 'Unreserved', 'ReserveRepatriated', 'Deposit', 'Withdraw', 'Slashed', 'Minted', 'MintedCredit', 'Burned', 'BurnedDebt', 'Suspended', 'Restored', 'Upgraded', 'Issued', 'Rescinded', 'Locked', 'Unlocked', 'Frozen', 'Thawed', 'TotalIssuanceForced', 'Held', 'BurnedHeld', 'TransferOnHold', 'TransferAndHold', 'Released', 'Unexpected'];
        TransactionPayment: ['TransactionFeePaid'];
        Vesting: ['VestingCreated', 'VestingUpdated', 'VestingCompleted'];
        Claims: ['Claimed'];
        Session: ['NewSession', 'NewQueued', 'ValidatorDisabled', 'ValidatorReenabled'];
        Grandpa: ['NewAuthorities', 'Paused', 'Resumed'];
        Spin: ['NewSessionLength'];
        SpinAnchoring: ['SecureFinalityAdvanced'];
        Staking: ['EraPaid', 'Rewarded', 'Slashed', 'SlashReported', 'OldSlashingReportDiscarded', 'StakersElected', 'Bonded', 'Unbonded', 'Withdrawn', 'Kicked', 'StakingElectionFailed', 'Chilled', 'PayoutStarted', 'ValidatorPrefsSet', 'SnapshotVotersSizeExceeded', 'SnapshotTargetsSizeExceeded', 'ForceEra', 'ControllerBatchDeprecated', 'CurrencyMigrated'];
        Sudo: ['Sudid', 'KeyChanged', 'KeyRemoved', 'SudoAsDone'];
        Revive: ['ContractEmitted', 'Instantiated'];
        Assets: ['Created', 'Issued', 'Transferred', 'Burned', 'TeamChanged', 'OwnerChanged', 'Frozen', 'Thawed', 'AssetFrozen', 'AssetThawed', 'AccountsDestroyed', 'ApprovalsDestroyed', 'DestructionStarted', 'Destroyed', 'ForceCreated', 'MetadataSet', 'MetadataCleared', 'ApprovedTransfer', 'ApprovalCancelled', 'TransferredApproved', 'AssetStatusChanged', 'AssetMinBalanceChanged', 'Touched', 'Blocked', 'Deposited', 'Withdrawn'];
    };
    errors: {
        System: ['InvalidSpecName', 'SpecVersionNeedsToIncrease', 'FailedToExtractRuntimeVersion', 'NonDefaultComposite', 'NonZeroRefCount', 'CallFiltered', 'MultiBlockMigrationsOngoing', 'NothingAuthorized', 'Unauthorized'];
        Utility: ['TooManyCalls'];
        Multisig: ['MinimumThreshold', 'AlreadyApproved', 'NoApprovalsNeeded', 'TooFewSignatories', 'TooManySignatories', 'SignatoriesOutOfOrder', 'SenderInSignatories', 'NotFound', 'NotOwner', 'NoTimepoint', 'WrongTimepoint', 'UnexpectedTimepoint', 'MaxWeightTooLow', 'AlreadyStored'];
        Proxy: ['TooMany', 'NotFound', 'NotProxy', 'Unproxyable', 'Duplicate', 'NoPermission', 'Unannounced', 'NoSelfProxy'];
        Balances: ['VestingBalance', 'LiquidityRestrictions', 'InsufficientBalance', 'ExistentialDeposit', 'Expendability', 'ExistingVestingSchedule', 'DeadAccount', 'TooManyReserves', 'TooManyHolds', 'TooManyFreezes', 'IssuanceDeactivated', 'DeltaZero'];
        Vesting: ['NotVesting', 'AtMaxVestingSchedules', 'AmountLow', 'ScheduleIndexOutOfBounds', 'InvalidScheduleParams'];
        Claims: ['InvalidEthereumSignature', 'SignerHasNoClaim', 'SenderHasNoClaim', 'PotUnderflow', 'InvalidStatement', 'VestedBalanceExists'];
        Session: ['InvalidProof', 'NoAssociatedValidatorId', 'DuplicatedKey', 'NoKeys', 'NoAccount'];
        Grandpa: ['PauseFailed', 'ResumeFailed', 'ChangePending', 'TooSoon', 'InvalidKeyOwnershipProof', 'InvalidEquivocationProof', 'DuplicateOffenceReport'];
        Spin: ['SessionLengthZero'];
        Staking: ['NotController', 'NotStash', 'AlreadyBonded', 'AlreadyPaired', 'EmptyTargets', 'DuplicateIndex', 'InvalidSlashIndex', 'InsufficientBond', 'NoMoreChunks', 'NoUnlockChunk', 'FundedTarget', 'InvalidEraToReward', 'InvalidNumberOfNominations', 'NotSortedAndUnique', 'AlreadyClaimed', 'InvalidPage', 'IncorrectHistoryDepth', 'IncorrectSlashingSpans', 'BadState', 'TooManyTargets', 'BadTarget', 'CannotChillOther', 'TooManyNominators', 'TooManyValidators', 'CommissionTooLow', 'BoundNotMet', 'ControllerDeprecated', 'CannotRestoreLedger', 'RewardDestinationRestricted', 'NotEnoughFunds', 'VirtualStakerNotAllowed', 'CannotReapStash', 'AlreadyMigrated', 'Restricted'];
        Sudo: ['RequireSudo'];
        Revive: ['InvalidSchedule', 'InvalidCallFlags', 'OutOfGas', 'TransferFailed', 'MaxCallDepthReached', 'ContractNotFound', 'CodeNotFound', 'CodeInfoNotFound', 'OutOfBounds', 'DecodingFailed', 'ContractTrapped', 'ValueTooLarge', 'TerminatedWhileReentrant', 'InputForwarded', 'TooManyTopics', 'DuplicateContract', 'TerminatedInConstructor', 'ReentranceDenied', 'ReenteredPallet', 'StateChangeDenied', 'StorageDepositNotEnoughFunds', 'StorageDepositLimitExhausted', 'CodeInUse', 'ContractReverted', 'CodeRejected', 'BlobTooLarge', 'StaticMemoryTooLarge', 'BasicBlockTooLarge', 'InvalidInstruction', 'MaxDelegateDependenciesReached', 'DelegateDependencyNotFound', 'DelegateDependencyAlreadyExists', 'CannotAddSelfAsDelegateDependency', 'OutOfTransientStorage', 'InvalidSyscall', 'InvalidStorageFlags', 'ExecutionFailed', 'BalanceConversionFailed', 'InvalidImmutableAccess', 'AccountUnmapped', 'AccountAlreadyMapped', 'InvalidGenericTransaction', 'RefcountOverOrUnderflow', 'UnsupportedPrecompileAddress', 'CallDataTooLarge', 'ReturnDataTooLarge'];
        Assets: ['BalanceLow', 'NoAccount', 'NoPermission', 'Unknown', 'Frozen', 'InUse', 'BadWitness', 'MinBalanceZero', 'UnavailableConsumer', 'BadMetadata', 'Unapproved', 'WouldDie', 'AlreadyExists', 'NoDeposit', 'WouldBurn', 'LiveAsset', 'AssetNotLive', 'IncorrectStatus', 'NotFrozen', 'CallbackFailed', 'BadAssetId', 'ContainsFreezes', 'ContainsHolds'];
    };
    constants: {
        System: ['BlockWeights', 'BlockLength', 'BlockHashCount', 'DbWeight', 'Version', 'SS58Prefix'];
        Timestamp: ['MinimumPeriod'];
        Utility: ['batched_calls_limit'];
        Multisig: ['DepositBase', 'DepositFactor', 'MaxSignatories'];
        Proxy: ['ProxyDepositBase', 'ProxyDepositFactor', 'MaxProxies', 'MaxPending', 'AnnouncementDepositBase', 'AnnouncementDepositFactor'];
        Balances: ['ExistentialDeposit', 'MaxLocks', 'MaxReserves', 'MaxFreezes'];
        TransactionPayment: ['OperationalFeeMultiplier'];
        Vesting: ['MinVestedTransfer', 'MaxVestingSchedules'];
        Claims: ['Prefix'];
        Session: ['KeyDeposit'];
        Grandpa: ['MaxAuthorities', 'MaxNominators', 'MaxSetIdSessionEntries'];
        Spin: ['SlotDuration', 'DefaultSessionLength'];
        Staking: ['HistoryDepth', 'SessionsPerEra', 'BondingDuration', 'SlashDeferDuration', 'MaxExposurePageSize', 'MaxValidatorSet', 'MaxUnlockingChunks'];
        Revive: ['DepositPerByte', 'DepositPerItem', 'CodeHashLockupDepositPercent', 'UnsafeUnstableInterface', 'AllowEVMBytecode', 'ChainId', 'NativeToEthRatio'];
        Assets: ['RemoveItemsLimit', 'AssetDeposit', 'AssetAccountDeposit', 'MetadataDepositBase', 'MetadataDepositPerByte', 'ApprovalDeposit', 'StringLimit'];
    };
    viewFns: {
        Proxy: ['check_permissions', 'is_superset'];
    };
    apis: {
        Core: ['version', 'execute_block', 'initialize_block'];
        Metadata: ['metadata', 'metadata_at_version', 'metadata_versions'];
        BlockBuilder: ['apply_extrinsic', 'finalize_block', 'inherent_extrinsics', 'check_inherents'];
        TaggedTransactionQueue: ['validate_transaction'];
        OffchainWorkerApi: ['offchain_worker'];
        SpinApi: ['slot_duration', 'aux_data'];
        StakingApi: ['nominations_quota', 'eras_stakers_page_count', 'pending_rewards'];
        SessionKeys: ['generate_session_keys', 'decode_session_keys'];
        GrandpaApi: ['grandpa_authorities', 'submit_report_equivocation_unsigned_extrinsic', 'generate_key_ownership_proof', 'current_set_id'];
        AccountNonceApi: ['account_nonce'];
        TransactionPaymentApi: ['query_info', 'query_fee_details', 'query_weight_to_fee', 'query_length_to_fee'];
        TransactionPaymentCallApi: ['query_call_info', 'query_call_fee_details', 'query_weight_to_fee', 'query_length_to_fee'];
        GenesisBuilder: ['build_state', 'get_preset', 'preset_names'];
        ReviveApi: ['block_gas_limit', 'balance', 'gas_price', 'nonce', 'call', 'instantiate', 'eth_transact', 'upload_code', 'get_storage', 'get_storage_var_key', 'trace_block', 'trace_tx', 'trace_call', 'block_author', 'address', 'runtime_pallets_address', 'code'];
    };
};
export type Qf_networkWhitelistEntry = PalletKey | `query.${NestedKey<AllInteractions['storage']>}` | `tx.${NestedKey<AllInteractions['tx']>}` | `event.${NestedKey<AllInteractions['events']>}` | `error.${NestedKey<AllInteractions['errors']>}` | `const.${NestedKey<AllInteractions['constants']>}` | `view.${NestedKey<AllInteractions['viewFns']>}` | `api.${NestedKey<AllInteractions['apis']>}`;
type PalletKey = `*.${({
    [K in keyof AllInteractions]: K extends 'apis' ? never : keyof AllInteractions[K];
})[keyof AllInteractions]}`;
type NestedKey<D extends Record<string, string[]>> = "*" | {
    [P in keyof D & string]: `${P}.*` | `${P}.${D[P][number]}`;
}[keyof D & string];
