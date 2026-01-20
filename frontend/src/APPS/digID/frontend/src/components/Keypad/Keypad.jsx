import InputField from "../forms/formFields/InputField";
import './keypad.css';
import deleteIcon from '../../assets/delete.png';
import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const Keypad = ({ onSubmit }) => {
    const location = useLocation();
    const [keyInput, setKeyInput] = useState("");
    const [errors, setErrors] = useState("");

    const handleClick = (value) => {
        setErrors('')
        setKeyInput(prev => prev + value);
    }

    const handleSubmit = async () => {
        let newError = "";
        
        if (keyInput.length < 6) {
            newError = "Must be at least 6 characters"
        }
        else {
            const ok = await onSubmit({ pinCode: keyInput });
            if (!ok) newError = "Incorrect Passcode";
        }
        setErrors(newError);
        return;
    }

    const handleDelete = () => {
        setErrors('')
        setKeyInput(prev => prev.slice(0, -1))
    }

    return(
        <motion.div 
            className={`digId-input-keypad-contr`}
            key={location.pathname}
            initial={{y: 100, opacity: 0 }}
            animate={{y: 0, opacity: 1}}
            exit={{y: 100, opacity: 0}}
            transition={{ duration: 0.5 }}
        >
            <InputField type={"password"} name={"passcode"} placeholder={"Security Code"} value={keyInput} error={errors} readOnly={true}/>
            <div className={`digId-keypad-contr`}>

                <button className={`digId-keypad-button`} onClick={ () => {handleClick("1")} } >1</button>
                <button className={`digId-keypad-button`} onClick={ () => {handleClick("2")} } >2</button>
                <button className={`digId-keypad-button`} onClick={ () => {handleClick("3")} } >3</button>
                <button className={`digId-keypad-button`} onClick={ () => {handleClick("4")} } >4</button>
                <button className={`digId-keypad-button`} onClick={ () => {handleClick("5")} } >5</button>
                <button className={`digId-keypad-button`} onClick={ () => {handleClick("6")} } >6</button>
                <button className={`digId-keypad-button`} onClick={ () => {handleClick("7")} } >7</button>
                <button className={`digId-keypad-button`} onClick={ () => {handleClick("8")} } >8</button>
                <button className={`digId-keypad-button`} onClick={ () => {handleClick("9")} } >9</button>

                <button className={`digId-keypad-button`} onClick={ () => {handleDelete()}} >
                    <img src={deleteIcon} alt="delete" className={`digId-keypad-delete-icon`} />
                </button>

                <button className={`digId-keypad-button`} onClick={() => {handleClick("0")}} >0</button>

                <button className={`digId-keypad-button digId-keypad-button-text`} onClick={() => {handleSubmit()}} disabled={keyInput.length < 6} >Verify</button>
            </div>
        </motion.div>
    )
}

export default Keypad;