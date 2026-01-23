
import { Link } from 'react-router-dom';
import './styles/gridCard.css';

function GridCard({icon, alt, dateTag, tag, amount, currency, to, color}) {
    return (
        <Link to={to} className="sq-card-item-contr">
            <div className="sq-top-section">
                <div className="sq-icon-container">
                    <img src={icon} alt={alt} />
                </div>
            </div>

            <div className="sq-bottom-section">
                <p className="date-tag">{dateTag}</p>

                <p
                    className="amount-tag"
                    style={{color: color}}
                >{amount} <span>{currency}</span></p>

                <p className="tag">{tag}</p>

            </div>
        </Link>
    )
}

export default GridCard;