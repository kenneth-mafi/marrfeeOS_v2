import placeholderImg from "../assets/placeholder.png";
import BalanceCard from "../components/cards/BalanceCard";
import SubHeader from "../components/header/Header2";
import appLogo from "../assets/app-logo.png";
import savingsIcon from "../assets/piggy-bank.png";

import { Label } from "../components/label/Label";
import ProgressCard from "../components/cards/ProgressCard";
import { WideButton } from "../components/buttons/WideButton";
import { ColumnGrid } from "../components/grids/Grids";
import TransactionCard from "../components/cards/TransactionCard";

import MainPageFrame from "./mainPageFrame/MainPageFrame";
import { useSavings } from "../hooks/useContexts";
import { useNavigate } from "react-router-dom";
import { getSavingsProgressMessage } from "../utils/utils";

/**
 * SavingsPage
 *
 * Displays the user's savings overview including:
 * - Total savings balance
 * - Optional savings goal progress
 * - Savings transaction history
 *
 * @returns {JSX.Element}
 */
function SavingsPage() {

  /* =============================
     SAVINGS DATA
     ============================= */
  const {
    getSavingsTotal,
    getSavingsList,
    hasSavingsGoal,
    goal,
    getSavingsProgress
  } = useSavings();

  const savingsTotal = getSavingsTotal();
  const savingsList = getSavingsList();

  /* =============================
     MAP SAVINGS TO TRANSACTIONS
     ============================= */
  const savingsItems = savingsList.map(s => ({
    Component: TransactionCard,
    props: {
      label: s.label,
      date: s.date,
      group: "income",
      amount: s.amount,
      currency: "kr"
    }
  }));

  /* =============================
     NAVIGATION
     ============================= */
  const navigate = useNavigate();

  /* =============================
     PLACEHOLDER CONFIG
     ============================= */
  const placeholder = {
    icon: placeholderImg,
    message: "No savings yet",
    Button: WideButton,
    buttonProps: {
      text: "Start saving",
      onClick: () => {
        navigate("/financeApp/addSavingsPage");
      }
    }
  };

  /* =============================
     LABEL CONFIG
     ============================= */
  const label = {
    Component: Label,
    props: {
      title: "Savings History"
    }
  };

  /* =============================
     SAVINGS PROGRESS
     ============================= */
  const progressPercent = getSavingsProgress();
  const message = getSavingsProgressMessage(progressPercent);

  /* =============================
     PAGE COMPONENT CONFIG
     ============================= */
  const pageComponents = [

    // HEADER =====================
    {
      Component: SubHeader,
      props: {
        title: "Savings"
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
        balance: savingsTotal.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }),
        icon: savingsIcon,
        iconAlt: "icon"
      }
    },

    // ADD GOAL LINK ==============
    {
      Component: Label,
      props: {
        link: "➕ Add Savings Goal",
        to: "/financeApp/addSavingsGoalPage"
      }
    },

    // SAVINGS GOAL PROGRESS ======
    hasSavingsGoal && {
      Component: ProgressCard,
      props: {
        title: goal.label,
        spent: savingsTotal.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              }),
        target: goal.amount.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              }),
        type: "savings",
        currency: "kr",
        message: message
      }
    },

    // ADD SAVINGS LINK ===========
    savingsItems.length > 0 && {
      Component: Label,
      props: {
        link: "➕ Add Savings",
        to: "/financeApp/addSavingsPage"
      }
    },

    // SAVINGS HISTORY ============
    {
      Component: ColumnGrid,
      props: {
        items: savingsItems,
        label: label,
        placeholder: placeholder
      }
    }
  ];

  /* =============================
     RENDER
     ============================= */
  return (
    <MainPageFrame
      components={pageComponents}
      bottomNav={false}
      effect="slideInRight"
    />
  );
}

export default SavingsPage;
