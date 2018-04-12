import React, { Component } from 'react'
import { isAnalyticsActive, trackException } from '../helpers/analyticsHelper'
import { REFRESH_PAGE, NOT_FOUND } from '../constants/errorPageTypes'
import { Button } from './forms'
import LandingNavBar from './ui/LandingNavBar'
import Footer from './ui/Footer'

class ErrorPage extends Component {
  refreshPage() {
    window.location.reload()
  }

  componentDidCatch(error, info) {
    if (isAnalyticsActive()) {
      trackException(error, info)
    }
    this.props.showErrorPage(REFRESH_PAGE)
  }

  render() {
    const { errorPageType } = this.props
    if (errorPageType === REFRESH_PAGE) {
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

    if (errorPageType === NOT_FOUND) {
      return (
        <div>
          <LandingNavBar url="/" />
          <div className="content">
            <h1 className="center">Oopsie</h1>
            <h3 className="center">Page not found</h3>
            <div className="center">
              <img src="/images/errors-glitch.gif" alt="Page not found" />
            </div>
          </div>
          <Footer />
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorPage
