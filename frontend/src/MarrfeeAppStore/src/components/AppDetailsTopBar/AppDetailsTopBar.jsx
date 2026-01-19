import "./AppDetailsTopBar.css";

export default function AppDetailsTopBar({ title = "Apps", onBack }) {
  return (
    <div className={`mOS-detailsTopBar`}>
      <button type="button" className={`mOS-detailsTopBar-back`} onClick={onBack}>
        ‹
      </button>
      <div className={`mOS-detailsTopBar-title`}>{title}</div>
      <div className={`mOS-detailsTopBar-right`} />
    </div>
  );
}
