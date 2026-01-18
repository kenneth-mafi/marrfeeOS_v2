import { Link } from "react-router-dom";
import './appLogos.css';

const AppIcon = ({ path, appLogo, appName, color, device }) => {
   
    return (
        <Link to={path} className={`app-grid-item ${device}-app-grid-item`}>
            <div 
                className="icon-container"
                style={{background: color}}
                >
                <img src={appLogo} alt={appName} />
            </div>
            <span className="app-name">{appName}</span>
        </Link>
    );
};


export default AppIcon;