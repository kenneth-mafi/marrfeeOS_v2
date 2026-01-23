import { useContext } from "react";
import { AppDataContext, BudgetContext, CashContext, CSVImportContext, DateContext, NotificationContext, PortfolioContext, SavingsContext, TransactionContext } from "../context/contexts";


export function useTransactions() {
  return useContext(TransactionContext);
}

export function useCash() {
  return useContext(CashContext)
}

export function usePortfolio(){
  return useContext(PortfolioContext);
}

export function useBudget() {
  return useContext(BudgetContext);
}

export function useSavings() {
  return useContext(SavingsContext);
}

export const useNotification = () => useContext(NotificationContext);

export const useDate = () => useContext(DateContext);

export const useCSVImport = () => useContext(CSVImportContext);

export const useAppData = () => useContext(AppDataContext);