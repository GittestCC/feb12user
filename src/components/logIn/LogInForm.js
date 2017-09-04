import React, { Component } from 'react'
import TitleWithLines from '../ui/TitleWithLines'
import CheckBox from '../forms/CheckBox'
import Button from '../forms/Button'
import githubIcon from '../../images/footer-socials-github.svg'

class LogInForm extends Component {
  state = {
    userName: '',
    password: '',
    showPassword: false,
    checked: false
  }

  handleInputChange = event => {
    const { value, name } = event.target
    this.setState({
      [name]: value
    })
  }

  togglePasswordView = () => {
    this.setState({ showPassword: !this.state.showPassword })
  }

  checkBoxToggle = () => {
    this.setState({ checked: !this.state.checked })
  }

  render() {
    return (
      <div className="log-in-form">
        <h2>Log In</h2>
        <Button buttonType="dark" type="submit" image={githubIcon}>
          Log In with GitHub
        </Button>
        <TitleWithLines text="or" />
        <form action="submit">
          <label htmlFor="userName">Username / Email</label>
          <input
            type="text"
            name="userName"
            id="userName"
            placeholder="Enter username or Email"
            onChange={this.handleInputChange}
            value={this.state.userName}
          />
          <label htmlFor="logInPassword">Password</label>
          <div className="input-with-image-wrapper">
            <input
              type={`${this.state.showPassword ? 'text' : 'password'}`}
              name="password"
              id="logInPassword"
              placeholder="Create a password"
              onChange={this.handleInputChange}
              value={this.state.password}
            />
            <div
              className={`show-password ${this.state.showPassword
                ? 'checked'
                : ''}`}
              onClick={this.togglePasswordView}
            />
          </div>
          <CheckBox
            checkedClass={`checkbox ${this.state.checked ? 'checked' : ''}`}
            name="KeepSignedIn"
            id="keepSignedIn"
            toggle={this.checkBoxToggle}
            value={this.state.checked}
            text="Keep me logged in for two weeks"
          />
          <Button buttonType="secondary" type="submit">
            Log In
          </Button>
          {/* <a href="#" className="forgot-password">
            Forgot Password?
          </a> */}
        </form>
      </div>
    )
  }
}

export default LogInForm
