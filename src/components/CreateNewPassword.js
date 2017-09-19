import React from 'react'
import CreateNewPasswordFormContainer from '../containers/landing/createNewPassword/CreateNewPasswordFormContainer'
import Footer from './ui/Footer'
import LandingNavBar from './ui/LandingNavBar'

const CreateNewPassword = () => (
  <div className="create-new-password-page">
    <LandingNavBar />
    <CreateNewPasswordFormContainer />
    <Footer />
  </div>
)

export default CreateNewPassword
