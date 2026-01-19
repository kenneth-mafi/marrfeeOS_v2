
import './header.css'
import backArrowIcon from '../../assets/back.png';
import { Link, useNavigate } from 'react-router-dom';

function SubHeader({title, alt, exit=false}) {
    const navigate = useNavigate();
    const goBack = () => {
      exit ? navigate("/homeScreen") : navigate(-1);
      
    }
    
    return (
        <div className="MS-sub-header">
          <button type='button' className='ms-subheader-btn' onClick={() => {goBack()}}>
              <img src={backArrowIcon} alt={alt ?? "back"} />          
          </button>

          <h2>{title}</h2>
        </div>
    )
}

export default SubHeader;