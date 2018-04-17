import React, { Component } from 'react'
import ForgotPasswordFormContainer from '../containers/landing/forgotPassword/ForgotPasswordFormContainer'
import Footer from './ui/Footer'
import LandingNavBar from './ui/LandingNavBar'

class ForgotPassword extends Component {
  state = {
    isForgotPasswordSubmitted: false
  }

  forgotPasswordSuccess = () => {
    this.setState({ isForgotPasswordSubmitted: true })
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div className="forgot-password-page">
        <LandingNavBar url="/" />
        {this.state.isForgotPasswordSubmitted ? (
          <div>
            <div className="content forgot-password-wrapper">
              <div className="forgot-password-confirmation">
                <div className="icon" />
                <h2>A confirmation link has been sent to your email.</h2>
                <h6>
                  Trouble finding the email? Have a look in your spam folder,
                  just in case.
                </h6>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <ForgotPasswordFormContainer
              onSuccess={this.forgotPasswordSuccess}
            />
          </div>
        )}
        <Footer />
      </div>
    )
  }
}

export default ForgotPassword
