import {
  type KeypairType,
  type InjectedAccount,
  type InjectedExtension,
  type InjectedPolkadotAccount,
  type SignPayload,
  type SignRaw,
  type SignerPayloadJSON,
} from "polkadot-api/pjs-signer";
import type { PolkadotSigner } from "polkadot-api";
import { createV4Tx } from "@polkadot-api/signers-common";
import {
  AccountId,
  Blake2256,
  compact,
  compactBn,
  decAnyMetadata,
  u32,
  unifyMetadata,
} from "@polkadot-api/substrate-bindings";
import { fromHex, toHex } from "@polkadot-api/utils";

declare global {
  interface Window {
    injectedWeb3?: Record<
      string,
      | {
          enable: (dappName?: string) => Promise<PjsInjectedExtension>;
        }
      | undefined
    >;
  }
}

interface PjsInjectedExtension {
  signer: {
    signPayload: SignPayload;
    signRaw: SignRaw;
  };
  accounts: {
    get: () => Promise<InjectedAccount[]>;
    subscribe: (cb: (accounts: InjectedAccount[]) => void) => () => void;
  };
}

type MaybeEthereumKeypairType = KeypairType | "ethereum";
type SigningType = "Ed25519" | "Sr25519" | "Ecdsa";

const supportedAccountTypes = new Set([
  "ed25519",
  "sr25519",
  "ecdsa",
]);

const accountIdEnc = AccountId().enc;

const signingTypeByte: Record<SigningType, number> = {
  Ed25519: 0,
  Sr25519: 1,
  Ecdsa: 2,
};

function toPjsHex(value: number | bigint, minByteLen = 0): `0x${string}` {
  let hex = BigInt(value).toString(16);
  if (hex.length % 2) hex = `0${hex}`;
  const nPaddedBytes = Math.max(0, minByteLen - hex.length / 2);
  return `0x${"00".repeat(nPaddedBytes)}${hex}`;
}

function getPublicKey(address: string): Uint8Array {
  return address.startsWith("0x") ? fromHex(address) : accountIdEnc(address);
}

function getSigningType(
  keypairType: MaybeEthereumKeypairType | undefined
): SigningType | undefined {
  switch (keypairType) {
    case "ed25519":
      return "Ed25519";
    case "sr25519":
      return "Sr25519";
    case "ecdsa":
    case "ethereum":
      return "Ecdsa";
    default:
      return undefined;
  }
}

function isPrefixedMultiSignature(
  signature: Uint8Array,
  signingType: SigningType | undefined
): boolean {
  if (!signingType) return false;
  if (signingType === "Ecdsa") {
    return signature.length === 66 && signature[0] === signingTypeByte.Ecdsa;
  }
  return (
    signature.length === 65 && signature[0] === signingTypeByte[signingType]
  );
}

/**
 * Talisman can return signedTransaction payloads that include CheckMetadataHash
 * fields built from stale extension metadata. Force standard signature mode to
 * keep metadata hash control in the dapp-side signed extension values.
 */
function sanitizeSignerPayload(payload: SignerPayloadJSON): SignerPayloadJSON {
  const sanitized: SignerPayloadJSON = {
    ...payload,
    withSignedTransaction: false,
  };

  // Ensure the wallet does not force metadata hash mode in payload signing.
  if (sanitized.mode !== undefined) {
    sanitized.mode = 0;
  }
  if ("metadataHash" in sanitized) {
    delete (sanitized as Partial<SignerPayloadJSON>).metadataHash;
  }

  return sanitized;
}

function getPolkadotSignerFromPjsTyped(
  address: string,
  signPayload: SignPayload,
  signRaw: SignRaw,
  keypairType?: MaybeEthereumKeypairType
): PolkadotSigner {
  const publicKey = getPublicKey(address);
  const signingType = getSigningType(keypairType);

  const signBytes: PolkadotSigner["signBytes"] = (data) =>
    signRaw({
      address,
      data: toHex(data),
      type: "bytes",
    }).then(({ signature }) => fromHex(signature));

  const signTx: PolkadotSigner["signTx"] = async (
    callData,
    signedExtensions,
    metadata,
    atBlockNumber,
    _hasher = Blake2256
  ) => {
    const decMeta = unifyMetadata(decAnyMetadata(metadata));
    const payload: SignerPayloadJSON = {
      address,
      method: toHex(callData),
      signedExtensions: [],
      version: 4,
      withSignedTransaction: false,
      specVersion: "0x00000000",
      transactionVersion: "0x00000000",
      genesisHash: "0x",
      blockHash: "0x",
      blockNumber: "0x00000000",
      era: "0x00",
      nonce: "0x00000000",
      tip: "0x00000000000000000000000000000000",
    };
    const extra: Uint8Array[] = [];

    for (const { identifier } of decMeta.extrinsic.signedExtensions[0]) {
      const extension = signedExtensions[identifier];
      if (!extension) {
        throw new Error(`Missing ${identifier} signed-extension`);
      }

      extra.push(extension.value);
      payload.signedExtensions.push(identifier);

      switch (identifier) {
        case "CheckGenesis":
          payload.genesisHash = toHex(extension.additionalSigned);
          break;
        case "CheckNonce":
          payload.nonce = toPjsHex(compact.dec(extension.value), 4);
          break;
        case "CheckTxVersion":
          payload.transactionVersion = toPjsHex(
            u32.dec(extension.additionalSigned),
            4
          );
          break;
        case "ChargeTransactionPayment":
          payload.tip = toPjsHex(compactBn.dec(extension.value), 16);
          break;
        case "CheckMortality":
          payload.era = toHex(extension.value);
          payload.blockHash = toHex(extension.additionalSigned);
          payload.blockNumber = toPjsHex(atBlockNumber, 4);
          break;
        case "CheckSpecVersion":
          payload.specVersion = toPjsHex(u32.dec(extension.additionalSigned), 4);
          break;
        case "CheckMetadataHash":
          payload.mode = 0;
          if ("metadataHash" in payload) {
            delete (payload as Partial<SignerPayloadJSON>).metadataHash;
          }
          break;
        default:
          if (extension.value.length > 0 || extension.additionalSigned.length > 0) {
            throw new Error(`PJS signer mapper missing for ${identifier}`);
          }
      }
    }

    const signed = await signPayload(sanitizeSignerPayload(payload));
    const signatureBytes = fromHex(signed.signature);
    const txSigningType = isPrefixedMultiSignature(signatureBytes, signingType)
      ? undefined
      : signingType;

    return createV4Tx(
      decMeta,
      publicKey,
      signatureBytes,
      extra,
      callData,
      txSigningType
    );
  };

  return { publicKey, signTx, signBytes };
}

export const connectInjectedExtension = async (
  name: string,
  dappName?: string
): Promise<InjectedExtension> => {
  const entry = window.injectedWeb3?.[name];
  if (!entry) {
    throw new Error(`Unavailable extension: "${name}"`);
  }

  const enabledExtension = await entry.enable(dappName);
  const rawSignPayload = enabledExtension.signer.signPayload.bind(
    enabledExtension.signer
  );
  const signRaw = enabledExtension.signer.signRaw.bind(enabledExtension.signer);

  const signPayload: SignPayload = (payload) =>
    rawSignPayload(sanitizeSignerPayload(payload));

  const toInjectedAccounts = (
    accounts: InjectedAccount[]
  ): InjectedPolkadotAccount[] =>
    accounts
      .filter(({ type }) => supportedAccountTypes.has(type ?? ""))
      .map((account) => ({
        ...account,
        polkadotSigner: getPolkadotSignerFromPjsTyped(
          account.address,
          signPayload,
          signRaw,
          account.type as MaybeEthereumKeypairType | undefined
        ),
      }));

  let currentAccounts = toInjectedAccounts(await enabledExtension.accounts.get());
  const listeners = new Set<(accounts: InjectedPolkadotAccount[]) => void>();
  const stop = enabledExtension.accounts.subscribe((accounts) => {
    currentAccounts = toInjectedAccounts(accounts);
    listeners.forEach((listener) => listener(currentAccounts));
  });

  return {
    name,
    getAccounts: () => currentAccounts,
    subscribe: (cb) => {
      listeners.add(cb);
      return () => {
        listeners.delete(cb);
      };
    },
    disconnect: () => {
      stop();
    },
  };
};

export const getInjectedExtensions = (): string[] =>
  window.injectedWeb3 ? Object.keys(window.injectedWeb3) : [];

export type { InjectedExtension, InjectedPolkadotAccount };
