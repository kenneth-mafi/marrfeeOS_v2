import "./AppStoreProfileCard.css";

export default function AppStoreProfileHeaderCard({
  avatarSrc = null,
  name = "Name",
  email = "you@email.com",
}) {
  return (
    <section className={`mOS-profileHeaderCard`}>
      <div className={`mOS-profileHeaderCard-avatar`}>
        {avatarSrc ? (
          <img
            className={`mOS-profileHeaderCard-avatarImg`}
            src={avatarSrc}
            alt={`${name} avatar`}
          />
        ) : (
          <div className={`mOS-profileHeaderCard-avatarFallback`}>
            {String(name).slice(0, 1).toUpperCase()}
          </div>
        )}
      </div>

      <div className={`mOS-profileHeaderCard-meta`}>
        <div className={`mOS-profileHeaderCard-name`}>{name}</div>
        <div className={`mOS-profileHeaderCard-email`}>{email}</div>
      </div>
    </section>
  );
}
