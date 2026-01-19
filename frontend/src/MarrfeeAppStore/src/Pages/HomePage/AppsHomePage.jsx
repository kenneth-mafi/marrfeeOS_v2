import MainPageFrame from '../../../../components/PageFrames/mainPageFrame/MainPageFrame';
import ScrollArea from '../../../../components/ScrollArea/ScrollArea';
import AppStoreCategoryChips from '../../components/AppStoreCategoryChips/AppstoreCategoryChips';
import AppStoreEssentialsList from '../../components/AppStoreEssentialList/AppStoreEssentialsList';
import AppStoreFeaturedBanner from '../../components/AppStoreFeaturedBanner/AppStoreFeaturedBanner';
import AppStoreHeadlineRow from '../../components/AppStoreHeadlineRow/AppStoreHeadlineRow';
import AppStoreTabBar from '../../components/AppStoreTabBar/AppStoreTabBar';
import AppStoreTopBar from '../../components/AppStoreTopBar/AppStoreTopBar';
import "./AppsHomePage.css";

export default function AppsHomePage() {
  const chips = ["Finance", "Social Networking", "New", "Productivity", "Education"];

  const headlineItems = [
    { id: "h1", badge: "1" },
    { id: "h2", badge: "2" },
    { id: "h3", badge: "3" },
  ];

  const essentialsApps = [
    { id: "e1", name: "App Name", category: "Food & Drink" },
    { id: "e2", name: "App Name", category: "Food & Drink" },
    { id: "e3", name: "App Name", category: "Food & Drink" },
    { id: "e4", name: "App Name", category: "Food & Drink" },
    { id: "e5", name: "App Name", category: "Food & Drink" },
    { id: "e6", name: "App Name", category: "Food & Drink" },
    { id: "e7", name: "App Name", category: "Food & Drink" },
    { id: "e8", name: "App Name", category: "Food & Drink" },
  ];

  const pageContent = [
    { Component: AppStoreTopBar },
    {
      Component: () => (
        <ScrollArea>
          <AppStoreCategoryChips chips={chips} active='Finance'/>
          <AppStoreFeaturedBanner title='Title' subtitle='Text by editorial' />
          <AppStoreHeadlineRow items={headlineItems} title='Headline' />
          <AppStoreEssentialsList apps={essentialsApps} title='Essential Apps' />
        </ScrollArea>
      ),
    },
    { Component: AppStoreTabBar },
  ];


  return (
    <MainPageFrame components={pageContent} className="mOS-appsHomePage" />
  );
}
