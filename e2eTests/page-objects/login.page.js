import Page from './page'
import DashboardIndex from './dashboard.index.page'

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

  get loginUsername() {
    return browser.element('[data-test=loginUsername] input')
  }
  get loginUsernameError() {
    return browser.element('[data-test=loginUsername] .error-message')
  }
  get loginPassword() {
    return browser.element('[data-test=loginPassword] input')
  }
  get loginPasswordError() {
    return browser.element('[data-test=loginPassword] .error-message')
  }
  get loginForm() {
    return browser.element('[data-test=loginForm]')
  }

  get loginFormError() {
    return browser.element('[data-test=loginForm] [data-test=form-error]')
  }

  get signupUsername() {
    return browser.element('[data-test=signupUsername] input')
  }

  get signupUsernameError() {
    return browser.element('[data-test=signupUsername] .error-message')
  }

  get signupEmail() {
    return browser.element('[data-test=signupEmail] input')
  }

  get signupEmailError() {
    return browser.element('[data-test=signupEmail] .error-message')
  }

  get signupPassword() {
    return browser.element('[data-test=signupPassword] input')
  }

  get signupPasswordError() {
    return browser.element('[data-test=signupPassword] .error-message')
  }

  get signupSuccess() {
    return browser.element('[data-test=signupSuccess]')
  }

  get signupForm() {
    return browser.element('[data-test=signupForm]')
  }

  signupSubmit() {
    this.signupForm.submitForm()
  }

  loginSubmit() {
    this.loginForm.submitForm()
  }
}

export default new Login()
