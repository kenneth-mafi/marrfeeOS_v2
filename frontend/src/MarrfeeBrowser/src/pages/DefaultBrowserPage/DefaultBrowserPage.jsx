import './defaultBrowserPage.css';
import { useState } from 'react';
import appLogo from '../../assets/marrfee-logo.png';
import searchIcon from '../../assets/search.png'

const DefaultBrowserPage = ({ onSearchFromDefault }) => {
    const [localInput, setLocalInput] = useState('');

    const handleLocalSearch = () => {
        if (onSearchFromDefault) onSearchFromDefault(localInput);
    };

    return(
        <div className="MBr-default-search-page">
            <div className="mainheader">
                <span><img src={appLogo} alt="browser logo" /><h1>ARRFEE</h1></span>
            </div>
            <div className="search-field-contr">
                <input type="search"
                       name="searchUrl"
                       id="MBr-earch-field"
                       className='MBr-search-field'
                       placeholder='Search or type a URL'
                       value={localInput}
                       onChange={(e) => setLocalInput(e.target.value)}
                />
                <button className="search-icon" onClick={handleLocalSearch}>
                    <img src={searchIcon} alt="search" className="search-icon-img" />
                </button>
            </div>
        </div>
    )
}

export default DefaultBrowserPage;