import { Link } from "react-router-dom";
import GetButton from "../Buttons/GetButton/GetButton";
import "./AppStoreMiniAppRow.css";

export default function AppStoreMiniAppRow({ icon, name = "App Name", category = "Food & Drink", onGet, to="/marrfeeAppStore/appDetailsPage" }) {
  return (
    <Link className={`mOS-miniRow`} to={to} >
      <div className={`mOS-miniRow-icon`}>
        {icon ? <img className={`mOS-miniRow-iconImg`} src={icon} alt={name} /> : null}
      </div>

      <div className={`mOS-miniRow-meta`}>
        <div className={`mOS-miniRow-name`}>{name}</div>
        <div className={`mOS-miniRow-cat`}>{category}</div>
      </div>

      <div className={`mOS-miniRow-action`}>
        <GetButton onClick={onGet} />
      </div>
    </Link>
  );
}
