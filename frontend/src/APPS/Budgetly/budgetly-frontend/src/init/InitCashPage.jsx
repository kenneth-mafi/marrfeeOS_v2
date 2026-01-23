import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import TwinButtons from "../components/buttons/TwinButtons";
import TextInput from "../components/form/TextInput";

import { useCash } from "../hooks/useContexts";
import cashImg from "../assets/money-generating.png";
import { AnimatePresence, motion } from "framer-motion";

/**
 * InitCashPage
 *
 * Initial onboarding page where the user can optionally
 * set their starting cash balance.
 *
 * - Validates positive numeric input
 * - Allows skipping without adding cash
 * - Persists cash using CashContext
 *
 * @returns {JSX.Element}
 */
function InitCashPage() {

  /* =============================
     NAVIGATION & CONTEXT
     ============================= */
  const navigate = useNavigate();
  const { initializeCashBalance } = useCash();

  /* =============================
     LOCAL STATE
     ============================= */

  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");


  /* =============================
     HANDLERS
     ============================= */

  /**
   * Validates and submits the cash amount.
   * Adds cash to global state and moves to crypto setup.
   */
  const handleSubmit = () => {
    const value = Number(amount);

    if (!value || value <= 0) {
      setError("Enter a valid amount");
      return;
    }

    initializeCashBalance(value); // cash balance initialized
    navigate("/financeApp/initCryptoPage");
  };

  /**
   * Updates the input value and clears validation errors.
   *
   * @param {string} val - User-entered cash amount
   */
  const handleChange = (val) => {
    setAmount(val);
    if (error) setError("");
  };

  const location = useLocation();

  /* =============================
     RENDER
     ============================= */
  return (

    <AnimatePresence>
      <motion.div 
        className="init-page"
        key={location.pathname}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}   
      >

        {/* HERO SECTION */}
        <div className="init-hero">
          <div className="init-illustration cash">
            <img src={cashImg} alt="cash" />
          </div>
          <h1>Let’s Set Your Cash 💵</h1>
        </div>

        {/* DESCRIPTION */}
        <p className="budgetly-description">
          Start with what you already have. You can always update this later.
        </p>

        {/* CASH INPUT */}
        <TextInput
          type="number"
          name="cash"
          label="Current Cash Balance"
          placeholder="e.g. 2500"
          value={amount}
          onChange={handleChange}
          error={error}
        />

        {/* ACTION BUTTONS */}
        <div className="init-actions">
          <TwinButtons
            text1={"Skip"}
            text2={"Add Cash"}
            onclick1={() => navigate("/financeApp/initCryptoPage")}
            onclick2={handleSubmit}
            untwin={true}
          />
        </div>

      </motion.div>

    </AnimatePresence>

  );
}

export default InitCashPage;
