import { AnimatePresence, motion } from "framer-motion"
import Button from "../Buttons/Button"
import './finalScoreCard.css';

const FinalScoreCard = ({round, prSc, crSc, verd, msg, onClick, color}) => {
    return (
        <AnimatePresence mode="wait" >
            <motion.div
                className="final-score-card"
                key={location.pathname}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{scale: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}  
            >
                <div className="score-header">
                    <h1>Round <span>{round}</span> Over!</h1>
                    <p>Final Score</p>
                </div>
                <div className="scores-board">
                    <div className="scores">Your score: <span>{prSc}</span></div>
                    <div className="scores">Computer Score: <span>{crSc}</span></div>
                </div>

                <div className="final-message-container">
                    <h1 
                        className="verdict"
                        style={{color: color}}
                    >{verd}</h1>
                    <p className="message">{msg}</p>
                </div>
                <div className="fs-button-container">
                    <Button text="Start next round" onClick={onClick} />
                </div>
            </motion.div>
        </AnimatePresence>        
    )
}

export default FinalScoreCard;