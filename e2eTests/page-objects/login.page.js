import Page from './page'
import DashboardIndex from './dashboard.index.page'
import testData from '../constants/testdata.json'
import { expect } from 'chai'

class Login extends Page {
  open() {
    super.open('log-in')
  }

  login() {
    this.open()
    this.loginUsername.setValue(this.TEST_USERNAME)
    this.loginPassword.setValue(this.TEST_PASSWORD)
    this.loginSubmit()
    DashboardIndex.container.waitForExist()
  }

  //This method is only for Staging run
  registerAndLogin() {
    var username
    this.open()
    this.signupUsername.waitForVisible()
    var currentDate = new Date()
    username = testData.signup.validUserName + currentDate.getTime()
    this.signupUsername.setValue(username)
    this.signupEmail.setValue(
      username + currentDate.getTime() + '@kintohub.com'
    )
    this.signupPassword.setValue(testData.signup.validPassword)
    this.signupSubmit()
    this.signupSuccess.waitForVisible()
    expect(this.signupSuccess.isVisible()).to.eql(true)
    this.logout()
    this.open()
    this.loginUsername.setValue(username)
    this.loginPassword.setValue(testData.signup.validPassword)
    this.loginSubmit()
    return username
  }

  get loginUsername() {
    return $('[data-test=loginUsername] input')
  }
  get loginUsernameError() {
    return $('[data-test=loginUsername] .error-message')
  }
  get loginPassword() {
    return $('[data-test=loginPassword] input')
  }
  get loginPasswordError() {
    return $('[data-test=loginPassword] .error-message')
  }

  get loginPasswordEye() {
    return $('[data-test=loginForm] .show-password')
  }

  get loginRememberMe() {
    return $('#KeepSignedIn')
  }

  get loginForm() {
    return $('[data-test=loginForm]')
  }

  get loginH3Text() {
    return $('.content > h3')
  }

  get loginH1Text() {
    return $('.content > h1')
  }

  get loginFormError() {
    return $('[data-test=loginForm] [data-test=form-error]')
  }

  get signupUsername() {
    return $('[data-test=signupUsername] input')
  }

  get signupUsernameError() {
    return $('[data-test=signupUsername] .error-message')
  }

  get signupEmail() {
    return $('[data-test=signupEmail] input')
  }

  get signupEmailError() {
    return $('[data-test=signupEmail] .error-message')
  }

  get signupPassword() {
    return $('[data-test=signupPassword] input')
  }

  get signupPasswordError() {
    return $('[data-test=signupPassword] .error-message')
  }
  get signupPasswordEye() {
    return $('[data-test=signupForm] .show-password')
  }

  get signupSuccess() {
    return $('[data-test=signupSuccess]')
  }

  get signupForm() {
    return $('[data-test=signupForm]')
  }

  get password_rule() {
    return $('.byline')
  }

  signupSubmit() {
    this.signupForm.submitForm()
  }

  loginSubmit() {
    this.loginForm.submitForm()
  }

  get forgotPasswordLink() {
    return $('[data-test=loginForm] .forgot-password')
  }

  get forgotPasswordUNEmail() {
    return $('[data-test=forgotPassword] input')
  }
}

export default new Login()
