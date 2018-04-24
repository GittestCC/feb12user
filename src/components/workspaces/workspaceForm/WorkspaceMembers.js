import React, { Component } from 'react'
import { Field } from 'redux-form'
import { FieldValidation } from '../../forms'
import {
  required,
  email as emailValidation
} from '../../../helpers/forms/validators'
import {
  workspaceRoles,
  MEMBER_ROLE,
  ADMIN_ROLE
} from '../../../constants/permissions'
import UserCircle from '../../ui/UserCircle'

class WorkspaceMembers extends Component {
  state = {
    email: '',
    role: MEMBER_ROLE,
    error: null
  }

  addRow = () => {
    const { role, email } = this.state
    const { fields } = this.props
    const emailError = emailValidation(email)
    if (emailError) {
      return this.setState({ error: emailError })
    }
    const emailExist = fields
      .getAll()
      .some(f => f.email.toUpperCase() === email.toUpperCase())
    if (emailExist) {
      return this.setState({ error: 'Email already exists for this workspace' })
    }
    fields.push({ role, email })

    this.setState({
      role: MEMBER_ROLE,
      email: '',
      error: null
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
    const { error, email, role } = this.state

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
              value={email}
              onKeyPress={this.handleKeyPress}
            />
          </div>
          <select
            name="role"
            type="select"
            onChange={this.updateRole}
            value={role}
            onKeyPress={this.handleKeyPress}
          >
            {workspaceRoles.map((role, i) => (
              <option key={i} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>
          <div className="add" onClick={this.addRow} />
          {error && (
            <div className="error-message error-message-only error-email">
              {error}
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default WorkspaceMembers
