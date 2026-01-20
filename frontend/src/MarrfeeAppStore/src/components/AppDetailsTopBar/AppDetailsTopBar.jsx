import "./AppDetailsTopBar.css";
import leftArrow from '../../assets/back.png';
export default function AppDetailsTopBar({ title = "Back", onBack }) {
  return (
    <div className={`mOS-detailsTopBar`}>
      <button type="button" className={`mOS-detailsTopBar-back`} onClick={onBack}>
        <img src={leftArrow} alt="back icon" className={`mOS-detailsTopBar-back-icon`} />
      </button>
      <div className={`mOS-detailsTopBar-title`}>{title}</div>
      <div className={`mOS-detailsTopBar-right`} />
    </div>
  );
}
