import "./AppStoreEssentialsList.css";
import AppStoreMiniAppRow from "../AppStoreMiniAppRow/AppStoreMiniAppRow";
import appLoaderMap from "../../../../marrfeeOSHooks/GlobalProviders/AppStorePrivider/appLoader";

export default function AppStoreEssentialsList({ title = "Essential Apps", apps = [] }) {


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
            
          return <AppStoreMiniAppRow
            key={a.id}
            icon={ logoSrc }
            name={a.appName}
            category={a.category}
            color={a.color}
            onGet={a.onGet}
            appData={a}
          />
        })}
      </div>
    </section>
  );
}
