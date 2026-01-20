import { Link } from 'react-router-dom';
import './menuLinkItem.css';
import arrowIcon from '../../assets/right-arrow.png'

const MenuLinkItem = ({ to, label, icon, color, exit=false }) => {
    return(
        <Link to={to} className={`mOS-menu-link-item`}>
            <div className={`mOS-menu-link-left`}>
                <img src={icon} alt="icon" className={`mOS-menu-link-left-icon`} />
                <span className={`mOS-menu-link-label`} style={{color: `${color ? "red" : ""}`}} >{label}</span>
            </div>
            <div className={`mOS-menu-link-right`} >
                {!exit && <img src={arrowIcon} alt="icon" className={`mOS-menu-link-right-icon`}  />}
            </div>
        
        </Link>
    )
}

export default MenuLinkItem;