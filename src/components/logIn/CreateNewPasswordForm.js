import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { Button, Password } from '../forms'
import { required, password } from '../../helpers/forms/validators'

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
        name="createNewPassword"
        placeholder="Create new password"
        component={Password}
        validate={[required, password]}
      />
      <div className="byline">
        <h6>Requires 8 characters, at least 1 number and 1 letter</h6>
      </div>
      <Field
        name="createNewPasswordConfirm"
        placeholder="Enter your new password again"
        component={Password}
        validate={[required, password]}
      />
      <Button type="submit">Create New Password</Button>
    </form>
  </div>
)
CreateNewPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default reduxForm({ form: 'createNewPassword', validate })(
  CreateNewPasswordForm
)
