import { useCryptoPrices } from "../API/CryptoApi";
import FormTemplate from "../components/form/FormTemplate";
import SubHeader from "../components/header/Header2";
import { usePortfolio, useTransactions, useCash } from "../hooks/useContexts";
import { generateId } from "../utils/utils";
import { getCryptoFormContent } from "./formContents/cryptoForm";
import MainPageFrame from "./mainPageFrame/MainPageFrame";

function AddCryptoPage() {
    const { addToPortfolio, calculateCoinUnits } = usePortfolio();
    const { cryptoData } = useCryptoPrices();
    const { addTransaction } = useTransactions();
    const { subtractCash } = useCash();
    
    const submit = (formData) => {

        const numAmount = Number(formData.cost);
        
        const unitsBought = calculateCoinUnits(formData.coinId, numAmount, cryptoData);
        
        addToPortfolio({
            coinName: formData.coinId,  
            units: unitsBought,
            cost: numAmount
        });
    };


    const formContent = getCryptoFormContent(submit);


    const pageComponents = [

        // HEADER ========
        { 
            Component: SubHeader,
            props: {
              title: "Add crypto",
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

export default AddCryptoPage;