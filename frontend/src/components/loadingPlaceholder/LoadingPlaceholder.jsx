import './loadingPlaceholder.css';
import loadingIcon from '../../assets/loading.png';

const LoadingPlaceholder = () => {
    return <div className={`mOS-loading-placeholder-contr`} >
        <img src={loadingIcon} alt="loader icon" className={`mOS-loading-placeholder-icon`} />
    </div>
}

export default LoadingPlaceholder;