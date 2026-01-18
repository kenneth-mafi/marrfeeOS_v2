import { useViewportContext } from '../../marrfeeOSHooks/hooks/contexts';
import './device-frame.css';
import './device-screen.css';


const DeviceFrame = ({ children }) => {
  const { getViewport } = useViewportContext();
  const device = getViewport();
  
  return (
    <div className={`device-frame ${device}-view`}>
      <div className={`device-border ${device}-border`}>

        {device === "mobile" && <div className="camera-container"></div>}
        {device === "laptop" && <div className="laptop-camera-container"></div>}
        {device === "laptop" && <div className="laptop-keyboard"></div>}
        
        {device === "desktop" && (
          <div className="desktop-stand">
            <p>Marrfee</p>
            <div className="stand-horizontal"></div>
          </div>
        )}

        <div className={`${device}-screen screen`}>
            {children}
        </div>
      </div>
    </div>
  );
};

export default DeviceFrame;
