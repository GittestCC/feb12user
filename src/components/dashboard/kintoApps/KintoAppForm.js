import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { FieldValidation } from '../../forms'
import { required, isLessThan200 } from '../../../helpers/forms/validators'
import { kintoName } from '../../../helpers/forms/validationFields'
import { isProduction } from '../../../helpers/pageHelper'
import ManageDependenciesFieldContainer from '../../../containers/dashboard/ui/ManageDependenciesFieldContainer'
import WorkspaceToolbarContainer from '../../../containers/dashboard/ui/WorkspaceToolbarContainer'
import KintoBlockServicesContainer from '../../../containers/workspaces/servicesList/KintoBlockServicesContainer'

class KintoAppForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    version: PropTypes.string,
    appDependencies: PropTypes.array,
    kintoApp: PropTypes.object,
    isCreate: PropTypes.bool.isRequired,
    isDraft: PropTypes.bool
  }
  componentDidMount() {
    this.props.initialize(this.props.initialValues)
  }
  render() {
    const {
      handleSubmit,
      version,
      appDependencies,
      kintoApp,
      isCreate,
      isDraft
    } = this.props
    return (
      <form
        className="kintoapp-create form-container"
        onSubmit={handleSubmit}
        data-test="ka-form"
      >
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
            Choose the name for this application and give it a short
            description. Only lowercase characters and digits are allowed in the
            name - no spaces and no caps for now please.
          </h5>
          <div className="form-body full-row">
            <Field
              name="name"
              label="application name"
              placeholder="Enter a name for your application"
              component={FieldValidation}
              validate={kintoName}
              type="text"
            />
            <Field
              characterCount="200"
              name="shortDescription"
              label="Description"
              placeholder="Enter a short description of your application"
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
            disabled={!isCreate && !isDraft}
          />
        </div>
        {isProduction() ? null : (
          <div className="form-wrapper">
            <KintoBlockServicesContainer />
          </div>
        )}
        <button className="hide">Submit</button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'kintoAppForm',
  enableReinitialize: true
})(KintoAppForm)
