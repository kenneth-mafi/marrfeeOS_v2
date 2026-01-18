import AppGridContainer from '../components/AppGridContainer/AppGridContainer';
import { useAppsContext, useBreakpointContext, useTime } from '../hooks/useContexts';
import './screen.css';
import { useEffect } from "react";

function HomeScreen({  className = "" }) {
  const { appList } = useAppsContext();
  const { getViewport } = useBreakpointContext();
  const device = getViewport();
  const {changeTimeColor} = useTime();
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
