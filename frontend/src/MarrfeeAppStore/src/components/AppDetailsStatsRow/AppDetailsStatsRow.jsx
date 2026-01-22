import "./AppDetailsStatsRow.css";

function Stat({ top, middle, bottom }) {
  return (
    <div className={`mOS-stat`}>
      <div className={`mOS-stat-top`}>{top}</div>
      <div className={`mOS-stat-middle`}>{middle}</div>
      <div className={`mOS-stat-bottom`}>{bottom}</div>
    </div>
  );
}

export default function AppDetailsStatsRow({ appData }) {
  return (
    <section className={`mOS-statsRow`}>
      <Stat top={"1337 RATINGS"} middle={"5.0"} bottom={"★★★★★"} />
      <Stat top={"AGE"} middle={"12+"} bottom={"Years Old"} />
      <Stat top={"CHART"} middle={"No.1"} bottom={appData.category} />
      <Stat top={"DEVELOPER"} middle={"🤖"} bottom={appData.developers} />
      <Stat top={"LANGUAGE"} middle={"EN"} bottom={"+ 23 More"} />
      <Stat top={"SIZE"} middle={`${appData.size},0`} bottom={"MB"} />
    </section>
  );
}
