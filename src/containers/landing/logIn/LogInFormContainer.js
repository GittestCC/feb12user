import { connect } from 'react-redux'
import LogInForm from '../../../components/logIn/LogInForm'
import { logIn } from '../../../actions/auth'

export default connect(undefined, { onSubmit: logIn })(LogInForm)
