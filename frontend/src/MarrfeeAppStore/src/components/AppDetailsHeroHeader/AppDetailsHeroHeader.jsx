import GetButton from "../Buttons/GetButton/GetButton";
import "./AppDetailsHeroHeader.css";

export default function AppDetailsHeroHeader({ icon, title = "Title", subtitle = "Subtitle", onGet }) {
  return (
    <section className={`mOS-detailsHero`}>
      <div className={`mOS-detailsHero-icon`}>
        {icon ? <img className={`mOS-detailsHero-iconImg`} src={icon} alt={title} /> : null}
      </div>

      <div className={`mOS-detailsHero-meta`}>
        <div className={`mOS-detailsHero-title`}>{title}</div>
        <div className={`mOS-detailsHero-subtitle`}>{subtitle}</div>
        <div className={`mOS-detailsHero-action`}>
          <GetButton text="Get" onClick={onGet} />
        </div>
      </div>
    </section>
  );
}
