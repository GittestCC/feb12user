import React, { Component } from 'react'
import { Field } from 'redux-form'
import { FieldValidation } from '../../forms'
import { required } from '../../../helpers/forms/validators'
import { permissions } from '../../../constants/permissions'

class WorkspaceMembers extends Component {
  state = {
    email: '',
    permission: 'Admin'
  }

  addRow = () => {
    this.props.fields.push({
      permission: this.state.permission,
      email: this.state.email
    })
    this.setState({
      permission: 'Admin',
      email: ''
    })
  }

  isDisabled = row => {
    if (this.props.isCreate && row.id === this.props.memberId) {
      return true
    }
    if (this.props.isCreate) {
      return false
    }
    return this.props.workspaceMembers.some(
      w => w['email'] === row.email && w.permission === 'Admin'
    )
  }

  getDisplay = (name, email) => (name ? `${name} (${email})` : `${email}`)

  updatePermissionState = event => {
    this.setState({
      permission: event.target.value
    })
  }

  updateEmailState = event => {
    this.setState({
      email: event.target.value
    })
  }

  render() {
    const { fields } = this.props

    return (
      <div className="form-body members-list">
        <div className="top">
          <ul className="unstyled-list">
            {fields.map((member, index) => {
              const thisMember = fields.get(index) || {}

              return (
                <li key={index} className="members-added">
                  <div
                    className={`avatar image-${Math.floor(Math.random() * 6) +
                      1}`}
                  >
                    {thisMember.permission === 'Admin' ? (
                      <div className="admin-star" />
                    ) : null}
                  </div>
                  <input
                    placeholder="Enter workspace member email"
                    value={this.getDisplay(
                      thisMember.username,
                      thisMember.email
                    )}
                    disabled="true"
                  />
                  <Field
                    name={`${member}.permission`}
                    placeholder="Select a permission level"
                    component={FieldValidation}
                    validate={required}
                    type="select"
                    disabled={this.isDisabled(thisMember)}
                  >
                    {permissions.map((level, i) => (
                      <option key={i} value={level}>
                        {level}
                      </option>
                    ))}
                  </Field>

                  {this.isDisabled(thisMember) ? (
                    <div className="remove void" />
                  ) : (
                    <div
                      className="remove"
                      onClick={() => fields.remove(index)}
                    />
                  )}
                </li>
              )
            })}
          </ul>
        </div>
        <div className="bottom">
          <div className="avatar-placeholder" />
          <div>
            <input
              name="email"
              placeholder="Enter workspace member email"
              onChange={this.updateEmailState}
              value={this.state.email}
            />
          </div>
          <select
            name="permission"
            type="select"
            onChange={this.updatePermissionState}
            value={this.state.permission}
          >
            {permissions.map((level, i) => (
              <option key={i} value={level}>
                {level}
              </option>
            ))}
          </select>
          <div className="add" onClick={this.addRow} />
        </div>
      </div>
    )
  }
}

export default WorkspaceMembers
