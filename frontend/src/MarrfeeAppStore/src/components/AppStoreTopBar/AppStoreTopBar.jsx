import "./AppStoreTopBar.css";

export default function AppStoreTopBar({ title = "Apps", avatarSrc=null, name="Name", onRightClick }) {
  return (
    <div className={`mOS-appStoreTopBar`}>
      <h2 className={`mOS-appStoreTopBar-title`}>{title}</h2>
        <div className={`mOS-appStoreTopBar-avatar`} aria-label="Account" onClick={onRightClick} >
          {avatarSrc ? (
            <img
              className={`mOS-appStoreTopBar-avatarImg`}
              src={avatarSrc}
              alt={`${name} avatar`}
            />
          ) : (
            <div className={`mOS-appStoreTopBar-avatarFallback`}>
              {String(name).slice(0, 1).toUpperCase()}
            </div>
          )}
        </div>
    </div>
  );
}
