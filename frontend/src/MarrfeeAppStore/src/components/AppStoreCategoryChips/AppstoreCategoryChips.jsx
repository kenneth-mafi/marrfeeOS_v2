import "./AppStoreCategoryChips.css";

export default function AppStoreCategoryChips({ chips = [], active = "", onSelect }) {
  return (
    <div className={`mOS-chipRow`}>
      {chips.map((c) => {
        const isActive = c === active;
        return (
          <button
            key={c}
            type="button"
            className={`mOS-chip ${isActive ? "mOS-chip--active" : ""}`}
            onClick={() => onSelect?.(c)}
          >
            {c}
          </button>
        );
      })}
    </div>
  );
}
