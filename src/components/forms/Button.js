import React from 'react'
import PropTypes from 'prop-types'

const Button = props => {
  let {
    buttonType,
    isSubmitted,
    type,
    image,
    disabled,
    onClick,
    children
  } = props

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
      data-test={props['data-test']}
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
  onClick: PropTypes.func.isRequired,
  'data-test': PropTypes.string
}

export default Button
