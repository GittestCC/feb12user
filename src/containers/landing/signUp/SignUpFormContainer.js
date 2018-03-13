import { connect } from 'react-redux'
import SignUpForm from '../../../components/logIn/SignUpForm'
import { signUp } from '../../../actions/auth'

export default connect(undefined, { onSubmit: signUp })(SignUpForm)
