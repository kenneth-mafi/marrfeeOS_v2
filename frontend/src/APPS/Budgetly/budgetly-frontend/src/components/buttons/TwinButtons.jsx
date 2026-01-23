import './styles/twinButtons.css';

function TwinButtons({text1, icon1, onclick1, onclick2, text2, icon2, untwin=false}) {
    return (
      <div className="twin-buttons">
        <button className='button-plain' onClick={onclick1}>
          {icon1 && <img src={icon1} alt={text1} />}
          {text1}
        </button>
        <button className={`button-plain ${untwin ? "button-blue" : ""}`} onClick={onclick2} >
          {icon2 && <img src={icon2} alt={text2} />}
          {text2}
        </button>
      </div>
    )
}

export default TwinButtons;