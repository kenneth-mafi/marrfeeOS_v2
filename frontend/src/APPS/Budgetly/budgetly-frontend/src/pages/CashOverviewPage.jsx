import SubHeader from "../components/header/Header2";

import appLogo from '../assets/app-logo.png'
// import cashIcon from '../assets/money.png'
// import placeholderImg from '../assets/placeholder.png';
import BalanceCard from "../components/cards/BalanceCard";
import SubPageFrame from "./subPageFrame/SubPageFrame";
import { WideButton } from "../components/buttons/WideButton";
import { LinkProfileCard } from "../components/cards/LinkCard";
import BarChart from "../components/cards/BarChart";
import MultiFrame from "../components/multi-page/MultiFrame";
import { Label } from "../components/label/Label";
import { ColumnGrid } from "../components/grids/Grids";
import placeholderImg from '../assets/placeholder.png';
import MainPageFrame from "./mainPageFrame/MainPageFrame";
import { useCash, useTransactions } from "../hooks/useContexts";
import TransactionCard from "../components/cards/TransactionCard";
import { useNavigate } from "react-router-dom";
import { buildMonthlyChartData } from "../API/charts";
import ComparisonChart from "../components/cards/ComparisonChart";



function CashOverviewPage() {
    const navigate = useNavigate();
    const {getCashBalance} = useCash();
    const cashBalance = getCashBalance();

    const {fetchTransactions} = useTransactions();
    const transactions = fetchTransactions();
    const items = transactions.slice(0, 3);

    const income = fetchTransactions("income");
    const expense = fetchTransactions("expense");

    const incomeData = buildMonthlyChartData(income);
    const expenseData = buildMonthlyChartData(expense);

    const placeholder = {
      icon: placeholderImg,
      message: "No transactions yet",
    }

    const label = {
      Component: Label,
      props: {
          title: "Recent transactions",
          link: "View all"
      }
    }

    const tabs = [
      {
        id: "combined",
        label: "Combined",
        Component: ComparisonChart,
        props: {
          incomeData,
          expenseData
        }
      },
      {
        id: "income",
        label: "Income",
        Component: BarChart,
        props: {
          data: incomeData,
          label: "Income",
          color: "#543884"
        }
      },
      {
        id: "expense",
        label: "Expense",
        Component: BarChart,
        props: {
          data: expenseData,
          label: "Expense",
          color: "#e45f00"
        }
      }
    ];



    const onClick = () =>{
        navigate("/financeApp/addTransactionPage")
    }

    const pageComponents =  [

        // HEADER ========
        { 
            Component: SubHeader,
            props: {
              title: "Overview",
              alt: "Back"
            } 
        },    
        // BALANCE CARD ========
        {
          Component: LinkProfileCard,
          props: {
            mainText: cashBalance.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }),
            currency: "kr",
            caption: "cash balance",
            img: appLogo,
            alt: "icon"
          }
        },

        {
          Component: MultiFrame,
          props: {
            tabs: tabs
          }
        },

        // Add transaction
        {
          Component: WideButton,
          props: {
            text: "Add transaction",
            onClick: onClick
          }
        },

        // TRANSACTIONS GRID ========
        {
          Component: ColumnGrid,
          props: {
            items: items,
            label: label,
            to: '/financeApp/transactionsPage',
            limit: 3,
            placeholder: placeholder,
            NewComponent: TransactionCard
          }
        }


    ]

    return <MainPageFrame components={pageComponents}  bottomNav={false}  effect="slideInRight" />;

}

export default CashOverviewPage;