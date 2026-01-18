import { motion } from "framer-motion";
import AppIcon from "./AppIcon";
import './appLogos.css';
import { useLocation } from "react-router-dom";
import { useBreakpointContext } from "../../hooks/useContexts";

/**
 * AppGridContainer
 *
 * Renders a grid of application icons. Expects an `apps` array where each
 * entry is an object with the following shape:
 * {
 *   id: string,
 *   appName: string,
 *   appLogo: string,
 *   path: string,
 *   color?: string
 * }
 *
 * @param {Object} props
 * @param {Array<Object>} [props.apps=[]] - Array of app descriptors
 * @returns {JSX.Element} A motion-enabled grid of `AppIcon` components
 */
const AppGridContainer = ({ apps=[] }) => {
    const location = useLocation();
    const {getViewport} = useBreakpointContext();
    const device = getViewport();

    return(
        <motion.div 
            className={`app-grid-container ${device}-app-grid-container`}
            key={location.pathname}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            exit={{ scale: 1 }}
            transition={{ duration: 0.25 }} 
        >
            {apps.map((app, index) => {
                const KEY = app.id ?? index;
                return (<AppIcon {...app} key={KEY} device={device} />)
            })}
        </motion.div>
    )
}

export default AppGridContainer;