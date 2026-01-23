import { Route, Routes, Navigate } from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import WalletPage from "./pages/WalletPage";
import ProfilePage from "./pages/ProfilePage";
import CashOverviewPage from "./pages/CashOverviewPage";
import CryptoPortfolioPage from "./pages/CryptoPortfolioPage";
import AddTransationPage from "./pages/AddTransactionPage";
import AddBudgetPage from "./pages/AddBudgetPage";
import LoansPage from "./pages/LoansPage";
import AddLoanPage from "./pages/AddLoanPage";
import SavingsPage from "./pages/SavingsPage";
import AddSavingsPage from "./pages/AddSavingsPage";
import AboutPage from "./pages/AboutPage";
import HelpPage from "./pages/HelpPage";
import { TransactionProvider } from "./context/TransactionProvider";
import { CashProvider } from "./context/CashProvider";
import { PortfolioProvider } from "./context/PortfolioProvider";
import { BudgetProvider } from "./context/BudgetProvider";
import BudgetPage from "./pages/BudgetPage";
import AddCryptoPage from "./pages/AddCryptoPage";
import { SavingsProvider } from "./context/SavingsProvider";
import TransactionsPage from "./pages/TransactionPage";
import AddSavingsGoalPage from "./pages/AddSavingsGoalPage";
import NotificationProvider from "./context/NotificationProvider";
import DateProvider from "./context/DateProvider";
import InitWelcomePage from "./init/InitWelcomePage";
import InitCashPage from "./init/InitCashPage";
import InitCryptoPage from "./init/InitCryptoPage";
import { CsvImportProvider } from "./context/CSVImporterProvider";
import AppDataProvider from "./context/AppDataProvider";
import { useEffect } from "react";
import { useTime } from "../../../../marrfeeOSHooks/hooks/contexts";

export function AppProviders({ children }) {
  return (
    <DateProvider>
      <CsvImportProvider>
        <NotificationProvider>
          <TransactionProvider>
            <CashProvider>
              <SavingsProvider>
                <BudgetProvider>
                  <PortfolioProvider>
                                {children}
                  </PortfolioProvider>
                </BudgetProvider>
              </SavingsProvider>
            </CashProvider>
          </TransactionProvider>
        </NotificationProvider>
      </CsvImportProvider>
    </DateProvider>
  );
}


export const launchApp = ( addToAppStore ) => {
    const appMetaData = {
            "id": "budgetlyFinanceApp",
            "appName": "Budgetly",
            "appStoreName": "Budgetly: Money manager",
            "path": "/financeApp",
            "appLogo": "/static/icons/budgetly-logo.png",
            "color": "#0F2854",
            "allowedDevices": ["mobile"],
            "description": "Manage your finance with ease, set monthly budgets and savings goal as well as manage assets on the go.",
            "category": "Finance",
            "type": "Finance",
            "size": "82",
            "developers": "Marrfee, tech",
            "keywords": ["saving", "budget", "crypto", "finance", "money"],
            "screenshots": ["/static/screenshots/budgetly1.png", "/static/screenshots/budgetly2.png", "/static/screenshots/budgetly3.png", "/static/screenshots/budgetly4.png", "/static/screenshots/budgetly5.png" ]
        }
    addToAppStore( appMetaData, "budgetlyFinanceApp" );
}

const updateApp = ( updateApps ) => {
    //TODO: Add fields to update 
}


function FinanceApp() {
  const {changeTimeColor} = useTime();
  useEffect(() => {
      changeTimeColor("black");
  }, [changeTimeColor])
  
  return (
    <AppDataProvider>
      <AppProviders>
          <Routes>
            <Route path="welcomePage" element={<InitWelcomePage />}></Route>

            <Route index element={<Navigate to="welcomePage" replace />} />

            <Route path="dashboard" element={<DashboardPage />} />

            <Route path="wallet" element={<WalletPage />} />

            <Route path="profilePage" element={<ProfilePage />} />

            <Route path="cashOverview" element={<CashOverviewPage />} />

            <Route path="cryptoPortfolio" element={<CryptoPortfolioPage />} />

            <Route path="addTransactionPage" element={<AddTransationPage />} />

            <Route path="addBudgetPage" element={<AddBudgetPage />} />

            <Route path="loansPage" element={<LoansPage />} />

            <Route path="addLoanPage" element={<AddLoanPage />} />

            <Route path="savingsPage" element={<SavingsPage />} />

            <Route path="addSavingsPage" element={<AddSavingsPage />} />

            <Route path="addSavingsGoalPage" element={<AddSavingsGoalPage />} />

            <Route path="aboutPage" element={<AboutPage />} />

            <Route path="helpPage" element={<HelpPage />} />

            <Route path="budgetPage" element={<BudgetPage />} />

            <Route path="addCryptoPage" element={<AddCryptoPage />} />

            <Route path="transactionsPage" element={<TransactionsPage />} />

            <Route path="initCashPage" element={<InitCashPage />}></Route>

            <Route path="initCryptoPage" element={<InitCryptoPage />}></Route>
          </Routes>
      </AppProviders>
    </AppDataProvider>
  );
}

export default FinanceApp
