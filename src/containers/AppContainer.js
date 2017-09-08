import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import App from '../components/App'

function mapStateToProps(state) {
  const { canSave } = state.pageOptions
  return {
    blockNavigate: canSave,
    token: state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    checkAuth: isLoggedIn => {
      if (!isLoggedIn) {
        dispatch(push('/login'))
      }
    }
  }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return {
    ...stateProps,
    ...ownProps,
    checkAuth() {
      dispatchProps.checkAuth(stateProps.token)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(App)
