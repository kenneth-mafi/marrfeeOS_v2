import TextInput from "../../components/form/TextInput";

export function getSavingsFormLayout(func) {
    const formContent = {
        group: "expense",
        default: [
            {
                name: "label",
                value: ""
            },
            {
                name: "amount",
                value: ""
            }

        ],

        validation: {
            label: {required: true},
            amount: {required: true, min: 1},
        },

        feilds: [

            {
                Component: TextInput,
                props: {
                    type: "text",
                    name: "label",
                    label: "Label", 
                    id: "2341wwe",
                    placeholder: "e.g. Emergency funds"
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
            }
        ],
        buttonData: {
            text: "Submit"
        },
        onSubmit: func
        }

    return formContent;
}

export function getSavingsGoalFormLayout(func) {
    const formContent = {
        default: [
            {
                name: "label",
                value: ""
            },
            {
                name: "amount",
                value: ""
            }

        ],

        validation: {
            label: {required: true},
            amount: {required: true, min: 1},
        },

        feilds: [

            {
                Component: TextInput,
                props: {
                    type: "text",
                    name: "label",
                    label: "Title", 
                    id: "2341wwe",
                    placeholder: "e.g. My goal"
                }
            },
            {
                Component: TextInput,
                props: {
                    type: "number",
                    name: "amount",
                    label: "Amount",
                    placeholder: "Set amount goal",
                    id: "2354"
                }
            }
        ],
        buttonData: {
            text: "Submit"
        },
        onSubmit: func
        }

    return formContent;
}