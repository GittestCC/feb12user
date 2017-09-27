import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { FieldValidation, FormError } from '../../../forms'
import { required } from '../../../../helpers/forms/validators'
import KintoBlockHardwareData from '../KintoBlockHardwareData'

const KintoBlockCreateForm = ({
  isDedicatedCPU,
  handleSubmit,
  resetCPUHandler,
  error
}) => {
  return (
    <form className="kintoblock-create form-container" onSubmit={handleSubmit}>
      <div className="form-wrapper basic-info">
        <h3>Basic Info</h3>
        <h5>
          Give your baby a name, choose which language they will speak, and
          where they will live.
        </h5>

        <div className="form-body">
          <Field
            name="kintoBlockName"
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
            name="repository"
            label="repository"
            placeholder="Enter a name for yout repository"
            component={FieldValidation}
            validate={required}
            type="text"
            help="Starter pack is the programming language you would like to use for this project"
          />
        </div>
      </div>
      <KintoBlockHardwareData
        isDedicatedCPU={isDedicatedCPU}
        resetCPUHandler={resetCPUHandler}
      />
      <FormError error={error} />
    </form>
  )
}

export default reduxForm({ form: 'kintoBlockCreateForm' })(KintoBlockCreateForm)
