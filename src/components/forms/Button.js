import React from 'react'

const Button = ({
  buttonType,
  isSubmitted,
  type,
  image,
  onClick,
  disabled,
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
    >
      {image ? <img src={image} alt="" /> : ''}
      {children}
    </button>
  )
}

export default Button
