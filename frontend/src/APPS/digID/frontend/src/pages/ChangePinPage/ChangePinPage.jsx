import appLogo from '../../assets/secure.png';
import Header from '../../components/header/Header';
import Hero from '../../Components/Hero/Hero';
import FormTemplate from '../../components/forms/formTemplate/FormTemplate';
import MainPageFrame from '../../../../../../components/PageFrames/mainPageFrame/MainPageFrame';
import { getChangePinForm } from './changePinForm';
import './changePinPage.css';

const ChangePinPage = () => {

    const submit = (formData) => {
        console.log(formData);
    };

    const formContent = getChangePinForm(submit);
    
    const pageContent = [
        {
            Component: Header,
            props: {
                title: "Change Security Code",
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
    ]

  return (
    <MainPageFrame components={pageContent} className="digId-change-pin-page" />
  );
}

export default ChangePinPage;