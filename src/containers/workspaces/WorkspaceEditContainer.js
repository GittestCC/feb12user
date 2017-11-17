import { connect } from 'react-redux'
import WorkspaceEdit from '../../components/workspaces/WorkspaceEdit'
import { fetchWorkspaces } from '../../actions/workspaces'
import { workspaceBreadcrumbSelect } from '../../actions/pageOptions'

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
  workspaceBreadcrumbSelect
})(WorkspaceEdit)
