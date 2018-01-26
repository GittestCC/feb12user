import { connect } from 'react-redux'
import Notifications from '../components/ui/Notifications'
import { closeNotificaton } from '../actions/pageOptions'

function mapStateToProps(state) {
  const { isShown, type, message } = state.pageOptions.notification
    ? state.pageOptions.notification
    : {}

  return {
    isShown,
    type,
    message
  }
}

export default connect(mapStateToProps, { closeNotificaton })(Notifications)
