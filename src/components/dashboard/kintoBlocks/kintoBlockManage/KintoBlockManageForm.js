import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm, FieldArray } from 'redux-form'
import FieldValidation from '../../../forms/FieldValidation'
import ManageDependenciesFieldContainer from '../../../../containers/dashboard/ui/ManageDependenciesFieldContainer'
import KintoBlockManageParamsField from './KintoBlockManageParamsField'
import KintoBlockManageEnvVarsField from './KintoBlockManageEnvVarsField'

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

          <div className="form-body simple">
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

        <div className="form-wrapper custom-paramaters full-row">
          <h3>Environmental & Custom Parameters</h3>
          <h5>Something here.</h5>

          <FieldArray
            name="environmentVariables"
            component={KintoBlockManageEnvVarsField}
          />
          <FieldArray
            name="configParameters"
            component={KintoBlockManageParamsField}
          />
        </div>

        <div className="form-wrapper availibility">
          <h3>Availability</h3>
          <h5>
            Keep your baby close to you, or share your proud creation with the
            world.
          </h5>

          <div className="form-body simple">
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
      </form>
    )
  }
}
export default reduxForm({
  form: 'kintoBlockManageForm',
  enableReinitialize: true
})(KintoBlockManageForm)
