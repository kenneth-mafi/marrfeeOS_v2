import { motion } from "framer-motion";
import AppIcon from "./AppIcon";
import './appLogos.css';
import { useLocation } from "react-router-dom";
import { useViewportContext } from "../../marrfeeOSHooks/hooks/contexts";


const AppGridContainer = ({ apps=[] }) => {
    const location = useLocation();
    const { getViewport } = useViewportContext();
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