import { connect } from 'react-redux'
import WorkspaceEdit from '../../components/workspaces/WorkspaceEdit'

function mapStateToProps(state, { match }) {
  const { selectedWorkspace, byId } = state.workspaces
  const workspace = byId[selectedWorkspace]
  return { workspace }
}

export default connect(mapStateToProps)(WorkspaceEdit)
