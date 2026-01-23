import './styles/optionCard.css';
import TwinButtons from '../buttons/TwinButtons';

function OptionCard({message, buttonData}) {
    return (
        <div className="opt-card-container">
            <div className="message-div">
              <p>{message}</p>
            </div>
            <TwinButtons {...buttonData}/>
        </div>
    )
}

export default OptionCard;