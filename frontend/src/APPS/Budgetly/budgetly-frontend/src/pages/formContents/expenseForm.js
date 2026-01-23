import SelectDropdown from "../../components/form/SelectDropdown";
import TextInput from "../../components/form/TextInput";
import ToggleSwitch from "../../components/form/ToggleSwitch";


export const EXPENSE_CATEGORIES = [
  { value: "housing", text: "Housing & Rent" },
  { value: "utilities", text: "Utilities" },
  { value: "groceries", text: "Groceries" },
  { value: "food", text: "Food & Dining" },
  { value: "transport", text: "Transport" },
  { value: "insurance", text: "Insurance" },
  { value: "health", text: "Health & Medical" },
  { value: "education", text: "Education" },
  { value: "entertainment", text: "Entertainment" },
  { value: "shopping", text: "Shopping" },
  { value: "subscriptions", text: "Subscriptions" },
  { value: "personal", text: "Personal & Lifestyle" },
  { value: "debt", text: "Debt Repayment" },
  { value: "savings", text: "Savings" },
  { value: "gifts", text: "Gifts & Donations" },
  { value: "travel", text: "Travel" },
  { value: "other", text: "Other" }
];

export function getExpenseFormContent(func) {
  const expenseFormContent = {
    group: "expense",

    default: [
      { name: "title", value: "" },
      { name: "category", value: "" },
      { name: "amount", value: "" },
      {name: "date", value: "",},
      {name: "note", value: "",},
    ],

    validation: {
      category: { required: true },
      amount: { required: true, min: 1 },
    },

    feilds: [
      {
        Component: TextInput,
        props: {
          type: "text",
          name: "title",
          label: "Title",
          placeholder: "e.g Netflix subscription",
          id: "qjdbi",
        },
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
        },
      },
      {
        Component: TextInput,
        props: {
          type: "number",
          name: "amount",
          label: "Amount",
          placeholder: "Enter amount",
          id: "2354",
        },
      },
      {
        Component: TextInput,
        props: {
          type: "date",
          name: "date",
          label: "Date",
          id: "2341",
        },
      },
      {
        Component: TextInput,
        props: {
          type: "text",
          name: "note",
          label: "Add note",
          placeholder: "e.g. Grocery shopping",
          id: "3344",
        },
      },
    ],
    buttonData: {
      text: "Submit",
      dark: true,
    },
    onSubmit: func,
  };

  return expenseFormContent;
}
