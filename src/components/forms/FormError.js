import React from 'react'
import PropTypes from 'prop-types'

const FormError = ({ error }) =>
  error ? (
    <div data-test="form-error" className="error-message-form error-message">
      {error}
    </div>
  ) : null
FormError.propTypes = {
  error: PropTypes.string
}

export default FormError
