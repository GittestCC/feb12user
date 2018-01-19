import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { isAuthenticated } from '../helpers/authHelper'
import LogIn from '../components/LogIn'

function mapStateToProps(state, { match }) {
  return {
    isLoggedIn: isAuthenticated(state.auth)
  }
}

export default connect(mapStateToProps, { push })(LogIn)
