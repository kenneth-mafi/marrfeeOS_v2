import { useEffect } from "react";
import { TransactionContext } from "./contexts";
import { useAppData, useCSVImport } from "../hooks/useContexts";


/**
 * TransactionProvider
 *
 * Global provider responsible for storing and querying
 * all income and expense transactions across the app.
 *
 * Acts as the single source of truth for:
 * - Transaction history
 * - Monthly summaries
 * - Totals by category
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components wrapped by the provider
 * @returns {JSX.Element} Transaction context provider
 */
export function TransactionProvider({ children }) {

  /**
   * @state transactions
   * @description
   * List of all recorded transactions.
   *
   * Structure:
   * [
   *   {
   *     id: string,
   *     amount: number,
   *     date: string,
   *     group: "income" | "expense",
   *     category?: string,
   *     label?: string
   *   }
   * ]
   */
  const {transactions, setTransactions} = useAppData();

  // ================= TRANSACTION MUTATION =================

  /**
   * Adds a new transaction.
   *
   * - Prevents duplicate entries by `id`
   * - Inserts newest transactions at the top
   *
   * @param {Object} transaction - Transaction object
   * @returns {void}
   */
  const addTransaction = (transaction) => {
    
    setTransactions(prev => {
      const exists = prev.some(t => t.id === transaction.id);
      
      if (exists) return prev;

      return [transaction, ...prev];
    });
  };


  // ================= TRANSACTION QUERIES =================

  /**
   * Fetches transactions by group.
   *
   * @param {string} [group=""] - "income", "expense", or empty for all
   * @returns {Array<Object>} Filtered transactions
   */
  const fetchTransactions = (group = "") => {
    const incomes = transactions.filter(t => t.group === "income");
    const expenses = transactions.filter(t => t.group === "expense");

    if (group === "income") return incomes;
    if (group === "expense") return expenses;

    return transactions;
  };


  /**
   * Calculates total amount for a transaction group.
   *
   * @param {string} category - "income" or "expense"
   * @returns {number} Total amount
   */
  const getTotal = (category) => {
    let total = 0;

    const data = fetchTransactions(category);
    data.forEach(d => {
      total += d.amount;
    });

    return total;
  };


  /**
   * Retrieves all transactions for a specific month.
   *
   * @param {number} year - Full year (e.g. 2025)
   * @param {number} month - Zero-based month index (0 = January)
   * @returns {Array<Object>} Monthly transactions
   */
  const getTransactionsByMonth = (year, month) => {
    return transactions.filter(t => {
      const date = new Date(t.date);

      return (
        date.getFullYear() === year &&
        date.getMonth() === month
      );
    });
  };


  /**
   * Generates a monthly income/expense summary.
   *
   * @param {number} year - Full year
   * @param {number} month - Zero-based month index
   * @returns {Object} Monthly summary
   * @returns {number} returns.income - Total income for month
   * @returns {number} returns.expense - Total expense for month
   */
  const getMonthlySummary = (year, month) => {
    let income = 0;
    let expense = 0;

    getTransactionsByMonth(year, month).forEach(t => {
      if (t.group === "income") income += t.amount;
      if (t.group === "expense") expense += t.amount;
    });

    return { income, expense };
  };


  // ================= PROVIDER =================

  return (
    <TransactionContext.Provider
      value={{
        fetchTransactions,
        addTransaction,
        getTotal,
        getTransactionsByMonth,
        getMonthlySummary
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
