import './pinSetupPage.css';
import appLogo from '../../assets/secure.png';
import { getPinSetupForm } from './pinSetupForm';
import Header from '../../components/header/Header';
import Hero from '../../Components/Hero/Hero';
import FormTemplate from '../../components/forms/formTemplate/FormTemplate';
import MainPageFrame from '../../../../../../components/PageFrames/mainPageFrame/MainPageFrame';
import { useDigIDStateContext } from '../../hooks/useContexts';
import { useNavigate } from 'react-router-dom';

const PinSetupPage = () => {
    const { sendRequest, userData, setHasSecurityCode } = useDigIDStateContext();
    const navigate = useNavigate();
    const proceed = () => {
        navigate("/digIDApp/authentificationPage");
    };

    const submit = async ( formData ) => {

        console.log(formData);
        console.log("SETUP USER DATA: ", userData);
        console.log("SETUP USER ID: ", userData.userID);
        formData["userID"] = userData?.userID;
        console.log("SETUP FORM DATA: ", formData);
        
        const data = await sendRequest( formData, 'set-pin' );
        console.log("SETUP RETURNED DATA: ",data);
        console.log(data?.success);

        if (data?.success){
            setHasSecurityCode(true);
            proceed();
        }
        else console.log("HEre");
        ; 
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