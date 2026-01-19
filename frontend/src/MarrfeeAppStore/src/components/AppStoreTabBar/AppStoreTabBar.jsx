import "./AppStoreTabBar.css";

export default function AppStoreTabBar({ active = "Apps", onChange }) {
  const tabs = ["Today", "Games", "Apps", "Arcade", "Search"];

  return (
    <nav className={`mOS-tabBar`}>
      {tabs.map((t) => {
        const isActive = t === active;
        return (
          <button
            key={t}
            type="button"
            className={`mOS-tabBar-btn ${isActive ? "mOS-tabBar-btn--active" : ""}`}
            onClick={() => onChange?.(t)}
          >
            <div className={`mOS-tabBar-icon`}>⬤</div>
            <div className={`mOS-tabBar-text`}>{t}</div>
          </button>
        );
      })}
    </nav>
  );
}
