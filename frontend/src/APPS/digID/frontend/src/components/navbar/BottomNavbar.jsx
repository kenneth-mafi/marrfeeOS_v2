import './bottomNavbar.css';
import historyIcon  from '../../assets/history.png';
import settingsIcon from '../../assets/setting.png';
import { Link } from 'react-router-dom';

function BottomNavbar() {
    return(
        <nav className={`digId-bottom-nav`}>

          <Link className={`digId-bottom-nav-link`} to="">
              <img src={historyIcon} alt="history" className={`digId-nav-icon-normal`} />
              <p className={`digId-bottom-nav-link-text`} >History</p>              
          </Link>

          <Link className={`digId-bottom-nav-link`} to="/digIDApp/settingsPAge">
              <img src={settingsIcon} alt="settings" className={`digId-nav-icon-normal`} />
              <p className={`digId-bottom-nav-link-text`} >Settings</p>              
          </Link>

        </nav>
    )
}

export default BottomNavbar;