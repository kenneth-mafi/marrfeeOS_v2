import { WideButton } from "../../components/buttons/WideButton";
import InputField from "../../components/forms/formFields/InputField";

export function getRegistrationForm(func) {
    const formContent = {
      
      default: [
      { name: "firstName", value: "" },
      { name: "lastName", value: "" },
      { name: "dateOfBirth", value: "" },
      { name: "email", value: "" },
      { name: "personNummer", value: "" },
      { name: "phoneNumber", value: "" },
      { name: "password", value: "" },
    ],

    validation: {
      firstName: { required: true, minLen: 2, maxLen: 50 },
      lastName: { required: true, minLen: 2, maxLen: 50 },
      dateOfBirth: { required: true, ageLimit: 18 },
      email: { required: true },
      personNummer: { required: true, minLen: 12, maxLen: 13 },
      phoneNumber: { required: true, minLen: 10 },
      password: { required: true, minLen: 8 }
    },

      fields: [
        {
          Component: InputField,
          props: {
            type: "text",
            name: "firstName",
            label: "First Name *",
            placeholder: "Enter first name",
            id: "2lohqwefw354"
          }
        },
        {
          Component: InputField,
          props: {
            type: "text",
            name: "lastName",
            label: "Last Name *",
            placeholder: "Enter last name",
            id: "2lqdq4awwsdc2oh354"
          }
        },
        {
          Component: InputField,
          props: {
            type: "date",
            name: "dateOfBirth",
            label: "Date of Birth *",
            placeholder: "Enter date of birth",
            id: "2lohl2wf38354"
          }
        },
        {
          Component: InputField,
          props: {
            type: "email",
            name: "email",
            label: "Email *",
            placeholder: "Enter email",
            id: "2loh3wqwqpq54"
          }
        },
        {
          Component: InputField,
          props: {
            type: "text",
            name: "personNummer",
            label: "Person Nummer *",
            placeholder: "12345678-XXXX",
            id: "2loh3wqwqpo09822pwcjq54"
          }
        },
        {
          Component: InputField,
          props: {
            type: "number",
            name: "phoneNumber",
            label: "Phone Number *",
            placeholder: "Enter your phone number",
            id: "2lohew3wqwqpo10982pon2pq54"
          }
        },
        {
          Component: InputField,
          props: {
            type: "password",
            name: "password",
            label: "Password *",
            placeholder: "Choose a password",
            id: "234lkedniqw1"
          }
        }
      ],
      buttonData: {
        Component: WideButton,
        text: "Submit",
        dark: true
      },
      onSubmit: func
    }  

    return formContent;
}