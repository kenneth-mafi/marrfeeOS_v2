import { AnimatePresence, motion } from "framer-motion"
import Button from "../Buttons/Button"
import './messageCard.css';
import { useRPSGameContext } from "../../hooks/useRPSGameContex";


const MessageCard = ({choiceUpdate, verdict, result, color}) => {
    const {nextMove} = useRPSGameContext();

    return (
        <AnimatePresence mode="wait" >
            <motion.div
                className="message-card" 
                key={location.pathname}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{scale: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}  
            >
                <div className="message-container">
                    <p className="choice-update">{choiceUpdate}</p>
                    <p className="verdict">{verdict}</p>
                    <p 
                        className="result"
                        style={{color: color}}
                    >{result}</p>
                </div>
                <div className="button-container">
                    <Button text="Make Next Move" onClick={() => {nextMove()}}/>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default MessageCard;