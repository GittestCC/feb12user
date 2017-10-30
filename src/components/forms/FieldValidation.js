import React from 'react'
import PropTypes from 'prop-types'
import Tooltip from 'rc-tooltip'

/**
 * a custom field used with redux form used to output a field with validation messages
 * used mainly when there is a `validate` option passed to `Field`
 */
const FieldValidation = props => {
  const { input, placeholder, label, type, help, close } = props
  const { touched, submitFailed, error } = props.meta
  const hasError = (touched || submitFailed) && error
  let className = input.className || ''
  if (hasError) {
    className += ' error'
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
    <div className="field-wrapper">
      <label htmlFor={input.name}>{label}</label>
      {help && (
        <Tooltip placement="top" overlay={help} trigger="click">
          <span className="tooltip" />
        </Tooltip>
      )}
      <div className={`field-input-wrapper ${close ? 'with-close' : ''}`}>
        {inputEl}
        {close && <img src="/images/icon-red-delete.svg" alt="" />}
        {hasError && <div className="error-message">{error}</div>}
      </div>
    </div>
  )
}
FieldValidation.PropTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  help: PropTypes.string,
  close: PropTypes.bool
}

export default FieldValidation
