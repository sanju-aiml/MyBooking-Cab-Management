import React from 'react'

const roles = [
  { label: 'Admin', value: 'Admin' },
  { label: 'Hr', value: 'Hr' },
  { label: 'Driver', value: 'Driver' }
]

function SelectRole({ id = 'role', value, onChange, ariaDescribedBy }) {
  return (
    <div className="ui-select-wrapper">
      <select
        id={id}
        className="ui-select"
        name="role"
        value={value}
        onChange={onChange}
        aria-describedby={ariaDescribedBy}
        aria-label="Select role"
      >
        {roles.map(r => (
          <option key={r.value} value={r.value}>{r.label}</option>
        ))}
      </select>
      <span className="ui-caret" aria-hidden="true">▾</span>
    </div>
  )
}

export default SelectRole