import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { FieldValidation, Toggle } from '../../forms'
import { isProduction } from '../../../helpers/pageHelper'
import { environments } from '../../../helpers/forms/validationFields'

const KintoAppEnvironmentForm = ({ kintoApp, environment, isCreate }) => {
  return (
    <form className="kintoapp-environment-form form-container">
      <div className="form-wrapper">
        <h3>Basic Info</h3>
        <h5>Set up the name and auto-deployment for this environment.</h5>

        <div className="form-body">
          <div className="field-wrapper">
            <Field
              name="name"
              label="environment name"
              placeholder="Please enter a name for your environment"
              component={FieldValidation}
              validate={environments.envName}
              type="text"
            />
          </div>

          {!isCreate && (
            <div className="field-container false two-columns">
              {/* TODO: remove terniary expression here when data is available */}
              <div className="field">
                <div className="label">client id</div>
                <div className="false-input disabled">
                  {environment.clientId
                    ? environment.clientId
                    : 'FALSECLIENTIDHERE'}
                </div>
              </div>
              <div className="field">
                <div className="label">secret key</div>
                <div className="false-input disabled">
                  {environment.key ? environment.key : 'FALSEKEYHERE'}
                </div>
              </div>
            </div>
          )}

          {!isProduction() ? (
            <div className="field-wrapper toggle">
              <Field
                name="autoDeploy"
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
  isCreate: PropTypes.bool
}

export default reduxForm({
  form: 'KintoAppEnvironmentForm',
  enableReinitialize: true
})(KintoAppEnvironmentForm)
