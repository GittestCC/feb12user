import { connect } from 'react-redux'
import CreateNewPasswordForm from '../../../components/logIn/CreateNewPasswordForm'
import { createNewPassword } from '../../../actions/auth'

function mapDispatchToProps(dispatch, { onSuccess }) {
  return {
    onSubmit: data => dispatch(createNewPassword(data, onSuccess))
  }
}

export default connect(undefined, mapDispatchToProps)(CreateNewPasswordForm)
