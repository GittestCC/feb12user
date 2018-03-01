import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FieldArray } from 'redux-form'
import WorkspaceToolbarForm from './WorkspaceToolbarForm'
import { SearchInput } from '../../../forms'

class WorkspaceToolbarModal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    members: PropTypes.array.isRequired,
    admins: PropTypes.array.isRequired
  }

  state = {
    searchedValue: ''
  }

  searchMembers = event => {
    this.setState({ searchedValue: event.target.value.toUpperCase() })
  }

  filterMembers = members => {
    if (!this.state.searchedValue) return members
    else {
      return members.filter(member => {
        const userName = member.userName.toUpperCase()
        const email = member.email.toUpperCase()
        return (
          userName.includes(this.state.searchedValue) ||
          email.includes(this.state.searchedValue)
        )
      })
    }
  }

  render() {
    const { onClose, members, admins } = this.props
    return (
      <div className="workspace-toolbar-modal">
        <div className="kh-modal-title">
          <h4>Edit Collaborators</h4>
        </div>
        <div className="kh-modal-body">
          <SearchInput
            onChange={this.searchMembers}
            placeholder="Search teams and members."
          />
          <div className="workspace-form">
            <FieldArray
              name="memberIds"
              component={WorkspaceToolbarForm}
              members={this.filterMembers(members)}
              admins={this.filterMembers(admins)}
            />
          </div>
          <button className="button dark" onClick={onClose}>
            Ok
          </button>
        </div>
      </div>
    )
  }
}

export default WorkspaceToolbarModal
