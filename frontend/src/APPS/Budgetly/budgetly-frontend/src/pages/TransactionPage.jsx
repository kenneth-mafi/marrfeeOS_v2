import MainPageFrame from "./mainPageFrame/MainPageFrame";
import { ColumnGrid } from "../components/grids/Grids";
import { Label } from "../components/label/Label";
import TransactionCard from "../components/cards/TransactionCard";
import placeholderImg from "../assets/placeholder.png";
import { useTransactions } from "../hooks/useContexts";
import SubHeader from "../components/header/Header2";

/**
 * TransactionsPage
 *
 * Displays a list of all transactions recorded in the app.
 * Uses a simple column grid layout with a placeholder
 * when no transactions exist.
 *
 * @returns {JSX.Element}
 */
function TransactionsPage() {

  /* =============================
     TRANSACTIONS
     ============================= */
  const { fetchTransactions } = useTransactions();
  const transactions = fetchTransactions();

  /* =============================
     PAGE COMPONENT CONFIG
     ============================= */
  const pageComponents = [

    // HEADER =====================
    {
      Component: SubHeader,
      props: {}
    },

    // TRANSACTION LIST ===========
    {
      Component: ColumnGrid,
      props: {
        items: transactions,
        NewComponent: TransactionCard,
        label: {
          Component: Label,
          props: {
            title: "All Transactions"
          }
        },
        placeholder: {
          icon: placeholderImg,
          message: "No transactions yet"
        },
        currency: "kr"
      }
    }
  ];

  /* =============================
     RENDER
     ============================= */
  return <MainPageFrame components={pageComponents} />;
}

export default TransactionsPage;
