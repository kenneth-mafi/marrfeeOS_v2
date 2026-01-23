
import './styles/textarea.css'
import './styles/inputLayout.css'

function TextArea({label, name, placeholder, id, value, onChange, error}) {
    const textId = id || name
    return (
      <div className="input-wrapper">
        <label htmlFor={textId} className='form-label'>
          {label}
        </label>
        <textarea
            name={name}
            placeholder={placeholder}
            id={textId}
            className="textarea-input" 
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />    
        {error && <p className='error-text'>{error}</p>}
      </div>

    )
}

export default TextArea;