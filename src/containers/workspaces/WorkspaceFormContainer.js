import { connect } from 'react-redux'
import WorkspaceForm from '../../components/workspaces/WorkspaceForm'
import { createWorkspace, updateWorkspace } from '../../actions/workspaces'
import { ADMIN_PERMISSION } from '../../constants/permissions'

function mapStateToProps(state, { workspace, isCreate }) {
  workspace = workspace || {}
  let workspaceMembers
  const memberId = state.auth.authSession.uid
  if (isCreate) {
    workspaceMembers = [
      {
        id: state.auth.authSession.uid,
        username: state.auth.authSession.uname,
        email: state.auth.authSession.email,
        permission: ADMIN_PERMISSION
      }
    ]
  } else {
    workspaceMembers = workspace.members || []
  }

  return {
    memberId,
    workspace,
    workspaceMembers,
    initialValues: {
      members: workspaceMembers,
      workspaceName: workspace.name || ''
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
