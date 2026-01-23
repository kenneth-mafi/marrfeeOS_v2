import { CSVImportContext } from "./contexts";
import { generateId } from "../utils/utils";
import { useAppData, useTransactions } from "../hooks/useContexts";
import { useEffect } from "react";


/**
 * CsvImportProvider
 *
 * Centralized CSV import logic.
 * Handles reading CSV files, parsing rows, and storing results.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Wrapped application components
 */
export function CsvImportProvider({ children }) {
  /**
   * Supported transaction categories
   */
  const CATEGORIES = {
    GROCERIES: "Groceries",
    FOOD: "Food & Dining",
    UTILITIES: "Utilities",
    SUBSCRIPTIONS: "Subscriptions",
    HOUSING: "Housing",
    TRANSFER: "Transfers",
    INCOME: "Income",
    SAVINGS: "Savings",
    TRANSPORT: "travel",
    INSURANCE: "insurance",
    HEALTH: "health",
    ENTERTAINMENT: "entertainment",
    DEBT: "debt",
    DONATION: "Donations",
    SHOPPING: "Shopping",
    OTHER: "Uncategorized"
  };

  /**
   * Categorizes a bank transaction using description + amount.
   * Designed to be conservative (avoid wrong categories).
   *
   * @param {string} description - Raw bank description
   * @param {number} amount - Transaction amount (positive or negative)
   * @returns {string} Category name
   */
  const categorizeTransaction = (description = "", amount = 0) => {
    const text = description.toLowerCase();

    /* =========================
      INCOME
      ========================= */
    if (amount > 0) {
      if (/arbetsformed|dagersattning|lon|salary/i.test(text)) {
        return CATEGORIES.INCOME.toLowerCase();
      }

      if (/sparranta|egen overforing|ranta/i.test(text)) {
        return CATEGORIES.SAVINGS.toLowerCase();
      }

      if (/overforing|transfer/i.test(text)) {
        return CATEGORIES.TRANSFER.toLowerCase();
      }

      return CATEGORIES.INCOME.toLowerCase();
    }

    /* =========================
      EXPENSES
      ========================= */

    // Groceries
    if (/willys|ica|maxi|coop/i.test(text)) {
      return CATEGORIES.GROCERIES.toLowerCase();
    }

    // Food & dining
    if (/cafe|thai|maxi grill|restaurang|matessen|express/i.test(text)) {
      return CATEGORIES.FOOD.toLowerCase();
    }

    // Transport
    if (/skanetrafiken|uber|bolt|taxi/i.test(text)) {
      return CATEGORIES.TRANSPORT.toLowerCase();
    }

    // Utilities
    if (/elb|kraft|elbola|comviq|tele/i.test(text)) {
      return CATEGORIES.UTILITIES.toLowerCase();
    }

    // Housing
    if (/hyra|hus|rent/i.test(text)) {
      return CATEGORIES.HOUSING.toLowerCase();
    }

    // Donations
    if (/forsamling|donation/i.test(text)) {
      return CATEGORIES.DONATION.toLowerCase();
    }

    // Subscriptions
    if (/comviq|netflix|spotify|amazon/i.test(text)) {
      return CATEGORIES.SUBSCRIPTIONS.toLowerCase();
    }

    // Transfers
    if (/swish|transfergo|overforing/i.test(text)) {
      return CATEGORIES.TRANSFER.toLowerCase();
    }

    // Shopping
    if (/amazon|direkten|noje/i.test(text)) {
      return CATEGORIES.SHOPPING.toLowerCase();
    }

    /* =========================
      FALLBACK
      ========================= */
    return CATEGORIES.OTHER.toLowerCase();
  }



  const {transactions, setTransactions, setInitialCashBalance, setCashBalace} = useAppData();
  const existing = transactions;

  // Initialize transactions with csv data
  useEffect(() => {
    const init = async () => {
      const all = await importCsvFile(
        "/import/Transaktioner_2026-01-01_02-09-49.csv",
        existing
      );
      
      
      if (!all.length) return; 
    
      const latestBalance = Number(all[0].balance);

      if (Number.isNaN(latestBalance)) return;

      setInitialCashBalance(latestBalance);
      setCashBalace(latestBalance);
      setTransactions(all);
    };

    init();
  }, [transactions]);

  

  /**
   * Reads and parses a CSV file.
   *
   * @param {File} filePath - CSV file selected by the user
   * @returns {Promise<Array<Object>>} Parsed CSV rows
   */
  const importCsvFile = async (filePath, existing=[]) => {
    
    if (!filePath) return;

    try {
      const initialTransactions = [];

      const res = await fetch(filePath);
      const text = await res.text();
      const rows = parseCsv(text);
      

      rows.forEach(row => {
        const transac = normalizeTransaction(row);

        if (isDuplicate(transac, existing)) return;

        initialTransactions.push(transac)
        
      })
      
      return initialTransactions;
    } catch (err) {
      return existing;
    }
  };

  /**
   * Parses raw CSV text into structured objects.
   * Assumes first row contains column headers.
   *
   * @param {string} text - Raw CSV content
   * @returns {Array<Object>} Parsed row objects
   */
  const parseCsv = (text) => {
    const lines = text.trim().split("\n");
    if (lines.length < 2) return [];

    const headers = lines[0].split(",").map(h => h.trim());

    return lines.slice(1).map(line => {
      const values = line.split(",").map(v => v.trim());

      return headers.reduce((row, header, index) => {
        row[header] = values[index];
        return row;
      }, {});
    });
  };

    /**
     * Converts raw bank CSV row into app transaction
     */
    const normalizeTransaction = (row) => {
      
        const amount = Number(row.amount);
        const balance = Number(row.balance)
        const category = categorizeTransaction(row.description, amount);
        const label = row.description;
        
        
        return {
            id: row.id,
            category: category,
            label: label,
            amount: Math.abs(amount),
            date: row.date,
            group: amount >= 0 ? "income" : "expense",
            balance: balance,

        };
    }
    
    const isDuplicate = (tx, existing) => {
        return existing.some(e =>
            e.date === tx.date &&
            e.amount === tx.amount &&
            e.label === tx.label
        );
    }

  return (
    <CSVImportContext.Provider
      value={{
        importCsvFile,
        isDuplicate,
        normalizeTransaction
      }}
    >
      {children}
    </CSVImportContext.Provider>
  );
}


export default CsvImportProvider;