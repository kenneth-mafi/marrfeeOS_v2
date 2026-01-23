import CheckGroup from "../../components/form/CheckGroup";
import SelectDropdown from "../../components/form/SelectDropdown";
import TextInput from "../../components/form/TextInput";
import ToggleSwitch from "../../components/form/ToggleSwitch";


export function getCryptoFormContent(func) {
    const formContent = {
      
      default: [
      { name: "coinId", value: "" },
      { name: "cost", value: "" },
      { name: "date", value: "" }
    ],

    validation: {
      coinId: { required: true },
      cost: { required: true, min: 1 }
    },

      feilds: [
              {
          Component: SelectDropdown,
          props: {
            name: "coinId",
            label: "Select Crypto",
            id: "9876",
            options: [
                {
                  name: "bitcoin",
                  id: "54csdc5",
                  value: "bitcoin",
                  text: "Bitcoin"
                },        
                {
                  name: "ethereum",
                  id: "7svre7",
                  value: "ethereum",
                  text: "Ethereum"
                },        
                {
                  name: "solana",
                  id: "3344vsd45",
                  value: "solana",
                  text: "Solana"
                },
                {
                  name: "cardano",
                  id: "334yra445",
                  value: "cardano",
                  text: "Cardano (ADA)"
                },
                {
                  name: "ripple",
                  id: "334ah6j445",
                  value: "ripple",
                  text: "Ripple (XRP)"
                },
                {
                  name: "binance",
                  id: "334eatr445",
                  value: "binance",
                  text: "Binance"
                },              
                {
                  name: "usd-coin",
                  id: "334eatasr445",
                  value: "usd-coin",
                  text: "USDC"
                },              
            ]
          }
        },
        {
          Component: TextInput,
          props: {
            type: "number",
            name: "cost",
            label: "Amount",
            placeholder: "Enter amount",
            id: "2loh354"
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