
import { Link } from 'react-router-dom';
import './styles/linkCard.css';



export function LinkCard({ icon, label, to }) {
  return (
    <Link to={to} className="link-contr">
      <img src={icon} alt="" aria-hidden />
      <span>{label}</span>
    </Link>
  );
}

export function LinkProfileCard({mainText, currency, caption, img, alt, to}) {
    return (
        <Link className="profile-link-container" to={to}>
            <div className="pl-img-contr">
                <img src={img} alt={alt} />
            </div>

            <div className="pl-name-container">
                <p>{mainText} <span>{currency}</span></p>
                <p>{caption}</p>
            </div>
        </Link>
    )
}