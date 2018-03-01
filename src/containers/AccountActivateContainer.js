import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { activateAccount } from '../actions/auth'
import { showNotification } from '../actions/pageOptions'
import { INFO, ERROR } from '../constants/notificationTypes'
import AccountActivate from '../components/AccountActivate'

function mapDispatchToProps(dispatch, { match }) {
  return {
    activateAccount: () => {
      const { token } = match.params
      dispatch(activateAccount(token)).then(
        () => {
          dispatch(
            showNotification(
              INFO,
              'Account Activated Successfully, Please login'
            )
          )
          dispatch(push('/log-in'))
        },
        () => {
          dispatch(showNotification(ERROR, 'Invalid Token'))
          dispatch(push('/log-in'))
        }
      )
    }
  }
}

export default connect(undefined, mapDispatchToProps)(AccountActivate)
