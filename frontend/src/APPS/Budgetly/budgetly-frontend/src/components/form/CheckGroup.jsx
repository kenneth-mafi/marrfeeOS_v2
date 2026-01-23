import "./styles/checkbox.css";

/**
 * CheckGroup
 *
 * Renders a group of checkbox or radio inputs.
 * Supports:
 * - Multiple selections (checkbox)
 * - Single selection (radio)
 *
 * @param {Object} props
 * @param {string} props.label - Group label
 * @param {string} props.type - "checkbox" | "radio"
 * @param {string} props.name - Input name
 * @param {Array<Object>} props.options - Available options
 * @param {*} props.value - Current selected value(s)
 * @param {Function} props.onChange - Change handler
 * @param {string} props.error - Validation error
 * @returns {JSX.Element}
 */
function CheckGroup({
  label,
  type = "checkbox",
  name,
  options,
  value,
  onChange,
  error
}) {

  /**
   * @constant isRadio
   * @description
   * Determines selection behavior
   */
  const isRadio = type === "radio";

  /**
   * Handles input selection change
   *
   * @param {string} optionValue - Selected option
   */
  const handleChange = (optionValue) => {
    if (isRadio) {
      onChange(optionValue);
    } else {
      onChange({
        ...value,
        [optionValue]: !value?.[optionValue]
      });
    }
  };

  return (
    <fieldset className="radio-group">
      <legend>{label}</legend>

      {options.map(option => {
        const inputId = option.id || option.value;

        return (
          <div key={inputId} className="checkbox-item">
            <input
              type={type}
              name={name}
              id={inputId}
              value={option.value}
              checked={
                isRadio
                  ? value === option.value
                  : !!value?.[option.value]
              }
              onChange={() => handleChange(option.value)}
            />

            <label htmlFor={inputId}>
              {option.label}
            </label>
          </div>
        );
      })}

      {error && <p className="error-text">{error}</p>}
    </fieldset>
  );
}

export default CheckGroup;
