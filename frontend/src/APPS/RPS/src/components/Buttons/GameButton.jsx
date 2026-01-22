

const GameButton = ({ src, alt, onClick }) => {
    return (
        <button 
            type='button'
            className='game-button'
            onClick={onClick}
        >
            <img src={src} alt={alt} />
        </button>
    )
}

export default GameButton;