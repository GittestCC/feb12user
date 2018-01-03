import { expect } from 'chai'
import Login from '../page-objects/login.page'
import Landing from '../page-objects/landing.page'
import DashboardIndex from '../page-objects/dashboard.index.page'
import testData from '../constants/testdata.json'

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
    Login.loginUsername.setValue(testData.login.invalidUserName)
    Login.loginPassword.setValue(testData.login.validPassword)
    Login.loginSubmit()
    Login.loginFormError.waitForVisible()
    expect(Login.loginFormError.getText()).to.eql(
      'Invalid username or password.'
    )

    //Invalid Username and Valid Password
    Login.loginUsername.setValue(testData.login.invalidUserName)
    Login.loginPassword.setValue(testData.login.validPassword)
    Login.loginSubmit()
    Login.loginFormError.waitForVisible()
    expect(Login.loginFormError.getText()).to.eql(
      'Invalid username or password.'
    )

    //Valid Username and Invalid Password
    Login.loginUsername.setValue(testData.login.validUserName)
    Login.loginPassword.setValue(testData.login.invalidPassword)
    Login.loginSubmit()
    Login.loginFormError.waitForVisible()
    expect(Login.loginFormError.getText()).to.eql(
      'Invalid username or password.'
    )
  })

  it('should validates placeholder text ', () => {
    Login.open()
    var usernamePlaceholder = Login.loginUsername.getAttribute('placeholder')
    expect(usernamePlaceholder).to.eq('Enter username or email')
    var pwdPlaceholder = Login.loginPassword.getAttribute('placeholder')
    expect(pwdPlaceholder).to.eq('Enter a password')
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

  it('should reveal the password string when clicked on the eye and hide the password if clicked again', () => {
    Login.open()
    Login.loginPassword.setValue(testData.login.validPassword)
    Login.loginPasswordEye.click()
    var pwdAttrib = Login.loginPassword.getAttribute('type')
    expect(pwdAttrib).to.eq('text')

    Login.loginPasswordEye.click()
    pwdAttrib = Login.loginPassword.getAttribute('type')
    expect(pwdAttrib).to.eq('password')
  })

  it('should redirect the user to dashboard on using valid username with Upper case letters', () => {
    Login.open()
    Login.loginUsername.setValue(testData.login.validCAPSUserName)
    Login.loginPassword.setValue(testData.login.validPassword)
    Login.loginSubmit()
    DashboardIndex.container.waitForExist()
    expect(Login.getUrl()).to.eql('/app/dashboard')
  })

  it('should redirect the user to dashboard on using valid email with Upper case letters', () => {
    Login.open()
    Login.loginUsername.setValue(testData.login.validCAPSEmail)
    Login.loginPassword.setValue(testData.login.validPassword)
    Login.loginSubmit()
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
    Login.signupEmail.setValue(testData.signup.validUserName)
    expect(Login.signupEmailError.getText()).to.eql('Invalid email address')
    Login.signupPassword.setValue(testData.signup.invalidPassword)
    expect(Login.signupPasswordError.getText()).to.eql(
      'Password must contain a minimum of eight characters, at least one letter and one number'
    )
  })

  it('should validates placeholder text ', () => {
    Login.open()
    var usernamePlaceholder = Login.signupUsername.getAttribute('placeholder')
    expect(usernamePlaceholder).to.eq('Enter username')
    var pwdPlaceholder = Login.signupPassword.getAttribute('placeholder')
    expect(pwdPlaceholder).to.eq('Create a password')
    var emailPlaceholder = Login.signupEmail.getAttribute('placeholder')
    expect(emailPlaceholder).to.eq('Enter your email address')
  })

  it('should create a new user successfully', () => {
    Login.open()
    Login.signupUsername.setValue(testData.signup.validUserName)
    Login.signupEmail.setValue(testData.signup.validEmail)
    Login.signupPassword.setValue(testData.signup.validPassword)
    Login.signupSubmit()
    Login.signupSuccess.waitForVisible()
    expect(Login.signupSuccess.isVisible()).to.eql(true)
  })

  it('should validate unique email and username', () => {
    Login.open()
    Login.signupUsername.setValue(testData.signup.validUserName)
    Login.signupEmail.setValue(testData.signup.validEmail)
    Login.signupPassword.setValue(testData.signup.validPassword)
    Login.signupSubmit()
    Login.signupUsernameError.waitForVisible()
    expect(Login.signupUsernameError.getText()).to.eql(
      'Username is already in use'
    )
    expect(Login.signupEmailError.getText()).to.eql('Email is already in use')
  })

  it('should validate that username does not accept less than 3 characters', () => {
    Login.open()
    Login.signupUsername.setValue(testData.signup.twoLetterUserName)
    Login.signupEmail.setValue(testData.signup.twoLetterUserName + '@test.com')
    Login.signupPassword.setValue(testData.signup.validPassword)
    Login.signupSubmit()
    Login.signupUsernameError.waitForVisible()
    expect(Login.signupUsernameError.getText()).to.eql(
      'Username should be in the range 3 to 35  characters' //TODO Change Error message once validation is implemented.
    )
  })

  it('should validate that username does not accept more than 35 characters', () => {
    Login.open()
    Login.signupUsername.setValue(testData.signup.maxLetterUserName)
    Login.signupEmail.setValue(testData.signup.validEmailWithChar)
    Login.signupPassword.setValue(testData.signup.validPassword)
    Login.signupSubmit()
    Login.signupUsernameError.waitForVisible()
    expect(Login.signupUsernameError.getText()).to.eql(
      'Username should be in the range 3 to 35  characters' //TODO Change Error message once validation is implemented.
    )
  })

  it('should validate that username accepts  letters (a-z, both caps), numbers (0-9), dashes, underscores, apostrophes, periods (.), at (@)', () => {
    Login.open()
    Login.signupUsername.setValue(testData.signup.allCharUserName)
    Login.signupEmail.setValue(testData.signup.validEmailWithDot)
    Login.signupPassword.setValue(testData.signup.validPassword)
    Login.signupSubmit()
    Login.signupSuccess.waitForVisible()
    expect(Login.signupSuccess.isVisible()).to.eql(true)
  })

  it('should validate that username accepts space between characters', () => {
    Login.open()
    Login.signupUsername.setValue(testData.signup.validUserNameWithSpace)
    Login.signupEmail.setValue(testData.signup.validEmailWithdash)
    Login.signupPassword.setValue(testData.signup.validPassword)
    Login.signupSubmit()
    Login.signupSuccess.waitForVisible()
    expect(Login.signupSuccess.isVisible()).to.eql(true)
  })

  it('should validate that email accepts  only letters (a-z, both caps), numbers (0-9), dashes (-), underscores (_), apostrophes,periods (.), at (@)', () => {
    Login.open()
    Login.signupUsername.setValue(testData.signup.validUserNameWithNumber)
    Login.signupEmail.setValue(testData.signup.validEmailWithMultiChar)
    Login.signupPassword.setValue(testData.signup.validPassword)
    Login.signupSubmit()
    Login.signupSuccess.waitForVisible()
    expect(Login.signupSuccess.isVisible()).to.eql(true)
  })

  it('should validate that email does not accept value less than 5 characters', () => {
    Login.open()
    Login.signupUsername.setValue(testData.signup.validUserNameWithChar)
    Login.signupEmail.setValue(testData.signup.invalidEmailLength4)
    Login.signupPassword.setValue(testData.signup.validPassword)
    Login.signupEmailError.waitForVisible()
    expect(Login.signupEmailError.getText()).to.eql('Invalid email address')
  })

  it('should validate that email does not accept value more than 35 characters', () => {
    Login.open()
    Login.signupUsername.setValue(testData.signup.validUserNameWithChar)
    Login.signupEmail.setValue(testData.signup.invalidEmailLength40)
    Login.signupPassword.setValue(testData.signup.validPassword)
    Login.signupEmailError.waitForVisible()
    expect(Login.signupEmailError.getText()).to.eql('Invalid email address')
  })

  it('should validate password complexity rule is displayed on the Sign Up form', () => {
    Login.open()

    expect(Login.signupForm.getText()).to.include(
      'Requires 8 characters, at least 1 letter and 1 number'
    )
  })

  it('should reveal the password string when clicked on the eye and hide the password if clicked again', () => {
    Login.open()
    Login.signupPassword.setValue(testData.signup.validPassword)
    Login.signupPasswordEye.click()
    var pwdAttrib = Login.signupPassword.getAttribute('type')
    expect(pwdAttrib).to.eq('text')

    Login.signupPasswordEye.click()
    pwdAttrib = Login.signupPassword.getAttribute('type')
    expect(pwdAttrib).to.eq('password')
  })

  it('should validate that password accepts a password which is with 8 characters, at least 1 number and 1 letter', () => {
    Login.open()
    Login.signupUsername.setValue(testData.signup.validUserNameWithDash)
    Login.signupEmail.setValue(
      testData.signup.validUserNameWithDash + '@test.com'
    )
    Login.signupPassword.setValue(testData.signup.validPasswordEightChar)
    Login.signupSubmit()
    Login.signupSuccess.waitForVisible()
    expect(Login.signupSuccess.isVisible()).to.eql(true)
  })

  it('should validate that password accepts a password which is with 20 characters, at least 1 number and 1 letter', () => {
    Login.open()
    Login.signupUsername.setValue(testData.signup.validUserNameWithDot)
    Login.signupEmail.setValue(
      testData.signup.validUserNameWithDot + '@test.com'
    )
    Login.signupPassword.setValue(testData.signup.validPasswordTwentyChar)
    Login.signupSubmit()
    Login.signupSuccess.waitForVisible()
    expect(Login.signupSuccess.isVisible()).to.eql(true)
  })

  it('should validate that password accepts special characters @,dashes(-),underscores(_),apostrophes', () => {
    Login.open()
    Login.signupUsername.setValue(testData.signup.validUserNameWithAt)
    Login.signupEmail.setValue(testData.signup.validUserNameWithAt + 'test.com')
    Login.signupPassword.setValue(testData.signup.validPasswordSpecialChar)
    Login.signupSubmit()
    Login.signupSuccess.waitForVisible()
    expect(Login.signupSuccess.isVisible()).to.eql(true)
  })

  it('should validate that password accepts with all capital letters and one number', () => {
    Login.open()
    Login.signupUsername.setValue(testData.signup.validUserNameWiths)
    Login.signupEmail.setValue(testData.signup.validLongEmail)
    Login.signupPassword.setValue(testData.signup.validPasswordUC)
    Login.signupSubmit()
    Login.signupSuccess.waitForVisible()
    expect(Login.signupSuccess.isVisible()).to.eql(true)
  })

  it('should validate that password is not accepted if more than one special characters are used in the password with other conditions not applied', () => {
    Login.open()
    Login.signupUsername.setValue(testData.signup.validUserNameWith$)
    Login.signupPassword.setValue(
      testData.signup.inavalidPasswordWithSpecialChar
    )
    Login.signupEmail.setValue(testData.signup.validEmailWith$)
    Login.signupPasswordError.waitForVisible()
    expect(Login.signupPasswordError.getText()).to.eql(
      'Password must contain a minimum of eight characters, at least one letter and one number'
    )
  })
})
