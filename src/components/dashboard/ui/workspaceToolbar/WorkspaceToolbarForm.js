import React, { Component } from 'react'
import { CSSTransitionGroup } from 'react-transition-group'
import PropTypes from 'prop-types'

import {
  projectPermissions,
  projectEditorPermissions,
  ADMIN_PROJECT_PERMISSION,
  OWNER_PROJECT_PERMISSION
} from '../../../../constants/permissions'

class WorkspaceToolbarForm extends Component {
  static propTypes = {
    members: PropTypes.array.isRequired,
    admins: PropTypes.array.isRequired
  }
  addRemoveMember = (event, member) => {
    const fieldsMembers = this.props.fields.getAll() || undefined

    if (fieldsMembers !== undefined) {
      const index = fieldsMembers.findIndex(f => f.id === member.id)

      if (event.target.checked) {
        this.props.fields.push({
          id: member.id,
          permission: member.permission
        })
      } else {
        this.props.fields.remove(index)
      }
    }
  }

  getDisplay = (name, email) => (name ? `${name} (${email})` : email)

  render() {
    const { members, admins } = this.props
    const noMembers = !members.length && !admins.length
    return (
      <ul className="unstyled-list">
        <CSSTransitionGroup
          transitionName="members"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          {noMembers && (
            <h4 className="center">No collaborators match your search query</h4>
          )}
          {admins ? (
            admins.map((admin, index) => {
              return (
                <li className="member-row" key={index}>
                  <div
                    className={`avatar image-${Math.floor(Math.random() * 6) +
                      1}`}
                  >
                    {admin.permission === ADMIN_PROJECT_PERMISSION && (
                      <div className="admin-star" />
                    )}
                    {admin.permission === OWNER_PROJECT_PERMISSION && (
                      <div className="owner" />
                    )}
                  </div>
                  <input
                    type="text"
                    disabled="true"
                    value={this.getDisplay(admin.username, admin.email)}
                  />
                  <select
                    name="permission"
                    id="permission"
                    value={admin.permission}
                    disabled
                  >
                    {projectPermissions.map((level, i) => (
                      <option key={i} defaultValue={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                  <input
                    type="checkbox"
                    className="checkbox"
                    defaultChecked={admin.included}
                    disabled
                  />
                </li>
              )
            })
          ) : (
            <h4>No Workspace members match your query </h4>
          )}
          {members ? (
            members.map((member, index) => {
              return (
                <li className="member-row" key={index}>
                  <div
                    className={`avatar image-${Math.floor(Math.random() * 6) +
                      1}`}
                  />
                  <input
                    type="text"
                    disabled="true"
                    value={this.getDisplay(member.username, member.email)}
                  />
                  <select name="editorPermissions" id="editorPermissions">
                    {projectEditorPermissions.map((level, i) => (
                      <option key={i} defaultValue={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                  <input
                    type="checkbox"
                    name={`${member}.included`}
                    className="checkbox"
                    defaultChecked={member.included}
                    onChange={e => this.addRemoveMember(e, member)}
                  />
                </li>
              )
            })
          ) : (
            <h4> No members match your search request </h4>
          )}
        </CSSTransitionGroup>
      </ul>
    )
  }
}

export default WorkspaceToolbarForm
