import { TelegramIcon } from "@/components/ui/icons/telegram-icon";
import { XIcon as XSocialIcon } from "@/components/ui/icons/x-icon";
import { useConnectModal } from "@/lib/papi/hooks";
import { useCountUp } from "@/lib/hooks/useCountUp";
import { useLaunchpadPresales } from "@/lib/hooks/useLaunchpadPresales";
import { useReactPriceUsd } from "@/lib/hooks/useReactPriceUsd";
import { BookOpen, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { formatEther } from "viem";
import { useAccount } from "@/lib/papi/hooks";

const cardStyles = [
  { bg: "bg-[#42C9FF]", text: "text-black" },
  { bg: "bg-[#FF7F41]", text: "text-black" },
  { bg: "bg-[#B8EF53]", text: "text-black" },
];

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openConnectModal } = useConnectModal();
  const { address } = useAccount();
  const { allPresales, isLoading: isLoadingPresales } = useLaunchpadPresales("all");

  const navLinks = [
    { label: "Projects", href: "/projects" },
    { label: "Staking", href: "/dashboard/staking" },
    { label: "Create", href: "/dashboard/create" },
  ];

  const featuredPresales = useMemo(() => {
    const live = allPresales.filter((p) => p.status === "live");
    const upcoming = allPresales.filter((p) => p.status === "upcoming");
    return [...live, ...upcoming].slice(0, 3);
  }, [allPresales]);

  const totalRaisedValue = useMemo(() => {
    const sum = allPresales.reduce((acc, p) => acc + (p.totalRaised || 0n), 0n);
    return parseFloat(formatEther(sum));
  }, [allPresales]);

  const livePresaleCount = useMemo(() => {
    return allPresales.filter((p) => p.status === "live" || p.status === "upcoming").length;
  }, [allPresales]);

  const { count: totalProjects, ref: totalProjectsRef } = useCountUp(allPresales.length);
  const { count: totalRaised, ref: totalRaisedRef } = useCountUp(totalRaisedValue);
  const { count: activePresales, ref: activePresalesRef } = useCountUp(livePresaleCount);
  const qfPriceUsd = useReactPriceUsd();

  const totalRaisedUsd = useMemo(() => {
    if (qfPriceUsd === null) return null;
    return totalRaised * qfPriceUsd;
  }, [qfPriceUsd, totalRaised]);

  return (
    <main className="min-h-screen text-black">
      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6">
        <header className="neo-frame mb-12 bg-white p-4 sm:p-6 animate-fade-in-up">
          <div className="flex items-center justify-between gap-3">
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                src="/qfpad-logo.png"
                alt="QFPad logo"
                className="h-11 w-11 rounded-[14px] border-[3px] border-black object-cover"
              />
              <p className="text-xl font-black uppercase leading-none tracking-[0.18em]">QFPad</p>
            </Link>

            <nav className="hidden items-center gap-4 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-xs font-black uppercase tracking-[0.14em] transition-colors hover:text-[#1E5BFF]"
                >
                  {link.label}
                </Link>
              ))}
              {!address && (
                <button
                  type="button"
                  onClick={() => openConnectModal?.()}
                  className="border-[3px] border-black bg-[#42C9FF] px-4 py-2 text-xs font-black uppercase tracking-[0.14em] [box-shadow:0_0_0_1px_#000,6px_6px_0_0_#000] transition-all hover:[box-shadow:0_0_0_1px_#000,10px_10px_0_0_#000] hover:-translate-x-1 hover:-translate-y-1"
                >
                  Connect Wallet
                </button>
              )}
            </nav>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav-menu"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              className="inline-flex items-center justify-center border-[3px] border-black bg-[#42C9FF] p-2 md:hidden"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          <div
            id="mobile-nav-menu"
            className={`overflow-hidden transition-all duration-200 md:hidden ${
              isMobileMenuOpen ? "mt-4 max-h-80 border-t-[3px] border-black pt-4" : "max-h-0"
            }`}
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={`${link.href}-mobile`}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-1 py-2 text-xs font-black uppercase tracking-[0.14em] hover:text-[#1E5BFF]"
                >
                  {link.label}
                </Link>
              ))}
              {!address && (
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openConnectModal?.();
                  }}
                  className="border-[3px] border-black bg-[#42C9FF] px-4 py-3 text-xs font-black uppercase tracking-[0.14em]"
                >
                  Connect Wallet
                </button>
              )}
            </nav>
          </div>
        </header>

        <section className="mb-16 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="neo-frame bg-[#FFF2D5] p-8 sm:p-10 animate-fade-in-up animation-delay-200">
            <h1 className="text-5xl font-black uppercase leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl">
              LAUNCH IDEAS.
              <br />
              MOON PROJECTS.
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-bold sm:text-xl">
              Discover, back, and launch the most promising projects on the QF Network.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/projects"
                className="-rotate-[0.9deg] sm:-rotate-[0.35deg] border-[3px] border-black bg-[#42C9FF] px-6 py-4 text-sm font-black uppercase tracking-[0.15em] [box-shadow:0_0_0_1px_#000,8px_8px_0_0_#000] transition-all hover:[box-shadow:0_0_0_1px_#000,12px_12px_0_0_#000] hover:-translate-x-1 hover:-translate-y-1"
              >
                Explore Projects
              </Link>
              <Link
                to="/dashboard/create"
                className="rotate-[0.9deg] sm:rotate-[0.35deg] border-[3px] border-black bg-[#FF7F41] px-6 py-4 text-sm font-black uppercase tracking-[0.15em] [box-shadow:0_0_0_1px_#000,8px_8px_0_0_#000] transition-all hover:[box-shadow:0_0_0_1px_#000,12px_12px_0_0_#000] hover:-translate-x-1 hover:-translate-y-1"
              >
                Launch My Project
              </Link>
            </div>
          </div>

          <div className="space-y-5">
            <div className="animate-fade-in-soft animation-delay-400">
              <div className="neo-frame rotate-[-1deg] bg-[#42C9FF] p-6">
                <p className="mb-3 text-xs font-black uppercase tracking-[0.16em]">Total Projects</p>
                <p ref={totalProjectsRef} className="text-5xl font-black">
                  {Math.floor(totalProjects).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="animate-fade-in-soft animation-delay-600">
              <div className="neo-frame rotate-[1deg] bg-[#FF7F41] p-6">
                <p className="mb-3 text-xs font-black uppercase tracking-[0.16em]">Total Raised</p>
                <p ref={totalRaisedRef} className="text-4xl font-black">
                  {totalRaisedUsd === null
                    ? "..."
                    : `$${totalRaisedUsd.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`}
                </p>
                <p className="mt-2 text-sm font-black uppercase tracking-[0.14em]">
                  {totalRaised < 0.01 ? "0" : totalRaised.toFixed(2)} QF
                </p>
              </div>
            </div>
            <div className="animate-fade-in-soft animation-delay-800">
              <div className="neo-frame rotate-[-1deg] bg-[#B8EF53] p-6">
                <p className="mb-3 text-xs font-black uppercase tracking-[0.16em]">Active Presales</p>
                <p ref={activePresalesRef} className="text-5xl font-black">
                  {Math.floor(activePresales).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="neo-frame mb-16 overflow-hidden bg-[#111111] text-white animate-fade-in-up animation-delay-200">
          <div className="overflow-hidden px-3 py-4 sm:px-4">
            <div className="flex w-max items-center animate-launch-bar-slide">
              {[0, 1].map((loop) => (
                <div
                  key={`launch-message-${loop}`}
                  aria-hidden={loop === 1}
                  className="flex shrink-0 items-center gap-2 px-4 text-[10px] font-black uppercase tracking-[0.1em] whitespace-nowrap sm:gap-8 sm:px-10 sm:text-sm sm:tracking-[0.2em]"
                >
                  <span>Permissionless</span>
                  <span className="text-[#B8EF53]">•</span>
                  <span>Creator-first</span>
                  <span className="text-[#42C9FF]">•</span>
                  <span>On-chain orchestration</span>
                  <span className="text-[#FF7F41]">•</span>
                  <span>Fast launch workflow</span>
                  <span className="text-[#F95D9B]">•</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-16 animate-fade-in-up">
          <h2 className="mb-6 text-4xl font-black uppercase tracking-tight sm:text-5xl">Featured Launches</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {isLoadingPresales ? (
              <div className="neo-frame -rotate-[0.7deg] bg-white p-8 text-center font-black uppercase md:col-span-2 lg:col-span-3">
                Loading projects...
              </div>
            ) : featuredPresales.length === 0 ? (
              <div className="neo-frame rotate-[0.7deg] bg-white p-8 text-center md:col-span-2 lg:col-span-3">
                <p className="text-2xl font-black uppercase">No projects to feature</p>
                <p className="mt-2 font-bold text-black/70">Check back soon for new launches.</p>
              </div>
            ) : (
              featuredPresales.map((presale, index) => (
                <Link
                  to={`/projects/${presale.address}`}
                  key={presale.address}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${0.12 + index * 0.12}s` }}
                >
                  <article
                    className={`${cardStyles[index % cardStyles.length].bg} ${
                      cardStyles[index % cardStyles.length].text
                    } neo-frame ${index % 2 === 0 ? "rotate-[0.8deg]" : "-rotate-[0.8deg]"} h-full p-7 transition-all hover:-translate-x-1 hover:-translate-y-1`}
                  >
                    <p className="mb-3 text-[11px] font-black uppercase tracking-[0.16em]">Featured</p>
                    <h3 className="text-2xl font-black uppercase leading-tight">
                      {presale.saleTokenName || "Unnamed Project"}
                    </h3>
                    <p className="mt-6 text-xs font-black uppercase tracking-[0.16em]">Learn More</p>
                  </article>
                </Link>
              ))
            )}
          </div>
        </section>

        <section className="neo-frame -rotate-[0.75deg] mb-12 bg-white p-8 sm:p-12 animate-fade-in-up animation-delay-200">
          <h2 className="text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl">
            Launch Faster,
            <br />
            Fund Smarter
          </h2>
          <p className="mt-5 max-w-2xl text-lg font-bold">
            Turn your concept into a live on-chain raise with built-in token and NFT tooling on QF Network.
          </p>
          <Link
            to="/dashboard/create"
            className="mt-8 inline-flex rotate-[0.35deg] border-[2px] border-black bg-[#B8EF53] px-7 py-3 text-sm font-black uppercase tracking-[0.16em] [box-shadow:0_0_0_1px_#000,6px_6px_0_0_#000] transition-all hover:[box-shadow:0_0_0_1px_#000,10px_10px_0_0_#000] hover:-translate-x-1 hover:-translate-y-1"
          >
            Create a Project
          </Link>
        </section>
      </div>

      <footer className="border-t-[3px] border-black bg-[#111111] text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-7 md:flex-row">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-center md:text-left">
            &copy; {new Date().getFullYear()} QFPAD
          </p>
          <div className="flex gap-4">
            <a
              href="https://x.com/qfpad_"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center border-[2px] border-black bg-[#42C9FF] text-black transition-all hover:-translate-y-1"
            >
              <XSocialIcon size={18} />
            </a>
            <a
              href="https://t.me/qfpad"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center border-[2px] border-black bg-[#FF7F41] text-black transition-all hover:-translate-y-1"
            >
              <TelegramIcon size={18} />
            </a>
            <a
              href="https://qfpad.gitbook.io/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center border-[2px] border-black bg-[#B8EF53] text-black transition-all hover:-translate-y-1"
            >
              <BookOpen size={18} />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
