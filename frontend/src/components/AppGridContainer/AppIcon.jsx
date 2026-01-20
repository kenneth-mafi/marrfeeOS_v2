import { Link } from "react-router-dom";
import './appLogos.css';

const AppIcon = ({ path, appLogo, appName, color, device }) => {
    const apiBase = (import.meta.env.VITE_API_URL || "http://localhost:8000").replace(/\/$/, "");
    const logoSrc = typeof appLogo === "string" && appLogo.startsWith("/static")
        ? `${apiBase}${appLogo}`
        : appLogo;

    return (
        <Link to={path} className={`app-grid-item ${device}-app-grid-item`}>
            <div 
                className="icon-container"
                style={{background: color}}
                >
                <img src={logoSrc} alt={appName} />
            </div>
            <span className="app-name">{appName}</span>
        </Link>
    );
};


export default AppIcon;
