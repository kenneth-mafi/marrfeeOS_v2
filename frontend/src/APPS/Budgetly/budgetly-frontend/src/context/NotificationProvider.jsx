import { useState, useRef } from "react";
import { NotificationContext } from "./contexts";
import { useAppData } from "../hooks/useContexts";

function NotificationProvider({ children }) {
  const {notification, setNotification} = useAppData();
  const timerRef = useRef(null);

  const showNotification = ({
    message,
    type = "info",
    duration = 3000,
  }) => {
    // Clear previous timer
    if (timerRef.current) clearTimeout(timerRef.current);

    setNotification({ message, type, visible: true });

    timerRef.current = setTimeout(() => {
      hideNotification();
    }, duration);
  };

  const hideNotification = () => {
    setNotification((prev) =>
      prev ? { ...prev, visible: false } : null
    );

    // remove after animation
    setTimeout(() => setNotification(null), 300);
  };

  return (
    <NotificationContext.Provider
      value={{
        notification,
        showNotification
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationProvider;