import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { FieldValidation, Toggle } from '../../forms'
import { required } from '../../../helpers/forms/validators'

const KintoAppEnvironmentForm = ({ kintoApp, environment }) => {
  return (
    <form className="kintoapp-environment-form form-container">
      <div className="form-wrapper">
        <h3>Basic Info</h3>
        <h5>Give your baby a name, and a version number.</h5>

        <div className="form-body">
          <div className="field-wrapper">
            <Field
              name="name"
              label="environment name"
              placeholder="Please enter a name for your environment"
              component={FieldValidation}
              validate={required}
              type="text"
            />
          </div>

          <div className="field-wrapper toggle">
            <Field
              name="autoDeploy"
              label="Automatically deploy application when new Kintoblock builds are available"
              component={Toggle}
            />
          </div>
        </div>
      </div>
    </form>
  )
}

KintoAppEnvironmentForm.propTypes = {
  kintoApp: PropTypes.object.isRequired,
  environment: PropTypes.object.isRequired
}

export default reduxForm({
  form: 'KintoAppEnvironmentForm',
  enableReinitialize: true
})(KintoAppEnvironmentForm)
