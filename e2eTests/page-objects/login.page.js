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
  get loginForm() {
    return $('[data-test=loginForm]')
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

  get signupSuccess() {
    return $('[data-test=signupSuccess]')
  }

  get signupForm() {
    return $('[data-test=signupForm]')
  }

  signupSubmit() {
    this.signupForm.submitForm()
  }

  loginSubmit() {
    this.loginForm.submitForm()
  }
}

export default new Login()
