import React, { Component } from 'react'
import Button from '../forms/Button'

class SignUpForm extends Component {
  state = {
    userName: '',
    emailAddress: '',
    password: '',
    checked: false
  }

  handleInputChange = event => {
    const { value, name } = event.target
    this.setState({
      [name]: value
    })
  }

  togglePasswordView = () => {
    this.setState({ checked: !this.state.checked })
  }

  render() {
    return (
      <div className="sign-up-form">
        <h2>Sign Up</h2>
        <div className="line divider" />
        <form action="submit">
          <label htmlFor="userName">Username</label>
          <input
            name="userName"
            id="userName"
            placeholder="Enter username or Email"
            onChange={this.handleInputChange}
            value={this.state.userName}
          />
          <label htmlFor="emailAddress">Email Address</label>
          <input
            type="email"
            name="emailAddress"
            id="emailAddress"
            placeholder="Enter your email address"
            onChange={this.handleInputChange}
            value={this.state.emailAddress}
          />
          <label htmlFor="signUpPassword">Password</label>
          <div className="input-with-image-wrapper">
            <input
              type={`${this.state.checked ? 'text' : 'password'}`}
              name="password"
              id="signUpPassword"
              placeholder="Create a password"
              onChange={this.handleInputChange}
              value={this.state.password}
            />
            <div
              className={`show-password ${this.state.checked ? 'checked' : ''}`}
              onClick={this.togglePasswordView}
            />
          </div>
          <div className="byline">
            <h6>Requires 8 characters, at least 1 number and 1 letter</h6>
          </div>
          <Button buttonType="button default" type="submit" text="Sign Up" />
          {/* <div className="byline">
            <h6>
              By clicking "Sign Up" you agree to our{' '}
              <a href="#">Terms of Service</a> and{' '}
              <a href="#">Privacy Policy</a>.
            </h6>
          </div> */}
        </form>
      </div>
    )
  }
}

export default SignUpForm
