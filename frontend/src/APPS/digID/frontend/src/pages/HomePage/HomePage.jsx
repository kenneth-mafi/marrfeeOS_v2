import PlainText from "../../components/PlainText/PlainText";
import Hero from "../../Components/Hero/Hero";
import appLogo from "../../assets/secure.png";
import "./homePage.css";
import MainPageFrame from "../../components/Frames/pageFrame/MainPageFrame";
import { useNavigate } from "react-router-dom";
import { useDigIDStateContext } from "../../hooks/useContexts";
import { WideButton } from "../../components/buttons/WideButton";

const HomePage = () => {
  const { hasSecurityCode } = useDigIDStateContext();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/digIDApp/pinSetupPage");
  };

  const HomePageComponent = !hasSecurityCode ? WideButton : PlainText;
  const HomePageProps = !hasSecurityCode
    ? { type: "button", text: "Setup passcode", onClick: handleClick }
    : {
        texts: [
          "Protect your digital identity.",
          "Never use it at the request of someone contacting you.",
        ],
      };

  const pageContent = [
    {
      Component: Hero,
      props: { title: "DigID", imageSrc: appLogo },
    },
    {
      Component: HomePageComponent,
      props: HomePageProps
    },
  ];

  return (
    <MainPageFrame
      components={pageContent}
      className="digId-home-page"
      bottomNav={true}
    />
  );
};

export default HomePage;
