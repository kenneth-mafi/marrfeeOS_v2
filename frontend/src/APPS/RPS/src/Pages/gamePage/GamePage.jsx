import Button from '../../components/Buttons/Button';
import MainHeader from '../../components/header/RpsHeader';
import PlayArea from '../../components/PlayArea/PlayArea';
import ScoreSection from '../../components/PlayArea/ScoreSection';
import { useRPSGameContext } from '../../hooks/useRPSGameContex';
import './gamePage.css';
import { AnimatePresence, motion } from "framer-motion"
import backgroundImg from "../../assets/peeking.png"

function GamePage() {
  const {resetGame} = useRPSGameContext();
  return (
    <AnimatePresence mode="wait" >
        <motion.div
            className="game-page"          
        >
            <MainHeader />
            <h2 className="rps-heading">ROCK PAPER SCISSORS</h2>
            <PlayArea />
            <ScoreSection />
            <Button text="Reset Game" onClick={() => {resetGame()}}/>
            <img src={backgroundImg} alt="image" className='back-img' />
        </motion.div>
    </AnimatePresence>
  )
}

export default GamePage;