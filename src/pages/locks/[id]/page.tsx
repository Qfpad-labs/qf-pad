import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TokenLocker } from "@/config";
import { useChainContracts } from "@/lib/hooks/useChainContracts";
import { format, formatDistanceToNow } from "date-fns";
import { useParams, Link } from "react-router-dom";
import { useMemo } from "react";
import { erc20Abi, formatUnits, type Abi } from "viem";
import { useReadContract } from "@/lib/papi/hooks";
import { Lock, Clock, ExternalLink, ArrowLeft, User, Coins, Calendar, Timer, CheckCircle2, XCircle } from "lucide-react";

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

function LockProgressBar({ lockDate, unlockDate }: { lockDate: bigint; unlockDate: bigint }) {
    const now = Date.now();
    
    // Safe number conversions
    let lockTimestamp = 0;
    let unlockTimestamp = 0;
    try {
        lockTimestamp = lockDate ? Number(lockDate) * 1000 : 0;
        unlockTimestamp = unlockDate ? Number(unlockDate) * 1000 : 0;
    } catch (e) {
        console.error("Error converting timestamps:", e);
    }
    
    const totalDuration = unlockTimestamp - lockTimestamp;
    const elapsed = now - lockTimestamp;
    const progress = totalDuration > 0 ? Math.min(100, Math.max(0, (elapsed / totalDuration) * 100)) : 0;
    
    const isExpired = unlockTimestamp > 0 && now >= unlockTimestamp;
    
    // Safe date formatting
    let lockDateStr = 'Unknown';
    let unlockDateStr = 'Unknown';
    let timeRemaining = '';
    try {
        if (lockTimestamp > 0) {
            lockDateStr = format(new Date(lockTimestamp), 'MMM d, yyyy HH:mm');
        }
        if (unlockTimestamp > 0) {
            unlockDateStr = format(new Date(unlockTimestamp), 'MMM d, yyyy HH:mm');
            if (!isExpired) {
                timeRemaining = formatDistanceToNow(new Date(unlockTimestamp), { addSuffix: true });
            }
        }
    } catch (e) {
        console.error("Error formatting dates:", e);
    }
    
    return (
        <div className="space-y-3">
            <div className="flex flex-col sm:flex-row justify-between text-sm text-gray-600 gap-2">
                <div>
                    <p className="text-xs uppercase font-bold text-gray-500">Lock Date</p>
                    <p className="font-medium">{lockDateStr}</p>
                </div>
                <div className="sm:text-right">
                    <p className="text-xs uppercase font-bold text-gray-500">Unlock Date</p>
                    <p className="font-medium">{unlockDateStr}</p>
                </div>
            </div>
            <Progress 
                value={progress} 
                className={`h-4 border-2 border-black ${isExpired ? 'bg-green-200' : 'bg-gray-200'}`}
            />
            <div className="text-center">
                {isExpired ? (
                    <span className="text-green-600 font-black text-base sm:text-lg flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-5 h-5" />
                        Ready to Unlock
                    </span>
                ) : (
                    <span className="text-yellow-600 font-bold text-sm sm:text-base">
                        {progress.toFixed(1)}% Complete • {timeRemaining ? `Unlocks ${timeRemaining}` : 'Calculating...'}
                    </span>
                )}
            </div>
        </div>
    );
}

export default function LockDetailPage() {
    const { id } = useParams<{ id: string }>();
    const { explorerUrl, tokenLocker } = useChainContracts();
    
    // Safe BigInt conversion
    let lockId: bigint | undefined = undefined;
    try {
        if (id && id.trim() !== '') {
            lockId = BigInt(id);
        }
    } catch (e) {
        console.error("Error converting lock ID to BigInt:", e, id);
    }

    const { data: lockInfo, isLoading: isLoadingLock, error: lockError } = useReadContract({
        address: tokenLocker,
        abi: TokenLocker.abi as Abi,
        functionName: 'getLock',
        args: lockId !== undefined ? [lockId] : undefined,
        query: {
            enabled: lockId !== undefined,
        }
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

    const { data: tokenName } = useReadContract({
        abi: erc20Abi,
        address: lock?.token,
        functionName: 'name',
        query: {
            enabled: !!lock?.token,
        }
    });

    const formattedAmount = useMemo(() => {
        if (!lock?.amount || tokenDecimals === undefined) return '...';
        try {
            return Number(formatUnits(lock.amount, tokenDecimals)).toLocaleString();
        } catch (e) {
            console.error("Error formatting amount:", e);
            return '...';
        }
    }, [lock?.amount, tokenDecimals]);

    const lockStatus = useMemo(() => {
        if (!lock) return 'unknown';
        if (lock.withdrawn) return 'withdrawn';
        try {
            const now = Date.now();
            const unlockTimestamp = lock.unlockDate ? Number(lock.unlockDate) * 1000 : 0;
            return unlockTimestamp > 0 && now >= unlockTimestamp ? 'unlockable' : 'locked';
        } catch (e) {
            console.error("Error calculating lock status:", e);
            return 'locked';
        }
    }, [lock]);

    if (isLoadingLock) {
        return (
            <div className="container mx-auto px-4 py-8 sm:py-12">
                <Card className="before:hidden -rotate-[0.25deg] border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] max-w-2xl mx-auto">
                    <CardContent className="p-8 sm:p-12 text-center">
                        <Lock className="w-12 h-12 sm:w-16 sm:h-16 mx-auto animate-pulse text-gray-400" />
                        <p className="text-base sm:text-lg font-bold mt-4">Loading Lock #{id}...</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (lockError || !lock) {
        return (
            <div className="container mx-auto px-4 py-8 sm:py-12">
                <Card className="before:hidden rotate-[0.25deg] border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] max-w-2xl mx-auto">
                    <CardContent className="p-8 sm:p-12 text-center space-y-4">
                        <XCircle className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-red-500" />
                        <p className="text-lg sm:text-xl font-black">Lock Not Found</p>
                        <p className="text-gray-600 text-sm sm:text-base">Lock #{id} does not exist or has not been created yet.</p>
                        <Link to="/dashboard/user">
                            <Button className="-rotate-[0.25deg] border-4 border-black bg-[#42C9FF] text-black font-black uppercase tracking-wider shadow-[3px_3px_0_rgba(0,0,0,1)]">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Dashboard
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-6 sm:py-8 text-black">
            {/* Back Link */}
            <Link 
                to="/dashboard/user"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-black mb-4 sm:mb-6 font-bold text-sm sm:text-base"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
            </Link>

            {/* Header */}
            <div className="mb-6 sm:mb-8">
                <div className={`-rotate-[0.4deg] border-4 border-black p-4 sm:p-6 shadow-[4px_4px_0_rgba(0,0,0,1)] ${
                    lockStatus === 'withdrawn' ? 'bg-gray-300' :
                    lockStatus === 'unlockable' ? 'bg-[#90EE90]' :
                    'bg-[#FFE38A]'
                }`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <p className="text-xs sm:text-sm uppercase font-bold text-gray-600">Lock #{id}</p>
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-wider flex items-center gap-2 sm:gap-3 flex-wrap">
                                <Lock className="w-6 h-6 sm:w-8 sm:h-8" />
                                <span className="break-all">{lock.name || `Token Lock #${id}`}</span>
                            </h1>
                        </div>
                        <div className={`px-3 py-1.5 sm:px-4 sm:py-2 border-4 border-black font-black uppercase text-xs sm:text-sm self-start sm:self-auto ${
                            lockStatus === 'withdrawn' ? 'bg-gray-500 text-white' :
                            lockStatus === 'unlockable' ? 'bg-green-600 text-white' :
                            'bg-yellow-500 text-black'
                        }`}>
                            {lockStatus === 'withdrawn' ? '✓ Withdrawn' :
                             lockStatus === 'unlockable' ? 'Unlockable' :
                             'Locked'}
                        </div>
                    </div>
                    {lock.description && (
                        <p className="mt-3 sm:mt-4 text-gray-700 italic text-base sm:text-lg">"{lock.description}"</p>
                    )}
                </div>
            </div>

            <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
                {/* Token Info */}
                <Card className="before:hidden -rotate-[0.25deg] border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] p-0 gap-0">
                    <CardHeader className="border-b-2 border-black bg-[#42C9FF] p-3 sm:p-4">
                        <CardTitle className="font-black uppercase tracking-wider flex items-center gap-2 text-sm sm:text-base">
                            <Coins className="w-4 h-4 sm:w-5 sm:h-5" />
                            Locked Token
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                        <div>
                            <p className="text-xs uppercase font-bold text-gray-500">Token Name</p>
                            <p className="text-lg sm:text-xl font-black break-all">{tokenName ?? '...'}</p>
                        </div>
                        <div>
                            <p className="text-xs uppercase font-bold text-gray-500">Symbol</p>
                            <p className="text-xl sm:text-2xl font-black">{tokenSymbol ?? '...'}</p>
                        </div>
                        <div>
                            <p className="text-xs uppercase font-bold text-gray-500">Contract Address</p>
                            {lock.token ? (
                                <a 
                                    href={`${explorerUrl}/address/${lock.token}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-mono text-xs sm:text-sm hover:underline flex items-center gap-2 break-all"
                                >
                                    <span className="hidden sm:inline">{lock.token}</span>
                                    <span className="sm:hidden">{lock.token.slice(0, 10)}...{lock.token.slice(-8)}</span>
                                    <ExternalLink className="w-4 h-4 flex-shrink-0" />
                                </a>
                            ) : (
                                <p className="font-mono text-xs sm:text-sm text-gray-500">Unknown</p>
                            )}
                        </div>
                        <div className="pt-3 sm:pt-4 border-t-2 border-gray-200">
                            <p className="text-xs uppercase font-bold text-gray-500">Locked Amount</p>
                            <p className="text-2xl sm:text-3xl md:text-4xl font-black break-all">
                                {formattedAmount} <span className="text-base sm:text-lg md:text-xl">{tokenSymbol}</span>
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Owner Info */}
                <Card className="before:hidden rotate-[0.25deg] border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] p-0 gap-0">
                    <CardHeader className="border-b-2 border-black bg-[#FFB6C1] p-3 sm:p-4">
                        <CardTitle className="font-black uppercase tracking-wider flex items-center gap-2 text-sm sm:text-base">
                            <User className="w-4 h-4 sm:w-5 sm:h-5" />
                            Lock Owner
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                        <div>
                            <p className="text-xs uppercase font-bold text-gray-500">Owner Address</p>
                            {lock.owner ? (
                                <a 
                                    href={`${explorerUrl}/address/${lock.owner}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-mono text-xs sm:text-sm hover:underline flex items-center gap-2 break-all"
                                >
                                    <span className="hidden sm:inline">{lock.owner}</span>
                                    <span className="sm:hidden">{lock.owner.slice(0, 10)}...{lock.owner.slice(-8)}</span>
                                    <ExternalLink className="w-4 h-4 flex-shrink-0" />
                                </a>
                            ) : (
                                <p className="font-mono text-xs sm:text-sm text-gray-500">Unknown</p>
                            )}
                        </div>
                        <div className="p-3 sm:p-4 bg-gray-100 border-2 border-gray-300">
                            <p className="text-xs sm:text-sm text-gray-600">
                                The owner has exclusive rights to withdraw tokens after the unlock date, extend the lock duration, or transfer ownership to another address.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Progress Section */}
            {!lock.withdrawn && (
                <Card className="before:hidden -rotate-[0.25deg] border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] p-0 gap-0 mt-4 sm:mt-6">
                    <CardHeader className="border-b-2 border-black bg-white p-3 sm:p-4">
                        <CardTitle className="font-black uppercase tracking-wider flex items-center gap-2 text-sm sm:text-base">
                            <Timer className="w-4 h-4 sm:w-5 sm:h-5" />
                            Lock Progress
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6">
                        <LockProgressBar lockDate={lock.lockDate} unlockDate={lock.unlockDate} />
                    </CardContent>
                </Card>
            )}

            {/* Timeline - Only for withdrawn locks */}
            {lock.withdrawn && (
                <Card className="before:hidden rotate-[0.25deg] border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] p-0 gap-0 mt-4 sm:mt-6">
                    <CardHeader className="border-b-2 border-black bg-white p-3 sm:p-4">
                        <CardTitle className="font-black uppercase tracking-wider flex items-center gap-2 text-sm sm:text-base">
                            <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                            Timeline
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6">
                        <div className="relative">
                            {/* Timeline line */}
                            <div className="absolute left-[14px] sm:left-4 top-0 bottom-0 w-0.5 sm:w-1 bg-black"></div>
                            
                            {/* Lock Created */}
                            <div className="relative flex items-start gap-3 sm:gap-4 pb-6 sm:pb-8">
                                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#42C9FF] border-2 sm:border-4 border-black flex items-center justify-center z-10 flex-shrink-0">
                                    <Lock className="w-3 h-3 sm:w-4 sm:h-4" />
                                </div>
                                <div className="pt-0.5">
                                    <p className="font-black uppercase text-sm sm:text-base">Lock Created</p>
                                    <p className="text-gray-600 text-xs sm:text-sm">
                                        {(() => {
                                            try {
                                                const timestamp = lock.lockDate ? Number(lock.lockDate) * 1000 : 0;
                                                return timestamp > 0 ? format(new Date(timestamp), 'MMM d, yyyy \'at\' HH:mm') : 'Unknown';
                                            } catch (e) {
                                                console.error("Error formatting lock date:", e);
                                                return 'Unknown';
                                            }
                                        })()}
                                    </p>
                                </div>
                            </div>

                            {/* Unlock Date */}
                            <div className="relative flex items-start gap-3 sm:gap-4 pb-6 sm:pb-8">
                                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#90EE90] border-2 sm:border-4 border-black flex items-center justify-center z-10 flex-shrink-0">
                                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                                </div>
                                <div className="pt-0.5">
                                    <p className="font-black uppercase text-sm sm:text-base">Unlock Date</p>
                                    <p className="text-gray-600 text-xs sm:text-sm">
                                        {(() => {
                                            try {
                                                const timestamp = lock.unlockDate ? Number(lock.unlockDate) * 1000 : 0;
                                                return timestamp > 0 ? format(new Date(timestamp), 'MMM d, yyyy \'at\' HH:mm') : 'Unknown';
                                            } catch (e) {
                                                console.error("Error formatting unlock date:", e);
                                                return 'Unknown';
                                            }
                                        })()}
                                    </p>
                                </div>
                            </div>

                            {/* Withdrawn */}
                            <div className="relative flex items-start gap-3 sm:gap-4">
                                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-gray-400 border-2 sm:border-4 border-black flex items-center justify-center z-10 flex-shrink-0">
                                    <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                                </div>
                                <div className="pt-0.5">
                                    <p className="font-black uppercase text-sm sm:text-base">Tokens Withdrawn</p>
                                    <p className="text-gray-600 text-xs sm:text-sm">
                                        The locked tokens have been claimed by the owner.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Verification Notice */}
            <Card className="before:hidden -rotate-[0.25deg] border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] p-0 gap-0 mt-4 sm:mt-6 bg-[#FFF2D5]">
                <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#42C9FF] border-2 sm:border-4 border-black flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <div>
                            <p className="font-black uppercase text-base sm:text-lg">Verified On-Chain</p>
                            <p className="text-gray-600 mt-1 text-xs sm:text-sm">
                                This lock is verified on the blockchain. All data is fetched directly from the smart contract at{' '}
                                <a 
                                    href={`${explorerUrl}/address/${tokenLocker}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-mono text-xs hover:underline break-all"
                                >
                                    {tokenLocker.slice(0, 10)}...{tokenLocker.slice(-8)}
                                </a>
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
