import { useLocation } from 'react-router-dom';
import './subPageFrame.css';
import { AnimatePresence, motion } from 'framer-motion';
import { pageEffects } from '../../../../../../components/PageFrames/pageEffects';

function SubPageFrame({ components, effect="fadeFast" }) {

  const location = useLocation();

  return (
    <AnimatePresence mode='wait'>
        <motion.div 
            className="subpage-contr"
            key={location.pathname}
            { ...pageEffects[effect] }
        >
          {components.map((item, index) => {
            const PageComponent = item.Component;
            if (!PageComponent) return null;
            return <PageComponent key={item.id || index} {...item.props} />
          })}
        </motion.div>
      
    </AnimatePresence>


  );
}


export default SubPageFrame;