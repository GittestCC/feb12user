import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import LogIn from '../components/LogIn'

function mapStateToProps(state, { match }) {
  return {
    isLoggedIn: state.auth.isLoggedIn
  }
}

export default connect(mapStateToProps, { push })(LogIn)
