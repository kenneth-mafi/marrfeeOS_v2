import FormTemplate from "../components/form/FormTemplate";
import SelectDropdown from "../components/form/SelectDropdown";
import TextInput from "../components/form/TextInput";
import ToggleSwitch from "../components/form/ToggleSwitch";
import SubHeader from "../components/header/Header2";
import { useSavings } from "../hooks/useContexts";
import { getSavingsGoalFormLayout } from "./formContents/savingsForm";
import MainPageFrame from "./mainPageFrame/MainPageFrame";

function AddSavingsGoalPage() {

    const {setSavingsGoal} = useSavings();
    
    const submit = (formData) => {
        const intAmount = Number(formData.amount)
        setSavingsGoal({...formData, amount: intAmount});
    }
    
    const formContent = getSavingsGoalFormLayout(submit)


    const pageComponents = [

        // HEADER ========
        { 
            Component: SubHeader,
            props: {
              title: "Savings Goal",
              alt: "Back"
            } 
        }, 

        {
          Component: FormTemplate,
          props: {formContent}
        }
      ];

    return <MainPageFrame components={pageComponents}  bottomNav={false} effect="slideInRight"  />;
}

export default AddSavingsGoalPage;