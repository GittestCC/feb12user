import React from 'react'
import { reduxForm, Field } from 'redux-form'
import PropTypes from 'prop-types'
import { FieldValidation } from '../../../../forms'
import { environments } from '../../../../../helpers/forms/validationFields'

const AddNewEnvironmentModalForm = ({
  onClose,
  handleSubmit,
  addNewEnvironment,
  kintoApp
}) => {
  const addNewEnvironmentandClose = result => {
    const id = kintoApp.id
    addNewEnvironment(id, result)
    onClose()
  }

  return (
    <div className="add-new-environment">
      <div className="kh-modal-title">Add New Environment</div>
      <div className="kh-modal-body">
        <form onSubmit={handleSubmit(addNewEnvironmentandClose)}>
          <div className="full-width-field">
            <Field
              name="envName"
              label="Environment Name"
              placeholder="Enter a name for your environment"
              component={FieldValidation}
              validate={environments.envName}
              type="text"
            />
          </div>
          <div className="kh-modal-actions">
            <button onClick={onClose} className="button secondary">
              Cancel
            </button>
            <button type="submit" className="button dark">
              Add New Environment
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

AddNewEnvironmentModalForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  addNewEnvironment: PropTypes.func.isRequired,
  kintoApp: PropTypes.object.isRequired
}

export default reduxForm({ form: 'AddNewEnvironmentModalForm' })(
  AddNewEnvironmentModalForm
)
