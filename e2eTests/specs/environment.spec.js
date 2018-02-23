import { expect } from 'chai'
import Login from '../page-objects/login.page'
import DashboardIndex from '../page-objects/dashboard.index.page'
import KintoAppList from '../page-objects/kintoApp.list.page'
import KintoAppCreate from '../page-objects/kintoApp.create.page'
import KintoAppManage from '../page-objects/kintoApp.manage.page'
import EnvironmentManage from '../page-objects/environment.manage.page'
import EnvironmentList from '../page-objects/environment.list.page'
import EnvironmentCreate from '../page-objects/environment.create.page'
import Landing from '../page-objects/landing.page'
import testData from '../constants/testdata.json'

describe('Environment Create/Edit page ', () => {
  it('should navigate user to `edit` page of environment, when user click on `edit` button of concerned environment', () => {
    Login.login()
    DashboardIndex.kintoHubLogo.waitForVisible()
    expect(DashboardIndex.kintoHubLogo.isVisible()).to.eql(true)
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppCreate.open(ws)
    KintoAppCreate.form.waitForVisible()
    KintoAppCreate.name.input.setValue(testData.kintoapp.validKintoAppName)
    KintoAppCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescription
    )

    //TODO Solutions for Create Application click()
    //Solution1 Start:  KintoAppCreate.name.input.leftClick()

    //    browser.actions([{
    //        "type": "key",
    //        "id": "keyboard",
    //        "actions": [
    //            {"type": "keyDown", "value": "\uE006"},
    //            {"type": "keyUp", "value": "\uE006"}
    //
    //
    //        ]
    //    }]);
    //
    //    // release an action
    //    browser.actions();
    //
    //    Solution1 End

    //Solution 2:
    //KintoAppCreate.name.input.leftClick()
    //KintoAppCreate.name.input.keys('\uE007')
    // Solution 3:
    //KintoAppCreate.name.input.leftClick()
    //browser.keys('Enter')
    // Solution 4:
    // KintoAppCreate.name.input.leftClick()
    // browser.elementIdValue(KintoAppCreate.name.input,["RETURN"])

    // Solution 5 Start:
    // KintoAppCreate.name.input.leftClick()
    //   var result = browser.elementActive();
    //    var activeElement = result.value && result.value.ELEMENT;
    //
    //    if(activeElement){
    //         browser.elementIdValue(activeElement, ["Return"]);
    //    }
    //Solution 5 End:
    //Solution 6 :browser.submitForm()
    KintoAppCreate.submitGlobal()
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getCard(0).waitForVisible()
    KintoAppList.getCard(0).click()
    KintoAppManage.form.waitForVisible()
    EnvironmentManage.viewEnvList.click()
    EnvironmentManage.envList.waitForVisible()
    EnvironmentManage.geteditEnvBtn(1).click()
    EnvironmentManage.form.waitForVisible()
  })

  it('should display Add Environment Title and name field is displayed in `Add new environment` pop up, when user click on `add new environment` button on top right of environment list page', () => {
    EnvironmentManage.envListFromBreadCrumb.click()
    EnvironmentList.addEnv.click()
    expect(EnvironmentCreate.addEnvPopUp.isVisible()).to.eql(true)
    expect(EnvironmentCreate.addEnvPopUpTitle.getText()).to.eql(
      'Add New Environment'
    )
    expect(EnvironmentCreate.addEnvNameFieldTitle.getText()).to.eql(
      'ENVIRONMENT NAME'
    )
    expect(EnvironmentCreate.envNameField.isVisible()).to.eql(true)
    var placeHolderText = EnvironmentCreate.envNameField.getAttribute(
      'placeholder'
    )
    expect(placeHolderText).to.eql('Enter a name for your environment')
    expect(EnvironmentCreate.addEnvCancelBtn.isVisible()).to.eql(true)
    expect(EnvironmentCreate.addNewEnvBtn.isVisible()).to.eql(true)
    EnvironmentCreate.addEnvCancelBtn.click()
    EnvironmentList.addEnv.waitForVisible()
  })

  it('should navigate user to edit page of environment, when user is on Env List page and click on `Edit` button through "..." dropdown next to Deploy button', () => {
    EnvironmentList.getCardDropDownInEnvList(0).click()
    EnvironmentList.getEditOptionInCardDropDown(0).waitForVisible()
    EnvironmentList.getEditOptionInCardDropDown(0).click()
    EnvironmentManage.form.waitForVisible()
  })

  it('should display `save changes` button as disabled, when user navigates to edit page of environment', () => {
    expect(browser.isEnabled('button.button.default')).to.eql(false)
  })

  it('should display title, subtitle, body, environment name input field and Non-editable text fields for Client ID and Secret Key, when user is in `edit` page of environment', () => {
    EnvironmentManage.envTitle.waitForVisible()
    expect(EnvironmentManage.envTitle.isVisible()).to.eql(true)
    expect(EnvironmentManage.envSubtitle.getText()).to.eql('Basic Info')
    expect(EnvironmentManage.envBody.getText()).to.eql(
      'Set the name and get the Client ID and Secret Key for this environment'
    )
    expect(EnvironmentManage.name.input.isVisible()).to.eql(true)
    expect(EnvironmentManage.clientIdFieldColumn.isVisible()).to.eql(true)
    expect(EnvironmentManage.clientIdFieldTitle.getText()).to.eql('client id')
    expect(EnvironmentManage.secretKeyFieldColumn.isVisible()).to.eql(true)
    expect(EnvironmentManage.secretKeyFieldTitle.getText()).to.eql('secret key')
  })

  it('should verify client id and secret key are unique and not repeated client id and secret are created for environment', () => {
    // TODO
  })

  it('should verify unique client id and secret key fields are non-editable/disabled in `edit` page of environment', () => {
    expect(EnvironmentManage.clientIdField.isVisible()).to.eql(true)
    expect(EnvironmentManage.secretKeyField.isVisible()).to.eql(true)
  })

  it('should verify data in unique client id and secret key fields matches with client id and secret key of `edit` page url of environment', () => {
    // TODO
  })

  it('should verify whether client ID and secret Key work are use-able to call the application deployed in this environment', () => {
    // TODO
  })

  it('should display `save changes` button as enabled, when user navigates to edit page of environment and make any changes', () => {
    EnvironmentManage.name.input.setValue(testData.Environment.allValidEnvChar)
    expect(browser.isEnabled('button.button.default')).to.eql(true)
  })

  it('should display validation error message, when environment name is less than 3 characters in `edit` page of environment', () => {
    EnvironmentManage.name.input.setValue(
      testData.Environment.invalidEnvThreeChar
    )
    browser.keys('Tab')
    EnvironmentManage.name.error.waitForVisible()
    expect(EnvironmentManage.name.error.getText()).to.eql(
      'Must be 3 characters or more'
    )
  })

  it('should display validation error message, when environment name is more than 35 characters in `edit` page of environment', () => {
    EnvironmentManage.name.input.setValue(
      testData.Environment.invalidEnvThirtyFiveChar
    )
    EnvironmentManage.name.error.waitForVisible()
    expect(EnvironmentManage.name.error.getText()).to.eql(
      'Must be 35 characters or less'
    )
  })

  it('should not display validation error message, when valid characters are used in `edit page of environment', () => {
    EnvironmentManage.name.input.setValue(testData.Environment.allValidEnvChar)
    expect(EnvironmentManage.name.error.isVisible()).to.eql(false)
  })

  it('should do validation on first submission, when user enters invalid characters in environment name field and click save changes in `edit` page of environment', () => {
    EnvironmentManage.name.input.setValue(
      testData.Environment.invalidEnvThreeChar
    )
    EnvironmentManage.submitGlobal()
    EnvironmentManage.name.error.waitForVisible()
    expect(EnvironmentManage.name.error.getText()).to.eql(
      'Must be 3 characters or more'
    )

    EnvironmentManage.name.input.setValue(testData.Environment.allValidEnvChar)
    expect(EnvironmentManage.name.error.isVisible()).to.eql(false)
    EnvironmentManage.submitGlobal()

    EnvironmentManage.name.input.setValue(
      testData.Environment.invalidEnvThirtyFiveChar
    )
    EnvironmentManage.submitGlobal()
    EnvironmentManage.name.error.waitForVisible()
    expect(EnvironmentManage.name.error.getText()).to.eql(
      'Must be 35 characters or less'
    )

    EnvironmentManage.name.input.setValue(
      testData.Environment.invalidEnvCapitals
    )
    EnvironmentManage.submitGlobal()
    expect(EnvironmentManage.name.error.getText()).to.eql(
      'Only lowercase characters and digits are allowed'
    )

    EnvironmentManage.name.input.setValue(testData.Environment.allValidEnvChar)
    expect(EnvironmentManage.name.error.isVisible()).to.eql(false)
    EnvironmentManage.submitGlobal()
  })

  it('should reflect environment changes made in `edit` page of environment, where ever environment is displayed', () => {
    EnvironmentManage.envTitle.waitForVisible()
    expect(EnvironmentManage.envTitle.getText()).to.eql(
      testData.Environment.allValidEnvChar
    )
    EnvironmentManage.envListFromBreadCrumb.click()
    EnvironmentManage.envList.waitForVisible()
    //Below validation  will fail because it's a bug, Environment name doesn't change
    expect(EnvironmentManage.getenvNameFromList(1).getText()).to.eql(
      testData.Environment.allValidEnvChar
    )
    EnvironmentManage.geteditEnvBtn(1).click()
    EnvironmentManage.envTitle.waitForVisible()
    expect(EnvironmentManage.envTitle.getText().toUpperCase()).to.eql(
      testData.Environment.allValidEnvChar
    )
    EnvironmentManage.submitGlobal()
  })

  // it('should display validaton error message, when environment is duplicated through `edit` page of environment', () => {
  // TODO
  // })
})

describe('Environment - Environment List Page Overall', () => {
  it('should display environments in list per the applications they are created for, regardless of whether they currently have a version deployed in them or not', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppCreate.open(ws)
    KintoAppCreate.form.waitForVisible()
    KintoAppCreate.name.input.setValue(testData.kintoapp.validKintoAppNameDigit)
    KintoAppCreate.submitGlobal()
    KintoAppCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescription
    )
    KintoAppCreate.submitGlobal()
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getkaListDropDown(0).click()
    KintoAppList.kaListDropDown.waitForVisible()
    KintoAppList.kaAppListViewEnv.click()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.addEnv.click()
    EnvironmentCreate.envNameField.setValue(
      testData.Environment.allValidEnvChar
    )
    EnvironmentCreate.addNewEnvBtn.click()
    EnvironmentList.envList.waitForVisible()
    expect(EnvironmentList.kaFromEnvListBreadcrumb.getText()).to.eql(
      testData.kintoapp.validKintoAppNameDigit
    )
  })

  it('should navigate user to `environment list` page, when user clicks on `view environments` from `...` dropdown option of existing KA list card', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppList.open(ws)
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getkaListDropDown(0).waitForVisible()
    KintoAppList.getkaListDropDown(0).click()
    KintoAppList.kaListDropDown.waitForVisible()
    KintoAppList.kaAppListViewEnv.click()
    EnvironmentList.envList.waitForVisible()
    expect(EnvironmentList.envList.isVisible()).to.eql(true)
  })

  it('should navigate user to `environment list` page, when user click on `view environments` button on top right of the KA manage page', () => {
    EnvironmentList.kaFromEnvListBreadcrumb.waitForVisible()
    EnvironmentList.kaFromEnvListBreadcrumb.click()
    KintoAppManage.form.waitForVisible()
    KintoAppManage.viewEnvironments.click()
    EnvironmentList.envList.waitForVisible()
    expect(EnvironmentList.envList.isVisible()).to.eql(true)
  })

  it('should naviagte user to `environment list` page, when user tag and deploy an environment in existing KA', () => {
    EnvironmentList.kaFromEnvListBreadcrumb.click()
    KintoAppManage.form.waitForVisible()
    KintoAppManage.kaTagNDeploy.click()
    KintoAppManage.majorVersion.click()
    KintoAppManage.majorVersion.setValue('1')
    KintoAppManage.minorVersion.setValue('2')
    KintoAppManage.revision.setValue('4')
    KintoAppManage.notes.click()
    KintoAppManage.createTagBtn.click()
    KintoAppManage.envList.waitForVisible()
    KintoAppManage.successDeployMsg.waitForVisible()
    expect(EnvironmentList.envList.isVisible()).to.eql(true)
  })

  it('should navigate user to `environment list` page, when user click on `Environments` from `breadcrumb` in edit page of environment', () => {
    EnvironmentManage.geteditEnvBtn(1).click()
    EnvironmentManage.form.waitForVisible()
    EnvironmentManage.envListFromBreadCrumb.click()
    expect(EnvironmentList.envList.isVisible()).to.eql(true)
  })
})
