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
    const { input, id, label } = this.props

    return (
      <div className="password-field-wrapper">
        <label htmlFor="signUpPassword">Password</label>
        <div className="input-with-image-wrapper">
          <input
            {...input}
            type={`${this.state.isVisible ? 'text' : 'password'}`}
            id={id || input.name}
            placeholder={input.placeholder}
          />
          <div
            className={`show-password ${this.state.isVisible ? 'visible' : ''}`}
            onClick={this.togglePasswordView}
          />
        </div>
      </div>
    )
  }
}

export default Password
