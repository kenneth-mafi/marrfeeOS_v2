
import "./AppDetailsScreenshotRow.css";
import AppDetailsScreenshotCard from "../AppDetailsScreenshotCard/AppDetailsScreenshotCard";

export default function AppDetailsScreenshotRow({
  title = "Headline",
  shots = ["1", "2", "3", "4"],
}) {
  return (
    <section className={`mOS-shots`}>
      <h3 className={`mOS-shots-title`}>{title}</h3>

      <div className={`mOS-shots-row`}>
        {shots.map((s, i) => (
          <AppDetailsScreenshotCard
            key={`${s}-${i}`}
            label={s}
          />
        ))}
      </div>
    </section>
  );
}
