import { useEffect, useState } from "react"
import { getCurrentTime } from "../../marrfeeOSUtils/utils";
import { TimeContext } from "../contexts/contexts";


const TimeProvider = ({ children }) => {
    const [time, setTime] = useState( getCurrentTime() );
    const [timeColor, setTimeColor] = useState("white");

    const changeTimeColor = (color) => {
        if (!color) return;
        setTimeColor(color);
    }

    useEffect(() => {

        const updateTime = () => setTime( getCurrentTime() );

        updateTime();

        const interval = setInterval(updateTime, 60_000);

        return () => clearInterval(interval);
    }, []);

    return (
        <TimeContext.Provider value={{ time, changeTimeColor, timeColor }}>
        { children }
        </TimeContext.Provider>
    );
}

export default TimeProvider;