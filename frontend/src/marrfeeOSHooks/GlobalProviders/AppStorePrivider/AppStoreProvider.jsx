import { useState } from "react";
import { AppStoreContext } from "../../contexts/contexts";
import { dictExistsInList, hasRequiredAppFields } from "../../../marrfeeOSUtils/comparison";
import getDefaultApps from "./defaultApps";

const AppStoreProvider = ({ children }) => {

    const [appList, setAppList] = useState( getDefaultApps() );
    const [appStoreList, setAppStoreList] = useState( getDefaultApps() );


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