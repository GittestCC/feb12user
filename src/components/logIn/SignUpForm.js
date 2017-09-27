import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { FieldValidation, Button, Password, FormError } from '../forms'
import { required, email, password } from '../../helpers/forms/validators'

const SignUpForm = ({ handleSubmit, error, submitting, pristine }) => (
  <form onSubmit={handleSubmit} className="sign-up-form">
    <h2>Sign Up</h2>
    <div className="line divider" />
    <div>
      <Field
        type="text"
        name="userName"
        label="Username"
        id="userName"
        placeholder="Enter username"
        component={FieldValidation}
        validate={required}
      />
      <Field
        type="email"
        name="email"
        label="email"
        id="email"
        placeholder="Enter your email address"
        component={FieldValidation}
        validate={(required, email)}
      />
      <Field
        name="password"
        id="signUpPassword"
        placeholder="Create a password"
        component={Password}
        validate={[required, password]}
      />
      <div className="byline">
        <h6>Requires 8 characters, at least 1 number and 1 letter</h6>
      </div>
      <FormError error={error} />
      <Button type="submit" disabled={pristine || submitting}>
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

export default reduxForm({ form: 'signUp' })(SignUpForm)
