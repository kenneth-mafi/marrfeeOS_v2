import { Navigate, Route, Routes } from 'react-router-dom';
import appLogo from './assets/marrfee-logo.png'
import MBrHomepage from './pages/HomePage/MBrHomePage';


const MarrfeeBrowser = () => {
    
    return (
        <Routes>
          <Route index element={ <Navigate to="MBrHomePage" /> } />
          <Route path='MBrHomePage' element={ <MBrHomepage /> } />
        </Routes>     
    )
}

export default MarrfeeBrowser;