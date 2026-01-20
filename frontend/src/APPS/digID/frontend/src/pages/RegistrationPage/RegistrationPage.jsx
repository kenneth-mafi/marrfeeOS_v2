import './registrationPage.css';
import appLogo from '../../assets/secure.png';
import { getRegistrationForm } from './registrationForm';
import { useDigIDStateContext } from '../../hooks/useContexts';
import Header from '../../components/header/Header';
import FormTemplate from '../../components/forms/formTemplate/FormTemplate';
import MainPageFrame from '../../../../../../components/PageFrames/mainPageFrame/MainPageFrame';
import Label from '../../components/Labels/Label';
import { generateId } from '../../utils';
import { useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
    const navigate = useNavigate();
    const { sendRequest } = useDigIDStateContext();
    const proceed = () => {
        navigate("/digIDApp/logInPage");
    };

    const submit = async ( formData ) => {
        console.log(formData);
        
        let personNum = formData.personNummer;
        const index = 8

        if (String( personNum ).length === 12 && !String( personNum ).includes("-") ) {
           personNum = personNum.slice( 0, index ) + "-" + personNum.slice( index );
        }

        formData.personNummer = personNum;
        formData["userID"] = generateId();
        
        const ok = await sendRequest( formData, 'register' );
        console.log(ok);
        console.log(ok.success);
        console.log(ok.userData);
        if (ok?.success){
            proceed()
            return true;
        }
        else return false;
    };

    const formContent = getRegistrationForm(submit);

    const pageContent = [
        {
            Component: Header,
            props: { title: "Registration", logo: appLogo, }
        },
        {
            Component: FormTemplate,
            props: { formContent }
        },
        {
            Component: Label,
            props: { title: "Already have an account?", link: "Log In", to: "/digIDApp/logInPage" }
        }
    ]

  return (
    <MainPageFrame components={pageContent} className="digId-registration-page" />
  );
}

export default RegistrationPage;