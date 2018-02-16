import { expect } from 'chai'
import KintoAppList from '../page-objects/kintoApp.list.page'
import KintoAppCreate from '../page-objects/kintoApp.create.page'
import KintoAppManage from '../page-objects/kintoApp.manage.page'
import KintoBlockCreate from '../page-objects/kintoBlock.create.page'
import KintoBlockList from '../page-objects/kintoBlock.list.page'
import DashboardIndex from '../page-objects/dashboard.index.page'
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
    Login.login()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppList.open(ws)
    KintoAppCreate.form.waitForVisible()
    expect(KintoAppCreate.form.isVisible()).to.eq(true)
  })

  it('should redirect the user to create kintoapps when he clicks on kintoapps with no kintoapps created', () => {
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
    KintoBlockList.open()
    KintoBlockCreate.open()
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

    KintoBlockCreate.open()
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
    KintoAppCreate.kbdropDown.setValue('d')
    browser.leftClick('div.Select-input > input')
    browser.keys('Return')
    KintoAppManage.kbName.waitForVisible()
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
    expect(KintoAppManage.kbTagNDeploy.isVisible()).to.eql(true)
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
    KintoAppManage.kbTagNDeploy.waitForVisible()
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
    KintoAppManage.kbTagNDeploy.waitForVisible()
    KintoAppManage.kbTagNDeploy.click()
    expect(KintoAppManage.majorVersion.isVisible()).to.eql(true)
    expect(KintoAppManage.minorVersion.isVisible()).to.eql(true)
    expect(KintoAppManage.revision.isVisible()).to.eql(true)
    expect(KintoAppManage.notes.isVisible()).to.eql(true)
    expect(KintoAppManage.envName.getText()).to.eql('DEFAULT')
  })

  it('should display error message if Create button is clicked after selecting environment', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppList.open(ws)
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getCard(0).waitForVisible()
    KintoAppList.getCard(0).click()
    KintoAppManage.title.waitForVisible()
    KintoAppManage.kbTagNDeploy.waitForVisible()
    KintoAppManage.kbTagNDeploy.click()
    expect(KintoAppManage.majorVersion.isVisible()).to.eql(true)
    expect(KintoAppManage.minorVersion.isVisible()).to.eql(true)
    expect(KintoAppManage.revision.isVisible()).to.eql(true)
    expect(KintoAppManage.notes.isVisible()).to.eql(true)
    expect(KintoAppManage.envName.getText()).to.eql('DEFAULT')
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
    KintoAppManage.kbTagNDeploy.waitForVisible()
    KintoAppManage.kbTagNDeploy.click()
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
    KintoAppManage.kbTagNDeploy.waitForVisible()
    KintoAppManage.kbTagNDeploy.click()

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
    KintoAppManage.kbTagNDeploy.waitForVisible()
    KintoAppManage.kbTagNDeploy.click()
    KintoAppManage.majorVersion.setValue('1')
    KintoAppManage.minorVersion.setValue('2')
    KintoAppManage.revision.setValue('4')
    KintoAppManage.notes.click()
    KintoAppManage.createTagBtn.click()
    KintoAppManage.envList.waitForVisible()
    KintoAppManage.successDeployMsg.waitForVisible()
    expect(KintoAppManage.successDeployVersion.getText()).to.eql('1.2.4')
  })

  it('should allow user to view environment and add a new environment', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoAppList.open(ws)
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getCard(0).waitForVisible()
    KintoAppList.getCard(0).click()
    KintoAppManage.title.waitForVisible()
    KintoAppManage.viewEnvironments.click()
    KintoAppManage.addNewEnvironment.click()
    KintoAppManage.environmentName.setValue(testData.kintoapp.validEnvName)
    KintoAppManage.addEnvBtn.click()
    KintoAppManage.addNewEnvironment.waitForVisible()
    expect(
      KintoAppManage.envListItem(2)
        .element('.top > h3')
        .getText()
    ).to.eql(testData.kintoapp.validEnvName.toUpperCase()) // Environment name is in CAPS in the listing page
  })
})
