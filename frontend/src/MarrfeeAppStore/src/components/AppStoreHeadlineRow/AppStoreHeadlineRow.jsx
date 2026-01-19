import "./AppStoreHeadlineRow.css";

export default function AppStoreHeadlineRow({ title = "Headline", items = [] }) {
  return (
    <section className={`mOS-headlineRow`}>
      <h3 className={`mOS-headlineRow-title`}>{title}</h3>

      <div className={`mOS-headlineRow-grid`}>
        {items.map((it) => (
          <div key={it.id} className={`mOS-headlineCard`}>
            <div className={`mOS-headlineCard-image`}>{it.badge ?? ""}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
