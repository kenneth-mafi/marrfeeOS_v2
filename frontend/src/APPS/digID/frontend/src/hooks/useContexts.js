import { useContext } from "react";
import { DigIDDataContext } from "./contexts";

export const useDigIDStateContext = () => useContext(DigIDDataContext);