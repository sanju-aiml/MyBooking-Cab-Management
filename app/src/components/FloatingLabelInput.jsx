import React from 'react'

function FloatingLabelInput({ id, label, type = 'text', value, onChange, required = false, autoComplete = 'off', ariaDescribedBy }) {
  return (
    <div className="ui-field ui-floating">
      <input
        id={id}
        className="ui-input"
        type={type}
        value={value}
        onChange={onChange}
        placeholder=" "
        required={required}
        autoComplete={autoComplete}
        aria-describedby={ariaDescribedBy}
      />
      <label className="ui-label" htmlFor={id}>{label}</label>
    </div>
  )
}

export default FloatingLabelInput