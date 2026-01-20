import PlainText from '../../components/PlainText/PlainText';
import Hero from '../../Components/Hero/Hero';
import appLogo from '../../assets/secure.png';
import './homePage.css';
import MainPageFrame from '../../../../../../components/PageFrames/mainPageFrame/MainPageFrame';


const HomePage = () => {

    const pageContent = [
        {
            Component: Hero,
            props: { title: "DigID", imageSrc: appLogo }
        },
        {
            Component: PlainText,
            props: { texts: ["Protect your digital identity.", "Never use it at the request of someone contacting you."] }
        }
    ]

  return (
    <MainPageFrame components={pageContent} className="digId-home-page" bottomNav={true} />
  );
}

export default HomePage;