import { sendAPIRequest } from "../../../marrfeeOsAPI/marrfeeOsAPI"
import { filterListBy, hasRequiredAppFields, } from "../../../marrfeeOSUtils/queryAction";

const APPS = async () => {
    const appsData = await sendAPIRequest("apps/get-all-apps", {}, "GET")
    if (!appsData?.success) return { success: false, error: appsData?.error };
    
    return appsData.apps;
}

export const fetchApps = async ( destination ) => {
    if (!destination) return [];
    const apps = await APPS();
    if (!apps) return;  
    
    if (destination === "appStore") return  filterListBy( apps, 'isSystemApp', false )
    if (destination === "appList") return  filterListBy( apps, 'isInstalled', true )

    console.error("Unrecognized destination");
    return;
}


export const addToStore = async (appMetaData) => {
  if (!hasRequiredAppFields(appMetaData)) {
    console.log("⚠️ Incomplete App Data");
    return { success: false, error: "Incomplete App Data" };
  }

  const res = await sendAPIRequest("apps/launch-app", appMetaData, "POST");
  return res;
};


export const installNewApp = async (appID) => {
    if (!appID) return { success: false, error: "Missing App ID" };
    const res = await sendAPIRequest("apps/install-app", {"id": appID}, "POST")
    return res
}