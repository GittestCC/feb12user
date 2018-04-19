import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { FieldValidation, Toggle } from '../../forms'
import { isProduction } from '../../../helpers/pageHelper'
import { environments } from '../../../helpers/forms/validationFields'

const KintoAppEnvironmentForm = ({ kintoApp, environment, handleSubmit }) => {
  return (
    <form
      className="kintoapp-environment-form form-container"
      onSubmit={handleSubmit}
    >
      <div className="form-wrapper">
        <h3>Basic Info</h3>
        <h5>
          Set up the name and get the client ID and Secret Key for this
          environment.
        </h5>

        <div className="form-body">
          <div className="field-wrapper">
            <Field
              name="envName"
              label="environment name"
              placeholder="Please enter a name for your environment"
              component={FieldValidation}
              validate={environments.envName}
              type="text"
            />
          </div>

          {!isProduction() ? (
            <div className="field-wrapper toggle">
              <Field
                name="autoUpdate"
                label="Automatically deploy application when new Kintoblock builds are available"
                component={Toggle}
                help="To enable automated deployment of your application, activate this toggle and select a branch for any KintoBlock components inside the application."
              />
            </div>
          ) : null}
        </div>
      </div>
    </form>
  )
}

KintoAppEnvironmentForm.propTypes = {
  kintoApp: PropTypes.object.isRequired,
  environment: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'KintoAppEnvironmentForm',
  enableReinitialize: true
})(KintoAppEnvironmentForm)
