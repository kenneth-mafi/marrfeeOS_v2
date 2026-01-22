import { useEffect, useState } from "react";
import { AppStoreContext } from "../../contexts/contexts";
import { existsInList, findDictInList, hasRequiredAppFields } from "../../../marrfeeOSUtils/queryAction";
import { addToStore, fetchApps, installNewApp } from "./appStoreApi";

const AppStoreProvider = ({ children }) => {

    const [appList, setAppList] = useState([]);
    const [appStoreList, setAppStoreList] = useState([]);
    const [isLoadingApps, setIsLoadingApps] = useState(true);
    const [installCooldowns, setInstallCooldowns] = useState({});

    const refreshApps = async () => {
        const [appStore, appList] = await Promise.all([
            fetchApps("appStore"),
            fetchApps("appList")
        ]);
        setAppStoreList(appStore);
        setAppList(appList);
    };

    useEffect(() => {
        const initApps = async () => {
            try {
                await refreshApps();
            } finally {
                setIsLoadingApps(false);  
            }
        };

        initApps();
    }, []);

    const addToAppStore = async ( appData, appID ) => {
        if ( existsInList(appStoreList, "id", appID) ) return;
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

    const isInstallBuffering = (appID) => {
        const until = installCooldowns[appID];
        return Boolean(until && Date.now() < until);
    };

    const setInstallBuffer = (appID, bufferMs = 30000) => {
        const until = Date.now() + bufferMs;
        setInstallCooldowns(prev => ({ ...prev, [appID]: until }));
        setTimeout(() => {
            setInstallCooldowns(prev => {
                if (prev[appID] !== until) return prev;
                const { [appID]: _removed, ...rest } = prev;
                return rest;
            });
        }, bufferMs);
    };

    const installApp = async ( appID ) => {
        if (isInstallBuffering(appID)) return;
        const app = findDictInList(appStoreList, "id", appID)
        if (!app) return;

        const alreadyInstalled = findDictInList(appList, "id", appID)
        if (alreadyInstalled) return;

        setInstallBuffer(appID);
        const status = await installNewApp(appID)
        if (!status?.success) {
            console.log(status?.error);
            return false;
        }

        await refreshApps();
        return app;
    }

    const handleGet = async ( appID, text ) => {
        if (!(appID && text)) return;

        if (text === "Get") {
            try {
            const status = await installApp( appID );     
            if (!status) return;
            console.log("App Installed Successfully ✅");
                
            } catch (error) { console.log(error); }
            finally { }
        }
    }

    return (
        <AppStoreContext.Provider  
            value={{
                appList,
                appStoreList,
                isLoadingApps,
                addToAppStore,
                installApp,
                isInstallBuffering,
                handleGet
            }}
        >
            {children}
        </AppStoreContext.Provider>
    )
}

export default AppStoreProvider;
