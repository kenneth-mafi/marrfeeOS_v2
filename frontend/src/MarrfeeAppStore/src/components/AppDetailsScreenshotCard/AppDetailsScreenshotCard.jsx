import "./AppDetailsScreenshotCard.css";

export default function AppDetailsScreenshotCard({ src }) {
  return (
    <div className={`mOS-shotCard`}>
      <div className={`mOS-shotCard-inner`}>
        <img src={src} alt="screenshot" className={`mOS-shotCard-inner-img`} />
      </div>
    </div>
  );
}
