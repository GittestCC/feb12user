import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Toggle, FieldValidation, Slider } from '../../../forms'
import {
  required,
  isBetween64,
  isBetween1000
} from '../../../../helpers/validators'
import { lessThanFormat, allowFalse } from '../../../../helpers/formatters'

const KintoBlockCreateForm = ({
  isDedicatedCPU,
  handleSubmit,
  resetCPUHandler
}) => {
  const sliderMarks = {
    50: '50%',
    60: '60%',
    70: '70%',
    80: '80%',
    90: '90%',
    100: '100%'
  }
  const selectNumberOfCores = [1, 2, 4, 8, 16, 32, 64, 128]
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
      <div className="form-wrapper hardware-requirements">
        <h3>Hardware Requirements</h3>
        <h5>
          What does this baby need to stay healthy and kicking? You can still
          modify these settings later.
        </h5>

        <div className="form-body">
          <div className="memory">
            <div className="input-container">
              <Field
                name="memoryLimits"
                label="Memory Limits"
                placeholder="64 - 262144 MB"
                component={FieldValidation}
                validate={[required, isBetween64]}
                normalize={lessThanFormat(262144)}
                type="number"
                help="Starter pack is the programming language you would like to use for this project"
              />
            </div>
            <div className="input-container">
              <Field
                name="memoryRequests"
                label="Memory Requests"
                placeholder="64 - 262144 MB"
                component={FieldValidation}
                validate={[required, isBetween64]}
                normalize={lessThanFormat(262144)}
                type="number"
                help="Starter pack is the programming language you would like to use for this project"
              />
            </div>
          </div>
          <div className="line" />
          <div className="cpu">
            <div className="toggle-wrapper">
              <Field
                onChange={resetCPUHandler}
                name="toggleCPU"
                label="Dedicated CPUs"
                component={Toggle}
                normalize={allowFalse}
                help="Starter pack is the programming language you would like to use for this project"
              />
            </div>

            {isDedicatedCPU ? (
              <div className="limits-requests">
                <div className="input-container">
                  <Field
                    name="cpuLimits"
                    label="CPU Limits"
                    component={FieldValidation}
                    validate={required}
                    type="select"
                    help="Starter pack is the programming language you would like to use for this project"
                  >
                    <option>Number of cores</option>
                    {selectNumberOfCores.map((c, i) => (
                      <option value={c} key={i}>
                        {c}
                      </option>
                    ))}
                  </Field>
                </div>
                <div className="input-container">
                  <Field
                    name="cpuRequests"
                    label="CPU Requests"
                    placeholder="1 - 1000 m"
                    component={FieldValidation}
                    validate={required}
                    type="select"
                    help="Starter pack is the programming language you would like to use for this project"
                  >
                    <option>Number of cores</option>
                    {selectNumberOfCores.map((c, i) => (
                      <option value={c} key={i}>
                        {c}
                      </option>
                    ))}
                  </Field>
                </div>
              </div>
            ) : (
              <div className="limits-requests">
                <div className="input-container">
                  <Field
                    name="cpuLimits"
                    label="CPU Limits"
                    placeholder="1 - 1000 m"
                    component={FieldValidation}
                    validate={[required, isBetween1000]}
                    normalize={lessThanFormat(1000)}
                    type="number"
                    help="Starter pack is the programming language you would like to use for this project"
                  />
                </div>
                <div className="input-container">
                  <Field
                    name="cpuRequests"
                    label="CPU Requests"
                    placeholder="1 - 1000 m"
                    component={FieldValidation}
                    validate={[required, isBetween1000]}
                    normalize={lessThanFormat(1000)}
                    type="number"
                    help="Starter pack is the programming language you would like to use for this project"
                  />
                </div>
              </div>
            )}
          </div>
          <div className="line" />
          <div className="scaling">
            <Field
              name="scalingThreshold"
              label="Scaling Threshold"
              component={Slider}
              min={50}
              marks={sliderMarks}
              step={null}
              help="Starter pack is the programming language you would like to use for this project"
            />
          </div>
        </div>
      </div>
    </form>
  )
}

export default reduxForm({ form: 'kintoBlockCreateForm' })(KintoBlockCreateForm)
