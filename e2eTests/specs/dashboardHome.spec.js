import { expect } from 'chai'
import Login from '../page-objects/login.page'
import DashboardIndex from '../page-objects/dashboard.index.page'
import KintoAppCreate from '../page-objects/kintoApp.create.page'
import KintoBlockCreate from '../page-objects/kintoBlock.create.page'
import Landing from '../page-objects/landing.page'
import Home from '../page-objects/home.page'
import testData from '../constants/testdata.json'

describe('dashboard Home', () => {
  it('should display Kintohub logo in the center after successfull login', () => {
    Login.login()
    expect(DashboardIndex.kintoHub_Logo.isVisible()).to.eql(true)
  })

  it('should display top bar, side bar and body of the home page after successful login', () => {
    expect(Landing.sidebar.isVisible()).to.eql(true)
    expect(Landing.topbar.isVisible()).to.eql(true)
    expect(DashboardIndex.container.isVisible()).to.eql(true)
    Login.logout()
  })

  it('should navigate user to home page if remember me option is selected during login action', () => {
    Login.open()
    Login.loginUsername.setValue(testData.login.validUserName)
    Login.loginPassword.setValue(testData.login.validPassword)
    Login.loginRememberMe.click()
    Login.loginSubmit()
    DashboardIndex.container.waitForExist()
    Login.open()
    expect(DashboardIndex.container.isVisible()).to.eql(true)
  })

  it('should display the welcome message for user on the Home page', () => {
    expect(DashboardIndex.container.element('h1').getText()).to.eql(
      'Welcome to KintoHub.'
    )
    expect(DashboardIndex.getStartedBtn.isVisible()).to.eql(true)
    expect(DashboardIndex.container.element('h4').getText()).to.eql(
      'The coding adventure awaits! You can start exploring right away or read our quick guide:'
    )
  })

  it('should verify that user can get to the home page through the dedicated url -/app/dashboard/:id ', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DashboardIndex.open(ws)
    expect(DashboardIndex.container.isVisible()).to.eql(true)
  })

  it('should verify if Sign up button opens the sign up form from home page ', () => {
    Home.open()
    Home.signUpBtn.click()
    expect(Login.signupUsername.isVisible()).to.eql(true)
  })

  it('should verify if Log in button opens the dashboard  from home page, if user already logged in', () => {
    Home.open()
    Home.loginBtn.click()
    expect(DashboardIndex.container.isVisible()).to.eql(true)
    expect(Login.loginUsername.isVisible()).to.eql(true)
  })

  it('should verify if Log in button opens the login form  from home page, if user not logged in', () => {
    DashboardIndex.logout()
    Home.open()
    Home.loginBtn.click()
    expect(Login.loginUsername.isVisible()).to.eql(true)
  })

  it('should verify if Login button click from home page opens the dashboard if user already logged in ', () => {
    Login.login()
    Home.open()
    expect(DashboardIndex.container.isVisible()).to.eql(true)
  })

  it('should display Kintohub logo and title, dashboard and market button, searchbar, bell and user icon, logout button ', () => {
    Login.open()
    expect(DashboardIndex.kintoHub_Logolefttop.isVisible()).to.eql(true)
    expect(DashboardIndex.dashboardButton.isVisible()).to.eql(true)
    expect(DashboardIndex.goTomarket.isVisible()).to.eql(true)
    expect(DashboardIndex.searchBar.isVisible()).to.eql(true)
    expect(DashboardIndex.bellIcon.isVisible()).to.eql(true)
    expect(DashboardIndex.userIcon.isVisible()).to.eql(true)
    DashboardIndex.avatarBtn.click()
    DashboardIndex.logoutBtn.waitForVisible()
    expect(DashboardIndex.logoutBtn.isVisible()).to.eql(true)
  })

  it('should redirect to dashboard page if dashboard button is clicked, when already on dashboard page', () => {
    DashboardIndex.dashboardButton.click()
    expect(DashboardIndex.container.isVisible()).to.eql(true)
  })

  it('should redirect to dashboard page if dashboard button is clicked, when on Applications,KintoBlocks and market page', () => {
    //Navigating to dashboard from Applications
    KintoAppCreate.open()
    KintoAppCreate.form.waitForVisible()
    DashboardIndex.dashboardButton.click()
    DashboardIndex.container.waitForVisible()
    expect(DashboardIndex.container.isVisible()).to.eql(true)

    //Navigating to dashboard from KintoBlock
    KintoBlockCreate.open()
    KintoBlockCreate.form.waitForVisible()
    DashboardIndex.dashboardButton.click()
    DashboardIndex.container.waitForVisible()
    expect(DashboardIndex.container.isVisible()).to.eql(true)

    //Navigating to dashboard from Market
    DashboardIndex.goTomarket.click()
    DashboardIndex.goTodashboard.click()
    DashboardIndex.container.waitForVisible()
    expect(DashboardIndex.container.isVisible()).to.eql(true)
  })

  it('should redirect to dashboard page if kintohub logo on top left is clicked, when already on dashboard page', () => {
    DashboardIndex.kintoHub_Logolefttop.click()
    expect(DashboardIndex.container.isVisible()).to.eql(true)
  })

  it('should redirect to dashboard page if dashboard buttin on top left is clicked, when already on dashboard page', () => {
    DashboardIndex.dashboardButton.click()
    expect(DashboardIndex.container.isVisible()).to.eql(true)
  })

  it('should redirect to dashboard page if kintohub logo on top left is clicked, when on Applications,KintoBlocks and market page', () => {
    //Navigating to dashboard from Applications
    KintoAppCreate.open()
    KintoAppCreate.form.waitForVisible()
    DashboardIndex.kintoHub_Logolefttop.click()
    expect(DashboardIndex.container.isVisible()).to.eql(true)

    //Navigating to dashboard from KintoBlock
    KintoBlockCreate.open()
    KintoBlockCreate.form.waitForVisible()
    DashboardIndex.kintoHub_Logolefttop.click()
    expect(DashboardIndex.container.isVisible()).to.eql(true)

    //Navigating to dashboard from Market
    DashboardIndex.goTomarket.click()
    DashboardIndex.kintoHub_Logolefttop.click()
    expect(DashboardIndex.getStartedBtn.isVisible()).to.eql(true)
  })

  it('should display  add icon, when mouse pointer moved over applications', () => {
    DashboardIndex.applicationLeftnav.waitForVisible()
    browser.moveToObject('.kintoapps')
    DashboardIndex.kaHoveraddicon.waitForVisible()
    expect(DashboardIndex.kaHoveraddicon.isVisible()).to.eql(true)
  })

  it('should navigate to KA create page, when add icon on right side of application is clicked', () => {
    DashboardIndex.kaHoveraddicon.click()
    KintoAppCreate.form.waitForVisible()
    expect(KintoAppCreate.createKintoAppTitle.getText()).to.eql(
      'Create New Application'
    )
  })

  it('should display hover add icon, when mouse pointer moved over kintoblocks', () => {
    DashboardIndex.kintoBlocksleftnav.waitForVisible()
    browser.moveToObject('.kintoblocks')
    DashboardIndex.kbHoveraddicon.waitForVisible()
    expect(DashboardIndex.kbHoveraddicon.isVisible()).to.eql(true)
  })

  it('should navigate to KB create page, when add icon on right side of kintoblocks is clicked', () => {
    DashboardIndex.kbHoveraddicon.click()
    KintoBlockCreate.form.waitForVisible()
    expect(KintoBlockCreate.createKBTitle.getText()).to.eql(
      'Create KintoBlocks'
    )
  })

  it('should display the logout button when clicked on the avatar button and on click should logout the user', () => {
    DashboardIndex.avatarBtn.waitForVisible()
    DashboardIndex.avatarBtn.click()
    DashboardIndex.logoutBtn.click()
    expect(Login.loginUsername.isVisible()).to.eql(true)
  })

  it('should display applications, analytics and kintoblocks on the left navigation bar', () => {
    DashboardIndex.applicationLeftnav.waitForVisible()
    expect(DashboardIndex.applicationLeftnav.isVisible()).to.eql(true)
    expect(DashboardIndex.kintoBlocksleftnav.isVisible()).to.eql(true)
    expect(DashboardIndex.analyticsLeftnav.isVisible()).to.eql(true)
    //TODO Overview and Services not implemented yet
  })

  it('should display left navigation menu, when navigating to all pages of kintohub', () => {
    DashboardIndex.homeLeftnav.click()
    expect(DashboardIndex.kintoHub_Logo.isVisible()).to.eql(true)
    expect(DashboardIndex.sidebar.isVisible()).to.eql(true)
    DashboardIndex.applicationLeftnav.click()
    expect(DashboardIndex.sidebar.isVisible()).to.eql(true)
    DashboardIndex.kintoBlocksleftnav.click()
    expect(DashboardIndex.sidebar.isVisible()).to.eql(true)

    //TODO check from workspace, market,Analytics, Services, Overview
  })

  it('should verify that Center button CTA redirects opens help center in a new tab, to the relevant dedicated section - Get started', () => {
    Login.login()
    DashboardIndex.getStartedBtn.click()
    let handles = browser.windowHandles()
    browser.switchTab(handles[1]).pause(2000)
  })
})
