import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import DeviceFrame from './components/deviceFrame/DeviceFrame';
import { Suspense, useEffect } from 'react';
import { useAppStoreContext } from './marrfeeOSHooks/hooks/contexts';
import HomeScreen from './components/screens/HomeScreen';
import Screen from './components/screens/Screen';


function MarrfeeOS() {

  const { addApp, appList } = useAppStoreContext();
  
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

              {appList.map((app, index) => {
                const Component = app?.Component ?? null;
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
