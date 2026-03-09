import React from 'react'

function InputField({ id, label, type = 'text', name, value, onChange, required = false, autoComplete = 'off', ariaDescribedBy, icon }) {
  return (
    <div className="ui-field">
      {icon ? (
        <span className="ui-input-icon" aria-hidden="true">{icon}</span>
      ) : null}
      <input
        id={id}
        name={name}
        className="ui-input"
        type={type}
        value={value}
        onChange={onChange}
        placeholder={label}
        required={required}
        autoComplete={autoComplete}
        aria-describedby={ariaDescribedBy}
      />
    </div>
  )
}

export default InputField