import { useLocation, useNavigate } from "react-router-dom";
import "../init/styles/fullPage.css";
import { WideButton } from "../components/buttons/WideButton";
import startImg from "../assets/startup.png"
import { AnimatePresence, motion } from "framer-motion";


function InitWelcomePage() {

    const navigate = useNavigate();
    const location = useLocation();
    // const {state} = useLocation();
    
        
    return (
        <AnimatePresence mode="wait">
            
            <motion.div
                className="init-page"
                key={location.pathname}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{scale: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}                
                >
                    <div className="init-hero">
                    
                        <div className="init-illustration welcome" >
                            <img src={startImg} alt="crypto" />
                        </div>

                        <h1>Welcome to Your Money Space 💸</h1>

                    </div>

                    <p className="budgetly-description">
                        Let’s take a minute to set things up so we can track your money,
                        savings and investments.
                    </p>

                    <WideButton
                    text="Get Started"
                    onClick={() => navigate("/financeApp/initCashPage")}
                    />

            </motion.div>

        </AnimatePresence>


    )
}

export default InitWelcomePage;