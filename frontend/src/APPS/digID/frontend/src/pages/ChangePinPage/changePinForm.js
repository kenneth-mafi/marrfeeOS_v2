import { WideButton } from "../../components/buttons/WideButton";
import InputField from "../../components/forms/formFields/InputField";

export function getChangePinForm(func) {
    const formContent = {
      
      default: [
      { name: "currentPin", value: ""},
      { name: "newPin", value: "" },
      { name: "confirmNewPin", value: "" },
    ],

    validation: {
      pin: { required: true },
      newPin: { required: true, minLen: 6 },
      confirmNewPin: { required: true, minLen: 6 },
    },

      fields: [
        {
          Component: InputField,
          props: {
            type: "password",
            name: "currentPin",
            label: "Previous security code *",
            placeholder: "Enter previous security code",
            id: "31s1wpppinqwqlwkrcpkqpipq54"
          }
        },
        {
          Component: InputField,
          props: {
            type: "password",
            name: "newPin",
            label: "New security code *",
            placeholder: "Choose new secirity code",
            id: "cfek7ywswxednqwecwämdiqw1"
          }
        },
        {
          Component: InputField,
          props: {
            type: "password",
            name: "confirmNewPin",
            label: "Confirm new security code *",
            placeholder: "Confirm new secirity code",
            id: "cfek7ywswadixednqämdiqw1"
          }
        }
      ],
      buttonData: {
        Component: WideButton,
        text: "Save"
      },
      onSubmit: func
    }  

    return formContent;
}