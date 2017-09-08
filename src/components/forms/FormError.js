import React from 'react'

const FormError = ({ error }) =>
  error ? <div className="error-message-form error-message">{error}</div> : null

export default FormError
