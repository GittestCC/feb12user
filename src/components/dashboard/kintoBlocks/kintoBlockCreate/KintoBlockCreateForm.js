import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { FieldValidation, FormError } from '../../../forms'
import { required } from '../../../../helpers/forms/validators'
import WorkspaceToolbarContainer from '../../../../containers/dashboard/ui/WorkspaceToolbarContainer'

const KintoBlockCreateForm = ({
  isDedicatedCPU,
  handleSubmit,
  resetCPUHandler,
  error,
  isPublic,
  kintoBlock
}) => {
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
      <div className="form-wrapper basic-info full-row">
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
            help="Starter pack is the programming language you would like to use for this project"
          />
          <Field
            name="starterPack"
            label="Starter Pack"
            component={FieldValidation}
            validate={required}
            type="select"
            help="Starter pack is the programming language you would like to use for this project"
          >
            <option>Choose which language to start with</option>
            <option value="javascript">Javascript Starter Pack</option>
            <option value="c-sharp">C# Starter Pack</option>
            <option value="ruby">Ruby Starter Pack</option>
          </Field>
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
KintoBlockCreateForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default reduxForm({ form: 'kintoBlockCreateForm' })(KintoBlockCreateForm)
