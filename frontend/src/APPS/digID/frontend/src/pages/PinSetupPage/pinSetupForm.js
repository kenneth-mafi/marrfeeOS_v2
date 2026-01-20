import { WideButton } from "../../components/buttons/WideButton";
import InputField from "../../components/forms/formFields/InputField";

export function getPinSetupForm(func) {
    const formContent = {
      
      default: [
      { name: "newPin", value: "" },
      { name: "confirmNewPin", value: "" },
    ],

    validation: {
      newPin: { required: true, minLen: 6 },
      confirmNewPin: { required: true, minLen: 6 }
    },

      fields: [
        {
          Component: InputField,
          props: {
            type: "password",
            name: "newPin",
            label: "Security code *",
            placeholder: "Security code",
            id: "31s1wpppinqwqkqpipq54"
          }
        },
        {
          Component: InputField,
          props: {
            type: "password",
            name: "confirmNewPin",
            label: "Confirm security code *",
            placeholder: "Confirm secirity code",
            id: "cfek7ywswxednqämdiqw1"
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