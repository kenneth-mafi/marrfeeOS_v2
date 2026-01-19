import "./GetButton.css";

function GetButton({ text = "Get", onClick }) {
  return (
    <button className={`mOS-getBtn`} type="button" onClick={onClick}>
      {text}
    </button>
  );
}

export default GetButton;
