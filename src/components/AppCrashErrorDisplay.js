import React, { Component } from 'react'
import { isAnalyticsActive, trackException } from '../helpers/analyticsHelper'
import { Button } from './forms'

class AppCrashErrorDisplay extends Component {
  state = {
    hasError: false
  }

  refreshPage() {
    window.location.reload()
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true })
    if (isAnalyticsActive()) {
      trackException(error, info)
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-page">
          <div className="error-container">
            <a className="navigation-logo hide-text" href="/">
              logo
            </a>
            <div className="error-section">
              <img src="/images/icon-mustard-alert-large.svg" alt="alert" />
              <h2>
                The website has encountered an error. Please reload the page.
              </h2>
              <p className="note">
                If you keep getting this error, please{' '}
                <a href="mailto:info@kintohub.com">contact us</a> for support.
              </p>
              <Button
                type="button"
                buttonType="secondary"
                className="btn-lg"
                onClick={this.refreshPage}
              >
                Reload Page
              </Button>
            </div>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

export default AppCrashErrorDisplay
