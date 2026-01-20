import './LaunchPage.css';
import appIcon from '../../assets/secure.png';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDigIDStateContext } from '../../hooks/useContexts';

const LaunchPage = () => {
    const { state } = useLocation();
    const { isRegistered } = useDigIDStateContext();
    const navigate = useNavigate();
    
    useEffect(() => {
        const timer = setTimeout(() => {

            if ( state?.pathname ) {
                navigate('/digIDApp/authentificationPage', {state: state, replace: true});
            } 
            else if ( isRegistered ){
                navigate('/digIDApp/homePage',  {replace: true})
            } 
            else{
                navigate('/digIDApp/registrationPage', {replace: true})
            }
        }, 2000);
        return () => clearTimeout( timer );
    }, [])

    return (
        <motion.div 
            className={`digId-launch-page-container`}
            initial={{ scale: 1.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <img className={`digId-launch-icon`} src={ appIcon } alt="App Icon" />
            <h3 className={`digId-launch-name`}>DigID</h3>
        </motion.div>
    );
}
export default LaunchPage;