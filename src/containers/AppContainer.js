import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { fetchWorkspaces } from '../actions/workspaces'
import App from '../components/App'
import { isAuthenticated } from '../helpers/authHelper'

function mapStateToProps(state) {
  return {
    isLoggedIn: isAuthenticated(state.auth),
    blockNavigate: state.pageOptions.canSave,
    isLoading: state.workspaces.isFetching,
    firstWorkspaceId: state.workspaces.allIds[0],
    isNotification: state.pageOptions.notification
      ? state.pageOptions.notification.isShown
      : false
  }
}

function mapDispatchToProps(dispatch) {
  return {
    goToLogin: () => dispatch(push('/log-in')),
    fetchWorkspaces: () => dispatch(fetchWorkspaces())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
