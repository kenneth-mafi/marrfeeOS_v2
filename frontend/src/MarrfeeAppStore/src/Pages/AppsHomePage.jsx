import { useNavigate } from 'react-router-dom';
import MainPageFrame from '../../../components/PageFrames/mainPageFrame/MainPageFrame';
import ScrollArea from '../../../components/ScrollArea/ScrollArea';
import AppStoreCategoryChips from '../components/AppStoreCategoryChips/AppstoreCategoryChips';
import AppStoreEssentialsList from '../components/AppStoreEssentialList/AppStoreEssentialsList';
import AppStoreFeaturedBanner from '../components/AppStoreFeaturedBanner/AppStoreFeaturedBanner';
import AppStoreHeadlineRow from '../components/AppStoreHeadlineRow/AppStoreHeadlineRow';
import AppStoreTabBar from '../components/AppStoreTabBar/AppStoreTabBar';
import AppStoreTopBar from '../components/AppStoreTopBar/AppStoreTopBar';
import "./appStorePages.css";
import { useAppStoreContext } from '../../../marrfeeOSHooks/hooks/contexts';

export default function AppsHomePage() {
  const navigate = useNavigate();
  const { appStoreList } = useAppStoreContext();
  

  const chips = ["Finance", "Social Networking", "New", "Productivity", "Education"];

  const headlineItems = [
    { id: "h1", badge: "1" },
    { id: "h2", badge: "2" },
    { id: "h3", badge: "3" },
  ];

  const pageContent = [
    { Component: AppStoreTopBar, props: {onRightClick: () => { navigate("/marrfeeAppStore/profilePage")}} },
    {
      Component: () => (
        <ScrollArea>
          <AppStoreCategoryChips chips={chips} active='Finance'/>
          <AppStoreFeaturedBanner title='Title' subtitle='Text by editorial' />
          <AppStoreHeadlineRow items={headlineItems} title='Headline' />
          <AppStoreEssentialsList apps={appStoreList} title='Essential Apps' />
        </ScrollArea>
      ),
    },
    { Component: AppStoreTabBar },
  ];


  return (
    <MainPageFrame components={pageContent} className="mOS-appsStorePage" />
  );
}
