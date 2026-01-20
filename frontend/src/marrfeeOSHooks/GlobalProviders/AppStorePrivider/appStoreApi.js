import { sendAPIRequest } from "../../../marrfeeOsAPI/marrfeeOsAPI"
import { filterListBy, } from "../../../marrfeeOSUtils/queryAction";

const APPS = async () => {
    const appsData = await sendAPIRequest("apps/get-all-apps", {}, "GET")
    if (!appsData?.success) return { success: false, error: appsData?.error };
    
    return { success: true, apps: appsData.apps }
}

export const fetchApps = async ( destination ) => {
    if (!destination) return [];
    const apps = await APPS();
    if (!apps?.success) return [];  

    if (destination === "appStore") return  filterListBy( apps.apps, 'isSystemApp', false )
    if (destination === "appList") return  filterListBy( apps.apps, 'isInstalled', true )

    console.error("Unrecognized destination");
    return []
}
