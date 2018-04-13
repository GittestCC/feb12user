import React, { Component } from 'react'
import { INFO, ERROR } from '../../constants/notificationTypes'

class Notifications extends Component {
  getClassNameForType(type) {
    if (type === INFO) {
      return 'info'
    }
    if (type === ERROR) {
      return 'error'
    }
    throw new Error('Invalid Type')
  }
  render() {
    const { isShown, type, message, closeNotificaton } = this.props

    return isShown ? (
      <div className={`notification-message ${this.getClassNameForType(type)}`}>
        <h4> {message} </h4>
        <div className="close" onClick={closeNotificaton} />
      </div>
    ) : null
  }
}

export default Notifications
