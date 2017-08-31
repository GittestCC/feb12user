import React from 'react'

const Button = ({
  buttonType,
  isSubmitted,
  type,
  image,
  text,
  onClick,
  disabled
}) => {
  type = type || 'submit'

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
      {text}
    </button>
  )
}

export default Button
