import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { FieldValidation, Button } from '../../forms'
import { required, isLessThan200 } from '../../../helpers/forms/validators'
import ManageDependenciesFieldContainer from '../../../containers/dashboard/ui/ManageDependenciesFieldContainer'
import WorkspaceToolbarContainer from '../../../containers/dashboard/ui/WorkspaceToolbarContainer'

const KintoAppForm = ({
  handleSubmit,
  version,
  appDependencies,
  kintoApp,
  isCreate,
  isTagged
}) => (
  <form className="kintoapp-create form-container" onSubmit={handleSubmit}>
    <div className="form-wrapper workspaces">
      <WorkspaceToolbarContainer
        isKintoApp={true}
        kintoItem={kintoApp}
        isCreate={isCreate}
      />
    </div>

    <div className="form-wrapper basic-info">
      <h3>Basic Info</h3>
      <h5>
        Choose the name for this application and give a a short description. If
        you make the application public, they will help other people discover
        your application.
      </h5>
      <div className="form-body full-row">
        <Field
          name="name"
          label="application name"
          placeholder="Enter a name for your application"
          component={FieldValidation}
          validate={required}
          type="text"
        />
        <Field
          characterCount="200"
          name="shortDescription"
          label="Description"
          placeholder="Enter a short description of your KintoBlock"
          component={FieldValidation}
          validate={[required, isLessThan200]}
          type="textarea"
        />
      </div>
    </div>
    <div className="form-wrapper blocks-and-services">
      <ManageDependenciesFieldContainer
        name="appDependencies"
        dependencies={appDependencies}
        appVersion={version}
        disabled={isTagged}
      />
    </div>
    <div className="form-wrapper clients">
      <h3>Clients</h3>
      <h5>
        Create a repository for a new client or use a client you already own to
        consume your application.
      </h5>

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
            disabled={isTagged}
          />
          <div className="line" />
        </div>
        <div className="bottom">
          <Button type="button" buttonType="secondary" disabled={isTagged}>
            Create New Client
          </Button>
          <Button type="button" buttonType="secondary" disabled={isTagged}>
            Use Existing Client
          </Button>
        </div>
      </div>
    </div>
  </form>
)

KintoAppForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  version: PropTypes.string.isRequired,
  appDependencies: PropTypes.array,
  kintoApp: PropTypes.object,
  isCreate: PropTypes.bool.isRequired,
  isTagged: PropTypes.bool.isRequired
}

const validate = (values, isTagged) => {
  let errors = {}
  const protocolInputs = values.protocolInputs || {}
  if (!protocolInputs.restful && !protocolInputs.gRPC && !isTagged) {
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
