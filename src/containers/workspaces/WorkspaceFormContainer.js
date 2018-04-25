import { connect } from 'react-redux'
import WorkspaceForm from '../../components/workspaces/WorkspaceForm'
import { createWorkspace, updateWorkspace } from '../../actions/workspaces'
import { ADMIN_ROLE } from '../../constants/permissions'

function mapStateToProps(state, { workspace, isCreate }) {
  workspace = workspace || {}
  let workspaceMembers
  const { currentUser } = state
  if (isCreate) {
    workspaceMembers = [
      {
        id: currentUser.id,
        email: currentUser.email,
        userName: currentUser.userName,
        role: ADMIN_ROLE
      }
    ]
  } else {
    workspaceMembers = workspace.members || []
  }

  return {
    currentUserId: currentUser.id,
    workspace,
    workspaceMembers,
    initialValues: {
      members: workspaceMembers,
      name: workspace.name
    }
  }
}

function mapDispatchToProps(dispatch, { isCreate, workspace }) {
  return {
    onSubmit: data => {
      if (isCreate) {
        return dispatch(createWorkspace(data))
      } else {
        return dispatch(updateWorkspace(workspace.id, data))
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceForm)
