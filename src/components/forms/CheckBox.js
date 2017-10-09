import React from 'react'

const CheckBox = ({ input, id, label, meta }) => {
  const { touched, submitFailed, error } = meta
  const hasError = (touched || submitFailed) && error
  let className = input.className || ''
  if (hasError) {
    className += ' error'
  }

  return (
    <div>
      <div className="checked-field-wrapper">
        <input
          {...input}
          className={`checkbox ${input.value ? 'checked' : ''} ${className}`}
          type="checkbox"
          id={id || input.name}
        />
        <label className="checkbox-message" htmlFor={id || input.name}>
          <h6>{label}</h6>
        </label>
      </div>
      {hasError && <div className="error-message">{error}</div>}
    </div>
  )
}

export default CheckBox
