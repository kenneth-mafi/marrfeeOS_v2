import { useNavigate } from "react-router-dom";
import MainPageFrame from "./mainPageFrame/MainPageFrame";
import placeholderImg from '../assets/placeholder.png';
import { Label } from "../components/label/Label";
import ProgressCard from "../components/cards/ProgressCard";
import { WideButton } from "../components/buttons/WideButton";
import { ColumnGrid } from "../components/grids/Grids";
import SubHeader from "../components/header/Header2";
import { useBudget } from "../hooks/useContexts";
import BalanceCard from "../components/cards/BalanceCard";
import appLogo from "../assets/app-logo.png";
import cashIcon from "../assets/money.png";

function BudgetPage() {
    const {getBudgets, getBudgetsByMonth, getTotalSpentByMonth} = useBudget();
    
    const budgets = getBudgets();
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    
    const totalBudgets = getBudgetsByMonth(year, month);
    const totalMonthSpending = getTotalSpentByMonth(year, month)

    const navigate = useNavigate();

    const placeholder = {
        icon: placeholderImg,
        message: "No budgets to show"
    }

    const label = {
        Component: Label,
        props: {
            title: "My Budgets"
        }
    }

    const onClick = () =>{
        navigate("/financeApp/addBudgetPage")
    }
    const pageComponents = [
    

        // HEADER ========
        { 
            Component: SubHeader,
            props: {
              title: "Budgets"
            } 
        },
        {
            Component: BalanceCard,
            props: {
            logo: appLogo,
            alt: "logo",
            title: "Total Budgets",
            growth: `Spent ${totalMonthSpending}`,
            balance: totalBudgets.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }),
            currency: "kr",
            icon: cashIcon,
            iconAlt: "icon",
            to: "/financeApp/cashOverview"
            }
        },
        
        // Add budget
        {
          Component: WideButton,
          props: {
            text: "Set new budget",
            onClick: onClick
          }
        },

        // BUDGET CARD
        {
            Component: ColumnGrid,
            props: {
                items: budgets,
                label: label,
                placeholder: placeholder,
                cards: true,
                NewComponent: ProgressCard
            }
        },

    ];
  
    return <MainPageFrame components={pageComponents}  bottomNav={false}  effect="slideInRight" />; 

}

export default BudgetPage;