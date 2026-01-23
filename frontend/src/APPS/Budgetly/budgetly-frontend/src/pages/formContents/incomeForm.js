import SelectDropdown from "../../components/form/SelectDropdown";
import TextInput from "../../components/form/TextInput";
import ToggleSwitch from "../../components/form/ToggleSwitch";


export function getIncomeFormLayout(func) {

    const incomeFormContent = {
      group: "income",
      
      default: [
        {
          name: "category",
          value: ""
        },
        {
          name: "amount",
          value: ""
        },
        {
          name: "date",
          value: ""
        },
        {
          name: "note",
          value: ""
        },

      ],

      validation: {
        category: {required: true},
        amount: {required: true, min: 1},
      },

      feilds: [

        {
          Component: SelectDropdown,
          props: {
            name: "category",
            label: "Category",
            id: "9876",
            options: [
                {
                  name: "salary",
                  id: "545",
                  value: "salary",
                  text: "Salary"
                },        
                {
                  name: "taxRefund",
                  id: "77",
                  value: "tax-refund",
                  text: "Tax Refund"
                },        
                {
                  name: "freelance",
                  id: "334445",
                  value: "freelance",
                  text: "Freelance"
                },
                {
                  name: "investment-returns",
                  id: "334445",
                  value: "investment-returns",
                  text: "Investment returns"
                },
                {
                  name: "gifts",
                  id: "334445",
                  value: "gifts",
                  text: "Gifts"
                },
                {
                  name: "others",
                  id: "334445",
                  value: "others",
                  text: "Others"
                },              
            ]
          }
        },
        {
          Component: TextInput,
          props: {
            type: "number",
            name: "amount",
            label: "Amount",
            placeholder: "Enter amount",
            id: "2354"
          }
        },
        {
          Component: TextInput,
          props: {
            type: "date",
            name: "date",
            label: "Date", 
            id: "2341"
          }
        },
        {
          Component: TextInput,
          props: {
            type: "text",
            name: "note",
            label: "Add note",
            placeholder: "e.g. From tax returns..",
            id: "3344"
          }
        }
      ],
      buttonData: {
        text: "Submit"
      },
      onSubmit: func
    }  

    return incomeFormContent;
}