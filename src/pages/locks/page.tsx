import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { TokenLocker } from "@/config";
import { useChainContracts } from "@/lib/hooks/useChainContracts";
import { formatDistanceToNow } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { erc20Abi, formatUnits, type Abi, type Address } from "viem";
import { useReadContract } from "@/lib/papi/hooks";
import { Lock, Search, ArrowRight, ExternalLink, Eye, Clock, CheckCircle2 } from "lucide-react";

interface LockInfo {
    token: `0x${string}`;
    owner: `0x${string}`;
    amount: bigint;
    lockDate: bigint;
    unlockDate: bigint;
    withdrawn: boolean;
    name: string;
    description: string;
}

function LockSearchCard() {
    const [searchId, setSearchId] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchId.trim()) {
            navigate(`/locks/${searchId.trim()}`);
        }
    };

    return (
        <Card className="before:hidden -rotate-[0.35deg] border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] p-0 gap-0">
            <CardHeader className="border-b-2 border-black bg-[#FFE38A] p-4">
                <CardTitle className="font-black uppercase tracking-wider flex items-center gap-2">
                    <Search className="w-5 h-5" />
                    Search Lock by ID
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <div className="flex gap-2">
                    <Input
                        placeholder="Enter Lock ID (e.g., 0, 1, 2...)"
                        value={searchId}
                        onChange={e => setSearchId(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSearch()}
                        className="border-2 border-black font-mono"
                        type="number"
                        min="0"
                    />
                    <Button
                        onClick={handleSearch}
                        disabled={!searchId.trim()}
                        className="-rotate-[0.25deg] border-4 border-black bg-[#42C9FF] text-black font-black uppercase tracking-wider shadow-[3px_3px_0_rgba(0,0,0,1)] hover:bg-[#1FB9E7]"
                    >
                        <Search className="w-4 h-4" />
                    </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    Enter a lock ID to view its details. Lock IDs start from 0.
                </p>
            </CardContent>
        </Card>
    );
}

function RecentLockCard({
    lockId,
    tokenLocker,
}: {
    lockId: bigint;
    tokenLocker: Address;
}) {
    const { data: lockInfo, isLoading } = useReadContract({
        address: tokenLocker,
        abi: TokenLocker.abi as Abi,
        functionName: 'getLock',
        args: [lockId],
    });

    const lock = lockInfo as LockInfo | undefined;

    const { data: tokenSymbol } = useReadContract({
        abi: erc20Abi,
        address: lock?.token,
        functionName: 'symbol',
        query: {
            enabled: !!lock?.token,
        }
    });

    const { data: tokenDecimals } = useReadContract({
        abi: erc20Abi,
        address: lock?.token,
        functionName: 'decimals',
        query: {
            enabled: !!lock?.token,
        }
    });

    const formattedAmount = useMemo(() => {
        if (!lock?.amount || tokenDecimals === undefined) return '...';
        return formatUnits(lock.amount, tokenDecimals);
    }, [lock?.amount, tokenDecimals]);

    const lockStatus = useMemo(() => {
        if (!lock) return 'unknown';
        if (lock.withdrawn) return 'withdrawn';
        const now = Date.now();
        const unlockTimestamp = Number(lock.unlockDate) * 1000;
        return now >= unlockTimestamp ? 'unlockable' : 'locked';
    }, [lock]);

    const progress = useMemo(() => {
        if (!lock) return 0;
        const now = Date.now();
        const lockTimestamp = Number(lock.lockDate) * 1000;
        const unlockTimestamp = Number(lock.unlockDate) * 1000;
        const totalDuration = unlockTimestamp - lockTimestamp;
        const elapsed = now - lockTimestamp;
        return Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
    }, [lock]);

    if (isLoading) {
        return (
            <Card className="before:hidden -rotate-[0.25deg] border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] p-0 gap-0 animate-pulse">
                <CardContent className="p-6 h-48 flex items-center justify-center">
                    <Lock className="w-8 h-8 text-gray-300" />
                </CardContent>
            </Card>
        );
    }

    if (!lock) return null;

    return (
        <Card className="before:hidden rotate-[0.25deg] border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] p-0 gap-0 overflow-hidden">
            <CardHeader className={`border-b-2 border-black p-4 ${
                lockStatus === 'withdrawn' ? 'bg-gray-200' :
                lockStatus === 'unlockable' ? 'bg-[#90EE90]' :
                'bg-[#FFE38A]'
            }`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        <span className="font-black uppercase tracking-wider text-sm">
                            Lock #{lockId.toString()}
                        </span>
                    </div>
                    <span className={`text-xs font-bold uppercase px-2 py-1 border-2 border-black ${
                        lockStatus === 'withdrawn' ? 'bg-gray-400 text-white' :
                        lockStatus === 'unlockable' ? 'bg-green-600 text-white' :
                        'bg-yellow-500 text-black'
                    }`}>
                        {lockStatus === 'withdrawn' ? 'Withdrawn' :
                         lockStatus === 'unlockable' ? 'Unlockable' :
                         'Locked'}
                    </span>
                </div>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
                <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Token</p>
                    <p className="font-bold">{tokenSymbol ?? '...'}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Amount</p>
                    <p className="font-black">{formattedAmount} {tokenSymbol}</p>
                </div>
                {lock.name && (
                    <div>
                        <p className="text-xs text-gray-500 uppercase font-bold">Name</p>
                        <p className="font-medium truncate">{lock.name}</p>
                    </div>
                )}
                
                {!lock.withdrawn && (
                    <div className="space-y-1">
                        <Progress 
                            value={progress} 
                            className={`h-2 border border-black ${lockStatus === 'unlockable' ? 'bg-green-100' : 'bg-gray-100'}`}
                        />
                        <p className="text-xs text-gray-500">
                            {lockStatus === 'unlockable' 
                                ? 'Ready to unlock' 
                                : `Unlocks ${formatDistanceToNow(new Date(Number(lock.unlockDate) * 1000), { addSuffix: true })}`
                            }
                        </p>
                    </div>
                )}

                <Link to={`/locks/${lockId.toString()}`}>
                    <Button
                        className="w-full mt-2 -rotate-[0.25deg] border-2 border-black bg-white text-black font-bold uppercase text-xs shadow-[2px_2px_0_rgba(0,0,0,1)] hover:bg-gray-100"
                    >
                        <Eye className="w-3 h-3 mr-1" />
                        View Details
                        <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
}

export default function LocksPage() {
    const { explorerUrl, tokenLocker } = useChainContracts();
    const { data: totalLocksCount, isLoading: isLoadingTotal } = useReadContract({
        address: tokenLocker,
        abi: TokenLocker.abi as Abi,
        functionName: 'totalLocks',
    });

    const recentLockIds = useMemo(() => {
        if (!totalLocksCount || totalLocksCount === 0n) return [];
        const total = Number(totalLocksCount);
        const count = Math.min(total, 12); // Show up to 12 recent locks
        return Array.from({ length: count }, (_, i) => BigInt(total - 1 - i));
    }, [totalLocksCount]);

    return (
        <div className="container mx-auto px-4 py-8 text-black">
            {/* Header */}
            <div className="mb-8">
                <div className="-rotate-[0.4deg] border-b-4 border-black bg-[#42C9FF] p-6 shadow-[4px_4px_0_rgba(0,0,0,1)]">
                    <h1 className="text-4xl font-black uppercase tracking-wider flex items-center gap-3">
                        <Lock className="w-8 h-8" /> Lock Explorer
                    </h1>
                    <p className="text-sm text-gray-700 mt-2">
                        Browse and verify all token locks on the platform. Complete transparency for your community.
                    </p>
                </div>
            </div>

            {/* Stats & Search */}
            <div className="grid gap-6 md:grid-cols-3 mb-8">
                <Card className="before:hidden -rotate-[0.25deg] border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] p-0 gap-0">
                    <CardContent className="p-6 text-center">
                        <p className="text-xs text-gray-500 uppercase font-bold">Total Locks Created</p>
                        <p className="text-4xl font-black mt-2">
                            {isLoadingTotal ? '...' : totalLocksCount?.toString() ?? '0'}
                        </p>
                    </CardContent>
                </Card>

                <Card className="before:hidden rotate-[0.25deg] border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] p-0 gap-0">
                    <CardContent className="p-6 text-center">
                        <p className="text-xs text-gray-500 uppercase font-bold">Contract Address</p>
                        <a 
                            href={`${explorerUrl}/address/${tokenLocker}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-xs hover:underline flex items-center justify-center gap-1 mt-2"
                        >
                            {tokenLocker.slice(0, 10)}...{tokenLocker.slice(-8)}
                            <ExternalLink className="w-3 h-3" />
                        </a>
                    </CardContent>
                </Card>

                <Card className="before:hidden -rotate-[0.25deg] border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] p-0 gap-0">
                    <CardContent className="p-6 flex flex-col items-center justify-center">
                        <Link to="/dashboard/tools/token-locker">
                            <Button className="-rotate-[0.25deg] border-4 border-black bg-[#90EE90] text-black font-black uppercase tracking-wider shadow-[3px_3px_0_rgba(0,0,0,1)] hover:bg-[#7ADF7A]">
                                <Lock className="w-4 h-4 mr-2" />
                                Create Lock
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>

            {/* Search */}
            <div className="mb-8">
                <LockSearchCard />
            </div>

            {/* Recent Locks */}
            <div>
                <h2 className="text-2xl font-black uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Clock className="w-6 h-6" />
                    Recent Locks
                </h2>

                {recentLockIds.length === 0 ? (
                    <Card className="before:hidden rotate-[0.25deg] border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)]">
                        <CardContent className="p-12 text-center space-y-4">
                            <Lock className="w-16 h-16 mx-auto text-gray-400" />
                            <p className="text-xl font-black">No Locks Yet</p>
                            <p className="text-gray-600">Be the first to create a token lock!</p>
                            <Link to="/dashboard/tools/token-locker">
                                <Button className="rotate-[0.25deg] border-4 border-black bg-[#42C9FF] text-black font-black uppercase tracking-wider shadow-[3px_3px_0_rgba(0,0,0,1)]">
                                    Create Lock
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {recentLockIds.map(lockId => (
                            <RecentLockCard
                                key={lockId.toString()}
                                lockId={lockId}
                                tokenLocker={tokenLocker}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Transparency Notice */}
            <Card className="before:hidden -rotate-[0.25deg] border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] p-0 gap-0 mt-8 bg-[#FFF2D5]">
                <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#42C9FF] border-4 border-black flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="font-black uppercase text-lg">100% On-Chain Verification</p>
                            <p className="text-gray-600 mt-1">
                                All lock data is stored on-chain and can be independently verified. Token locks provide transparency and trust for your community by proving tokens are securely locked until the specified unlock date.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
