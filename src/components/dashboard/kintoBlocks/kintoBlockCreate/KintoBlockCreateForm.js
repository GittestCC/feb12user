import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { FieldValidation, FormError } from '../../../forms'
import { required, isLessThan200 } from '../../../../helpers/forms/validators'
import WorkspaceToolbarContainer from '../../../../containers/dashboard/ui/WorkspaceToolbarContainer'

// change to class so that i can use state for the number countdown

// research how to change the color of characters after a certain number has passed

class KintoBlockCreateForm extends Component {
  static propTypes = {
    // isDedicatedCPU: PropTypes.bool.isRequired, TODO: removed these variables because they are not being used at the moment
    // resetCPUHandler: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
  }

  render() {
    const { handleSubmit, error, kintoBlock } = this.props
    // const { isDedicatedCPU, handleSubmit, resetCPUHandler, error } = this.props TODO: removed these variables because they are not used at the moment

    return (
      <form
        className="kintoblock-create form-container"
        onSubmit={handleSubmit}
        data-test="kb-create-form"
      >
        <div className="form-wrapper workspaces full-row">
          <WorkspaceToolbarContainer
            isKintoApp={false}
            isCreate={true}
            kintoItem={kintoBlock}
          />
        </div>
        <div className="form-wrapper basic-info">
          <h3>Basic Info</h3>
          <h5>
            Give your baby a name, choose which language they will speak, and
            where they will live.
          </h5>

          <div className="form-body">
            <Field
              name="name"
              label="KintoBlock Name"
              placeholder="Enter a name for your KintoBlock"
              component={FieldValidation}
              validate={required}
              type="text"
              help="Choose a name for your KintoBlock"
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
            <div className="line" />
            <div className="language-protocol">
              <Field
                name="language"
                label="Language"
                component={FieldValidation}
                validate={required}
                type="select"
                className="bold"
                help="Choose the programming language you would like to use for this project"
              >
                <option>Choose the language</option>
                <option value="CSHARP">C#.net</option>
                <option value="NODEJS">Node.js</option>
                <option value="JAVA8">Java 8</option>
                <option value="RUBY">Ruby</option>
                <option value="PYTHON3">Python</option>
              </Field>
              <Field
                name="protocol"
                label="protocol"
                component={FieldValidation}
                validate={required}
                type="select"
                className="bold"
                help="Choose the protocol you would like to communicate with"
              >
                <option>Choose the protocol</option>
                <option value="HTTP">HTTP</option>
                <option value="GRPC">gRPC</option>
                <option value="GRAPHQL">GraphQL</option>
              </Field>
            </div>
            <div className="line" />
            <Field
              name="repositoryName"
              label="repository"
              placeholder="Enter a name for your repository"
              component={FieldValidation}
              validate={required}
              type="text"
              help="Starter pack is the programming language you would like to use for this project"
            />
          </div>
        </div>
        {/*
          <FormSection name="hardwareData">
          <KintoBlockHardwareData
            isDedicatedCPU={isDedicatedCPU}
            resetCPUHandler={resetCPUHandler}
          />
          </FormSection>
        */}
        <FormError error={error} />
      </form>
    )
  }
}

export default reduxForm({ form: 'kintoBlockCreateForm' })(KintoBlockCreateForm)
