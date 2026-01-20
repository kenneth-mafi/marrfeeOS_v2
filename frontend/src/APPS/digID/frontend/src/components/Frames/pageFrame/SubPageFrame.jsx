import { useLocation } from 'react-router-dom';
import './pageFrame.css';
import { motion } from 'framer-motion';

const STATIC_PAGES = [ "/homePage", ];


function SubPageFrame({ components, className="" }) {

  const location = useLocation();
  const isStaticPage = STATIC_PAGES.includes(location.pathname);
  

  return (
      <>
        {isStaticPage ? (
          <motion.div 
              className={`digId-subpage-contr ${className}`}
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
        ) : (
          <motion.div 
              className={`digId-subpage-contr ${className}`}
              key={location.pathname}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}  
          >
            {components.map((item, index) => {
              const PageComponent = item.Component;
              if (!PageComponent) return null;
              return <PageComponent key={item.id || index} {...item.props} />
            })}
          </motion.div>
        )}      
      </>



  );
}


export default SubPageFrame;