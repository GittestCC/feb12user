import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { FieldValidation, Button, Password, FormError } from '../forms'
import { signup, email } from '../../helpers/forms/validationFields'

const SignUpForm = ({
  handleSubmit,
  error,
  submitting,
  pristine,
  focusHere
}) => (
  <form data-test="signupForm" onSubmit={handleSubmit} className="sign-up-form">
    <h2>Sign Up</h2>
    <div className="line divider" />
    <div>
      <Field
        id="signupUsername"
        type="text"
        name="userName"
        label="Username"
        placeholder="Enter username"
        component={FieldValidation}
        validate={signup.username}
        className="input-lg"
        focusHere={focusHere}
      />
      <Field
        id="signupEmail"
        type="email"
        name="email"
        label="email"
        placeholder="Enter your email address"
        component={FieldValidation}
        validate={email}
        className="input-lg"
      />
      <Field
        id="signupPassword"
        name="password"
        placeholder="Create a password"
        component={Password}
        validate={signup.password}
        className="input-lg"
      />
      <div className="byline">
        <h6>Requires 8 characters, at least 1 letter and 1 number</h6>
      </div>
      <FormError error={error} />
      <Button
        type="submit"
        disabled={pristine || submitting}
        className="btn-lg"
      >
        Sign Up
      </Button>
      {/* <div className="byline">
        <h6>
        By clicking "Sign Up" you agree to our{' '}
        <a href="#">Terms of Service</a> and{' '}
        <a href="#">Privacy Policy</a>.
        </h6>
      </div> */}
    </div>
  </form>
)
SignUpForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  focusHere: PropTypes.bool
}

export default reduxForm({ form: 'signUp' })(SignUpForm)
