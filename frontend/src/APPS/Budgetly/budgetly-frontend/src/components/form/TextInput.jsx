
import './styles/inputLayout.css'


function TextInput({ type, label, name, placeholder, id, value, onChange, error }) {
    
    if (!["text", "email", "password", "date", "number"].includes(type)) return null

    const inputId = id || name

    return (
      <div className="input-wrapper">
        <label htmlFor={inputId} className='form-label'>
          {label}
        </label>
        <input 
            type={type}
            name={name}
            placeholder={placeholder}
            id={inputId}
            className={`inputFeild ${error ? "error-feild" : ""}`} 
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />    
        {error && <p className='error-text'>{error}</p>}
      </div>

    )
}

export default TextInput;