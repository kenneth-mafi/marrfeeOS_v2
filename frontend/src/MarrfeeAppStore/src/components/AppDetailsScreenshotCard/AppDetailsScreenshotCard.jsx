import "./AppDetailsScreenshotCard.css";

export default function AppDetailsScreenshotCard({ label }) {
  return (
    <div className={`mOS-shotCard`}>
      <div className={`mOS-shotCard-inner`}>{label}</div>
    </div>
  );
}
