import { useEffect, useState } from "react";
import { DateContext } from "./contexts";
import { useAppData } from "../hooks/useContexts";


function DateProvider({ children }) {
  const {today, setToday} = useAppData();

  useEffect(() => {
    const tick = () => {
      setToday(new Date());
    };

    // check every minute (cheap)
    const interval = setInterval(tick, 60000);

    return () => clearInterval(interval);
  }, []);

  const year = today.getFullYear();
  const month = today.getMonth();
  const day = today.getDate();

  return (
    <DateContext.Provider value={{ today, year, month, day }}>
      {children}
    </DateContext.Provider>
  );
}

export default DateProvider;