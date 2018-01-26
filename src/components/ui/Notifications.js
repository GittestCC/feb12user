import React, { Component } from 'react'

class Notifications extends Component {
  render() {
    const { isShown, type, message, closeNotificaton } = this.props

    return isShown ? (
      <div className={`notification-message ${type}`}>
        <div className="close" onClick={closeNotificaton} />
        <h4> {message} </h4>
      </div>
    ) : null
  }
}

export default Notifications
