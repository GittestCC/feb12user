import React, { Component } from 'react'

class LoadingSpinner extends Component {
  render() {
    const { message, isShown } = this.props

    return isShown ? (
      <div className="loading-spinner">
        <div className="loading-icon" />
        <h2>
          {message}
          <span className="one">.</span>
          <span className="two">.</span>
          <span className="three">.</span>
        </h2>
      </div>
    ) : null
  }
}

export default LoadingSpinner
