import { Link } from 'react-router-dom';
import moreIcon from '../../assets/more.png';
import { SmallLabel } from '../label/Label';
import './styles/progressCard.css';
import { getBudgetProgressMessage } from '../../utils/utils';


function ProgressCard({ title, category, spent, target, currency, type, message, to }) {
  // TODO: add type to parameters , between budget and savings
  let color;

  const percent = Math.min((spent / target) * 100, 100);

  if (!type && !message) {
    color = percent >= 80 ? "#d32f2f" : "#00457C";
    message = getBudgetProgressMessage(spent, target);
  }else{color = percent <= 70 ? "#3521ecff" : "#00457C";}

  
  const newTitle = title || category;

  return (
    <Link to={to} className="prog-card-container">
      <div className="prog-card-top-section">
        <h2 className="prog-title">{newTitle}</h2>
        <img src={moreIcon} alt="more" />
      </div>

      {type === "savings" ? <SmallLabel title="Saved" link="Goal" /> : <SmallLabel title="spent" link="budget" />}

      <div className="prog-card-mid-section">
        <div className="amount-labels">
          <h2>{spent} <span>{currency}</span></h2>
          <h3>{target} <span>{currency}</span></h3>
        </div>

        <div className="progress-bar-contr">
          <div
            className="progress-bar"
            style={{
              width: `${percent}%`,
              backgroundColor: color,
              boxShadow: `0px 6px 20px ${color}ab`
            }}
          />
        </div>
      </div>

      <div className="prog-card-bottom-section">
        <p>{message}</p>
      </div>
    </Link>
  );
}


export default ProgressCard;