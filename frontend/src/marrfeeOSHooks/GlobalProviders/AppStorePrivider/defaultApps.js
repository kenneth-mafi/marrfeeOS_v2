import appLogo from '../../../MarrfeeBrowser/src/assets/marrfee-logo.png';
import appStoreLogo from '../../../MarrfeeAppStore/src/assets/app.png';
import { lazy } from 'react';

// Browser
const MarrfeeBrowser = lazy(() => import('../../../MarrfeeBrowser').then(module => ({ default: module.MarrfeeBrowser })));
const MarrfeeAppStore = lazy(() => import('../../../MarrfeeAppStore').then(module => ({ default: module.MarrfeeAppStore })));

const getDefaultApps = () => {
  return [
    {
      id: "marrfeeBrowser",
      appName: "Marrfee Browser",
      appStoreName: "Marrfee Browser",

      path: "/marrfeeBrowser",
      Component: MarrfeeBrowser,
      appLogo: appLogo,
      color: "whitesmoke",

      allowedDevices: ["desktop", "laptop", "mobile"],

      isInstalled: true,
      isSystemApp: true, 

      description: "A lightweight built-in browser for navigating apps and web content inside MarrfeeOS.",

      category: "System",
      type: "Core Application",
      size: "Built-in",

      keywords: [],

    },
    {
      id: "marrfeeAppStore",
      Component: MarrfeeAppStore,
      appName: "App Store",
      appStoreName: "Marrfee App Store",

      path: "/marrfeeAppStore",
      appLogo: appStoreLogo, 
      color: "#5c70e0",

      allowedDevices: ["mobile"],

      isInstalled: true,
      isSystemApp: true,  

      description: "Browse, download, and manage apps available for MarrfeeOS.",

      category: "System",
      type: "Core Application",
      size: "Built-in",

      keywords: [],

    }
  ];
};


export default getDefaultApps;