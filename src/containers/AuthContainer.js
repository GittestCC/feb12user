import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Auth from '../components/Auth'
import { setToken } from '../actions/auth'

function mapStateToProps(state) {
  return {
    token: state.auth.token
  }
}

export default connect(mapStateToProps, {
  navigateTo: push,
  setToken
})(Auth)
