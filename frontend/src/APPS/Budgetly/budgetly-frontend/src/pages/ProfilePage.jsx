import ProfileCard from "../components/cards/ProfileCard";
import SubHeader from "../components/header/Header2";
import profileIcon from '../assets/user.png'
import infoIcon from '../assets/info.png'
import helpIcon from '../assets/question.png'
import settingsIcon from '../assets/setting.png'
import exitIcon from '../assets/exit.png'
import SubPageFrame from "./subPageFrame/SubPageFrame";
import { ColumnGrid } from "../components/grids/Grids";
import { LinkCard } from "../components/cards/LinkCard";
import { WideButton } from "../components/buttons/WideButton";
import MainPageFrame from "./mainPageFrame/MainPageFrame";
import { useNavigate } from "react-router-dom";
import TextCard from "../components/cards/TextCard";



function ProfilePage() {
    const navigate = useNavigate();

    const exitApp = () => {
        navigate("/homeScreen");
    }

    const profilePageComponents = [

        // HEADER ========
        { 
            Component: SubHeader,
            props: {
              title: "Profile",
              alt: "Back"
            } 
        },

        // Profile Card ============
        {
          Component: ProfileCard,
          props: {
            icon: profileIcon,
            alt: "Profile picture",
            name: "Ohunwu Kenneth",
            email: "@KennethOhunwu19",
            buttonData: {
              text1: "Contact Info",
              icon1: profileIcon,
              text2: "Settings",
              icon2: settingsIcon
            }
          }
        },

        // Help section
        {
          Component: ColumnGrid,
          props: {
            items: [
              {
                id: "098",
                Component: LinkCard,
                props: {
                  icon: helpIcon,
                  label: "Help",
                  to: "/financeApp/helpPage"
                }
              },
              {
                id: "342",
                Component: LinkCard,
                props: {
                  icon: infoIcon,
                  label: "About",
                  to: "/financeApp/aboutPage"
                }
              }
            ]
          }
        },
        {
          Component: TextCard,
          props: {texts: ["Budgetly v1.0.1"]}
        },

        // Log out
        {
          id: "sign out",
          Component: WideButton,
          props: {
            text: "Sign out",
            icon: exitIcon,
            dark: true,
            onClick: exitApp
          }
        }

    ];

    return <MainPageFrame components={profilePageComponents}  bottomNav={false}  effect="slideInRight" />;
}

export default ProfilePage;