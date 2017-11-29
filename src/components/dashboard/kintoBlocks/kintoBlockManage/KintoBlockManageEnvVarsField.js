import React, { Component } from 'react'
import { Field } from 'redux-form'
import { FieldValidation } from '../../../forms'
import { required } from '../../../../helpers/forms/validators'
import Icon from '../../../ui/Icon'

class KintoBlockManageEnvVarsField extends Component {
  state = {
    key: '',
    value: ''
  }

  onChangeKey = e => {
    this.setState({ key: e.target.value })
  }

  onChangeValue = e => {
    this.setState({ value: e.target.value })
  }

  onAdd = () => {
    const { key, value } = this.state
    this.props.fields.push({ key, value })
    this.setState({
      key: '',
      value: ''
    })
  }

  render() {
    const { fields } = this.props
    const { key, value } = this.state
    return (
      <div className="form-body env" data-test="kb-manage-env">
        <div className="top">
          <h4 className="title">Environmental Parameters</h4>
          {fields.length ? (
            fields.map((field, index) => (
              <ul
                key={index}
                className="unstyled-list"
                data-test={`kb-manage-env-${index}`}
              >
                <li className="row">
                  <Field
                    label="Name"
                    name={`${field}.key`}
                    placeholder="Variable Name"
                    component={FieldValidation}
                    validate={required}
                  />
                  <div>
                    <Field
                      label="Value"
                      name={`${field}.value`}
                      placeholder="Separate by &quot;,&quot;"
                      component={FieldValidation}
                      validate={required}
                    />
                  </div>
                  <div className="icon-column">
                    <Icon onClick={() => fields.remove(index)} icon="remove" />
                  </div>
                </li>
              </ul>
            ))
          ) : (
            <div className="empty-message">
              No environmental parameters added
            </div>
          )}
        </div>
        <div className="bottom row">
          <div className="field-wrapper">
            <label htmlFor="add-key">Name</label>
            <input
              data-test="env-add-key"
              id="add-key"
              value={key}
              onChange={this.onChangeKey}
            />
          </div>
          <div className="field-wrapper">
            <label htmlFor="add-value">Value</label>
            <input
              data-test="env-add-value"
              id="add-value"
              value={value}
              onChange={this.onChangeValue}
            />
          </div>

          <div className="icon-column">
            <Icon onClick={this.onAdd} icon="add" disabled={!key || !value} />
          </div>
        </div>
      </div>
    )
  }
}

export default KintoBlockManageEnvVarsField
