import './styles/toggleButton.css';

export function ToggleButton({text1, onClick1, text2, onClick2, toggle=false}) {
    return (
      <div className="toggle-container">

        <div className={`toggle-switch ${toggle ? "active" : ""}`}></div>

        <button
          className={`toggle-btns ${!toggle ? "active" : ""}`}
          onClick={onClick1}
        >
          {text1}
        </button>

        <button
          className={`toggle-btns ${toggle ? "active" : ""}`}
          onClick={onClick2}
        >
          {text2}
        </button>

      </div>
    )  
}