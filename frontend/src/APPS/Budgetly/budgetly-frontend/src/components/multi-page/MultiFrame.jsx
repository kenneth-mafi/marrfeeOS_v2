import { SmallLabel } from "../label/Label";
import "./multiframe.css";
import { useState } from "react";

/**
 * MultiFrame
 *
 * Generic tab-based container.
 * Handles:
 * - Tab switching
 * - Animated underline indicator
 * - Rendering active content
 *
 * Commonly used for:
 * - Charts vs lists
 * - Market vs portfolio views
 *
 * @param {Object} props
 * @param {Array<Object>} props.tabs - Tab definitions
 * @param {Boolean} label - label display
 * @returns {JSX.Element}
 */
function MultiFrame({ tabs, label }) {

  /**
   * @state activeIndex
   * @description
   * Index of the currently active tab
   */
  const [activeIndex, setActiveIndex] = useState(0);

  /**
   * @constant ActiveComponent
   * @description
   * Component rendered for the active tab
   */
  const ActiveComponent = tabs[activeIndex].Component;

  return (
    <div className="multiframe-contr">

      {/* Tab Navigation */}
      <div className="toggle-links">
        {tabs.map((tab, index) => (
          <button
            id={tab.id}
            key={tab.id}
            className={`tab-btn ${index === activeIndex ? "active" : ""}`}
            onClick={() => setActiveIndex(index)}
          >
            {tab.label}
          </button>
        ))}

        {/* Animated Underline */}
        <span
          className="tab-underline"
          style={{
            transform: `translateX(${activeIndex * 100}%)`,
            width: `${100 / tabs.length}%`
          }}
        />
      </div>

      {/* Labal */}
      {label && <SmallLabel title={"Name"} link={"Value"} crypto={true} />}

      {/* Active Content */}
      <div className="content-wrapper">
        <ActiveComponent {...tabs[activeIndex].props} />
      </div>

    </div>
  );
}

export default MultiFrame;
