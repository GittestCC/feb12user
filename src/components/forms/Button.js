import React from 'react'
import PropTypes from 'prop-types'

const Button = ({
  buttonType,
  isSubmitted,
  type,
  image,
  disabled,
  onClick,
  children
}) => {
  type = type || 'submit'
  buttonType = buttonType || 'default'

  const buttonHandler = e => {
    if (onClick && !isSubmitted && !disabled) {
      onClick(e)
    }
  }

  if (isSubmitted) {
    buttonType = 'submitted'
  }

  return (
    <button
      type={type}
      className={`button ${buttonType} ${disabled ? 'disabled' : ''}`}
      onClick={buttonHandler}
      disabled={!!disabled}
    >
      {image ? <img src={image} alt="" /> : ''}
      {children}
    </button>
  )
}
Button.propType = {
  buttonType: PropTypes.string,
  type: PropTypes.string,
  isSubmitted: PropTypes.bool,
  image: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired
}

export default Button
