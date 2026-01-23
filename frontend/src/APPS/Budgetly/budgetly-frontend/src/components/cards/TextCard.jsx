import './styles/textCard.css';

const TextCard = ({ texts=[] }) => {
    return (
        <div className="text-card-container">
            {texts.map((text, i) => {
                return <p key={i}>{text}</p>
            })}
        </div>
    )
}

export default TextCard;