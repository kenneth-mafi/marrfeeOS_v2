import { useState } from 'react';
import notifBell from '../../assets/notification.png';
import userIcon from '../../assets/user.png';
import '../header/header.css';
import profileIcon from '../../assets/user.png'
import infoIcon from '../../assets/info.png'
import loanIcon from '../../assets/personal.png'
import helpIcon from '../../assets/question.png'
import settingsIcon from '../../assets/setting.png'
import budgetIcon from '../../assets/budget.png'
import exitIcon from '../../assets/exit.png'
import Sidebar from '../sidebar/SideBar';
import savingsIcon from '../../assets/savings.png'
import { Link } from 'react-router-dom';
// ============= SIDE BAR CONTENT ============
const sidebarData = {
    profileData: {
        mainText: "Kenneth Ohunwu",
        caption: "@KennethOhunwu19",
        img: profileIcon,
        alt: "profile photo",
        to: "/financeApp/profilePage"
    },
    menuData: [
      {
        icon: savingsIcon,
        label: "Savings",
        to: "/financeApp/savingsPage"
      },
      {
        icon: budgetIcon,
        label: "Budgets",
        to: "/financeApp/budgetPage"
      },
      {
        icon: loanIcon,
        label: "Loans",
        to: "/financeApp/loansPage"
      },
      {
        icon: settingsIcon,
        label: "Settings",
        to: "#"
      },
      {
        icon: infoIcon,
        label: "About",
        to: "/financeApp/aboutPage"
      },
      {
        icon: helpIcon,
        label: "Help",
        to: "/financeApp/helpPage"
      }
    ],
    buttonType: {
      text: "Log out",
      icon: exitIcon,
      dark: true
    }
}

function MainHeader() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      setSidebarOpen(prev => !prev)
    }


  const profileData = sidebarData.profileData;
  const menuData = sidebarData.menuData;
  const buttonType = sidebarData.buttonType;

  return (
    <div className="header">
        
        <Sidebar sidebarOpen={sidebarOpen} profileData={profileData} menuData={menuData} buttonData={buttonType} />

        <div className="header-left-section">
            <div className={`nav-bar-hamburger ${sidebarOpen ? "active" : ""}`} onClick={toggleSidebar}>
                  <div className="nav-bar-hamburger-line"></div>
                  <div className="nav-bar-hamburger-line"></div>
                  <div className="nav-bar-hamburger-line"></div>
            </div>
        </div>
        <div className="header-right-section">
            <Link className="notification-contr">
              <img src={notifBell} alt="notification bell" className='bell-icon' />
            </Link>

            <Link className="user-contr" to="/financeApp/profilePage" >
              <img src={userIcon} alt="user icon" className='user-icon' />
            </Link>
            
        </div>
    </div>
  )
}

export default MainHeader;