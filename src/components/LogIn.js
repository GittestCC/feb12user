import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LandingNavBar from './ui/LandingNavBar'
import Footer from './ui/Footer'
import SignUpFormContainer from '../containers/landing/signUp/SignUpFormContainer'
import LogInFormContainer from '../containers/landing/logIn/LogInFormContainer'

class LogIn extends Component {
  static propTypes = {
    flip: PropTypes.bool
  }

  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.push('/')
    }
  }

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
        <LandingNavBar url="https://kintohub.com" />

        <div className="content">
          <h1 className="center">The one-stop-shop for microservices</h1>
          <h3 className="center">
            KintoHub is a development platform that transforms you into a
            full-stack unicorn ninja that people can’t stop talking about. Sign
            up today and we’ll even throw in a free donut just for you.
          </h3>

          {flip ? (
            <div className="log-in-and-sign-up-wrapper">
              <SignUpFormContainer focusHere={true} />
              <LogInFormContainer />
            </div>
          ) : (
            <div className="log-in-and-sign-up-wrapper">
              <LogInFormContainer focusHere={true} />
              <SignUpFormContainer />
            </div>
          )}
        </div>

        <Footer />
      </div>
    )
  }
}

export default LogIn
