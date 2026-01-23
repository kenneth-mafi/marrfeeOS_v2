/**
 * ============================================================
 * DashboardPage
 * ------------------------------------------------------------
 * Main overview page displaying:
 * - Current cash balance
 * - Monthly income vs expense overview
 * - Recent transactions
 *
 * Data Sources:
 * - CashContext (balance + percent change)
 * - TransactionsContext (transactions + monthly summary)
 * - DateContext (current year/month)
 *
 * Layout Strategy:
 * - Page is composed via MainPageFrame
 * - Components are stacked declaratively
 * ============================================================
 */

// ======================= IMPORTS =============================

// Core UI Components
import BalanceCard from "../components/cards/BalanceCard";
import GridCard from "../components/cards/GridCard";
import TransactionCard from "../components/cards/TransactionCard";

import { ColumnGrid, RowGrid } from "../components/grids/Grids";
import MainHeader from "../components/header/Header";
import { Label } from "../components/label/Label";
import MainPageFrame from "./mainPageFrame/MainPageFrame";

// Assets
import appLogo from "../assets/app-logo.png";
import cashIcon from "../assets/money.png";
import placeholderImg from "../assets/placeholder.png";

// Hooks / Contexts
import { useCash, useDate, useTransactions } from "../hooks/useContexts";


// ==================== DASHBOARD PAGE =========================

function DashboardPage() {

  /**
   * ------------------------------------------------------------
   * Context Hooks
   * ------------------------------------------------------------
   * - Transactions: fetch list + monthly aggregates
   * - Cash: current balance + percent change
   * - Date: current year/month context
   */
  const { fetchTransactions, getMonthlySummary } = useTransactions();
  const { getCashBalance, getCashPercentChange } = useCash();
  const { year, month } = useDate();


  /**
   * ------------------------------------------------------------
   * Derived State
   * ------------------------------------------------------------
   * - All transactions
   * - Latest transactions (limited)
   * - Cash balance and growth
   */
  const transactions = fetchTransactions();
  const items = transactions.slice(0, 3);
  

  const cashBalance = getCashBalance();
  const cashPercentChange = getCashPercentChange();


  /**
   * ------------------------------------------------------------
   * Monthly Overview Calculations
   * ------------------------------------------------------------
   * - Income & expense for current month
   * - Human-readable month label
   */
  const { income, expense } = getMonthlySummary(year, month);
  const monthName = new Date().toLocaleString("default", {
    month: "short"
  });


  /**
   * ------------------------------------------------------------
   * UI Helpers
   * ------------------------------------------------------------
   * - Placeholder when no transactions exist
   * - Label config for transaction list
   */
  const placeholder = {
    icon: placeholderImg,
    message: "No transactions yet"
  };

  const label = {
    Component: Label,
    props: {
      title: "Transactions",
      link: "View all"
    }
  };


  /**
   * ============================================================
   * DASHBOARD COMPONENT STACK
   * ------------------------------------------------------------
   * Components are rendered in order via MainPageFrame.
   * Each entry defines:
   * - Component reference
   * - Props passed to that component
   * ============================================================
   */
  const dashboardComponents = [

    // ================= HEADER =================
    {
      Component: MainHeader,
      props: {}
    },

    // ================= CASH BALANCE CARD =================
    {
      Component: BalanceCard,
      props: {
        logo: appLogo,
        alt: "logo",
        title: "Cash balance",
        growth: cashPercentChange.toFixed(2),
        percent: true,
        balance: cashBalance.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }),
        currency: "kr",
        icon: cashIcon,
        iconAlt: "icon",
        to: "/financeApp/cashOverview"
      }
    },

    // ================= OVERVIEW LABEL =================
    {
      Component: Label,
      props: {
        title: "Overview"
      }
    },

    // ================= MONTHLY OVERVIEW GRID =================
    {
      Component: RowGrid,
      props: {
        items: [
          {
            id: "234",
            Component: GridCard,
            props: {
              icon: appLogo,
              alt: "icon",
              dateTag: monthName,
              tag: "Income",
              amount: income.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              }),
              currency: "kr",
              to: "/financeApp/cashOverview",
              color: "green"
            }
          },
          {
            id: "345",
            Component: GridCard,
            props: {
              icon: appLogo,
              alt: "icon",
              dateTag: monthName,
              tag: "Expense",
              amount: expense.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              }),
              currency: "kr",
              to: "/financeApp/cashOverview",
              color: "red"
            }
          }
        ]
      }
    },

    // ================= RECENT TRANSACTIONS =================
    {
      Component: ColumnGrid,
      props: {
        items: items,
        label: label,
        to: "/financeApp/transactionsPage",
        limit: 3,
        placeholder: placeholder,
        NewComponent: TransactionCard
      }
    }
  ];


  /**
   * ------------------------------------------------------------
   * Render
   * ------------------------------------------------------------
   */
  return <MainPageFrame components={dashboardComponents} />;
}

export default DashboardPage;
