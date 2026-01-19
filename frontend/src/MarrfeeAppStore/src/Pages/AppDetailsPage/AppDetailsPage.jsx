import { useNavigate } from "react-router-dom";
import MainPageFrame from "../../../../components/PageFrames/mainPageFrame/MainPageFrame";
import ScrollArea from "../../../../components/ScrollArea/ScrollArea";
import AppDetailsHeroHeader from "../../components/AppDetailsHeroHeader/AppDetailsHeroHeader";
import AppDetailsRatingsPreview from "../../components/AppDetailsRatingsPreview/AppDetailsRatingsPreview";
import AppDetailsScreenshotRow from "../../components/AppDetailsScreenShotRow/AppDetailsScreenShotRow";
import AppDetailsStatsRow from "../../components/AppDetailsStatsRow/AppDetailsStatsRow";
import AppDetailsTopBar from "../../components/AppDetailsTopBar/AppDetailsTopBar";
import AppStoreTabBar from "../../components/AppStoreTabBar/AppStoreTabBar";
import "./AppDetailsPage.css";

export default function AppDetailsPage() {

  const navigate = useNavigate();
  const goBack = () => {
      navigate(-1);
  }
  const pageContent = [
    { Component: AppDetailsTopBar, props: { title: "Apps", onBack: goBack }  },
    {
      Component: () => (
        <ScrollArea>
          <AppDetailsHeroHeader title='Title' subtitle="Subtitle" />
          <AppDetailsStatsRow  />
          <AppDetailsScreenshotRow title='Headline' shots={["1", "2"]} />
          <AppDetailsRatingsPreview />
        </ScrollArea>
      ),
    },
    { Component: AppStoreTabBar, props: { active: "Apps" } },
  ];

  return (
    <MainPageFrame components={pageContent} className="mOS-appDetailsPage" effect="slideInRight" />
  );
}
