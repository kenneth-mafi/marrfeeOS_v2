import "./AppStoreEssentialsList.css";
import AppStoreMiniAppRow from "../AppStoreMiniAppRow/AppStoreMiniAppRow";

export default function AppStoreEssentialsList({ title = "Essential Apps", apps = [] }) {
  return (
    <section className={`mOS-essentials`}>
      <div className={`mOS-essentials-header`}>
        <h4 className={`mOS-essentials-title`}>{title}</h4>
        <span className={`mOS-essentials-more`}>›</span>
      </div>

      <div className={`mOS-essentials-list`}>
        {apps.map((a) => (
          <AppStoreMiniAppRow
            key={a.id}
            icon={a.icon}
            name={a.name}
            category={a.category}
            onGet={a.onGet}
          />
        ))}
      </div>
    </section>
  );
}
