"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SwapForm } from "@/components/ui/swap-form";
import { useMarkets } from "@/lib/hooks/useMarkets";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useLaunchpadPresale,
  type PresaleWithStatus,
} from "@/lib/hooks/useLaunchpadPresales";
import { Weth9Contract } from "@/config";
import { PresaleParticipationForm } from "@/components/ui/presale-participation-form";
import { formatUnits } from "viem";
import { Badge } from "@/components/ui/badge";
import { getPresaleMetadata } from "@/config/presale-metadata";

export default function ProjectDetailPage() {
  const { id } = useParams(); // This is the presale_address
  const {
    presale,
    isLoading: isLoadingPresale,
  } = useLaunchpadPresale(id as `0x${string}`);
  const { markets, isLoading: isLoadingMarkets } = useMarkets();
  const metadata = useMemo(
    () => (presale?.address ? getPresaleMetadata(presale.address) : id ? getPresaleMetadata(id) : undefined),
    [presale?.address, id]
  );

  // React purity rule: avoid calling `Date.now()` during render.
  // Keep a ticking "now" in state and update it in an effect instead.
  const [nowMs, setNowMs] = useState<number | null>(null);
  useEffect(() => {
    const updateNow = () => setNowMs(Date.now());
    const timeoutId = window.setTimeout(updateNow, 0);
    const intervalId = window.setInterval(updateNow, 1000);
    return () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
    };
  }, []);

  if (isLoadingPresale || isLoadingMarkets) {
    return <div className="text-center py-20">Loading project details...</div>;
  }

  if (!presale) {
    return <div className="text-center py-20">Project not found.</div>;
  }

  if (!presale.saleToken || !presale.owner) {
    return <div className="text-center py-20">Loading project details...</div>;
  }

  const presaleIsActive =
    presale.status === "live" || presale.status === "upcoming";
  const isPresaleFinalized = presale.claimEnabled === true;
  const isPresaleCancelled = presale.refundsEnabled === true;
  const presaleEndMs = presale.endTime ? Number(presale.endTime) * 1000 : null;
  const presaleHasEnded =
    presaleEndMs !== null && nowMs !== null ? presaleEndMs < nowMs : false;

  // Show presale view (with claim/refund UI) after the sale ends as well,
  // so participants can claim tokens or refunds instead of seeing Market Not Available.
  const showPresaleView =
    presaleIsActive || isPresaleFinalized || isPresaleCancelled || presaleHasEnded;

  const renderMarketView = () => {
    const presaleTokens = [
      presale.saleToken.toLowerCase(),
      (presale.paymentToken || Weth9Contract.address).toLowerCase(),
    ];

    const market = markets.find((m) => {
      if (!m) return false;
      const marketTokens = [
        m.token0.address.toLowerCase(),
        m.token1.address.toLowerCase(),
      ];
      return (
        marketTokens.includes(presaleTokens[0]) &&
        marketTokens.includes(presaleTokens[1])
      );
    });

    if (!market) {
      return (
        <div className="text-center py-10">
          <p className="text-xl font-bold">Market Not Available</p>
          <p className="text-gray-500">
            The presale has ended, but a trading market has not been created for
            this token yet.
          </p>
        </div>
      );
    }

    const dexScreenerUrl = `https://dexscreener.com/qf-network/${market.pairAddress}?embed=1&theme=dark&info=0`;

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="w-full h-[600px] overflow-hidden">
            <iframe
              src={dexScreenerUrl}
              className="w-full h-full border-0"
              allowFullScreen
            ></iframe>
          </Card>
        </div>
        <div>
          <SwapForm market={market} />
        </div>
      </div>
    );
  };

  const renderPresaleView = (presale: PresaleWithStatus) => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Presale Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative pt-1">
                <div className="overflow-hidden h-4 text-xs flex rounded bg-gray-200">
                  <div
                    style={{ width: `${presale.progress}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 transition-all duration-500"
                  ></div>
                </div>
                <p className="text-right font-semibold text-green-600">
                  {presale.progress.toFixed(2)}%
                </p>
              </div>
              <div className="flex justify-between text-sm">
                <div>
                  <p className="font-bold">Total Raised</p>
                  <p>
                    {Math.round(Number(formatUnits(
                      presale.totalRaised,
                      presale.paymentTokenDecimals || 18
                    ))).toLocaleString()}{" "}
                    {presale.paymentTokenSymbol}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold">Hard Cap</p>
                  <p>
                    {formatUnits(
                      presale.hardCap,
                      presale.paymentTokenDecimals || 18
                    )}{" "}
                    {presale.paymentTokenSymbol}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sale Details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-bold">Status</p>
              <Badge
                className={`capitalize ${presale.status === "live"
                  ? "bg-green-500"
                  : presale.status === "finalized"
                    ? "bg-blue-500"
                    : presale.status === "cancelled"
                      ? "bg-red-500"
                      : presale.status === "upcoming"
                        ? "bg-yellow-500"
                        : "bg-gray-500"
                  }`}
              >
                {presale.claimEnabled
                  ? "Finalized - Claim Open"
                  : presale.refundsEnabled
                    ? "Cancelled - Refunds Open"
                    : presale.status}
              </Badge>
            </div>
            <div>
              <p className="font-bold">Rate</p>
              <p>
                1 {presale.paymentTokenSymbol} = {Number(presale.rate) / 100}{" "}
                {presale.saleTokenSymbol}
              </p>
            </div>
            <div>
              <p className="font-bold">Soft Cap</p>
              <p>
                {formatUnits(
                  presale.softCap,
                  presale.paymentTokenDecimals || 18
                )}{" "}
                {presale.paymentTokenSymbol}
              </p>
            </div>
            <div>
              <p className="font-bold">Sale Ends</p>
              <p>
                {new Date(Number(presale.endTime) * 1000).toLocaleString()}
              </p>
            </div>
            {presale.requiresWhitelist && (
              <div className="col-span-2 border-2 border-black bg-[#FFE38A] p-3 rounded">
                <p className="font-bold uppercase text-xs">Participation</p>
                <p className="text-sm text-gray-700">
                  This sale is limited to wallets the project owner adds to the whitelist.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {presale.requiresWhitelist && (
          <Card className="border-4 border-black bg-[#FFE38A]">
            <CardContent className="p-4">
              <p className="font-black uppercase text-xs mb-1">Whitelist Required</p>
              <p className="text-sm text-gray-700">
                Connect your wallet below to check if you've been approved to join this sale.
              </p>
            </CardContent>
          </Card>
        )}
        <PresaleParticipationForm presale={presale} />
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-12 text-black">
      <section className="mb-8 flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage
            src={
              presale.logo ||
              metadata?.logo ||
              `https://api.dicebear.com/7.x/rings/svg?seed=${presale.saleToken}`
            }
            alt={`${presale.saleTokenName} logo`}
          />
          <AvatarFallback>
            {presale.saleTokenSymbol?.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-4xl font-bold">
            {presale.saleTokenName} ({presale.saleTokenSymbol})
          </h1>
          <p className="text-lg text-gray-500">
            Created by @{presale.owner.slice(0, 6)}...
            {presale.owner.slice(-4)}
          </p>
          {presale.requiresWhitelist && (
            <Badge className="mt-2 bg-[#FFB3C1] text-black border border-black uppercase tracking-wider">
              Whitelist Only
            </Badge>
          )}
        </div>
      </section>

      {showPresaleView ? renderPresaleView(presale) : renderMarketView()}
    </div>
  );
}
