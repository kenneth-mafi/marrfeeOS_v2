import { useEffect, useState } from "react";
import { AppStoreContext } from "../../contexts/contexts";
import { hasRequiredAppFields } from "../../../marrfeeOSUtils/queryAction";
import { addToStore, fetchApps } from "./appStoreApi";

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

    const addToAppStore = async ( appData, appID ) => {
        const exits = appStoreList.find(app => app.id === appID)
        if (exits) return;   
        if ( !( hasRequiredAppFields(appData ) ) ) {
            console.log("⚠️ Incomplete App Data");
            return;
        }  
        
        const res = await addToStore( appData );
        console.log(res);
        if (res?.success) {
            setAppStoreList(prev =>
                prev.some(app => app.id === appID) ? prev : [...prev, appData]
            );
        }
    }


    return (
        <AppStoreContext.Provider  
            value={{
                appList,
                appStoreList,
                isLoadingApps,
                addToAppStore
            }}
        >
            {children}
        </AppStoreContext.Provider>
    )
}

export default AppStoreProvider;
