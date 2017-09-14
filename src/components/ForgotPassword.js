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
        <LandingNavBar />

        {this.state.isForgotPasswordSubmitted ? (
          <div>
            <div className="content forgot-password-wrapper">
              <div className="forgot-password-confirmation">
                <div className="icon" />
                <h2>An activation link has been sent to your email.</h2>
                <h6>
                  If you have trouble finding the email, make sure to check your
                  spam inbox as well.
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
