import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  connectInjectedExtension,
  getInjectedExtensions,
  type InjectedPolkadotAccount,
  type InjectedExtension,
} from "./injected-extensions";
import { AccountId } from "@polkadot-api/substrate-bindings";
import { type PolkadotSigner } from "polkadot-api";
import { getAddress, keccak256, toHex, type Address } from "viem";
import { typedApi } from "./client";


interface WalletAccount {
  ss58Address: string;
  address: Address; // Derived EVM 0x address
  displayName: string;
  polkadotSigner: PolkadotSigner;
}

type H160Like = {
  asHex: () => string;
};

interface WalletContextValue {
  // Connection state
  isConnected: boolean;
  account: WalletAccount | null;
  ss58Address: string | undefined;
  address: Address | undefined; // Derived EVM address for backward compat

  // Available extensions
  extensions: string[];

  // Actions
  connect: (extensionName: string) => Promise<void>;
  disconnect: () => void;
  selectAccount: (account: InjectedPolkadotAccount) => void;

  // Connect dialog
  isConnectDialogOpen: boolean;
  openConnectModal: () => void;
  closeConnectModal: () => void;

  // Extension accounts (after connecting an extension)
  availableAccounts: InjectedPolkadotAccount[];
  connectedExtension: InjectedExtension | null;
}

const WalletContext = createContext<WalletContextValue | null>(null);

const STORAGE_KEY = "qfpad:wallet";
const isSs58Address = (address: string) => !address.startsWith("0x");
const accountIdEnc = AccountId().enc;

function deriveMappedEvmAddress(ss58Address: string): Address {
  const publicKeyHex = toHex(accountIdEnc(ss58Address));
  const hash = keccak256(publicKeyHex);
  return getAddress(`0x${hash.slice(-40)}`);
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const [extensions, setExtensions] = useState<string[]>([]);
  const [connectedExtension, setConnectedExtension] =
    useState<InjectedExtension | null>(null);
  const [availableAccounts, setAvailableAccounts] = useState<
    InjectedPolkadotAccount[]
  >([]);
  const [selectedAccount, setSelectedAccount] =
    useState<InjectedPolkadotAccount | null>(null);
  const [isConnectDialogOpen, setIsConnectDialogOpen] = useState(false);

  // Derive the wallet account with EVM address
  const [evmAddress, setEvmAddress] = useState<Address | undefined>(undefined);

  // Discover extensions on mount
  useEffect(() => {
    // Extensions inject async; poll briefly
    const tryDiscover = () => {
      const exts = getInjectedExtensions();
      if (exts.length > 0) {
        setExtensions(exts);
      }
    };
    tryDiscover();
    // Retry after 500ms and 1500ms in case extensions are slow to inject
    const t1 = setTimeout(tryDiscover, 500);
    const t2 = setTimeout(tryDiscover, 1500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Resolve EVM address via ReviveApi.address when account changes
  useEffect(() => {
    if (!selectedAccount) {
      setEvmAddress(undefined);
      return;
    }

    if (!isSs58Address(selectedAccount.address)) {
      setEvmAddress(undefined);
      return;
    }

    let cancelled = false;

    // Try the runtime API first (most accurate)
    typedApi.apis.ReviveApi.address(selectedAccount.address)
      .then((h160: H160Like) => {
        if (!cancelled) {
          setEvmAddress(getAddress(h160.asHex()));
        }
      })
      .catch(() => {
        if (!cancelled) {
          try {
            setEvmAddress(deriveMappedEvmAddress(selectedAccount.address));
          } catch {
            console.warn(
              "Could not resolve EVM address via runtime API or local derivation"
            );
          }
        }
      });

    return () => {
      cancelled = true;
    };
  }, [selectedAccount]);

  // Keep account objects/signers fresh when the extension account list changes.
  useEffect(() => {
    if (!connectedExtension) {
      return;
    }

    return connectedExtension.subscribe((accounts) => {
      setAvailableAccounts(accounts);

      setSelectedAccount((current) => {
        if (!current) {
          return current;
        }

        const updated = accounts.find((account) => account.address === current.address);
        if (updated) {
          return updated;
        }

        if (accounts.length === 1) {
          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
              extensionName: connectedExtension.name,
              accountAddress: accounts[0].address,
            })
          );
          return accounts[0];
        }

        localStorage.removeItem(STORAGE_KEY);
        return null;
      });
    });
  }, [connectedExtension]);

  // Auto-reconnect from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;

    try {
      const { extensionName, accountAddress } = JSON.parse(stored);
      if (!extensionName) return;

      // Wait for extensions to be available
      const attemptReconnect = async () => {
        const available = getInjectedExtensions();
        if (!available.includes(extensionName)) return;

        const ext = await connectInjectedExtension(extensionName);
        setConnectedExtension(ext);
        const accounts = ext.getAccounts();
        setAvailableAccounts(accounts);

        if (accountAddress) {
          const acc = accounts.find((a) => a.address === accountAddress);
          if (acc) {
            setSelectedAccount(acc);
            return;
          }
        }

        if (accounts.length === 1) {
          setSelectedAccount(accounts[0]);
          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
              extensionName,
              accountAddress: accounts[0].address,
            })
          );
        }
      };

      // Try immediately then after delay
      attemptReconnect();
      const timer = setTimeout(attemptReconnect, 1000);
      return () => clearTimeout(timer);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const connect = useCallback(async (extensionName: string) => {
    const ext = await connectInjectedExtension(extensionName);
    setConnectedExtension(ext);
    const accounts = ext.getAccounts();
    setAvailableAccounts(accounts);

    // Auto-select if only one account
    if (accounts.length === 1) {
      setSelectedAccount(accounts[0]);
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          extensionName,
          accountAddress: accounts[0].address,
        })
      );
      setIsConnectDialogOpen(false);
    }
  }, []);

  const selectAccount = useCallback(
    (account: InjectedPolkadotAccount) => {
      setSelectedAccount(account);
      setIsConnectDialogOpen(false);
      if (connectedExtension) {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            extensionName: (connectedExtension as { name?: string }).name,
            accountAddress: account.address,
          })
        );
      }
    },
    [connectedExtension]
  );

  const disconnect = useCallback(() => {
    connectedExtension?.disconnect();
    setSelectedAccount(null);
    setAvailableAccounts([]);
    setConnectedExtension(null);
    setEvmAddress(undefined);
    localStorage.removeItem(STORAGE_KEY);
  }, [connectedExtension]);

  const account = useMemo((): WalletAccount | null => {
    if (!selectedAccount || !evmAddress) return null;
    return {
      ss58Address: selectedAccount.address,
      address: evmAddress,
      displayName: selectedAccount.name ?? "Account",
      polkadotSigner: selectedAccount.polkadotSigner,
    };
  }, [selectedAccount, evmAddress]);

  const value = useMemo(
    (): WalletContextValue => ({
      isConnected: !!account,
      account,
      ss58Address: selectedAccount?.address,
      address: evmAddress,
      extensions,
      connect,
      disconnect,
      selectAccount,
      isConnectDialogOpen,
      openConnectModal: () => setIsConnectDialogOpen(true),
      closeConnectModal: () => setIsConnectDialogOpen(false),
      availableAccounts,
      connectedExtension,
    }),
    [
      account,
      selectedAccount,
      evmAddress,
      extensions,
      connect,
      disconnect,
      selectAccount,
      isConnectDialogOpen,
      availableAccounts,
      connectedExtension,
    ]
  );

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
}

export function useWallet(): WalletContextValue {
  const ctx = useContext(WalletContext);
  if (!ctx) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return ctx;
}
