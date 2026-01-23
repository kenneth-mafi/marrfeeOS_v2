import "./styles/inputLayout.css";

/**
 * SelectDropdown
 *
 * Reusable select input component.
 *
 * @param {Object} props
 * @param {string} props.label - Field label
 * @param {string} props.id - Optional DOM id
 * @param {string} props.name - Field name
 * @param {Function} props.onChange - Value change handler
 * @param {string} props.value - Selected value
 * @param {Array<Object>} props.options - Dropdown options
 * @param {string} props.error - Validation error
 * @returns {JSX.Element}
 */
function SelectDropdown({
  label,
  id,
  name,
  onChange,
  value,
  options = [],
  error
}) {

  /**
   * @constant selectId
   * @description
   * Ensures stable id for accessibility
   */
  const selectId = id || name;

  return (
    <div className="input-wrapper">

      <label htmlFor={selectId} className="form-label">
        {label}
      </label>

      <select
        id={selectId}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="select inputFeild"
      >
        <option value="">Select an option</option>

        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.text}
          </option>
        ))}
      </select>

      {error && <p className="error-text">{error}</p>}
    </div>
  );
}

export default SelectDropdown;
