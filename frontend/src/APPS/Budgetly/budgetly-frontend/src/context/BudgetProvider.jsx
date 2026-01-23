
import { BudgetContext } from "./contexts";
import { useAppData, useTransactions } from "../hooks/useContexts";

/**
 * BudgetProvider
 *
 * Manages monthly category-based budgets and calculates
 * spending against those budgets using transaction data.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Components wrapped by this provider
 * @returns {JSX.Element} Budget context provider
 */
export function BudgetProvider({ children }) {

  /**
   * @state budgets
   * @description
   * List of all defined budgets.
   *
   * Structure:
   * [
   *   {
   *     category: string,
   *     amount: number,
   *     year: number,
   *     month: number
   *   }
   * ]
   */
  const {budgets, setBudgets} = useAppData();

  /**
   * @hook useTransactions
   * @description
   * Access to global transaction data for calculating expenses.
   */
  const { fetchTransactions } = useTransactions();


  // ================= BUDGET MUTATION =================

  /**
   * Adds a new budget entry.
   *
   * - Prevents duplicate budgets per category/month/year
   *
   * @param {Object} budget - Budget definition
   * @returns {void}
   */
  const addBudget = (budget) => {
    setBudgets(prev => {
      const exists = prev.find(
        b =>
          b.category === budget.category &&
          b.year === budget.year &&
          b.month === budget.month
      );

      if (exists) return prev; // prevent duplicate

      return [...prev, budget];
    });
  };


  // ================= BUDGET QUERIES =================

  /**
   * Returns all budgets.
   *
   * @returns {Array<Object>} All budget entries
   */
  const getBudgets = () => {
    return budgets;
  };


  /**
   * Retrieves budgets for a specific month.
   *
   * @param {number} year - Full year (e.g. 2025)
   * @param {number} month - Zero-based month index
   * @returns {Array<Object>} Monthly budgets
   */
  const getBudgetsByMonth = (year, month) => {
    let total = 0;
    if(budgets.length === 0) return 0;
    
    budgets.forEach((b) => {
      
      const bmonth = new Date(b.date).getMonth();
      const byear = new Date(b.date).getFullYear();

      if ( month === bmonth && year === byear ){ 
        total += Number(b.target)
        
      }
      
    })
    return total;
  }

  const getTotalSpentByMonth = (year, month) => {
      let total = 0;
      const expenses = fetchTransactions("expense");
      
      if(expenses.length === 0) return 0;
      
      expenses.forEach((exp) => {
        
        const exmonth = new Date(exp.date).getMonth();
        const exyear = new Date(exp.date).getFullYear();

        if ( month === exmonth && year === exyear ){ 
          total += Number(exp.amount)
        }
 
      })
      
      return total;
      
  }


  /**
   * Calculates total spent for a given budget category.
   *
   * - Pulls expense transactions from TransactionProvider
   * - Matches transactions against the budget category
   *
   * @param {string} category - Budget category name
   * @returns {number} Total amount spent
   */
  const getSpent = (category) => {
    const expenses = fetchTransactions("expense");

    const budgetCategory = budgets.find(
      b => b.category === category
    );

    if (!budgetCategory) return 0;

    let spent = 0;

    expenses.forEach(exp => {
      if (exp.category === budgetCategory.category && exp.month === budgetCategory.month) {
        spent += exp.amount;
      }
    });

    return spent;
  };

  


  // ================= PROVIDER =================

  return (
    <BudgetContext.Provider
      value={{
        addBudget,
        getBudgets,
        getSpent,
        getBudgetsByMonth,
        getTotalSpentByMonth
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
}
