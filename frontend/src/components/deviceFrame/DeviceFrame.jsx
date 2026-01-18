import './device-frame.css';
import './device-screen.css';
import { useBreakpointContext } from '../hooks/useContexts';

/**
 * DeviceFrame
 *
 * A visual wrapper component that simulates different device frames
 * (mobile, tablet, laptop, desktop) based on the provided `device` type.
 * It renders decorative UI elements such as cameras, keyboards, and stands
 * and displays arbitrary content inside a clipped screen area.
 *
 * This component is purely presentational and does not control layout
 * responsiveness — it is intended to visually represent a device preview.
 *
 * @component
 * @param {Object} props - Component props
 * @param {"mobile" | "tablet" | "laptop" | "desktop"} [props.device="mobile"]
 *        Determines which device frame and decorations to render.
 * @param {boolean} [props.showBottomNav=false]
 * Controls whether the bottom navigation is rendered.
 * @param {React.ReactNode[]} [props.content=[]]
 *        Content rendered inside the device screen area.
 * 
 *        EXPECTED CONTENT PROPS LAYOUT
 *        content = {
 *             main: [],
 *             bottomNav: []
 *           }

 *
 * @returns {JSX.Element} A styled device frame containing the provided content.
 * 
 * EXAMPLE USAGE:
 *         <DeviceFrame
 *           device="laptop"
 *           content={
 *            main: [
 *                {
 *                  id: generateId(),
 *                  Component: Input,
 *                  props: {
 *                      label: "First name", 
 *                      type: "text",
 *                      name: "first-name",
 *                      placeholder: "Enter first name",
 *                      id: generateId(),
 *                  }                
 *                }
 *            ],
 *            bottomNavbar: [
 *                {
 *                  id?: string,
 *                  to: string,
 *                  label: string,
 *                  icon?: string,
 *                  iconClassName?: string,
 *                  className?: string
 *                },
 *            ]
 *           }
 *         />
 *         
 *
 */


const DeviceFrame = ({ children }) => {
  const {getViewport} = useBreakpointContext();
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
