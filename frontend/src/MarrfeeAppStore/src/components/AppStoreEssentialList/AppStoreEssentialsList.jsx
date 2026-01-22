import "./AppStoreEssentialsList.css";
import AppStoreMiniAppRow from "../AppStoreMiniAppRow/AppStoreMiniAppRow";
import appLoaderMap from "../../../../marrfeeOSHooks/GlobalProviders/AppStorePrivider/appLoader";
import { useAppStoreContext } from "../../../../marrfeeOSHooks/hooks/contexts";
import { useNavigate } from "react-router-dom";

export default function AppStoreEssentialsList({ title = "Essential Apps", apps = [], isInstallBuffering }) {
  const navigate = useNavigate();
  const { handleGet } = useAppStoreContext();

  return (
    <section className={`mOS-essentials`}>
      <div className={`mOS-essentials-header`}>
        <h4 className={`mOS-essentials-title`}>{title}</h4>
        <span className={`mOS-essentials-more`}>›</span>
      </div>

      <div className={`mOS-essentials-list`}>
        {apps.map((a) => {

          const apiBase = (import.meta.env.VITE_API_URL || "http://localhost:8000").replace(/\/$/, "");
          const logoSrc = typeof a.appLogo === "string" && a.appLogo.startsWith("/static")
            ? `${apiBase}${a.appLogo}`
            : appLoaderMap[a.id].appLogo;

          const handleONGet = async () => {
            if(!(a && a.path && a.id)) return;
            const text = a?.isInstalled ? "Open" : "Get";
            if (text === "Get") await handleGet(a.id, text);
            else navigate(a.path, {replace: true})
          }
            
          return <AppStoreMiniAppRow
            key={a.id}
            icon={ logoSrc }
            name={a.appName}
            category={a.category}
            color={a.color}
            onGet={handleONGet}
            isBuffering={isInstallBuffering ? isInstallBuffering(a.id) : false}
            appData={a}
          />
        })}
      </div>
    </section>
  );
}
