import { connect } from 'react-redux'
import WorkspaceEdit from '../../components/workspaces/WorkspaceEdit'
import {
  fetchWorkspaces,
  editingWorkspaceSelect
} from '../../actions/workspaces'

function mapStateToProps(state, { match }) {
  const id = match.params.id
  const workspace = state.workspaces.byId[id]

  return {
    workspace,
    id
  }
}

export default connect(mapStateToProps, {
  fetchWorkspaces,
  editingWorkspaceSelect
})(WorkspaceEdit)
