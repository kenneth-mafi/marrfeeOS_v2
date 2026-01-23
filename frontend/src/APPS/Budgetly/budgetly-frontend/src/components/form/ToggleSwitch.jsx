
import './styles/toggleSwitch.css'

function ToggleSwitch({ label, checked, onChange }) {

  return (
    <div className="toggle-wrapper">

      <span>{label}</span>

      <label className="switch">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="slider"></span>
      </label>
    </div>
  );
}

export default ToggleSwitch;