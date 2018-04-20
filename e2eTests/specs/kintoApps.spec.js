import { expect } from 'chai'
import KintoAppList from '../page-objects/kintoApp.list.page'
import KintoAppCreate from '../page-objects/kintoApp.create.page'
import KintoAppManage from '../page-objects/kintoApp.manage.page'
import KintoBlockCreate from '../page-objects/kintoBlock.create.page'
import KintoBlockManage from '../page-objects/kintoBlock.manage.page'
import KintoBlockList from '../page-objects/kintoBlock.list.page'
import DashboardIndex from '../page-objects/dashboard.index.page'
import EnvironmentList from '../page-objects/environment.list.page'
import EnvironmentCreate from '../page-objects/environment.create.page'
import EnvironmentManage from '../page-objects/environment.manage.page'
import Login from '../page-objects/login.page'
import Landing from '../page-objects/landing.page'
import testData from '../constants/testdata.json'

describe('create kintoApp', () => {
  // TODO let workspaceId
  //  const wdio = require('wdio')
  //
  //   beforeEach(wdio.wrap( {
  //	    workspaceId = Landing.workspaceSelect.getAttribute('data-test')
  //  })	)

  it('should redirect the user to login  when he is trying to access list of kintoApps and he is not logged in', () => {
    KintoAppList.open(1) // Default workspace ID 1 passed as user is not yet logged in in this case
    Login.loginForm.waitForVisible()
    expect(Login.getUrl()).to.eql('/log-in')
  })

  it('should redirect the user to create kintoapps when he is trying to access list kintoapps with no kintoapps created', () => {
    //This fails as its a bug
    Login.login()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppList.open(ws)
    KintoAppCreate.form.waitForVisible()
    expect(KintoAppCreate.form.isVisible()).to.eq(true)
  })

  it('should redirect the user to create kintoapps when he clicks on kintoapps with no kintoapps created', () => {
    //This fails as its a bug
    DashboardIndex.applicationLeftnav.click()
    KintoAppCreate.form.waitForVisible()
    expect(KintoAppCreate.form.isVisible()).to.eq(true)
  })

  it('should validate inputs and not allow  user to create a kintoApp without invalid data', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppCreate.open(ws)
    KintoAppCreate.name.input.setValue(testData.kintoapp.validKintoAppName)
    KintoAppCreate.submitGlobal()
    expect(KintoAppCreate.shortDescription.error.getText()).to.eql('Required')
  })

  it('should validate inputs and not allow  user to create a kintoApp with description more than 200 characters', () => {
    KintoAppCreate.name.input.setValue(testData.kintoapp.validKintoAppName)
    KintoAppCreate.shortDescription.input.setValue(
      testData.kintoapp.invalidKintoAppDescription
    )
    KintoAppCreate.submitGlobal()
    KintoAppCreate.shortDescription.error.waitForVisible()

    expect(KintoAppCreate.shortDescription.error.getText()).to.eql(
      'Must be 200 characters or less'
    )
  })

  it('should create a new ka without selecting any KintoBlock', () => {
    KintoAppCreate.name.input.setValue(testData.kintoapp.validKintoAppName)
    KintoAppCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescription
    )
    KintoAppCreate.submitGlobal()
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getCard(0).waitForVisible()
    const name = KintoAppList.getCard(0)
      .element('.name')
      .getText()
    expect(name).to.eql(testData.kintoapp.validKintoAppName)
  })

  it('should display alert pop up message, when user try to navigate to any page of KH from `create new application` page while `create new application` button is enabled', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppCreate.open(ws)
    KintoAppCreate.form.waitForVisible()
    KintoAppCreate.name.input.setValue(testData.kintoapp.validKintoAppName)
    expect(browser.isEnabled('button.button.default')).to.eql(true)
    DashboardIndex.kintoBlocksleftnav.click()
    browser.alertAccept()
  })

  it('should display alert pop up message, when user try to navigate to any page of KH from `manage KA` page without saving the changes made', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppList.open(ws)
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getCard(0).waitForVisible()
    KintoAppList.getCard(0).click()
    KintoAppManage.form.waitForVisible()
    KintoAppManage.name.input.setValue(testData.kintoapp.validKintoAppName)
    DashboardIndex.kintoBlocksleftnav.click()
    browser.alertAccept()
  })

  it('should create two kbs with valid name and description ', () => {
    //Create a KB as this spec is dependent on KB.
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockCreate.open(ws)
    KintoBlockCreate.name.input.setValue(
      testData.kintoblock.validKBNameWithDollar
    )

    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescriptionWithChar
    )
    KintoBlockCreate.language.input.selectByIndex(2)
    KintoBlockCreate.protocol.input.selectByIndex(2)
    KintoBlockCreate.repository.input.doubleClick() //TODO Change to click after the bug to bring up the dropdown on a single click is resolved
    KintoBlockCreate.repository.input.setValue(
      testData.kintoblock.validRepoName
    )
    KintoBlockCreate.submitGlobal()
    KintoBlockList.getCard(0).waitForVisible()

    KintoBlockCreate.open(ws)
    KintoBlockCreate.name.input.setValue(
      testData.kintoblock.validKBNameWithStar
    )

    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescriptionWithChar
    )
    KintoBlockCreate.language.input.selectByIndex(2)
    KintoBlockCreate.protocol.input.selectByIndex(2)
    KintoBlockCreate.repository.input.doubleClick() //TODO Change to click after the bug to bring up the dropdown on a single click is resolved
    KintoBlockCreate.repository.input.setValue(
      testData.kintoblock.validRepoName
    )
    KintoBlockCreate.submitGlobal()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(1).waitForVisible()
  })

  it("should show the description for 'What is an Application?' on the right", () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppList.open(ws)
    KintoAppList.getCard(0).waitForVisible()
    KintoAppCreate.open(ws)
    KintoAppCreate.form.waitForVisible()
    expect(KintoAppCreate.whatisanApp.getText()).to.eql(
      'What is an Application?\nApplications are tailored back-end features packages, ready to be consumed by your clients and whose feature can scale independently to fit your needs. They are composed of KintoBlocks and services with unique configuration parameters, and either a client or a protocol to allow your clients to talk to the application. Start building an application below or learn more here.'
    )
  })

  it('should show the switch for managing edit permission of workspace and the switch is ON by default', () => {
    expect(KintoAppCreate.switchTogglerBtn.isVisible()).to.eql(true)
    expect(KintoAppCreate.switchValueForWS.getAttribute('value')).to.eql('true')
  })

  it('should show the button to edit the workspace editors when the switch is turned off', () => {
    KintoAppCreate.switchTogglerBtn.click()
    expect(KintoAppCreate.switchValueForWS.getAttribute('value')).to.eql(
      'false'
    )
    KintoAppCreate.wsEditorButton.waitForVisible()
    expect(KintoAppCreate.wsEditorButton.isVisible()).to.eql(true)
  })

  it('should create a new KA selecting a single KintoBlock', () => {
    KintoAppCreate.name.input.setValue(testData.kintoapp.validKANamewithChars)
    KintoAppCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescriptionWithChars
    )
    //    browser.pause(2000)
    //    KintoAppCreate.kbdropDown.moveToObject()
    //    browser.leftClick('div.Select-input > input')
    //    KintoAppCreate.kbdropDown.setValue('d')
    //    browser.leftClick('div.Select-input > input')
    //    browser.keys('Return')
    //    KintoAppManage.kbName.waitForVisible()
    KintoAppCreate.submitGlobal()
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getCard(1).waitForVisible() //TODO  Change this to 0, after the bug to display the latest KA on top is fixed
    const kaname = KintoAppList.getCard(1) //TODO  Change this to 0, after the bug to display the latest KA on top is fixed
      .element('.name')
      .getText()
    expect(kaname).to.eql(testData.kintoapp.validKANamewithChars)
    KintoAppList.getCard(1).click() //TODO  Change this to 0, after the bug to display the latest KA on top is fixed
    KintoAppManage.title.waitForVisible()
    expect(KintoAppManage.title.getText()).to.eq(kaname)
  })

  it('should create a new KA selecting multiple KintoBlock', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppCreate.open(ws)
    KintoAppCreate.form.waitForVisible()
    KintoAppCreate.name.input.setValue(testData.kintoapp.validKANamewithDot)

    KintoAppCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescriptionWithChars
    )
    KintoAppCreate.kbdropDown.scroll()
    KintoAppCreate.kbdropDown.leftClick()
    browser.leftClick('div.Select-input > input')
    KintoAppCreate.kbdropDown.setValue('z')
    browser.leftClick('div.Select-input > input')
    browser.keys('Return')
    KintoAppCreate.kbdropDown.setValue('d')
    browser.leftClick('div.Select-input > input')
    browser.keys('Return')
    KintoAppCreate.submitGlobal()
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getCard(2).waitForVisible()
    const name = KintoAppList.getCard(2) //TODO  Change this to 0, after the bug to display the latest KA on top is fixed
      .element('.name')
      .getText()
    expect(name).to.eql(testData.kintoapp.validKANamewithDot)
    KintoAppList.getCard(2).click() //TODO  Change this to 0, after the bug to display the latest KA on top is fixed
    KintoAppManage.title.waitForVisible()
    expect(KintoAppManage.title.getText()).to.eq(name)
  })

  it('should not redirect the user to create kintoapps when he clicks on kintoapps with  kintoapps created', () => {
    DashboardIndex.applicationLeftnav.click()
    expect(KintoAppCreate.form.isVisible()).to.eq(false)
  })
})

describe('KA - List Overall Page', () => {
  //	  //TC_316
  //	    it('should navigate user to KA list page, when user clicks on `Applications` form breadcrumb of KA manage page', () => {
  //	      var ws = Landing.workspaceSelect.getAttribute('data-test')
  //	      KintoAppList.open(ws)
  //	      KintoAppList.mykintoAppList.waitForVisible()
  //	      KintoAppList.getCard(0).click()
  //	      KintoAppManage.form.waitForVisible()
  //	      KintoAppManage.kaListPageFromKaManagePage.waitForVisible()
  //	      //After this click workspace id changes it's a bug
  //	      KintoAppManage.kaListPageFromKaManagePage.click()
  //	      expect(KintoAppList.mykintoAppList.isVisible()).to.eql(true)
  //	    })

  //TC_317
  it('should navigate user to KA list page, when user enters URL of KA list page', () => {
    var url = KintoAppList.getUrl().split('/')
    var ws = url[3]
    KintoAppList.getCard(0).click()
    KintoAppManage.form.waitForVisible()
    browser.url(`http://localhost:5001/app/dashboard/${ws}/kintoapps/list`)
    expect(KintoAppList.getUrl()).to.eql(`/app/dashboard/${ws}/kintoapps/list`)
    KintoAppList.mykintoAppList.waitForVisible()
  })

  //TC_318
  it('should display `Applications` in breadcrumb of KA list page as disabled', () => {
    KintoAppList.applicationsDisabledInBreadcrumb.waitForVisible()
    expect(KintoAppList.applicationsDisabledInBreadcrumb.isVisible()).to.eql(
      true
    )
  })

  //TC_319
  it('should display KA list page title as `My Applications`', () => {
    expect(KintoAppList.kaPageTitle.getText()).to.eql('My Applications')
  })

  //TC_320
  it('should display `Create new application` button on top right of KA list page', () => {
    expect(KintoAppList.kaCreateBtnInKaListPage.isVisible()).to.eql(true)
    expect(KintoAppList.kaCreateBtnInKaListPage.getText()).to.eql(
      'Create New Application'
    )
  })

  //TC_321
  it('should display KA cards as individual cards in KA list page', () => {
    //Need clarification how to test
  })

  //TC_322
  it('should navigate user to KA create page, when user click on `create new application` button on top right of KA list page', () => {
    KintoAppList.kaCreateBtnInKaListPage.click()
    KintoAppCreate.form.waitForVisible()
    expect(KintoAppCreate.form.isVisible()).to.eql(true)
  })

  //TC_323
  it('should verify that `create new application` card is entirely clickable and navigate user to KA create page, when user clicks the card anywhere on it', () => {
    DashboardIndex.applicationLeftnav.click()
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.kaCreateCradImg.click()
    KintoAppCreate.form.waitForVisible()
    expect(KintoAppCreate.form.isVisible()).to.eql(true)
    DashboardIndex.applicationLeftnav.click()
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.kaCreateCardText.click()
    KintoAppCreate.form.waitForVisible()
    expect(KintoAppCreate.form.isVisible()).to.eql(true)
    DashboardIndex.applicationLeftnav.click()
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.kaCreateCardIconSection.click()
    KintoAppCreate.form.waitForVisible()
    expect(KintoAppCreate.form.isVisible()).to.eql(true)
    DashboardIndex.applicationLeftnav.click()
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.kaCreateCardPlusIcon.click()
    KintoAppCreate.form.waitForVisible()
    expect(KintoAppCreate.form.isVisible()).to.eql(true)
    DashboardIndex.applicationLeftnav.click()
    KintoAppList.mykintoAppList.waitForVisible()
  })

  //TC_324
  it('should verify that any KA card is entirely clickable and navigate user to  KA manage page, when user clicks on any KA card', () => {
    KintoAppList.getExistingKaCardImg(0).waitForVisible()
    KintoAppList.getExistingKaCardImg(0).click()
    KintoAppManage.form.waitForVisible()
    expect(KintoAppManage.form.isVisible()).to.eql(true)
    DashboardIndex.applicationLeftnav.click()
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getKaNameFromKaCard(0).click()
    KintoAppManage.form.waitForVisible()
    expect(KintoAppManage.form.isVisible()).to.eql(true)
    DashboardIndex.applicationLeftnav.click()
    KintoAppList.mykintoAppList.waitForVisible()
  })

  // //TC_325
  // it('should display KA cards as per workspace they are created for in KA list page', () => {
  //   //This script will run successfully on staging only. Workspace creation is not implemented in local
  //   workspaceCreatePage.open()
  //   workspaceCreatePage.form.waitForVisible()
  //   workspaceCreatePage.name.input.setValue(testData.workspace.validWorkSpaceName)
  //   workspaceCreatePage.submitGlobal()
  //   workspaceManagePage.waitForVisible()
  //   DashboardIndex.selectByIndex(DashboardIndex.workspaceSelect, 2)
  //   DashboardIndex.kintoHubLogo.waitForVisible()
  //   DashboardIndex.applicationLeftnav.click()
  //   KintoAppCreate.form.waitForVisible()
  //   KintoAppCreate.name.input.setValue(testData.kintoapp.validKintoAppName)
  //   KintoAppCreate.shortDescription.input.setValue(testData.kintoapp.validKintoAppDescription)
  //   KintoAppCreate.submitGlobal()
  //   KintoAppList.mykintoAppList.waitForVisible()
  //   KintoAppList.kaCreateCardPlusIcon.click()
  //   KintoAppCreate.form.waitForVisible()
  //   KintoAppCreate.name.input.setValue(testData.kintoapp.validKintoAppNameDigit)
  //   KintoAppCreate.shortDescription.input.setValue(testData.kintoapp.validKintoAppDescription)
  //   KintoAppCreate.submitGlobal()
  //   KintoAppList.mykintoAppList.waitForVisible()
  //   var firstKaName = KintoAppList.getKaNameFromKaCard(0).getText()
  //   var secondKaName = KintoAppList.getKaNameFromKaCard(1).getText()
  //   var url = KintoAppList.getUrl().split('/')
  //   var ws = url[3]
  //   DashboardIndex.workspaceSelect.selectByIndex(2)
  //   expect(KintoAppList.mykintoAppList.isVisible()).to.eql(false)
  //   browser.url(`http://staging.kintohub.com/app/dashboard/${ws}/kintoapps/list`)
  //   KintoAppList.mykintoAppList.waitForVisible()
  //   expect(testData.workspace.validWorkSpaceName).to.eql(DashboardIndex.getWSDropdownElement(2).getText())
  //   expect(firstKaName).to.eql(KintoAppList.getKaNameFromKaCard(0).getText())
  //   expect(secondKaName).to.eql(KintoAppList.getKaNameFromKaCard(1).getText())
  // })

  //TC_326
  it('should display newly created KA as KA card next to `create new application` card', () => {
    KintoAppList.kaCreateCardPlusIcon.click()
    KintoAppCreate.name.input.setValue(testData.kintoapp.validKANameWithDash)
    KintoAppCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescription
    )
    KintoAppCreate.submitGlobal()
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getCard(0).waitForVisible()
    //this validation will fail as it's a bug
    expect(KintoAppList.getKaNameFromKaCard(0).getText()).to.eql('testname999')
  })

  //TC_327
  it('should display recently modified KA as KA card next to `create new application` card', () => {
    KintoAppList.getCard(0).click()
    KintoAppManage.form.waitForVisible()
    KintoAppManage.name.input.setValue(testData.kintoapp.validKANamewithChars)
    browser.pause(2000)
    KintoAppManage.submitGlobal()
    //for now added wait
    KintoAppManage.kaTagNDeploy.waitForVisible()
    expect(KintoBlockCreate.nameField.getValue()).to.eql(
      testData.kintoapp.validKANamewithChars
    )
    expect(KintoAppManage.submitBtn.getText()).to.eql('Tag And Deploy')
    KintoAppManage.form.waitForVisible()
    DashboardIndex.applicationLeftnav.click()
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getKaNameFromKaCard(0).waitForVisible()
    expect(KintoAppList.getKaNameFromKaCard(0).getText()).to.eql('testname01')
  })
})

describe('KA - List cards', () => {
  //TC_329
  it('should display KA colored top matching with KA icon color', () => {
    //TODO
  })

  //TC_330
  it('should display icon for every KA on new KA creation', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppCreate.open(ws)
    KintoAppCreate.name.input.setValue(testData.kintoapp.validKintoAppNameDigit)
    KintoAppCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescription
    )
    KintoAppCreate.submitGlobal()
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getExistingKaCardImg(4).waitForVisible()
    expect(KintoAppList.getKaNameFromKaCard(4).getText()).to.eql(
      testData.kintoapp.validKintoAppNameDigit
    )
    expect(KintoAppList.getExistingKaCardImg(4).isVisible()).to.eql(true)
  })

  //TC_331
  it('should display upto two deployed environments of that KA and deployed version number in KA card, where environment name truncated after four characters', () => {
    //added 22/3
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppList.open(ws)
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getCard(0).waitForVisible()
    //
    KintoAppList.getCard(0).click()
    KintoAppManage.form.waitForVisible()
    KintoAppManage.viewEnvironments.click()
    EnvironmentList.envList.waitForVisible()
    //for confirmation of default env
    EnvironmentList.getEnvCardDeployBtn(1).waitForVisible()
    //
    EnvironmentList.addEnv.click()
    EnvironmentCreate.addEnvPopUp.waitForVisible()
    EnvironmentCreate.envNameField.setValue(
      testData.Environment.allValidEnvChar
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
    EnvironmentList.getEnvCardDeployBtn(1).click()
    EnvironmentList.deployBtn.waitForVisible()
    EnvironmentList.deployBtn.click()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.getEnvCardDeployBtn(2).click()
    EnvironmentList.deployBtn.waitForVisible()
    EnvironmentList.deployBtn.click()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.getEnvCardDeployBtn(3).click()
    EnvironmentList.deployBtn.waitForVisible()
    EnvironmentList.deployBtn.click()
    EnvironmentList.envList.waitForVisible()
    DashboardIndex.applicationLeftnav.click()
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getEnvNameFromKaCardList(0, 1).waitForVisible()
    expect(KintoAppList.getEnvNameFromKaCardList(0, 1).getText()).to.eql(
      'DEFAULT'
    )
    expect(KintoAppList.getEnvNameFromKaCardList(0, 2).getText()).to.eql('ENV1')
  })

  //	  TC_332
  //	  it('should update displaying upto two deployed environments of that KA in the KA card, when re-ordering of environment is made', () => {
  //	    KintoAppList.getCard(0).click()
  //	    KintoAppManage.form.waitForVisible()
  //	    KintoAppManage.viewEnvironments.click()
  //	    EnvironmentList.envList.waitForVisible()
  //	    EnvironmentList.dragAndDrop(
  //	      EnvironmentList.getEnvCardTopLeftHandle(1),
  //	      EnvironmentList.getEnvCardTopLeftHandle(2)
  //	    )
  //	    browser.sleep('2000')
  //	    var firstEnv = EnvironmentList.getEnvCardTitle(1).getText()
  //	    var secondEnv = EnvironmentList.getEnvCardTitle(2).getText()
  //	    DashboardIndex.applicationLeftnav.click()
  //	    KintoAppList.mykintoAppList.waitForVisible()
  //	    //Below validation will fail as its a bug env cards don't get re ordered
  //	    expect(KintoAppList.getEnvNameFromKaCardList(0, 1).getText()).to.eql(
  //	      firstEnv
  //	    )
  //	    expect(KintoAppList.getEnvNameFromKaCardList(0, 2).getText()).to.eql(
  //	      secondEnv
  //	    )
  //	  })
  //
  //	  //TC_333
  //	  it('should not display shutdown environment in KA card', () => {
  //	    //Not implemented
  //	  })
  //
  //TC_334
  it('should display `+X` below the environments listed in KA card, where `X` is the number of environments remaining to be displayed', () => {
    KintoAppList.getEnvNameFromKaCardList(0, 3).waitForVisible()
    expect(KintoAppList.getEnvNameFromKaCardList(0, 3).getText()).to.eql('+1')
    //Try to get environments counts by for loop, instead of hard coding value 1
  })
  //
  //	  //TC_335
  //	  it('should display number of environments which is not visible in the KA card in `+X`, where X is which displays number of environments', () => {
  //	    //TODO Try to get environments counts by for loop, instead of hard coding X value
  //	  })
  //
  //TC_336
  it('should display KA card title text as per KA created or modified', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppCreate.open(ws)
    KintoAppCreate.name.input.setValue(testData.kintoapp.validKintoAppNameDigit)
    KintoAppCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescription
    )
    KintoAppCreate.submitGlobal()
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getKaNameFromKaCard(5).waitForVisible()
    expect(KintoAppList.getKaNameFromKaCard(5).getText()).to.eql(
      testData.kintoapp.validKintoAppNameDigit
    )
    KintoAppList.getCard(5).click()
    KintoAppManage.form.waitForVisible()
    KintoAppManage.name.input.setValue(
      testData.kintoapp.validUpdatedKintoAppName
    )
    KintoAppManage.submitGlobal()
    //for now added wait
    browser.pause(3000)
    KintoAppList.open(ws)
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getKaNameFromKaCard(5).waitForVisible()
    expect(KintoAppList.getKaNameFromKaCard(5).getText()).to.eql(
      testData.kintoapp.validUpdatedKintoAppName
    )
  })

  //TC_337
  it('should display upto four dependencies of KA in stacked manner if there is more than four dependencies in a KA', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppList.open(ws)
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getCard(5).waitForVisible()
    KintoAppList.getCard(5).click()
    KintoAppManage.form.waitForVisible()
    KintoAppCreate.kbdropDown.setValue('z')
    browser.leftClick('div.Select-input > input')
    browser.keys('Return')
    KintoAppCreate.kbdropDown.setValue('z')
    browser.leftClick('div.Select-input > input')
    browser.keys('Return')
    KintoAppCreate.kbdropDown.setValue('z')
    browser.leftClick('div.Select-input > input')
    browser.keys('Return')
    KintoAppCreate.kbdropDown.setValue('z')
    browser.leftClick('div.Select-input > input')
    browser.keys('Return')
    KintoAppCreate.kbdropDown.setValue('z')
    browser.leftClick('div.Select-input > input')
    browser.keys('Return')
    KintoAppManage.submitGlobal()
    browser.pause(2000)
    KintoAppList.open(ws)
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getStackedDependenciesFromKACard(5, 1).waitForVisible()
    expect(
      KintoAppList.getStackedDependenciesFromKACard(5, 1).isVisible()
    ).to.eql(true)
    expect(
      KintoAppList.getStackedDependenciesFromKACard(5, 2).isVisible()
    ).to.eql(true)
    expect(
      KintoAppList.getStackedDependenciesFromKACard(5, 3).isVisible()
    ).to.eql(true)
    expect(
      KintoAppList.getStackedDependenciesFromKACard(5, 4).isVisible()
    ).to.eql(true)
    expect(
      KintoAppList.getStackedDependenciesFromKACard(5, 5).isVisible()
    ).to.eql(false)
  })

  //TC_338
  it('should display `+X` if dependencies count is more than four, where X is total count of dependencies which is not displayed', () => {
    //Try to get environments counts by for loop, instead of hard coding value 1
    expect(KintoAppList.getRemainingDependenciesCount(5).getText()).to.eql('+1')
  })

  //	  //TC_339
  //	  it('should display remaining number of dependencies in `+X`, where X is remaining number of dependencies', () => {
  //	    //TODO Try to get environments counts by for loop, instead of hard coding X value
  //	  })

  //TC_340
  it('should display `...` button in every KA card', () => {
    KintoAppList.getkaListDropDown(0).waitForVisible()
    expect(KintoAppList.getkaListDropDown(0).isVisible()).to.eql(true)
  })

  //TC_341
  it('should display dependencies drop down title as `Dependencies(X), where X is the total count of dependencies`', () => {
    KintoAppList.getRemainingDependenciesCount(5).click()
    KintoAppList.kaListDropDown.waitForVisible()
    //For now hard coding the count
    expect(KintoAppList.getDependenciesDropDownTitle(5).getText()).to.eql(
      'Dependencies (5)'
    )
  })

  //TC_342
  it('should display total count of dependencies currently in KA, where X in `Dependencies(X)` is total count', () => {
    //TODO Try to get environments counts by for loop, instead of hard coding X value
  })

  //TC_343
  it('should display dependencies drop down as a scrollable list', () => {
    //TODO Need clarification on how to check whether its scrollable or not
  })

  //TC_344
  it('should display edit branch, edit branch icon, view all tags, compare versions and view environments, when user clicks on `...` button in any KA card', () => {
    KintoAppList.getkaListDropDown(0).click()
    KintoAppList.kaListDropDown.waitForVisible()
    expect(KintoAppList.getEditDraftFromDropDown(0).isVisible()).to.eql(true)
    expect(KintoAppList.getEditDraftIcon(0).isVisible()).to.eql(true)
    expect(KintoAppList.getKaListDropDownViewTags(0).isVisible()).to.eql(true)
    expect(KintoAppList.getCompareVersionsFromDropDown(0).isVisible()).to.eql(
      true
    )
    expect(KintoAppList.getKaAppListViewEnv(0).isVisible()).to.eql(true)
  })

  //TC_345
  it('should display search bar field, draft text, draft icon, tag of environments and scrollable list of tags', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppList.open(ws)
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getCard(0).waitForVisible()
    KintoAppList.getCard(0).click()
    KintoAppManage.form.waitForVisible()
    KintoAppManage.kaTagNDeploy.click()
    KintoAppManage.majorVersion.click()
    KintoAppManage.majorVersion.setValue('1')
    KintoAppManage.minorVersion.setValue('2')
    KintoAppManage.revision.setValue('4')
    KintoAppManage.notes.click()
    KintoAppManage.createTagBtn.click()
    KintoAppManage.envList.waitForVisible()
    DashboardIndex.applicationLeftnav.click()
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getkaListDropDown(0).click()
    KintoAppList.kaListDropDown.waitForVisible()
    KintoAppList.getKaListDropDownViewTags(0).click()
    KintoAppList.kaListDropDown.waitForVisible()
    expect(KintoAppList.getSearchFieldFromKaDropDown(0).isVisible()).to.eql(
      true
    )
    expect(KintoAppList.getDraftFromViewTags(0).getText()).to.eql('Draft')
    expect(KintoAppList.getDraftIconFromViewTags(0).isVisible()).to.eql(true)
    expect(
      KintoAppList.getTaggedVersionNumberFromKaDropDown(0, 2).isVisible()
    ).to.eql(true)
    //TODO whether it's scrollable or not
  })

  //TC_346
  it('should display dependencies drop down, when user clicks on stacked dependencies icon or `+X` icon next to stacked dependencies', () => {
    KintoAppList.getStackedDependenciesFromKACard(5, 3).click()
    expect(KintoAppList.getDependenciesDropDown(5).isVisible()).to.eql(true)
    KintoAppList.getStackedDependenciesFromKACard(5, 3).click()
    KintoAppList.getRemainingDependenciesCount(5).click()
    expect(KintoAppList.getDependenciesDropDown(5).isVisible()).to.eql(true)
  })

  //TC_347
  it('should turn `+X` icon to blue which is next to stacked dependencies, when user hover over it', () => {
    //TODO
  })

  //TC_348
  it('should display grey high light for any row in dependencies drop down, when user hover over it', () => {
    //TODO
  })

  //TC_349
  it('should navigate to KB manage page, when user clicks on any dependencies from dependencies drop down', () => {
    //TODO Not implemented
  })

  //TC_350
  it('should display grey high light for any row for drop down which is visible, when user clicks on `...` button in any KA card', () => {
    //TODO
  })

  //TC_351
  it('should navigate user to KA manage page, when user clicks on `edit draft` option which appears via `...` button in any KA card', () => {
    var kaName = KintoAppList.getKaNameFromKaCard(0).getText()
    KintoAppList.getkaListDropDown(0).click()
    KintoAppList.kaListDropDown.waitForVisible()
    KintoAppList.getEditDraftFromDropDown(0).click()
    KintoAppManage.form.waitForVisible()
    expect(KintoAppManage.form.waitForVisible())
    expect(kaName).to.eql(KintoAppManage.title.getText())
  })

  //TC_352
  it('should replace first drop down displayed via `...` button in any KA card with drop down visible via `view all tags` drop down', () => {
    DashboardIndex.applicationLeftnav.click()
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getkaListDropDown(0).click()
    //first drop down
    KintoAppList.kaListDropDown.waitForVisible()
    expect(KintoAppList.kaListDropDown.isVisible()).to.eql(true)
    KintoAppList.getKaListDropDownViewTags(0).click()
    //second drop down
    KintoAppList.getSearchFieldFromKaDropDown(0).waitForVisible()
    expect(KintoAppList.getSearchFieldFromKaDropDown(0).isVisible()).to.eql(
      true
    )
  })

  //TC_353
  it('should navigate user to version page of that KA, when user clicks on `compare versions` option via `...` button in any KA card', () => {
    KintoAppList.getkaListDropDown(0).click()
    KintoAppList.kaListDropDown.waitForVisible()
    KintoAppList.getCompareVersionsFromDropDown(0).click()
    //TODO  for now it navigates to change logs page
  })

  //TC_354
  it('should allow user to filter tags via search field displayed, search field visible via `view all tags` drop down', () => {
    DashboardIndex.applicationLeftnav.click()
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getkaListDropDown(0).click()
    KintoAppList.kaListDropDown.waitForVisible()
    KintoAppList.getKaListDropDownViewTags(0).click()
    KintoAppList.getSearchFieldFromKaDropDown(0).waitForVisible()
    KintoAppList.getSearchFieldFromKaDropDown(0).setValue('1')
    //During search tag item index starts from 1, previously env deployed build 1.2.4
    KintoAppList.getTaggedVersionNumberFromKaDropDown(0, 1).waitForVisible()
    expect(
      KintoAppList.getTaggedVersionNumberFromKaDropDown(0, 1).isVisible()
    ).to.eql(true)
  })

  //TC_355
  it('should display grey highlight for any tag versions in the tag list which is visible via `view all tags` drop down', () => {
    //TODO
  })

  //TC_356
  it('should navigate user to KA manage page, when user clicks on `draft` which is visible via `view all tags` drop down', () => {
    KintoAppList.getkaListDropDown(0).click()
    KintoAppList.kaListDropDown.waitForVisible()
    KintoAppList.getKaListDropDownViewTags(0).click()
    KintoAppList.getSearchFieldFromKaDropDown(0).waitForVisible()
    KintoAppList.getDraftFromViewTags(0).click()
    KintoAppManage.form.waitForVisible()
    expect(KintoAppManage.form.isVisible()).to.eql(true)
  })

  //TC_357
  it('should navigate user to KA manage page of selected tag version which is visible via `view all tags` drop down', () => {
    DashboardIndex.applicationLeftnav.click()
    KintoAppList.mykintoAppList.waitForVisible()
    var kaName = KintoAppList.getKaNameFromKaCard(0).getText()
    KintoAppList.getkaListDropDown(0).click()
    KintoAppList.kaListDropDown.waitForVisible()
    KintoAppList.getKaListDropDownViewTags(0).click()
    KintoAppList.getSearchFieldFromKaDropDown(0).waitForVisible()
    var tagVersion = KintoAppList.getTaggedVersionNumberFromKaDropDown(
      0,
      2
    ).getText()
    KintoAppList.getTaggedVersionNumberFromKaDropDown(0, 2).click()
    KintoAppManage.form.waitForVisible()
    expect(kaName).to.eql(KintoAppManage.title.getText())
    expect(tagVersion).to.eql(KintoAppManage.tagVersionFromBreadcrumb.getText())
  })

  //TC_358
  it('should not allow user to edit other than basic info and cross version in KA manage page of selected tag versions', () => {
    KintoAppManage.name.input.setValue(testData.kintoapp.validKANameWithDash)
    KintoAppManage.description.input.setValue(
      testData.kintoapp.validKintoAppDescription
    )
    //Need clarification for cross versions
    expect(KintoAppManage.saveChangesBtn.getText()).to.eql('Save Changes')
    expect(KintoAppCreate.kbdropDown.isVisible()).to.eql(false)
    DashboardIndex.applicationLeftnav.click()
    browser.alertAccept()
  })

  //TC_359
  it('should make disappear drop downs visible via KA card, when user clicks any where on page other than on KA card', () => {
    KintoAppList.getkaListDropDown(0).click()
    //first drop down
    KintoAppList.kaListDropDown.waitForVisible()
    expect(KintoAppList.getEditDraftFromDropDown(0).isVisible()).to.eql(true)
    KintoAppManage.kaListPageFromKaManagePage.click()
    expect(KintoAppList.kaListDropDown.isVisible()).to.eql(false)
    KintoAppList.getkaListDropDown(0).click()
    KintoAppList.kaListDropDown.waitForVisible()
    KintoAppList.getKaListDropDownViewTags(0).click()
    //second drop down
    KintoAppList.getSearchFieldFromKaDropDown(0).waitForVisible()
    expect(KintoAppList.getSearchFieldFromKaDropDown(0).isVisible()).to.eql(
      true
    )
    KintoAppManage.kaListPageFromKaManagePage.click()
    expect(KintoAppList.kaListDropDown.isVisible()).to.eql(false)
    KintoAppList.getStackedDependenciesFromKACard(5, 3).click()
    //Third drop down
    KintoAppList.getDependenciesDropDown(5).waitForVisible()
    expect(KintoAppList.getDependenciesDropDown(5).isVisible()).to.eql(true)
    KintoAppManage.kaListPageFromKaManagePage.click()
    expect(KintoAppList.kaListDropDown.isVisible()).to.eql(false)
  })
})

describe('KA - Create/Edit Page', () => {
  //TC_360
  it('should blue highlight `Applications` in the left navigation bar on click and when user click on `+` next to applications navigates to KA create page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DashboardIndex.open(ws)
    DashboardIndex.applicationLeftnav.click()
    //TODO check blue highlight of applications
    DashboardIndex.kaHoveraddicon.click()
    KintoAppCreate.form.waitForVisible()
    expect(KintoAppCreate.form.isVisible()).to.eql(true)
  })

  //TC_361
  it('should navigate to KA create page, when user clicks on `create new application` button via KA manage breadcrumb', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppList.open(ws)
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getCard(0).waitForVisible()
    KintoAppList.getCard(0).click()
    KintoAppManage.form.waitForVisible()
    KintoAppManage.kaListDropDownBtn.click()
    KintoAppManage.kaDropDownVisible.waitForVisible()
    KintoAppManage.createNewKaBtnInBreadcrumb.click()
    KintoAppCreate.form.waitForVisible()
    expect(KintoAppCreate.form.isVisible()).to.eql(true)
  })

  //TC_362
  it('should navigate to KA manage page, when user clicks on any KA from drop down visible via `...` button next to KA name in KA manage page breadcrumb', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppList.open(ws)
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getCard(0).waitForVisible()
    KintoAppList.getCard(0).click()
    KintoAppManage.form.waitForVisible()
    KintoAppManage.kaListDropDownBtn.click()
    KintoAppManage.kaDropDownVisible.waitForVisible()
    var kaName = KintoAppManage.getKaNameFromDropDown(1).getText()
    KintoAppManage.getKaFromBreadcrumbDropDown(1).click()
    KintoAppManage.form.waitForVisible()
    expect(KintoAppManage.title.getText()).to.eql(kaName)
  })

  //TC_363
  it('should navigate user to KA create page, when user enters URL of KA create page', () => {
    //Previously where are in KA manage page
    expect(KintoAppManage.form.isVisible()).to.eql(true)
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    browser.url(`app/dashboard/${ws}/kintoapps/create`)
    KintoAppCreate.form.waitForVisible()
    expect(KintoAppCreate.form.isVisible()).to.eql(true)
  })

  //TC_364
  it('should navigate to KA manage page, when user enters URL of KA manage page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppList.open(ws)
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getCard(0).waitForVisible()
    KintoAppList.getCard(0).click()
    KintoAppManage.form.waitForVisible()
    var kaName = KintoAppManage.title.getText()
    var url = KintoAppManage.getUrl()
    //Redirecting to KA create page
    KintoAppCreate.open(ws)
    KintoAppCreate.form.waitForVisible()
    browser.url(url)
    KintoAppManage.form.waitForVisible()
    expect(KintoAppManage.form.isVisible()).to.eql(true)
    expect(KintoAppManage.title.getText()).to.eql(kaName)
  })

  //TC_365
  it('should navigate user to KA manage page, when user clicks on draft option from draft drop down visible via `...` button next to draft in breadcrumb', () => {
    //Already in KA manage page
    //if this fails check whether environments are created or not
    KintoAppManage.draftDropDownFromBreadcrumb.click()
    KintoAppList.kaListDropDown.waitForVisible()
    var tag = KintoAppManage.getTagNumberFromDraftDropDown(2).getText()
    KintoAppManage.getTagNumberFromDraftDropDown(2).click()
    KintoAppManage.form.waitForVisible()
    expect(KintoAppManage.tagNumberFromBreadcrumb.getText()).to.eql(tag)
    KintoAppManage.draftDropDownFromBreadcrumb.click()
    KintoAppList.kaListDropDown.waitForVisible()
    KintoAppManage.draftOptionFromDraftDropDown.click()
    KintoAppManage.form.waitForVisible()
    expect(KintoAppManage.form.isVisible()).to.eql(true)
  })

  //TC_366
  it('sdhould display KA create page title as `Create New Application`', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppCreate.open(ws)
    KintoAppCreate.form.waitForVisible()
    expect(KintoAppCreate.createKintoAppTitle.getText()).to.eql(
      'Create New Application'
    )
  })

  //TC_383
  it('should verify that `create new application` button on bottom right of KA create page is disabled/unclickable', () => {
    expect(KintoAppCreate.kaCreateNewApplicationBtnDisabled.isVisible()).to.eql(
      true
    )
  })

  //TC_385
  it('should verify that `create new application` is only clickable, but not creating KA. If validation condition fails', () => {
    KintoAppCreate.name.input.setValue(testData.kintoapp.invalidThreeCharKaName)
    browser.keys('Tab')
    expect(KintoAppCreate.name.error.getText()).to.eql(
      'Must be 3 characters or more'
    )
    KintoAppCreate.shortDescription.input.setValue(
      testData.kintoapp.invalidKintoAppDescription
    )
    browser.keys('Tab')
    expect(KintoAppCreate.shortDescription.error.getText()).to.eql(
      'Must be 200 characters or less'
    )
    expect(KintoAppCreate.kaCreateNewApplicationBtnDisabled.isVisible()).to.eql(
      false
    )
  })

  //TC_367
  it('should display KA manage page title as per KA selected', () => {
    DashboardIndex.applicationLeftnav.click()
    browser.alertAccept()
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getCard(0).waitForVisible()
    var kaName = KintoAppList.getKaNameFromKaCard(0).getText()
    KintoAppList.getCard(0).click()
    KintoAppManage.form.waitForVisible()
    expect(KintoAppManage.title.getText()).to.eql(kaName)
  })

  //TC_368
  it('should display projects members bar in KA create page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppCreate.open(ws)
    KintoAppCreate.form.waitForVisible()
    expect(KintoAppCreate.membersToolBar.isVisible()).to.eql(true)
  })

  //TC_370
  it('should display basic component in KA create page', () => {
    expect(KintoAppCreate.basicInfoComponent.isVisible()).to.eql(true)
  })

  //TC_372
  it('should display dependencies component in KA create page', () => {
    expect(KintoAppCreate.dependenciesComponent.isVisible()).to.eql(true)
  })

  //TC_374
  it('should display validation error `Must be 3 characters or more`, when KA name is less than 3 characters in KA create page', () => {
    KintoAppCreate.name.input.setValue(testData.kintoapp.invalidThreeCharKaName)
    browser.keys('Tab')
    expect(KintoAppCreate.name.error.getText()).to.eql(
      'Must be 3 characters or more'
    )
  })

  //TC_376
  it('should display validation error `Must be 35 characters or less`, when KA name is more than 35 characters in KA create page', () => {
    KintoAppCreate.name.input.setValue(
      testData.kintoapp.invalidThirtyFiveCharKaName
    )
    browser.keys('Tab')
    expect(KintoAppCreate.name.error.getText()).to.eql(
      'Must be 35 characters or less'
    )
  })

  //TC_378
  it('should display valiadation error `Only lowercase characters and digits are allowed`, when user enters other than letters in lowercase and numbers in KA name field of KA manage page', () => {
    KintoAppCreate.name.input.setValue(testData.kintoapp.allInvalidKaChars)
    KintoAppCreate.name.input.setValue(testData.kintoapp.allInvalidKaChars)
    KintoAppCreate.name.error.waitForVisible()
    expect(KintoAppCreate.name.error.getText()).to.eql(
      'Only lowercase characters and digits are allowed'
    )
  })

  //TC_380
  it('should do validation blur if user enters valid data in KA name field of KA create page in second try', () => {
    //Previously name field is showing validation error
    KintoAppCreate.name.input.setValue(testData.kintoapp.validKintoAppName)
    expect(KintoAppCreate.name.error.isVisible()).to.eql(false)
  })

  //TC_382
  it('should display `create new application` button on bottom right of KA create page', () => {
    expect(KintoAppCreate.submitBtn.getText()).to.eql('Create New Application')
    expect(KintoAppCreate.submitBtn.isVisible()).to.eql(true)
  })

  //TC_389
  it('should navigate to KA create page, when user clicks on `+` icon of applicatons in side bar while user is in KA create page with validation errors', () => {
    KintoAppCreate.name.input.setValue(testData.kintoapp.invalidThreeCharKaName)
    browser.keys('Tab')
    expect(KintoAppCreate.name.error.getText()).to.eql(
      'Must be 3 characters or more'
    )
    DashboardIndex.kaHoveraddicon.click()
    browser.alertAccept()
    KintoAppCreate.form.waitForVisible()
    expect(KintoAppCreate.name.error.isVisible()).to.eql(false)
  })

  //TC_369
  it('should diplay projects members bar in KA manage page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppList.open(ws)
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getCard(0).waitForVisible()
    KintoAppList.getCard(0).click()
    KintoAppManage.form.waitForVisible()
    expect(KintoAppCreate.membersToolBar.isVisible()).to.eql(true)
  })

  //TC_371
  it('should display basic info component in KA manage page', () => {
    expect(KintoAppCreate.basicInfoComponent.isVisible()).to.eql(true)
  })

  //TC_373
  it('should display dependencies component in KA manage page', () => {
    expect(KintoAppCreate.dependenciesComponent.isVisible()).to.eql(true)
  })

  //TC_386
  it('should verify that `Tag and Deploy` button is changes to `save changes` button, when user edits in KA manage page', () => {
    expect(KintoAppManage.kaTagNDeploy.getText()).to.eql('Tag and Deploy')
    KintoAppManage.name.input.setValue(testData.kintoapp.validKANamewithChars)
    expect(KintoAppManage.submitBtn.getText()).to.eql('Save Changes')
  })

  //TC_387
  it('should verify that `save changes` button is changes to `Tag and Deploy` button, when user clicks on `save changes` after editing', () => {
    //Already its save changes button only
    KintoAppManage.submitGlobal()
    browser.pause(3000)
    expect(KintoAppManage.kaTagNDeploy.getText()).to.eql('Tag and Deploy')
  })

  //TC_388
  it('should verify that `save changes` button is clickable, but doesn`t save the changes if validation conditions are not met', () => {
    KintoAppManage.form.waitForVisible()
    KintoAppManage.name.input.setValue(testData.kintoapp.invalidThreeCharKaName)
    browser.keys('Tab')
    expect(KintoAppManage.name.error.getText()).to.eql(
      'Must be 3 characters or more'
    )
    KintoAppCreate.shortDescription.input.setValue(
      testData.kintoapp.invalidKintoAppDescription
    )
    browser.keys('Tab')
    expect(KintoAppCreate.shortDescription.error.getText()).to.eql(
      'Must be 200 characters or less'
    )
    expect(KintoAppManage.submitBtn.getText()).to.eql('Save Changes')
    KintoAppManage.submitGlobal()
    expect(KintoAppManage.submitBtn.getText()).to.eql('Save Changes')
  })

  //TC_375
  it('should display validation error `Must be 3 characters or more`, when KA name is less than 3 characters in KA manage page', () => {
    KintoAppManage.name.input.setValue(testData.kintoapp.invalidThreeCharKaName)
    browser.keys('Tab')
    expect(KintoAppManage.name.error.getText()).to.eql(
      'Must be 3 characters or more'
    )
  })

  //TC_377
  it('should display validation error `Must be 35 characters or less`, when KA name is more than 35 characters in KA manage page', () => {
    KintoAppManage.name.input.setValue(
      testData.kintoapp.invalidThirtyFiveCharKaName
    )
    browser.keys('Tab')
    expect(KintoAppManage.name.error.getText()).to.eql(
      'Must be 35 characters or less'
    )
  })

  //TC_379
  it('should display valiadation error `Only lowercase characters and digits are allowed`, when user enters other than letters in lowercase and numbers in KA name field of KA manage page', () => {
    KintoAppManage.name.input.setValue(testData.kintoapp.validKintoAppName)
    KintoAppManage.name.input.setValue(testData.kintoapp.allInvalidKaChars)
    KintoAppManage.name.error.waitForVisible()
    expect(KintoAppManage.name.error.getText()).to.eql(
      'Only lowercase characters and digits are allowed'
    )
  })

  // TC_381
  it('should do validation blur if user enters valid data in KA name field of KA manage page in second try', () => {
    //Previously name field is showing validation error
    KintoAppManage.name.input.setValue(testData.kintoapp.validKintoAppName)
    expect(KintoAppManage.name.error.isVisible()).to.eql(false)
    DashboardIndex.applicationLeftnav.click()
    browser.alertAccept()
  })
})

describe('KA - Basic info component', () => {
  //TC_410
  it('should verify basic info component fields are empty on opening KA create form', () => {
    //Look into script
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppCreate.open(ws)
    KintoAppCreate.form.waitForVisible()
    expect(KintoBlockCreate.nameField.getText()).to.eql('')
    expect(KintoBlockCreate.description.getText()).to.eql('')
  })

  //TC_389
  it('should display title as `Basic Info` for basic info component in KA create page', () => {
    expect(KintoAppCreate.basicInfoComponentTitle.getText()).to.eql(
      'Basic Info'
    )
  })

  //TC_392
  it('should display  subtitle as "Choose the name for this application and give a a short description. If you make the application public, this will help other people discover your application." in KA create page.', () => {
    expect(KintoAppCreate.basicInfoComponentSubtitle.getText()).to.eql(
      'Choose the name for this application and give a a short description. If you make the application public, this will help other people discover your application.'
    )
  })

  //TC_395
  it('should display titles for text fields in basic info component of KA create page', () => {
    expect(KintoAppCreate.basicInfoComponentNameFieldTitle.getText()).to.eql(
      'APPLICATION NAME'
    )
    expect(
      KintoAppCreate.basicInfoComponentDescriptionFieldTitle.getText()
    ).to.eql('DESCRIPTION')
  })

  // //TC_398
  // it('should display one line input field and text area field under basic info component in KA create page', () => {
  //   $("input#name").each(function () {
  //     var $this = $(this);
  //     if ($this.is("input")) {
  //       return true;
  //     }
  //     else if ($this.is("textarea")) {
  //       return false;
  //     }
  //   });
  //   $("textarea#shortDescription").each(function () {
  //     var $this = $(this);
  //     if ($this.is("input")) {
  //       return false;
  //     }
  //     else if ($this.is("textarea")) {
  //       return true;
  //     }
  //   });
  // })

  //TC_401
  it('should display placeholder text as `Enter a name for your application` in application name field of KA create page', () => {
    var placeHolder = KintoBlockCreate.nameField.getAttribute('placeholder')
    expect(placeHolder).to.eql('Enter a name for your application')
  })

  //TC_404
  it('should display placeholder text as `Enter a short description of your application` in description text area of KA create page', () => {
    var placeHolder = KintoBlockCreate.description.getAttribute('placeholder')
    expect(placeHolder).to.eql('Enter a short description of your application')
  })

  //TC_407
  it('should validate text fields in basic info component in KA create page with blur', () => {
    KintoAppCreate.name.input.setValue(testData.kintoapp.validKintoAppName)
    //TODO validation blur
  })

  //TC_411
  it('should verify that `create new application` button is enabled/clickable', () => {
    expect(KintoAppCreate.kaCreateNewApplicationBtnDisabled.isVisible()).to.eql(
      false
    )
  })

  //TC_412
  it('should dispaly validation error message `Required`, when user clicks `create new application` without entering application description', () => {
    KintoAppCreate.submitGlobal()
    KintoAppCreate.shortDescription.error.waitForVisible()
    expect(KintoAppCreate.shortDescription.error.getText()).to.eql('Required')
  })

  //TC_419
  it('should display max count `200` above top right of application description text box in KA create page', () => {
    expect(KintoAppManage.appDescriptonMaxCount.getText()).to.eql('200')
  })

  //TC_422
  it('should verify that max count `200` of application description in KA create page reduces as per text entered', () => {
    KintoAppManage.description.input.click()
    KintoAppManage.description.input.setValue(
      testData.kintoapp.validKintoAppDescription
    )
    expect(KintoAppManage.appDescriptonMaxCount.getText()).to.eql('171')
  })

  //TC_425
  it('should display text `owner` for user of that kintohub account in members tool bar of KA create page', () => {
    expect(KintoAppCreate.ownerTextFromMembersBar.getText()).to.eql('Owner')
  })

  //TC_428
  it('should display alert message in KA create page, when try to navigate from create page after entering application name and description', () => {
    KintoAppCreate.name.input.setValue(testData.kintoapp.validKintoAppName)
    KintoAppCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescriptionWithChars
    )
    DashboardIndex.applicationLeftnav.click()
    browser.alertAccept()
  })

  //TC_431
  it('should navigate to requested page, when user accepts the alert message in KA create page', () => {
    //Already requested page
    KintoAppList.mykintoAppList.waitForVisible()
    expect(KintoAppList.mykintoAppList.isVisible()).to.eql(true)
  })

  //TC_434
  it('should not navigate to requested page, when user clicks `cancel` in alert pop up of KA create page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppCreate.open(ws)
    KintoAppCreate.form.waitForVisible()
    KintoAppCreate.name.input.setValue(testData.kintoapp.validKintoAppName)
    DashboardIndex.applicationLeftnav.click()
    browser.alertDismiss()
    expect(KintoAppCreate.form.isVisible()).to.eql(true)
    DashboardIndex.applicationLeftnav.click()
    browser.alertAccept()
  })

  //TC_413
  it('should display previous saved text in application name and description of selected KA in KA manage', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppList.open(ws)
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getCard(0).waitForVisible()
    KintoAppList.getCard(0).click()
    KintoAppManage.form.waitForVisible()
    expect(KintoBlockCreate.nameField.getValue()).to.eql(
      testData.kintoapp.validKANamewithChars
    )
    expect(KintoBlockCreate.description.getText()).to.eql(
      testData.kintoapp.validKintoAppDescription
    )
  })

  //TC_426
  it('should display text `owner` for user of that kintohub account in members tool bar of KA manage page', () => {
    expect(KintoAppCreate.ownerTextFromMembersBar.getText()).to.eql('Owner')
  })

  //TC_390
  it('should display title as `Basic Info` for basic info component in KA manage page', () => {
    expect(KintoAppCreate.basicInfoComponentTitle.getText()).to.eql(
      'Basic Info'
    )
  })

  //TC_393
  it('should display subtitle as "Choose the name for this application and give a a short description. If you make the application public, this will help other people discover your application." in KA manage page.', () => {
    expect(KintoAppCreate.basicInfoComponentSubtitle.getText()).to.eql(
      'Choose the name for this application and give a a short description. If you make the application public, this will help other people discover your application.'
    )
  })

  //TC_396
  it('should display titles for text fields in basic info component of KA manage page', () => {
    expect(KintoAppCreate.basicInfoComponentNameFieldTitle.getText()).to.eql(
      'APPLICATION NAME'
    )
    expect(
      KintoAppCreate.basicInfoComponentDescriptionFieldTitle.getText()
    ).to.eql('DESCRIPTION')
  })

  //   //TC_399
  //   it('should display one line input field and text area field under basic info component in KA manage page', () => {
  //     $("input#name").each(function () {
  //       var $this = $(this);
  //       if ($this.is("input")) {
  //         return true;
  //       }
  //       else if ($this.is("textarea")) {
  //         return false;
  //       }
  //     });
  //     $("textarea#shortDescription").each(function () {
  //       var $this = $(this);
  //       if ($this.is("input")) {
  //         return false;
  //       }
  //       else if ($this.is("textarea")) {
  //         return true;
  //       }
  //     });
  //   })
  // })

  //TC_402
  it('should display placeholder text as `Enter a name for your application` in application name field of KA manage page', () => {
    var placeHolder = KintoBlockCreate.nameField.getAttribute('placeholder')
    expect(placeHolder).to.eql('Enter a name for your application')
  })

  //TC_405
  it('should display placeholder text as `Enter a short description of your application` in description text area of KA manage page', () => {
    var placeHolder = KintoBlockCreate.description.getAttribute('placeholder')
    expect(placeHolder).to.eql('Enter a short description of your application')
  })

  //TC_408
  it('should validate text fields in basic info component in KA manage page with blur', () => {
    KintoAppManage.name.input.setValue(testData.kintoapp.validKintoAppName)
    KintoAppManage.description.input.setValue(
      testData.kintoapp.validKintoAppDescription
    )
    //TODO validation blur
  })

  //TC_414
  it('should allow user to edit and save basic component fields for infinite times in KA manage page', () => {
    KintoAppManage.submitGlobal()
    KintoAppManage.name.input.setValue(testData.kintoapp.validKANameWithDash)
    KintoAppManage.description.input.setValue(
      testData.kintoapp.validKintoAppDescriptionWithChars
    )
    KintoAppManage.submitGlobal()
    KintoAppManage.name.input.setValue(testData.kintoapp.validKintoAppName)
    KintoAppManage.description.input.setValue(
      testData.kintoapp.validKintoAppDescription
    )
    KintoAppManage.submitGlobal()
    KintoAppManage.name.input.setValue(testData.kintoapp.validKANameWithDash)
    KintoAppManage.description.input.setValue(
      testData.kintoapp.validKintoAppDescriptionWithChars
    )
    KintoAppManage.submitGlobal()
    KintoAppManage.name.input.setValue(testData.kintoapp.validKANamewithChars)
    KintoAppManage.description.input.setValue(
      testData.kintoapp.validKintoAppDescription
    )
    KintoAppManage.submitGlobal()
  })

  //TC_416
  it('should reflect changes of KA name made in KA manage page, where ever its displayed', () => {
    KintoAppManage.name.input.setValue(testData.kintoapp.validKANamewithDot)
    KintoAppManage.submitGlobal()
    browser.pause()
    expect(KintoAppManage.title.getText()).to.eql(
      testData.kintoapp.validKANamewithDot
    )
    expect(KintoBlockCreate.nameField.getValue()).to.eql(
      testData.kintoapp.validKANamewithDot
    )
    expect(EnvironmentList.kaFromEnvListBreadcrumb.getText()).to.eql(
      testData.kintoapp.validKANamewithDot
    )
    KintoAppManage.kaListDropDownBtn.click()
    KintoAppManage.kaDropDownVisible.waitForVisible()
    //check with index
    expect(KintoAppManage.getKaNameFromDropDown(1).getText()).to.eql(
      testData.kintoapp.validKANamewithDot
    )
    KintoAppManage.viewEnvironments.click()
    EnvironmentList.envList.waitForVisible()
    //TODO get KA name from env list subtitle
    EnvironmentList.kaFromEnvListBreadcrumb.click()
    KintoAppManage.form.waitForVisible()
    KintoAppManage.draftDropDownFromBreadcrumb.click()
    KintoAppList.kaListDropDown.waitForVisible()
    KintoAppManage.getTagNumberFromDraftDropDown(2).click()
    KintoAppManage.form.waitForVisible()
    expect(KintoAppManage.title.getText()).to.eql(
      testData.kintoapp.validKANamewithDot
    )
    expect(KintoBlockCreate.nameField.getText()).to.eql(
      testData.kintoapp.validKANamewithDot
    )
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppList.open(ws)
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getCard(0).waitForVisible()
    expect(KintoAppList.getKaNameFromKaCard(0).getText()).to.eql(
      testData.kintoapp.validKANamewithDot
    )
  })

  //TC_423
  it('should verify that max count `200` of application description in KA manage page reduces as per text entered', () => {
    KintoAppManage.description.input.click()
    KintoAppManage.description.input.setValue(
      testData.kintoapp.validKintoAppDescription
    )
    expect(KintoAppManage.appDescriptonMaxCount.getText()).to.eql('171')
  })

  //TC_420
  it('should display max count `200` above top right of application description text box in KA manage page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppList.open(ws)
    browser.alertAccept()
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getCard(0).waitForVisible()
    KintoAppList.getCard(0).click()
    KintoAppManage.form.waitForVisible()
    expect(KintoAppManage.appDescriptonMaxCount.getText()).to.eql('200')
  })

  //TC_429
  it('should display alert message in KA manage page, when try to navigate from create page after entering application name and description', () => {
    KintoAppManage.name.input.setValue(testData.kintoapp.validKintoAppName)
    KintoAppManage.description.input.setValue(
      testData.kintoapp.validKintoAppDescriptionWithChars
    )
  })

  //TC_432
  it('should navigate to requested page, when user accepts the alert message in KA manage page', () => {
    //Already in kinto app manage page
    DashboardIndex.applicationLeftnav.click()
    browser.alertAccept()
    KintoAppList.mykintoAppList.waitForVisible()
    expect(KintoAppList.mykintoAppList.isVisible()).to.eql(true)
  })

  //TC_435
  it('should not navigate to requested page, when user clicks `cancel` in alert pop up of KA manage page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppList.open(ws)
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getCard(0).waitForVisible()
    KintoAppList.getCard(0).click()
    KintoAppManage.form.waitForVisible()
    KintoAppCreate.name.input.setValue(testData.kintoapp.validKintoAppName)
    DashboardIndex.applicationLeftnav.click()
    browser.alertDismiss()
    expect(KintoAppCreate.form.isVisible()).to.eql(true)
    DashboardIndex.applicationLeftnav.click()
    browser.alertAccept()
  })

  //TC_391
  it('should display title as `Basic Info` for basic component in KA tagged page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppList.open(ws)
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getCard(0).waitForVisible()
    KintoAppList.getkaListDropDown(0).click()
    KintoAppList.kaListDropDown.waitForVisible()
    KintoAppList.getKaListDropDownViewTags(0).click()
    KintoAppList.kaListDropDown.waitForVisible()
    KintoAppList.getTaggedVersionNumberFromKaDropDown(0, 2).waitForVisible()
    KintoAppList.getTaggedVersionNumberFromKaDropDown(0, 2).click()
    KintoAppManage.form.waitForVisible()
    expect(KintoAppCreate.basicInfoComponentTitle.getText()).to.eql(
      'Basic Info'
    )
  })

  //TC_427
  it('should display text `owner` for user of that kintohub account in members tool bar of KA tagged page', () => {
    expect(KintoAppCreate.ownerTextFromMembersBar.getText()).to.eql('Owner')
  })

  //TC_394
  it('should display subtitle as "Choose the name for this application and give a a short description. If you make the application public, this will help other people discover your application." in KA tagged page.', () => {
    expect(KintoAppCreate.basicInfoComponentSubtitle.getText()).to.eql(
      'Choose the name for this application and give a a short description. If you make the application public, this will help other people discover your application.'
    )
  })

  //TC_397
  it('should display titles for text fields in basic info component of KA tagged page', () => {
    expect(KintoAppCreate.basicInfoComponentNameFieldTitle.getText()).to.eql(
      'APPLICATION NAME'
    )
    expect(
      KintoAppCreate.basicInfoComponentDescriptionFieldTitle.getText()
    ).to.eql('DESCRIPTION')
  })

  // //TC_400
  // it('should display one line input field and text area field under basic info component in KA tagged page', () => {
  //   $("input#name").each(function () {
  //     var $this = $(this);
  //     if ($this.is("input")) {
  //       return true;
  //     }
  //     else if ($this.is("textarea")) {
  //       return false;
  //     }
  //   });
  //   $("textarea#shortDescription").each(function () {
  //     var $this = $(this);
  //     if ($this.is("input")) {
  //       return false;
  //     }
  //     else if ($this.is("textarea")) {
  //       return true;
  //     }
  //   });
  // })

  //TC_403
  it('should display placeholder text as `Enter a name for your application` in application name field of KA tagged page', () => {
    var placeHolder = KintoBlockCreate.nameField.getAttribute('placeholder')
    expect(placeHolder).to.eql('Enter a name for your application')
  })

  //TC_406
  it('should display placeholder text as `Enter a short description of your application` in description text area of KA tagged page', () => {
    var placeHolder = KintoBlockCreate.description.getAttribute('placeholder')
    expect(placeHolder).to.eql('Enter a short description of your application')
  })

  //TC_409
  it('should validate text fields in basic info component in KA tagged page with blur', () => {
    KintoAppCreate.name.input.setValue(testData.kintoapp.validKintoAppName)
    KintoAppCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescriptionWithChars
    )
    //TODO validation blur
  })

  //TC_415
  it('should allow user to edit and save basic component fields for infinite times in KA tagged page', () => {
    KintoAppManage.submitGlobal()
    KintoAppManage.name.input.setValue(testData.kintoapp.validKANameWithDash)
    KintoAppManage.description.input.setValue(
      testData.kintoapp.validKintoAppDescription
    )
    KintoAppManage.submitGlobal()
    KintoAppManage.name.input.setValue(testData.kintoapp.validKintoAppName)
    KintoAppManage.description.input.setValue(
      testData.kintoapp.validKintoAppDescriptionWithChars
    )
    KintoAppManage.submitGlobal()
    KintoAppManage.name.input.setValue(testData.kintoapp.validKANameWithDash)
    KintoAppManage.description.input.setValue(
      testData.kintoapp.validKintoAppDescription
    )
    KintoAppManage.submitGlobal()
    KintoAppManage.name.input.setValue(testData.kintoapp.validKANamewithChars)
    KintoAppManage.description.input.setValue(
      testData.kintoapp.validKintoAppDescriptionWithChars
    )
    KintoAppManage.submitGlobal()
  })

  //TC_417
  it('should verify that only application name and description are editable in KA tagged page', () => {
    KintoAppManage.name.input.setValue(testData.kintoapp.validKANameWithDash)
    KintoAppManage.description.input.setValue(
      testData.kintoapp.validKintoAppDescription
    )
    KintoAppManage.submitGlobal()
    //TODO check toggle switch button
    //TODO check delete icon
  })

  //TC_418
  it('should reflect changes of KA name made in KA tagged page, where ever its displayed', () => {
    KintoAppManage.name.input.setValue(testData.kintoapp.validKANamewithDot)
    KintoAppManage.submitGlobal()
    browser.pause(2000)
    expect(KintoAppManage.title.getText()).to.eql(
      testData.kintoapp.validKANamewithDot
    )
    expect(KintoBlockCreate.nameField.getValue()).to.eql(
      testData.kintoapp.validKANamewithDot
    )
    expect(EnvironmentList.kaFromEnvListBreadcrumb.getText()).to.eql(
      testData.kintoapp.validKANamewithDot
    )
    KintoAppManage.kaListDropDownBtn.click()
    KintoAppManage.kaDropDownVisible.waitForVisible()
    expect(KintoAppManage.getKaNameFromDropDown(1).getText()).to.eql(
      testData.kintoapp.validKANamewithDot
    )
    KintoAppManage.viewEnvironments.click()
    EnvironmentList.envList.waitForVisible()
    //TODO get KA name from env list subtitle
    EnvironmentList.kaFromEnvListBreadcrumb.click()
    KintoAppManage.form.waitForVisible()
    KintoAppManage.draftDropDownFromBreadcrumb.click()
    KintoAppList.kaListDropDown.waitForVisible()
    KintoAppManage.getTagNumberFromDraftDropDown(1).click()
    KintoAppManage.form.waitForVisible()
    expect(KintoAppManage.title.getText()).to.eql(
      testData.kintoapp.validKANamewithDot
    )
    expect(KintoBlockCreate.nameField.getValue()).to.eql(
      testData.kintoapp.validKANamewithDot
    )
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppList.open(ws)
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getCard(0).waitForVisible()
    expect(KintoAppList.getKaNameFromKaCard(0).getText()).to.eql(
      testData.kintoapp.validKANamewithDot
    )
  })

  //TC_421
  it('should display max count `200` above top right of application description text box in KA tagged page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppList.open(ws)
    KintoAppList.getCard(0).waitForVisible()
    KintoAppList.getCard(0).click()
    KintoAppManage.form.waitForVisible()
    KintoAppManage.draftDropDownFromBreadcrumb.click()
    KintoAppManage.getTagNumberFromDraftDropDown(2).waitForVisible()
    KintoAppManage.getTagNumberFromDraftDropDown(2).click()
    KintoAppManage.form.waitForVisible()
    expect(KintoAppManage.appDescriptonMaxCount.getText()).to.eql('200')
  })

  //TC_424
  it('should verify that max count `200` of application description in KA tagged page reduces as per text entered', () => {
    KintoAppManage.description.input.click()
    KintoAppManage.description.input.setValue(
      testData.kintoapp.validKintoAppDescription
    )
    expect(KintoAppManage.appDescriptonMaxCount.getText()).to.eql('171')
  })

  //TC_430
  it('should display alert message in KA tagged page, when try to navigate from create page after entering application name and description', () => {
    KintoAppManage.name.input.setValue(testData.kintoapp.validKintoAppName)
    KintoAppManage.description.input.setValue(
      testData.kintoapp.validKintoAppDescriptionWithChars
    )
  })

  //TC_433
  it('should navigate to requested page, when user accepts the alert message in KA manage page', () => {
    DashboardIndex.applicationLeftnav.click()
    browser.alertAccept()

    KintoAppList.mykintoAppList.waitForVisible()
    expect(KintoAppList.mykintoAppList.isVisible()).to.eql(true)
  })

  //TC_436
  it('should not navigate to requested page, when user clicks `cancel` in alert pop up of KA tagged page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppList.open(ws)
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getCard(0).waitForVisible()
    KintoAppList.getkaListDropDown(0).click()
    KintoAppList.kaListDropDown.waitForVisible()
    KintoAppList.getKaListDropDownViewTags(0).click()
    KintoAppList.kaListDropDown.waitForVisible()
    KintoAppList.getTaggedVersionNumberFromKaDropDown(0, 2).waitForVisible()
    KintoAppList.getTaggedVersionNumberFromKaDropDown(0, 2).click()
    KintoAppManage.form.waitForVisible()
    KintoAppCreate.name.input.setValue(testData.kintoapp.validKintoAppName)
    DashboardIndex.applicationLeftnav.click()
    browser.alertDismiss()
    expect(KintoAppCreate.form.isVisible()).to.eql(true)
    DashboardIndex.applicationLeftnav.click()
    browser.alertAccept()
  })
})

describe('manage kintoApp', () => {
  it('should show ka manage when clicking on that kintoapp in list', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppList.open(ws)
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getCard(0).waitForVisible()
    const name = KintoAppList.getCard(0)
      .element('.name')
      .getText()
    KintoAppList.getCard(0).click()
    KintoAppManage.title.waitForVisible()
    expect(KintoAppManage.title.getText()).to.eq(name)
  })

  it('should show Tag and deploy button when we open a KA', () => {
    expect(KintoAppManage.kaTagNDeploy.isVisible()).to.eql(true)
  })

  it('should display Compare versions and View Environments for each KA', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppList.open(ws)
    KintoAppList.getCard(0).waitForVisible()
    KintoAppList.getCard(0).click()
    KintoAppManage.title.waitForVisible()
    expect(KintoAppManage.compareVersions.getText()).to.eql('Compare Versions')
    expect(KintoAppManage.viewEnvironments.getText()).to.eql(
      'View Environments'
    )
  })

  it('should allow user to edit the name of the KA', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppList.open(ws)
    KintoAppList.getCard(0).waitForVisible()
    KintoAppList.getCard(0).click()
    KintoAppManage.title.waitForVisible()
    KintoAppManage.name.input.click()
    KintoAppManage.name.input.setValue(
      testData.kintoapp.validUpdatedKintoAppName
    )
    KintoAppCreate.submitGlobal()
    KintoAppManage.kaTagNDeploy.waitForVisible()
    ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppList.open(ws)
    KintoAppList.getCard(0).waitForVisible()
    KintoAppList.getCard(0).click()
    KintoAppManage.title.waitForVisible()
    expect(KintoAppManage.title.getText()).to.eq(
      testData.kintoapp.validUpdatedKintoAppName
    )
  })

  it('should display Tag and Deploy modal with all fields required for deployment and environment as DEFAULT', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppList.open(ws)
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getCard(0).waitForVisible()
    KintoAppList.getCard(0).click()
    KintoAppManage.title.waitForVisible()
    KintoAppManage.kaTagNDeploy.waitForVisible()
    KintoAppManage.kaTagNDeploy.click()
    expect(KintoAppManage.majorVersion.isVisible()).to.eql(true)
    expect(KintoAppManage.minorVersion.isVisible()).to.eql(true)
    expect(KintoAppManage.revision.isVisible()).to.eql(true)
    expect(KintoAppManage.notes.isVisible()).to.eql(true)
    //add new as all options where got in get text below 23/3
    //expect(KintoAppManage.envName.getText()).to.eql('DEFAULT')
    var envOptions = KintoAppManage.envName.getText().split('\n')
    expect(envOptions[0]).to.eql('DEFAULT')
  })

  it('should display error message if Create button is clicked after selecting environment', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppList.open(ws)
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getCard(0).waitForVisible()
    KintoAppList.getCard(0).click()
    KintoAppManage.title.waitForVisible()
    KintoAppManage.kaTagNDeploy.waitForVisible()
    KintoAppManage.kaTagNDeploy.click()
    expect(KintoAppManage.majorVersion.isVisible()).to.eql(true)
    expect(KintoAppManage.minorVersion.isVisible()).to.eql(true)
    expect(KintoAppManage.revision.isVisible()).to.eql(true)
    expect(KintoAppManage.notes.isVisible()).to.eql(true)
    //add new as all options where got in get text below 23/3
    //expect(KintoAppManage.envName.getText()).to.eql('DEFAULT')
    var envOptions = KintoAppManage.envName.getText().split('\n')
    expect(envOptions[0]).to.eql('DEFAULT')
    expect(KintoAppManage.cancelTagBtn.isVisible()).to.eql(true)
    expect(KintoAppManage.createTagBtnDisabled.isVisible()).to.eql(true)
  })

  it('should show error messages when mandatory fields version and revision are not filled for tag and deploy ', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppList.open(ws)
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getCard(0).waitForVisible()
    KintoAppList.getCard(0).click()
    KintoAppManage.title.waitForVisible()
    KintoAppManage.name.input.setValue(testData.kintoapp.validKANameWithDollar)
    KintoAppCreate.submitGlobal() // Save changes
    KintoAppManage.kaTagNDeploy.waitForVisible()
    KintoAppManage.kaTagNDeploy.click()
    KintoAppManage.majorVersion.click()
    KintoAppManage.minorVersion.click()
    KintoAppManage.createTagBtn.click()
    KintoAppManage.tagDeployErrMsg.waitForVisible()
    expect(KintoAppManage.tagDeployErrMsg.getText()).to.eql('Required')
    KintoAppManage.majorVersion.setValue('1')
    KintoAppManage.createTagBtn.click()
    expect(KintoAppManage.tagDeployErrMsg.getText()).to.eql('Required')
    KintoAppManage.minorVersion.setValue('2')
    KintoAppManage.createTagBtn.click()
    expect(KintoAppManage.tagDeployErrMsg.getText()).to.eql('Required')
    KintoAppManage.revision.setValue('3')
    KintoAppManage.notes.setValue(testData.kintoapp.validNotes)
    expect(KintoAppManage.tagDeployErrMsg.isVisible()).to.eql(false)
  })

  it('should allow user to tag and deploy changes to KA', () => {
    KintoAppManage.createTagBtn.click()
    KintoAppManage.envList.waitForVisible()
    KintoAppManage.successDeployMsg.waitForVisible()
    expect(KintoAppManage.successDeployVersion.getText()).to.eql('1.2.3')
  })

  it('should show error message if duplicate major,minor and revision values are entered', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppList.open(ws)
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getCard(0).waitForVisible()
    KintoAppList.getCard(0).click()
    KintoAppManage.title.waitForVisible()
    KintoAppManage.name.input.setValue(testData.kintoapp.validKANameWithDash)
    KintoAppCreate.submitGlobal() // Save changes
    KintoAppManage.kaTagNDeploy.waitForVisible()
    KintoAppManage.kaTagNDeploy.click()

    //Enter duplicate version details
    KintoAppManage.majorVersion.click()
    KintoAppManage.majorVersion.setValue('1')
    KintoAppManage.minorVersion.click()
    KintoAppManage.minorVersion.setValue('2')
    KintoAppManage.revision.setValue('3')
    KintoAppManage.notes.setValue(testData.kintoapp.validNotes)
    KintoAppManage.createTagBtn.click()
    KintoAppManage.errorMsgDuplicateVersion.waitForVisible()
    expect(KintoAppManage.errorMsgDuplicateVersion.getText()).to.eql(
      'Tag with the same version is already created'
    )
  })

  it('should allow user to tag and deploy without entering Notes', () => {
    KintoAppManage.cancelTagBtn.click()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppList.open(ws)
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getCard(0).waitForVisible()
    KintoAppList.getCard(0).click()
    KintoAppManage.title.waitForVisible()
    KintoAppManage.kaTagNDeploy.waitForVisible()
    KintoAppManage.kaTagNDeploy.click()
    KintoAppManage.majorVersion.setValue('1')
    KintoAppManage.minorVersion.setValue('2')
    KintoAppManage.revision.setValue('5')
    KintoAppManage.notes.click()
    KintoAppManage.createTagBtn.click()
    KintoAppManage.envList.waitForVisible()
    KintoAppManage.successDeployMsg.waitForVisible()
    expect(KintoAppManage.successDeployVersion.getText()).to.eql('1.2.5')
  })

  it('should allow user to view environment and add a new environment', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppList.open(ws)
    KintoAppList.mykintoAppList.waitForVisible()
    //changed index from 0 to 1
    KintoAppList.getCard(1).waitForVisible()
    KintoAppList.getCard(1).click()
    KintoAppManage.title.waitForVisible()
    KintoAppManage.viewEnvironments.click()
    KintoAppManage.addNewEnvironment.click()
    KintoAppManage.environmentName.setValue(testData.kintoapp.validEnvName)
    KintoAppManage.addEnvBtn.click()
    KintoAppManage.addNewEnvironment.waitForVisible()
    KintoAppManage.envListItem(2).waitForVisible()
    expect(
      KintoAppManage.envListItem(2)
        .element('.top > h3')
        .getText()
    ).to.eql(testData.kintoapp.validEnvName.toUpperCase()) // Environment name is in CAPS in the listing page
  })
})

describe('KA tagged page', () => {
  //TC_487
  it('should navigate user to KA tagged page, when user selects a tag from breadcrumb drop down of `draft` from KA manage page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppList.open(ws)
    KintoAppList.getCard(0).waitForVisible()
    KintoAppList.getCard(0).click()
    KintoAppManage.form.waitForVisible()
    KintoAppManage.draftDropDownFromBreadcrumb.click()
    KintoAppManage.getTagNumberFromDraftDropDown(2).waitForVisible()
    var tag = KintoAppManage.getTagNumberFromDraftDropDown(2).getText()
    KintoAppManage.getTagNumberFromDraftDropDown(2).click()
    KintoAppManage.form.waitForVisible()
    expect(tag).to.eql(KintoAppManage.tagNumberFromBreadcrumb.getText())
  })

  //TC_495
  it('should display deploy button on bottom right of KA tagged page as default and clickable', () => {
    expect(KintoAppManage.deployBtn.isEnabled()).to.eql(true)
    KintoAppManage.deployBtn.click() //To check whether clickable
    KintoAppManage.tagDeployModal.waitForVisible()
    //deploy pop up displayed
    expect(KintoAppManage.tagDeployModal.isVisible()).to.eql(true)
    KintoAppManage.cancelTagBtn.click()
  })

  //TC_498
  it('should verify that dependency component is non-editable in KA tagged page', () => {
    KintoAppCreate.dependenciesComponent.waitForVisible()
    expect(KintoAppCreate.kbdropDown.isVisible()).to.eql(false)
    expect(KintoBlockManage.getDependenciesDeleteIcon(1).isVisible()).to.eql(
      false
    )
  })

  //TC_488
  it('should navigate user to KA tagged page, when user enters URL of KA tagged page', () => {
    //Already in KA tagged page
    var url = KintoAppManage.getUrl().split('/')
    var ws = url[3]
    var kaID = url[5]
    var tag = url[7]
    KintoAppManage.draftDropDownFromBreadcrumb.click()
    KintoAppManage.getTagNumberFromDraftDropDown(2).waitForVisible()
    var tagNumber = KintoAppManage.getTagNumberFromDraftDropDown(2).getText()
    KintoAppManage.getTagNumberFromDraftDropDown(2).click()
    //navigating to KA list page
    DashboardIndex.applicationLeftnav.click()
    expect(DashboardIndex.getUrl()).to.eql(
      `/app/dashboard/${ws}/kintoapps/list`
    )
    browser.url(`app/dashboard/${ws}/kintoapps/${kaID}/versions/${tag}`)
    KintoAppManage.form.waitForVisible()
    expect(tagNumber).to.eql(KintoAppManage.tagNumberFromBreadcrumb.getText())
  })

  //TC_489
  it('should display KA tagged page title as per KA selected', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppList.open(ws)
    KintoAppList.getCard(0).waitForVisible()
    var kaName = KintoAppList.getKaNameFromKaCard(0).getText()
    KintoAppList.getCard(0).click()
    KintoAppManage.form.waitForVisible()
    KintoAppManage.draftDropDownFromBreadcrumb.click()
    KintoAppManage.getTagNumberFromDraftDropDown(2).waitForVisible()
    KintoAppManage.getTagNumberFromDraftDropDown(2).click()
    KintoAppManage.form.waitForVisible()
    expect(kaName).to.eql(KintoAppManage.title.getText())
  })

  //TC_490
  it('should display compare versions, view environments, members bar, basic info component, dependency component and deploy button in a KA tagged page', () => {
    KintoAppManage.compareVersions.waitForVisible()
    expect(KintoAppManage.compareVersions.isVisible()).to.eql(true)
    expect(KintoAppManage.viewEnvironments.isVisible()).to.eql(true)
    expect(KintoAppManage.membersBar.isVisible()).to.eql(true)
    expect(KintoAppCreate.basicInfoComponent.isVisible()).to.eql(true)
    expect(KintoAppCreate.dependenciesComponent.isVisible()).to.eql(true)
    expect(KintoAppManage.deployBtn.isVisible()).to.eql(true)
  })

  //TC_496
  it('should revert `deploy` button to `save changes` button, when user edits KA tagged page', () => {
    //Now its deploy button
    expect(KintoAppManage.deployBtn.getText()).to.eql('Deploy')
    KintoAppManage.name.input.setValue(testData.kintoapp.invalidThreeCharKaName)
    browser.pause(2000)
    expect(KintoAppManage.submitBtn.getText()).to.eql('Save Changes')
  })

  //TC_491
  it('should display validation error `Must be 3 characters or more`, when KA name is less than 3 characters in KA tagged page', () => {
    KintoAppManage.name.input.setValue(testData.kintoapp.invalidThreeCharKaName)
    browser.keys('Tab')
    expect(KintoAppManage.name.error.getText()).to.eql(
      'Must be 3 characters or more'
    )
  })

  //TC_492
  it('should display validation error `Must be 35 characters or less`, when KA name is more than 35 characters in KA tagged page', () => {
    KintoAppManage.name.input.setValue(
      testData.kintoapp.invalidThirtyFiveCharKaName
    )
    browser.keys('Tab')
    expect(KintoAppManage.name.error.getText()).to.eql(
      'Must be 35 characters or less'
    )
  })

  //TC_493
  it('should display valiadation error `Only lowercase characters and digits are allowed`, when user enters other than letters in lowercase and numbers in KA name field of KA tagged page', () => {
    KintoAppManage.name.input.setValue(testData.kintoapp.allInvalidKaChars)
    browser.keys('Tab')
    expect(KintoAppManage.name.error.getText()).to.eql(
      'Only lowercase characters and digits are allowed'
    )
  })

  it('should display valiadation error `The first character can`t be a digit`, when user enters number as first character in KA name field of KA tagged page', () => {
    KintoAppManage.name.input.setValue(
      testData.kintoapp.invalidKintoAppNameFirstCharNumber
    )
    browser.keys('Tab')
    expect(KintoAppManage.name.error.getText()).to.eql(
      `The first character can't be a digit`
    )
  })

  //TC_494
  it('should do validation blur if user enters valid data in KA name field of KA create page in second try', () => {
    //Previously name field is showing validation error
    KintoAppCreate.name.input.setValue(testData.kintoapp.validKintoAppName)
    expect(KintoAppCreate.name.error.isVisible()).to.eql(false)
  })

  //TC_497
  it('should verify that `save changes` button is still present, when user clicks `save changes` if there is any validation error ', () => {
    //Already deploy button is changed to save changes
    KintoAppManage.name.input.setValue(testData.kintoapp.invalidThreeCharKaName)
    browser.keys('Tab')
    expect(KintoAppManage.name.error.getText()).to.eql(
      'Must be 3 characters or more'
    )
    KintoAppManage.submitBtn.click()
    expect(KintoAppManage.submitBtn.getText()).to.eql('Save Changes')
  })

  //TC_499
  it('should navigated user to `compare versions` page, when user clicks on `compare versions` button in KA tagged page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppList.open(ws)
    browser.alertAccept()
    KintoAppList.getCard(0).waitForVisible()
    KintoAppList.getCard(0).click()
    KintoAppManage.form.waitForVisible()
    KintoAppManage.compareVersions.click()
    expect(KintoAppManage.compareVersionsTitle.getText()).to.eql('CHANGELOGS')
  })

  //TC_500
  it('should navigated to environments list page, when user clicks on `view environments` button in KA tagged page', () => {
    DashboardIndex.applicationLeftnav.click()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppList.open(ws)
    KintoAppList.getCard(0).waitForVisible()
    KintoAppList.getCard(0).click()
    KintoAppManage.form.waitForVisible()
    KintoAppManage.viewEnvironments.click()
    EnvironmentList.envList.waitForVisible()
    expect(EnvironmentList.envList.isVisible()).to.eql(true)
  })
})

describe('KA - Breadcrumb Dropdown Components', () => {
  //TC_582
  it('should navigate user to "Edit Dependencies" page, when user clicks on `Edit dependencies` button in the dependencies component', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppList.open(ws)
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getCard(0).waitForVisible()
    KintoAppList.getCard(0).click()
    KintoAppManage.form.waitForVisible()
    KintoAppManage.getEditDependenciesBtn(3).click()
    KintoAppManage.environmentDefaultsTextFromBreadcrumb.waitForVisible()
    expect(
      KintoAppManage.environmentDefaultsTextFromBreadcrumb.getText()
    ).to.eql('Environment Defaults')
  })

  //TC_583
  it('should navigate user to "Edit Dependencies" page, when user clicks on `edit icon` displayed below "Edit Dependencies" button', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppList.open(ws)
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getCard(0).waitForVisible()
    KintoAppList.getCard(0).click()
    KintoAppManage.form.waitForVisible()
    KintoAppManage.editDependenciesIconBelowBtnRow.click()
    KintoAppManage.environmentDefaultsTextFromBreadcrumb.waitForVisible()
    expect(
      KintoAppManage.environmentDefaultsTextFromBreadcrumb.getText()
    ).to.eql('Environment Defaults')
  })

  //TC_584
  it('should navigate user to "Edit Dependencies" page, when user clicks on `edit icon` of any dependency card', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppList.open(ws)
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getCard(0).waitForVisible()
    KintoAppList.getCard(0).click()
    KintoAppManage.form.waitForVisible()
    KintoAppManage.getEditDependenciesIconFromDependenciesCard(1).click()
    KintoAppManage.environmentDefaultsTextFromBreadcrumb.waitForVisible()
    expect(
      KintoAppManage.environmentDefaultsTextFromBreadcrumb.getText()
    ).to.eql('Environment Defaults')
  })

  //TC_589
  it('should display environment defaults switcher drop down, when user clicks `...` next to `Environment Defaults` text in edit dependencies page breadcrumb', () => {
    KintoAppManage.environmentDefaultsDropDown.click()
    KintoAppManage.kaDropDownVisible.waitForVisible()
    expect(KintoAppManage.kaDropDownVisible.isVisible()).to.eql(true)
  })

  //   //TC_607
  //   it('should verify that environment defaults switcher drop down list is a scroll-able list',()=>{
  //       //TODO
  //   })

  // //TC_608
  // it('should display environments of the selected KA with their currently deployed tag in environment defaults drop down, like 5 environments at a time',()=>{
  //     //TODO
  // })

  //TC_609
  it('should display "Environment Default" option selected as default in the environment defaults drop down', () => {
    //Already environment default is selected as default option
    KintoAppManage.environmentDefaultsTextFromBreadcrumb.waitForVisible()
    expect(
      KintoAppManage.environmentDefaultsTextFromBreadcrumb.getText()
    ).to.eql('Environment Defaults')
  })

  //TC_610
  it('should verify that "Environment defaults" text is replaced with selected environment text from ennironment defaults drop down', () => {
    KintoAppManage.getEnvironmentDefaultsDropDownEnvText(2).click()
    var envName = KintoAppManage.getEnvironmentDefaultsDropDownEnvText(
      2
    ).getText()
    expect(
      KintoAppManage.environmentDefaultsTextFromBreadcrumb.getText()
    ).to.eql(envName)
  })

  //TC_585
  it('should display application switcher drop down, when user clicks on `...` next to KA name in KA manage page breadcrumb', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppList.open(ws)
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getCard(0).waitForVisible()
    KintoAppList.getCard(0).click()
    KintoAppManage.form.waitForVisible()
    KintoAppManage.kaListDropDownBtn.click()
    KintoAppManage.kaDropDownVisible.waitForVisible()
    expect(KintoAppManage.kaDropDownVisible.isVisible()).to.eql(true)
  })

  //TC_590
  it('should allow user to filter KA list using the search filter in application switcher drop down', () => {
    KintoAppManage.searchFilterInAppSwitcherDropDown.setValue(
      testData.kintoapp.validKintoAppName
    )
    KintoAppManage.getKaNameFromDropDown(1).waitForVisible()
    expect(KintoAppManage.getKaNameFromDropDown(1).getText()).to.eql(
      testData.kintoapp.validKintoAppName
    )
  })

  //   //TC_591
  //   it('should verify that application switcher drop down list is a scroll-able list',()=>{
  //       //TODO
  //   })

  //    //TC_592
  //    it('should display all KA in the application drop down list of the workspace, like 5 KA visiable at a time',()=>{
  //     //TODO
  //    })

  //TC_586
  it('should display draft/tag switcher drop down, when user clicks on `...` next to draft text in KA manage page breadcrumb', () => {
    //Already in KA manage page
    KintoAppManage.draftDropDownFromBreadcrumb.click()
    KintoAppManage.draftDropDownVisible.waitForVisible()
    expect(KintoAppManage.draftDropDownVisible.isVisible()).to.eql(true)
  })

  //TC_593
  it('should allow user to filter draft/tags in search filter of draft/tag switcher drop down', () => {
    KintoAppManage.draftDropDownFilter.setValue('Draft')
    KintoAppManage.draftOptionFromDraftDropDown.waitForVisible()
    expect(KintoAppManage.draftOptionFromDraftDropDown.getText()).to.eql(
      'Draft'
    )
    KintoAppManage.draftDropDownFilter.setValue('1.2.3')
    KintoAppManage.getTagNumberFromDraftDropDown(1).waitForVisible()
    expect(KintoAppManage.getTagNumberFromDraftDropDown(1).getText()).to.eql(
      '1.2.3'
    )
  })

  //   //TC_594
  //   it('should verify that draft/tag switcher drop down list is scroll-able list',()=>{
  //     //TODO
  //   })

  // //TC_595
  // it('should display previous tags of the selected KA, like 2 tags at a time',()=>{
  //     //TODO
  // })

  //TC_596
  it('should display tag number, time & date and notes ( if entered ) for every tag in draft/tag switcher drop down', () => {
    expect(KintoAppManage.getTagNumberFromDraftDropDown(1).isVisible()).to.eql(
      true
    )
    expect(KintoAppManage.getTagDateFromTagDropDown(1).isVisible()).to.eql(true)
    expect(KintoAppManage.getTagNotesFromTagDropDown(1).isVisible()).to.eql(
      true
    )
  })

  //TC_587
  it('should display environment switcher drop down, when user clicks on `...` next to environment name in environment edit page breadcrumb', () => {
    KintoAppManage.viewEnvironments.click()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.getEditEnv(1).click()
    EnvironmentManage.form.waitForVisible()
    EnvironmentManage.breadcrumbEnv.click()
    EnvironmentManage.breadcrumbEnvDropDown.waitForVisible()
    expect(EnvironmentManage.breadcrumbEnvDropDown.isVisible()).to.eql(true)
  })

  //TC_597
  it('should allow user to filter environments in search filter of environment switcher drop down', () => {
    KintoAppManage.searchFilterInEnvSwitcherDropDown.setValue(
      testData.Environment.allValidEnvChar
    )
    EnvironmentManage.getbreadCrumbEnv(1).waitForVisible()
    expect(EnvironmentManage.getbreadCrumbEnvText(1).getText()).to.eql(
      testData.Environment.allValidEnvChar
    )
  })

  //    //TC_598
  //    it('should verify that environment switcher drop down list is scroll-able list',()=>{
  //        //TODO
  //    })

  // //TC_599
  // it('should display all the environments of the selected KA, like 4 environment visible at a time',()=>{
  //     //TODO
  // })

  // //TC_600
  // it('should verify that environment doesn`t display tag in environment switcher drop down, if the environment is not yet deployed',()=>{
  //     //TODO
  // })

  // //TC_601
  // it('should verify that environment displays its current deployed tag in environment switcher drop down',()=>{
  //     //TODO
  // })

  //TC_602
  it('should verify that environment edit page title changes as per environment selected from environment switcher drop down', () => {
    EnvironmentManage.getbreadCrumbEnv(1).click()
    var envName = EnvironmentManage.getbreadCrumbEnvText(1).getText()
    EnvironmentManage.envTitle.waitForVisible()
    expect(envName).to.eql(EnvironmentManage.envTitle.getText())
  })

  //TC_588
  it('should display log switcher drop down, when user clicks on `...` next to tag number in logs page breadcrumb', () => {
    EnvironmentManage.envListFromBreadCrumb.click()
    EnvironmentList.envList.waitForVisible()
    EnvironmentList.getExpandEnvDeploys(1).click()
    EnvironmentList.getenvCardViewLogs(1).waitForVisible()
    EnvironmentList.getenvCardViewLogs(1).click()
    EnvironmentList.logsTableTitle.waitForVisible()
    EnvironmentList.tagsDropDownInLogsPage.click()
    EnvironmentList.tagsDropDownIsShown.waitForVisible()
    expect(EnvironmentList.tagsDropDownIsShown.isVisible()).to.eql(true)
  })

  //    //TC_603
  //    it('should verify that log switcher drop down list is a scroll-able list',()=>{
  //        //TODO
  //    })

  // //TC_604
  // it('should verify that previous tags of KA are displayed in log switcher drop down, like 4 to 5 tags at a time',()=>{
  //     //TODO
  // })

  //TC_605
  it('should allow user to filter tags in the search filter of log switcher drop down', () => {
    EnvironmentList.tagsSearchField.setValue('1.2.3')
    EnvironmentList.getTagsFromTagsDropDownList(1).waitForVisible()
    expect(EnvironmentList.getTagsFromTagsDropDownList(1).getText()).to.eql(
      '1.2.3'
    )
  })

  // //TC_606
  // it('should display tag number, time & date and notes ( if entered ) for every tag in log switcher drop down list', () => {
  //     //Not implemented
  // })
})

describe('KA - Dependencies Component', () => {
  //TC_611
  it('should display "Dependencies" component title as "Dependencies"', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppList.open(ws)
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getCard(0).waitForVisible()
    KintoAppList.getCard(0).click()
    KintoAppManage.form.waitForVisible()
    expect(KintoAppManage.dependenciesTitle.getText()).to.eql('Dependencies')
  })

  //TC_612
  it('should display "Dependencies" component subtitle as "This is where the magic happens: add KintoBlocks to deliver the features you need in your client - we make them all work together. Because we know your application is special, you can specify unique configuration parameters for each of the features you are adding. You can also decide to combine or split instances of the same KintoBlock to save on costs."', () => {
    expect(KintoAppManage.dependenciesSubtitle.getText()).to.eql(
      'This is where the magic happens: add KintoBlocks to deliver the features you need in your client - we make them all work together. Because we know your application is special, you can specify unique configuration parameters for each of the features you are adding. You can also decide to combine or split instances of the same KintoBlock to save on costs.'
    )
  })

  //TC_613
  it('should display search field in the dependencies component', () => {
    expect(KintoAppManage.dependenciesSearchBar.isVisible()).to.eql(true)
  })

  // //TC_614
  // it('should verify that search field is not displayed in the KA tagged page',()=>{
  //   //TODO
  // })

  //TC_615
  it('should verify that "Edit dependencies" button and "Edit icon" are disabled in KA create page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppCreate.open(ws)
    KintoAppCreate.form.waitForVisible()
    expect(KintoAppManage.editDependneciesBtn.isEnabled()).to.eql(false)
    expect(KintoAppManage.editDependenciesIconBelowBtnRow.isEnabled()).to.eql(
      false
    )
  })

  //TC_616
  it('should verify that "Edit dependencies" button and "Edit icon" are disabled in KA manage page, when there no existing dependencies', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppList.open(ws)
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getCard(4).waitForVisible()
    KintoAppList.getCard(4).click()
    KintoAppManage.form.waitForVisible()
    //For now KA doesn't have any dependencies
    expect(KintoAppManage.editDependneciesBtn.isEnabled()).to.eql(false)
    expect(KintoAppManage.editDependenciesIconBelowBtnRow.isEnabled()).to.eql(
      false
    )
  })

  //TC_617
  it('should verify that "Edit dependencies" button and "Edit icon" are enabled in KA manage page, when dependencies are added', () => {
    //Adding dependencies
    KintoAppManage.dependenciesSearchBar.setValue(
      testData.kintoblock.validKintoBlockName
    )
    browser.keys('Enter')
    expect(KintoAppManage.editDependneciesBtn.isEnabled()).to.eql(true)
    expect(KintoAppManage.editDependenciesIconBelowBtnRow.isEnabled()).to.eql(
      true
    )
  })

  // //TC_618
  // it('should verify that "Edit dependencies" button and "Edit icon" are not displayed in KA tagged page',()=>{
  //   //TODO
  // })

  //TC_619
  it('should verify that dependencies card list is empty by default in KA create page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppCreate.open(ws)
    browser.alertAccept()
    KintoAppCreate.form.waitForVisible()
    expect(KintoAppManage.getDependenciesCards(1).isVisible()).to.eql(false)
  })

  //TC_620
  it('should display all the added dependencies to a KA, when user naviagtes to some other page and again returns to KA manage page', () => {
    KintoAppCreate.name.input.setValue(testData.kintoapp.validKANamewithDot)

    KintoAppCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescriptionWithChars
    )
    KintoAppCreate.kbdropDown.setValue('z')
    browser.leftClick('div.Select-input > input')
    browser.keys('Return')
    KintoAppCreate.kbdropDown.setValue('d')
    browser.leftClick('div.Select-input > input')
    browser.keys('Return')
    KintoAppCreate.submitGlobal()
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getCard(6).waitForVisible()
    KintoAppList.getCard(6).click()
    KintoAppManage.form.waitForVisible()
    KintoAppManage.getDependenciesCards(1).waitForVisible()
    expect(KintoAppManage.getDependenciesCardTitle(1).getText()).to.eql(
      testData.kintoblock.validKBNameWithStar
    )
    expect(KintoAppManage.getDependenciesCardTitle(2).getText()).to.eql(
      testData.kintoblock.validKBNameWithStar
    )
  })

  //TC_621
  it('should display every KB card with an icon, name, description, delete icon, edit icon and expand text', () => {
    expect(KintoAppManage.getDependenciesCardIcon(1).isVisible()).to.eql(true)
    expect(KintoAppManage.getDependenciesCardTitle(1).isVisible()).to.eql(true)
    expect(KintoAppManage.getDependenciesCardSubtitle(1).isVisible()).to.eql(
      true
    )
    expect(KintoBlockManage.getDependenciesDeleteIcon(1).isVisible()).to.eql(
      true
    )
    expect(
      KintoAppManage.getEditDependenciesIconFromDependenciesCard(1).isVisible()
    ).to.eql(true)
    expect(KintoAppManage.getExpandTextFromDependencyCard(1).getText()).to.eql(
      'Expand'
    )
  })

  //TC_622
  it('should display 2nd level dependency in a stacked manner in any dependency card', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(1).waitForVisible()
    KintoBlockList.getCard(1).click()
    KintoBlockManage.form.waitForVisible()
    KintoAppManage.dependenciesSearchBar.setValue(
      testData.kintoblock.validKBNameWithStar
    )
    browser.keys('Enter')
    KintoAppManage.dependenciesSearchBar.setValue(
      testData.kintoblock.validKBNameWithStar
    )
    browser.keys('Enter')
    KintoAppManage.dependenciesSearchBar.setValue(
      testData.kintoblock.validKBNameWithStar
    )
    browser.keys('Enter')
    KintoAppManage.dependenciesSearchBar.setValue(
      testData.kintoblock.validKBNameWithStar
    )
    browser.keys('Enter')
    KintoAppManage.dependenciesSearchBar.setValue(
      testData.kintoblock.validKBNameWithStar
    )
    browser.keys('Enter')
    KintoBlockManage.submitBtn.waitForVisible()
    KintoBlockManage.submitGlobal()
    KintoAppList.open(ws)
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getCard(6).waitForVisible()
    KintoAppList.getCard(6).click()
    KintoAppManage.form.waitForVisible()
    KintoAppManage.getSecondLevelDependencyStackedIcons(3, 1).waitForVisible()
    expect(
      KintoAppManage.getSecondLevelDependencyStackedIcons(3, 1).isVisible()
    ).to.eql(true)
    expect(
      KintoAppManage.getSecondLevelDependencyStackedIcons(3, 2).isVisible()
    ).to.eql(true)
    expect(
      KintoAppManage.getSecondLevelDependencyStackedIcons(3, 3).isVisible()
    ).to.eql(true)
    expect(
      KintoAppManage.getSecondLevelDependencyStackedIcons(3, 4).isVisible()
    ).to.eql(true)
  })

  //TC_623
  it('should display "+X" if there are more than four dependencies to display in 2nd level dependency', () => {
    expect(
      KintoAppManage.getSecondLevelDependencyAddIcon(3).isVisible()
    ).to.eql(true)
  })

  // //TC_624
  // it('should verify that clicking on "Expand" for any 2nd level dependency expands the stacked dependency list',()=>{
  //   //TODO Not implemented
  // })

  //TC_625
  it('should display icon, name and description for 2nd level dependency of any dependency card', () => {
    expect(
      KintoAppManage.getSecondLevelDependencyTitle(3, 1).isVisible()
    ).to.eql(true)
    expect(
      KintoAppManage.getSecondLevelDependencySubtitle(3, 1).isVisible()
    ).to.eql(true)
    expect(
      KintoAppManage.getSecondLevelDependencyIcon(3, 1).isVisible()
    ).to.eql(true)
  })

  // //TC_626
  // it('should verify that search field in dependencies component on click gets blue highlight border',()=>{
  //   //TODO
  // })

  // //TC_627
  // it('should verify that search field in dependencies component filters dependency list as per user data entered',()=>{
  //   //TODO
  // })

  // //TC_628
  // it('should verify that dependency are added using mouse click, Arrow+Enter and enter KB full name + Enter from dependency list',()=>{
  //   //TODO
  // })

  //TC_629
  it('should display an alert message, when user clicks on "Edit Dependencies" while editing the KA manage page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppList.open(ws)
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getCard(1).waitForVisible()
    KintoAppList.getCard(1).click()
    KintoAppManage.form.waitForVisible()
    KintoAppManage.name.input.setValue(testData.kintoapp.validKANameWithDash)
    KintoAppManage.submitBtn.waitForVisible()
    expect(KintoAppManage.submitBtn.getText()).to.eql('Save Changes')
    KintoAppManage.editDependneciesBtn.click()
    browser.alertAccept()
  })

  //TC_630
  it('should delete dependency from dependency list, when user clicks on "X" red icon on top left of dependency card', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppList.open(ws)
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getCard(6).waitForVisible()
    KintoAppList.getCard(6).click()
    KintoAppManage.form.waitForVisible()
    KintoAppManage.getDependenciesDeleteIcon(3).waitForVisible()
    expect(KintoAppManage.getDependenciesDeleteIcon(3).isVisible()).to.eql(true)
    KintoBlockManage.getDependenciesDeleteIcon(3).click()
    expect(KintoAppManage.getDependenciesDeleteIcon(3).isVisible()).to.eql(true)
    KintoAppManage.submitBtn.waitForVisible()
    KintoAppManage.submitGlobal()
  })

  //TC_631
  it('should navigate to documentation page, when user clicks on "i" icon for any dependency card', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppList.open(ws)
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getCard(6).waitForVisible()
    KintoAppList.getCard(6).click()
    KintoAppManage.form.waitForVisible()
    KintoAppManage.getDependencyInformationLinkIcon(1).waitForVisible()
    KintoAppManage.getDependencyInformationLinkIcon(1).click()
    KintoAppManage.kbDocumentionPage.waitForVisible()
    expect(KintoAppManage.kbDocumentionPage.getText()).to.eql(
      'ENDPOINT DOCUMENTATION'
    )
  })

  //TC_632
  it('should navigate to KA - Edit Dependencies Page with a KB name as pre-filter text in search field, when user clicks on "edit" icon of dependency card', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppList.open(ws)
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getCard(6).waitForVisible()
    KintoAppList.getCard(6).click()
    KintoAppManage.form.waitForVisible()
    var kbName = KintoAppManage.getDependenciesCardTitle(1).getText()
    KintoAppManage.getEditDependenciesIconFromDependenciesCard(1).click()
    KintoAppManage.environmentDefaultsTextFromBreadcrumb.waitForVisible()
    expect(
      KintoAppManage.environmentDefaultsTextFromBreadcrumb.getText()
    ).to.eql('Environment Defaults')
    expect(
      KintoAppManage.getFocusedKbInEditDependenciesPage(1).getText()
    ).to.eql(kbName)
  })
})
