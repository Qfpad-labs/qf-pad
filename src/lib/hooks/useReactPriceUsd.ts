import { useEffect, useState } from "react";

const QF_PRICE_API_ID = import.meta.env.VITE_QF_PRICE_API_ID?.trim();
const QF_PRICE_ENDPOINT = QF_PRICE_API_ID
  ? `https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(QF_PRICE_API_ID)}&vs_currencies=usd`
  : null;
const DEFAULT_REFRESH_INTERVAL_MS = 60_000;

interface UseReactPriceUsdOptions {
  refreshIntervalMs?: number;
}

type PriceResponse = Record<string, { usd?: number }>;

export function useReactPriceUsd(
  options: UseReactPriceUsdOptions = {},
): number | null {
  const { refreshIntervalMs = DEFAULT_REFRESH_INTERVAL_MS } = options;
  const [priceUsd, setPriceUsd] = useState<number | null>(null);

  useEffect(() => {
    if (!QF_PRICE_API_ID || !QF_PRICE_ENDPOINT) {
      setPriceUsd(null);
      return;
    }

    let cancelled = false;

    const fetchQfPrice = async () => {
      try {
        const response = await fetch(QF_PRICE_ENDPOINT);
        if (!response.ok) return;

        const data = (await response.json()) as PriceResponse;
        const nextPrice = data?.[QF_PRICE_API_ID]?.usd;

        if (
          !cancelled &&
          typeof nextPrice === "number" &&
          Number.isFinite(nextPrice)
        ) {
          setPriceUsd(nextPrice);
        }
      } catch (error) {
        console.error("Failed to fetch QF price:", error);
      }
    };

    fetchQfPrice();
    const intervalId = window.setInterval(fetchQfPrice, refreshIntervalMs);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, [refreshIntervalMs]);

  return priceUsd;
}
