import GameButton from "../Buttons/GameButton"
import './buttonsContainer.css';
import { AnimatePresence, motion } from "framer-motion"
import rockIcon from '../../assets/raised-arm.png';
import scissorsIcon from '../../assets/victory.png'
import paperIcon from '../../assets/hands.png'
import { useRPSGameContext } from "../../hooks/useRPSGameContex";

const ButtonsContainer = () => {
    const { playGame } = useRPSGameContext();

    return (
        <AnimatePresence mode="wait" >
            <motion.div
                className="buttons-wrapper"
                key={location.pathname}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{scale: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}  
            >
                <p className="game-text">Make your move</p>
                <div className="game-btns">
                    <div className="buttons-container">
                        <GameButton src={rockIcon} alt="rock" onClick={() => {playGame("rock")}} />
                        <h2>Rock</h2>
                    </div>
                    <div className="buttons-container">
                        <GameButton src={paperIcon} alt="paper" onClick={() => {playGame("paper")}} />
                        <h2>Paper</h2>
                    </div>
                    <div className="buttons-container">
                        <GameButton src={scissorsIcon} alt="scissors" onClick={() => {playGame("scissors")}} />
                        <h2>Scissors</h2>
                    </div>
                </div>


            </motion.div>
        </AnimatePresence>
    )
}

export default ButtonsContainer;