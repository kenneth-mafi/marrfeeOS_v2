import { Route, Routes } from "react-router-dom";
import { useTime } from "../../marrfeeOSHooks/hooks/contexts";
import { useEffect } from "react";
import AppsHomePage from "./Pages/AppsHomePage";
import AppDetailsPage from "./Pages/AppDetailsPage";
import ProfilePage from "./Pages/ProfilePage";

const MarrfeeAppStore = () => {
    const { changeTimeColor  } = useTime();

    useEffect(() => {
        changeTimeColor("black");
    }, [changeTimeColor]);
    
    return (
        <Routes>
            <Route index element={ <AppsHomePage />} />
            <Route path="homePage" element={ <AppsHomePage /> } />
            <Route path="appDetailsPage" element={ <AppDetailsPage /> } />
            <Route path="profilePage" element={ <ProfilePage /> } />
        </Routes>
    )
}

export default MarrfeeAppStore;
