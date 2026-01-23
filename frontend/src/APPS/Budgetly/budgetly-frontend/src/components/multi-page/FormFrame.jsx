import { useState } from "react";
import "./formFrame.css";
import { ToggleButton } from "../buttons/ToggleButton";

/**
 * FormFrame
 *
 * Container component that:
 * - Switches between two form views
 * - Handles toggle state
 * - Applies transition animations
 *
 * Commonly used for:
 * - Income / Expense forms
 * - Dual-mode forms
 *
 * @param {Object} props
 * @param {Array<Object>} props.tabs - Tab configuration
 * @param {Object} props.toggleButtonData - Props passed to ToggleButton
 * @returns {JSX.Element}
 */
function FormFrame({ tabs, toggleButtonData }) {

  /**
   * @state formState
   * @description
   * Tracks:
   * - activeIndex → which tab is active
   * - toggle → visual toggle state
   */
  const [formState, setFormState] = useState({
    activeIndex: 0,
    toggle: false
  });

  /**
   * @state isFading
   * @description
   * Controls fade animation between form switches
   */
  const [isFading, setIsFading] = useState(false);

  /**
   * @constant ActiveForm
   * @description
   * Currently active form component
   */
  const ActiveForm = tabs[formState.activeIndex].Component;

  /**
   * Handles tab switching with fade animation
   *
   * @param {number} index - Tab index to activate
   * @param {boolean} toggle - Toggle button visual state
   */
  const handleClick = (index, toggle) => {
    setIsFading(true);

    setFormState(prev => ({
      ...prev,
      activeIndex: index,
      toggle: toggle
    }));

    setTimeout(() => {
      setIsFading(false);
    }, 80);
  };

  /**
   * @constant formContent
   * @description
   * Configuration object passed into the active form
   */
  const formContent = tabs[formState.activeIndex].formContent;

  return (
    <div className="form-frame">

      {/* Toggle Buttons */}
      <ToggleButton
        {...toggleButtonData}
        onClick1={() => handleClick(0, false)}
        onClick2={() => handleClick(1, true)}
        toggle={formState.toggle}
      />

      {/* Active Form */}
      <div className={`form-wrapper ${isFading ? "hidden" : ""}`}>
        <ActiveForm
          key={formState.activeIndex}
          formContent={formContent}
        />
      </div>

    </div>
  );
}

export default FormFrame;
