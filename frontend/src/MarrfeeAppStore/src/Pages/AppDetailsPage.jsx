import { useLocation, useNavigate } from "react-router-dom";
import MainPageFrame from "../../../components/PageFrames/mainPageFrame/MainPageFrame";
import ScrollArea from "../../../components/ScrollArea/ScrollArea";
import AppDetailsHeroHeader from "../components/AppDetailsHeroHeader/AppDetailsHeroHeader";
import AppDetailsRatingsPreview from "../components/AppDetailsRatingsPreview/AppDetailsRatingsPreview";
import AppDetailsScreenshotRow from "../components/AppDetailsScreenShotRow/AppDetailsScreenShotRow";
import AppDetailsStatsRow from "../components/AppDetailsStatsRow/AppDetailsStatsRow";
import AppDetailsTopBar from "../components/AppDetailsTopBar/AppDetailsTopBar";
import AppStoreTabBar from "../components/AppStoreTabBar/AppStoreTabBar";
import "./appStorePages.css";
import appLoaderMap from "../../../marrfeeOSHooks/GlobalProviders/AppStorePrivider/appLoader";

export default function AppDetailsPage() {
  const location = useLocation();
  const { appData } = location.state || {};
  const apiBase = (import.meta.env.VITE_API_URL || "http://localhost:8000").replace(/\/$/, "");
  const logoSrc = typeof appData.appLogo === "string" && appData.appLogo.startsWith("/static")
    ? `${apiBase}${appData.appLogo}`
    : appLoaderMap[appData.id].appLogo;
    
  const navigate = useNavigate();
  const goBack = () => {
      navigate(-1);
  }
  const pageContent = [
    { Component: AppDetailsTopBar, props: { onBack: goBack }  },
    {
      Component: () => (
        <ScrollArea effect="fade">
          <AppDetailsHeroHeader icon={logoSrc} title={appData.appName} subtitle={`${appData.description.slice(0, 25)}..`} color={appData.color} isInstalled={appData.isInstalled} />
          <AppDetailsStatsRow appData={appData} />
          <AppDetailsScreenshotRow title='Preview' shots={appData.screenshots} />
          <AppDetailsRatingsPreview />
        </ScrollArea>
      ),
    },
    { Component: AppStoreTabBar, props: { active: "Apps" } },
  ];

  return (
    <MainPageFrame components={pageContent} className="mOS-appsStorePage" effect="slideInRight" />
  );
}
