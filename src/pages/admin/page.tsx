import { AdminRoute } from "@/components/admin/AdminRoute";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAccount } from "@/lib/papi/hooks";
import { useFactoryOwner, useFeeRecipient } from "@/lib/utils/admin";
import { useSetFeeRecipient } from "@/lib/hooks/useAdminActions";
import { useLaunchpadPresales } from "@/lib/hooks/useLaunchpadPresales";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { isAddress, type Address } from "viem";
import { Users, Coins, Settings, ArrowRight } from "lucide-react";
import { getFriendlyTxErrorMessage } from "@/lib/utils/tx-errors";

function AdminDashboardContent() {
  const { address } = useAccount();
  const { factoryOwner, isLoading: isLoadingOwner } = useFactoryOwner();
  const { feeRecipient, isLoading: isLoadingFeeRecipient, refetch: refetchFeeRecipient } = useFeeRecipient();
  const { presales, isLoading: isLoadingPresales } = useLaunchpadPresales("all");

  const [newFeeRecipient, setNewFeeRecipient] = useState("");
  const {
    setFeeRecipient,
    isBusy: isSettingFeeRecipient,
    isSuccess: isFeeRecipientSuccess,
    isError: isFeeRecipientError,
    error: feeRecipientError,
    reset: resetFeeRecipient,
  } = useSetFeeRecipient();

  useEffect(() => {
    if (isFeeRecipientSuccess) {
      toast.success("Fee recipient updated successfully");
      setNewFeeRecipient("");
      resetFeeRecipient();
      refetchFeeRecipient();
    }
  }, [isFeeRecipientSuccess, resetFeeRecipient, refetchFeeRecipient]);

  useEffect(() => {
    if (isFeeRecipientError && feeRecipientError) {
      toast.error(getFriendlyTxErrorMessage(feeRecipientError, "Update fee recipient"));
      resetFeeRecipient();
    }
  }, [isFeeRecipientError, feeRecipientError, resetFeeRecipient]);

  const handleSetFeeRecipient = () => {
    if (!newFeeRecipient || !isAddress(newFeeRecipient)) {
      toast.error("Please enter a valid address");
      return;
    }
    setFeeRecipient(newFeeRecipient as Address);
  };

  // Stats
  const totalPresales = presales?.length ?? 0;
  const livePresales = presales?.filter((p) => p.status === "live").length ?? 0;
  const upcomingPresales = presales?.filter((p) => p.status === "upcoming").length ?? 0;
  const endedPresales = presales?.filter((p) => p.status === "ended" || p.status === "finalized" || p.status === "cancelled").length ?? 0;

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <div className="border-b-4 border-black bg-[#FFE38A] p-6 shadow-[4px_4px_0_rgba(0,0,0,1)]">
          <h1 className="text-4xl font-black uppercase tracking-wider">Admin Dashboard</h1>
          <p className="text-sm text-gray-700 mt-2">
            Manage presales, whitelisted creators, and platform settings.
          </p>
        </div>
      </div>

      {/* Admin Info */}
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card className="before:hidden border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)]">
          <CardHeader className="border-b-2 border-black bg-white">
            <CardTitle className="font-black uppercase tracking-wider">Factory Owner</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {isLoadingOwner ? (
              <p className="text-gray-500">Loading...</p>
            ) : (
              <p className="font-mono text-sm break-all">{factoryOwner}</p>
            )}
            {address?.toLowerCase() === factoryOwner?.toLowerCase() && (
              <p className="text-green-600 text-sm mt-2 font-bold">✓ You are the factory owner</p>
            )}
          </CardContent>
        </Card>

        <Card className="before:hidden border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)]">
          <CardHeader className="border-b-2 border-black bg-white">
            <CardTitle className="font-black uppercase tracking-wider">Fee Recipient</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {isLoadingFeeRecipient ? (
              <p className="text-gray-500">Loading...</p>
            ) : (
              <p className="font-mono text-sm break-all">{feeRecipient}</p>
            )}
            {address?.toLowerCase() === feeRecipient?.toLowerCase() && (
              <p className="text-green-600 text-sm mt-2 font-bold">✓ You are the fee recipient</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card className="before:hidden border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] bg-[#42C9FF]">
          <CardContent className="p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-700">Total Presales</p>
            <p className="text-3xl font-black">{isLoadingPresales ? "..." : totalPresales}</p>
          </CardContent>
        </Card>
        <Card className="before:hidden border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] bg-[#90EE90]">
          <CardContent className="p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-700">Live</p>
            <p className="text-3xl font-black">{isLoadingPresales ? "..." : livePresales}</p>
          </CardContent>
        </Card>
        <Card className="before:hidden border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] bg-[#FFE38A]">
          <CardContent className="p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-700">Upcoming</p>
            <p className="text-3xl font-black">{isLoadingPresales ? "..." : upcomingPresales}</p>
          </CardContent>
        </Card>
        <Card className="before:hidden border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] bg-[#FFB6C1]">
          <CardContent className="p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-700">Ended</p>
            <p className="text-3xl font-black">{isLoadingPresales ? "..." : endedPresales}</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Link to="/admin/presales">
          <Card className="before:hidden border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] hover:shadow-[6px_6px_0_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all cursor-pointer bg-white">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#42C9FF] border-2 border-black">
                  <Coins className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-black uppercase tracking-wider">Manage Presales</p>
                  <p className="text-sm text-gray-600">View all presales, update fees</p>
                </div>
              </div>
              <ArrowRight className="w-6 h-6" />
            </CardContent>
          </Card>
        </Link>

        <Link to="/admin/whitelist">
          <Card className="before:hidden border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] hover:shadow-[6px_6px_0_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all cursor-pointer bg-white">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#90EE90] border-2 border-black">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-black uppercase tracking-wider">Whitelist Creators</p>
                  <p className="text-sm text-gray-600">Add or remove whitelisted creators</p>
                </div>
              </div>
              <ArrowRight className="w-6 h-6" />
            </CardContent>
          </Card>
        </Link>

        <Card className="before:hidden border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] bg-white">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#FFE38A] border-2 border-black">
                <Settings className="w-6 h-6" />
              </div>
              <div>
                <p className="font-black uppercase tracking-wider">Settings</p>
                <p className="text-sm text-gray-600">Platform configuration</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Update Fee Recipient */}
      <Card className="before:hidden border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)]">
        <CardHeader className="border-b-2 border-black bg-[#FFF2D5]">
          <CardTitle className="font-black uppercase tracking-wider">Update Fee Recipient</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <p className="text-sm text-gray-700">
            The fee recipient receives all platform fees from presales. Only the factory owner can update this.
          </p>
          <div className="flex gap-4">
            <Input
              placeholder="New fee recipient address (0x...)"
              value={newFeeRecipient}
              onChange={(e) => setNewFeeRecipient(e.target.value)}
              className="border-2 border-black font-mono"
            />
            <Button
              onClick={handleSetFeeRecipient}
              disabled={isSettingFeeRecipient || !newFeeRecipient}
              className="border-4 border-black bg-[#FF7F41] text-black font-black uppercase tracking-wider shadow-[3px_3px_0_rgba(0,0,0,1)] hover:bg-[#1E5BFF] whitespace-nowrap"
            >
              {isSettingFeeRecipient ? "Updating..." : "Update Recipient"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <AdminRoute>
      <AdminDashboardContent />
    </AdminRoute>
  );
}
