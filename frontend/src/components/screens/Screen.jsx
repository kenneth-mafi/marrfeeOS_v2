import './screen.css';
import { Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';


function Screen() {
    const {time, timeColor} = useTime();
    const {getViewport} = useBreakpointContext();
    const device = getViewport();
    return (
      <div 
        className="main-screen-container"
        style={{color: timeColor}}  
      >
            <div className={`time-container ${device}-time-container`}>
                <div className="time-section"><span>{time}</span></div>
                <div className="wifi-battery-contr"></div>
            </div>
          <AnimatePresence mode='wait'>
              <Outlet />
          </AnimatePresence>
      </div>
    );
}

export default Screen;
