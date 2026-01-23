import { CashContext } from "./contexts";
import { useAppData, useCSVImport, useTransactions } from "../hooks/useContexts";

/**
 * CashProvider
 *
 * Manages available liquid cash balance.
 * Acts as the base account used by:
 * - Expenses
 * - Savings transfers
 * - Withdrawals
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Components wrapped by this provider
 * @returns {JSX.Element} Cash context provider
 */
export function CashProvider({ children }) {

  /**
   * @state initialCashBalance
   * @description
   * Stores the user's CURRENT cash balance.
   * Used as a static baseline for value and percent change calculations.
   *
   * default value: 0
   */
  const {initialCashBalance, setInitialCashBalance} = useAppData();

  /**
   * @state cashBalance
   * @description
   * Current available cash balance.
   */
  const {cashBalance, setCashBalace} = useAppData();

  // ================= INITIALIZATION =================

  /**
   * Initializes the cash balance with pre-existing data.
   * Used during app setup (e.g. initCashPage).
   *
   * @param {number} amount - Amount to add
   * @returns {void}
   */
  const initializeCashBalance = (amount = 0) => {
    const intAmount = Number(amount); 

    if (intAmount <= 0) return;

    setInitialCashBalance(initialCashBalance + amount);
    setCashBalace(initialCashBalance);
  };

  // ================= CASH MUTATION =================

  /**
   * Adds cash to the balance.
   *
   * @param {number} amount - Amount to add
   * @returns {null|void} Returns null if invalid
   */
  const addCash = (amount) => {
    if (amount <= 0) return null;
    setCashBalace(cashBalance + amount);
  };


  /**
   * Subtracts cash from the balance.
   *
   * - Prevents negative balances
   *
   * @param {number} amount - Amount to subtract
   * @returns {null|void} Returns null if insufficient funds
   */
  const subtractCash = (amount) => {
    if (cashBalance - amount < 0) return null;
    setCashBalace(cashBalance - amount);
  };


  // ================= CASH QUERIES =================

  /**
   * Retrieves current cash balance.
   *
   * @returns {number} Available cash balance
   */
  const getCashBalance = () => {
    return cashBalance;
  };

  // ============== VALUE CALCULATIONS ================
  /**
   * Calculates the absolute cash value change since initialization.
   *
   * @returns {number} Value difference from initial cash
   */
  const getCashValueChange = () => {
    return cashBalance - initialCashBalance;
  };

  /**
   * Calculates percentage change since app initialization.
   * @returns {number} Percentage gain or loss
   */

  const getCashPercentChange = () => {
    const difference = getCashValueChange();

    return (difference !== 0) ? ((difference / initialCashBalance) * 100) : 0;
  };

  // ================= PROVIDER =================

  return (
    <CashContext.Provider
      value={{
        addCash,
        subtractCash,
        getCashBalance,
        initializeCashBalance,
        getCashValueChange,
        getCashPercentChange
      }}
    >
      {children}
    </CashContext.Provider>
  );
}
