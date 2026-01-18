import { ViewportContext } from "../contexts/contexts";
import { useMediaQuery } from "../hooks/useMediaQuery";


const ViewportProvider = ({ children }) => {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1299px)");
  const isLaptop = useMediaQuery("(min-width: 1300px) and (max-width: 1656px)");
  const isDesktop = useMediaQuery("(min-width: 1656px)");

  const getViewport = () => {
      if (isMobile) return "mobile";
      else if (isTablet) return "tablet";
      else if (isLaptop) return "laptop";
      else if (isDesktop) return "desktop";
      else return null;
  }

  return (
    <ViewportContext.Provider
      value={{ getViewport }}
    >
      {children}
    </ViewportContext.Provider>
  );
};
use
export default ViewportProvider;
