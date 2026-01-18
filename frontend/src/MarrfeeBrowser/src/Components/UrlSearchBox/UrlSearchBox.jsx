import './urlSearchBox.css';
import searchIcon from '../../assets/search.png'
import arrowRight from '../../assets/right-arrow.png';
import arrowLeft from '../../assets/arrow-left.png';

const UrlSearchBox = ({ onChange, value, onSearch }) => {

    return (
        <div className="MBr-url-searchbox-container">
            <div className="buttons-section-left">
                <button className='forward-back-nav-btn'>
                    <img src={arrowLeft} alt="back" />
                </button>
                <button className='forward-back-nav-btn' >
                    <img src={arrowRight} alt="forward" />
                </button>
            </div>

            <div className="searchbox-contr">
                <input type="search" 
                       name="url" 
                       id="MBr-url-search-field" 
                       className='MBr-url-search-field' 
                       placeholder='Enter URL'
                       value={value}
                       onChange={(e) => onChange("url", e.target.value)}
                />
                <button 
                    className="search-icon"
                    onClick={() => onSearch && onSearch()}
                >
                    <img src={searchIcon} alt="search" className="search-icon-img" />
                </button>
            </div>
        </div>
    )
}

export default UrlSearchBox;