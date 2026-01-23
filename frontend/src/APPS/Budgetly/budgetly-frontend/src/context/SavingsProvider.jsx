import { useState } from "react";
import { useAppData, useCash, useTransactions } from "../hooks/useContexts";
import { SavingsContext } from "./contexts";
import { generateId } from "../utils/utils";

/**
 * SavingsProvider
 *
 * Global provider responsible for managing savings entries,
 * savings goals, and progress tracking.
 *
 * Integrates with:
 * - CashProvider (to add/subtract cash)
 * - TransactionProvider (to log savings activity)
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components wrapped by the provider
 * @returns {JSX.Element} Savings context provider
 */
export function SavingsProvider({ children }) {

  /**
   * @state savings
   * @description
   * List of all savings entries.
   *
   * Structure:
   * [
   *   {
   *     id: string,
   *     amount: number,
   *     date: string,
   *     group: "expense"
   *   }
   * ]
   */
  const {savings, setSavings} = useAppData();

  /**
   * @state goal
   * @description
   * Stores the active savings goal.
   *
   * Structure:
   * {
   *   amount: number,
   *   label?: string,
   *   date?: string
   * }
   */
  const {goal, setGoal} = useAppData();

  /**
   * @state hasSavingsGoal
   * @description
   * Indicates whether a savings goal has been set.
   */
  const [hasSavingsGoal, setHasSavingsGoal] = useState(false);


  // ================= CONTEXT DEPENDENCIES =================

  /**
   * Cash context helpers
   */
  const { subtractCash, addCash, getCashBalance } = useCash();

  /**
   * Transaction logging helper
   */
  const { addTransaction } = useTransactions();


  // ================= SAVINGS ACTIONS =================

  /**
   * Adds a new savings entry.
   *
   * - Validates available cash
   * - Deducts cash balance
   * - Stores savings entry
   * - Logs transaction as expense
   *
   * @param {Object} entry
   * @param {number} entry.amount - Amount to save
   * @param {string} [entry.date] - Optional ISO date
   * @returns {void}
   */
  const addSavings = (entry) => {
    const cash = getCashBalance();
    if (entry.amount > cash) return;

    const newId = generateId();
    const newDate = entry.date || new Date().toISOString().slice(0, 10);

    subtractCash(entry.amount);

    setSavings(prev => [
      ...prev,
      {
        ...entry,
        id: newId,
        group: "expense",
        date: newDate
      }
    ]);

    addTransaction({
      ...entry,
      category: "savings",
      label: "Savings",
      group: "expense"
    });
  };


  /**
   * Withdraws money from savings.
   *
   * - Adds cash back to balance
   * - Records a negative savings entry
   *
   * @param {number} amount - Amount to withdraw
   * @returns {void}
   */
  const withdrawSavings = (amount) => {
    addCash(amount);

    setSavings(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        amount: -amount,
        date: new Date().toISOString()
      }
    ]);
  };


  // ================= DERIVED VALUES =================

  /**
   * Calculates total saved amount.
   *
   * @returns {number} Sum of all savings entries
   */
  const getSavingsTotal = () =>
    savings.reduce((sum, s) => sum + s.amount, 0);


  /**
   * Returns full savings list.
   *
   * @returns {Array<Object>} Savings entries
   */
  const getSavingsList = () => {
    return savings;
  };


  // ================= GOALS =================

  /**
   * Sets a new savings goal.
   *
   * @param {Object} entry - Goal definition
   * @returns {void}
   */
  const setSavingsGoal = (entry) => {
    setGoal({ ...entry });
    setHasSavingsGoal(true);
  };


  /**
   * Calculates progress toward the savings goal.
   *
   * @returns {number|undefined} Percentage completion of goal
   */
  const getSavingsProgress = () => {
    const saveGoal = goal.amount;
    if (!saveGoal) return;
    if (saveGoal === 0) return 0;

    return (getSavingsTotal() / saveGoal) * 100;
  };


  // ================= PROVIDER =================

  return (
    <SavingsContext.Provider
      value={{
        addSavings,
        withdrawSavings,
        getSavingsTotal,
        setSavingsGoal,
        getSavingsProgress,
        getSavingsList,
        hasSavingsGoal,
        goal
      }}
    >
      {children}
    </SavingsContext.Provider>
  );
}
