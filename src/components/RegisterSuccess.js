import React from 'react'
import qs from 'query-string'
import LandingNavBar from './ui/LandingNavBar'
import Footer from './ui/Footer'

const RegisterSuccess = ({ location }) => {
  const query = qs.parse(location.search)
  return (
    <div className="log-in-page">
      <LandingNavBar />
      <div data-test="signupSuccess">
        <div className="cover" />
        <div className="content">
          <div className="sign-up-confirmation">
            <div className="icon" />
            <h2>An activation link has been sent to {query.email}</h2>
            <h6>
              If you have trouble finding the email, make sure to check your
              spam inbox as well.
            </h6>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default RegisterSuccess
