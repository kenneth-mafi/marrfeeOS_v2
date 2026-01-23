import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import "../init/styles/fullPage.css";

import { useCSVImport, usePortfolio } from "../hooks/useContexts";
import SelectDropdown from "../components/form/SelectDropdown";
import TextInput from "../components/form/TextInput";
import TwinButtons from "../components/buttons/TwinButtons";

import cryptoImg from "../assets/crypto.png";
import { AnimatePresence, motion } from "framer-motion";

/**
 * InitCryptoPage
 *
 * Onboarding page for adding initial crypto holdings.
 *
 * - Allows adding multiple coins
 * - Prevents duplicates
 * - Validates coin, units, and cost
 * - Initializes portfolio on finish
 *
 * @returns {JSX.Element}
 */
function InitCryptoPage() {


  /* =============================
     NAVIGATION & CONTEXT
     ============================= */
  const navigate = useNavigate();
  const { initializePortfolio } = usePortfolio();

  /* =============================
     LOCAL STATE
     ============================= */

  /**
   * List of added crypto holdings before submission.
   * Each item contains:
   * - coinName {string}
   * - units {number}
   * - cost {number}
   */
  const [cryptoList, setCryptoList] = useState([]);

  /**
   * Form state for current crypto entry.
   */
  const [formData, setFormData] = useState({
    coinName: "",
    units: "",
    cost: ""
  });

  /**
   * Validation errors keyed by field name.
   */
  const [errors, setErrors] = useState("");

  /* =============================
     CRYPTO OPTIONS
     ============================= */
  const coinOptions = [
    { name: "bitcoin", id: "54csdc5", value: "bitcoin", text: "Bitcoin" },
    { name: "ethereum", id: "7svre7", value: "ethereum", text: "Ethereum" },
    { name: "solana", id: "3344vsd45", value: "solana", text: "Solana" },
    { name: "cardano", id: "334ysdra445", value: "cardano", text: "Cardano (ADA)" },
    { name: "ripple", id: "334ah6j445", value: "ripple", text: "Ripple (XRP)" },
    { name: "binance", id: "334eatr445", value: "binance", text: "Binance" },
    { name: "usd-coin", id: "334eatasr445", value: "usd-coin", text: "USDC" }
  ];

  /* =============================
     HANDLERS
     ============================= */

  /**
   * Updates form fields and clears field-specific errors.
   *
   * @param {string} name - Field name
   * @param {string|number} value - New value
   */
  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  /**
   * Validates the current crypto form entry.
   * Prevents empty fields, invalid numbers, and duplicates.
   *
   * @returns {boolean} True if valid
   */
  const validate = () => {
    const newErrors = {};

    if (!formData.coinName) newErrors.coinName = "Required";
    if (!formData.units || Number(formData.units) <= 0)
      newErrors.units = "Invalid amount";
    if (!formData.cost || Number(formData.cost) <= 0)
      newErrors.cost = "Invalid amount";

    // prevent duplicate coins
    if (cryptoList.some(c => c.coinName === formData.coinName)) {
      newErrors.coinName = "Already added";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Adds a validated crypto entry to the local list.
   */
  const handleSubmit = () => {
    if (!validate()) return;

    setCryptoList(prev => [
      ...prev,
      {
        coinName: formData.coinName,
        units: Number(formData.units),
        cost: Number(formData.cost)
      }
    ]);

    setFormData({
      coinName: "",
      units: "",
      cost: ""
    });
  };

  /**
   * Finalizes onboarding by initializing the portfolio
   * and navigating to the dashboard.
   */
  const handleFinish = () => {
    const initialPortfolio = {};

    cryptoList.forEach(coin => {
      initialPortfolio[coin.coinName] = {
        units: coin.units,
        cost: coin.cost
      };
    });


    initializePortfolio(initialPortfolio);
    navigate("/financeApp/dashboard");
  };

  const location = useLocation();
  

  /* =============================
     RENDER
     ============================= */
  return (
    <AnimatePresence>
      <motion.div 
        className="init-page crypto"
        key={location.pathname}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}      
      >

        {/* HERO SECTION */}
        <div className="init-hero">
          <div className="init-illustration crypto">
            <img src={cryptoImg} alt="crypto" />
          </div>
          <h1>Add Your Crypto 🚀</h1>
        </div>

        {/* DESCRIPTION */}
        <p className="budgetly-description">
          Track your coins in real time. You can add as many as you want.
        </p>

        {/* FORM INPUTS */}
        <SelectDropdown
          name="coinName"
          label="Select Crypto"
          options={coinOptions}
          value={formData.coinName}
          onChange={(val) => handleChange("coinName", val)}
          error={errors.coinName}
        />

        <TextInput
          type="number"
          name="units"
          label="Units owned"
          placeholder="e.g. 0.25"
          value={formData.units}
          onChange={(val) => handleChange("units", val)}
          error={errors.units}
        />

        <TextInput
          type="number"
          name="cost"
          label="Total invested"
          placeholder="e.g. 12000"
          value={formData.cost}
          onChange={(val) => handleChange("cost", val)}
          error={errors.cost}
        />

        {/* ADDED COUNT */}
        {cryptoList.length > 0 && (
          <p className="init-count">
            {cryptoList.length} coin{cryptoList.length > 1 ? "s" : ""} added
          </p>
        )}

        {/* ACTION BUTTONS */}
        <div className="init-actions">
          <TwinButtons
            text1={"Finish"}
            text2={"Add Crypto"}
            onclick1={handleFinish}
            onclick2={handleSubmit}
            untwin={true}
          />
        </div>

      </motion.div>

    </AnimatePresence>

  );
}

export default InitCryptoPage;
