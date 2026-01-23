import "./notification.css";
import { useNotification } from "../../contexts/NotificationContext";

function NotificationDropdown() {
  const { notification, hideNotification } = useNotification();

  if (!notification) return null;

  return (
    <div
      className={`notification-dropdown ${notification.type} ${
        notification.visible ? "show" : "hide"
      }`}
      onClick={hideNotification}
    >
      <span className="notification-message">
        {notification.message}
      </span>
    </div>
  );
}

export default NotificationDropdown;
