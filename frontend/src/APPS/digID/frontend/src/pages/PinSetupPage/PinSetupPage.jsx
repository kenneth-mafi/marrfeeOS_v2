import './pinSetupPage.css';
import appLogo from '../../assets/secure.png';
import { getPinSetupForm } from './pinSetupForm';
import Header from '../../components/header/Header';
import Hero from '../../Components/Hero/Hero';
import FormTemplate from '../../components/forms/formTemplate/FormTemplate';
import { useDigIDStateContext } from '../../hooks/useContexts';
import { useNavigate } from 'react-router-dom';
import MainPageFrame from '../../components/Frames/pageFrame/MainPageFrame';

const PinSetupPage = () => {
    const { sendRequest, userData, setHasSecurityCode } = useDigIDStateContext();
    const navigate = useNavigate();
    const proceed = () => {
        navigate("/digIDApp/homePage");
    };

    const submit = async ( formData ) => {
        formData["userID"] = userData?.userID;
        
        const data = await sendRequest( formData, 'set-pin' );

        if (data?.success){
            setHasSecurityCode(true);
            proceed();
        }
        else return false;
    };

    const formContent = getPinSetupForm(submit);
    
    const pageContent = [
        {
            Component: Header,
            props: {
                title: "Security Code Setup",
            }
        },
        {
            Component: Hero,
            props: { imageSrc: appLogo}
        },
        {
            Component: FormTemplate,
            props: { formContent, comparePin:true }
        },
    ]

  return (
    <MainPageFrame components={pageContent} className="digId-pin-setup-page" />
  );
}

export default PinSetupPage;