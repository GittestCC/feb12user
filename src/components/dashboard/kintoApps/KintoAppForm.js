import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import { FieldValidation, Button, CheckBox } from '../../forms'
import { required } from '../../../helpers/forms/validators'
import DependencyManagement from '../../forms/DependencyManagement'

const KintoAppForm = ({
  handleSubmit,
  version,
  appDependenciesInfo,
  searchKintoBlocks,
  fetchKintoBlockDependenciesData
}) => {
  return (
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
              value={version || ''}
              disabled
            />
          </div>
        </div>
      </div>
      <div className="form-wrapper blocks-and-services">
        <h3>KintoBlocks & Services</h3>
        <h5>
          Choose the build and give your baby a number so they don’t get mixed
          up in a sea of babies.
        </h5>
        <FieldArray
          name="appDependencies"
          component={DependencyManagement}
          appDependenciesInfo={appDependenciesInfo}
          searchUrl="/kintoblocks/search"
          onSearchKintoBlocks={searchKintoBlocks}
          fetchKintoBlockDependenciesData={fetchKintoBlockDependenciesData}
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

        <div className="form-body">
          <Field label="gRPC" name="gRPC" id="gRPC" component={CheckBox} />
          <Field
            label="RESTFUL"
            name="RESTFUL"
            id="RESTFUL"
            component={CheckBox}
          />
        </div>
      </div>
    </form>
  )
}

export default reduxForm({ form: 'kintoAppForm', enableReinitialize: true })(
  KintoAppForm
)
