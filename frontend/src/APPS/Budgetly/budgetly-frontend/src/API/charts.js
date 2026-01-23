/**
 * ============================================================
 * Chart.js Global Registration
 * ------------------------------------------------------------
 * Registers all Chart.js components globally so that
 * charts can be rendered anywhere in the application
 * without repeated setup.
 * ============================================================
 */

import { Chart, registerables } from "chart.js";

Chart.register(...registerables);


/**
 * ============================================================
 * buildMonthlyChartData
 * ------------------------------------------------------------
 * Groups transaction amounts by month for the current year.
 *
 * This utility is used to prepare chart-ready data structures
 * for:
 * - Income charts
 * - Expense charts
 * - Combined comparisons
 *
 * Output format is compatible with BarChart and
 * ComparisonChart components.
 * ============================================================
 *
 * @param {Array<Object>} transactions
 * A list of transaction objects.
 *
 * Each transaction object is expected to have:
 * @property {string} date   - ISO date string (YYYY-MM-DD or full ISO)
 * @property {number} amount - Transaction amount (positive or negative)
 *
 * @returns {Object} Monthly chart data
 * @returns {string[]} returns.labels
 * An array of month labels (Jan → Dec)
 *
 * @returns {number[]} returns.values
 * An array of aggregated transaction totals per month
 */
export function buildMonthlyChartData(transactions) {

  /**
   * ------------------------------------------------------------
   * Month Labels (Static)
   * ------------------------------------------------------------
   */
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];


  /**
   * ------------------------------------------------------------
   * Initialize Monthly Values
   * ------------------------------------------------------------
   * Creates an array of 12 zeros, one for each month
   */
  const values = new Array(12).fill(0);


  /**
   * ------------------------------------------------------------
   * Current Year Filter
   * ------------------------------------------------------------
   * Ensures only transactions from the current year
   * are included in the aggregation
   */
  const currentYear = new Date().getFullYear();


  /**
   * ------------------------------------------------------------
   * Aggregate Transactions
   * ------------------------------------------------------------
   * - Parses transaction date
   * - Ignores transactions from other years
   * - Adds amounts to the corresponding month index
   */
  transactions.forEach(tx => {
    const date = new Date(tx.date);

    if (date.getFullYear() !== currentYear) return;

    const monthIndex = date.getMonth();
    values[monthIndex] += Number(tx.amount) || 0;
  });


  /**
   * ------------------------------------------------------------
   * Return Chart-Compatible Data Structure
   * ------------------------------------------------------------
   */
  return {
    labels: months,
    values: values
  };
}
