import { expect } from 'chai'
import Login from '../page-objects/login.page'
import Landing from '../page-objects/landing.page'
import DashboardIndex from '../page-objects/dashboard.index.page'

describe('login form', () => {
  it('should redirect the user to landing if he is not logged in and is trying to access root', () => {
    browser.url('/')
    Landing.navbar.waitForVisible()
    expect(Landing.getUrl()).to.eql('/home')
  })

  it('should validates inputs and deny access with wrong creds', () => {
    Login.open()
    Login.loginSubmit()
    Login.loginUsernameError.waitForVisible()
    expect(Login.loginUsernameError.getText()).to.eql('Required')
    expect(Login.loginPasswordError.getText()).to.eql('Required')
    Login.loginUsername.setValue('invalid')
    Login.loginPassword.setValue('password1')
    Login.loginSubmit()
    Login.loginFormError.waitForVisible()
    expect(Login.loginFormError.getText()).to.eql(
      'Invalid username or password.'
    )
  })

  it('should redirect the user to dashboard after he login successfully', () => {
    Login.login()
    expect(Login.getUrl()).to.eql('/app/dashboard')
  })

  it('should redirect the user to dashboard home if he is logged in and is trying to access root', () => {
    browser.url('/')
    DashboardIndex.container.waitForExist()
    expect(Login.getUrl()).to.eql('/app/dashboard')
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
