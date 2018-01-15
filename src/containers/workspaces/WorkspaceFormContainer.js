import { connect } from 'react-redux'
import WorkspaceForm from '../../components/workspaces/WorkspaceForm'
import { createWorkspace, updateWorkspace } from '../../actions/workspaces'
import { ADMIN_ROLE } from '../../constants/permissions'

function mapStateToProps(state, { workspace, isCreate }) {
  workspace = workspace || {}
  let workspaceMembers
  const currentUserId = state.auth.authSession.uid
  if (isCreate) {
    workspaceMembers = [
      {
        id: currentUserId,
        username: state.auth.authSession.uname,
        email: state.auth.authSession.email,
        role: ADMIN_ROLE
      }
    ]
  } else {
    workspaceMembers = workspace.members || []
  }

  return {
    currentUserId,
    workspace,
    workspaceMembers,
    initialValues: {
      members: workspaceMembers,
      name: workspace.name,
      autoShareProjects: workspace.autoShareProjects || false
    }
  }
}

function mapDispatchToProps(dispatch, { isCreate, workspace }) {
  return {
    onSubmit: data => {
      if (isCreate) {
        dispatch(createWorkspace(data))
      } else {
        dispatch(updateWorkspace(workspace.id, data))
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceForm)
