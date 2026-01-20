import { useEffect, useState } from "react";
import { AppStoreContext } from "../../contexts/contexts";
import { dictExistsInList, hasRequiredAppFields } from "../../../marrfeeOSUtils/queryAction";
import { fetchApps } from "./appStoreApi";

const AppStoreProvider = ({ children }) => {

    const [appList, setAppList] = useState([]);
    const [appStoreList, setAppStoreList] = useState([]);
    const [isLoadingApps, setIsLoadingApps] = useState(true);

    useEffect(() => {
        const initApps = async () => { 
            try {
                const [appStore, appList] = await Promise.all([
                    fetchApps("appStore"),
                    fetchApps("appList")
                ]);
                setAppStoreList(appStore);
                setAppList(appList);
            } finally {
                setIsLoadingApps(false);
            }
        };

        initApps();
    }, []);

    const addApp = ( appData, destination="appStore") => {
        if ( !( hasRequiredAppFields(appData ) ) ) {
            console.log("⚠️ Incomplete App Data");
            return;
        }  
        
        const setList = destination === "appStore" ? setAppStoreList : setAppList
        setList(prev => {
            if ( dictExistsInList(prev, appData, "path") ) return prev;
            return [...prev, appData]
        });
    }


    return (
        <AppStoreContext.Provider  
            value={{
                appList,
                appStoreList,
                addApp,
                isLoadingApps
            }}
        >
            {children}
        </AppStoreContext.Provider>
    )
}

export default AppStoreProvider;
