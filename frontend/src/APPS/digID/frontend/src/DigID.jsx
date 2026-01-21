import { Route, Routes } from 'react-router-dom'
import './digID.css'
import LaunchPage from './pages/LaunchPage/LaunchPage'
import HomePage from './pages/HomePage/HomePage'
import AuthentificationPage from './pages/AuthentificationPage/AuthentificationPage'
import RegistrationPage from './pages/RegistrationPage/RegistrationPage'
import LogInPage from './pages/LogInPage/LogInPage'
import SettingsPage from './pages/SettingsPage/SettingsPage'
import PinSetupPage from './pages/PinSetupPage/PinSetupPage'
import ChangePinPage from './pages/ChangePinPage/ChangePinPage'

export const launchApp = ( addToAppStore ) => {
    const appMetaData = {
            "id": "digIDApp",
            "appName": "DigID",
            "path": "/digIDApp",
            "appLogo": "/static/icons/secure.png",
            "color": "#f6f8fb",
            "allowedDevices": ["mobile"],
            "description": "A modern digital identity management application",
            "category": "Security",
            "type": "Core Application",
            "size": "86",
            "keywords": ["security", "id", "secure", "verification", "verify"],
            "screenshots": ["/static/screenshots/digid1.png", "/static/screenshots/digid2.png", "/static/screenshots/digid3.png"]
        }
    addToAppStore( appMetaData, "digIDApp" );
}

const updateApp = ( updateApps ) => {
    //TODO: Add fields to update 
} 

function DigID() {

  return (
        <Routes>
            <Route index element={ <LaunchPage /> } />
            <Route path='/launchPage' element={ <LaunchPage /> } />
            <Route path='/homePage' element={ <HomePage/> } />
            <Route path='/authentificationPage' element={ <AuthentificationPage /> } />
            <Route path='/registrationPage' element={ <RegistrationPage /> } />
            <Route path='/logInPage' element={ <LogInPage /> } />
            <Route path='/settingsPage' element={ <SettingsPage /> } />
            <Route path='/pinSetupPage' element={ <PinSetupPage /> } />
            <Route path='/changePinPage' element={ <ChangePinPage /> } />
        </Routes>

  )
}

export default DigID;
