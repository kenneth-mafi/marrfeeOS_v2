import { useContext } from "react";
import { AppStoreContext, BreakpointContext, BrowserContext, TimeContext } from "../contexts/contexts";

export const useBreakpointContext = () => useContext(BreakpointContext);
export const useAppStoreContext = () => useContext(AppStoreContext);
export const useTime = () => useContext(TimeContext);
export const useBrowserContext = () => useContext(BrowserContext);