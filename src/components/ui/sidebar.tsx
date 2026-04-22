import { useIsAdmin } from "@/lib/utils/admin";
import { useConnectModal } from "@/lib/papi/hooks";
import { useReactPriceUsd } from "@/lib/hooks/useReactPriceUsd";
import {
  LayoutDashboard,
  Layers,
  Menu,
  Plus,
  Rocket,
  Shield,
  WalletMinimal,
} from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import type { Address } from "viem";
import {
  CHAIN_LABELS,
  QF_CHAIN_ID,
} from "@/config";
import {
  useAccount,
  useBalance,
  useDisconnect,
} from "@/lib/papi/hooks";

const navItems = [
  { name: "Dashboard", href: "/dashboard/user", icon: LayoutDashboard },
  { name: "Launchpad", href: "/projects", icon: Rocket },
  { name: "Staking", href: "/dashboard/staking", icon: Layers },
];

const actionButtonClass =
  "w-full border-[2px] border-black px-3 py-2.5 text-[10px] font-black uppercase tracking-[0.14em] [box-shadow:0_0_0_1px_#000,5px_5px_0_0_#000] transition-all hover:[box-shadow:0_0_0_1px_#000,8px_8px_0_0_#000] hover:-translate-x-1 hover:-translate-y-1";

const SidebarContent = () => {
  const pathname = useLocation().pathname;
  const { openConnectModal } = useConnectModal();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const qfPriceUsd = useReactPriceUsd();
  const { isAdmin } = useIsAdmin(address as Address | undefined);

  const isConnected = !!address;
  const targetChainLabel = CHAIN_LABELS[QF_CHAIN_ID] ?? "QF Network";
  const networkButtonLabel = `Connected: ${targetChainLabel}`;

  const { data: balanceData } = useBalance({ address });
  const balance = balanceData ? parseFloat(balanceData.formatted) : 0;
  const valueUsd = balance * (qfPriceUsd ?? 0);

  return (
    <div className="flex min-h-full flex-col bg-[#F7F1E1] text-black">
      <div className="border-b-[3px] border-black bg-[#F5CF85] px-4 py-4 text-black">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/qfpad-logo.png"
            alt="QFPad logo"
            className="h-11 w-11 rounded-[14px] border-[3px] border-black object-cover"
          />
          <div>
            <p className="text-lg font-black uppercase tracking-[0.2em] leading-tight">QFPad</p>
            <p className="text-[10px] font-black uppercase tracking-[0.16em]">Launch Lab</p>
          </div>
        </Link>
      </div>

      {isConnected && (
        <div className="mx-4 mt-4 -rotate-[0.45deg] border-[2px] border-black bg-[#FFF2D5] p-4 text-black [box-shadow:0_0_0_1px_#000,6px_6px_0_0_#000]">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-mono font-black uppercase">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </span>
            <WalletMinimal size={18} strokeWidth={2.5} />
          </div>

          <div className="mb-4">
            <p className="text-3xl font-black leading-none">
              {balance.toLocaleString(undefined, { maximumFractionDigits: 4 })}
            </p>
            <p className="mt-1 text-xs font-black uppercase tracking-[0.2em]">QF</p>
            {(qfPriceUsd ?? 0) > 0 && (
              <p className="mt-1 text-xs font-bold">
                ~$
                {valueUsd < 0.01 && valueUsd > 0
                  ? valueUsd.toLocaleString(undefined, {
                      minimumFractionDigits: 4,
                      maximumFractionDigits: 4,
                    })
                  : valueUsd.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <div
              className={`${actionButtonClass} -rotate-[0.85deg] sm:-rotate-[0.35deg] bg-[#42C9FF] text-black cursor-default opacity-70 hover:translate-x-0 hover:translate-y-0 hover:[box-shadow:0_0_0_1px_#000,5px_5px_0_0_#000]`}
            >
              <span className="flex items-center justify-center gap-2 leading-tight">
                {networkButtonLabel}
              </span>
            </div>
            <button
              onClick={() => disconnect()}
              type="button"
              className={`${actionButtonClass} rotate-[0.85deg] sm:rotate-[0.35deg] bg-[#FF7F41] text-black`}
            >
              Disconnect
            </button>
          </div>
        </div>
      )}

      <nav className="flex-1 px-4 py-5">
        <ul className="space-y-4">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={`group flex items-center gap-3 border-[3px] border-black px-4 py-3 text-xs font-black uppercase tracking-[0.14em] transition-all ${
                    isActive
                      ? "bg-[#B8EF53] text-black [box-shadow:0_0_0_1px_#000,10px_10px_0_0_#000] -translate-x-1 -translate-y-1"
                      : "bg-white text-black [box-shadow:0_0_0_1px_#000,6px_6px_0_0_#000] hover:[box-shadow:0_0_0_1px_#000,10px_10px_0_0_#000] hover:-translate-x-1 hover:-translate-y-1"
                  } ${index % 2 === 0 ? "rotate-[1.35deg] sm:rotate-[1deg]" : "-rotate-[1.35deg] sm:-rotate-[1deg]"} ${
                    isActive && index % 2 === 0 ? "hover:rotate-[1.35deg] sm:hover:rotate-[1deg]" : ""
                  } ${
                    isActive && index % 2 === 1 ? "hover:-rotate-[1.35deg] sm:hover:-rotate-[1deg]" : ""
                  }`}
                >
                  <item.icon className="h-4 w-4" strokeWidth={2.5} />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}

          {isAdmin && (
            <li>
              <Link
                to="/admin"
                className={`flex items-center gap-3 border-[3px] border-black px-4 py-3 text-xs font-black uppercase tracking-[0.14em] transition-all ${
                  pathname.startsWith("/admin")
                    ? "bg-[#FF7F41] text-black [box-shadow:0_0_0_1px_#000,10px_10px_0_0_#000] -translate-x-1 -translate-y-1"
                    : "bg-[#FFE7B0] text-black [box-shadow:0_0_0_1px_#000,6px_6px_0_0_#000] hover:[box-shadow:0_0_0_1px_#000,10px_10px_0_0_#000] hover:-translate-x-1 hover:-translate-y-1"
                } rotate-[1.35deg] sm:rotate-[1deg]`}
              >
                <Shield className="h-4 w-4" strokeWidth={2.5} />
                <span>Admin</span>
              </Link>
            </li>
          )}
        </ul>

        <div className="mt-8 space-y-4">
          <Link
            to="/dashboard/create"
            className={`flex items-center justify-center gap-2 border-[3px] border-black px-4 py-4 text-xs font-black uppercase tracking-[0.16em] transition-all ${
              pathname === "/dashboard/create"
                ? "bg-[#42C9FF] text-black [box-shadow:0_0_0_1px_#000,12px_12px_0_0_#000] -translate-x-1 -translate-y-1"
                : "bg-[#FF7F41] text-black [box-shadow:0_0_0_1px_#000,8px_8px_0_0_#000] hover:[box-shadow:0_0_0_1px_#000,12px_12px_0_0_#000] hover:-translate-x-1 hover:-translate-y-1"
            }`}
          >
            <Plus className="h-5 w-5" />
            Create
          </Link>

          {!isConnected && (
            <button
              onClick={openConnectModal}
              type="button"
              className={`${actionButtonClass} bg-[#B8EF53] text-black`}
            >
              Connect Wallet
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export function Sidebar({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState<string | null>(null);
  const location = useLocation();

  if (prevPathname !== null && prevPathname !== location.pathname && sidebarOpen) {
    setSidebarOpen(false);
  }
  if (prevPathname !== location.pathname) {
    setPrevPathname(location.pathname);
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-black/60 transition-opacity lg:hidden ${
          sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />

      <div
        className={`fixed top-0 left-0 z-40 h-full w-80 transform overflow-y-auto border-r-[3px] border-black bg-[#F7F1E1] transition-transform duration-300 lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </div>

      <div className="flex h-screen bg-transparent text-black">
        <aside className="hidden lg:flex lg:w-80 lg:flex-shrink-0">
          <div className="flex w-full flex-col overflow-y-auto border-r-[3px] border-black bg-[#F7F1E1]">
            <SidebarContent />
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="relative z-10 flex h-16 flex-shrink-0 items-center justify-between border-b-[3px] border-black bg-[#F5CF85] px-4 lg:hidden">
            <Link to="/" className="flex items-center gap-2 text-black">
              <img
                src="/qfpad-logo.png"
                alt="QFPad logo"
                className="h-8 w-8 rounded-[10px] border-[2px] border-black object-cover"
              />
              <span className="text-sm font-black uppercase tracking-[0.18em]">QFPad</span>
            </Link>
            <button
              onClick={() => setSidebarOpen(true)}
              className="border-[2px] border-black bg-white p-2 text-black"
              type="button"
            >
              <span className="sr-only">Open sidebar</span>
              <Menu className="h-5 w-5" />
            </button>
          </div>

          <main className="relative flex-1 overflow-y-auto px-0 py-0 focus:outline-none">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
