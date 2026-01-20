
import './header.css'
import backArrowIcon from '../../assets/arrow.png';
import { Link, useNavigate } from 'react-router-dom';

function Header({ title, logo, alt, text="", className='' }) {

    const navigate = useNavigate();

    const goBack = () => {
      navigate(-1);
    }

    return (
        <div className={`digId-header ${className}`}>
          <Link className={`digId-header-link`} onClick={goBack}>
              {!text && <img src={backArrowIcon} alt={alt} className={`digId-header-icon`} /> }    
              {text && <p className={`digId-header-text`}>{text}</p>} 
          </Link>

          <h2 className={`digId-header-title`} >{title}</h2>
          {logo && <img src={logo} alt="app logo" className={`digId-header-logo`} />}
        </div>
    )
}

export default Header;