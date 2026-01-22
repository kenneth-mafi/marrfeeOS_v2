import LaunchPage from "./Pages/launchPage/LaunchPage"
import GamePage from "./Pages/gamePage/GamePage"
import { Navigate, Route, Routes } from "react-router-dom"
import RPSGameProvider from "./providers/RPSGameProvider"
import RulesPage from "./Pages/rulesPage/RulesPage"
import { useEffect } from "react"
import { useTime } from "../../../marrfeeOSHooks/hooks/contexts"


export const launchApp = ( addToAppStore ) => {
    const appMetaData = {
            "id": "rpsApp",
            "appName": "RPS",
            "path": "/rpsGameApp",
            "appLogo": "/static/icons/rps.png",
            "color": "#0f6326ff",
            "allowedDevices": ["mobile"],
            "description": "A fun and simple classic game of rock paper scissors.",
            "category": "Game",
            "type": "Arcade",
            "size": "1",
            "developers": "Marrfee, Inc",
            "keywords": ["game", "rps", "fun"],
            "screenshots": ["/static/screenshots/rps1.png", "/static/screenshots/rps2.png", "/static/screenshots/rps3.png", "/static/screenshots/rps4.png"]
        }
    addToAppStore( appMetaData, "rpsApp" );
}


function RockPaperScissors() {
    const {changeTimeColor} = useTime();
      useEffect(() => {
          changeTimeColor("black");
      }, [changeTimeColor])
    
  
  return (
    <RPSGameProvider>
        <Routes>
            <Route index element={<Navigate to="rpsLaunchPage" replace />} ></Route>
            
            <Route path="rpsLaunchPage" element={<LaunchPage />} ></Route>

            <Route path="rpsGamePage" element={<GamePage />} ></Route>

            <Route path="rpsRulesPage" element={<RulesPage />} />

        </Routes>
    </RPSGameProvider>
  )
}

export default RockPaperScissors
