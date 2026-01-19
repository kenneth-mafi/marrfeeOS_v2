import { useState } from 'react';
import profileIcon from '../../assets/user.png'
import helpIcon from '../../assets/support.png'
import settingsIcon from '../../assets/setting(1).png'
import exitIcon from '../../assets/log-out.png'
import { Link } from 'react-router-dom';
import { Links } from '../Links/Links';
import closeIcon from '../../assets/close.png';
import hamburgerIcon from '../../assets/menu.png'
import './header.css';
import Sidebar from '../Sidebar/SideBar';
import newReleaseImg from '../../assets/react.svg';


function MainHeader() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      setSidebarOpen(prev => !prev)
    }
    
    // ============= SIDE BAR CONTENT ============
    const sidebarData = {
        menuData: [
          {
            Component: Links,
            props: {
              id: generateId(),
              title: "Menu",
              buttonData: {
                className: "MS-sidebar-return-btn",
                onClick: toggleSidebar,
                src: closeIcon
              }
            }
          },
          {
            id: generateId(),
            icon: profileIcon,
            label: "My Account",
            to: "/marrfeeShopping/profilePage"
          },
          {
            id: generateId(),
            icon: shoppingBag,
            label: "My Orders",
            to: "/marrfeeShopping/trackOrdersPage"
          },
          {
            id: generateId(),
            icon: newReleaseImg,
            label: "New Releases",
            to: "/marrfeeShopping/newReleasePage"
          },
          {
            id: generateId(),
            icon: settingsIcon,
            label: "Settings",
            to: "/"
          },
          {
            Component: Seperator,
            props: {
              id: generateId(),
            }
          },
          {
            id: generateId(),
            icon: helpIcon,
            label: "Contact Us",
            to: "/"
          },
          {
            Component: Seperator,
            props: {
              id: generateId(),
            }
          },
          {
            id: generateId(),
            icon: exitIcon,
            label: "Log Out",
            to: "/homeScreen"
          }
        ]
    }

  const menuData = sidebarData.menuData;

  return (
    <div className="MS-header">
        
        <Sidebar sidebarOpen={sidebarOpen}  menuData={menuData} />

        <div className="MS-header-left-section">
            <button 
                type='button' 
                className='MS-hamburger-btn'
                onClick={toggleSidebar}
            >
                <img src={hamburgerIcon} alt="menu" />
            </button>
        </div>
        <div className="MS-header-right-section">
            <Link className="MS-notification-contr" to="/marrfeeShopping/shoppingBagPage" >
              <img src={shoppingBag} alt="shopping" className='MS-bell-icon' />
            </Link>

            <Link className="MS-user-contr" to="/marrfeeShopping/profilePage" >
              <img src={profileIcon} alt="user icon" className='MS-user-icon' />
            </Link>
            
        </div>
    </div>
  )
}

export default MainHeader;