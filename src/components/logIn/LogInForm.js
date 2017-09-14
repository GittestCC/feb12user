import React from 'react'
import TitleWithLines from '../ui/TitleWithLines'
import { Field, reduxForm } from 'redux-form'
import { FieldValidation, Button, Password, CheckBox } from '../forms'
import { required } from '../../helpers/validators'
import githubIcon from '../../images/footer-socials-github.svg'

const LogInForm = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit} className="log-in-form">
    <h2>Log In</h2>
    <Button buttonType="dark" type="submit" image={githubIcon}>
      Log In with GitHub
    </Button>
    <TitleWithLines text="or" />
    <Field
      label="username / email"
      name="userName"
      placeholder="Enter username or email"
      component={FieldValidation}
      validate={required}
    />
    <Field
      label="password"
      name="logInPassword"
      placeholder="Enter a password"
      component={Password}
      validate={required}
    />
    <Field
      name="KeepSignedIn"
      label="Keep me logged in for two weeks"
      component={CheckBox}
    />
    <Button buttonType="secondary" type="submit">
      Log In
    </Button>
    <a href="forgot-password" className="forgot-password">
      Forgot Password?
    </a>
  </form>
)

export default reduxForm({ form: 'logIn' })(LogInForm)
