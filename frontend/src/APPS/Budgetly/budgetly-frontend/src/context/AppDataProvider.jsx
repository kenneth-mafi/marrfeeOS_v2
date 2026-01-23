import { useEffect, useState } from "react";
import { AppDataContext } from "./contexts";

/**
 * AppDataProvider
 *
 * Root data provider responsible for owning all shared application state.
 * Handles:
 * - Centralized state ownership
 * - Persistence to localStorage
 * - Rehydration on app startup
 *
 * Domain-specific providers (Transactions, Cash, Portfolio, etc.)
 * consume and manipulate this state but do NOT own it.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Wrapped application tree
 * @returns {JSX.Element}
 */
function AppDataProvider({ children }) {

  /** LocalStorage key for persisted app data */
  const STORAGE_KEY = "APP_DATA_V1";

  /**
   * Loads persisted state from localStorage.
   *
   * @returns {Object|null} Parsed stored data or null if not found
   */
  const loadFromStorage = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;

      const parsed = JSON.parse(raw);

      // Rehydrate Date object
      if (parsed.today) {
        parsed.today = new Date(parsed.today);
      }

      return parsed;
    } catch {
      return null;
    }
  };

  /**
   * Initial state source
   * - Uses persisted data if available
   * - Falls back to defaults otherwise
   */
  const persisted = loadFromStorage() || {};

  // ===================== STATE =====================

  const [transactions, setTransactions] = useState(persisted.transactions || []);

  const [savings, setSavings] = useState(persisted.savings || []);
  const [goal, setGoal] = useState(persisted.goal || {});
  const [hasSavingsGoal, setHasSavingsGoal] = useState(persisted.hasSavingsGoal || false);

  const [portfolioData, setPortfolioData] = useState(persisted.portfolioData || {});
  const [initialPortfolio, setInitialPortfolio] = useState(persisted.initialPortfolio || {});

  const [notification, setNotification] = useState(persisted.notification || null);
  const [today, setToday] = useState(persisted.today || new Date());

  const [csvData, setCsvData] = useState(persisted.csvData || []);

  const [initialCashBalance, setInitialCashBalance] = useState(
    persisted.initialCashBalance || 0
  );
  const [cashBalance, setCashBalace] = useState(persisted.cashBalance || 0);

  const [budgets, setBudgets] = useState(persisted.budgets || []);

  // ===================== PERSISTENCE =====================

  /**
   * Persists the entire app state to localStorage
   * whenever any owned value changes.
   *
   * @returns {void}
   */
  useEffect(() => {
    const dataToPersist = {
      transactions,
      savings,
      goal,
      hasSavingsGoal,
      portfolioData,
      initialPortfolio,
      notification,
      today,
      csvData,
      initialCashBalance,
      cashBalance,
      budgets
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToPersist));
    } catch {
      // Storage failure (quota, private mode, etc.)
    }
  }, [
    transactions,
    savings,
    goal,
    hasSavingsGoal,
    portfolioData,
    initialPortfolio,
    notification,
    today,
    csvData,
    initialCashBalance,
    cashBalance,
    budgets
  ]);

  // ===================== PROVIDER =====================

  return (
    <AppDataContext.Provider
      value={{
        transactions,
        setTransactions,
        savings,
        setSavings,
        goal,
        setGoal,
        hasSavingsGoal,
        setHasSavingsGoal,
        portfolioData,
        setPortfolioData,
        initialPortfolio,
        setInitialPortfolio,
        notification,
        setNotification,
        today,
        setToday,
        csvData,
        setCsvData,
        initialCashBalance,
        setInitialCashBalance,
        cashBalance,
        setCashBalace,
        budgets,
        setBudgets
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
}

export default AppDataProvider;
