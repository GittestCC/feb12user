import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { fetchWorkspaces, workspaceSelect } from '../actions/workspaces'
import App from '../components/App'
import { isAuthenticated } from '../helpers/authHelper'

function mapStateToProps(state) {
  const isLoggedIn = isAuthenticated(state.auth)
  return {
    blockNavigate: state.pageOptions.canSave,
    isLoggedIn,
    isLoading: state.workspaces.isFetching
  }
}

function mapDispatchToProps(dispatch) {
  return {
    goToLogin: () => dispatch(push('/log-in')),
    fetchWorkspaces: () => dispatch(fetchWorkspaces()),
    workspaceSelect: id => dispatch(workspaceSelect(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
