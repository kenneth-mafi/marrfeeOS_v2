import "./AppStoreTopBar.css";

export default function AppStoreTopBar({ title = "Apps", rightIcon = "●", onRightClick }) {
  return (
    <div className={`mOS-appStoreTopBar`}>
      <h2 className={`mOS-appStoreTopBar-title`}>{title}</h2>
      <button
        type="button"
        className={`mOS-appStoreTopBar-rightBtn`}
        onClick={onRightClick}
        aria-label="Account"
      >
        {rightIcon}
      </button>
    </div>
  );
}
