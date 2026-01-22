import { AnimatePresence, motion } from "framer-motion"
import startImg from '../../assets/game-development.png';
import './launchPage.css';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LaunchPage() {
      const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/rpsGameApp/rpsGamePage", { replace: true });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <AnimatePresence mode="wait" >
        <motion.div
            className="launch-page"
            key={location.pathname}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}            
        >
            <div className="launch-hero">
            
                <div className="launch-illustration welcome" >
                    <img src={startImg} alt="crypto" />
                </div>
            </div>
          
        </motion.div>
    </AnimatePresence>
  )
}

export default LaunchPage;