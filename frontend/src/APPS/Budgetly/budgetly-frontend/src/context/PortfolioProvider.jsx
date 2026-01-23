import { useState } from "react";
import { PortfolioContext } from "./contexts";
import MarketCard from "../components/cards/MarketCard";
import { useAppData } from "../hooks/useContexts";

/**
 * PortfolioProvider
 *
 * Global provider responsible for managing crypto portfolio state,
 * including initial purchase data, live valuation, and performance metrics.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components wrapped by the provider
 * @returns {JSX.Element} Portfolio context provider
 */
export function PortfolioProvider({ children }) {

  /**
   * @state portfolioData
   * @description
   * Stores the CURRENT holdings of the portfolio.
   *
   * Structure:
   * {
   *   [coinName]: {
   *     units: number,
   *     cost: number
   *   }
   * }
   */
  const {portfolioData, setPortfolioData} = useAppData();

  /**
   * @state initialPortfolio
   * @description
   * Stores the ORIGINAL purchase data of each coin.
   * Used as a static baseline for value and percent change calculations.
   *
   * Structure:
   * {
   *   [coinName]: {
   *     units: number,
   *     cost: number
   *   }
   * }
   */
  const {initialPortfolio, setInitialPortfolio} = useAppData();


  // ================= INITIALIZATION =================

  /**
   * Initializes the portfolio with pre-existing data.
   * Used during app setup (e.g. InitCryptoPage).
   *
   * @param {Object} data - Portfolio object keyed by coin name
   * @returns {void}
   */
  const initializePortfolio = (data = {}) => {
    if (Object.keys(data).length === 0) return;

    setPortfolioData(data);
    setInitialPortfolio(data);
  };


  /**
   * Accumulates units and cost for a coin entry.
   *
   * @param {Object} prev
   * @param {string} coinName
   * @param {number} units
   * @param {number} cost
   * @returns {Object}
   */
  const accumulateCoin = (prev, coinName, units, cost) => {
    const existing = prev[coinName];

    return {
      ...prev,
      [coinName]: {
        units: (existing?.units || 0) + units,
        cost: (existing?.cost || 0) + cost
      }
    };
  };


  // ================= ADD / UPDATE =================

  /**
   * Adds or updates a coin in the portfolio.
   * Also ensures the initial purchase data is preserved.
   *
   * @param {Object} entry
   * @param {string} entry.coinName - Coin identifier (e.g. "bitcoin")
   * @param {number} entry.units - Amount of coin owned
   * @param {number} entry.cost - Total invested cost
   * @returns {void}
   */
  const addToPortfolio = ({ coinName, units, cost }) => {

    // Update current portfolio values
    setPortfolioData(prev => 
      accumulateCoin(prev, coinName, units, cost)
    );

    // Preserve initial purchase values (do not overwrite)
    setInitialPortfolio(prev => 
      accumulateCoin(prev, coinName, units, cost)
    );
  };


  // ================= VALUE CALCULATIONS =================

  /**
   * Calculates the current market value of a coin.
   *
   * @param {string} coinName - Coin identifier
   * @param {Array<Object>} marketData - Live market data array
   * @returns {number} Current value of the holding
   */
  const getCoinCurrentValue = (coinName, marketData) => {
    const holding = portfolioData[coinName];
    if (!holding || !marketData?.length) return 0;

    const marketCoin = marketData.find(
      m => m.name.toLowerCase() === coinName.toLowerCase()
    );

    return marketCoin ? marketCoin.price * holding.units : 0;
  };


  /**
   * Calculates the absolute value change since purchase.
   *
   * @param {string} coinName - Coin identifier
   * @param {Array<Object>} marketData - Live market data
   * @returns {number} Value difference from initial cost
   */
  const getCoinValueChange = (coinName, marketData) => {
    const initial = initialPortfolio[coinName];
    if (!initial) return 0;

    return getCoinCurrentValue(coinName, marketData) - initial.cost;
  };


  /**
   * Calculates percentage change since initial purchase.
   *
   * @param {string} coinName - Coin identifier
   * @param {Array<Object>} marketData - Live market data
   * @returns {number} Percentage gain or loss
   */
  const getCoinPercentChange = (coinName, marketData) => {
    const initial = getCoinInitialValue(coinName);

    return (getCoinValueChange(coinName, marketData) / initial.cost) * 100;
  };

  /**
   * Calculates coin initial value
   * @param {string} coinName - coin identifier
   * @returns {number} coin initial value
   */
  const getCoinInitialValue = (coinName) => {
    const initial = initialPortfolio[coinName];
    return (initial || initial.cost !== 0) ? initial : 0;
  }


  /**
   * Calculates units bought relative to amount paid
   *
   * @param {Object} marketData
   * @param {string} coinName
   * @param {number} amount
   * @returns {number}
   */
  const calculateCoinUnits = (coinName, amount, marketData) => {

    const currentValue = marketData.find(
      m => m.name.toLowerCase() === coinName.toLowerCase()
    );

    if (!currentValue) return 0;
    
    return Number(amount) / currentValue.price;
  };


  // ================= PORTFOLIO TOTALS =================

  /**
   * Calculates total current portfolio value.
   *
   * @param {Array<Object>} marketData - Live market data
   * @returns {number} Total portfolio value
   */
  const getPortfolioValue = (marketData) => {
    return Object.keys(portfolioData).reduce((total, coinName) => {
      return total + getCoinCurrentValue(coinName, marketData);
    }, 0);
  };


  /**
   * Calculates total portfolio value change.
   *
   * @param {Array<Object>} marketData - Live market data
   * @returns {number} Net profit or loss
   */
  const getPortfolioValueChange = (marketData) => {
    const current = getPortfolioValue(marketData);

    const initial = getInitialPortfolioValue();

    return current - initial;
  };

  /**
   * Calculates total initial portfolio balance
   * 
   * @param {Array<Object>} marketData - Live market data
   * @returns {number} initial balance
   */
  const getInitialPortfolioValue = () => {
    return Object.values(initialPortfolio).reduce(
      (sum, c) => sum + c.cost,
      0
    );
  }


  /**
   * Calculates total portfolio percent change.
   *
   * @param {Array<Object>} marketData - Live market data
   * @returns {number} Portfolio percentage gain/loss
   */
  const getPortfolioPercentChange = (marketData) => {
    const initial = Object.values(initialPortfolio).reduce(
      (sum, c) => sum + c.cost,
      0
    );

    if (initial === 0) return 0;

    return (getPortfolioValueChange(marketData) / initial) * 100;
  };


  // ================= UI MAPPING =================

  /**
   * Maps portfolio holdings into renderable MarketCard configs.
   *
   * @param {Array<Object>} marketData - Live market data
   * @returns {Array<Object>} Render-ready portfolio items
   */
  const getPortfolioItems = (marketData) => {

    const portfolioItems = Object.entries(portfolioData)
      .map(([coinName, holding]) => {

        const marketCoin = marketData.find(c => c.name === coinName);
        if (!marketCoin) return null;

        return {
          Component: MarketCard,
          props: {
            icon: marketCoin.props.icon,
            alt: coinName,
            nameShort: marketCoin.symbol,
            nameFull: coinName,

            price: getCoinCurrentValue(coinName, marketData).toLocaleString(
              "en-US",
              { minimumFractionDigits: 2, maximumFractionDigits: 2 }
            ),

            percentChange: getCoinPercentChange(coinName, marketData).toFixed(2),
            sign: getCoinPercentChange(coinName, marketData) >= 0 ? "+" : "",
            color:
              getCoinPercentChange(coinName, marketData) >= 0
                ? "#059c05ff"
                : "#ff0000",

            units: holding.units.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 6
            }),
            invested: holding.cost
          }
        };
      })
      .filter(Boolean);

    return portfolioItems;
  };


  // ================= PROVIDER =================

  return (
    <PortfolioContext.Provider
      value={{
        initializePortfolio,
        addToPortfolio,
        getCoinCurrentValue,
        getCoinValueChange,
        getCoinPercentChange,
        getPortfolioValue,
        getPortfolioValueChange,
        getPortfolioPercentChange,
        getPortfolioItems,
        calculateCoinUnits,
        getInitialPortfolioValue,
        getCoinInitialValue
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}
