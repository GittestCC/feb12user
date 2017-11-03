import { expect } from 'chai'
import Login from '../page-objects/login.page'

describe('login form', () => {
  it('should validates inputs and deny access with wrong creds', () => {
    Login.open()
    Login.loginSubmit()
    Login.loginUsernameError.waitForVisible()
    expect(Login.loginUsernameError.getText()).to.eql('Required')
    expect(Login.loginPasswordError.getText()).to.eql('Required')
    Login.loginUsername.setValue('test')
    Login.loginPassword.setValue('password1')
    Login.loginSubmit()
    Login.loginFormError.waitForVisible()
    expect(Login.loginFormError.getText()).to.eql(
      'Invalid username or password.'
    )
  })
})

describe('signup form', () => {
  it('should validates inputs', () => {
    Login.open()
    Login.signupSubmit()
    Login.signupUsernameError.waitForVisible()
    expect(Login.signupUsernameError.getText()).to.eql('Required')
    expect(Login.signupEmailError.getText()).to.eql('Required')
    expect(Login.signupPasswordError.getText()).to.eql('Required')
    Login.signupEmail.setValue('test')
    expect(Login.signupEmailError.getText()).to.eql('Invalid email address')
    Login.signupPassword.setValue('password')
    expect(Login.signupPasswordError.getText()).to.eql(
      'Password must contain a minimum of eight characters, at least one letter and one number'
    )
  })

  it('should create a new user successfully', () => {
    Login.open()
    Login.signupUsername.setValue('test')
    Login.signupEmail.setValue('test@test.com')
    Login.signupPassword.setValue('password1')
    Login.signupSubmit()
    Login.signupSuccess.waitForVisible()
    expect(browser.isVisible('[data-test=signupSuccess]')).to.eql(true)
  })

  it('should validate unique email and username', () => {
    Login.open()
    Login.signupUsername.setValue('test')
    Login.signupEmail.setValue('test@test.com')
    Login.signupPassword.setValue('password1')
    Login.signupSubmit()
    Login.signupUsernameError.waitForVisible()
    expect(Login.signupUsernameError.getText()).to.eql(
      'Username is already in use'
    )
    expect(Login.signupEmailError.getText()).to.eql('Email is already in use')
  })
})
