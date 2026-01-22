import "./GetButton.css";

function GetButton({ text = "Get", onClick, path, appID, disabled = false }) {
  const handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (disabled || !onClick) return;
    onClick(appID, text, path);
  };

  const backgrColor = text === "Open" ? "#eee" : "#0a84ff";
  const color = text === "Open" ? "#0a84ff" :  "#fff" ;

  return (
    <button className={`mOS-getBtn`} type="button" onClick={handleClick} disabled={disabled} style={{ backgroundColor: `${backgrColor}`, color: `${color}` }} >
      {text}
    </button>
  );
}

export default GetButton;
