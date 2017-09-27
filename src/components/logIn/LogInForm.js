import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import TitleWithLines from '../ui/TitleWithLines'
import {
  FieldValidation,
  Button,
  Password,
  CheckBox,
  FormError
} from '../forms'
import { required } from '../../helpers/forms/validators'
import githubIcon from '../../images/footer-socials-github.svg'

const LogInForm = ({ handleSubmit, error, submitting, pristine }) => (
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
      name="password"
      placeholder="Enter a password"
      component={Password}
      validate={required}
    />
    <Field
      name="KeepSignedIn"
      label="Keep me logged in for two weeks"
      component={CheckBox}
    />
    <FormError error={error} />
    <Button
      buttonType="secondary"
      type="submit"
      disabled={pristine || submitting}
    >
      Log In
    </Button>
    <Link to="/forgot-password" className="forgot-password">
      Forgot Password?
    </Link>
  </form>
)

export default reduxForm({ form: 'logIn' })(LogInForm)
