import {
  encodeFunctionData,
  decodeFunctionResult,
  type Abi,
  type Address,
} from "viem";
import { Binary, FixedSizeBinary } from "polkadot-api";
import { typedApi } from "./client";

/**
 * Read a Solidity contract via pallet-revive's ReviveApi.call runtime API.
 *
 * This is the PAPI equivalent of viem's publicClient.readContract / wagmi's useReadContract.
 */
export async function contractRead({
  address,
  abi,
  functionName,
  args = [],
  callerAddress,
}: {
  address: Address;
  abi: Abi | readonly unknown[];
  functionName: string;
  args?: unknown[];
  callerAddress?: string; // SS58 address of the caller (optional for pure reads)
}): Promise<unknown> {
  const calldata = encodeFunctionData({
    abi: abi as Abi,
    functionName,
    args,
  });

  const dest = FixedSizeBinary.fromHex(address);
  const inputData = Binary.fromHex(calldata);

  // For reads, origin can be a dummy SS58 address if not provided.
  // ReviveApi.call takes origin as SS58String.
  const origin =
    callerAddress ?? "5C4hrfjw9DjXZTzV3MwzrrAr9P1MJhSrvWGWqi1eSuyUpnhM"; // Alice dev address as fallback

  const result = await typedApi.apis.ReviveApi.call(
    origin,
    dest,
    0n, // value
    undefined, // gas_limit (none for reads)
    undefined, // storage_deposit_limit (none for reads)
    inputData
  );

  // ReviveApi.call returns { gas_consumed, gas_required, storage_deposit, result }
  // result is a Result<{ data, flags }, Error>

  // Try to extract the inner result
  // PAPI wraps it as ResultPayload - access .value for the Ok variant
  const inner = (result as Record<string, unknown>).result as Record<string, unknown>;
  const okValue = (inner?.value ?? inner) as { data?: Binary; flags?: number };

  if (okValue?.flags === 1) {
    throw new Error(
      `Contract call reverted: ${functionName} on ${address}`
    );
  }

  if (!okValue?.data) {
    // If result structure is different, try accessing directly
    const directData = (result as Record<string, unknown>).data as Binary | undefined;
    const directFlags = (result as Record<string, unknown>).flags as number | undefined;
    if (directFlags === 1) {
      throw new Error(`Contract call reverted: ${functionName} on ${address}`);
    }
    if (directData) {
      const decoded = decodeFunctionResult({
        abi: abi as Abi,
        functionName,
        data: directData.asHex(),
      });
      return decoded;
    }
    throw new Error(`Unexpected result structure from ReviveApi.call for ${functionName}`);
  }

  const returnData = okValue.data.asHex();

  const decoded = decodeFunctionResult({
    abi: abi as Abi,
    functionName,
    data: returnData,
  });

  return decoded;
}

/**
 * Batch read multiple contract calls in parallel.
 * Returns results in the same shape as wagmi's useReadContracts.
 */
export async function contractReadBatch(
  contracts: Array<{
    address: Address;
    abi: Abi | readonly unknown[];
    functionName: string;
    args?: unknown[];
  }>,
  callerAddress?: string
): Promise<Array<{ result: unknown; status: "success" | "failure"; error?: Error }>> {
  const results = await Promise.allSettled(
    contracts.map((contract) =>
      contractRead({
        address: contract.address,
        abi: contract.abi,
        functionName: contract.functionName,
        args: contract.args ?? [],
        callerAddress,
      })
    )
  );

  return results.map((r) => {
    if (r.status === "fulfilled") {
      return { result: r.value, status: "success" as const };
    }
    return { result: undefined, status: "failure" as const, error: r.reason as Error };
  });
}

/**
 * Helper to read a single contract value (imperative, not a hook).
 * Drop-in replacement for wagmi/actions readContract.
 */
export async function readContract(params: {
  address: Address;
  abi: Abi | readonly unknown[];
  functionName: string;
  args?: unknown[];
}): Promise<unknown> {
  return contractRead(params);
}

/**
 * Helper to batch read contract values (imperative, not a hook).
 * Drop-in replacement for wagmi/actions readContracts.
 */
export async function readContracts(params: {
  contracts: Array<{
    address: Address;
    abi: Abi | readonly unknown[];
    functionName: string;
    args?: unknown[];
  }>;
}): Promise<Array<{ result: unknown; status: "success" | "failure"; error?: Error }>> {
  return contractReadBatch(params.contracts);
}
