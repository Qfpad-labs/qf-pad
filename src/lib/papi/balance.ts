import { typedApi } from "./client";

/**
 * Get native QF balance for an SS58 address.
 * Uses System.Account storage query via PAPI.
 */
export async function getNativeBalance(
  ss58Address: string
): Promise<{ free: bigint; reserved: bigint }> {
  const accountInfo = await typedApi.query.System.Account.getValue(ss58Address);
  return {
    free: accountInfo.data.free,
    reserved: accountInfo.data.reserved,
  };
}
