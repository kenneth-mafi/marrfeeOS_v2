
import './styles/marketCard.css';

function MarketCard ({icon, alt, nameShort, nameFull, myCoin=false, price, percentChange, sign, color, units, currency }) {
    return (
        <div className="m-card-item-contr">
            <div className="left-section">
                <div className="m-card-img-contr">
                    <img src={icon} alt={alt} />
                </div>
                <div className="name-contr">
                    <p className="abrivated-name">{nameShort}</p>
                    <p className="coin-name p-small">{`${myCoin ? "Units held: " + units : nameFull}`}</p>
                </div>
            </div>

            <div className="right-section">
                <p className="price">
                    {currency !== "kr" && currency}
                    {price} 
                    {(currency === "kr") && " kr"}
                </p>
                <p 
                className="percent-change p-small"
                style={{color: `${color}`}}
                >
                    <span>{sign}</span>{percentChange}%
                </p>
            </div>
        </div>
    )
}

export default MarketCard;