import { connect } from 'react-redux'
import SignUpForm from '../../../components/logIn/SignUpForm'
import { signUp } from '../../../actions/landing'

function mapDispatchToProps(dispatch, { onSuccess }) {
  return {
    onSubmit: data => dispatch(signUp(data, onSuccess))
  }
}
export default connect(undefined, mapDispatchToProps)(SignUpForm)
