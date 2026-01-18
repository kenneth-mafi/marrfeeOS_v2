import './subPageFrame.css';
import { AnimatePresence, motion } from 'framer-motion';


function SubPageFrame({ components, className="" }) {
  

  return (
    <AnimatePresence mode='wait'>
        <motion.div 
            className={`MBr-subpage-contr ${className}`}
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }} 
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