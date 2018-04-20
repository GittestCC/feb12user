import { expect } from 'chai'
import Login from '../page-objects/login.page'
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
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppCreate.open(ws)
    KintoAppCreate.form.waitForVisible()
    KintoAppCreate.name.input.setValue(testData.kintoapp.validKintoAppName)
    KintoAppCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescription
    )
    KintoAppCreate.name.input.click()
    browser.pause(2000)
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

  it('should navigate to `edit` page of any environment, when user enters url of edit page of any environment in the browser', () => {
    var url = EnvironmentManage.getUrl().split('/')
    var ws = url[3]
    var kintoAppId = url[5]
    var envId = url[7]
    var envName = EnvironmentManage.envTitle.getText()
    EnvironmentManage.envListFromBreadCrumb.click()
    EnvironmentList.envList.waitForVisible()
    browser.url(
      `http://localhost:5001/app/dashboard/${ws}/kintoapps/${kintoAppId}/environment/${envId}/edit`
    )
    EnvironmentManage.form.waitForVisible()
    expect(EnvironmentManage.form.isVisible()).to.equal(true)
    EnvironmentManage.envTitle.waitForVisible()
    expect(EnvironmentManage.getUrl()).to.eql(
      `/app/dashboard/${ws}/kintoapps/${kintoAppId}/environment/${envId}/edit`
    )
    expect(envName).to.eql(EnvironmentManage.envTitle.getText())
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

  //  it('should verify client id and secret key are unique and not repeated client id and secret are created for environment', () => {
  //    // TODO Not implemented
  //  })
  //
  it('should verify unique client id and secret key fields are non-editable/disabled in `edit` page of environment', () => {
    expect(EnvironmentManage.clientIdField.isVisible()).to.eql(true)
    expect(EnvironmentManage.secretKeyField.isVisible()).to.eql(true)
  })
  //
  //  it('should verify data in unique client id and secret key fields matches with client id and secret key of `edit` page url of environment', () => {
  //    // TODO Not implemented
  //  })
  //
  //  it('should verify whether client ID and secret Key work are use-able to call the application deployed in this environment', () => {
  //    // TODO Not implemented
  //  })
  it('should display validation error message, when user duplicates environment in same KA', () => {
    EnvironmentManage.envListFromBreadCrumb.click()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.addEnv.click()
    EnvironmentCreate.addEnvPopUp.waitForVisible()
    EnvironmentCreate.envNameField.setValue(
      testData.Environment.validEnvNameInAlphaNumeric
    )
    EnvironmentCreate.addNewEnvBtn.click()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.addEnv.click()
    EnvironmentCreate.addEnvPopUp.waitForVisible()
    EnvironmentCreate.envNameField.setValue(
      testData.Environment.validEnvNameInAlphaNumeric
    )
    EnvironmentCreate.addNewEnvBtn.click()
    EnvironmentList.envList.waitForVisible()
    //TODO Validation error message steps
    //For now there is no validation error message is displayed
  })

  it('should navigate user to `edit` page of environment, when existing environment is clicked from the breadcrumb', () => {
    EnvironmentList.addEnv.click()
    EnvironmentCreate.envNameField.setValue(
      testData.Environment.validEnvNameWithNumbers
    )
    EnvironmentCreate.addNewEnvBtn.click()
    EnvironmentList.envList.waitForVisible()
    EnvironmentManage.geteditEnvBtn(1).click()
    EnvironmentManage.form.waitForVisible()
    EnvironmentManage.breadcrumbEnv.click()
    EnvironmentManage.breadcrumbEnvDropDown.waitForVisible()
    var envName1 = EnvironmentManage.getbreadCrumbEnvText(2).getText()
    var envName2 = EnvironmentManage.getbreadCrumbEnvText(3).getText()
    EnvironmentManage.getbreadCrumbEnv(2).click()
    EnvironmentManage.form.waitForVisible()
    expect(EnvironmentManage.envTitle.getText()).to.eql(envName1)
    EnvironmentManage.breadcrumbEnv.click()
    EnvironmentManage.breadcrumbEnvDropDown.waitForVisible()
    EnvironmentManage.getbreadCrumbEnv(3).click()
    EnvironmentManage.form.waitForVisible()
    expect(EnvironmentManage.envTitle.getText()).to.eql(envName2)
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

  it('should display `save changes` button as disabled, when user edits any fields in page and save the changes', () => {
    expect(EnvironmentManage.envSaveBtn.isEnabled()).to.eql(false)
    EnvironmentManage.name.input.setValue(testData.Environment.allValidEnvChar)
    expect(EnvironmentManage.envSaveBtn.isEnabled()).to.eql(true)
    EnvironmentManage.submitGlobal()
    expect(EnvironmentManage.envSaveBtn.isEnabled()).to.eql(false)
  })

  /* it('should reflect environment changes made in `edit` page of environment, where ever environment is displayed', () => {
    EnvironmentManage.name.input.setValue(testData.Environment.allValidEnvChar)
    EnvironmentManage.submitGlobal()
    EnvironmentManage.envTitle.waitForVisible()
    expect(EnvironmentManage.envTitle.isVisible()).to.eql(true)
    expect(EnvironmentManage.envTitle.getText()).to.eql(
      testData.Environment.allValidEnvChar
    )
    
//    expect(EnvironmentManage.name.input.getText()).to.eql(
//      testData.Environment.allValidEnvChar
//    )
    expect(EnvironmentManage.envNameFromBreadcrumb.getText()).to.eql(
      testData.Environment.allValidEnvChar
    )
    EnvironmentManage.breadcrumbEnv.click()
    EnvironmentManage.breadcrumbEnvDropDown.waitForVisible()
    expect(EnvironmentManage.getbreadCrumbEnvText(3).getText()).to.eql(
      testData.Environment.allValidEnvChar
    )
    EnvironmentManage.envListFromBreadCrumb.click()
    EnvironmentManage.envList.waitForVisible()
    //Below validation  will fail because it's a bug, Environment name doesn't change
    expect(EnvironmentList.getEnvCardTitle(3).getText()).to.eql(
      testData.Environment.allValidEnvChar
    )
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppList.open(ws)
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getCard(0).click()
    KintoAppManage.form.waitForVisible()
    KintoAppManage.kaTagNDeploy.click()
    KintoAppManage.tagNDeployDropDownField.waitForVisible()
    KintoAppManage.getTagNDeployDropDown(3)
    KintoAppManage.majorVersion.click()
    KintoAppManage.majorVersion.setValue('1')
    KintoAppManage.minorVersion.setValue('2')
    KintoAppManage.revision.setValue('3')
    KintoAppManage.notes.click()
    KintoAppManage.createTagBtn.click()
    KintoAppManage.envList.waitForVisible()
    KintoAppList.open(ws)
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getkaListDropDown(0).waitForVisible()
    KintoAppList.getkaListDropDown(0).click()
    KintoAppList.kaListDropDown.waitForVisible()
    KintoAppList.kaListDropDownViewTags.click()
    KintoAppList.envTagsInKaListPage.waitForVisible()
    expect(KintoAppList.getEnvTagNameFromKaListDropDown(3).getText()).to.eql(
      testData.Environment.allValidEnvChar
    )
    expect(KintoAppList.getEnvNameFromKaCardList(0, 1).getText()).to.eql(
      testData.Environment.allValidEnvChar
    )
    KintoAppList.getCard(0).waitForVisible()
    KintoAppList.getCard(0).click()
    KintoAppManage.waitForVisible()
    KintoAppManage.kaTagNDeploy.click()
    KintoAppManage.tagDeployModal.waitForVisible()
    expect(KintoAppManage.gettagNDeployDropDown(3).getText()).to.eql(
      testData.Environment.allValidEnvChar
    )
  })*/
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
    KintoAppList.getkaListDropDown(1).click()
    KintoAppList.kaListDropDown.waitForVisible()
    KintoAppList.kaAppListViewEnv.click()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.addEnv.click()
    EnvironmentCreate.envNameField.waitForVisible()
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
    KintoAppList.getkaListDropDown(1).waitForVisible()
    KintoAppList.getkaListDropDown(1).click()
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
    expect(EnvironmentList.envList.isVisible()).to.eql(true)
  })

  it('should display expand button on any environment cards only if they have a build deployed and some steps to display', () => {
    EnvironmentList.addEnv.click()
    EnvironmentCreate.addEnvPopUp.waitForVisible()
    EnvironmentCreate.envNameField.setValue(
      testData.Environment.validEnvNameTen
    )
    EnvironmentCreate.addNewEnvBtn.click()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.getEnvCardDeployBtn(1).click()
    EnvironmentList.deployPopUp.waitForVisible()
    EnvironmentList.getselectDelpoyVer(1)
    EnvironmentList.deployBtn.click()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.getEnvCardDeploySuccess(1).waitForVisible()
    expect(EnvironmentList.getEnvCardDeploySuccess(1).isVisible()).to.eql(true)
    expect(EnvironmentList.getEnvCardExpandText(1).getText()).to.eql('Expand')
  })

  it('should not display `expand` button for any environment card, if there is no deployment is done for environment', () => {
    //as some environment creation are commented changing index number 2/3/18
    expect(EnvironmentList.getEnvCardDeploySuccess(2).isVisible()).to.eql(false)
    expect(EnvironmentList.getEnvCardExpandText(2).isVisible()).to.eql(false)
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
    EnvironmentList.envList.waitForVisible()
    expect(EnvironmentList.envList.isVisible()).to.eql(true)
  })

  it('should display title, subtitle and `add new environment` button in enironment list page', () => {
    EnvironmentList.addEnv.click()
    EnvironmentCreate.addEnvPopUp.waitForVisible()
    expect(EnvironmentCreate.addEnvPopUpTitle.getText()).to.eql(
      'Add New Environment'
    )
    expect(EnvironmentCreate.addEnvNameFieldTitle.getText()).to.eql(
      'ENVIRONMENT NAME'
    )
    expect(EnvironmentCreate.envNameField.isVisible()).to.eql(true)
    var PH = EnvironmentCreate.envNameField.getAttribute('placeholder')
    expect(PH).to.eql('Enter a name for your environment')
    expect(EnvironmentCreate.addEnvCancelBtn.isVisible()).to.eql(true)
    expect(EnvironmentCreate.addNewEnvBtn.isVisible()).to.eql(true)
  })

  it('should re-order environment cards in the environment list page using the top-left handle on each of environment card', () => {
    //uncommented this dragNdrop test script 2/3/18
    EnvironmentCreate.envNameField.setValue(
      testData.Environment.validEnvNameTen
    )
    EnvironmentCreate.addNewEnvBtn.click()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.dragAndDrop(
      EnvironmentList.getEnvCardTopLeftHandle(1),
      EnvironmentList.getEnvCardTopLeftHandle(2)
    )
  })

  it('should re-order environments cards in the environment list page, whether it`s in regardless of collapsed state/expanded state of the card', () => {
    EnvironmentList.getExpandEnvDeploys(1).click()
    expect(EnvironmentList.getEnvCardCollapseText(1).getText()).to.eql(
      'Collapse'
    )
    EnvironmentList.dragAndDrop(
      EnvironmentList.getEnvCardTopLeftHandle(1),
      EnvironmentList.getEnvCardTopLeftHandle(2)
    )
  })

  it('should auto-save order of environment list, when user adds new environment or re-orders environment cards', () => {
    EnvironmentList.dragAndDrop(
      EnvironmentList.getEnvCardTopLeftHandle(1),
      EnvironmentList.getEnvCardTopLeftHandle(2)
    )
    var env1CardTitle = EnvironmentList.getEnvCardTitle(1).getText()
    var env2CardTitle = EnvironmentList.getEnvCardTitle(2).getText()
    browser.reload()
    expect(env1CardTitle).to.eql(EnvironmentList.getEnvCardTitle(1).getText())
    expect(env2CardTitle).to.eql(EnvironmentList.getEnvCardTitle(2).getText())
  })

  it('should change `expand` to `collapse` button, when user clicks on `expand` button to view deployments', () => {
    expect(EnvironmentList.getEnvCardExpandText(1).getText()).to.eql('Expand')
    EnvironmentList.getExpandEnvDeploys(1).click()
    expect(EnvironmentList.getEnvCardExpandText(1).getText()).to.eql('Collapse')
  })

  it('should display clickable text links for `change log` and `view logs` pages, when user clicks on expand button for environment card', () => {
    expect(EnvironmentList.envCardCompareVersions.getText()).to.eql(
      'Compare Versions'
    )
    expect(EnvironmentList.envCardViewLogs.getText()).to.eql('View Logs')
  })

  //  it('should navigate user to `environment list` page, when user click on `Environments` from `breadcrumb` in view logs page of environment', () => {
  //    EnvironmentList.getenvCardViewLogs(1).click()
  //    EnvironmentList.envListFromViewLogs.waitForVisible()
  //    EnvironmentList.envListFromViewLogs.click()
  //    //Will fail for a bug
  //    EnvironmentList.envList.waitForVisible()
  //    expect(EnvironmentList.envList.isVisible()).to.eql(true)
  //  })
})

describe('Environment - Environment List Cards', () => {
  it('should display environment title of environment card as per environment created', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppCreate.open(ws)
    KintoAppCreate.form.waitForVisible()
    KintoAppCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescription
    )
    KintoAppCreate.name.input.setValue(testData.kintoapp.validKintoAppName)
    KintoAppCreate.name.input.leftClick()
    KintoAppCreate.submitGlobal()
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getCard(2).waitForVisible()
    KintoAppList.getCard(2).click()
    KintoAppManage.form.waitForVisible()
    KintoAppManage.viewEnvironments.click()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.addEnv.click()
    EnvironmentCreate.addEnvPopUp.waitForVisible()
    EnvironmentCreate.envNameField.setValue(
      testData.Environment.validEnvNameInAlphaNumeric
    )
    EnvironmentCreate.addNewEnvBtn.click()
    EnvironmentList.envList.waitForVisible()
    //added wait statement
    EnvironmentList.kaFromEnvListBreadcrumb.waitForVisible()
    expect(EnvironmentList.kaFromEnvListBreadcrumb.getText()).to.eql(
      testData.kintoapp.validKintoAppName
    )
    //added wait statement
    EnvironmentList.getEnvCardTitle(2).waitForVisible()
    expect(
      EnvironmentList.getEnvCardTitle(2)
        .getText()
        .toLowerCase()
    ).to.eql(testData.Environment.validEnvNameInAlphaNumeric)
  })

  it('should match the title of environment card with title in `edit` page of concerned environment, when user navigates to `edit` page of environment', () => {
    //added wait statement
    EnvironmentManage.envTitle.waitForVisible()
    var envCardTitle = EnvironmentList.getEnvCardTitle(2).getText()
    EnvironmentManage.geteditEnvBtn(2).click()
    EnvironmentManage.form.waitForVisible()
    //added wait statement
    EnvironmentManage.envTitle.waitForVisible()
    //below validation will fail as it's a bug
    expect(envCardTitle).to.eql(EnvironmentManage.envTitle.getText())
  })

  it('should display handle on top left of any environment card, when environment card is in collapsed/expanded state', () => {
    //added wait statement
    EnvironmentManage.envListFromBreadCrumb.waitForVisible()
    EnvironmentManage.envListFromBreadCrumb.click()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.getEnvCardDeployBtn(1).click()
    EnvironmentList.deployPopUp.waitForVisible()
    EnvironmentList.deployBtn.click()
    EnvironmentList.envList.waitForVisible()
    //collapsed state
    //added wait statement
    EnvironmentList.getEnvCardExpandText(1).waitForVisible()
    expect(EnvironmentList.getEnvCardExpandText(1).getText()).to.eql('Expand')
    expect(EnvironmentList.getEnvCardTopLeftHandle(1).isVisible()).to.eql(true)
    //expanded state
    EnvironmentList.getExpandEnvDeploys(1).click()
    //added wait statement
    EnvironmentList.getEnvCardCollapseText(1).waitForVisible()
    expect(EnvironmentList.getEnvCardCollapseText(1).getText()).to.eql(
      'Collapse'
    )
    expect(EnvironmentList.getEnvCardTopLeftHandle(1).isVisible()).to.eql(true)
  })

  it('should display title of environment card regardless whether it is in collapsed/expanded state', () => {
    // As environment card is already in expanded state
    EnvironmentList.getEnvCardCollapseText(1).waitForVisible()
    expect(EnvironmentList.getEnvCardCollapseText(1).getText()).to.eql(
      'Collapse'
    )
    expect(EnvironmentList.getEnvCardTitle(1).isVisible()).to.eql(true)
    // collapsed state
    EnvironmentList.getExpandEnvDeploys(1).click()
    //added wait statement
    EnvironmentList.getEnvCardCollapseText(1).waitForVisible()
    expect(EnvironmentList.getEnvCardExpandText(1).getText()).to.eql('Expand')
    expect(EnvironmentList.getEnvCardTitle(1).isVisible()).to.eql(true)
  })

  it('should display status(success) and current version number of any environment, when environment build is deployed regardless of environment card is in collasped/expanded state', () => {
    EnvironmentList.getEnvCardDeployBtn(2).waitForVisible()
    EnvironmentList.getEnvCardDeployBtn(2).click()
    EnvironmentList.deployPopUp.waitForVisible()
    var deployVer = EnvironmentList.getselectDelpoyVer(1).getText()
    EnvironmentList.getselectDelpoyVer(1)
    EnvironmentList.deployBtn.click()
    EnvironmentList.envList.waitForVisible()
    //collapsed state
    //added wait statement
    EnvironmentList.getEnvCardDeploySuccess(2).waitForVisible()
    expect(EnvironmentList.getEnvCardDeploySuccess(2).getText()).to.eql(
      'SUCCESS'
    )
    expect(EnvironmentList.getenvCardVerNumber(2).getText()).to.eql(deployVer)
    // expanded state
    EnvironmentList.getExpandEnvDeploys(2).click()
    EnvironmentList.getEnvCardDeploySuccess(2).waitForVisible()
    expect(EnvironmentList.getEnvCardDeploySuccess(2).getText()).to.eql(
      'SUCCESS'
    )
    expect(EnvironmentList.getenvCardVerNumber(2).getText()).to.eql(deployVer)
  })

  it('should display status(No build Deployed) for any environment if there is no deployment is done', () => {
    EnvironmentList.addEnv.click()
    EnvironmentCreate.addEnvPopUp.waitForVisible()
    EnvironmentCreate.envNameField.setValue(testData.Environment.validEnvName)
    EnvironmentCreate.addNewEnvBtn.click()
    EnvironmentList.envList.waitForVisible()
    //added wait statements
    EnvironmentList.getEnvNoDeployText(3).waitForVisible()
    expect(EnvironmentList.getEnvNoDeployText(3).getText()).to.eql(
      'No build deployed.'
    )
  })

  it('should display `Hit the deploy button to choose a build` text in environment card if there is no deployment is done, whether environment card is in collasped/expanded state', () => {
    expect(EnvironmentList.getEnvNoDeploySubText(3).getText()).to.eql(
      'Hit the deploy button to choose a build.'
    )
  })

  it('should display `edit` button for any environment card, whether environment card is in collasped/expanded state', () => {
    //collapsed state
    // added wait statement
    EnvironmentList.getEnvCardExpandText(1).waitForVisible()
    expect(EnvironmentList.getEnvCardExpandText(1).getText()).to.eql('Expand')
    expect(EnvironmentList.getEditEnv(1).getText()).to.eql('Edit')
    EnvironmentList.getExpandEnvDeploys(1).click()
    //expanded state
    //added wait statement
    EnvironmentList.getEnvCardCollapseText(1).waitForVisible()
    expect(EnvironmentList.getEnvCardCollapseText(1).getText()).to.eql(
      'Collapse'
    )
    expect(EnvironmentList.getEditEnv(1).getText()).to.eql('Edit')
  })

  it('should display `deploy` button for any environment card if there is no deployment done', () => {
    expect(EnvironmentList.getEnvCardDeployBtn(3).getText()).to.eql('Deploy')
  })

  it('should display `deploy Another version` button for any environment card if there is deployment done', () => {
    expect(EnvironmentList.getEnvCardDeployBtn(2).getText()).to.eql(
      'Deploy Another Version'
    )
  })

  //  /*
  //  it('should display `cancel deployment` button in environment card if deployment is in progress, when environment is in collapsed/expanded state', () => {
  //    // TODO cancel deployment is not visible as deployment happens in a blink
  //  })*/
  //
  it('should display Shut Down and Edit Environment buttons clicking on (...) drop down button in any environment card, when environment card is in collapsed/expanded state', () => {
    // Already in expanded state
    //added wait
    EnvironmentList.getEnvCardCollapseText(1).waitForVisible()
    expect(EnvironmentList.getEnvCardCollapseText(1).getText()).to.eql(
      'Collapse'
    )
    EnvironmentList.getCardDropDownInEnvList(0).click()
    EnvironmentList.envCardDropDown.waitForVisible()
    expect(EnvironmentList.getenvCardShutDownBtn(0).isVisible()).to.eql(true)
    expect(EnvironmentList.getEditOptionInCardDropDown(0).isVisible()).to.eql(
      true
    )
    EnvironmentList.getExpandEnvDeploys(1).click()
    //collapsed state
    EnvironmentList.getEnvCardExpandText(1).waitForVisible()
    expect(EnvironmentList.getEnvCardExpandText(1).getText()).to.eql('Expand')
    EnvironmentList.getCardDropDownInEnvList(0).click()
    EnvironmentList.envCardDropDown.waitForVisible()
    expect(EnvironmentList.getenvCardShutDownBtn(0).isVisible()).to.eql(true)
    expect(EnvironmentList.getEditOptionInCardDropDown(0).isVisible()).to.eql(
      true
    )
  })
  //
  //  /*it('should display date of current deployment of any environment if deployment is made, regardless whether environment card is in collapse/expand state', () => {
  //    // TODO
  //  })
  //
  //  it('should not change date of previous deployments, when new deployment is done for any environment', () => {
  //    // TODO
  //  })
  //
  //  it('should display shutdown status for any environment if build is been shutdown, whether environment card is in collapsed/expanded state', () => {
  //    // TODO Not implemented
  //  })
  //
  //  it('should display different states and time of deployment steps of current as well as past deployments in anti-chronlogical way, when environment card is expanded', () => {
  //    // TODO
  //  })
  //*/
  it('should display deploying, success, failed and testing according to deployment progress of any environment card', () => {
    //Already in collapsed state
    EnvironmentList.getExpandEnvDeploys(1).click()
    //expanded state
    EnvironmentList.getEnvCardDeploySuccess(1).waitForVisible()
    expect(EnvironmentList.getEnvCardDeploySuccess(1).getText()).to.eql(
      'SUCCESS'
    )
    EnvironmentList.getEnvCardDeployAnotherVersion(1).click()
    EnvironmentList.deployPopUp.waitForVisible()
    EnvironmentList.getselectDelpoyVer(1)
    EnvironmentList.deployBtn.click()
    EnvironmentList.envList.waitForVisible()
    expect(EnvironmentList.getIntermediateDeployProgress(1).getText()).to.eql(
      'DEPLOYING'
    )
    //For now status failed and testing not implemented
  })
  //
  //  /* it('should display final state of deployment in solid color and intermediate deploying progress states in border color', () => {
  //    //  TODO
  //  })*/
  //
  it('should display `compare version` link for any deployment version of any environment card, when environment card is in expanded state', () => {
    expect(EnvironmentList.envCardCompareVersions.getText()).to.eql(
      'Compare versions'
    )
  })

  it('should display `view logs` link for any deployment version of any environment card, when environment card is in expanded state', () => {
    expect(EnvironmentList.getEnvViewLogs(1).getText()).to.eql('View Logs')
  })

  it('should display `rollback to this build` button for past successful deployment build of any environment, when environment card is in expanded state', () => {
    expect(EnvironmentList.envCardDeployRollbackBtn.getText()).to.eql(
      'Rollback to this build'
    )
  })

  //  //it('should display `roll back to this build` button as greyed out if deployment is failed for any environment, when environment card is expanded', () => {
  //  // TODO Not implemented
  //  //})
  //
  it('should display `deploy pop up`, when `deploy` button in environment card is clicked  if no deployment is done', () => {
    expect(EnvironmentList.getEnvNoDeployText(3).getText()).to.eql(
      'No build deployed.'
    )
    expect(EnvironmentList.getEnvCardDeployBtn(3).getText()).to.eql('Deploy')
    EnvironmentList.getEnvCardDeployBtn(3).click()
    EnvironmentList.deployPopUp.waitForVisible()
    expect(EnvironmentList.deployPopUp.isVisible()).to.eql(true)
  })

  it('should display `deploy pop up`, when `deploy another version` button in environment card is clicked, when environment card is in collasped state', () => {
    //Already in collapsed state
    EnvironmentList.deployCancelBtn.click()
    expect(EnvironmentList.getEnvCardDeploySuccess(2).getText()).to.eql(
      'SUCCESS'
    )
    EnvironmentList.getEnvCardDeployAnotherVersion(2).waitForVisible()
    expect(EnvironmentList.getEnvCardDeployAnotherVersion(2).getText()).to.eql(
      'Deploy Another Version'
    )
    EnvironmentList.getEnvCardDeployAnotherVersion(2).click()
    EnvironmentList.deployPopUp.waitForVisible()
    expect(EnvironmentList.deployPopUp.isVisible()).to.eql(true)
  })

  // it('should cancel current deployment progress, when user clicks on `cancel deployment` button for any environment', () => {
  //   //  TODO For now cancel is not possible as deployment happens in a blink
  // })

  it('should display `shutdown pop up`, when user clicks `shutdown` button through `...` dropdown present for environment card, when in environment card is in collasped state', () => {
    //Already in collapsed state
    EnvironmentList.deployBtn.click()
    EnvironmentList.getCardDropDownInEnvList(0).click()
    EnvironmentList.envCardDropDown.waitForVisible()
    EnvironmentList.getenvCardShutDownBtn(0).click()
    EnvironmentList.envDeployShutDownPopUp.waitForVisible()
    expect(EnvironmentList.envDeployShutDownPopUp.isVisible()).to.eql(true)
  })

  it('should navigate user to `logs` page of concerned environment build, when user clicks `view logs` for any environment build', () => {
    //Clicks on view logs btn of 2nd environment in expanded state
    EnvironmentList.shutDownPopUpCancelBtn.click()
    EnvironmentList.getExpandEnvDeploys(2).waitForVisible()
    EnvironmentList.getExpandEnvDeploys(2).click()
    EnvironmentList.getEnvViewLogs(1).waitForVisible()
    EnvironmentList.getEnvViewLogs(1).click()
    EnvironmentList.envBuildViewLogsPageTitle.waitForVisible()
    expect(EnvironmentList.envBuildViewLogsPageTitle.getText()).to.eql('LOGS')
  })

  it('should display `deploy pop up`, when user clicks on `rollback to this build` for any environment', () => {
    // Clicks on roll back to this version of 1st environment in expanded state
    EnvironmentList.kaFromEnvListBreadcrumb.click()
    KintoAppManage.form.waitForVisible()
    KintoAppManage.viewEnvironments.click()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.getExpandEnvDeploys(1).click()
    EnvironmentList.envCardDeployRollbackBtn.click()
    EnvironmentList.deployPopUp.waitForVisible()
    expect(EnvironmentList.deployPopUp.isVisible()).to.eql(true)
  })

  it('should not reflect any changes to existing environment build versions, when an environment is deployed', () => {
    EnvironmentList.deployCancelBtn.click()
    EnvironmentList.envList.waitForVisible()
    var envVersion = EnvironmentList.getenvCardVerNumber(1).getText()
    EnvironmentList.kaFromEnvListBreadcrumb.click()
    KintoAppManage.form.waitForVisible()
    KintoAppManage.kaTagNDeploy.click()
    KintoAppManage.majorVersion.click()
    KintoAppManage.majorVersion.setValue('5')
    KintoAppManage.minorVersion.setValue('7')
    KintoAppManage.revision.setValue('9')
    KintoAppManage.createTagBtn.click()
    EnvironmentList.envList.waitForVisible()
    //below validation will fail as it's a bug
    EnvironmentList.getenvCardVerNumber(1).waitForVisible()
    expect(envVersion).to.eq(EnvironmentList.getenvCardVerNumber(1).getText())
  })
})

describe('Environment - Easy add pop up', () => {
  it('should display `add new environment` pop up, when user clicks on `...` next to environment name present in breadcrumb of edit page environment', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppCreate.open(ws)
    KintoAppCreate.form.waitForVisible()
    KintoAppCreate.name.input.setValue(testData.kintoapp.validKintoAppName)
    KintoAppCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescription
    )
    KintoAppCreate.submitGlobal()
    KintoAppList.mykintoAppList.waitForVisible()
    //changed index 3 to 2 as env list cards were commented
    KintoAppList.getCard(2).waitForVisible()
    KintoAppList.getCard(2).click()
    KintoAppManage.form.waitForVisible()
    KintoAppManage.viewEnvironments.click()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.getEditEnv(1).click()
    EnvironmentManage.form.waitForVisible()
    EnvironmentManage.breadcrumbEnv.click()
    EnvironmentManage.breadcrumbEnvDropDown.waitForVisible()
    EnvironmentManage.addNewEnv.waitForVisible()
    EnvironmentManage.addNewEnv.click()
    EnvironmentCreate.addEnvPopUp.waitForVisible()
    expect(EnvironmentCreate.addEnvPopUp.isVisible()).to.eql(true)
  })

  it('should navigate user to environment list, when user clicks on `cancel` button of `add new environment` pop up', () => {
    EnvironmentCreate.addEnvCancelBtn.click()
    EnvironmentManage.envListFromBreadCrumb.click()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.addEnv.click()
    EnvironmentCreate.addEnvPopUp.waitForVisible()
    EnvironmentCreate.addEnvCancelBtn.click()
    expect(EnvironmentList.envList.isVisible()).to.eql(true)
  })

  it('should navigate user to environment list page and display `no build deployed` for new environment card, when clicks `add new environment` button', () => {
    EnvironmentList.addEnv.click()
    EnvironmentCreate.addEnvPopUp.waitForVisible()
    EnvironmentCreate.envNameField.setValue(
      testData.Environment.validEnvNameInAlphaNumeric
    )
    EnvironmentCreate.addNewEnvBtn.click()
    EnvironmentList.envList.waitForVisible()
    expect(EnvironmentList.envList.isVisible()).to.eql(true)
    EnvironmentList.getEnvNoDeployText(2).waitForVisible()
    expect(EnvironmentList.getEnvNoDeployText(2).getText()).to.eql(
      'No build deployed.'
    )
  })
})

describe('Environment - Shutdown', () => {
  it('should display `shutdown` pop up, when `shutdown` button is clicked through `...` drop down button present for any environment card', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppCreate.open(ws)
    KintoAppCreate.form.waitForVisible()
    KintoAppCreate.name.input.setValue(testData.kintoapp.validKANamewithDot)
    KintoAppCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescription
    )
    KintoAppCreate.submitGlobal()
    KintoAppList.mykintoAppList.waitForVisible()
    //changed index 4 to 3 as env list cards were commented
    KintoAppList.getCard(3).waitForVisible()
    KintoAppList.getCard(3).click()
    KintoAppManage.form.waitForVisible()
    KintoAppManage.viewEnvironments.click()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.getEnvCardDeployBtn(1).click()
    EnvironmentList.deployPopUp.waitForVisible()
    EnvironmentList.deployBtn.click()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.getCardDropDownInEnvList(0).click()
    EnvironmentList.envCardDropDown.waitForVisible()
    EnvironmentList.getenvCardShutDownBtn(0).click()
    EnvironmentList.envDeployShutDownPopUp.waitForVisible()
    expect(EnvironmentList.envDeployShutDownPopUp.isVisible()).to.eql(true)
  })

  it('should display `shutdown` pop up title and content, when shutdown pop up is triggered', () => {
    EnvironmentList.deployCancelBtn.click()
    EnvironmentList.envList.waitForVisible()
    var envName = EnvironmentList.getEnvCardTitle(1).getText()
    //var envName = EnvironmentList.getEnvCardTitle(1).getText().toLowerCase()
    var versionNum = EnvironmentList.getenvCardVerNumber(1).getText()
    EnvironmentList.getCardDropDownInEnvList(0).click()
    EnvironmentList.envCardDropDown.waitForVisible()
    EnvironmentList.getenvCardShutDownBtn(0).click()
    EnvironmentList.envDeployShutDownPopUp.waitForVisible()
    expect(EnvironmentList.shutDownTitle.getText()).to.eql(
      `Shut Down - ` + envName + ` - ` + versionNum
    )
    expect(EnvironmentList.shutDownContent.getText()).to.eql(
      'The currently deployed application will be stopped, leaving this environment empty. You can deploy another tag directly without shutting down the current one and disrupting your users.'
    )
  })

  it('should display `shutdown anyway` and `cancel` button in shutdown pop up', () => {
    expect(EnvironmentList.shutDownAnywayBtn.isVisible()).to.eql(true)
    expect(EnvironmentList.shutDownPopUpCancelBtn.isVisible()).to.eql(true)
  })

  it('should navigate to environment list page, when `cancel button` in shutdown pop up is clicked', () => {
    EnvironmentList.shutDownPopUpCancelBtn.click()
    EnvironmentList.envList.waitForVisible()
    expect(EnvironmentList.envList.isVisible()).to.eql(true)
  })

  //  it('should shutdown current build, naviagte to environment list page, display environment card empty as `no build deployed and display build status as `shutdown`, When `shutdown anyway` button is clicked', () => {
  //    //  TODO
  //  })
  //
  //  it('should change `deploy another version` button to `deploy` button, when environment is in shutdown state', () => {
  //    // TODO
  //  })
  //
  //  it('should display `shutdown anyway` button as greyed out, when there is deployment done for an environment', () => {
  //    // TODO
  //  })
})

//added on march 07/18
describe('Environment - Simple Deploy Popup', () => {
  //TC_273
  it('should display `simple deploy` pop up, when `deploy` button is clicked for any environment card which is not yet deployed', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppCreate.open(ws)
    KintoAppCreate.form.waitForVisible()
    KintoAppCreate.name.input.setValue(testData.kintoapp.validKintoAppName)
    KintoAppCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescription
    )
    KintoAppCreate.submitGlobal()
    KintoAppList.mykintoAppList.waitForVisible()
    //changed index 5 to 4 as env list cards were commented
    KintoAppList.getCard(4).waitForVisible()
    KintoAppList.getCard(4).click()
    KintoAppManage.form.waitForVisible()
    KintoAppManage.viewEnvironments.click()
    EnvironmentList.envList.waitForVisible()
    expect(EnvironmentList.getEnvCardDeployBtn(1).getText()).to.eql('Deploy')
    EnvironmentList.getEnvCardDeployBtn(1).click()
    EnvironmentList.deployPopUp.waitForVisible()
    expect(EnvironmentList.deployPopUp.isVisible()).to.eql(true)
  })

  //TC_274
  it('should display `simple deploy` pop up, when `deploy another version` button is clicked for any environment card which is deployed', () => {
    EnvironmentList.deployBtn.click()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.getEnvCardDeployAnotherVersionBtn(1).waitForVisible()
    expect(
      EnvironmentList.getEnvCardDeployAnotherVersionBtn(1).getText()
    ).to.eql('Deploy Another Version')
    EnvironmentList.getEnvCardDeployAnotherVersionBtn(1).click()
    EnvironmentList.deployPopUp.waitForVisible()
    expect(EnvironmentList.deployPopUp.isVisible()).to.eql(true)
  })

  //TC_275
  it('should display `simple deploy` pop up title as `deploy - {App name} - {Env name}`', () => {
    EnvironmentList.deployCancelBtn.click()
    EnvironmentList.envList.waitForVisible()
    var kaName = EnvironmentList.kaFromEnvListBreadcrumb.getText()
    var envName = EnvironmentList.getEnvCardTitle(1).getText()
    //var envName = EnvironmentList.getEnvCardTitle(1).getText().toLowerCase()
    EnvironmentList.getEnvCardDeployAnotherVersionBtn(1).click()
    EnvironmentList.deployPopUp.waitForVisible()
    expect(EnvironmentList.simpleDeployPopUpTitle.getText()).to.eql(
      `Deploy - ` + kaName + ` - ` + envName
    )
  })

  //TC_276
  /* it('', () => {
     //Need clarification from KintoHub
   })
 
   //TC_277
   it('', () => {
     //Need clarification from KintoHub
   })*/

  //TC_278
  it('should display `0.0.0` as default build version in `simple deploy` pop up drop down field', () => {
    expect(
      EnvironmentList.simpleDeployDropDown.getText('option:checked')
    ).to.eql('0.0.0')
  })

  //TC_279
  it('should deploy environment according to selected build version from drop down, when user clicks on `delpoy now` button', () => {
    EnvironmentList.getselectDelpoyVer(1)
    var verNum = EnvironmentList.simpleDeployDropDown.getText('option:checked')
    EnvironmentList.deployBtn.click()
    EnvironmentList.envList.waitForVisible()
    expect(EnvironmentList.getEnvCardDeploySuccess(1).getText()).to.eql(
      'SUCCESS'
    )
    expect(EnvironmentList.getenvCardVerNumber(1).getText()).to.eql(verNum)
  })

  //TC_280
  it('should navigate to environment list page, when user clicks on `cancel` button in `simple deploy` pop up', () => {
    EnvironmentList.getEnvCardDeployAnotherVersionBtn(1).waitForVisible()
    EnvironmentList.getEnvCardDeployAnotherVersionBtn(1).click()
    EnvironmentList.deployPopUp.waitForVisible()
    EnvironmentList.deployCancelBtn.click()
    EnvironmentList.envList.waitForVisible()
    expect(EnvironmentList.envList.isVisible()).to.eql(true)
  })

  //TC_281
  it('should navigate to environment list page and deployment should reflect in concerned environment, when user clicks on `deploy now` button in `simple deploy` pop up', () => {
    EnvironmentList.addEnv.click()
    EnvironmentCreate.addEnvPopUp.waitForVisible()
    EnvironmentCreate.envNameField.setValue(
      testData.Environment.allValidEnvChar
    )
    EnvironmentCreate.addNewEnvBtn.click()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.getEnvCardDeployBtn(2).waitForVisible()
    EnvironmentList.getEnvCardDeployBtn(2).click()
    EnvironmentList.deployPopUp.waitForVisible()
    EnvironmentList.simpleDeployDropDown.selectByValue(1)
    EnvironmentList.deployBtn.click()
    expect(EnvironmentList.envList.isVisible()).to.eql(true)
    EnvironmentList.getEnvCardDeploySuccess(2).waitForVisible()
    expect(EnvironmentList.getEnvCardDeploySuccess(2).getText()).to.eql(
      'SUCCESS'
    )
  })

  //TC_282
  // it('should navigate to environment list page and deployment should display deployment status as failure if deployment fails, when user clicks on `deploy now` button in `simple deploy` pop up', () => {
  //   //Need clarification from KintoHub how to test this functionality
  // })
})

describe('Logs - Overall Page', () => {
  //TC_283
  it('should navigate user to `logs` page of environment build, when `view logs` is clicked for currently deployed build', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppCreate.open(ws)
    KintoAppCreate.form.waitForVisible()
    KintoAppCreate.name.input.setValue(testData.kintoapp.validKANamewithChars)
    KintoAppCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescription
    )
    KintoAppCreate.submitGlobal()
    KintoAppList.mykintoAppList.waitForVisible()
    //changed index 6 to 5 as env list cards were commented
    KintoAppList.getCard(5).waitForVisible()
    KintoAppList.getCard(5).click()
    KintoAppManage.form.waitForVisible()
    KintoAppManage.viewEnvironments.click()
    EnvironmentList.envList.waitForVisible()
    //deployment of first environment
    EnvironmentList.getEnvCardDeployBtn(1).click()
    EnvironmentList.deployPopUp.waitForVisible()
    EnvironmentList.deployBtn.click()
    EnvironmentList.envList.waitForVisible()
    //expands environment card
    EnvironmentList.getExpandEnvDeploys(1).waitForVisible()
    EnvironmentList.getExpandEnvDeploys(1).click()
    EnvironmentList.getenvCardViewLogs(1).waitForVisible()
    EnvironmentList.getenvCardViewLogs(1).click()
    EnvironmentList.envBuildViewLogsPageTitle.waitForVisible()
    expect(EnvironmentList.envBuildViewLogsPageTitle.getText()).to.eql('LOGS')
  })

  //TC_284
  it('should navigate user to `logs` page of environment build, when `view logs` is clicked for previously deployed build', () => {
    EnvironmentList.kaFromEnvListBreadcrumb.click()
    KintoAppManage.form.waitForVisible()
    //second deployment for first environment
    KintoAppManage.kaTagNDeploy.click()
    KintoAppManage.majorVersion.click()
    KintoAppManage.majorVersion.setValue('2')
    KintoAppManage.minorVersion.setValue('3')
    KintoAppManage.revision.setValue('4')
    KintoAppManage.createTagBtn.click()
    EnvironmentList.envList.waitForVisible()
    //expands environment card
    EnvironmentList.getExpandEnvDeploys(1).waitForVisible()
    EnvironmentList.getExpandEnvDeploys(1).click()
    EnvironmentList.getenvCardViewLogs(2).waitForVisible()
    EnvironmentList.getenvCardViewLogs(2).click()
    EnvironmentList.envBuildViewLogsPageTitle.waitForVisible()
    expect(EnvironmentList.envBuildViewLogsPageTitle.getText()).to.eql('LOGS')
  })

  //TC_285
  it('should navigate user to `logs` page of environment build, when user enters URL of concerned environment build', () => {
    var url = EnvironmentList.getUrl().split('/')
    var ws = url[3]
    var kintoAppId = url[5]
    var envId = url[7]
    var envBuildNum = url[9]
    var envName = EnvironmentList.toEnvEditPageFromLogsPage.getText()
    EnvironmentList.kaFromEnvListBreadcrumb.click()
    KintoAppManage.form.waitForVisible()
    browser.url(
      `http://localhost:5001/app/dashboard/${ws}/kintoapps/${kintoAppId}/environment/${envId}/logs/${envBuildNum}`
    )
    EnvironmentList.toEnvEditPageFromLogsPage.waitForVisible()
    var envName1 = EnvironmentList.toEnvEditPageFromLogsPage.getText()
    expect(envName).to.eql(envName1)
  })

  //TC_286
  it('should navigate user to `logs` page of environment build, when user select an environment build from drop down through breadcrumb in `logs` page', () => {
    EnvironmentList.tagsDropDownInLogsPage.waitForVisible()
    EnvironmentList.tagsDropDownInLogsPage.click()
    EnvironmentList.tagsDropDownIsShown.waitForVisible()
    var versionNum = EnvironmentList.getTagsFromTagsDropDownList(2).getText()
    var envName = EnvironmentList.toEnvEditPageFromLogsPage.getText()
    EnvironmentList.getTagsFromTagsDropDownList(2).click()
    expect(EnvironmentList.envBuildViewLogsPageTitle.getText()).to.eql('LOGS')
    EnvironmentList.logsTableTitle.waitForVisible()
    expect(EnvironmentList.logsTableTitle.getText()).to.eql(
      envName + ` - ` + versionNum + ` -`
    )
  })

  //TC_287
  it('should display title as `LOGS` for `logs` page', () => {
    expect(EnvironmentList.envBuildViewLogsPageTitle.getText()).to.eql('LOGS')
  })

  //TC_288
  it('should display title for logs table as per concerned environment build selected', () => {
    EnvironmentList.kaFromEnvListBreadcrumb.click()
    KintoAppManage.form.waitForVisible()
    KintoAppManage.viewEnvironments.click()
    EnvironmentList.envList.waitForVisible()
    var envName = EnvironmentList.getEnvCardTitle(1).getText()
    var versionNum = EnvironmentList.getenvCardVerNumber(1).getText()
    //expands environment card
    EnvironmentList.getExpandEnvDeploys(1).click()
    EnvironmentList.getenvCardViewLogs(1).waitForVisible()
    EnvironmentList.getenvCardViewLogs(1).click()
    EnvironmentList.logsTableTitle.waitForVisible()
    expect(EnvironmentList.logsTableTitle.getText()).to.eql(
      envName + ` - ` + versionNum + ` -`
    )
  })

  //TC_289
  it('should dispaly logs table columns name as SEVERITY, RESPONSE CODE, KINTOBLOCK, VERSIONS and TIME & DATE', () => {
    expect(EnvironmentList.columnOneFromLogsTable.getText()).to.eql('SEVERITY')
    expect(EnvironmentList.columnTwoFromLogsTable.getText()).to.eql(
      'RESPONSE CODE'
    )
    expect(EnvironmentList.columnThreeFromLogsTable.getText()).to.eql(
      'KINTOBLOCK'
    )
    expect(EnvironmentList.columnFourFromLogsTable.getText()).to.eql('VERSIONS')
    expect(EnvironmentList.columnFiveFromLogsTable.getText()).to.eql(
      'TIME & DATE'
    )
  })

  //TC_290
  it('should display logs table in collapsed state by default, when user navigates to `logs` page of environment build', () => {
    EnvironmentList.kaFromEnvListBreadcrumb.click()
    KintoAppManage.form.waitForVisible()
    KintoAppManage.viewEnvironments.click()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.getExpandEnvDeploys(1).click()
    EnvironmentList.getenvCardViewLogs(1).waitForVisible()
    EnvironmentList.getenvCardViewLogs(1).click()
    EnvironmentList.logsTableTitle.waitForVisible()
    expect(EnvironmentList.logsTableRowExpanded.isVisible()).to.eql(false)
  })

  //TC_291
  it('should check whether `view logs` in breadcrumb of `logs` page is disabled/not clickable', () => {
    //expect(EnvironmentList.viewLogsDisabledInLogsPage.isEnabled()).to.eql(false)
    expect(EnvironmentList.viewLogsDisabledInLogsPage.isEnabled()).to.eql(false)
  })

  //TC_292
  it('should search tags in tags drop down search field through breadcrumb in `logs` page', () => {
    EnvironmentList.tagsDropDownInLogsPage.click()
    EnvironmentList.tagsDropDownIsShown.waitForVisible()
    EnvironmentList.tagsSearchField.setValue('2.3.4')
    expect(EnvironmentList.getTagsFromTagsDropDownList(1).getText()).to.eql(
      '2.3.4'
    )
  })

  //TC_293
  it('should display `LIVE` for currently deployed build in tags drop down list', () => {
    EnvironmentList.kaFromEnvListBreadcrumb.click()
    KintoAppManage.form.waitForVisible()
    KintoAppManage.viewEnvironments.click()
    EnvironmentList.envList.waitForVisible()
    var envVersionNum = EnvironmentList.getenvCardVerNumber(1).getText()
    EnvironmentList.getExpandEnvDeploys(1).click()
    EnvironmentList.getenvCardViewLogs(1).waitForVisible()
    EnvironmentList.getenvCardViewLogs(1).click()
    EnvironmentList.tagsDropDownInLogsPage.waitForVisible()
    EnvironmentList.tagsDropDownInLogsPage.click()
    EnvironmentList.tagsDropDownIsShown.waitForVisible()
    EnvironmentList.tagsSearchField.setValue(envVersionNum)
    EnvironmentList.tagIsLive.waitForVisible()
    expect(EnvironmentList.tagIsLive.isVisible()).to.eql(true)
  })

  //TC_294
  // it('', () => {
  //   //Need clarification
  // })

  //TC_295
  it('should display place holder text as `Search application tags...` for tags drop down field', () => {
    EnvironmentList.tagsDropDownInLogsPage.click()
    EnvironmentList.tagsDropDownIsShown.waitForVisible()
    var placeHolder = EnvironmentList.tagsSearchField
      .getAttribute('placeholder')
      .getText()
    expect(placeHolder).to.eql('Search application tags...')
  })

  //TC_296
  it('should allow user to switch between environments through breadcrumb in `logs` page of environment build', () => {
    //second environment creation
    EnvironmentList.kaFromEnvListBreadcrumb.click()
    KintoAppManage.form.waitForVisible()
    KintoAppManage.viewEnvironments.click()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.addEnv.click()
    EnvironmentCreate.addEnvPopUp.waitForVisible()
    EnvironmentCreate.envNameField.setValue(
      testData.Environment.allValidEnvChar
    )
    EnvironmentCreate.addNewEnvBtn.click()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.getExpandEnvDeploys(1).click()
    EnvironmentList.getenvCardViewLogs(1).waitForVisible()
    EnvironmentList.getenvCardViewLogs(1).click()
    EnvironmentList.tagsDropDownInLogsPage.waitForVisible()
    EnvironmentList.tagsDropDownInLogsPage.click()
    //    EnvironmentList.tagsDropDownIsShown.waitForVisible()
    //    EnvironmentManage.breadcrumbEnv.click()
    //    EnvironmentManage.breadcrumbEnvDropDown.waitForVisible()
    //    var envName = EnvironmentManage.getbreadCrumbEnvText(2).getText()
    //    EnvironmentManage.getbreadCrumbEnvText(2).click()
    //    EnvironmentManage.form.waitForVisible()
    //    expect(envName).to.eql(EnvironmentManage.envTitle.getText())
  })
})

describe('Logs - Logs Table Component', () => {
  //TC_297
  it('should display logs table title as per environment build selected from environment list', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppCreate.open(ws)
    KintoAppCreate.form.waitForVisible()
    KintoAppCreate.name.input.setValue(testData.kintoapp.validKANamewithChars)
    KintoAppCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescription
    )
    KintoAppCreate.submitGlobal()
    KintoAppList.mykintoAppList.waitForVisible()
    //changed index 7 to 6 as env list cards were commented
    KintoAppList.getCard(6).waitForVisible()
    KintoAppList.getCard(6).click()
    KintoAppManage.form.waitForVisible()
    KintoAppManage.viewEnvironments.click()
    EnvironmentList.envList.waitForVisible()
    //deployment of first environment
    EnvironmentList.getEnvCardDeployBtn(1).click()
    EnvironmentList.deployPopUp.waitForVisible()
    EnvironmentList.getsimpleDeployDropDownOptions(1)
    EnvironmentList.deployBtn.click()
    EnvironmentList.envList.waitForVisible()
    var envName = EnvironmentList.getEnvCardTitle(1).getText()
    EnvironmentList.getenvCardVerNumber(1).waitForVisible()
    var verNum = EnvironmentList.getenvCardVerNumber(1).getText()
    var envStatus = EnvironmentList.getEnvCardDeploySuccess(1).getText()
    var envSelected = envName + ` - ` + verNum + ` -` + envStatus
    EnvironmentList.getExpandEnvDeploys(1).click()
    EnvironmentList.getenvCardViewLogs(1).click()
    EnvironmentList.envBuildViewLogsPageTitle.waitForVisible()
    var envNameInLogsTable = EnvironmentList.logsTableTitle.getText()
    var envStatusInLogsTable = EnvironmentList.logsTableEnvStatus.getText()
    var logsTableTitle = envNameInLogsTable + envStatusInLogsTable
    expect(envSelected).to.eql(logsTableTitle)
  })
  //TC_298
  it('should displays types of logs in `SEVERITY` column as info, debug, fatal and warnign', () => {
    expect(EnvironmentList.getSeverityColumnInLogsTable(1).getText()).to.eql(
      'Info'
    )
    expect(EnvironmentList.getSeverityColumnInLogsTable(2).getText()).to.eql(
      'Debug'
    )
    expect(EnvironmentList.getSeverityColumnInLogsTable(3).getText()).to.eql(
      'Fatal'
    )
    expect(EnvironmentList.getSeverityColumnInLogsTable(4).getText()).to.eql(
      'Warning'
    )
  })

  //TC_299
  it('should display value between `200 - 500` in `RESPONSE CODE` column', () => {
    var minResponseCode = 200
    var maxResponseCode = 500
    for (var i = 1; i <= 4; i++) {
      if (
        minResponseCode <
          EnvironmentList.getResponseCodeColumnInLogsTable(i).getText() &&
        EnvironmentList.getResponseCodeColumnInLogsTable(i).getText() <
          maxResponseCode
      ) {
        return true
      } else {
        return false
      }
    }
  })

  //  //TC_300
  //  it('should display KB name as per the log in `KINTOBLOCK` column, since KA can englobe different KB`s', () => {
  //    // Not Implemented, for now KB name given are dummy KB name's
  //  })
  //
  //  //TC_301
  //  it('should display branch or commit of the concerned KB which is called for the log in `VERSIONS` column', () => {
  //    // Not Implemented, for now version column are given dummy variables
  //  })

  // //TC_302
  // it('should display time and date as per logs are generated in `TIME & DATE`', () => {
  //   var currentTime = new Date(),
  //     hours = currentTime.getHours(),
  //     minutes = currentTime.getMinutes();

  //   if (minutes < 10) {
  //     minutes = "0" + minutes;
  //   }

  //   var suffix = "AM";
  //   if (hours >= 12) {
  //     suffix = "PM";
  //     hours = hours - 12;
  //   }
  //   if (hours == 0) {
  //     hours = 12;
  //   }

  //   var time = (hours + ":" + minutes + " " + suffix)
  // })

  //TC_303
  it('should display request call section, when log is expanded in logs table', () => {
    //expands the log
    EnvironmentList.getSeverityColumnInLogsTable(1).click()
    EnvironmentList.requestFieldTextInLogsTable.waitForVisible()
    expect(EnvironmentList.requestFieldTitleInLogsTable.getText()).to.eql(
      'Request'
    )
    expect(EnvironmentList.requestFieldTextInLogsTable.isVisible()).to.eql(true)
  })

  //TC_304
  it('should display response section, when log is expanded in logs table', () => {
    expect(EnvironmentList.responseFieldTitleInLogsTable.getText()).to.eql(
      'Response'
    )
    EnvironmentList.responseFieldTextInLogsTable.waitForVisible()
    expect(EnvironmentList.responseFieldTextInLogsTable.isVisible()).to.eql(
      true
    )
    //collapses the log
    EnvironmentList.getSeverityColumnInLogsTable(1).click()
  })

  //TC_305
  it('should expanded the log and highlight expanded log row in blue, when user clicks on any row', () => {
    //Expands the row
    EnvironmentList.getSeverityColumnInLogsTable(1).click()
    EnvironmentList.reportAnErrorBtnInLogsTable.waitForVisible()
    expect(EnvironmentList.reportAnErrorBtnInLogsTable.isVisible()).to.eql(true)
    //Color verification to be done
  })

  //TC_306
  it('should collapse the log row expanded and blue highlight focused on log must disappear, when user clicks on row', () => {
    //Collapses the row
    EnvironmentList.getSeverityColumnInLogsTable(1).click()
    expect(EnvironmentList.reportAnErrorBtnInLogsTable.isVisible()).to.eql(
      false
    )
  })

  //TC_307
  it('should display `Report an issue` button, when a log is expanded', () => {
    //Expands the row
    EnvironmentList.getSeverityColumnInLogsTable(1).click()
    EnvironmentList.reportAnErrorBtnInLogsTable.waitForVisible()
    expect(EnvironmentList.reportAnErrorBtnInLogsTable.isVisible()).to.eql(true)
  })

  //  //TC_308
  //  it('should display `report` pop up, when `Report an issue` button is clicked', () => {
  //    //For now report pop up is not implemented
  //  })
})
