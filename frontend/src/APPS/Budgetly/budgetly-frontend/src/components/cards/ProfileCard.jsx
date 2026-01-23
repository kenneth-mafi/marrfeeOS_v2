
import './styles/profileCard.css';
import TwinButtons from '../buttons/TwinButtons';

function ProfileCard({icon, alt, name, email, buttonData}) {
    return (
        <div className="profile-card-contr">
            <div className="profile-top-section"></div>

            <div className="profile-photo-contr">
                <img src={icon} alt={alt} />
            </div>

            <div className="profile-bottom-section">
                <p className='profile-card-name'>{name}</p>
                <p className='profile-card-email'>{email}</p>
                
                <TwinButtons {...buttonData} />
                
                
            </div>
        </div>
    )
}

export default ProfileCard;