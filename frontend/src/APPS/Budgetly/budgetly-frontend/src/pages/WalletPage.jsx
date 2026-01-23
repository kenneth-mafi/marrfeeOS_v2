import BalanceCard from "../components/cards/BalanceCard";
import MainHeader from "../components/header/Header";
import MainPageFrame from "./mainPageFrame/MainPageFrame";

import appLogo from "../assets/app-logo.png";
import cashIcon from "../assets/money.png";
import investmentIcon from "../assets/investment.png";
import savingsIcon from "../assets/piggy-bank.png";
import placeholderImg from "../assets/placeholder.png";

import { Label } from "../components/label/Label";
import ProgressCard from "../components/cards/ProgressCard";
import { WideButton } from "../components/buttons/WideButton";
import { ColumnGrid } from "../components/grids/Grids";

import { useNavigate } from "react-router-dom";
import {
  useBudget,
  useCash,
  usePortfolio,
  useSavings
} from "../hooks/useContexts";

import { useCryptoPrices } from "../API/CryptoApi";

/**
 * WalletPage
 *
 * Main dashboard page displaying a high-level financial overview.
 * Sections include:
 * - Budgets
 * - Cash balance
 * - Crypto investments
 * - Savings
 *
 * The page is composed using a configuration-driven layout
 * rendered by `MainPageFrame`.
 *
 * @returns {JSX.Element}
 */
function WalletPage() {

  /* =============================
     CASH
     ============================= */
  const { getCashBalance, getCashPercentChange } = useCash();
  const cashBalance = getCashBalance();
  const cashPercentChange = getCashPercentChange();

  /* =============================
     CRYPTO / PORTFOLIO
     ============================= */
  const { cryptoData } = useCryptoPrices();

  const {
    getPortfolioValue,
    getPortfolioPercentChange
  } = usePortfolio();

  const portfolioValue = getPortfolioValue(cryptoData);
  const portfolioPercentChange = getPortfolioPercentChange(cryptoData);

  /* =============================
     SAVINGS
     ============================= */
  const { getSavingsTotal } = useSavings();
  const savings = getSavingsTotal();

  /* =============================
     BUDGETS
     ============================= */
  const { getBudgets } = useBudget();
  const budgets = getBudgets();

  // Show only the first budget on the wallet overview
  const items = budgets.slice(0, 1);

  /* =============================
     NAVIGATION
     ============================= */
  const navigate = useNavigate();

  /* =============================
     PLACEHOLDER CONFIG
     (shown when no budgets exist)
     ============================= */
  const placeholder = {
    icon: placeholderImg,
    message: "No budgets to show",
    Button: WideButton,
    buttonProps: {
      text: "New budget",
      onClick: () => {
        navigate("/financeApp/addBudgetPage");
      }
    }
  };

  /* =============================
     BUDGET SECTION LABEL
     ============================= */
  const label = {
    Component: Label,
    props: {
      title: "Budget",
      link: "Show more",
      to: "/financeApp/budgetPage"
    }
  };

  /* =============================
     PAGE COMPONENT CONFIGURATION
     ============================= */
  const walletPageComponents = [

    // HEADER ====================
    {
      Component: MainHeader,
      props: {}
    },

    // BUDGET OVERVIEW CARD =======
    {
      Component: ColumnGrid,
      props: {
        items: items,
        to: "/financeApp/budgetPage",
        limit: 2,
        label: label,
        placeholder: placeholder,
        NewComponent: ProgressCard,
        currency: "kr"
      }
    },

    // CASH LABEL =================
    {
      Component: Label,
      props: {
        title: "Cash",
        link: "Show detals",
        to: "/financeApp/cashOverview"
      }
    },

    // CASH BALANCE CARD ==========
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

    // INVESTMENTS LABEL ==========
    {
      Component: Label,
      props: {
        title: "Investments",
        link: "Show details",
        to: "/financeApp/cryptoPortfolio"
      }
    },

    // PORTFOLIO BALANCE CARD =====
    {
      Component: BalanceCard,
      props: {
        logo: appLogo,
        alt: "logo",
        title: "Portfolio balance",
        growth: `${portfolioPercentChange.toFixed(2)}`,
        percent: true,
        balance: portfolioValue.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }),
        icon: investmentIcon,
        iconAlt: "icon",
        to: "/financeApp/cryptoPortfolio",
        currency: "$"
      }
    },

    // SAVINGS LABEL ==============
    {
      Component: Label,
      props: {
        title: "Savings",
        link: "Show details",
        to: "savingsPage"
      }
    },

    // SAVINGS BALANCE CARD =======
    {
      Component: BalanceCard,
      props: {
        logo: appLogo,
        alt: "logo",
        title: "Savings balance",
        growth: "0.00",
        currency: "kr",
        balance: savings.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }),
        icon: savingsIcon,
        iconAlt: "icon",
        to: "/financeApp/savingsPage"
      }
    }
  ];

  /* =============================
     RENDER
     ============================= */
  return (
    <MainPageFrame components={walletPageComponents} />
  );
}

export default WalletPage;
