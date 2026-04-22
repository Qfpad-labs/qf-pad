import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Token = { address: string; };

export const sortTokens = <T extends Token>(tokenA: T, tokenB: T): [T, T] => {
  // Handle native token (0x0 address) - always put it first
  const isTokenANative = tokenA.address === '0x0000000000000000000000000000000000000000';
  const isTokenBNative = tokenB.address === '0x0000000000000000000000000000000000000000';
  if (isTokenANative && !isTokenBNative) {
    return [tokenA, tokenB];
  }
  if (!isTokenANative && isTokenBNative) {
    return [tokenB, tokenA];
  }

  // For non-native tokens, sort by address
  if (tokenA.address.toLowerCase() < tokenB.address.toLowerCase()) {
    return [tokenA, tokenB];
  }
  return [tokenB, tokenA];
};