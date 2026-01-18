import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import DeviceFrame from './components/deviceFrame/DeviceFrame';
import { lazy, Suspense, useEffect } from 'react';
import { useAppStoreContext } from './marrfeeOSHooks/hooks/contexts';
import HomeScreen from './components/screens/HomeScreen';
import Screen from './components/screens/Screen';

// Browser
const MarrfeeBrowser = lazy(() => import('./MarrfeeBrowser').then(module => ({ default: module.MarrfeeBrowser })));

function MarrfeeOS() {

  const { addApp } = useAppStoreContext();
  
  useEffect(() => {
     // Dynamically import app registration functions so their code is not included
     // in the initial bundle. Each registration will call `addApp` with metadata.

  }, []);

  return (
    <BrowserRouter>
      <DeviceFrame>
        <Suspense fallback={<div style={{padding:20}}>Loading app...</div>}>
          <Routes>
            <Route element={<Screen />}>
              <Route index element={ <Navigate to="/homeScreen" replace /> } ></Route>
              <Route path="/homeScreen" element={ <HomeScreen /> } />


              {/* browser */}
              <Route path="/marrfeeBrowser/*" element={<MarrfeeBrowser />}></Route>

            </Route>
          </Routes>
        </Suspense>
      </DeviceFrame>
    </BrowserRouter>
  )
}

export default MarrfeeOS;
