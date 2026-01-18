import { useAppStoreContext, useTime, useViewportContext } from '../../marrfeeOSHooks/hooks/contexts';
import AppGridContainer from '../AppGridContainer/AppGridContainer';
import './screen.css';
import { useEffect } from "react";

function HomeScreen({  className = "" }) {
  const { appList } = useAppStoreContext();
  const { getViewport } = useViewportContext();
  const device = getViewport();
  const { changeTimeColor } = useTime();
  const allowedApps = appList.filter(app => app.allowedDevices.includes(device));
  

  useEffect(() => {
      changeTimeColor("white");
  })
  
  
  return (

    <div className={`screen-child-container ${device}-screen-child ${className}`}>
        <AppGridContainer apps={allowedApps} />
    </div>
    
  );
}

export default HomeScreen;
