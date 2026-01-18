import { useState } from "react";
import { AppStoreContext } from "../contexts/contexts";


const AppsProvider = ({ children }) => {

    const [appList, setAppList] = useState([]);

    const addApp = (appData = {}) => {
        if (!appData) return;
        if (!(appData.appName && appData.appLogo && appData.path && appData.id)) {
            console.log("Incomplete App Data");
            return;
        }

        setAppList(prev => {
            const exists = prev.some(app => app.path === appData.path);
            if (exists) return prev;
            return [...prev, appData];
        });
    };


    return (
        <AppStoreContext.Provider  
            value={{
                appList,
                addApp
            }}
        >
            {children}
        </AppStoreContext.Provider>
    )
}

export default AppsProvider;