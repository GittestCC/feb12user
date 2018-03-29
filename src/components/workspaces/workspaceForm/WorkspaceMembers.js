import React, { Component } from 'react'
import { Field } from 'redux-form'
import { FieldValidation } from '../../forms'
import { required } from '../../../helpers/forms/validators'
import {
  workspaceRoles,
  MEMBER_ROLE,
  ADMIN_ROLE
} from '../../../constants/permissions'
import UserCircle from '../../ui/UserCircle'

class WorkspaceMembers extends Component {
  state = {
    email: '',
    role: MEMBER_ROLE
  }

  addRow = () => {
    this.props.fields.push({
      role: this.state.role,
      email: this.state.email
    })
    this.setState({
      role: MEMBER_ROLE,
      email: ''
    })
  }

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      e.preventDefault()
      this.addRow()
    }
  }

  findMember = id => {
    if (!id) {
      return {}
    }
    return this.props.workspaceMembers.find(m => m.id === id) || {}
  }

  getDisplay = member =>
    member.userName ? `${member.userName} (${member.email})` : member.email

  updateRole = event => {
    this.setState({
      role: event.target.value
    })
  }

  updateEmail = event => {
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
            {fields.map((field, index) => {
              const formMember = fields.get(index) || {}
              const member = this.findMember(formMember.id)
              const isDisabled = member.role === ADMIN_ROLE

              return (
                <li key={index} className="members-added">
                  <UserCircle
                    name={this.getDisplay(formMember)}
                    highlightIcon={
                      member.role === ADMIN_ROLE ? 'admin-star' : null
                    }
                  />
                  <input
                    placeholder="Enter workspace member email"
                    value={this.getDisplay(formMember)}
                    disabled="true"
                  />
                  <Field
                    name={`${field}.role`}
                    component={FieldValidation}
                    validate={required}
                    type="select"
                    disabled={isDisabled}
                  >
                    {workspaceRoles.map((level, i) => (
                      <option key={i} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </Field>

                  {isDisabled ? (
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
              onChange={this.updateEmail}
              value={this.state.email}
              onKeyPress={this.handleKeyPress}
            />
          </div>
          <select
            name="role"
            type="select"
            onChange={this.updateRole}
            value={this.state.role}
          >
            {workspaceRoles.map((role, i) => (
              <option key={i} value={role.value}>
                {role.label}
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
