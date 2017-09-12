import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import FieldValidation from '../../../forms/FieldValidation'
import Toggle from '../../../forms/Toggle'
import { required } from '../../../../helpers/validators'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

class KintoBlockCreateForm extends Component {
  render() {
    return (
      <form className="kintoblock-create form-container">
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
            />
            <Field
              name="starterPack"
              label="Starter Pack"
              placeholder="Choose which language to start with"
              component={FieldValidation}
              validate={required}
              type="select"
            >
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
                  validate={required}
                  type="number"
                />
              </div>
              <div className="input-container">
                <Field
                  name="memoryRequests"
                  label="Memory Requests"
                  placeholder="64 - 262144 MB"
                  component={FieldValidation}
                  validate={required}
                  type="number"
                />
              </div>
            </div>
            <div className="line" />
            <div className="cpu">
              <div className="toggle-wrapper">
                <Toggle name="toggleCPU" id="toggleCPU" text="Dedicated CPUs" />
              </div>
              <div className="limits-requests">
                <div className="input-container">
                  <Field
                    name="cpuLimits"
                    label="CPU Limits"
                    placeholder="1 - 1000 m"
                    component={FieldValidation}
                    validate={required}
                    type="number"
                  />
                </div>
                <div className="input-container">
                  <Field
                    name="cpuRequests"
                    label="CPU Requests"
                    placeholder="1 - 1000 m"
                    component={FieldValidation}
                    validate={required}
                    type="number"
                  />
                </div>
              </div>
            </div>
            <div className="line" />
            <div className="scaling">
              <Slider min={50} max={100} step={10} dots={true} />
            </div>
          </div>
        </div>
      </form>
    )
  }
}

export default reduxForm({ form: 'kintoblockCreateForm' })(KintoBlockCreateForm)
