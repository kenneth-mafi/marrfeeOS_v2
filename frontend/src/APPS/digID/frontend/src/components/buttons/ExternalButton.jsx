import { useNavigate } from 'react-router-dom';
import appIcon from '../../assets/secure.png';
import './externalButton.css';


const ExternalButton = ({text="", customer="", pathName, className}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        
        if (pathName === undefined || pathName === "" && !customer || customer === "") return;
        
        navigate("/launchPage", {state: {customer: customer, pathname: pathName}, replace: true});
    }
        
    return (
        <button 
            className={`digId-external-button ${className ? className : ""}`} 
            onClick={handleClick}
        >
            <span className={`digId-external-button-text`} >{text ? text : "Register"} with DigID</span>
            <img src={appIcon} alt="icon" className={`digId-external-button-icon`} />
        </button>
    );
}
export default ExternalButton;