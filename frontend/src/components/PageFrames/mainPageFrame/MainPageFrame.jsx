import { useLocation } from 'react-router-dom';
import './mainPageFrame.css';
import { AnimatePresence, motion } from 'framer-motion';
import { pageEffects } from '../pageEffects.js';

function MainPageFrame({ components, effect="zoomIn", className="" }) {
  
  const location = useLocation();

  return (
    <AnimatePresence mode='wait'>

        <motion.div 
            className={`main-page-frame-contr ${className}`}
            key={location.pathname}
            { ...pageEffects[effect] }
        >
    
          {components.map((component, index) => {
            const PageComponent = component.Component;
            if (!PageComponent) return null;
            
            return <PageComponent key={component.id || index} {...component.props} />
          })}

        </motion.div>
      
    </AnimatePresence>
  );
}

export default MainPageFrame;