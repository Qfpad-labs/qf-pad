import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStakingContractAddress, StakingContract } from "@/config";
import { useConnectModal } from "@/lib/papi/hooks";
import {
  BarChart3,
  Gift,
  Loader2,
  Wallet
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import {
  erc20Abi,
  formatUnits,
  parseUnits,
  type Abi,
  type Address,
} from "viem";
import {
  useAccount,
  useChainId,
  usePublicClient,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "@/lib/papi/hooks";

export default function StakingPage() {
  const { openConnectModal } = useConnectModal();
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const stakingContractAddress = getStakingContractAddress(chainId);

  const [activeTab, setActiveTab] = useState<"stake" | "unstake">("stake");
  const [stakeAmount, setStakeAmount] = useState("");
  const [unstakeAmount, setUnstakeAmount] = useState("");

  const [isApproving, setIsApproving] = useState(false);
  const [isStaking, setIsStaking] = useState(false);
  const [stakingHash, setStakingHash] = useState<string>();
  const [isUnstaking, setIsUnstaking] = useState(false);
  const [unstakingHash, setUnstakingHash] = useState<string>();
  const [isClaiming, setIsClaiming] = useState(false);
  const [claimHash, setClaimHash] = useState<string>();

  const processedStakingHash = useRef<string | null>(null);
  const processedUnstakingHash = useRef<string | null>(null);
  const processedClaimHash = useRef<string | null>(null);
  const rewardsAnimationFrameRef = useRef<number | null>(null);
  const animatedPendingRewardsRef = useRef(0);

  const [animatedPendingRewards, setAnimatedPendingRewards] = useState(0);
  const [isPendingRewardsAnimating, setIsPendingRewardsAnimating] = useState(false);

  // Read staking token address
  const { data: stakingTokenAddress } = useReadContract({
    address: stakingContractAddress,
    abi: StakingContract.abi as Abi,
    functionName: "stakingToken",
  });

  // Read rewards token address
  const { data: rewardsTokenAddress } = useReadContract({
    address: stakingContractAddress,
    abi: StakingContract.abi as Abi,
    functionName: "rewardsToken",
  });

  // Read staking token info
  const { data: stakingTokenSymbol } = useReadContract({
    abi: erc20Abi,
    address: stakingTokenAddress as Address,
    functionName: "symbol",
    query: { enabled: !!stakingTokenAddress },
  });

  const { data: stakingTokenDecimals } = useReadContract({
    abi: erc20Abi,
    address: stakingTokenAddress as Address,
    functionName: "decimals",
    query: { enabled: !!stakingTokenAddress },
  });

  // Read rewards token info
  const { data: rewardsTokenSymbol } = useReadContract({
    abi: erc20Abi,
    address: rewardsTokenAddress as Address,
    functionName: "symbol",
    query: { enabled: !!rewardsTokenAddress },
  });

  const { data: rewardsTokenDecimals } = useReadContract({
    abi: erc20Abi,
    address: rewardsTokenAddress as Address,
    functionName: "decimals",
    query: { enabled: !!rewardsTokenAddress },
  });

  // Read user's wallet balance of staking token
  const { data: walletBalance, refetch: refetchWalletBalance } = useReadContract({
    abi: erc20Abi,
    address: stakingTokenAddress as Address,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: !!address && !!stakingTokenAddress },
  });

  // Read allowance
  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    abi: erc20Abi,
    address: stakingTokenAddress as Address,
    functionName: "allowance",
    args: address ? [address, stakingContractAddress] : undefined,
    query: { enabled: !!address && !!stakingTokenAddress },
  });

  // Read user's staked balance
  const { data: stakedBalance, refetch: refetchStakedBalance } = useReadContract({
    address: stakingContractAddress,
    abi: StakingContract.abi as Abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  // Read total amount staked in contract
  const { data: totalStaked, refetch: refetchTotalStaked } = useReadContract({
    address: stakingContractAddress,
    abi: StakingContract.abi as Abi,
    functionName: "totalSupply",
    query: {
      refetchInterval: 5000,
    },
  });

  // Read pending rewards
  const { data: pendingRewards, refetch: refetchPendingRewards } = useReadContract({
    address: stakingContractAddress,
    abi: StakingContract.abi as Abi,
    functionName: "pendingRewards",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
      refetchInterval: 5000,
    },
  });

  // Transaction receipts
  const { isSuccess: isStakingSuccess, isError: isStakingError } =
    useWaitForTransactionReceipt({ hash: stakingHash });

  const { isSuccess: isUnstakingSuccess, isError: isUnstakingError } =
    useWaitForTransactionReceipt({ hash: unstakingHash });

  const { isSuccess: isClaimSuccess, isError: isClaimError } =
    useWaitForTransactionReceipt({ hash: claimHash });

  // Format values
  const decimals = stakingTokenDecimals ?? 18;
  const rewardDecimals = rewardsTokenDecimals ?? 18;
  const stakingTokenDisplaySymbol =
    typeof stakingTokenSymbol === "string" && stakingTokenSymbol.trim().length > 0
      ? stakingTokenSymbol
      : "QFPAD";

  const formattedWalletBalance = useMemo(() => {
    if (walletBalance === undefined || walletBalance === null) return "0";
    try {
      return Number(formatUnits(walletBalance as bigint, decimals)).toLocaleString(undefined, { maximumFractionDigits: 6 });
    } catch { return "0"; }
  }, [walletBalance, decimals]);

  const formattedStakedBalance = useMemo(() => {
    if (stakedBalance === undefined || stakedBalance === null) return "0";
    try {
      return Number(formatUnits(stakedBalance as bigint, decimals)).toLocaleString(undefined, { maximumFractionDigits: 6 });
    } catch { return "0"; }
  }, [stakedBalance, decimals]);

  const formattedTotalStaked = useMemo(() => {
    if (totalStaked === undefined || totalStaked === null) return "0";
    try {
      return Number(formatUnits(totalStaked as bigint, decimals)).toLocaleString(undefined, { maximumFractionDigits: 6 });
    } catch { return "0"; }
  }, [totalStaked, decimals]);

  const pendingRewardsValue = useMemo(() => {
    if (pendingRewards === undefined || pendingRewards === null) return 0;
    try {
      const value = Number(formatUnits(pendingRewards as bigint, rewardDecimals));
      return Number.isFinite(value) ? value : 0;
    } catch { return 0; }
  }, [pendingRewards, rewardDecimals]);

  useEffect(() => {
    const targetValue = pendingRewardsValue;
    const startValue = animatedPendingRewardsRef.current;

    if (Math.abs(targetValue - startValue) < Number.EPSILON) {
      animatedPendingRewardsRef.current = targetValue;
      setAnimatedPendingRewards(targetValue);
      setIsPendingRewardsAnimating(false);
      return;
    }

    if (rewardsAnimationFrameRef.current) {
      cancelAnimationFrame(rewardsAnimationFrameRef.current);
    }

    setIsPendingRewardsAnimating(true);

    const duration = 1800;
    let startTime: number | null = null;

    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - 2 ** (-10 * t));

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutExpo(progress);
      const nextValue = startValue + (targetValue - startValue) * easedProgress;

      animatedPendingRewardsRef.current = nextValue;
      setAnimatedPendingRewards(nextValue);

      if (progress < 1) {
        rewardsAnimationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      animatedPendingRewardsRef.current = targetValue;
      setAnimatedPendingRewards(targetValue);
      setIsPendingRewardsAnimating(false);
      rewardsAnimationFrameRef.current = null;
    };

    rewardsAnimationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (rewardsAnimationFrameRef.current) {
        cancelAnimationFrame(rewardsAnimationFrameRef.current);
      }
    };
  }, [pendingRewardsValue]);

  const formattedPendingRewards = useMemo(
    () => animatedPendingRewards.toLocaleString(undefined, { maximumFractionDigits: 6 }),
    [animatedPendingRewards]
  );

  // Check if approval is needed
  const needsApproval = useMemo(() => {
    if (!stakeAmount || allowance === undefined || allowance === null) return false;
    try {
      const amount = parseUnits(stakeAmount, decimals);
      return (allowance as bigint) < amount;
    } catch { return false; }
  }, [stakeAmount, allowance, decimals]);

  // Has claimable rewards
  const hasClaimableRewards = useMemo(() => {
    if (pendingRewards === undefined || pendingRewards === null) return false;
    return (pendingRewards as bigint) > 0n;
  }, [pendingRewards]);

  // Insufficient balance checks
  const hasInsufficientStakeBalance = useMemo(() => {
    if (!stakeAmount || walletBalance === undefined || walletBalance === null) return false;
    try {
      const amount = parseUnits(stakeAmount, decimals);
      return amount > (walletBalance as bigint);
    } catch { return false; }
  }, [stakeAmount, walletBalance, decimals]);

  const hasInsufficientUnstakeBalance = useMemo(() => {
    if (!unstakeAmount || stakedBalance === undefined || stakedBalance === null) return false;
    try {
      const amount = parseUnits(unstakeAmount, decimals);
      return amount > (stakedBalance as bigint);
    } catch { return false; }
  }, [unstakeAmount, stakedBalance, decimals]);

  // Handle staking success/error
  useEffect(() => {
    if (isStakingSuccess && stakingHash && processedStakingHash.current !== stakingHash) {
      processedStakingHash.current = stakingHash;
      setIsStaking(false);
      setStakingHash(undefined);
      setStakeAmount("");
      refetchWalletBalance();
      refetchStakedBalance();
      refetchTotalStaked();
      refetchPendingRewards();
      toast.success("Staking successful!");
    }
  }, [isStakingSuccess, stakingHash, refetchWalletBalance, refetchStakedBalance, refetchTotalStaked, refetchPendingRewards]);

  useEffect(() => {
    if (isStakingError && stakingHash && processedStakingHash.current !== stakingHash) {
      processedStakingHash.current = stakingHash;
      setIsStaking(false);
      setStakingHash(undefined);
      toast.error("Staking failed.");
    }
  }, [isStakingError, stakingHash]);

  // Handle unstaking success/error
  useEffect(() => {
    if (isUnstakingSuccess && unstakingHash && processedUnstakingHash.current !== unstakingHash) {
      processedUnstakingHash.current = unstakingHash;
      setIsUnstaking(false);
      setUnstakingHash(undefined);
      setUnstakeAmount("");
      refetchWalletBalance();
      refetchStakedBalance();
      refetchTotalStaked();
      refetchPendingRewards();
      toast.success("Withdrawal successful!");
    }
  }, [isUnstakingSuccess, unstakingHash, refetchWalletBalance, refetchStakedBalance, refetchTotalStaked, refetchPendingRewards]);

  useEffect(() => {
    if (isUnstakingError && unstakingHash && processedUnstakingHash.current !== unstakingHash) {
      processedUnstakingHash.current = unstakingHash;
      setIsUnstaking(false);
      setUnstakingHash(undefined);
      toast.error("Withdrawal failed.");
    }
  }, [isUnstakingError, unstakingHash]);

  // Handle claim success/error
  useEffect(() => {
    if (isClaimSuccess && claimHash && processedClaimHash.current !== claimHash) {
      processedClaimHash.current = claimHash;
      setIsClaiming(false);
      setClaimHash(undefined);
      refetchPendingRewards();
      refetchWalletBalance();
      toast.success("Rewards claimed!");
    }
  }, [isClaimSuccess, claimHash, refetchPendingRewards, refetchWalletBalance]);

  useEffect(() => {
    if (isClaimError && claimHash && processedClaimHash.current !== claimHash) {
      processedClaimHash.current = claimHash;
      setIsClaiming(false);
      setClaimHash(undefined);
      toast.error("Claim failed.");
    }
  }, [isClaimError, claimHash]);

  const handleStake = async () => {
    if (!address || !stakingTokenAddress || !stakeAmount) return;

    try {
      const amount = parseUnits(stakeAmount, decimals);

      if (amount <= 0n) {
        toast.error("Enter an amount greater than 0.");
        return;
      }

      if (!publicClient) {
        toast.error("Could not access network client. Please retry.");
        return;
      }

      const currentAllowance = (allowance as bigint | undefined) ?? 0n;

      if (currentAllowance < amount) {
        setIsApproving(true);
        toast.info(`Approving ${stakingTokenDisplaySymbol}...`);

        const approvalTxHash = await writeContractAsync({
          address: stakingTokenAddress as Address,
          abi: erc20Abi,
          functionName: "approve",
          args: [stakingContractAddress, amount],
        });

        const approvalReceipt = await publicClient.waitForTransactionReceipt({
          hash: approvalTxHash as `0x${string}`,
        });

        if (approvalReceipt.status !== "success") {
          throw new Error("Approval transaction failed.");
        }

        await refetchAllowance();
        setIsApproving(false);
        toast.success("Approval confirmed. Confirm staking to continue.");
      }

      setIsStaking(true);

      const hash = await writeContractAsync({
        address: stakingContractAddress,
        abi: StakingContract.abi as Abi,
        functionName: "stake",
        args: [amount],
      });

      setStakingHash(hash);
      toast.info("Staking tokens...");
    } catch (err: unknown) {
      setIsApproving(false);
      setIsStaking(false);
      const message = (err as { shortMessage?: string })?.shortMessage || "Staking failed";
      toast.error(message);
    }
  };

  const handleUnstake = async () => {
    if (!address || !unstakeAmount) return;

    try {
      setIsUnstaking(true);
      const amount = parseUnits(unstakeAmount, decimals);

      const hash = await writeContractAsync({
        address: stakingContractAddress,
        abi: StakingContract.abi as Abi,
        functionName: "withdraw",
        args: [amount],
      });

      setUnstakingHash(hash);
      toast.info("Withdrawing tokens...");
    } catch (err: unknown) {
      setIsUnstaking(false);
      const message = (err as { shortMessage?: string })?.shortMessage || "Withdrawal failed";
      toast.error(message);
    }
  };

  const handleClaim = async () => {
    if (!address) return;

    try {
      setIsClaiming(true);

      const hash = await writeContractAsync({
        address: stakingContractAddress,
        abi: StakingContract.abi as Abi,
        functionName: "getReward",
        args: [],
      });

      setClaimHash(hash);
      toast.info("Claiming rewards...");
    } catch (err: unknown) {
      setIsClaiming(false);
      const message = (err as { shortMessage?: string })?.shortMessage || "Claim failed";
      toast.error(message);
    }
  };

  const handleMaxStake = () => {
    if (walletBalance && decimals) {
      setStakeAmount(formatUnits(walletBalance as bigint, decimals));
    }
  };

  const handleMaxUnstake = () => {
    if (stakedBalance && decimals) {
      setUnstakeAmount(formatUnits(stakedBalance as bigint, decimals));
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 text-black">
      {/* Header Banner */}
      <div className="mb-6 sm:mb-8">
        <div className="border-[3px] border-black bg-[#FFF2D5] p-5 sm:p-7 [box-shadow:0_0_0_1px_#000,8px_8px_0_0_#000]">
          <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-start">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-[0.14em]">
                  Staking
                </h1>
              </div>
              <p className="mt-4 max-w-3xl text-base sm:text-lg font-bold text-black/80">
                Stake {stakingTokenDisplaySymbol} and earn {rewardsTokenSymbol || "rewards"} from a cleaner,
                faster staking panel.
              </p>
            </div>
            <div className="inline-flex rotate-[0.6deg] self-start border-[3px] border-black bg-[#B8EF53] px-4 py-2 text-xs font-black uppercase tracking-[0.14em]">
              Live Rewards
            </div>
          </div>
        </div>
      </div>


      {!isConnected ? (
        <Card className="before:hidden -rotate-[0.25deg] py-0 border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] max-w-2xl mx-auto bg-white">
          <CardContent className="p-8 sm:p-12 text-center space-y-6">
            <Wallet className="w-16 h-16 mx-auto text-gray-400" />
            <div>
              <h2 className="text-2xl font-black uppercase mb-2">Connect Your Wallet</h2>
              <p className="text-gray-600">Connect your wallet to start staking and earning rewards.</p>
            </div>
            <Button
              onClick={openConnectModal}
              className="-rotate-[0.25deg] bg-[#FF7F41] text-black font-black uppercase tracking-wider border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] hover:bg-[#F06A56] hover:shadow-[6px_6px_0_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all px-8 py-6 text-lg"
            >
              Connect Wallet
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Stats */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="before:hidden rotate-[0.3deg] py-0 border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] p-0 gap-0">
              <CardHeader className="border-b-2 border-black bg-[#F5CF85] p-4">
                <CardTitle className="font-black uppercase tracking-wider flex items-center gap-2">
                  <Wallet className="w-5 h-5" />
                  Your Position
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                <div className="p-4 border-2 border-black bg-[#EAF7FF]">
                  <p className="text-xs uppercase font-bold text-gray-500">Wallet Balance</p>
                  <p className="text-2xl font-black text-gray-900">{formattedWalletBalance}</p>
                  <p className="text-sm text-gray-500">{stakingTokenDisplaySymbol}</p>
                </div>
                <div className="p-4 border-2 border-black bg-[#FFF6E5]">
                  <p className="text-xs uppercase font-bold text-gray-500">Staked Balance</p>
                  <p className="text-2xl font-black text-gray-900">{formattedStakedBalance}</p>
                  <p className="text-sm text-gray-500">{stakingTokenDisplaySymbol}</p>
                </div>
                <div className="p-4 border-2 border-black bg-[#ECF9E9]">
                  <p className="text-xs uppercase font-bold text-gray-500">Pending Rewards</p>
                  <p
                    className={`text-2xl font-black transition-all duration-700 ${isPendingRewardsAnimating
                      ? "text-emerald-700 scale-[1.03] animate-pulse"
                      : "text-gray-900 scale-100"
                      }`}
                  >
                    {formattedPendingRewards}
                  </p>
                  <p className="text-sm text-gray-500">{rewardsTokenSymbol || "Tokens"}</p>
                </div>
              </CardContent>
            </Card>

            {/* Claim Rewards */}
            {hasClaimableRewards && (
              <Card className="before:hidden -rotate-[0.25deg] py-0 border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] p-0 gap-0 overflow-hidden">
                <CardContent className="p-0">
                  <Button
                    onClick={handleClaim}
                    disabled={isClaiming}
                    className="rotate-[0.25deg] w-full h-full py-6 rounded-none border-0 bg-[#FF7F41] text-black font-black uppercase tracking-wider text-lg hover:bg-[#F06A56] disabled:opacity-50"
                  >
                    {isClaiming ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Claiming...
                      </>
                    ) : (
                      <>
                        <Gift className="w-5 h-5 mr-2" />
                        Claim {formattedPendingRewards} {rewardsTokenSymbol}
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Stake/Unstake Form */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="before:hidden -rotate-[0.25deg] py-0 border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] p-0 gap-0">
              <CardContent className="p-4 sm:p-6 bg-[#FFF8EC]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase font-bold text-gray-500">Total Staked</p>
                    <p className="text-3xl sm:text-4xl font-black text-gray-900">{formattedTotalStaked}</p>
                    <p className="text-sm text-gray-500">{stakingTokenDisplaySymbol}</p>
                  </div>
                  <span className="inline-flex h-11 w-11 items-center justify-center border-[3px] border-black bg-[#B8EF53]">
                    <BarChart3 className="w-6 h-6 text-black shrink-0" />
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="before:hidden rotate-[0.3deg] py-0 border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] p-0 gap-0">
              <CardHeader className="border-b-2 border-black bg-[#FFF2D5] p-0">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab("stake")}
                    className={`flex-1 py-4 font-black uppercase tracking-wider text-sm transition-colors ${activeTab === "stake"
                      ? "bg-[#42C9FF] text-black"
                      : "bg-[#F3EAD8] text-gray-700 hover:bg-[#EADFC8]"
                      }`}
                  >
                    Stake
                  </button>
                  <button
                    onClick={() => setActiveTab("unstake")}
                    className={`flex-1 py-4 font-black uppercase tracking-wider text-sm transition-colors border-l-2 border-black ${activeTab === "unstake"
                      ? "bg-[#FF7F41] text-black"
                      : "bg-[#F3EAD8] text-gray-700 hover:bg-[#EADFC8]"
                      }`}
                  >
                    Unstake
                  </button>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                {activeTab === "stake" ? (
                  <div className="space-y-4">
                    <div>
                      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                        <label className="text-xs font-black uppercase tracking-[0.14em]">Amount to Stake</label>
                        <div className="inline-flex items-center gap-2 border-[2px] border-black bg-[#FFF2D5] px-2 py-1 text-[11px] font-black uppercase tracking-[0.12em]">
                          <span className="text-black/60">Balance</span>
                          <span className="font-mono text-black">{formattedWalletBalance}</span>
                          <button
                            type="button"
                            onClick={handleMaxStake}
                            className="border-[2px] border-black bg-[#42C9FF] px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.12em] hover:bg-[#31BEEB]"
                          >
                            MAX
                          </button>
                        </div>
                      </div>
                      <div className="border-[2px] border-black bg-white px-4 py-3 [box-shadow:0_0_0_1px_#000,4px_4px_0_0_#000]">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <input
                            type="text"
                            value={stakeAmount}
                            onChange={(e) => setStakeAmount(e.target.value)}
                            placeholder="0.0"
                            inputMode="decimal"
                            className="min-w-0 flex-1 border-0 bg-transparent p-0 text-xl font-black text-black placeholder:text-black/40 outline-none ring-0 focus:outline-none focus:ring-0 sm:text-2xl"
                          />
                          <span
                            title={stakingTokenDisplaySymbol}
                            className="max-w-[7rem] shrink-0 truncate border-[2px] border-black bg-[#FFE38A] px-2 py-1 text-[10px] font-black uppercase leading-none tracking-[0.12em] sm:max-w-[9rem] sm:px-3 sm:text-xs"
                          >
                            {stakingTokenDisplaySymbol}
                          </span>
                        </div>
                      </div>
                      {hasInsufficientStakeBalance && (
                        <p className="text-red-500 text-sm mt-2 font-bold">Insufficient balance</p>
                      )}
                    </div>

                    <Button
                      onClick={handleStake}
                      disabled={isApproving || isStaking || !stakeAmount || hasInsufficientStakeBalance}
                      className={`-rotate-[0.25deg] w-full py-6 text-black font-black uppercase tracking-wider border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] hover:shadow-[6px_6px_0_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all disabled:opacity-50 ${needsApproval ? "bg-[#FFE38A] hover:bg-[#FFDA73]" : "bg-[#B8EF53] hover:bg-[#A6DD4A]"
                        }`}
                    >
                      {isApproving ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Approving...
                        </>
                      ) : isStaking ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Staking...
                        </>
                      ) : needsApproval ? (
                        `Approve + Stake ${stakingTokenDisplaySymbol}`
                      ) : (
                        "Stake"
                      )}
                    </Button>
                    {needsApproval && (
                      <p className="text-xs text-gray-600 font-bold text-center">
                        This action requires 2 wallet confirmations.
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                        <label className="text-xs font-black uppercase tracking-[0.14em]">Amount to Unstake</label>
                        <div className="inline-flex items-center gap-2 border-[2px] border-black bg-[#FFF2D5] px-2 py-1 text-[11px] font-black uppercase tracking-[0.12em]">
                          <span className="text-black/60">Staked</span>
                          <span className="font-mono text-black">{formattedStakedBalance}</span>
                          <button
                            type="button"
                            onClick={handleMaxUnstake}
                            className="border-[2px] border-black bg-[#FF7F41] px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.12em] hover:bg-[#F06A56]"
                          >
                            MAX
                          </button>
                        </div>
                      </div>
                      <div className="border-[2px] border-black bg-white px-4 py-3 [box-shadow:0_0_0_1px_#000,4px_4px_0_0_#000]">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <input
                            type="text"
                            value={unstakeAmount}
                            onChange={(e) => setUnstakeAmount(e.target.value)}
                            placeholder="0.0"
                            inputMode="decimal"
                            className="min-w-0 flex-1 border-0 bg-transparent p-0 text-xl font-black text-black placeholder:text-black/40 outline-none ring-0 focus:outline-none focus:ring-0 sm:text-2xl"
                          />
                          <span
                            title={stakingTokenDisplaySymbol}
                            className="max-w-[7rem] shrink-0 truncate border-[2px] border-black bg-[#FFD9BE] px-2 py-1 text-[10px] font-black uppercase leading-none tracking-[0.12em] sm:max-w-[9rem] sm:px-3 sm:text-xs"
                          >
                            {stakingTokenDisplaySymbol}
                          </span>
                        </div>
                      </div>
                      {hasInsufficientUnstakeBalance && (
                        <p className="text-red-500 text-sm mt-2 font-bold">Insufficient staked balance</p>
                      )}
                    </div>

                    <Button
                      onClick={handleUnstake}
                      disabled={isUnstaking || !unstakeAmount || hasInsufficientUnstakeBalance}
                      className="rotate-[0.25deg] w-full py-6 bg-[#FF7F41] text-black font-black uppercase tracking-wider border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] hover:bg-[#F06A56] hover:shadow-[6px_6px_0_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all disabled:opacity-50"
                    >
                      {isUnstaking ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Withdrawing...
                        </>
                      ) : (
                        "Unstake"
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
