import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Button, Password } from '../forms'
import { required, password } from '../../helpers/validators'

const validate = values => {
  const errors = {}
  if (values.createNewPassword !== values.createNewPasswordConfirm) {
    errors.createNewPasswordConfirm = 'Passwords do not match.'
  }
  return errors
}

const CreateNewPasswordForm = ({ handleSubmit }) => (
  <div className="content create-new-password-wrapper">
    <form onSubmit={handleSubmit} className="create-new-password">
      <h2>Create New Password</h2>
      <div className="line" />
      <Field
        label="Enter password"
        name="createNewPassword"
        placeholder="Create new password"
        component={Password}
        validate={[required, password]}
      />
      <div className="byline">
        <h6>Requires 8 characters, at least 1 number and 1 letter</h6>
      </div>
      <Field
        label="confirm new password"
        name="createNewPasswordConfirm"
        placeholder="Enter your new password again"
        component={Password}
        validate={[required, password]}
      />
      <Button type="submit">Create New Password</Button>
    </form>
  </div>
)

export default reduxForm({ form: 'createNewPassword', validate })(
  CreateNewPasswordForm
)
