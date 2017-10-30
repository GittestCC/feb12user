import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import Slider from 'rc-slider'
import FieldValidation from '../../../forms/FieldValidation'
import Toggle from '../../../forms/Toggle'
import { required } from '../../../../helpers/forms/validators'
import ManageDependenciesFieldContainer from '../../../../containers/dashboard/ui/ManageDependenciesFieldContainer'

class KintoBlockManageForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    dependencies: PropTypes.array
  }

  state = {
    expanded: false,
    newCustomParamaterName: '',
    newCustomParamaterValue: '',
    customParameters: [
      {
        variableName: 'Chance',
        variableValue: 'The Rapper'
      }
    ]
  }

  addCustomParamater = () => {
    const newRow = this.state.customParameters.slice()
    newRow.push({
      variableName: this.state.newCustomParamaterValue,
      variableValue: this.state.newCustomParamaterName,
      id: Math.random()
    })
    this.setState({
      customParameters: newRow,
      newCustomParamaterName: '',
      newCustomParamaterValue: ''
    })
  }

  removeParamater = index => {
    const newArray = [...this.state.customParameters]
    newArray.splice(index, 1)
    this.setState({ customParameters: newArray })
  }

  expandHardware = () => {
    this.setState({ expanded: !this.state.expanded })
  }

  render() {
    return (
      <form
        className="kintoblock-manage form-container"
        onSubmit={this.props.handleSubmit}
      >
        <div className="form-wrapper versioning full-row">
          <h3>Versioning</h3>
          <h5>
            Choose the build and give your baby a number so they don’t get mixed
            up in a sea of babies.
          </h5>

          <div className="form-body">
            <div className="field-wrapper">
              <label htmlFor="versionNumber">Version number</label>
              <div className="field-input-wrapper">
                <input
                  type="text"
                  name="version"
                  className="disabled"
                  value={'0.1.0'}
                  disabled
                />
              </div>
            </div>

            <div className="field-wrapper">
              <label htmlFor="buildNumber">Build</label>
              <div className="field-input-wrapper">
                <input
                  type="text"
                  name="buildNumber"
                  className="disabled"
                  value=""
                  placeholder="No available build found"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>

        <div className="form-wrapper blocks-and-services full-row">
          <ManageDependenciesFieldContainer
            name="dependencies"
            dependencies={this.props.dependencies}
          />
        </div>

        <div className="form-wrapper availibility">
          <h3>Availbility</h3>
          <h5>
            Keep your baby close to you, or share your proud creation with the
            world.
          </h5>

          <div className="form-body">
            <div className="radio">
              <Field
                name="private"
                type="radio"
                component={FieldValidation}
                label="Private (only I can use it)"
                value="private"
              />
            </div>
            <div className="radio">
              <Field
                name="public"
                type="radio"
                component={FieldValidation}
                label="Public (anyone can get it in the KintoHub Market)"
                value="public"
              />
            </div>
          </div>
        </div>

        <div className="form-wrapper custom-paramaters">
          <h3>Custom Parameters</h3>
          <h5>Something here.</h5>

          <div className="form-body">
            {this.state.customParameters.map((customParamater, index) => (
              <div className="row added" key={index}>
                <Field
                  name={customParamater.variableValue}
                  component={FieldValidation}
                  placeholder={customParamater.variableValue}
                />
                <Field
                  name={customParamater.variableName}
                  component={FieldValidation}
                  placeholder={customParamater.variableName}
                />
                <div
                  className="icon delete"
                  onClick={() => this.removeParamater(index)}
                />
              </div>
            ))}
            <div className="row">
              <Field
                name="customParamaterName"
                component={FieldValidation}
                placeholder="Enter custom parameter"
                onChange={event =>
                  this.setState({ newCustomParamaterName: event.target.value })}
                value={this.state.newCustomParamaterName}
              />
              <Field
                name="customParamaterValue"
                component={FieldValidation}
                placeholder="Values ( seperate with ',' )"
                onChange={event =>
                  this.setState({
                    newCustomParamaterValue: event.target.value
                  })}
                value={this.state.newCustomParamaterValue}
              />
              <div className="icon add" onClick={this.addCustomParamater} />
            </div>
          </div>
        </div>

        <div className="form-wrapper hardware-requirements">
          <h3>Hardware Requirements</h3>
          <h5>
            What does this baby need to stay healthy and kicking? You can still
            modify these settings later.
          </h5>

          <div className="hardware-requirements-wrapper">
            <div
              className={`expand ${this.state.expanded ? '' : 'collapse'} `}
              onClick={this.expandHardware}
            >
              <h4>Hardware Requirements</h4>
              <div className="right">
                <h6>{this.state.expanded ? 'Collapse' : 'Expand'}</h6>
                <div className="icon" />
              </div>
            </div>

            {this.state.expanded && (
              <div>
                <div className="line" />
                <div className="form-body hardware">
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
                      <Toggle
                        name="toggleCPU"
                        id="toggleCPU"
                        text="Dedicated CPUs"
                      />
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
            )}
          </div>
        </div>
      </form>
    )
  }
}
export default reduxForm({
  form: 'kintoBlockManageForm',
  enableReinitialize: true
})(KintoBlockManageForm)
