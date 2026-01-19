import GetButton from "../Buttons/GetButton/GetButton";
import "./AppStoreFeaturedBanner.css";

export default function AppStoreFeaturedBanner({
  editorial = "TEXT BY EDITORIAL",
  title = "Title",
  subtitle = "Text by editorial",
  onGet,
}) {
  return (
    <div className={`mOS-featureBanner`}>
      <div className={`mOS-featureBanner-left`}>
        <div className={`mOS-featureBanner-editorial`}>{editorial}</div>
        <div className={`mOS-featureBanner-title`}>{title}</div>
        <div className={`mOS-featureBanner-subtitle`}>{subtitle}</div>
      </div>

      <div className={`mOS-featureBanner-right`}>
        <GetButton text="Get" onClick={onGet} />
      </div>
    </div>
  );
}
