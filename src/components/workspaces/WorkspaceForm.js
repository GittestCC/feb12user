import React from 'react'
import { Field, reduxForm, FieldArray } from 'redux-form'
import { FieldValidation, Toggle } from '../forms'
import { required, maxLength256 } from '../../helpers/forms/validators'
import { basicInput } from '../../helpers/forms/validationFields'
import WorkspaceMembers from './workspaceForm/WorkspaceMembers'

const WorkspaceForm = ({
  workspace,
  isCreate,
  currentUserId,
  workspaceMembers
}) => {
  return (
    <form className="workspace-form form-container">
      <div>
        <h2>{workspace.name}</h2>
      </div>
      <div className="form-wrapper">
        <h3>Basic Info</h3>
        <h5>Enter a name for your workspace.</h5>
        <div className="form-body">
          <Field
            name="name"
            label="Workspace name"
            placeholder="Enter an name for your workspace"
            component={FieldValidation}
            validate={[...basicInput, required, maxLength256]}
            type="text"
          />
          <div className="auto-share-switch">
            <Field
              name="autoShareProjects"
              className="auto-share-projects"
              label="Anyone in this workspace will view and join all projects automatically. Permissions can still be manually changed at project level."
              help="Turn this on to make all projects visible to every workspace member by default."
              component={Toggle}
            />
          </div>
        </div>
      </div>

      <div className="form-wrapper">
        <h3>Members</h3>
        {isCreate ? (
          <h5>
            An admin can create and edit any project, and manage permissions for
            every member. A member can create new projects and edit the ones
            they have access to.
          </h5>
        ) : (
          <h5>
            Invite new members to your workspace (they will receive an email
            invite and a notification)
          </h5>
        )}

        <FieldArray
          name="members"
          component={WorkspaceMembers}
          workspaceMembers={workspaceMembers}
        />
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'WorkspaceForm',
  enableReinitialize: true
})(WorkspaceForm)
