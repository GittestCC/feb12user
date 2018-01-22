import { expect } from 'chai'
import KintoAppList from '../page-objects/kintoApp.list.page'
import KintoAppCreate from '../page-objects/kintoApp.create.page'
import KintoAppManage from '../page-objects/kintoApp.manage.page'
import KintoBlockCreate from '../page-objects/kintoBlock.create.page'
import KintoBlockList from '../page-objects/kintoBlock.list.page'
import Login from '../page-objects/login.page'
import testData from '../constants/testdata.json'

describe('create kintoApp', () => {
  it('should redirect the user to login  when he is trying to access list of kintoApps and he is not logged in', () => {
    KintoAppList.open()
    Login.loginForm.waitForVisible()
    expect(Login.getUrl()).to.eql('/log-in')
  })

  it('should redirect the user to create kintoapps when he is trying to access list kintoapps with no kintoapps created', () => {
    Login.login()
    KintoAppList.open()
    KintoAppCreate.form.waitForVisible()
    expect(KintoAppCreate.form.isVisible()).to.eq(true)
  })

  it('should validate inputs and not allow  user to create a kintoApp without invalid data', () => {
    KintoAppCreate.open()
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
    KintoAppList.getCard(0).waitForVisible()
    const name = KintoAppList.getCard(0)
      .element('.name')
      .getText()
    expect(name).to.eql(testData.kintoapp.validKintoAppName)
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
    KintoAppCreate.open()
    KintoAppCreate.form.waitForVisible()
    expect(KintoAppCreate.whatisanApp.getText()).to.eql(
      'What is an Application?\nKintoApp is our proprietary format of microservice. They allow you to build a website and offer online services with ease and speed. Anyone can use and sell their KintoApps on our website. You can learn more here.'
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
    KintoAppCreate.kbdropDown.setValue('$')
    browser.leftClick('div.Select-input > input')
    browser.keys('Return')
    KintoAppManage.kbName.waitForVisible()
    KintoAppCreate.submitGlobal()
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
    KintoAppCreate.open()
    KintoAppCreate.form.waitForVisible()
    KintoAppCreate.name.input.setValue(testData.kintoapp.validKANamewithDot)
    KintoAppCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescriptionWithChars
    )
    KintoAppCreate.kbdropDown.setValue('*')
    browser.leftClick('div.Select-input > input')
    browser.keys('Return')
    KintoAppCreate.kbdropDown.setValue('#')
    browser.leftClick('div.Select-input > input')
    browser.keys('Return')
    KintoAppCreate.submitGlobal()
    KintoAppList.getCard(2).waitForVisible()
    const name = KintoAppList.getCard(2) //TODO  Change this to 0, after the bug to display the latest KA on top is fixed
      .element('.name')
      .getText()
    expect(name).to.eql(testData.kintoapp.validKANamewithDot)
  })
})

describe('manage kintoApp', () => {
  it('should show ka manage when clicking on that kintoapp in list', () => {
    KintoAppList.open()
    KintoAppList.getCard(0).waitForVisible()
    const name = KintoAppList.getCard(0)
      .element('.name')
      .getText()
    KintoAppList.getCard(0).click()
    KintoAppManage.title.waitForVisible()
    expect(KintoAppManage.title.getText()).to.eq(name)
  })

  it('should allow user to edit the name of the KA', () => {
    KintoAppManage.name.input.setValue(
      testData.kintoapp.validUpdatedKintoAppName
    )
    KintoAppCreate.submitGlobal()
    expect(KintoAppManage.name.input.getText()).to.eql(
      testData.kintoapp.validUpdatedKintoAppName
    )
    KintoAppManage.kbTagNDeploy.waitForVisible()
    KintoAppList.open()
    KintoAppList.getCard(0).waitForVisible()
    KintoAppList.getCard(0).click()
    KintoAppManage.title.waitForVisible()
    expect(KintoAppManage.title.getText()).to.eq(
      testData.kintoapp.validUpdatedKintoAppName
    )
  })

  it('should allow user to tag and deploy changes to KA', () => {
    KintoAppList.open()
    KintoAppList.getCard(0).waitForVisible()
    KintoAppList.getCard(0).click()
    KintoAppManage.title.waitForVisible()
    KintoAppManage.name.input.setValue(testData.kintoapp.validKANameWithDollar)
    KintoAppCreate.submitGlobal() // Save changes
    KintoAppManage.kbTagNDeploy.click()
    KintoAppManage.tagDeployModal.waitForVisible()
    KintoAppManage.majorVersion.setValue('1')
    KintoAppManage.minorVersion.setValue('2')
    KintoAppManage.revision.setValue('3')
    KintoAppManage.notes.setValue(testData.kintoapp.validNotes)
    KintoAppManage.createTagBtn.click()
    KintoAppManage.envList.waitForVisible()
  })
})
