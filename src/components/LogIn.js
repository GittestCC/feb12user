import React, { Component } from 'react'
import LandingNavBar from './ui/LandingNavBar'
import Footer from './ui/Footer'
import LogInForm from './logIn/LogInForm'
import SignUpFormContainer from '../containers/landing/signUp/SignUpFormContainer'

class LogIn extends Component {
  state = {
    isSignUpSubmitted: false,
    confirmedEmail: null
  }

  registeredSuccessfully = confirmedEmail => {
    this.setState({ isSignUpSubmitted: true, confirmedEmail })
    window.scrollTo(0, 0)
  }

  render() {
    const { flip } = this.props

    return (
      <div className={`${flip ? 'sign-up-page' : 'log-in-page'}`}>
        <LandingNavBar />

        {this.state.isSignUpSubmitted ? (
          <div>
            <div className="cover" />
            <div className="content">
              <div className="sign-up-confirmation">
                <div className="icon" />
                <h2>
                  An activation link has been sent to{' '}
                  {this.state.confirmedEmail}
                </h2>
                <h6>
                  If you have trouble finding the email, make sure to check your
                  spam inbox as well.
                </h6>
              </div>
            </div>
          </div>
        ) : (
          <div className="content">
            <h1 className="center">The one-stop-shop for microservices</h1>
            <h3 className="center">
              KintoHub is a development platform that transforms you into a
              full-stack unicorn ninja that people can’t stop talking about.
              Sign up today and we’ll even throw in a free donut just for you.
            </h3>

            {flip ? (
              <div className="log-in-and-sign-up-wrapper">
                <SignUpFormContainer onSuccess={this.registeredSuccessfully} />
                <LogInForm />
              </div>
            ) : (
              <div className="log-in-and-sign-up-wrapper">
                <LogInForm />
                <SignUpFormContainer onSuccess={this.registeredSuccessfully} />
              </div>
            )}
          </div>
        )}

        <Footer />
      </div>
    )
  }
}

export default LogIn
