import './roundScoreCard.css';
import { AnimatePresence, motion } from "framer-motion"

const RoundScoreCard = ({ round, pScore, cScore, pRoundSc, cRoundSc }) => {
    return (
        <AnimatePresence mode="wait" >
            <motion.div
                className="round-score-card" 
                key={location.pathname}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{scale: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}  
            >
                <div className="round-header">
                    <h1>Round <span>{round}</span></h1>
                </div>
                <div className="scores-board">
                    <div className="scores">Your score: <span>{pScore}</span></div>
                    <div className="scores">Computer Score: <span>{cScore}</span></div>
                </div>
                <div className="seperator"></div>
                <p className="rps-title">Game Score</p>

                <div className="round-score-container">
                    <h1 className="round-scores">
                        <span>{pRoundSc}</span> : <span>{cRoundSc}</span>
                    </h1>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default RoundScoreCard;