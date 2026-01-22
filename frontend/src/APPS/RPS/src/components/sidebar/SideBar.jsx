
import { LinkCard } from '../Cards/LinkCard';
import './styles/sidebar.css';

function Sidebar({sidebarOpen, menuData, buttonData}) {
  return (
    <div className={`rps-sidebar-container ${sidebarOpen ? "active" : ""}`}>
        <nav className="rps-sidebar">
            {menuData.map((data, index) => {
                if (!data) return null;
                return <LinkCard key={index} {...data} />
            })}
        </nav>
    </div>
  )

}

export default Sidebar;