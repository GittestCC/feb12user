import React from 'react'
import { Field, reduxForm, FieldArray } from 'redux-form'
import { FieldValidation } from '../forms'
import { required } from '../../helpers/forms/validators'
import WorkspaceMembers from './workspaceForm/WorkspaceMembers'

const WorkspaceForm = ({ workspace, isCreate, memberId, workspaceMembers }) => {
  return (
    <form className="workspace-form form-container">
      <div>
        <h1>{workspace.name ? workspace.name : null}</h1>
      </div>
      <div className="form-wrapper">
        <h3>Basic Info</h3>
        <h5>Enter a name for your workspace.</h5>
        <div className="form-body">
          <div className="field-wrapper">
            <Field
              name="workspaceName"
              label="workspace name"
              placeholder="Enter an name for your workspace"
              component={FieldValidation}
              validate={required}
              type="text"
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
            Invite workspace members (they will receive an email invite and a
            notification)
          </h5>
        )}

        <FieldArray
          name="members"
          memberId={memberId}
          isCreate={isCreate}
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
