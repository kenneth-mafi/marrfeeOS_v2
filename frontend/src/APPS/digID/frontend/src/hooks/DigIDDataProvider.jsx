import { useEffect, useState } from "react";
import { DigIDDataContext } from "./contexts";

const DigIDDataProvider = ({ children }) => {

    const [ userData, setUserData ] = useState({});
    const [ isRegistered, setIsRegistered ] = useState(false);
    const [ hasSecurityCode, setHasSecurityCode ] = useState(false);

    const API = import.meta.env.VITE_API_URL;

    const sendRequest = async ( dataObj, endpoint, method="POST", ) => {
        if ( !( dataObj && endpoint ) ) return { success: false, error: "No data" };

        const reqObj = {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: dataObj ? JSON.stringify( dataObj ) : undefined,
        };

        try {
            const res = await fetch(`${API}/api/auth/${endpoint}`, reqObj);
            const data = await res.json();

            if ( !data?.success ) {
                console.error("❌ Invalid User:", data);
                return data;
            }
            console.log("✅ Valid User");
            console.log("DPr USER DATA: ", data.userData);
            
            if (data?.userData && endpoint === 'register') {
                setUserData(prev => ({ ...prev, ...data.userData }));
                setIsRegistered(true);
                console.log("DPr DATA: ", data);
            }
   
            return data;
            
        } catch (err) {
            console.error("Fetch failed:", err);
            return { success: false, error: "Network error" };  
        }
    }


    return (
        <DigIDDataContext.Provider value={{
            userData,
            isRegistered, 
            sendRequest,
            setHasSecurityCode,
            hasSecurityCode
        }}>
            {children}
        </DigIDDataContext.Provider>
    )
}
export default DigIDDataProvider;