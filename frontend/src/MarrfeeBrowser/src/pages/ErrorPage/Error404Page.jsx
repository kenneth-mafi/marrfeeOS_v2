import './errorPage.css';

const Error404Page = ({ onExit }) => {
    return (
        <div className={`MBr-error-page-contr`}>
            <div className="MBr-error-message-contr">
                <h1>404</h1>
                <h2>Oops, This Page Not Found!</h2>
                <h4>The link might be corrupted or incorrect,</h4>
                <p>or the page may have been removed</p>
            </div>
            <button className={`MBr-error-page-back-btn`} onClick={onExit}>
                Go Back Home
            </button>
        </div>
    )
}

export default Error404Page;