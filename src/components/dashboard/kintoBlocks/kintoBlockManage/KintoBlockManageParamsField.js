import React, { Component } from 'react'
import { Field } from 'redux-form'
import { FieldValidation, Toggle } from '../../../forms'
import { required } from '../../../../helpers/forms/validators'
import Icon from '../../../ui/Icon'

class KintoBlockManageParamsField extends Component {
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
    const { fields } = this.props
    const { key, value } = this.state
    return (
      <div className="form-body custom-params" data-test="kb-manage-params">
        <div className="top">
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
                    />
                  </div>
                  <Field
                    label="Name"
                    name={`${field}.key`}
                    placeholder="Variable Name"
                    component={FieldValidation}
                    validate={required}
                  />
                  <Field
                    label="Recommended Value"
                    name={`${field}.value`}
                    placeholder="Separate by &quot;,&quot;"
                    component={FieldValidation}
                  />
                  <div className="icon-column">
                    <Icon onClick={() => fields.remove(index)} icon="remove" />
                  </div>
                </li>
              </ul>
            ))
          ) : (
            <div className="empty-message">No custom parameters added</div>
          )}
        </div>
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
      </div>
    )
  }
}

export default KintoBlockManageParamsField
