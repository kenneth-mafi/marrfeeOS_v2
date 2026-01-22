import './logInPage.css';
import appLogo from '../../assets/secure.png';
import Header from '../../components/header/Header';
import FormTemplate from '../../components/forms/formTemplate/FormTemplate';
import Label from '../../components/Labels/Label';
import { getLogInForm } from './logInForm';
import Hero from '../../Components/Hero/Hero';
import { useDigIDStateContext } from '../../hooks/useContexts';
import { useNavigate } from 'react-router-dom';
import MainPageFrame from '../../components/Frames/pageFrame/MainPageFrame';

const LogInPage = () => {
    const { sendRequest, userData } = useDigIDStateContext();
    const navigate = useNavigate();
    const proceed = () => {
        navigate("/digIDApp/homePage");
    };

    const submit = async ( formData ) => {
        formData["userID"] = userData?.userID;
        
        const data = await sendRequest( formData, 'login' );
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