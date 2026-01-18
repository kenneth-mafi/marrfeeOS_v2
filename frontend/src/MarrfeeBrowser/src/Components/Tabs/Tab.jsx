import './tab.css';
import placeholderIcon from '../../assets/react.svg'
import closeIcon from '../../assets/close.png';

const Tab = ({ icon="", title="", onClick, removeTab, className}) => {
    const src = icon ? icon : placeholderIcon;
    return (
        <div className={`MBr-tab ${className ? className : ""}`} onClick={onClick} >
            <img src={src} alt="icon" className="MBr-tab-icon" />
            <p className="MBr-tab-title">{title}</p>
            <button className="MBr-remove-tab-btn" onClick={removeTab} >
                <img src={closeIcon} alt="close" />
            </button>
        </div>
    )
}

export default Tab;