import { useContext } from "react";
import { AppStoreContext, ViewportContext, BrowserContext, TimeContext } from "../contexts/contexts";

export const useViewportContext = () => useContext(ViewportContext);
export const useAppStoreContext = () => useContext(AppStoreContext);
export const useTime = () => useContext(TimeContext);
export const useBrowserContext = () => useContext(BrowserContext);