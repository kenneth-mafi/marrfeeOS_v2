import './rpsheader.css'
import backArrowIcon from '../../assets/left-arrow.png';
import { Link, useNavigate } from 'react-router-dom';

function SubHeader({title, alt}) {

    const navigate = useNavigate();

    const goBack = () => {
      navigate(-1);
    }
    return (
        <div className="rps-sub-header">
          <Link onClick={goBack}>
              <img src={backArrowIcon} alt={alt} />          
          </Link>

          <h2>{title}</h2>
        </div>
    )
}

export default SubHeader;