import placeholderImg from "../assets/placeholder.png";
import BalanceCard from "../components/cards/BalanceCard";
import SubHeader from "../components/header/Header2";
import investmentIcon from "../assets/investment.png";
import appLogo from "../assets/app-logo.png";
import errorIcon from "../assets/error.png";
import loadingIcon from "../assets/loading.png";

import TwinButtons from "../components/buttons/TwinButtons";
import { Label } from "../components/label/Label";
import { ColumnGrid } from "../components/grids/Grids";
import MultiFrame from "../components/multi-page/MultiFrame";
import MarketCard from "../components/cards/MarketCard";

import MainPageFrame from "./mainPageFrame/MainPageFrame";
import { useCryptoPrices } from "../API/CryptoApi";
import { usePortfolio } from "../hooks/useContexts";
import { useNavigate } from "react-router-dom";

/**
 * CryptoPortfolioPage
 *
 * Displays:
 * - Portfolio balance and percent change
 * - Action buttons for adding/swapping crypto
 * - Live market data
 * - User-owned crypto holdings
 *
 * @returns {JSX.Element}
 */
function CryptoPortfolioPage() {

  /* =============================
     MARKET DATA
     ============================= */
  const { cryptoData, loading, error } = useCryptoPrices();

  /* =============================
     PORTFOLIO DATA
     ============================= */
  const {
    getPortfolioValue,
    getPortfolioPercentChange,
    getPortfolioItems
  } = usePortfolio();

  const portfolioValue = getPortfolioValue(cryptoData);
  const portfolioPercentChange = getPortfolioPercentChange(cryptoData);
  const portfolioItems = getPortfolioItems(cryptoData);

  /* =============================
     NAVIGATION
     ============================= */
  const navigate = useNavigate();

  const onClick1 = () => {
    navigate("/financeApp/addCryptoPage");
  };

  /* =============================
     PLACEHOLDERS
     ============================= */
  const errorPlaceholder = {
    icon: errorIcon,
    message: "Failed to load"
  };

  const loadingPlaceholder = {
    icon: loadingIcon,
    message: "Loading..."
  };

  let marketPlaceholder = null;

  if (loading) {
    marketPlaceholder = loadingPlaceholder;
  }

  if (error) {
    marketPlaceholder = errorPlaceholder;
  }

  const placeholder = {
    icon: placeholderImg,
    message: "No coins to show"
  };

  /* =============================
     MULTI-FRAME TABS
     ============================= */
  const tabs = [
    {
      id: "market",
      label: "Live market",
      Component: ColumnGrid,
      props: {
        items: cryptoData,
        placeholder: marketPlaceholder,
        currency: "$"
      }
    },
    {
      id: "my-coins",
      label: "My coins",
      Component: ColumnGrid,
      props: {
        items: portfolioItems,
        myCoin: true,
        placeholder: placeholder,
        currency: "$"
      }
    }
  ];

  /* =============================
     PAGE COMPONENT CONFIG
     ============================= */
  const pageComponents = [

    // HEADER =====================
    {
      Component: SubHeader,
      props: {
        title: "Portfolio",
        alt: "Back"
      }
    },

    // PORTFOLIO BALANCE ==========
    {
      Component: BalanceCard,
      props: {
        logo: appLogo,
        alt: "logo",
        title: "Portfolio balance",
        growth: `${portfolioPercentChange.toFixed(2)}`,
        color: `${portfolioPercentChange >= 0 ? "green" : "red"}`,
        balance: portfolioValue.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }),
        percent: true,
        icon: investmentIcon,
        iconAlt: "icon",
        currency: "$"
      }
    },

    // ACTION BUTTONS =============
    {
      Component: TwinButtons,
      props: {
        text1: "Add Crypto",
        onclick1: onClick1,
        text2: "Swap Crypto"
      }
    },

    // LABEL ======================
    {
      Component: Label,
      props: {
        title: "Live Market"
      }
    },

    // MARKET & PORTFOLIO TABS ====
    {
      Component: MultiFrame,
      props: {
        tabs: tabs,
        label: true
      }
    }
  ];

  /* =============================
     RENDER
     ============================= */
  return (
    <MainPageFrame
      components={pageComponents}
      bottomNav={false}
      effect="slideInRight"
    />
  );
}

export default CryptoPortfolioPage;
