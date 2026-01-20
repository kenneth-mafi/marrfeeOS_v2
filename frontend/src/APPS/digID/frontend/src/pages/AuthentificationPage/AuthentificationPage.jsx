import './authentificationPage.css';
import appLogo from '../../assets/secure.png';
import DetailsCard from '../../components/DetailsCard/DetailsCard';
import Header from '../../components/header/Header';
import MainPageFrame from '../../../../../../components/PageFrames/mainPageFrame/MainPageFrame';
import { useDigIDStateContext } from '../../hooks/useContexts';
import { useLocation, useNavigate } from 'react-router-dom';
import Keypad from '../../components/Keypad/Keypad';



const AuthentificationPage = () => { 

    const { sendRequest, userData } = useDigIDStateContext();
    const { state } = useLocation();
    
    const navigate = useNavigate();

    const submit = async ( formData ) => {

        if (!userData?.userID) {
            return false;
        }

        formData["userID"] = userData.userID
        console.log("AUTH FORM DATA: ", formData);
        
        const response = await sendRequest( formData, 'login-pin' );

        if ( response.success ) {
            const data = response.userData;
            // navigate( state?.pathname, { state:{ data: userData }, replace: true } );
            console.log(data);
            navigate("/digIDApp/homePage");
            return true;
            
        } else return false;
    };

    const userName = `${userData?.firstName || ""} ${userData?.lastName || ""}`;
    const customer = `${state?.customer || ""}`;
    const pageContent = [
        {
            Component: Header,
            props: {
                text: "cancel",
                title: "Identifying",
                logo: appLogo,
                className: "digId-auth-header"}
        },
        {
            Component: DetailsCard,
            props: {userName: userName, customer: customer}
            // props: {state: state.customer }
        },
        {
            Component: Keypad,
            props: { onSubmit: submit }
        },
    ]

    return <MainPageFrame components={pageContent} className="digId-authentification-page" />;
}   

export default AuthentificationPage;