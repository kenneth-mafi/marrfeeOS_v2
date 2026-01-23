import FormTemplate from "../components/form/FormTemplate";
import SubHeader from "../components/header/Header2";
import { useBudget } from "../hooks/useContexts";
import { generateId } from "../utils/utils";
import { budgetFormContent } from "./formContents/budgetForm";
import MainPageFrame from "./mainPageFrame/MainPageFrame";



function AddBudgetPage() {

    const {addBudget} = useBudget();


    const submit = (formData) => {

        const intAmount = Number(formData.target)
        
        addBudget({
          ...formData,
          target: intAmount,
          id: generateId()
        });   
    }
    const formContent = budgetFormContent(submit);


    const pageComponents = [

        // HEADER ========
        { 
            Component: SubHeader,
            props: {
              title: "Add budget",
              alt: "Back"
            } 
        }, 

        {
          Component: FormTemplate,
          props: {formContent}
        }
      ];

    return <MainPageFrame components={pageComponents}  bottomNav={false} effect="slideInRight" />;
}

export default AddBudgetPage;