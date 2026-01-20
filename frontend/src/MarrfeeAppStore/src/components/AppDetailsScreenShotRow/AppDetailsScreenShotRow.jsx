
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
        {shots.map((s, i) => {
          const apiBase = (import.meta.env.VITE_API_URL || "http://localhost:8000").replace(/\/$/, "");
          const screenshot = typeof s === "string" && s.startsWith("/static")
            ? `${apiBase}${s}`
            : s;
            
          return <AppDetailsScreenshotCard
            key={`${s}-${i}`}
            src={screenshot}
          />
        })}
      </div>
    </section>
  );
}
