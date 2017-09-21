import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { FieldValidation, Button, CheckBox } from '../../../forms'
import { required } from '../../../../helpers/validators'

const KintoAppCreateForm = ({ handleSubmit }) => {
  return (
    <form className="kintoapp-create form-container" onSubmit={handleSubmit}>
      <div className="form-wrapper basic-info">
        <h3>Basic Info</h3>
        <h5>Give your baby a name, and a version number.</h5>

        <div className="form-body">
          <Field
            name="kintoAppName"
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
              name="versionNumber"
              className="disabled"
              value="1.0.0"
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

        <div className="form-body">
          <Field
            name="searchKintoBlocksAndServices"
            type="search"
            component={FieldValidation}
            validate={required}
            placeholder="Search KintoBlocks or services"
          />

          <div className="no-blocks-or-services">
            <div className="icons">
              <div className="kinto-block" />
              <div className="service" />
            </div>
            <div className="text">No KintoBlocks or services added</div>
          </div>
        </div>
      </div>

      <div className="form-wrapper clients">
        <h3>Clients</h3>
        <h5>Give your baby a name, and a version number</h5>

        <div className="form-body">
          <Button buttonType="secondary">Create New Client</Button>
          <Button buttonType="secondary">Use Existing Client</Button>
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

export default reduxForm({ form: 'kintoAppCreateForm' })(KintoAppCreateForm)
