import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  useLaunchpadPresales,
  type PresaleWithStatus,
} from "@/lib/hooks/useLaunchpadPresales";
import { formatUnits } from "viem";
import { useAccount } from "@/lib/papi/hooks";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
function PresaleRow({ presale, index }: { presale: PresaleWithStatus; index: number }) {
  const progress = presale.hardCap > 0n
    ? Math.round(Number((presale.totalRaised * 100n) / presale.hardCap))
    : 0;

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

  const rowTilt = index % 2 === 0 ? "rotate-[0.35deg]" : "-rotate-[0.35deg]";
  return (
    <div className={`${rowTilt} border-2 border-black bg-[#FFFDF7] p-4 shadow-[2px_2px_0_rgba(0,0,0,1)]`}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-black text-lg uppercase">
              {presale.saleTokenSymbol || "Token"} Presale
            </h3>
            <span
              className={`px-2 py-0.5 text-xs font-bold uppercase text-white ${getStatusColor(
                presale.status
              )}`}
            >
              {presale.status}
            </span>
          </div>
          <p className="text-xs text-gray-500 break-all font-mono">
            {presale.address}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 flex-shrink-0">
          <Button
            size="sm"
            asChild
            className="border-2 border-black bg-[#FFE38A] text-black font-bold text-xs uppercase shadow-[2px_2px_0_rgba(0,0,0,1)] hover:shadow-[3px_3px_0_rgba(0,0,0,1)] hover:bg-[#F6CF62]"
          >
            <Link to={`/dashboard/presales/manage/${presale.address}`}>
              Manage <ExternalLink className="ml-1 h-3 w-3" />
            </Link>
          </Button>
        </div>
      </div>
      {presale.hardCap > 0n && (
        <div className="mt-3">
          <div className="flex justify-between text-xs mb-1">
            <span className="font-bold">{progress}% Funded</span>
            <span className="text-gray-500">
              {Math.round(Number(formatUnits(presale.totalRaised, 18))).toLocaleString()} /{" "}
              {Math.round(Number(formatUnits(presale.hardCap, 18))).toLocaleString()} QF
            </span>
          </div>
          <Progress value={progress} className="h-2 border border-black" />
        </div>
      )}
    </div>
  );
}

export default function PresalesListPage() {
  const { address, isConnected } = useAccount();
  const { presales, isLoading } = useLaunchpadPresales("all", false);

  const myPresales = presales?.filter(
    (presale) => address && presale.owner?.toLowerCase() === address.toLowerCase()
  ) || [];

  if (!isConnected) {
    return (
      <div className="container mx-auto px-4 py-12 text-black">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="py-12 text-center">
            <p className="text-lg text-gray-600 mb-4">
              Please connect your wallet to view your presales.
            </p>
            <Link to="/dashboard/user">
              <Button className="border-4 border-black bg-white text-black font-black uppercase tracking-wider shadow-[3px_3px_0_rgba(0,0,0,1)]">
                Back to Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 text-black">
      <Card className="mx-auto max-w-4xl rotate-[0.45deg] border-4 border-black bg-[#FFFDF7] shadow-[6px_6px_0_rgba(0,0,0,1)]">
        <CardHeader className="border-b-2 border-black bg-[#FFE8BD]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <CardTitle className="text-2xl font-black uppercase tracking-wider">
              My Presales
            </CardTitle>
            <Link to="/dashboard/create/presale">
              <Button className="border-4 border-black bg-[#42C9FF] text-black font-black uppercase tracking-wider shadow-[3px_3px_0_rgba(0,0,0,1)]">
                Create Presale
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {isLoading ? (
            <div className="space-y-3">
              <div className="animate-pulse">
                <div className="h-20 bg-gray-200 rounded mb-3"></div>
                <div className="h-20 bg-gray-200 rounded mb-3"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            </div>
          ) : myPresales.length > 0 ? (
            <>
              {myPresales.map((presale, index) => (
                <PresaleRow key={presale.address} presale={presale} index={index} />
              ))}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4 text-base sm:text-lg font-medium">
                You do not have any presales yet.
              </p>
              <Link to="/dashboard/create/presale">
                <Button className="border-4 border-black bg-[#42C9FF] text-black font-black uppercase tracking-wider shadow-[3px_3px_0_rgba(0,0,0,1)]">
                  Create Your First Presale <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
