import { Link } from 'react-router-dom';
import './linkCard.css';



export function LinkCard({ icon, label, to }) {
  return (
    <Link to={to} className="rps-link-contr">
      <img src={icon} alt="icon" aria-hidden />
      <span>{label}</span>
    </Link>
    
  );
}
