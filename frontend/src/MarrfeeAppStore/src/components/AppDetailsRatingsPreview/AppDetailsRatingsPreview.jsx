import "./AppDetailsRatingsPreview.css";

export default function AppDetailsRatingsPreview() {
  return (
    <section className={`mOS-ratings`}>
      <div className={`mOS-ratings-title`}>Ratings & Reviews</div>

      <div className={`mOS-ratings-summary`}>
        <div className={`mOS-ratings-score`}>5.0</div>
        <div className={`mOS-ratings-meta`}>
          <div className={`mOS-ratings-stars`}>★★★★★</div>
          <div className={`mOS-ratings-count`}>out of 5 • 1.1K Ratings</div>
        </div>
      </div>
    </section>
  );
}
