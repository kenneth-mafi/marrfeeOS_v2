import appLogo from '../../assets/app-logo.png'
import { generateId } from '../../utils/utils';
import './styles/transactionCard.css';

function TransactionCard({category, date, group, amount, currency, label}) {
    const labelCategory = label || category
    return (
        <div key={generateId()} className="tran-card-item-contr">
            <div className='t-card-top-section'>
                <div className="img-wrapper">
                    <div className="img-container">
                        <img src={appLogo} alt="icon" />
                    </div>
                </div>

                <div className="tr-date-category-contr">
                    <p className="tr-category">{labelCategory}</p>
                    <p className="p-small">{date}</p>
                </div>
            </div>

            <div className='t-card-bottom-section'>
                <p className="p-small">{category}</p>
                <p 
                    className="tr-amount"
                    style={{color: `${group === "expense" ? "red" : "green"}`}}
                >
                    {group === "expense" && "-"}{amount.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
                })} <span>{currency}</span>
                </p>
            </div>
        </div>
    )
}

export default TransactionCard;