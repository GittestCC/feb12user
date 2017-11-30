import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { Toggle } from '../../forms'
import { getInitials } from '../../../helpers/stringHelper'
import MemberListCircles from '../../ui/MemberListCircles'
import ComplexModal from '../../dashboard/ui/ComplexModal'
import WorkspaceToolbarModal from './workspaceToolbar/WorkspaceToolbarModal'
import {
  ADMIN_PROJECT_PERMISSION,
  OWNER_PROJECT_PERMISSION
} from '../../../constants/permissions'

class WorkspaceToolbar extends Component {
  static propTypes = {
    currentUser: PropTypes.object.isRequired,
    currentUserInfo: PropTypes.object.isRequired,
    admins: PropTypes.array.isRequired,
    members: PropTypes.array.isRequired,
    allMembers: PropTypes.array.isRequired,
    isPublicValue: PropTypes.bool
  }

  state = {
    isModalOpen: false
  }

  openWorkspaceModal = () => {
    this.setState({ isModalOpen: true })
  }

  onModalClose = () => {
    this.setState({ isModalOpen: false })
  }

  toggleVisibility = e => {
    setTimeout(() => this.props.toggleIsPublic(e.target.value), 0)
  }

  render() {
    const {
      currentUser,
      currentUserInfo,
      admins,
      members,
      allMembers,
      isPublicValue
    } = this.props
    return (
      <div className="workspace-toolbar">
        <div className="user-section">
          <div className="avatar owner text">
            {currentUserInfo.permission === ADMIN_PROJECT_PERMISSION && (
              <div className="admin-star highlight" />
            )}
            {currentUserInfo.permission === OWNER_PROJECT_PERMISSION && (
              <div className="owner highlight" />
            )}
            {getInitials(currentUser.uname)}
          </div>
          <h5>{currentUserInfo.permission}</h5>
          {/* TODO : revisit this when the API is working to check the user details */}
        </div>
        <div className="members">
          <MemberListCircles
            users={allMembers}
            editAction={this.openWorkspaceModal}
            canEdit={!isPublicValue}
            numberOfItemsShown={7}
            size="normal"
          />
        </div>
        <div className="toggle">
          <Field
            name="isPublic"
            id="public"
            component={Toggle}
            onChange={this.toggleVisibility}
            label="Everyone in this workspace is an editor of this project"
          />
        </div>

        <ComplexModal
          className="workspace-modal"
          component={WorkspaceToolbarModal}
          isOpen={this.state.isModalOpen}
          onClose={this.onModalClose}
          data={{
            currentUser: currentUser,
            admins: admins,
            members: members,
            currentUserInfo: currentUserInfo
          }}
        />
      </div>
    )
  }
}

export default WorkspaceToolbar
