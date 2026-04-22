import { AdminRoute } from "@/components/admin/AdminRoute";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAccount, useReadContract } from "@/lib/papi/hooks";
import { useFeeRecipient } from "@/lib/utils/admin";
import { useUpdatePresaleFees } from "@/lib/hooks/useAdminActions";
import { useLaunchpadPresales, type PresaleWithStatus } from "@/lib/hooks/useLaunchpadPresales";
import { LaunchpadPresaleContract } from "@/config";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { formatEther, type Address, erc20Abi } from "viem";
import { getFriendlyTxErrorMessage } from "@/lib/utils/tx-errors";
import { ArrowLeft, ExternalLink, RefreshCw } from "lucide-react";

function PresaleCard({
  presale,
  isFeeRecipient,
}: {
  presale: PresaleWithStatus;
  isFeeRecipient: boolean;
}) {
  const [showFeeForm, setShowFeeForm] = useState(false);
  const [newTokenFeeBps, setNewTokenFeeBps] = useState("");
  const [newProceedsFeeBps, setNewProceedsFeeBps] = useState("");

  const {
    updateFees,
    isBusy,
    isSuccess,
    isError,
    error,
    reset,
  } = useUpdatePresaleFees();

  // Fetch current fees
  const { data: currentTokenFeeBps } = useReadContract({
    address: presale.address as Address,
    abi: LaunchpadPresaleContract.abi,
    functionName: "tokenFeeBps",
  });

  const { data: currentProceedsFeeBps } = useReadContract({
    address: presale.address as Address,
    abi: LaunchpadPresaleContract.abi,
    functionName: "proceedsFeeBps",
  });

  // Fetch token symbol
  const { data: tokenSymbol } = useReadContract({
    address: presale.saleToken as Address,
    abi: erc20Abi,
    functionName: "symbol",
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Fees updated successfully");
      setShowFeeForm(false);
      setNewTokenFeeBps("");
      setNewProceedsFeeBps("");
      reset();
    }
  }, [isSuccess, reset]);

  useEffect(() => {
    if (isError && error) {
      toast.error(getFriendlyTxErrorMessage(error, "Update fees"));
      reset();
    }
  }, [isError, error, reset]);

  const handleUpdateFees = () => {
    const tokenFee = parseInt(newTokenFeeBps);
    const proceedsFee = parseInt(newProceedsFeeBps);

    if (isNaN(tokenFee) || tokenFee < 0 || tokenFee > 10000) {
      toast.error("Token fee must be between 0 and 10000 bps");
      return;
    }
    if (isNaN(proceedsFee) || proceedsFee < 0 || proceedsFee > 10000) {
      toast.error("Proceeds fee must be between 0 and 10000 bps");
      return;
    }

    updateFees(presale.address as Address, tokenFee, proceedsFee);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "bg-green-500";
      case "upcoming":
        return "bg-yellow-500";
      case "finalized":
        return "bg-blue-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className="border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)]">
      <CardHeader className="border-b-2 border-black bg-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CardTitle className="font-black uppercase tracking-wider text-lg">
              {tokenSymbol ?? "Loading..."} Presale
            </CardTitle>
            <Badge className={`${getStatusColor(presale.status)} text-white font-bold uppercase text-xs`}>
              {presale.status}
            </Badge>
          </div>
          <Link
            to={`/projects/${presale.address}`}
            className="text-gray-600 hover:text-black"
          >
            <ExternalLink className="w-5 h-5" />
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {/* Presale Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-gray-500 text-xs uppercase font-bold">Hard Cap</p>
            <p className="font-bold">{formatEther(presale.hardCap)} QF</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs uppercase font-bold">Total Raised</p>
            <p className="font-bold">{Math.round(Number(formatEther(presale.totalRaised))).toLocaleString()} QF</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs uppercase font-bold">Progress</p>
            <p className="font-bold">{presale.progress.toFixed(1)}%</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs uppercase font-bold">Owner</p>
            <p className="font-mono text-xs truncate">{presale.owner}</p>
          </div>
        </div>

        {/* Address */}
        <div>
          <p className="text-gray-500 text-xs uppercase font-bold mb-1">Presale Address</p>
          <p className="font-mono text-xs break-all bg-gray-100 p-2 border border-gray-300">
            {presale.address}
          </p>
        </div>

        {/* Current Fees */}
        <div className="flex items-center gap-4 p-3 bg-[#FFF2D5] border-2 border-black">
          <div>
            <p className="text-xs text-gray-600 uppercase font-bold">Token Fee</p>
            <p className="font-bold">
              {currentTokenFeeBps !== undefined
                ? `${Number(currentTokenFeeBps) / 100}%`
                : "..."}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 uppercase font-bold">Proceeds Fee</p>
            <p className="font-bold">
              {currentProceedsFeeBps !== undefined
                ? `${Number(currentProceedsFeeBps) / 100}%`
                : "..."}
            </p>
          </div>
          {isFeeRecipient && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFeeForm(!showFeeForm)}
              className="ml-auto border-2 border-black font-bold uppercase text-xs"
            >
              {showFeeForm ? "Cancel" : "Update Fees"}
            </Button>
          )}
        </div>

        {/* Update Fees Form */}
        {showFeeForm && isFeeRecipient && (
          <div className="p-4 bg-white border-2 border-black space-y-3">
            <p className="text-sm font-bold">Update fees (in basis points, 100 = 1%)</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-600 uppercase font-bold">
                  Token Fee (bps)
                </label>
                <Input
                  type="number"
                  placeholder={currentTokenFeeBps?.toString() ?? "200"}
                  value={newTokenFeeBps}
                  onChange={(e) => setNewTokenFeeBps(e.target.value)}
                  className="border-2 border-black"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600 uppercase font-bold">
                  Proceeds Fee (bps)
                </label>
                <Input
                  type="number"
                  placeholder={currentProceedsFeeBps?.toString() ?? "300"}
                  value={newProceedsFeeBps}
                  onChange={(e) => setNewProceedsFeeBps(e.target.value)}
                  className="border-2 border-black"
                />
              </div>
            </div>
            <Button
              onClick={handleUpdateFees}
              disabled={isBusy || !newTokenFeeBps || !newProceedsFeeBps}
              className="w-full border-4 border-black bg-[#42C9FF] text-black font-black uppercase tracking-wider shadow-[3px_3px_0_rgba(0,0,0,1)]"
            >
              {isBusy ? "Updating..." : "Confirm Update"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function AdminPresalesContent() {
  const { address } = useAccount();
  const { feeRecipient } = useFeeRecipient();
  const { presales, isLoading, refetch } = useLaunchpadPresales("all", true);
  const [filter, setFilter] = useState<"all" | "live" | "upcoming" | "ended">("all");

  const isFeeRecipient = Boolean(
    address &&
    feeRecipient &&
    address.toLowerCase() === feeRecipient.toLowerCase()
  );

  const filteredPresales = presales?.filter((p) => {
    if (filter === "all") return true;
    if (filter === "live") return p.status === "live";
    if (filter === "upcoming") return p.status === "upcoming";
    if (filter === "ended") return ["ended", "finalized", "cancelled"].includes(p.status);
    return true;
  });

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/admin"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-black mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-bold">Back to Admin</span>
        </Link>
        <div className="border-b-4 border-black bg-[#42C9FF] p-6 shadow-[4px_4px_0_rgba(0,0,0,1)]">
          <h1 className="text-4xl font-black uppercase tracking-wider">Manage Presales</h1>
          <p className="text-sm text-gray-700 mt-2">
            View all presales and update fees.
            {isFeeRecipient && (
              <span className="text-green-700 font-bold ml-2">
                ✓ You can update fees on presales
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
          className={`border-2 border-black font-bold uppercase text-xs ${
            filter === "all" ? "bg-black text-white" : ""
          }`}
        >
          All ({presales?.length ?? 0})
        </Button>
        <Button
          variant={filter === "live" ? "default" : "outline"}
          onClick={() => setFilter("live")}
          className={`border-2 border-black font-bold uppercase text-xs ${
            filter === "live" ? "bg-green-500 text-white" : ""
          }`}
        >
          Live ({presales?.filter((p) => p.status === "live").length ?? 0})
        </Button>
        <Button
          variant={filter === "upcoming" ? "default" : "outline"}
          onClick={() => setFilter("upcoming")}
          className={`border-2 border-black font-bold uppercase text-xs ${
            filter === "upcoming" ? "bg-yellow-500 text-white" : ""
          }`}
        >
          Upcoming ({presales?.filter((p) => p.status === "upcoming").length ?? 0})
        </Button>
        <Button
          variant={filter === "ended" ? "default" : "outline"}
          onClick={() => setFilter("ended")}
          className={`border-2 border-black font-bold uppercase text-xs ${
            filter === "ended" ? "bg-gray-500 text-white" : ""
          }`}
        >
          Ended (
          {presales?.filter((p) =>
            ["ended", "finalized", "cancelled"].includes(p.status)
          ).length ?? 0}
          )
        </Button>
        <Button
          variant="outline"
          onClick={() => refetch()}
          className="border-2 border-black font-bold uppercase text-xs ml-auto"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Presales List */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-500">Loading presales...</p>
        </div>
      ) : filteredPresales && filteredPresales.length > 0 ? (
        <div className="space-y-6">
          {filteredPresales.map((presale) => (
            <PresaleCard
              key={presale.address}
              presale={presale}
              isFeeRecipient={isFeeRecipient}
            />
          ))}
        </div>
      ) : (
        <Card className="border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)]">
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">No presales found.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function AdminPresales() {
  return (
    <AdminRoute>
      <AdminPresalesContent />
    </AdminRoute>
  );
}
