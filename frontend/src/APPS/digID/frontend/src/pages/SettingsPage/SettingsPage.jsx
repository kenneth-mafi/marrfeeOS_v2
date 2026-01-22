import { ColumnGrid } from '../../components/GridContainers/ColumnGrid';
import Header from '../../components/header/Header';
import MenuLinkItem from '../../components/LinkItem/MenuLinkItem';
import { useDigIDStateContext } from '../../hooks/useContexts';
import './settingsPage.css';
import appLogo from '../../assets/secure.png';
import supportIcon from '../../assets/support.png';
import historyIcon  from '../../assets/history.png';
import trashIcon  from '../../assets/trash.png';
import setUpPinIcon  from '../../assets/pin.png';
import editPinIcon  from '../../assets/code.png';
import exitIcon from '../../assets/log-out.png';
import MainPageFrame from '../../components/Frames/pageFrame/MainPageFrame';


const SettingsPage = () => {
    const { hasSecurityCode } = useDigIDStateContext();

    const pinSetupLink = hasSecurityCode ? {

            id: "akjjkasjaoobgweiuieixn",
            icon: editPinIcon,
            label: "Change security code",  
            to: "/digIDApp/changePinPage",

          } : {

            id: "akjjkasjieixqkqbn",
            icon: setUpPinIcon,
            label: "Set up security code",
            to: "/digIDApp/pinSetupPage",

          }

    const settingsList = [
        
        pinSetupLink,
        {
            id: "akjjkasjieixn",
            icon: historyIcon,
            label: "My History",
        },
        {
            id: "akjjkcqeeixn0",
            icon: supportIcon,
            label: "Support",            
        },
        {
            id: "akjjkcqdb91qeeixn0",
            icon: exitIcon,
            label: "Exit",    
            to: "/homeScreen"        
        },
        {
            id: "akjjkaseppepwbejieixn",
            icon: trashIcon,
            label: "Delete DigID",
            color: "red"
        }
    ]

    const pageContent = [
        {
            Component: Header,
            props: {
                title: "Settings",
                logo: appLogo,
            }
        },
        {
            Component: ColumnGrid,
            props: {
                items: settingsList,
                Component: MenuLinkItem
            }
        }
    ];

    return <MainPageFrame components={pageContent} className='digId-settings-page' />
}

export default SettingsPage;