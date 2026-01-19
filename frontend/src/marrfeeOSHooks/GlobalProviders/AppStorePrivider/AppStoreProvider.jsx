import { useEffect, useState } from "react";
import { AppStoreContext } from "../../contexts/contexts";
import { dictExistsInList, filterOutFromList, hasRequiredAppFields, sendAPIRequest } from "../../../marrfeeOSUtils/queryAction";
import getDefaultApps from "./defaultApps";

const AppStoreProvider = ({ children }) => {
    

    const [appList, setAppList] = useState( getDefaultApps() );
    const [appStoreList, setAppStoreList] = useState( filterOutFromList( getDefaultApps(), 'isSystemApp', true ) );

    const logApps = async () => {
        const appsData = await sendAPIRequest("all-apps", {}, "GET");
        if (appsData?.success) console.log(appsData.apps);
        else console.log("NO");
        
    }

    useEffect(() => {
        logApps();
    }, [])

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
                addApp
            }}
        >
            {children}
        </AppStoreContext.Provider>
    )
}

export default AppStoreProvider;