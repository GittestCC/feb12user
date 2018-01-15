import { connect } from 'react-redux'
import { fetchWorkspace, workspaceSelect } from '../actions/workspaces'
import Workspaces from '../components/Workspaces'

function mapStateToProps(state) {
  return {
    firstWorkspaceId: state.workspaces.allIds[0],
    selectedWorkspace: state.workspaces.selectedWorkspace
  }
}

export default connect(mapStateToProps, { fetchWorkspace, workspaceSelect })(
  Workspaces
)
