import FormTemplate from "../components/form/FormTemplate";
import SelectDropdown from "../components/form/SelectDropdown";
import TextInput from "../components/form/TextInput";
import ToggleSwitch from "../components/form/ToggleSwitch";
import SubHeader from "../components/header/Header2";
import MainPageFrame from "./mainPageFrame/MainPageFrame";
import SubPageFrame from "./subPageFrame/SubPageFrame";

function AddLoanPage() {
    const formContent = {
      default: [
        {
          name: "category",
          value: ""
        },
        {
          name: "amount-left",
          value: ""
        },
        {
          name: "payment",
          value: ""
        }
      ],

      feilds: [
        {
          Component: SelectDropdown,
          props: {
            name: "loan-category",
            label: "Loan category",
            id: "9876",
            options: [
                {
                  name: "rent",
                  id: "54345",
                  value: "rent",
                  text: "Rent"
                },
                {
                  name: "grocries",
                  id: "54y4y45",
                  value: "groceries",
                  text: "Food & Groceries"
                },
                {
                  name: "internet",
                  id: "5433t35",
                  value: "internet",
                  text: "Internet bill"
                },
                {
                  name: "electricity",
                  id: "54t3t35",
                  value: "electricity",
                  text: "Electricity bill"
                },{
                  name: "transport",
                  id: "54ergg455",
                  value: "transport",
                  text: "Transport"
                },{
                  name: "shopping",
                  id: "54ge45",
                  value: "shopping",
                  text: "Shopping"
                },{
                  name: "others",
                  id: "54egnty5",
                  value: "others",
                  text: "Others"
                }            
            ]
          }
        },
        {
          Component: TextInput,
          props: {
            type: "number",
            name: "amount-left",
            label: "Total loan amount left to pay",
            placeholder: "Enter amount",
            id: "2354"
          }
        },
        {
          Component: TextInput,
          props: {
            type: "number",
            name: "payment",
            label: "Monthly payment", 
            id: "2341"
          }
        }
      ],
      buttonData: {
        text: "Submit",
        dark: true
      }
    }


    const pageComponents = [

        // HEADER ========
        { 
            Component: SubHeader,
            props: {
              title: "Add loan",
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

export default AddLoanPage;