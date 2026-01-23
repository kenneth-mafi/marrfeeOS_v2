
import FormTemplate from "../components/form/FormTemplate";
import SubHeader from "../components/header/Header2";
import FormFrame from "../components/multi-page/FormFrame";
import { useCash, useTransactions } from "../hooks/useContexts.js";
import { generateId } from "../utils/utils.js";
import { getExpenseFormContent } from "./formContents/expenseForm.js";
import { getIncomeFormLayout } from "./formContents/incomeForm.js";
import MainPageFrame from "./mainPageFrame/MainPageFrame.jsx";



function AddTransationPage() {
    const {addTransaction} = useTransactions();
    const {addCash, subtractCash} = useCash();


    const submit = (formData, group) => {
      
        const intAmount = Number(formData.amount)
        
        addTransaction({
          ...formData,
          amount: intAmount,
          id: generateId(),
          group: group
        });

        if (group === "income") addCash(intAmount);

        if (group === "expense") subtractCash(intAmount);
        
    }

    const incomeFormContent = getIncomeFormLayout(submit);

    const expenseFormContent = getExpenseFormContent(submit);

    const toggleButtonData = {
          text1: "Income",
          text2: "Expense"
        }

    const tabs = [
      {
        Component: FormTemplate,
        formContent: incomeFormContent,
      },

      {
        Component: FormTemplate,
        formContent: expenseFormContent,
      }
    ]

    const pageComponents = [

        // HEADER ========
        { 
            Component: SubHeader,
            props: {
              title: "Add Transaction",
              alt: "Back"
            } 
        }, 

        {
          Component: FormFrame,
          props: {
            tabs: tabs,
            toggleButtonData: toggleButtonData
          }
        }
      ];

    return <MainPageFrame components={pageComponents}  bottomNav={false} effect="slideInUp"  />;
    
}

export default AddTransationPage;