import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import App from '../components/App'
import { isAuthenticated } from '../helpers/authHelper'

function mapStateToProps(state) {
  const isLoggedIn = isAuthenticated(state.auth)
  return {
    blockNavigate: state.pageOptions.canSave,
    isLoggedIn
  }
}

function mapDispatchToProps(dispatch) {
  return {
    goToLogin: () => dispatch(push('/log-in'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
