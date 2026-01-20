import './plainText.css'

const PlainText = ({ texts=[] }) => {

    return(
        <div className="digId-text-contr">
            {texts.map((text, i) => {
                return <p key={i} >{text}</p>
            })}
        </div>
    )
}

export default PlainText;