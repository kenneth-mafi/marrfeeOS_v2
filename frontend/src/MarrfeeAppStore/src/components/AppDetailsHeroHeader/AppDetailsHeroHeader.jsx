import GetButton from "../Buttons/GetButton/GetButton";
import "./AppDetailsHeroHeader.css";

export default function AppDetailsHeroHeader({ icon, title = "Title", subtitle = "Subtitle", onGet, color, isInstalled }) {
  const text = isInstalled ? "Open" : "Get"
  
  return (
    <section className={`mOS-detailsHero`}>
      <div className={`mOS-detailsHero-icon`} style={{backgroundColor: `${color}`}} >
        {icon ? <img className={`mOS-detailsHero-iconImg`} src={icon} alt={title} /> : null}
      </div>

      <div className={`mOS-detailsHero-meta`}>
        <div className={`mOS-detailsHero-title`}>{title}</div>
        <div className={`mOS-detailsHero-subtitle`}>{subtitle}</div>
        <div className={`mOS-detailsHero-action`}>
          <GetButton text={text} onClick={onGet} />
        </div>
      </div>
    </section>
  );
}
