import { connect } from 'react-redux'
import WorkspaceEdit from '../../components/workspaces/WorkspaceEdit'
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
  workspaceBreadcrumbSelect
})(WorkspaceEdit)
