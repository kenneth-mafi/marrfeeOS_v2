import appLogo from '../../../MarrfeeBrowser/src/assets/marrfee-logo.png';
import appStoreLogo from '../../../MarrfeeAppStore/src/assets/app.png';

const getDefaultApps = () => {
  return [
    {
      id: "marrfeeBrowser",
      appName: "Marrfee Browser",
      appStoreName: "Marrfee Browser",

      path: "/marrfeeBrowser",
      appLogo: appLogo,
      color: "whitesmoke",

      allowedDevices: ["desktop", "laptop", "mobile"],

      isInstalled: true,
      isSystemApp: true, 

      description: "A lightweight built-in browser for navigating apps and web content inside MarrfeeOS.",

      category: "System",
      type: "Core Application",
      size: "Built-in"
    },
    {
      id: "marrfeeAppStore",
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
      size: "Built-in"
    }
  ];
};


export default getDefaultApps;