import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { FieldValidation, Toggle } from '../../../forms'
import { unique } from '../../../../helpers/forms/validators'
import { environments } from '../../../../helpers/forms/validationFields'
import Icon from '../../../ui/Icon'

const uniqueValidation = unique('configParameters', 'key')
class KintoBlockManageParamsField extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    disabled: PropTypes.bool
  }

  state = {
    key: '',
    value: '',
    required: false
  }

  onChangeKey = e => {
    this.setState({ key: e.target.value })
  }

  onChangeValue = e => {
    this.setState({ value: e.target.value })
  }

  onToggleRequired = () => {
    this.setState(state => ({
      required: !state.required
    }))
  }

  onAdd = () => {
    const { key, value, required } = this.state
    this.props.fields.push({ key, value, required })
    this.setState({
      key: '',
      value: '',
      required: false
    })
  }

  render() {
    const { fields, disabled } = this.props
    const { key, value } = this.state
    return (
      <div className="form-body custom-params" data-test="kb-manage-params">
        <div className="top">
          <h6 className="coming">Coming</h6>
          <h4 className="title">Custom Parameters</h4>
          {fields.length ? (
            fields.map((field, index) => (
              <ul
                key={index}
                className="unstyled-list"
                data-test={`kb-manage-params-${index}`}
              >
                <li className="row">
                  <div className="switch-container">
                    <Field
                      label="This is required"
                      name={`${field}.required`}
                      component={Toggle}
                      disabled={disabled}
                    />
                  </div>
                  <Field
                    label="Name"
                    name={`${field}.key`}
                    placeholder="Variable Name"
                    component={FieldValidation}
                    validate={[
                      ...environments.envVariableName,
                      uniqueValidation
                    ]}
                    disabled={disabled}
                  />
                  <Field
                    label="Recommended Value"
                    name={`${field}.value`}
                    placeholder="Separate by &quot;,&quot;"
                    component={FieldValidation}
                    disabled={disabled}
                  />
                  <div className="icon-column">
                    <Icon
                      onClick={() => fields.remove(index)}
                      disabled={disabled}
                      icon="remove"
                    />
                  </div>
                </li>
              </ul>
            ))
          ) : (
            <div className="empty-message">No custom parameters added</div>
          )}
        </div>
        {!disabled ? (
          <div className="bottom row">
            <div className="switch-container">
              <label className="switch">
                <input
                  type="checkbox"
                  id="isRequired"
                  checked={this.state.required}
                  onChange={this.onToggleRequired}
                />
                <span className="toggle-slider" />
                <h6 className="toggle-message">This is required</h6>
              </label>
            </div>
            <div className="field-wrapper">
              <label htmlFor="add-key">Name</label>
              <input
                data-test="params-add-key"
                id="add-key"
                value={key}
                onChange={this.onChangeKey}
              />
            </div>
            <div className="field-wrapper">
              <label htmlFor="add-value">Recommended Value</label>
              <input
                data-test="params-add-value"
                id="add-value"
                value={value}
                onChange={this.onChangeValue}
              />
            </div>

            <div className="icon-column">
              <Icon onClick={this.onAdd} icon="add" disabled={!key} />
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}

export default KintoBlockManageParamsField
