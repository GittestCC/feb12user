import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { FieldValidation, Toggle } from '../../forms'
import { isProduction } from '../../../helpers/pageHelper'
import { environments } from '../../../helpers/forms/validationFields'

const KintoAppEnvironmentForm = ({
  kintoApp,
  environment,
  isCreate,
  handleSubmit
}) => {
  return (
    <form
      className="kintoapp-environment-form form-container"
      onSubmit={handleSubmit}
    >
      <div className="form-wrapper">
        <h3>Basic Info</h3>
        <h5>Set up the name for this environment.</h5>

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

          {!isCreate && (
            <div className="field-container false two-columns">
              <div className="field">
                <div className="label">client id</div>
                <div className="false-input disabled">
                  {environment.clientId}
                </div>
              </div>
              <div className="field">
                <div className="label">secret key</div>
                <div className="false-input disabled">{environment.secret}</div>
              </div>
            </div>
          )}

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
  isCreate: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'KintoAppEnvironmentForm',
  enableReinitialize: true
})(KintoAppEnvironmentForm)
