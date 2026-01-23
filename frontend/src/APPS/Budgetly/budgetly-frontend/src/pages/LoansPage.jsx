import { useNavigate } from "react-router-dom";
import BalanceCard from "../components/cards/BalanceCard";
import MainHeader from "../components/header/Header";
import MainPageFrame from "./mainPageFrame/MainPageFrame";
import SubPageFrame from "./subPageFrame/SubPageFrame";
import placeholderImg from '../assets/placeholder.png';
import { Label } from "../components/label/Label";
import ProgressCard from "../components/cards/ProgressCard";
import { WideButton } from "../components/buttons/WideButton";
import { ColumnGrid } from "../components/grids/Grids";
import SubHeader from "../components/header/Header2";

function LoansPage() {
    const loans = [];

    const navigate = useNavigate();

    const placeholder = {
        icon: placeholderImg,
        message: "You have no active loans",
        Button: WideButton,
        buttonProps: {
            text: "Add new loan",
            onClick: () => { navigate("/financeApp/addLoanPage") }
        }
    }

    const label = {
        Component: Label,
        props: {
            title: "My Loans"
        }
    }
    const pageComponents = [
    

        // HEADER ========
        { 
            Component: SubHeader,
            props: {
              title: "Loans"
            } 
        },

        // BUDGET CARD
        {
            Component: ColumnGrid,
            props: {
                items: loans,
                label: label,
                placeholder: placeholder
            }
        }
    ];
  
    return <MainPageFrame components={pageComponents}  bottomNav={false}  effect="slideInRight" />; 

}

export default LoansPage;