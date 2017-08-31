import React from 'react'
import NavBar from './ui/NavBar'
import Footer from './ui/Footer'
import LogInForm from './logIn/LogInForm'
import SignUpForm from './logIn/SignUpForm'

const LogIn = ({ flip }) => (
  <div className={`${flip ? 'sign-up-page' : 'log-in-page'}`}>
    <NavBar />
    <div className="content">
      <h1 className="center">The one-stop-shop for microservices</h1>
      <h3 className="center">
        KintoHub is a development platform that transforms you into a full-stack
        unicorn ninja that people can’t stop talking about. Sign up today and
        we’ll even throw in a free donut just for you.
      </h3>

      {flip ? (
        <div className="log-in-and-sign-up-wrapper">
          <SignUpForm />
          <LogInForm />
        </div>
      ) : (
        <div className="log-in-and-sign-up-wrapper">
          <LogInForm />
          <SignUpForm />
        </div>
      )}
    </div>
    <Footer />
  </div>
)

export default LogIn
