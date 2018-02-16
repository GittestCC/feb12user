import { expect } from 'chai'
import Login from '../page-objects/login.page'
import DashboardIndex from '../page-objects/dashboard.index.page'
import KintoAppList from '../page-objects/kintoApp.list.page'
import KintoAppCreate from '../page-objects/kintoApp.create.page'
import KintoAppManage from '../page-objects/kintoApp.manage.page'
import testData from '../constants/testdata.json'
import EnvironmentManage from '../page-objects/environment.manage.page'

describe('Environment Create/Edit page ', () => {
  it('should navigate user to `edit` page of environment, when user click on `edit` button of concerned environment', () => {
    Login.login()
    DashboardIndex.applicationLeftnav.waitForVisible()
    browser.moveToObject('.kintoapps')
    DashboardIndex.kaHoveraddicon.waitForVisible()
    DashboardIndex.kaHoveraddicon.click()
    KintoAppCreate.form.waitForVisible()
    KintoAppCreate.name.input.setValue(testData.kintoapp.validKintoAppName)
    KintoAppCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescription
    )
    // KintoAppCreate.submitGlobal()
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getCard(0).waitForVisible()
    KintoAppList.getCard(0).click()
    KintoAppManage.form.waitForVisible()
    EnvironmentManage.viewEnvList.click()
    EnvironmentManage.envList.waitForVisible()
    //TODO Click on environment card
  })

  it('should display title, subtitle, body, environment name input field and Non-editable text fields for Client ID and Secret Key, when user is in `edit` page of environment', () => {
    expect(EnvironmentManage.envTitle.isVisible()).to.eql(true)
    expect(EnvironmentManage.envSubtitle.isVisible()).to.eql(true)
    expect(EnvironmentManage.envBody.isVisible()).to.eql(true)
    expect(EnvironmentManage.name.input.isVisible()).to.eql(true)
    //TODO Non-editable text fields for Client ID and Secret Key are not implemented
  })

  it('should navigate user to `edit` page of environment, when existing environment is clicked from the breadcrumb', () => {
    EnvironmentManage.breadcrumbEnv.click()
    EnvironmentManage.breadcrumbEnvDropDown.waitForVisible()
    var envName = EnvironmentManage.getbreadCrumbEnvText(1)
    EnvironmentManage.getbreadCrumbEnv(1).click()
    EnvironmentManage.form.waitForVisible()
    expect(EnvironmentManage.envTitle.getText()).to.eql(envName)
  })

  it('should reflect environment changes made in `edit` page of environment, where ever environment is displayed', () => {
    EnvironmentManage.name.input(testData.Environment.allValidEnvChar)
    EnvironmentManage.submitGlobal()
    expect(EnvironmentManage.envTitle.getText()).to.eql(
      testData.Environment.allValidEnvChar
    )
    //TODO Verify on environment breadcrumb
  })

  it('should display validation error message, when environment name is less than 3 characters in `edit` page of environment', () => {
    EnvironmentManage.name.input(testData.Environment.invalidEnvThreeChar)
    EnvironmentManage.name.error.waitForVisible()
    browser.keys('Tab')
    expect(EnvironmentManage.name.error.getText()).to.eql(
      'Must be 3 characters or more'
    )
  })

  it('should display validation error message, when environment name is more than 35 characters in `edit` page of environment', () => {
    EnvironmentManage.name.input(testData.Environment.invalidEnvThirtyFiveChar)
    EnvironmentManage.name.error.waitForVisible()
    browser.keys('Tab')
    expect(EnvironmentManage.name.error.getText()).to.eql(
      'Must be 35 characters or less'
    )
  })

  it('should display validaton error message, when environment is duplicated through `edit` page of environment', () => {
    //TODO
  })

  it('should not display validation error message, when valid characters are used in `edit page of environment', () => {
    EnvironmentManage.name.input(testData.Environment.allValidEnvChar)
    browser.keys('Tab')
    expect(EnvironmentManage.name.error.isVisible()).to.eql(false)
  })

  it('should do validation on first submission, when user enters invalid characters in environment name field and click save changes in `edit` page of environment', () => {
    EnvironmentManage.name.input(testData.Environment.invalidEnvThreeChar)
    EnvironmentManage.submitGlobal()
    EnvironmentManage.name.error.waitForVisible()
    expect(EnvironmentManage.name.error.getText()).to.eql(
      'Must be 3 characters or more'
    )
    EnvironmentManage.name.input(testData.Environment.invalidEnvThirtyFiveChar)
    EnvironmentManage.submitGlobal()
    EnvironmentManage.name.error.waitForVisible()
    expect(EnvironmentManage.name.error.getText()).to.eql(
      'Must be 35 characters or less'
    )
    EnvironmentManage.name.input.setValue(testData.Environment.allValidEnvChar)
    EnvironmentManage.submitGlobal()
    expect(EnvironmentManage.name.error.getText()).to.eql(
      'Only lowercase characters and digits are allowed'
    )
  })

  it('should do validation blur, when user enters valid characters of environment name field on second try in `edit` page of environment', () => {
    EnvironmentManage.name.input(testData.Environment.invalidEnvThreeChar)
    EnvironmentManage.submitGlobal()
    EnvironmentManage.name.error.waitForVisible()
    expect(EnvironmentManage.name.error.getText()).to.eql(
      'Must be 3 characters or more'
    )
    EnvironmentManage.name.input(testData.Environment.allValidEnvChar)
    expect(EnvironmentManage.name.error.isVisible()).to.eql(false)
  })

  it('should display `save changes` button as disabled, when user navigates to edit page of environment', () => {
    EnvironmentManage.submitGlobal.waitForVisible()
    expect(browser.isEnabled('button.button.default')).to.eql(false)
  })

  it('should display `save changes` button as enabled, when user navigates to edit page of environment and make any changes', () => {
    EnvironmentManage.submitGlobal.waitForVisible()
    expect(browser.isEnabled('button.button.default')).to.eql(true)
  })

  it('should display `save changes` button as disabled, when user navigates to edit page of environment and edit any environment fields and save the changes', () => {
    EnvironmentManage.submitGlobal.waitForVisible()
    expect(browser.isEnabled('button.button.default')).to.eql(false)
    EnvironmentManage.name.input(testData.Environment.allValidEnvChar)
    EnvironmentManage.submitGlobal()
    expect(browser.isEnabled('button.button.default')).to.eql(true)
    expect(browser.isEnabled('button.button.default')).to.eql(false)
  })
})
