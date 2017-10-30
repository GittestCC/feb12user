import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm, FormSection } from 'redux-form'
import { FieldValidation, Button, CheckBox } from '../../forms'
import { required } from '../../../helpers/forms/validators'
import ManageDependenciesFieldContainer from '../../../containers/dashboard/ui/ManageDependenciesFieldContainer'

const KintoAppForm = ({ handleSubmit, version, appDependencies }) => (
  <form className="kintoapp-create form-container" onSubmit={handleSubmit}>
    <div className="form-wrapper basic-info">
      <h3>Basic Info</h3>
      <h5>Give your baby a name, and a version number.</h5>
      <div className="form-body">
        <Field
          name="name"
          label="application name"
          placeholder="Enter a name for your application"
          component={FieldValidation}
          validate={required}
          type="text"
        />
        <div className="field-wrapper">
          <label htmlFor="versionNumber">Version number</label>
          <input
            type="text"
            name="version"
            className="disabled"
            value={version}
            disabled
          />
        </div>
      </div>
    </div>
    <div className="form-wrapper blocks-and-services">
      <ManageDependenciesFieldContainer
        name="appDependencies"
        dependencies={appDependencies}
        appVersion={version}
      />
    </div>
    <div className="form-wrapper clients">
      <h3>Clients</h3>
      <h5>Give your baby a name, and a version number</h5>

      <div className="form-body">
        <div className="top">
          <h4 className="bold">Use Existing Client</h4>
          <Field
            help="Choose an existing repository to use for your client"
            label="REPOSITORY"
            name="repository"
            id="repository"
            close={true}
            placeholder="Enter a name for the repository"
            component={FieldValidation}
          />
          <div className="line" />
        </div>
        <div className="bottom">
          <Button type="button" buttonType="secondary">
            Create New Client
          </Button>
          <Button type="button" buttonType="secondary">
            Use Existing Client
          </Button>
        </div>
      </div>
    </div>

    <div className="form-wrapper protocols">
      <h3>Protocols</h3>
      <h5>Choose a communication protocol.</h5>

      <FormSection name="protocolInputs">
        <div className="form-body">
          <Field label="gRPC" name="gRPC" id="gRPC" component={CheckBox} />
          <Field
            label="restful"
            name="restful"
            id="restful"
            component={CheckBox}
          />
        </div>
      </FormSection>
    </div>
  </form>
)

KintoAppForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  version: PropTypes.string.isRequired,
  appDependencies: PropTypes.array
}

const validate = values => {
  let errors = {}
  const protocolInputs = values.protocolInputs || {}
  if (!protocolInputs.restful && !protocolInputs.gRPC) {
    errors.protocolInputs = {
      restful: 'You should at least pick one protocol'
    }
  }
  return errors
}

export default reduxForm({
  form: 'kintoAppForm',
  enableReinitialize: true,
  validate
})(KintoAppForm)
