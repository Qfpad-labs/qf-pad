"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { PresaleCard } from "@/components/ui/presale-card";
import { useLaunchpadPresales } from "@/lib/hooks/useLaunchpadPresales";
import type { LaunchpadPresaleFilter } from "@/lib/hooks/useLaunchpadPresales";
import { getQpadStaticPresale, QPAD_TOKEN_ADDRESS } from "@/config/static-presales";

const filterOptions: Array<{ label: string; value: LaunchpadPresaleFilter; color: string }> = [
  { label: "All", value: "all", color: "bg-[#42C9FF]" },
  { label: "Live", value: "live", color: "bg-[#B8EF53]" },
  { label: "Upcoming", value: "upcoming", color: "bg-[#FF7F41]" },
  { label: "Ended", value: "ended", color: "bg-white" },
];

const hiddenProjectTerms = ["brazenbull"];
const hiddenProjectAddresses = new Set([
  "0xf9db3b6bb2bee97aa2dca5b25e28ae9887fff908",
]);

function isHiddenProject(presale: { address: string; saleTokenName?: string; saleTokenSymbol?: string }) {
  if (hiddenProjectAddresses.has(presale.address.toLowerCase())) return true;

  const searchable = `${presale.saleTokenName ?? ""} ${presale.saleTokenSymbol ?? ""}`.toLowerCase();
  return hiddenProjectTerms.some((term) => searchable.includes(term));
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<LaunchpadPresaleFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [nowMs, setNowMs] = useState(() => Date.now());
  const { presales, isLoading } = useLaunchpadPresales("all");

  useEffect(() => {
    const timer = window.setInterval(() => setNowMs(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const qpadPresale = useMemo(() => getQpadStaticPresale(nowMs), [nowMs]);
  const allPresales = useMemo(() => {
    const qpadAddress = QPAD_TOKEN_ADDRESS.toLowerCase();
    return [
      qpadPresale,
      ...presales.filter((presale) => presale.address.toLowerCase() !== qpadAddress && !isHiddenProject(presale)),
    ];
  }, [presales, qpadPresale]);

  const filteredPresales = allPresales.filter((presale) => {
    if (!presale) return false;
    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "ended"
        ? presale.status === "ended" || presale.claimEnabled || presale.refundsEnabled
        : presale.status === activeFilter);
    const matchesSearch =
      presale.saleTokenName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      presale.saleTokenSymbol?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      presale.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen text-black">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <section className="neo-frame -rotate-[0.35deg] mb-10 bg-white p-6 sm:p-8 animate-fade-in-up">
          <p className="mb-4 inline-block border-[3px] border-black bg-[#42C9FF] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em]">
            Marketplace
          </p>
          <h1 className="text-5xl font-black uppercase leading-[0.9] tracking-tight sm:text-7xl">Launchpad Projects</h1>
          <p className="mt-4 max-w-2xl text-lg font-bold">
            Scout live and upcoming token sales in a high-contrast project board.
          </p>

          <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_auto]">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black" />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 pl-12 text-sm font-black uppercase tracking-[0.08em]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {filterOptions.map((filter, index) => {
                const isActive = activeFilter === filter.value;
                return (
                  <button
                    key={filter.value}
                    onClick={() => setActiveFilter(filter.value)}
                    className={`border-[3px] border-black px-4 py-3 text-xs font-black uppercase tracking-[0.14em] transition-all ${
                      isActive
                        ? `${filter.color} [box-shadow:0_0_0_1px_#000,8px_8px_0_0_#000] -translate-x-1 -translate-y-1`
                        : "bg-[#FFF2D5] [box-shadow:0_0_0_1px_#000,4px_4px_0_0_#000] hover:[box-shadow:0_0_0_1px_#000,8px_8px_0_0_#000] hover:-translate-x-1 hover:-translate-y-1"
                    } ${isActive ? "" : index % 2 === 0 ? "-rotate-[0.4deg]" : "rotate-[0.4deg]"}`}
                    type="button"
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {isLoading && filteredPresales.length === 0 ? (
          <div className="neo-frame bg-white p-10 text-center text-lg font-black uppercase tracking-[0.14em] animate-fade-in-up">
            Loading projects...
          </div>
        ) : filteredPresales.length === 0 ? (
          <div className="neo-frame bg-white p-12 text-center animate-fade-in-up">
            <p className="text-2xl font-black uppercase">No Projects Found</p>
            <p className="mt-2 font-bold text-black/70">
              {searchQuery
                ? "Try adjusting your search query"
                : activeFilter === "all"
                  ? "No presales available yet"
                  : `No ${activeFilter} presales at the moment`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPresales.map((presale, index) => (
              <div
                key={presale.address}
                className={`animate-fade-in-up ${index % 2 === 0 ? "-rotate-[0.45deg]" : "rotate-[0.45deg]"}`}
                style={{ animationDelay: `${Math.min(index * 0.08, 0.32)}s` }}
              >
                <PresaleCard presale={presale} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
