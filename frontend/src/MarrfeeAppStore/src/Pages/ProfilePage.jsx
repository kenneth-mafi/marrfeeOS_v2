import { ColumnGrid } from "../../../components/AppGridContainer/ColumnGrid";
import AppStoreProfileHeaderCard from "../components/AppStoreProfileCard/AppStoreProfileCard";
import MenuLinkItem from "../components/LinkItem/MenuLinkItem";
import signOutIcon from '../assets/log-out.png';
import "./appStorePages.css";
import MainPageFrame from "../../../components/PageFrames/mainPageFrame/MainPageFrame";
import ScrollArea from '../../../components/ScrollArea/ScrollArea';
import { useNavigate } from "react-router-dom";
import AppDetailsTopBar from "../components/AppDetailsTopBar/AppDetailsTopBar";

const ProfilePage = () => {
  const navigate = useNavigate();
  const goBack = () => {
      navigate(-1);
  }
  const menuItems = [
    { id: "mwec6", to: "/homeScreen", label: "Sign Out", icon: signOutIcon, exit: true, color: "red" },
  ];

  const pageContent = [
        {Component: AppDetailsTopBar, props: { title: "Account", onBack: goBack }  },
        {
          Component: AppStoreProfileHeaderCard,
          props: {
                name: "John Doe",
                email: "example@email.com",
                avatarSrc: null,
            },
        },
        {
          Component: () => (
            <ScrollArea>
              <ColumnGrid items={menuItems} Component={MenuLinkItem} />
            </ScrollArea>
          ),
        }
  ];

  return (
    <MainPageFrame components={pageContent} className="mOS-appsStorePage" effect="slideInRight"  />
  );

}

export default ProfilePage;