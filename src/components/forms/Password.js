import React, { Component } from 'react'

class Password extends Component {
  state = {
    isVisible: false
  }

  togglePasswordView = () => {
    this.setState(previousState => ({
      isVisible: !previousState.isVisible
    }))
  }

  render() {
    const { input, id, label, placeholder } = this.props
    const { touched, submitFailed, error } = this.props.meta
    const hasError = (touched || submitFailed) && error
    let className = input.className || ''
    if (hasError) {
      className += 'error'
    }

    return (
      <div className="password-field-wrapper">
        <label htmlFor="signUpPassword">Password</label>
        <div className="input-with-image-wrapper">
          <input
            {...input}
            type={`${this.state.isVisible ? 'text' : 'password'}`}
            id={id || input.name}
            placeholder={placeholder}
            className={className}
          />
          <div
            className={`show-password ${this.state.isVisible ? 'visible' : ''}`}
            onClick={this.togglePasswordView}
          />
        </div>
        {hasError && <div className="error-message">{error}</div>}
      </div>
    )
  }
}

export default Password
