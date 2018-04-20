import React, { Component } from 'react'
import capitalize from 'lodash/capitalize'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { Toggle } from '../../forms'
import MemberListCircles from '../../ui/MemberListCircles'
import UserCircle from '../../ui/UserCircle'
import ComplexModal from '../../dashboard/ui/ComplexModal'
import WorkspaceToolbarModal from './workspaceToolbar/WorkspaceToolbarModal'
import { getPageUrl } from '../../../helpers/urlHelper'
import { pages } from '../../../constants/pages'

class WorkspaceToolbar extends Component {
  static propTypes = {
    currentUserInfo: PropTypes.object.isRequired,
    admins: PropTypes.array.isRequired,
    members: PropTypes.array.isRequired,
    allMembers: PropTypes.array.isRequired,
    isFormPublic: PropTypes.bool,
    canCurrentUserManage: PropTypes.bool.isRequired
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

  goToEditWorkspace = () => {
    this.props.push(
      getPageUrl(pages.workspaceEdit, { id: this.props.selectedWorkspaceId })
    )
  }

  render() {
    const {
      currentUserInfo,
      admins,
      members,
      allMembers,
      isFormPublic,
      canCurrentUserManage
    } = this.props
    return (
      <div className="workspace-toolbar">
        <div className="user-section">
          <UserCircle
            name={currentUserInfo.userName}
            userType={currentUserInfo.permission}
          />
          <h5 className="bold">{capitalize(currentUserInfo.permission)}</h5>
        </div>
        <div className="members">
          <MemberListCircles
            users={allMembers}
            editAction={this.openWorkspaceModal}
            canEdit={!isFormPublic && canCurrentUserManage}
            numberOfItemsShown={7}
            size="normal"
          />
        </div>
        {canCurrentUserManage && (
          <div className="toggle">
            <Field
              name="isPublic"
              id="public"
              component={Toggle}
              label="Everyone in this workspace is an editor of this project"
            />
          </div>
        )}

        <ComplexModal
          className="workspace-modal"
          component={WorkspaceToolbarModal}
          isOpen={this.state.isModalOpen}
          onClose={this.onModalClose}
          actions={{ goToEdit: this.goToEditWorkspace }}
          data={{
            admins,
            members
          }}
        />
      </div>
    )
  }
}

export default WorkspaceToolbar
