import { Link } from "react-router-dom";
import './appLogos.css';

/**
 * AppIcon
 *
 * Presents a single app icon and label as a link to the app's route.
 *
 * @param {Object} props
 * @param {string} props.path - Route path to navigate to (e.g. '/financeApp')
 * @param {string} props.appLogo - Image path or URL for the app icon
 * @param {string} props.appName - Display name for the app
 * @param {string} [props.color] - Optional background color for the icon container
 *
 * @returns {JSX.Element} A linked icon with image and label
 */
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