import React from 'react'
import PropTypes from 'prop-types'

/**
 * This components shows only the error message part of a field
 * incases like showing error message for fields that are not input (select, radio)
 */
const ErrorOnly = ({ meta: { touched, submitFailed, error } }) =>
  (touched || submitFailed) && error ? (
    <span className="errorMessage">{error}</span>
  ) : (
    false
  )
ErrorOnly.propTypes = {
  meta: PropTypes.object
}

export default ErrorOnly
