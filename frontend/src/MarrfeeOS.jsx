import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import DeviceFrame from './components/deviceFrame/DeviceFrame';
import { Suspense, useEffect } from 'react';
import { useAppStoreContext } from './marrfeeOSHooks/hooks/contexts';
import HomeScreen from './components/screens/HomeScreen';
import Screen from './components/screens/Screen';
import appLoaderMap from './marrfeeOSHooks/GlobalProviders/AppStorePrivider/appLoader';

function MarrfeeOS() {

  const { addApp, appList, isLoadingApps } = useAppStoreContext();
  useEffect(() => {
     // Dynamically import app registration functions so their code is not included
     // in the initial bundle. Each registration will call `addApp` with metadata.

  }, []);

  if (isLoadingApps) {
    return (
      <DeviceFrame>
        <div style={{ padding: 20 }}>Loading apps...</div>
      </DeviceFrame>
    );
  }

  return (
    <BrowserRouter>
      <DeviceFrame>
        <Suspense fallback={<div style={{padding:20}}>Loading app...</div>}>
          <Routes>
            <Route element={<Screen />}>
              <Route index element={ <Navigate to="/homeScreen" replace /> } ></Route>
              <Route path="/homeScreen" element={ <HomeScreen /> } />

              {appList.map((app, index) => {
                const loader = appLoaderMap[app.id];
                if (!loader) return null;
                const Component = loader.Component;
                const absolutePath = `${app?.path}/*`;
                const KEY = app?.id ?? index;
                return <Route path={absolutePath} element={<Component />} key={KEY}/>
              })}

            </Route>
          </Routes>
        </Suspense>
      </DeviceFrame>
    </BrowserRouter>
  )
}

export default MarrfeeOS;
