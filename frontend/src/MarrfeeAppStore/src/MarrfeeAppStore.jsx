import { Route, Routes } from "react-router-dom";
import { useTime } from "../../marrfeeOSHooks/hooks/contexts";
import { useEffect } from "react";
import AppsHomePage from "./Pages/HomePage/AppsHomePage";
import AppDetailsPage from "./Pages/AppDetailsPage/AppDetailsPage";

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
        </Routes>
    )
}

export default MarrfeeAppStore;
