import React from 'react'

/**
 * a custom field used with redux form used to output a field with validation messages
 * used mainly when there is a `validate` option passed to `Field`
 */
const FieldValidation = props => {
  const { input, placeholder, label, type } = props
  const { touched, submitFailed, error } = props.meta
  const hasError = (touched || submitFailed) && error
  let className = input.className || ''
  if (hasError) {
    className += 'error'
  }

  let inputEl
  switch (type) {
    case 'textarea':
      inputEl = (
        <textarea
          {...input}
          id={input.name}
          placeholder={placeholder}
          className={className}
        />
      )
      break
    case 'select':
      inputEl = (
        <select
          {...input}
          id={input.name}
          placeholder={placeholder}
          className={className}
        >
          {props.children}
        </select>
      )
      break
    default:
      inputEl = (
        <input
          {...input}
          id={input.name}
          type={type}
          placeholder={placeholder}
          className={className}
        />
      )
  }

  return (
    <div>
      <label htmlFor={input.name}>{label}</label>
      <div>
        {inputEl}
        {hasError && <div className="error-message">{error}</div>}
      </div>
    </div>
  )
}

export default FieldValidation
