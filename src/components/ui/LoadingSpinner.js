import React, { Component } from 'react'
import isArray from 'lodash/isArray'

class LoadingSpinner extends Component {
  state = {
    loadingMessage: 'Loading'
  }

  componentWillReceiveProps(nextProps) {
    const { message } = nextProps
    if (this.props.isShown !== nextProps.isShown) {
      if (nextProps.isShown === true) {
        if (!isArray(message)) {
          this.setState({ loadingMessage: message })
        } else {
          this.loopMessage = setInterval(() => {
            const randomNumber = Math.floor(Math.random() * 4 + 1)
            const selectedMessage = message[randomNumber]
            this.setState({ loadingMessage: selectedMessage })
          }, 500)
        }
      } else {
        clearInterval(this.loopMessage)
      }
    }
  }

  render() {
    const { isShown } = this.props

    return isShown ? (
      <div className="loading-spinner">
        <div className="loading-icon" />
        <h2>
          {this.state.loadingMessage}
          <span className="one">.</span>
          <span className="two">.</span>
          <span className="three">.</span>
        </h2>
      </div>
    ) : null
  }
}

export default LoadingSpinner
