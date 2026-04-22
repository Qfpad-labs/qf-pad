import {
  encodeFunctionData,
  type Abi,
  type Address,
} from "viem";
import { Binary, FixedSizeBinary, type PolkadotSigner } from "polkadot-api";
import { typedApi } from "./client";
import { ensureMapped } from "./map-account";
import { signAndSubmitWithRetry } from "./sign-retry";

function collectErrorText(input: unknown): string {
  if (input == null) return "";
  if (typeof input === "string") return input;
  if (
    typeof input === "number" ||
    typeof input === "boolean" ||
    typeof input === "bigint"
  ) {
    return String(input);
  }
  if (Array.isArray(input)) {
    return input.map((item) => collectErrorText(item)).join(" ");
  }
  if (typeof input === "object") {
    return Object.values(input as Record<string, unknown>)
      .map((value) => collectErrorText(value))
      .join(" ");
  }
  return "";
}

function formatDispatchError(dispatchError: unknown): string {
  if (!dispatchError || typeof dispatchError !== "object") {
    return String(dispatchError ?? "unknown dispatch error");
  }
  const maybeDispatch = dispatchError as { type?: unknown; value?: unknown };
  if (
    typeof maybeDispatch.type === "string" &&
    maybeDispatch.value &&
    typeof maybeDispatch.value === "object"
  ) {
    const nested = maybeDispatch.value as { type?: unknown };
    if (typeof nested.type === "string") {
      return `${maybeDispatch.type}.${nested.type}`;
    }
  }
  const text = collectErrorText(dispatchError).trim();
  return text || "unknown dispatch error";
}

/**
 * Write to a Solidity contract via pallet-revive's Revive.call extrinsic.
 *
 * Flow:
 * 1. Encode calldata with viem
 * 2. Ensure account is mapped (map_account)
 * 3. Dry-run for gas estimation via ReviveApi.call
 * 4. Submit via Revive.call extrinsic
 * 5. Returns finalization result
 */
export async function contractWrite({
  address,
  abi,
  functionName,
  args = [],
  value = 0n,
  signer,
  ss58Address,
}: {
  address: Address;
  abi: Abi | readonly unknown[];
  functionName: string;
  args?: unknown[];
  value?: bigint;
  signer: PolkadotSigner;
  ss58Address: string;
}): Promise<{ txHash: string; ok: boolean; events: unknown[] }> {
  if (ss58Address.startsWith("0x")) {
    throw new Error(
      "QF contract writes require a Substrate SS58 account. Select a Polkadot account in Talisman/SubWallet, not an Ethereum account."
    );
  }

  // 1. Encode calldata
  const calldata = encodeFunctionData({
    abi: abi as Abi,
    functionName,
    args,
  });

  const dest = FixedSizeBinary.fromHex(address);
  const inputData = Binary.fromHex(calldata);

  // 2. Ensure account mapping
  await ensureMapped(signer, ss58Address);

  // 3. Dry-run for gas estimation
  const dryRunResult = await typedApi.apis.ReviveApi.call(
    ss58Address,
    dest,
    value,
    undefined, // no gas limit for dry-run
    undefined, // no storage deposit limit for dry-run
    inputData
  );

  // Extract gas consumed and storage deposit from dry-run
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dryRun = dryRunResult as any;

  // Check for dry-run dispatch errors and contract-level reverts.
  if (dryRun.result?.success === false) {
    throw new Error(
      `Contract dry-run failed: ${formatDispatchError(dryRun.result?.value)}`
    );
  }
  const innerResult = dryRun.result?.value ?? dryRun.result;
  const returnFlags = Number(innerResult?.flags ?? 0);
  if ((returnFlags & 1) === 1) {
    throw new Error(
      `Contract call would revert: ${functionName} on ${address}`
    );
  }

  // Add 25% buffer to gas estimate
  const gasRequired = dryRun.gas_required ?? dryRun.gas_consumed;
  const gasLimit = {
    ref_time: (BigInt(gasRequired.ref_time) * 125n) / 100n,
    proof_size: (BigInt(gasRequired.proof_size) * 125n) / 100n,
  };

  // Storage deposit: extract value from Enum (Charge variant)
  let storageDeposit = 0n;
  if (dryRun.storage_deposit?.type === "Charge") {
    const sd = dryRun.storage_deposit;
    const depositValue = sd.value;
    if (typeof depositValue === "bigint" && depositValue > 0n) {
      storageDeposit = (depositValue * 125n) / 100n;
    }
  }

  // 4. Submit the transaction. Wrapped in retry to swallow Talisman's
  // intermittent BadProof — each attempt rebuilds a fresh payload.
  const result = await signAndSubmitWithRetry(() =>
    typedApi.tx.Revive.call({
      dest,
      value,
      gas_limit: gasLimit,
      storage_deposit_limit: storageDeposit,
      data: inputData,
    }).signAndSubmit(signer)
  );

  if (!result.ok) {
    throw new Error(
      `Revive.call failed: ${formatDispatchError(result.dispatchError)}`
    );
  }

  return {
    txHash: result.txHash,
    ok: result.ok,
    events: result.events ?? [],
  };
}
