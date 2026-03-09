import React from 'react'

function SubmitButton({ loading, children }) {
  return (
    <button type="submit" className="ui-button" disabled={loading} aria-busy={loading} aria-live="polite">
      {loading ? <span className="ui-spinner" /> : null}
      <span>{children}</span>
    </button>
  )
}

export default SubmitButton