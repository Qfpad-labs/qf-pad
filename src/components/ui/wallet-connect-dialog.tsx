import { useMemo, useState } from "react";
import { useWallet } from "@/lib/papi/wallet-context";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { Button } from "./button";
import {
  WalletMinimal,
  ChevronRight,
  ChevronDown,
  Download,
  User,
} from "lucide-react";
import type { InjectedPolkadotAccount } from "polkadot-api/pjs-signer";
import { getWallets, getWalletBySource, type Wallet } from "@talismn/connect-wallets";

function truncateAddress(addr: string, chars = 6): string {
  if (addr.length <= chars * 2 + 3) return addr;
  return `${addr.slice(0, chars)}...${addr.slice(-chars)}`;
}

function prettifyName(name: string): string {
  return name
    .replace(/-js$/, "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function WalletConnectDialog() {
  const {
    isConnectDialogOpen,
    closeConnectModal,
    extensions,
    connect,
    availableAccounts,
    selectAccount,
    connectedExtension,
  } = useWallet();

  const showAccountSelection = connectedExtension && availableAccounts.length > 0;
  const showNoSupportedAccounts =
    connectedExtension && availableAccounts.length === 0;

  return (
    <Dialog open={isConnectDialogOpen} onOpenChange={(open) => !open && closeConnectModal()}>
      <DialogContent className="border-[3px] border-black bg-[#FFF8E7] [box-shadow:6px_6px_0_0_#000] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-black uppercase tracking-wider">
            {showAccountSelection ? "Select Account" : "Connect Wallet"}
          </DialogTitle>
        </DialogHeader>

        {!showAccountSelection && !showNoSupportedAccounts ? (
          <ExtensionList extensions={extensions} onConnect={connect} />
        ) : showNoSupportedAccounts ? (
          <NoSupportedAccounts extensionName={connectedExtension.name} />
        ) : (
          <AccountList
            accounts={availableAccounts}
            onSelect={selectAccount}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

function NoSupportedAccounts({ extensionName }: { extensionName: string }) {
  return (
    <div className="space-y-4 py-4">
      <p className="text-center text-sm text-neutral-700">
        No supported Polkadot accounts were found in {extensionName}.
      </p>
      <p className="text-center text-xs text-neutral-500">
        QF contract writes use the Substrate/PAPI flow. Select an SS58 account in
        Talisman or SubWallet, not an Ethereum account.
      </p>
    </div>
  );
}

function WalletTile({
  icon,
  title,
  onClick,
  disabled,
  rightSlot,
}: {
  icon: React.ReactNode;
  title: string;
  onClick?: () => void;
  disabled?: boolean;
  rightSlot?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex w-full items-center gap-3 rounded-lg border-[2px] border-black bg-white px-4 py-3 text-left font-bold transition-all hover:bg-[#F5CF85] hover:[box-shadow:4px_4px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:bg-white disabled:hover:[box-shadow:none]"
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center">
        {icon}
      </div>
      <span className="flex-1 truncate">{title}</span>
      {rightSlot ?? <ChevronRight className="h-5 w-5 text-neutral-400" />}
    </button>
  );
}

function ExtensionList({
  extensions,
  onConnect,
}: {
  extensions: string[];
  onConnect: (name: string) => Promise<void>;
}) {
  const [connectingName, setConnectingName] = useState<string | null>(null);
  const [showOther, setShowOther] = useState(false);

  const installedWallets = useMemo(() => {
    return extensions.map((name) => ({
      extensionName: name,
      meta: getWalletBySource(name) as Wallet | undefined,
    }));
  }, [extensions]);

  const otherWallets = useMemo(() => {
    const installedSet = new Set(extensions);
    return getWallets().filter((w) => !installedSet.has(w.extensionName));
  }, [extensions]);

  async function handleConnect(name: string) {
    setConnectingName(name);
    try {
      await onConnect(name);
    } finally {
      setConnectingName(null);
    }
  }

  if (extensions.length === 0) {
    return (
      <div className="space-y-4 py-2">
        <div className="rounded-lg border-[2px] border-black bg-white p-4">
          <p className="text-sm font-bold text-neutral-800">
            No Polkadot wallet detected.
          </p>
          <p className="mt-1 text-xs text-neutral-600">
            Install one of the wallets below to continue.
          </p>
        </div>
        <div className="space-y-2">
          {getWallets().map((w) => (
            <InstallRow key={w.extensionName} wallet={w} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 py-2">
      <div className="space-y-2">
        {installedWallets.map(({ extensionName, meta }) => {
          const isConnecting = connectingName === extensionName;
          const title = meta?.title ?? prettifyName(extensionName);
          const icon = meta?.logo ? (
            <img
              src={meta.logo.src}
              alt={meta.logo.alt}
              className="h-8 w-8 rounded-md"
            />
          ) : (
            <WalletMinimal className="h-7 w-7" />
          );
          return (
            <WalletTile
              key={extensionName}
              icon={icon}
              title={title}
              onClick={() => handleConnect(extensionName)}
              disabled={isConnecting}
              rightSlot={
                isConnecting ? (
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                    Connecting…
                  </span>
                ) : undefined
              }
            />
          );
        })}
      </div>

      {otherWallets.length > 0 && (
        <div className="border-t-2 border-dashed border-black/30 pt-3">
          <button
            type="button"
            onClick={() => setShowOther((v) => !v)}
            className="flex w-full items-center justify-between text-xs font-bold uppercase tracking-[0.18em] text-neutral-600 hover:text-black"
          >
            <span>Other wallets</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${showOther ? "rotate-180" : ""}`}
            />
          </button>
          {showOther && (
            <div className="mt-2 space-y-2">
              {otherWallets.map((w) => (
                <InstallRow key={w.extensionName} wallet={w} />
              ))}
            </div>
          )}
        </div>
      )}

      <p className="text-[11px] leading-relaxed text-neutral-600">
        Your wallet uses SS58 addresses (Substrate). Your first transaction will
        map it to an EVM-compatible address automatically.
      </p>
    </div>
  );
}

function InstallRow({ wallet }: { wallet: Wallet }) {
  return (
    <a
      href={wallet.installUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-full items-center gap-3 rounded-lg border-[2px] border-black/40 bg-white/50 px-4 py-3 text-left font-bold text-neutral-700 transition-all hover:border-black hover:bg-white hover:text-black hover:[box-shadow:4px_4px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5"
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center">
        <img
          src={wallet.logo.src}
          alt={wallet.logo.alt}
          className="h-8 w-8 rounded-md opacity-80"
        />
      </div>
      <span className="flex-1 truncate">{wallet.title}</span>
      <span className="flex items-center gap-1 text-xs uppercase tracking-wider">
        <Download className="h-3.5 w-3.5" />
        Install
      </span>
    </a>
  );
}

function AccountList({
  accounts,
  onSelect,
}: {
  accounts: InjectedPolkadotAccount[];
  onSelect: (account: InjectedPolkadotAccount) => void;
}) {
  return (
    <div className="max-h-80 space-y-2 overflow-y-auto py-2">
      {accounts.map((account) => (
        <Button
          key={account.address}
          variant="outline"
          onClick={() => onSelect(account)}
          className="flex w-full items-center gap-3 border-[2px] border-black bg-white px-4 py-3 h-auto text-left font-medium transition-all hover:bg-[#F5CF85] hover:[box-shadow:4px_4px_0_0_#000]"
        >
          <User className="h-6 w-6 shrink-0 text-neutral-500" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold truncate">
              {account.name ?? "Unnamed"}
            </p>
            <p className="text-[11px] font-mono text-neutral-500 truncate">
              {truncateAddress(account.address, 8)}
            </p>
          </div>
        </Button>
      ))}
    </div>
  );
}
