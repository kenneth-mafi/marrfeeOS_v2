
import { Link } from 'react-router-dom';
import './styles/balanceCard.css';


function BalanceCard({logo, alt, title, growth, currency, percent=false, balance, icon, iconAlt, to, color}) {
  const symbol = percent ? "%" : currency;
  return (
    <Link className="bal-card-contr" to={to}>

      <div className="bc-top-section">
        <div className="bc-top-title-section">
          <img src={logo} alt={alt} />
          <p className='p-small'>{title}</p>
        </div>

        <p
         className="growth-stat-section p-small"
         style={{color: `${color}`}}
         >{growth} <span>{symbol}</span></p>
      </div>

      <div className="card-balance">
        <h1>
            {currency !== "kr" && currency}
            {balance}
            {currency === "kr" && " kr"}
        </h1>
      </div>

      <img src={icon} alt={iconAlt} className='card-icon' />
    </Link>
  );
}

export default BalanceCard;