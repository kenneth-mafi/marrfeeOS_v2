import './logInPage.css';
import appLogo from '../../assets/secure.png';
import Header from '../../components/header/Header';
import FormTemplate from '../../components/forms/formTemplate/FormTemplate';
import MainPageFrame from '../../../../../../components/PageFrames/mainPageFrame/MainPageFrame';
import Label from '../../components/Labels/Label';
import { getLogInForm } from './logInForm';
import Hero from '../../Components/Hero/Hero';
import { useDigIDStateContext } from '../../hooks/useContexts';
import { useNavigate } from 'react-router-dom';

const LogInPage = () => {
    const { sendRequest, userData } = useDigIDStateContext();
    const navigate = useNavigate();
    const proceed = () => {
        navigate("/digIDApp/homePage");
    };

    const submit = async ( formData ) => {

        console.log(formData);
        console.log("LOGIN USER DATA: ", userData);
        
        formData["userID"] = userData?.userID;
        console.log("LOGIN FORM DATA: ",formData);
        
        const data = await sendRequest( formData, 'login' );
        console.log("LOGIN FROM BACKEND: ", data);
        console.log("LOGIN FROM BACKEND: ", data?.success);
        console.log("LOGIN FROM BACKEND: ", data?.userData);
        if (data?.success){
            proceed()
        }
        else return false; 
    };

    const formContent = getLogInForm(submit);

    const pageContent = [
        {
            Component: Header,
            props: {
                title: "Log In",
            }
        },
        {
            Component: Hero,
            props: { imageSrc: appLogo}
        },
        {
            Component: FormTemplate,
            props: { formContent }
        },
        {
            Component: Label,
            props: {
                title: "Don't have an account?",
                link: "Register",
                to: "/digIDApp/registrationPage"
            }
        }
    ]

  return (
    <MainPageFrame components={pageContent} className="digId-log-in-page" />
  );
}

export default LogInPage;