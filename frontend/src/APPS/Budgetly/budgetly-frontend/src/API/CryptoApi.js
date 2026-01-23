/**
 * ============================================================
 * useCryptoPrices Hook
 * ------------------------------------------------------------
 * Fetches live cryptocurrency prices from the CoinGecko API
 * and transforms the response into UI-ready data structures
 * used by MarketCard components.
 *
 * Features:
 * - Auto-refresh every 30 seconds
 * - Supports configurable fiat currency
 * - Provides loading and error states
 * - Maps symbols to CoinGecko IDs and icons
 * ============================================================
 */

import { useEffect, useState } from "react";
import MarketCard from "../components/cards/MarketCard";

// ======================= ICON IMPORTS =======================

import btcIcon from "../assets/bitcoin.png";
import ethIcon from "../assets/ethereum.png";
import solIcon from "../assets/solana.png";
import adaIcon from "../assets/cardano.png";
import xrpIcon from "../assets/xrp.png";
import bnbIcon from "../assets/bnb.png";
import usdcIcon from "../assets/usdc.png";


// ======================= SYMBOL → ID MAP ====================
/**
 * Maps crypto ticker symbols to CoinGecko IDs
 * Used to build the API request and normalize data
 */
const COIN_SYMBOL_MAP = {
  BTC: "bitcoin",
  ETH: "ethereum",
  SOL: "solana",
  ADA: "cardano",
  XRP: "ripple",
  BNB: "binancecoin",
  USDC: "usd-coin"
};


// ======================= SYMBOL → ICON MAP ==================
/**
 * Maps crypto ticker symbols to local icon assets
 * Used by MarketCard UI components
 */
const COIN_ICON_MAP = {
  BTC: btcIcon,
  ETH: ethIcon,
  SOL: solIcon,
  ADA: adaIcon,
  XRP: xrpIcon,
  BNB: bnbIcon,
  USDC: usdcIcon
};


// ======================= MAIN HOOK ==========================
/**
 * useCryptoPrices
 * ------------------------------------------------------------
 * Fetches current crypto prices and 24h change data
 * from CoinGecko and formats it for UI consumption.
 *
 * @param {string} vsCurrency
 * Fiat currency used for price conversion.
 * Defaults to "usd".
 *
 * Supported examples:
 * - "usd"
 * - "sek"
 * - "eur"
 *
 * @returns {Object} Hook state
 * @returns {Array<Object>} returns.cryptoData
 * UI-ready crypto market items (MarketCard compatible)
 *
 * @returns {boolean} returns.loading
 * Indicates whether data is currently being fetched
 *
 * @returns {string|null} returns.error
 * Error message if fetching fails
 */
export function useCryptoPrices(vsCurrency = "usd") {

  // ======================= STATE ============================
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // ======================= EFFECT ===========================
  useEffect(() => {

    /**
     * --------------------------------------------------------
     * fetchCurrentPrices
     * --------------------------------------------------------
     * Fetches live price data from CoinGecko and transforms
     * the response into MarketCard-compatible objects.
     */
    async function fetchCurrentPrices() {
      try {

        // Build comma-separated list of CoinGecko IDs
        const ids = Object.values(COIN_SYMBOL_MAP).join(",");

        // Construct API endpoint
        const url =
          `https://api.coingecko.com/api/v3/simple/price` +
          `?ids=${ids}` +
          `&vs_currencies=${vsCurrency}` +
          `&include_24hr_change=true`;

        // Execute request
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch crypto data");

        const data = await res.json();
        const result = [];


        /**
         * ------------------------------------------------------
         * Transform API response into UI data
         * ------------------------------------------------------
         */
        for (const symbol in COIN_SYMBOL_MAP) {
          const id = COIN_SYMBOL_MAP[symbol];
          const entry = data[id];

          result.push({
            name: id,
            symbol: symbol,

            price: entry?.[vsCurrency] ?? 0,
            change24h: entry?.[`${vsCurrency}_24h_change`] ?? 0,

            Component: MarketCard,

            props: {
              icon: COIN_ICON_MAP[symbol],
              alt: id,
              nameShort: symbol.toString(),
              nameFull: id,

              price:
                entry?.[vsCurrency]?.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 6
                }) ?? 0,

              percentChange:
                entry?.[`${vsCurrency}_24h_change`]?.toFixed(2) ?? 0,

              sign:
                entry?.[`${vsCurrency}_24h_change`] >= 0 ? "+" : "",

              color:
                entry?.[`${vsCurrency}_24h_change`] >= 0
                  ? "#059c05ff"
                  : "#ff0000"
            }
          });
        }

        // Update state
        setCryptoData(result);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }


    // Initial fetch
    fetchCurrentPrices();

    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchCurrentPrices, 60_000);

    // Cleanup on unmount
    return () => clearInterval(interval);

  }, [vsCurrency]);


  // ======================= RETURN ===========================
  return {
    cryptoData,
    loading,
    error
  };
}
