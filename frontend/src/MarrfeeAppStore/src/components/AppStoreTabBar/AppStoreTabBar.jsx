import "./AppStoreTabBar.css";
import todayIcon from '../../assets/calendar.png';
import gameIcon from '../../assets/game-controller.png';
import appsIcon from '../../assets/appsIcon.png';
import searchIcon from '../../assets/search.png';
import { useState } from "react";

export default function AppStoreTabBar({ onChange }) {
  const [ activeTab, setActiveTab ] = useState("Apps");

  const tabs = [
    {title: "Today", icon: todayIcon },
    {title: "Games", icon: gameIcon },
    {title: "Apps", icon: appsIcon },
    {title: "Search", icon: searchIcon }
  ]

  return (
    <nav className={`mOS-tabBar`}>
      {tabs.map((t) => {
        const isActive = t.title === activeTab;
        return (
          <button
            key={t.title}
            type="button"
            className={`mOS-tabBar-btn ${isActive ? "mOS-tabBar-btn--active" : ""}`}
            onClick={() => {
              onChange?.(t.title)
              setActiveTab(t.title)
            }}
          >
            <div className={`mOS-tabBar-icon-contr`}>
              <img src={t.icon} alt={t.title} className={`mOS-tabBar-icon`} />
            </div>
            <div className={`mOS-tabBar-text`}>{t.title}</div>
          </button>
        );
      })}
    </nav>
  );
}
