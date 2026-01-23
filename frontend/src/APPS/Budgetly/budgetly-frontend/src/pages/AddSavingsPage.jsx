import FormTemplate from "../components/form/FormTemplate";
import SelectDropdown from "../components/form/SelectDropdown";
import TextInput from "../components/form/TextInput";
import ToggleSwitch from "../components/form/ToggleSwitch";
import SubHeader from "../components/header/Header2";
import { useSavings } from "../hooks/useContexts";
import { getSavingsFormLayout } from "./formContents/savingsForm";
import MainPageFrame from "./mainPageFrame/MainPageFrame";
import SubPageFrame from "./subPageFrame/SubPageFrame";

function AddSavingsPage() {

    const {addSavings} = useSavings();
    
    const submit = (formData) => {
        const intAmount = Number(formData.amount)
        addSavings({
          ...formData,
          amount: intAmount
        });
    }
    const formContent = getSavingsFormLayout(submit)


    const pageComponents = [

        // HEADER ========
        { 
            Component: SubHeader,
            props: {
              title: "Add Savings",
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

export default AddSavingsPage;