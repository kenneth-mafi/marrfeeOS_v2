
import './styles/placeholderCard.css';

function PlaceholderCard ({icon, message}) {
    return (
        <div className="plc-hol-container">
            <img src={icon} alt="placeholder" />
            <p>{message}</p>
        </div>
    )
}

export default PlaceholderCard;