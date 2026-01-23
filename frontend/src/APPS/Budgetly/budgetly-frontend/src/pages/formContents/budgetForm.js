import SelectDropdown from "../../components/form/SelectDropdown";
import TextInput from "../../components/form/TextInput";
import ToggleSwitch from "../../components/form/ToggleSwitch";
import { EXPENSE_CATEGORIES } from "./expenseForm";


export const budgetFormContent = (func) => {

    const formContent = {
      default: [
        {name: "title", value: "" },
        {name: "category", value: ""},
        {name: "target",  value: ""},
        {name: "date", value: ""}

      ],

      validation: {
        category: {required: true},
        target: {required: true, min: 1},
      },

      feilds: [
        {
          Component: TextInput,
          props: {
            type: "text",
            name: "title",
            label: "Title",
            placeholder: "e.g. Emergency funds",
            id: "2354"
          }
        },
        {
          Component: SelectDropdown,
          props: {
            name: "category",
            label: "Category",
            id: "9876",
            options: EXPENSE_CATEGORIES.map(c => ({
            value: c.value,
            text: c.text
          }))
          }
        },
        {
          Component: TextInput,
          props: {
            type: "number",
            name: "target",
            label: "Amount",
            placeholder: "Enter amount",
            id: "2wef354"
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
        }
      ],
      buttonData: {
        text: "Submit",
        dark: true
      },
      onSubmit: func
    }

    return formContent;
}