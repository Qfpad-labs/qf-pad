import { maxUint256, type Address } from 'viem';

export const QF_CHAIN_ID = 3426;
export const QF_RPC_URL = "https://archive.mainnet.qfnode.net/eth";
export const QF_WS_RPC_URL = "wss://mainnet.qfnode.net";
export const QF_EXPLORER_URL = "https://portal.qfnetwork.xyz/?rpc=wss%3A%2F%2Fmainnet.qfnode.net#/explorer";
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000" as Address;

export const SUPPORTED_CHAIN_IDS = [QF_CHAIN_ID] as number[];
export const CHAIN_LABELS: Record<number, string> = {
    [QF_CHAIN_ID]: "QF Network",
};

type ContractAddressMap = {
    tokenLocker: Address;
    nftFactory: Address;
    presaleFactory: Address;
    tokenFactory: Address;
    airdropMultisender: Address;
};

export const CONTRACT_ADDRESSES_BY_CHAIN: Record<number, ContractAddressMap> = {
    [QF_CHAIN_ID]: {
        tokenLocker: "0x85e149DD4f4474a5A43F378d31607c305fADE5Cf" as Address,
        nftFactory: "0xc8Cb98D60df20FE504f305043071ba6D4F462106" as Address,
        presaleFactory: "0xDC823a4A42eA47b932B2630f1e05E1De4302Bf0E" as Address,
        tokenFactory: "0xB3210Cd97fEadFAfB4637a28161195e81C00E12e" as Address,
        airdropMultisender: "0x9e361c49Cd918771A5af06C462ab0cc47519287c" as Address,
    },
};

export const NFT_FACTORY_LENS_BY_CHAIN: Record<number, Address> = {
    [QF_CHAIN_ID]: "0xFcE5DdC08f208fB8214AB2685C46E5b9Af13563d" as Address,
};

export const STAKING_CONTRACT_ADDRESSES_BY_CHAIN: Record<number, Address> = {
    [QF_CHAIN_ID]: ZERO_ADDRESS,
};

export const getStakingContractAddress = (chainId?: number) => {
    if (chainId && STAKING_CONTRACT_ADDRESSES_BY_CHAIN[chainId]) {
        return STAKING_CONTRACT_ADDRESSES_BY_CHAIN[chainId];
    }
    return STAKING_CONTRACT_ADDRESSES_BY_CHAIN[QF_CHAIN_ID];
};

export const getContractAddresses = (chainId?: number) => {
    if (chainId && CONTRACT_ADDRESSES_BY_CHAIN[chainId]) {
        return CONTRACT_ADDRESSES_BY_CHAIN[chainId];
    }
    return CONTRACT_ADDRESSES_BY_CHAIN[QF_CHAIN_ID];
};

export const EXPLORER_URLS_BY_CHAIN: Record<number, string> = {
    [QF_CHAIN_ID]: QF_EXPLORER_URL,
};

export const getExplorerUrl = (chainId?: number) => {
    if (chainId && EXPLORER_URLS_BY_CHAIN[chainId]) {
        return EXPLORER_URLS_BY_CHAIN[chainId];
    }
    return EXPLORER_URLS_BY_CHAIN[QF_CHAIN_ID];
};


export const EXPLORER_URL = getExplorerUrl(QF_CHAIN_ID);

const uint256Max = maxUint256;
const feeToSpacing = {
    3000: 60,
    500: 10,
};

export const OWNER = "0x8ed51aDf35BEAa024A868120EDbCd1843099F481";

export const FactoryContract = {
    address: "0x153A2142D68EE6Bd2a4Cd63b46C0f60aeC34cc14",
    abi:
        [
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_feeToSetter",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "token0",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "token1",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "address",
                        "name": "pair",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "PairCreated",
                "type": "event"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "INIT_CODE_PAIR_HASH",
                "outputs": [
                    {
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "allPairs",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "allPairsLength",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "tokenA",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "tokenB",
                        "type": "address"
                    }
                ],
                "name": "createPair",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "pair",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "feeTo",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "feeToSetter",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "getPair",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_feeTo",
                        "type": "address"
                    }
                ],
                "name": "setFeeTo",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_feeToSetter",
                        "type": "address"
                    }
                ],
                "name": "setFeeToSetter",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ]
} as const;

export const Multicall3Contract = {
    address: "0xcA11bde05977b3631167028862bE2a173976CA11", // Standard Multicall3 address on many chains
    abi: [
        {
            "inputs": [
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "target",
                            "type": "address"
                        },
                        {
                            "internalType": "bytes",
                            "name": "callData",
                            "type": "bytes"
                        }
                    ],
                    "internalType": "struct Multicall2.Call[]",
                    "name": "calls",
                    "type": "tuple[]"
                }
            ],
            "name": "aggregate",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "blockNumber",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes[]",
                    "name": "returnData",
                    "type": "bytes[]"
                }
            ],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "target",
                            "type": "address"
                        },
                        {
                            "internalType": "bool",
                            "name": "allowFailure",
                            "type": "bool"
                        },
                        {
                            "internalType": "bytes",
                            "name": "callData",
                            "type": "bytes"
                        }
                    ],
                    "internalType": "struct Multicall3.Call3[]",
                    "name": "calls",
                    "type": "tuple[]"
                }
            ],
            "name": "aggregate3",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "bool",
                            "name": "success",
                            "type": "bool"
                        },
                        {
                            "internalType": "bytes",
                            "name": "returnData",
                            "type": "bytes"
                        }
                    ],
                    "internalType": "struct Multicall3.Result[]",
                    "name": "returnData",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "target",
                            "type": "address"
                        },
                        {
                            "internalType": "bool",
                            "name": "allowFailure",
                            "type": "bool"
                        },
                        {
                            "internalType": "uint256",
                            "name": "value",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bytes",
                            "name": "callData",
                            "type": "bytes"
                        }
                    ],
                    "internalType": "struct Multicall3.Call3Value[]",
                    "name": "calls",
                    "type": "tuple[]"
                }
            ],
            "name": "aggregate3Value",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "bool",
                            "name": "success",
                            "type": "bool"
                        },
                        {
                            "internalType": "bytes",
                            "name": "returnData",
                            "type": "bytes"
                        }
                    ],
                    "internalType": "struct Multicall3.Result[]",
                    "name": "returnData",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "target",
                            "type": "address"
                        },
                        {
                            "internalType": "bytes",
                            "name": "callData",
                            "type": "bytes"
                        }
                    ],
                    "internalType": "struct Multicall2.Call[]",
                    "name": "calls",
                    "type": "tuple[]"
                }
            ],
            "name": "blockAndAggregate",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "blockNumber",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes32",
                    "name": "blockHash",
                    "type": "bytes32"
                },
                {
                    "components": [
                        {
                            "internalType": "bool",
                            "name": "success",
                            "type": "bool"
                        },
                        {
                            "internalType": "bytes",
                            "name": "returnData",
                            "type": "bytes"
                        }
                    ],
                    "internalType": "struct Multicall2.Result[]",
                    "name": "returnData",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getBasefee",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "basefee",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "blockNumber",
                    "type": "uint256"
                }
            ],
            "name": "getBlockHash",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "blockHash",
                    "type": "bytes32"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getBlockNumber",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "blockNumber",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getChainId",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "chainid",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getCurrentBlockCoinbase",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "coinbase",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getCurrentBlockDifficulty",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "difficulty",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getCurrentBlockGasLimit",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "gaslimit",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getCurrentBlockTimestamp",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "timestamp",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "addr",
                    "type": "address"
                }
            ],
            "name": "getEthBalance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "balance",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getLastBlockHash",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "blockHash",
                    "type": "bytes32"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bool",
                    "name": "requireSuccess",
                    "type": "bool"
                },
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "target",
                            "type": "address"
                        },
                        {
                            "internalType": "bytes",
                            "name": "callData",
                            "type": "bytes"
                        }
                    ],
                    "internalType": "struct Multicall2.Call[]",
                    "name": "calls",
                    "type": "tuple[]"
                }
            ],
            "name": "tryAggregate",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "bool",
                            "name": "success",
                            "type": "bool"
                        },
                        {
                            "internalType": "bytes",
                            "name": "returnData",
                            "type": "bytes"
                        }
                    ],
                    "internalType": "struct Multicall2.Result[]",
                    "name": "returnData",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bool",
                    "name": "requireSuccess",
                    "type": "bool"
                },
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "target",
                            "type": "address"
                        },
                        {
                            "internalType": "bytes",
                            "name": "callData",
                            "type": "bytes"
                        }
                    ],
                    "internalType": "struct Multicall2.Call[]",
                    "name": "calls",
                    "type": "tuple[]"
                }
            ],
            "name": "tryBlockAndAggregate",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "blockNumber",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes32",
                    "name": "blockHash",
                    "type": "bytes32"
                },
                {
                    "components": [
                        {
                            "internalType": "bool",
                            "name": "success",
                            "type": "bool"
                        },
                        {
                            "internalType": "bytes",
                            "name": "returnData",
                            "type": "bytes"
                        }
                    ],
                    "internalType": "struct Multicall2.Result[]",
                    "name": "returnData",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "payable",
            "type": "function"
        }
    ]
} as const;

export const StakingContract = {
    address: STAKING_CONTRACT_ADDRESSES_BY_CHAIN[QF_CHAIN_ID],
    addressesByChain: STAKING_CONTRACT_ADDRESSES_BY_CHAIN,
    abi: [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_tokenAddress",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "Staker",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "Amount",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "Timestamp",
                    "type": "uint256"
                }
            ],
            "name": "Stake",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "Staker",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "Amount",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "Timestamp",
                    "type": "uint256"
                }
            ],
            "name": "UnStake",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "Staker",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "RewardAmount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "Timestamp",
                    "type": "uint256"
                }
            ],
            "name": "claimedRewards",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "EmergencyRecover",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "finalise",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getReward",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_addy",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                }
            ],
            "name": "notify",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                }
            ],
            "name": "stake",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_stakingDuration",
                    "type": "uint256"
                }
            ],
            "name": "startStaking",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_finishAt",
                    "type": "uint256"
                }
            ],
            "name": "updateFinishAt",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_newRewardRate",
                    "type": "uint256"
                }
            ],
            "name": "updateRewardRate",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                }
            ],
            "name": "withdraw",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "user",
                    "type": "address"
                }
            ],
            "name": "calculateReward",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "userReward",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "duration",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "finishAt",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_account",
                    "type": "address"
                }
            ],
            "name": "pendingRewards",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "rewardPerToken",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "rewardRate",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "rewards",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "rewardsToken",
            "outputs": [
                {
                    "internalType": "contract IERC20",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "stakers",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "totalStaked",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "lastStakedTimestamp",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "reward",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "stakingStatus",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "stakingToken",
            "outputs": [
                {
                    "internalType": "contract IERC20",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "totalTokensStakeCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_account",
                    "type": "address"
                }
            ],
            "name": "totalUserEarned",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
} as const;

export const RouterContract = {
    address: "0x81850e53DEc753b95DE4599173755bc640575c3D",
    abi: [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_factory",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_WETH",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [],
            "name": "WETH",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "tokenA",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "tokenB",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amountADesired",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountBDesired",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountAMin",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountBMin",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "deadline",
                    "type": "uint256"
                }
            ],
            "name": "addLiquidity",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "amountA",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountB",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "liquidity",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "token",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amountTokenDesired",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountTokenMin",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountETHMin",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "deadline",
                    "type": "uint256"
                }
            ],
            "name": "addLiquidityETH",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "amountToken",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountETH",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "liquidity",
                    "type": "uint256"
                }
            ],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "factory",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amountOut",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "reserveIn",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "reserveOut",
                    "type": "uint256"
                }
            ],
            "name": "getAmountIn",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "amountIn",
                    "type": "uint256"
                }
            ],
            "stateMutability": "pure",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amountIn",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "reserveIn",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "reserveOut",
                    "type": "uint256"
                }
            ],
            "name": "getAmountOut",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "amountOut",
                    "type": "uint256"
                }
            ],
            "stateMutability": "pure",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amountOut",
                    "type": "uint256"
                },
                {
                    "internalType": "address[]",
                    "name": "path",
                    "type": "address[]"
                }
            ],
            "name": "getAmountsIn",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "amounts",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amountIn",
                    "type": "uint256"
                },
                {
                    "internalType": "address[]",
                    "name": "path",
                    "type": "address[]"
                }
            ],
            "name": "getAmountsOut",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "amounts",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amountA",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "reserveA",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "reserveB",
                    "type": "uint256"
                }
            ],
            "name": "quote",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "amountB",
                    "type": "uint256"
                }
            ],
            "stateMutability": "pure",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "tokenA",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "tokenB",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "liquidity",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountAMin",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountBMin",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "deadline",
                    "type": "uint256"
                }
            ],
            "name": "removeLiquidity",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "amountA",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountB",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "token",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "liquidity",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountTokenMin",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountETHMin",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "deadline",
                    "type": "uint256"
                }
            ],
            "name": "removeLiquidityETH",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "amountToken",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountETH",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "token",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "liquidity",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountTokenMin",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountETHMin",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "deadline",
                    "type": "uint256"
                }
            ],
            "name": "removeLiquidityETHSupportingFeeOnTransferTokens",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "amountETH",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "token",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "liquidity",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountTokenMin",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountETHMin",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "deadline",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "approveMax",
                    "type": "bool"
                },
                {
                    "internalType": "uint8",
                    "name": "v",
                    "type": "uint8"
                },
                {
                    "internalType": "bytes32",
                    "name": "r",
                    "type": "bytes32"
                },
                {
                    "internalType": "bytes32",
                    "name": "s",
                    "type": "bytes32"
                }
            ],
            "name": "removeLiquidityETHWithPermit",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "amountToken",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountETH",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "token",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "liquidity",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountTokenMin",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountETHMin",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "deadline",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "approveMax",
                    "type": "bool"
                },
                {
                    "internalType": "uint8",
                    "name": "v",
                    "type": "uint8"
                },
                {
                    "internalType": "bytes32",
                    "name": "r",
                    "type": "bytes32"
                },
                {
                    "internalType": "bytes32",
                    "name": "s",
                    "type": "bytes32"
                }
            ],
            "name": "removeLiquidityETHWithPermitSupportingFeeOnTransferTokens",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "amountETH",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "tokenA",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "tokenB",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "liquidity",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountAMin",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountBMin",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "deadline",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "approveMax",
                    "type": "bool"
                },
                {
                    "internalType": "uint8",
                    "name": "v",
                    "type": "uint8"
                },
                {
                    "internalType": "bytes32",
                    "name": "r",
                    "type": "bytes32"
                },
                {
                    "internalType": "bytes32",
                    "name": "s",
                    "type": "bytes32"
                }
            ],
            "name": "removeLiquidityWithPermit",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "amountA",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountB",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amountOut",
                    "type": "uint256"
                },
                {
                    "internalType": "address[]",
                    "name": "path",
                    "type": "address[]"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "deadline",
                    "type": "uint256"
                }
            ],
            "name": "swapETHForExactTokens",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "amounts",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amountOutMin",
                    "type": "uint256"
                },
                {
                    "internalType": "address[]",
                    "name": "path",
                    "type": "address[]"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "deadline",
                    "type": "uint256"
                }
            ],
            "name": "swapExactETHForTokens",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "amounts",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amountOutMin",
                    "type": "uint256"
                },
                {
                    "internalType": "address[]",
                    "name": "path",
                    "type": "address[]"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "deadline",
                    "type": "uint256"
                }
            ],
            "name": "swapExactETHForTokensSupportingFeeOnTransferTokens",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amountIn",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountOutMin",
                    "type": "uint256"
                },
                {
                    "internalType": "address[]",
                    "name": "path",
                    "type": "address[]"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "deadline",
                    "type": "uint256"
                }
            ],
            "name": "swapExactTokensForETH",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "amounts",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amountIn",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountOutMin",
                    "type": "uint256"
                },
                {
                    "internalType": "address[]",
                    "name": "path",
                    "type": "address[]"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "deadline",
                    "type": "uint256"
                }
            ],
            "name": "swapExactTokensForETHSupportingFeeOnTransferTokens",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amountIn",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountOutMin",
                    "type": "uint256"
                },
                {
                    "internalType": "address[]",
                    "name": "path",
                    "type": "address[]"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "deadline",
                    "type": "uint256"
                }
            ],
            "name": "swapExactTokensForTokens",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "amounts",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amountIn",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountOutMin",
                    "type": "uint256"
                },
                {
                    "internalType": "address[]",
                    "name": "path",
                    "type": "address[]"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "deadline",
                    "type": "uint256"
                }
            ],
            "name": "swapExactTokensForTokensSupportingFeeOnTransferTokens",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amountOut",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountInMax",
                    "type": "uint256"
                },
                {
                    "internalType": "address[]",
                    "name": "path",
                    "type": "address[]"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "deadline",
                    "type": "uint256"
                }
            ],
            "name": "swapTokensForExactETH",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "amounts",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amountOut",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountInMax",
                    "type": "uint256"
                },
                {
                    "internalType": "address[]",
                    "name": "path",
                    "type": "address[]"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "deadline",
                    "type": "uint256"
                }
            ],
            "name": "swapTokensForExactTokens",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "amounts",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "stateMutability": "payable",
            "type": "receive"
        }
    ]
} as const;

export const Weth9Contract = {
    address: "0xe00CBca00d36c89819289dE34e352881E8F475Fd", // Wrapped native token contract
    abi: [
        {
            "constant": true,
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "guy",
                    "type": "address"
                },
                {
                    "name": "wad",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "src",
                    "type": "address"
                },
                {
                    "name": "dst",
                    "type": "address"
                },
                {
                    "name": "wad",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "wad",
                    "type": "uint256"
                }
            ],
            "name": "withdraw",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "decimals",
            "outputs": [
                {
                    "name": "",
                    "type": "uint8"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "dst",
                    "type": "address"
                },
                {
                    "name": "wad",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "deposit",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "address"
                },
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "allowance",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "payable": true,
            "stateMutability": "payable",
            "type": "fallback"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "src",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "guy",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "wad",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "src",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "dst",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "wad",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "dst",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "wad",
                    "type": "uint256"
                }
            ],
            "name": "Deposit",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "src",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "wad",
                    "type": "uint256"
                }
            ],
            "name": "Withdrawal",
            "type": "event"
        }
    ]
} as const;

export const MultiCall = {
    address: "0xc73290EC0D30c793250D50d2Ec1BCFa36e2B00c8", //Multicall Contract
    abi: []
} as const;

export const PairContract = {
    address: "0x60aa94C520ee3f5fCf488F17b304579Ef80C36Ec",
    abi: [
        {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount0",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount1",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                }
            ],
            "name": "Burn",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount0",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount1",
                    "type": "uint256"
                }
            ],
            "name": "Mint",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount0In",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount1In",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount0Out",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount1Out",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                }
            ],
            "name": "Swap",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint112",
                    "name": "reserve0",
                    "type": "uint112"
                },
                {
                    "indexed": false,
                    "internalType": "uint112",
                    "name": "reserve1",
                    "type": "uint112"
                }
            ],
            "name": "Sync",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "DOMAIN_SEPARATOR",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "MINIMUM_LIQUIDITY",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "PERMIT_TYPEHASH",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "allowance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                }
            ],
            "name": "burn",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "amount0",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amount1",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "decimals",
            "outputs": [
                {
                    "internalType": "uint8",
                    "name": "",
                    "type": "uint8"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "factory",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getReserves",
            "outputs": [
                {
                    "internalType": "uint112",
                    "name": "_reserve0",
                    "type": "uint112"
                },
                {
                    "internalType": "uint112",
                    "name": "_reserve1",
                    "type": "uint112"
                },
                {
                    "internalType": "uint32",
                    "name": "_blockTimestampLast",
                    "type": "uint32"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_token0",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_token1",
                    "type": "address"
                }
            ],
            "name": "initialize",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "kLast",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                }
            ],
            "name": "mint",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "liquidity",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "nonces",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "deadline",
                    "type": "uint256"
                },
                {
                    "internalType": "uint8",
                    "name": "v",
                    "type": "uint8"
                },
                {
                    "internalType": "bytes32",
                    "name": "r",
                    "type": "bytes32"
                },
                {
                    "internalType": "bytes32",
                    "name": "s",
                    "type": "bytes32"
                }
            ],
            "name": "permit",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "price0CumulativeLast",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "price1CumulativeLast",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                }
            ],
            "name": "skim",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amount0Out",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amount1Out",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "bytes",
                    "name": "data",
                    "type": "bytes"
                }
            ],
            "name": "swap",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "sync",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "token0",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "token1",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
} as const;

export const V2ERC20 = {
    abi: [
        {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "DOMAIN_SEPARATOR",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "PERMIT_TYPEHASH",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "allowance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "decimals",
            "outputs": [
                {
                    "internalType": "uint8",
                    "name": "",
                    "type": "uint8"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "nonces",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "deadline",
                    "type": "uint256"
                },
                {
                    "internalType": "uint8",
                    "name": "v",
                    "type": "uint8"
                },
                {
                    "internalType": "bytes32",
                    "name": "r",
                    "type": "bytes32"
                },
                {
                    "internalType": "bytes32",
                    "name": "s",
                    "type": "bytes32"
                }
            ],
            "name": "permit",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
};

export const AirdropMultiSender = {
    address: CONTRACT_ADDRESSES_BY_CHAIN[QF_CHAIN_ID].airdropMultisender,
    abi: [{ "inputs": [], "name": "InvalidAmount", "type": "error" }, { "inputs": [], "name": "InvalidRecipient", "type": "error" }, { "inputs": [], "name": "LengthMismatch", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }], "name": "SafeERC20FailedOperation", "type": "error" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "totalAmount", "type": "uint256" }], "name": "EthSent", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "token", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "totalAmount", "type": "uint256" }], "name": "TokensSent", "type": "event" }, { "inputs": [{ "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "address[]", "name": "recipients", "type": "address[]" }, { "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }], "name": "sendERC20", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "recipients", "type": "address[]" }, { "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }], "name": "sendETH", "outputs": [], "stateMutability": "payable", "type": "function" }]
}

export const NFTFactory = {
    address: CONTRACT_ADDRESSES_BY_CHAIN[QF_CHAIN_ID].nftFactory,
    abi: [
        {
            "type": "function",
            "name": "createETHNFT",
            "inputs": [
                {
                    "name": "params",
                    "type": "tuple",
                    "internalType": "struct NFTFactory.NFTParams",
                    "components": [
                        {
                            "name": "name",
                            "type": "string",
                            "internalType": "string"
                        },
                        {
                            "name": "symbol",
                            "type": "string",
                            "internalType": "string"
                        },
                        {
                            "name": "baseURI",
                            "type": "string",
                            "internalType": "string"
                        },
                        {
                            "name": "maxSupply",
                            "type": "uint256",
                            "internalType": "uint256"
                        },
                        {
                            "name": "payoutWallet",
                            "type": "address",
                            "internalType": "address"
                        },
                        {
                            "name": "mintConfig",
                            "type": "tuple",
                            "internalType": "struct MintConfig",
                            "components": [
                                {
                                    "name": "saleStart",
                                    "type": "uint64",
                                    "internalType": "uint64"
                                },
                                {
                                    "name": "saleEnd",
                                    "type": "uint64",
                                    "internalType": "uint64"
                                },
                                {
                                    "name": "walletLimit",
                                    "type": "uint32",
                                    "internalType": "uint32"
                                },
                                {
                                    "name": "price",
                                    "type": "uint128",
                                    "internalType": "uint128"
                                }
                            ]
                        }
                    ]
                }
            ],
            "outputs": [
                {
                    "name": "nft",
                    "type": "address",
                    "internalType": "address"
                }
            ],
            "stateMutability": "nonpayable"
        },
        {
            "type": "function",
            "name": "createUSDCNFT",
            "inputs": [
                {
                    "name": "params",
                    "type": "tuple",
                    "internalType": "struct NFTFactory.NFTParams",
                    "components": [
                        {
                            "name": "name",
                            "type": "string",
                            "internalType": "string"
                        },
                        {
                            "name": "symbol",
                            "type": "string",
                            "internalType": "string"
                        },
                        {
                            "name": "baseURI",
                            "type": "string",
                            "internalType": "string"
                        },
                        {
                            "name": "maxSupply",
                            "type": "uint256",
                            "internalType": "uint256"
                        },
                        {
                            "name": "payoutWallet",
                            "type": "address",
                            "internalType": "address"
                        },
                        {
                            "name": "mintConfig",
                            "type": "tuple",
                            "internalType": "struct MintConfig",
                            "components": [
                                {
                                    "name": "saleStart",
                                    "type": "uint64",
                                    "internalType": "uint64"
                                },
                                {
                                    "name": "saleEnd",
                                    "type": "uint64",
                                    "internalType": "uint64"
                                },
                                {
                                    "name": "walletLimit",
                                    "type": "uint32",
                                    "internalType": "uint32"
                                },
                                {
                                    "name": "price",
                                    "type": "uint128",
                                    "internalType": "uint128"
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "paymentToken",
                    "type": "address",
                    "internalType": "contract IERC20"
                }
            ],
            "outputs": [
                {
                    "name": "nft",
                    "type": "address",
                    "internalType": "address"
                }
            ],
            "stateMutability": "nonpayable"
        },
        {
            "type": "function",
            "name": "deployments",
            "inputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "outputs": [
                {
                    "name": "nft",
                    "type": "address",
                    "internalType": "address"
                },
                {
                    "name": "acceptsEth",
                    "type": "bool",
                    "internalType": "bool"
                },
                {
                    "name": "creator",
                    "type": "address",
                    "internalType": "address"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "tokensCreatedBy",
            "inputs": [
                {
                    "name": "creator",
                    "type": "address",
                    "internalType": "address"
                }
            ],
            "outputs": [
                {
                    "name": "",
                    "type": "address[]",
                    "internalType": "address[]"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "totalDeployments",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "event",
            "name": "NFTCreated",
            "inputs": [
                {
                    "name": "creator",
                    "type": "address",
                    "indexed": true,
                    "internalType": "address"
                },
                {
                    "name": "nft",
                    "type": "address",
                    "indexed": true,
                    "internalType": "address"
                },
                {
                    "name": "acceptsEth",
                    "type": "bool",
                    "indexed": true,
                    "internalType": "bool"
                }
            ],
            "anonymous": false
        }
    ]
}

export const PresaleContract = {

    abi: [
        {
          "type": "constructor",
          "inputs": [
            {
              "name": "saleToken_",
              "type": "address",
              "internalType": "contract IERC20"
            },
            {
              "name": "paymentToken_",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "config",
              "type": "tuple",
              "internalType": "struct PresaleConfig",
              "components": [
                { "name": "startTime", "type": "uint64", "internalType": "uint64" },
                { "name": "endTime", "type": "uint64", "internalType": "uint64" },
                { "name": "rate", "type": "uint256", "internalType": "uint256" },
                { "name": "softCap", "type": "uint256", "internalType": "uint256" },
                { "name": "hardCap", "type": "uint256", "internalType": "uint256" },
                {
                  "name": "minContribution",
                  "type": "uint256",
                  "internalType": "uint256"
                },
                {
                  "name": "maxContribution",
                  "type": "uint256",
                  "internalType": "uint256"
                }
              ]
            },
            { "name": "owner_", "type": "address", "internalType": "address" },
            {
              "name": "feeRecipient_",
              "type": "address",
              "internalType": "address"
            }
          ],
          "stateMutability": "nonpayable"
        },
        {
          "type": "function",
          "name": "FEE_BPS_DENOMINATOR",
          "inputs": [],
          "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "RATE_DIVISOR",
          "inputs": [],
          "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "addManyToWhitelist",
          "inputs": [
            { "name": "accounts", "type": "address[]", "internalType": "address[]" }
          ],
          "outputs": [],
          "stateMutability": "nonpayable"
        },
        {
          "type": "function",
          "name": "addToWhitelist",
          "inputs": [
            { "name": "account", "type": "address", "internalType": "address" }
          ],
          "outputs": [],
          "stateMutability": "nonpayable"
        },
        {
          "type": "function",
          "name": "cancelPresale",
          "inputs": [],
          "outputs": [],
          "stateMutability": "nonpayable"
        },
        {
          "type": "function",
          "name": "claimEnabled",
          "inputs": [],
          "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "claimRefund",
          "inputs": [],
          "outputs": [],
          "stateMutability": "nonpayable"
        },
        {
          "type": "function",
          "name": "claimTokens",
          "inputs": [],
          "outputs": [],
          "stateMutability": "nonpayable"
        },
        {
          "type": "function",
          "name": "committedTokens",
          "inputs": [],
          "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "contribute",
          "inputs": [
            { "name": "amount", "type": "uint256", "internalType": "uint256" }
          ],
          "outputs": [],
          "stateMutability": "payable"
        },
        {
          "type": "function",
          "name": "contributions",
          "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
          "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "depositSaleTokens",
          "inputs": [
            { "name": "amount", "type": "uint256", "internalType": "uint256" }
          ],
          "outputs": [],
          "stateMutability": "nonpayable"
        },
        {
          "type": "function",
          "name": "endTime",
          "inputs": [],
          "outputs": [{ "name": "", "type": "uint64", "internalType": "uint64" }],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "feeRecipient",
          "inputs": [],
          "outputs": [
            { "name": "", "type": "address", "internalType": "address payable" }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "finalize",
          "inputs": [],
          "outputs": [],
          "stateMutability": "nonpayable"
        },
        {
          "type": "function",
          "name": "hardCap",
          "inputs": [],
          "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "isPaymentETH",
          "inputs": [],
          "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "maxContribution",
          "inputs": [],
          "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "minContribution",
          "inputs": [],
          "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "owner",
          "inputs": [],
          "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "paymentToken",
          "inputs": [],
          "outputs": [
            { "name": "", "type": "address", "internalType": "contract IERC20" }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "proceedsClaimed",
          "inputs": [],
          "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "proceedsFeeBps",
          "inputs": [],
          "outputs": [{ "name": "", "type": "uint96", "internalType": "uint96" }],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "proceedsFeesCollected",
          "inputs": [],
          "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "purchasedTokens",
          "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
          "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "rate",
          "inputs": [],
          "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "refundsEnabled",
          "inputs": [],
          "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "removeFromWhitelist",
          "inputs": [
            { "name": "account", "type": "address", "internalType": "address" }
          ],
          "outputs": [],
          "stateMutability": "nonpayable"
        },
        {
          "type": "function",
          "name": "renounceOwnership",
          "inputs": [],
          "outputs": [],
          "stateMutability": "nonpayable"
        },
        {
          "type": "function",
          "name": "saleToken",
          "inputs": [],
          "outputs": [
            { "name": "", "type": "address", "internalType": "contract IERC20" }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "softCap",
          "inputs": [],
          "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "startTime",
          "inputs": [],
          "outputs": [{ "name": "", "type": "uint64", "internalType": "uint64" }],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "tokenFeeBps",
          "inputs": [],
          "outputs": [{ "name": "", "type": "uint96", "internalType": "uint96" }],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "tokenFeeCollected",
          "inputs": [],
          "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "tokenFeesCollected",
          "inputs": [],
          "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "tokensWithdrawn",
          "inputs": [],
          "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "totalRaised",
          "inputs": [],
          "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "totalTokensDeposited",
          "inputs": [],
          "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "transferOwnership",
          "inputs": [
            { "name": "newOwner", "type": "address", "internalType": "address" }
          ],
          "outputs": [],
          "stateMutability": "nonpayable"
        },
        {
          "type": "function",
          "name": "updateConfig",
          "inputs": [
            {
              "name": "config",
              "type": "tuple",
              "internalType": "struct PresaleConfig",
              "components": [
                { "name": "startTime", "type": "uint64", "internalType": "uint64" },
                { "name": "endTime", "type": "uint64", "internalType": "uint64" },
                { "name": "rate", "type": "uint256", "internalType": "uint256" },
                { "name": "softCap", "type": "uint256", "internalType": "uint256" },
                { "name": "hardCap", "type": "uint256", "internalType": "uint256" },
                {
                  "name": "minContribution",
                  "type": "uint256",
                  "internalType": "uint256"
                },
                {
                  "name": "maxContribution",
                  "type": "uint256",
                  "internalType": "uint256"
                }
              ]
            }
          ],
          "outputs": [],
          "stateMutability": "nonpayable"
        },
        {
          "type": "function",
          "name": "updateFees",
          "inputs": [
            {
              "name": "newTokenFeeBps",
              "type": "uint96",
              "internalType": "uint96"
            },
            {
              "name": "newProceedsFeeBps",
              "type": "uint96",
              "internalType": "uint96"
            }
          ],
          "outputs": [],
          "stateMutability": "nonpayable"
        },
        {
          "type": "function",
          "name": "whitelist",
          "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
          "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "withdrawProceeds",
          "inputs": [
            { "name": "amount", "type": "uint256", "internalType": "uint256" }
          ],
          "outputs": [],
          "stateMutability": "nonpayable"
        },
        {
          "type": "function",
          "name": "withdrawUnusedTokens",
          "inputs": [
            { "name": "amount", "type": "uint256", "internalType": "uint256" }
          ],
          "outputs": [],
          "stateMutability": "nonpayable"
        },
        {
          "type": "event",
          "name": "ConfigUpdated",
          "inputs": [
            {
              "name": "config",
              "type": "tuple",
              "indexed": false,
              "internalType": "struct PresaleConfig",
              "components": [
                { "name": "startTime", "type": "uint64", "internalType": "uint64" },
                { "name": "endTime", "type": "uint64", "internalType": "uint64" },
                { "name": "rate", "type": "uint256", "internalType": "uint256" },
                { "name": "softCap", "type": "uint256", "internalType": "uint256" },
                { "name": "hardCap", "type": "uint256", "internalType": "uint256" },
                {
                  "name": "minContribution",
                  "type": "uint256",
                  "internalType": "uint256"
                },
                {
                  "name": "maxContribution",
                  "type": "uint256",
                  "internalType": "uint256"
                }
              ]
            }
          ],
          "anonymous": false
        },
        {
          "type": "event",
          "name": "ContributionReceived",
          "inputs": [
            {
              "name": "buyer",
              "type": "address",
              "indexed": true,
              "internalType": "address"
            },
            {
              "name": "paymentAmount",
              "type": "uint256",
              "indexed": false,
              "internalType": "uint256"
            },
            {
              "name": "tokenAmount",
              "type": "uint256",
              "indexed": false,
              "internalType": "uint256"
            }
          ],
          "anonymous": false
        },
        {
          "type": "event",
          "name": "FeesUpdated",
          "inputs": [
            {
              "name": "tokenFeeBps",
              "type": "uint96",
              "indexed": false,
              "internalType": "uint96"
            },
            {
              "name": "proceedsFeeBps",
              "type": "uint96",
              "indexed": false,
              "internalType": "uint96"
            }
          ],
          "anonymous": false
        },
        {
          "type": "event",
          "name": "OwnershipTransferred",
          "inputs": [
            {
              "name": "previousOwner",
              "type": "address",
              "indexed": true,
              "internalType": "address"
            },
            {
              "name": "newOwner",
              "type": "address",
              "indexed": true,
              "internalType": "address"
            }
          ],
          "anonymous": false
        },
        {
          "type": "event",
          "name": "PresaleFinalized",
          "inputs": [
            {
              "name": "successful",
              "type": "bool",
              "indexed": false,
              "internalType": "bool"
            }
          ],
          "anonymous": false
        },
        {
          "type": "event",
          "name": "ProceedsFeeCollected",
          "inputs": [
            {
              "name": "amount",
              "type": "uint256",
              "indexed": false,
              "internalType": "uint256"
            }
          ],
          "anonymous": false
        },
        {
          "type": "event",
          "name": "ProceedsWithdrawn",
          "inputs": [
            {
              "name": "amount",
              "type": "uint256",
              "indexed": false,
              "internalType": "uint256"
            }
          ],
          "anonymous": false
        },
        {
          "type": "event",
          "name": "RefundClaimed",
          "inputs": [
            {
              "name": "buyer",
              "type": "address",
              "indexed": true,
              "internalType": "address"
            },
            {
              "name": "amount",
              "type": "uint256",
              "indexed": false,
              "internalType": "uint256"
            }
          ],
          "anonymous": false
        },
        {
          "type": "event",
          "name": "TokenFeeCollected",
          "inputs": [
            {
              "name": "amount",
              "type": "uint256",
              "indexed": false,
              "internalType": "uint256"
            }
          ],
          "anonymous": false
        },
        {
          "type": "event",
          "name": "TokensClaimed",
          "inputs": [
            {
              "name": "buyer",
              "type": "address",
              "indexed": true,
              "internalType": "address"
            },
            {
              "name": "amount",
              "type": "uint256",
              "indexed": false,
              "internalType": "uint256"
            }
          ],
          "anonymous": false
        },
        {
          "type": "event",
          "name": "TokensDeposited",
          "inputs": [
            {
              "name": "amount",
              "type": "uint256",
              "indexed": false,
              "internalType": "uint256"
            }
          ],
          "anonymous": false
        },
        {
          "type": "event",
          "name": "TokensWithdrawn",
          "inputs": [
            {
              "name": "amount",
              "type": "uint256",
              "indexed": false,
              "internalType": "uint256"
            }
          ],
          "anonymous": false
        },
        {
          "type": "event",
          "name": "WhitelistUpdated",
          "inputs": [
            {
              "name": "account",
              "type": "address",
              "indexed": true,
              "internalType": "address"
            },
            {
              "name": "allowed",
              "type": "bool",
              "indexed": false,
              "internalType": "bool"
            }
          ],
          "anonymous": false
        },
        {
          "type": "error",
          "name": "AddressEmptyCode",
          "inputs": [
            { "name": "target", "type": "address", "internalType": "address" }
          ]
        },
        {
          "type": "error",
          "name": "AddressInsufficientBalance",
          "inputs": [
            { "name": "account", "type": "address", "internalType": "address" }
          ]
        },
        { "type": "error", "name": "AlreadyFinalized", "inputs": [] },
        { "type": "error", "name": "ClaimNotEnabled", "inputs": [] },
        { "type": "error", "name": "FailedInnerCall", "inputs": [] },
        { "type": "error", "name": "HardCapReached", "inputs": [] },
        { "type": "error", "name": "InvalidAmount", "inputs": [] },
        { "type": "error", "name": "NotWhitelisted", "inputs": [] },
        { "type": "error", "name": "NothingToClaim", "inputs": [] },
        {
          "type": "error",
          "name": "OwnableInvalidOwner",
          "inputs": [
            { "name": "owner", "type": "address", "internalType": "address" }
          ]
        },
        {
          "type": "error",
          "name": "OwnableUnauthorizedAccount",
          "inputs": [
            { "name": "account", "type": "address", "internalType": "address" }
          ]
        },
        { "type": "error", "name": "ReentrancyGuardReentrantCall", "inputs": [] },
        { "type": "error", "name": "RefundsNotEnabled", "inputs": [] },
        {
          "type": "error",
          "name": "SafeERC20FailedOperation",
          "inputs": [
            { "name": "token", "type": "address", "internalType": "address" }
          ]
        },
        { "type": "error", "name": "SaleEnded", "inputs": [] },
        { "type": "error", "name": "SaleNotActive", "inputs": [] }
      ]
}

export const PresaleFactory = {
    address: CONTRACT_ADDRESSES_BY_CHAIN[QF_CHAIN_ID].presaleFactory,
    abi: [
        { "type": "constructor", "inputs": [], "stateMutability": "nonpayable" },
        {
          "type": "function",
          "name": "allPresales",
          "inputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
          "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "createPresale",
          "inputs": [
            {
              "name": "params",
              "type": "tuple",
              "internalType": "struct PresaleFactory.CreateParams",
              "components": [
                {
                  "name": "saleToken",
                  "type": "address",
                  "internalType": "address"
                },
                {
                  "name": "paymentToken",
                  "type": "address",
                  "internalType": "address"
                },
                {
                  "name": "config",
                  "type": "tuple",
                  "internalType": "struct PresaleConfig",
                  "components": [
                    {
                      "name": "startTime",
                      "type": "uint64",
                      "internalType": "uint64"
                    },
                    {
                      "name": "endTime",
                      "type": "uint64",
                      "internalType": "uint64"
                    },
                    {
                      "name": "rate",
                      "type": "uint256",
                      "internalType": "uint256"
                    },
                    {
                      "name": "softCap",
                      "type": "uint256",
                      "internalType": "uint256"
                    },
                    {
                      "name": "hardCap",
                      "type": "uint256",
                      "internalType": "uint256"
                    },
                    {
                      "name": "minContribution",
                      "type": "uint256",
                      "internalType": "uint256"
                    },
                    {
                      "name": "maxContribution",
                      "type": "uint256",
                      "internalType": "uint256"
                    }
                  ]
                },
                { "name": "owner", "type": "address", "internalType": "address" },
                {
                  "name": "requiresWhitelist",
                  "type": "bool",
                  "internalType": "bool"
                }
              ]
            }
          ],
          "outputs": [
            { "name": "presale", "type": "address", "internalType": "address" }
          ],
          "stateMutability": "nonpayable"
        },
        {
          "type": "function",
          "name": "factoryOwner",
          "inputs": [],
          "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "feeRecipient",
          "inputs": [],
          "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "presalesCreatedBy",
          "inputs": [
            { "name": "creator", "type": "address", "internalType": "address" }
          ],
          "outputs": [
            { "name": "", "type": "address[]", "internalType": "address[]" }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "setFeeRecipient",
          "inputs": [
            { "name": "newRecipient", "type": "address", "internalType": "address" }
          ],
          "outputs": [],
          "stateMutability": "nonpayable"
        },
        {
          "type": "function",
          "name": "setWhitelistedCreator",
          "inputs": [
            { "name": "creator", "type": "address", "internalType": "address" },
            { "name": "whitelisted", "type": "bool", "internalType": "bool" }
          ],
          "outputs": [],
          "stateMutability": "nonpayable"
        },
        {
          "type": "function",
          "name": "totalPresales",
          "inputs": [],
          "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "whitelistedCreators",
          "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
          "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
          "stateMutability": "view"
        },
        {
          "type": "event",
          "name": "CreatorWhitelisted",
          "inputs": [
            {
              "name": "creator",
              "type": "address",
              "indexed": true,
              "internalType": "address"
            },
            {
              "name": "whitelisted",
              "type": "bool",
              "indexed": false,
              "internalType": "bool"
            }
          ],
          "anonymous": false
        },
        {
          "type": "event",
          "name": "FeeRecipientUpdated",
          "inputs": [
            {
              "name": "newRecipient",
              "type": "address",
              "indexed": true,
              "internalType": "address"
            }
          ],
          "anonymous": false
        },
        {
          "type": "event",
          "name": "PresaleCreated",
          "inputs": [
            {
              "name": "creator",
              "type": "address",
              "indexed": true,
              "internalType": "address"
            },
            {
              "name": "presale",
              "type": "address",
              "indexed": true,
              "internalType": "address"
            },
            {
              "name": "saleToken",
              "type": "address",
              "indexed": true,
              "internalType": "address"
            },
            {
              "name": "paymentToken",
              "type": "address",
              "indexed": false,
              "internalType": "address"
            },
            {
              "name": "requiresWhitelist",
              "type": "bool",
              "indexed": false,
              "internalType": "bool"
            }
          ],
          "anonymous": false
        }
      ] as const
} as const

export const TokenFactory = {
    address: CONTRACT_ADDRESSES_BY_CHAIN[QF_CHAIN_ID].tokenFactory,
    abi: [{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "creator", "type": "address" }, { "indexed": true, "internalType": "address", "name": "token", "type": "address" }, { "indexed": true, "internalType": "enum TokenFactory.TokenType", "name": "tokenType", "type": "uint8" }], "name": "TokenCreated", "type": "event" }, { "inputs": [{ "components": [{ "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol", "type": "string" }, { "internalType": "uint8", "name": "decimals", "type": "uint8" }, { "internalType": "uint256", "name": "initialSupply", "type": "uint256" }, { "internalType": "address", "name": "initialRecipient", "type": "address" }], "internalType": "struct TokenFactory.TokenParams", "name": "params", "type": "tuple" }], "name": "createBurnableToken", "outputs": [{ "internalType": "address", "name": "token", "type": "address" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol", "type": "string" }, { "internalType": "uint8", "name": "decimals", "type": "uint8" }, { "internalType": "uint256", "name": "initialSupply", "type": "uint256" }, { "internalType": "address", "name": "initialRecipient", "type": "address" }], "internalType": "struct TokenFactory.TokenParams", "name": "params", "type": "tuple" }], "name": "createMintableToken", "outputs": [{ "internalType": "address", "name": "token", "type": "address" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol", "type": "string" }, { "internalType": "uint8", "name": "decimals", "type": "uint8" }, { "internalType": "uint256", "name": "initialSupply", "type": "uint256" }, { "internalType": "address", "name": "initialRecipient", "type": "address" }], "internalType": "struct TokenFactory.TokenParams", "name": "params", "type": "tuple" }], "name": "createNonMintableToken", "outputs": [{ "internalType": "address", "name": "token", "type": "address" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol", "type": "string" }, { "internalType": "uint8", "name": "decimals", "type": "uint8" }, { "internalType": "uint256", "name": "initialSupply", "type": "uint256" }, { "internalType": "address", "name": "initialRecipient", "type": "address" }], "internalType": "struct TokenFactory.TokenParams", "name": "params", "type": "tuple" }], "name": "createPlainToken", "outputs": [{ "internalType": "address", "name": "token", "type": "address" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol", "type": "string" }, { "internalType": "uint8", "name": "decimals", "type": "uint8" }, { "internalType": "uint256", "name": "initialSupply", "type": "uint256" }, { "internalType": "address", "name": "initialRecipient", "type": "address" }], "internalType": "struct TokenFactory.TokenParams", "name": "params", "type": "tuple" }, { "components": [{ "internalType": "address", "name": "taxWallet", "type": "address" }, { "internalType": "uint96", "name": "taxBps", "type": "uint96" }], "internalType": "struct TokenFactory.TaxParams", "name": "tax", "type": "tuple" }], "name": "createTaxableToken", "outputs": [{ "internalType": "address", "name": "token", "type": "address" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "deployments", "outputs": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "enum TokenFactory.TokenType", "name": "tokenType", "type": "uint8" }, { "internalType": "address", "name": "creator", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "creator", "type": "address" }], "name": "tokensCreatedBy", "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalDeployments", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }]
}

export const TokenLocker = {
    address: CONTRACT_ADDRESSES_BY_CHAIN[QF_CHAIN_ID].tokenLocker,
    abi: [
    {
      "type": "function",
      "name": "extendLock",
      "inputs": [
        { "name": "lockId", "type": "uint256", "internalType": "uint256" },
        { "name": "additionalTime", "type": "uint64", "internalType": "uint64" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "getLock",
      "inputs": [
        { "name": "lockId", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [
        {
          "name": "",
          "type": "tuple",
          "internalType": "struct TokenLocker.LockInfo",
          "components": [
            { "name": "token", "type": "address", "internalType": "address" },
            { "name": "owner", "type": "address", "internalType": "address" },
            { "name": "amount", "type": "uint256", "internalType": "uint256" },
            { "name": "lockDate", "type": "uint64", "internalType": "uint64" },
            {
              "name": "unlockDate",
              "type": "uint64",
              "internalType": "uint64"
            },
            { "name": "withdrawn", "type": "bool", "internalType": "bool" },
            { "name": "name", "type": "string", "internalType": "string" },
            {
              "name": "description",
              "type": "string",
              "internalType": "string"
            }
          ]
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "lockTokens",
      "inputs": [
        { "name": "token", "type": "address", "internalType": "address" },
        { "name": "amount", "type": "uint256", "internalType": "uint256" },
        { "name": "lockDuration", "type": "uint64", "internalType": "uint64" },
        { "name": "name", "type": "string", "internalType": "string" },
        { "name": "description", "type": "string", "internalType": "string" }
      ],
      "outputs": [
        { "name": "lockId", "type": "uint256", "internalType": "uint256" }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "locksOfOwner",
      "inputs": [
        { "name": "owner", "type": "address", "internalType": "address" }
      ],
      "outputs": [
        { "name": "", "type": "uint256[]", "internalType": "uint256[]" }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "totalLocks",
      "inputs": [],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "transferLockOwnership",
      "inputs": [
        { "name": "lockId", "type": "uint256", "internalType": "uint256" },
        { "name": "newOwner", "type": "address", "internalType": "address" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "unlock",
      "inputs": [
        { "name": "lockId", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "event",
      "name": "LockCreated",
      "inputs": [
        {
          "name": "lockId",
          "type": "uint256",
          "indexed": true,
          "internalType": "uint256"
        },
        {
          "name": "token",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "owner",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "amount",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "name": "unlockDate",
          "type": "uint64",
          "indexed": false,
          "internalType": "uint64"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "LockExtended",
      "inputs": [
        {
          "name": "lockId",
          "type": "uint256",
          "indexed": true,
          "internalType": "uint256"
        },
        {
          "name": "newUnlockDate",
          "type": "uint64",
          "indexed": false,
          "internalType": "uint64"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "LockReleased",
      "inputs": [
        {
          "name": "lockId",
          "type": "uint256",
          "indexed": true,
          "internalType": "uint256"
        },
        {
          "name": "amount",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "LockTransferred",
      "inputs": [
        {
          "name": "lockId",
          "type": "uint256",
          "indexed": true,
          "internalType": "uint256"
        },
        {
          "name": "newOwner",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "error",
      "name": "AddressEmptyCode",
      "inputs": [
        { "name": "target", "type": "address", "internalType": "address" }
      ]
    },
    {
      "type": "error",
      "name": "AddressInsufficientBalance",
      "inputs": [
        { "name": "account", "type": "address", "internalType": "address" }
      ]
    },
    { "type": "error", "name": "AlreadyUnlocked", "inputs": [] },
    { "type": "error", "name": "FailedInnerCall", "inputs": [] },
    { "type": "error", "name": "InvalidAddress", "inputs": [] },
    { "type": "error", "name": "InvalidAmount", "inputs": [] },
    { "type": "error", "name": "InvalidLockId", "inputs": [] },
    { "type": "error", "name": "InvalidToken", "inputs": [] },
    { "type": "error", "name": "LockNotExpired", "inputs": [] },
    { "type": "error", "name": "NotOwner", "inputs": [] },
    {
      "type": "error",
      "name": "SafeERC20FailedOperation",
      "inputs": [
        { "name": "token", "type": "address", "internalType": "address" }
      ]
    }
  ]
}

export const erc20Abi = [
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    }
] as const;


export const LaunchpadPresaleContract = PresaleContract;


// Token definitions
export const TOKENS = {
    WBLOCX: {
        symbol: 'WBLOCX',
        name: 'Wrapped BLOCX',
        address: '0xe00CBca00d36c89819289dE34e352881E8F475Fd',
        decimals: 18,
        logoURI: 'https://res.cloudinary.com/dma1c8i6n/image/upload/v1760088649/wBLOCX_ldu8l2.png',
        color: '#1E90FF'
    },
};

export const TOKEN_LIST = Object.values(TOKENS);

// Contract aliases for backward compatibility
export const AirdropMultisenderContract = AirdropMultiSender;
export const NFTFactoryContract = NFTFactory;
export const PresaleFactoryContract = PresaleFactory;

// LaunchpadNFT contract ABI (for NFTs created by NFTFactory)
export const LaunchpadNFTContract = {
    abi: [
        {
            "type": "function",
            "name": "name",
            "inputs": [],
            "outputs": [{ "name": "", "type": "string", "internalType": "string" }],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "symbol",
            "inputs": [],
            "outputs": [{ "name": "", "type": "string", "internalType": "string" }],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "maxSupply",
            "inputs": [],
            "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "totalMinted",
            "inputs": [],
            "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "mintPrice",
            "inputs": [],
            "outputs": [{ "name": "", "type": "uint128", "internalType": "uint128" }],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "mint",
            "inputs": [{ "name": "amount", "type": "uint256", "internalType": "uint256" }],
            "outputs": [],
            "stateMutability": "payable"
        }
    ]
};

export { feeToSpacing, uint256Max };
