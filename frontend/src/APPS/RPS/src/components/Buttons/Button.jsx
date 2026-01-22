import './button.css';

function Button({type="button", text, onClick}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="rps-wide-button">
      {text}
    </button>
  )
}

export default Button;