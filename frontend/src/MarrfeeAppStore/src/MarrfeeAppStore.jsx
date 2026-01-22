import { Route, Routes } from "react-router-dom";
import { useTime } from "../../marrfeeOSHooks/hooks/contexts";
import { lazy, Suspense, useEffect } from "react";
import LoadingPlaceholder from "../../components/loadingPlaceholder/LoadingPlaceholder";

const ProfilePage = lazy(() => import('./Pages').then(m => ({ default: m.ProfilePage })));
const AppDetailsPage = lazy(() => import('./Pages').then(m => ({ default: m.AppDetailsPage })));
const AppsHomePage = lazy(() => import('./Pages').then(m => ({ default: m.AppHomePage })));

const MarrfeeAppStore = () => {
    const { changeTimeColor  } = useTime();

    useEffect(() => {
        changeTimeColor("black");
    }, [changeTimeColor]);
    
    return (
        <Suspense fallback={ <LoadingPlaceholder /> } >
            <Routes>
                <Route index element={ <AppsHomePage />} />
                <Route path="homePage" element={ <AppsHomePage /> } />
                <Route path="appDetailsPage" element={ <AppDetailsPage /> } />
                <Route path="profilePage" element={ <ProfilePage /> } />
            </Routes>
        </Suspense>
    )
}

export default MarrfeeAppStore;
