import { useState } from 'react';
import './rpsheader.css';
import infoIcon from '../../assets/info.png'
import exitIcon from '../../assets/exit.png'
import Sidebar from '../sidebar/SideBar';
// ============= SIDE BAR CONTENT ============
const sidebarData = {
    menuData: [
      {
        icon: infoIcon,
        label: "Rules",
        to: "/rpsGameApp/rpsRulesPage"
      },{
        icon: exitIcon,
        label: "Exit",
        to: "/homeScreen"
      }
    ],
    buttonType: {
      text: "Exit",
      icon: exitIcon,
      dark: true
    }
}

function MainHeader() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      setSidebarOpen(prev => !prev)
    }

  const menuData = sidebarData.menuData;
  const buttonType = sidebarData.buttonType;

  return (
    <div className="rps-header">
        
        <Sidebar sidebarOpen={sidebarOpen} menuData={menuData} buttonData={buttonType} />

        <div className="header-left-section">
            <div className={`nav-bar-hamburger ${sidebarOpen ? "active" : ""}`} onClick={toggleSidebar}>
                  <div className="nav-bar-hamburger-line"></div>
                  <div className="nav-bar-hamburger-line"></div>
                  <div className="nav-bar-hamburger-line"></div>
            </div>
        </div>
        <div className="header-right-section">    
        </div>
    </div>
  )
}

export default MainHeader;