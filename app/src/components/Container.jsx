import React from 'react'

function Container({ children, theme = 'dark' }) {
  return (
    <div className="ui-shell" data-theme={theme}>
      <div className="ui-bg-orb primary" />
      <div className="ui-bg-orb secondary" />
      <div className="ui-card">
        <div className="ui-card-inner">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Container