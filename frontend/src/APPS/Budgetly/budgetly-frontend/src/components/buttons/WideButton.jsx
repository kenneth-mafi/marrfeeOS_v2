import './styles/wideButton.css';

export function WideButton({type="submit", text, icon, dark=false, onClick}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`wide-button ${dark ? "wide-btn-dark" : ""}`}>
      {icon && <img src={icon} alt="" /> }
      {text}
    </button>
  )
}