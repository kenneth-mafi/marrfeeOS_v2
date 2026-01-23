
import { LinkCard, LinkProfileCard } from "../cards/LinkCard";
import './styles/sidebar.css';

function Sidebar({sidebarOpen, profileData, menuData, buttonData}) {
  return (
    <div className={`sidebar-container ${sidebarOpen ? "active" : ""}`}>
        <LinkProfileCard {...profileData} />
        <nav className="sidebar">
            {menuData.map((data, index) => {
                if (!data) return null;
                return <LinkCard key={index} {...data} />
            })}
        </nav>
    </div>
  )

}

export default Sidebar;