import TabsFrame from '../../Components/TabsContainer/TabsFrame';
import MainPageFrame from '../mainPageFrame/MainPageFrame';
import './homePage.css';

const HomePage = () => {
    const pageContent = [
        {
            Component: TabsFrame
        }
    ]

    return <MainPageFrame components={pageContent} className='MBr-home-page' />
}

export default HomePage;