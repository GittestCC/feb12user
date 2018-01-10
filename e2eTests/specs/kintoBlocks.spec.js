import { expect } from 'chai'
import KintoBlockList from '../page-objects/kintoBlock.list.page'
import KintoBlockCreate from '../page-objects/kintoBlock.create.page'
import KintoBlockManage from '../page-objects/kintoBlock.manage.page'
import Login from '../page-objects/login.page'
import testData from '../constants/testdata.json'

describe('create kintoBlock', () => {
  it('should redirect the user to login  when he is trying to access list of kbs and he is not logged in', () => {
    KintoBlockList.open()
    Login.loginForm.waitForVisible()
    expect(Login.getUrl()).to.eql('/log-in')
  })

  it('should redirect the user to create kb when he is trying to access list kbs with no kbs created', () => {
    Login.login()
    KintoBlockList.open()
    KintoBlockCreate.form.waitForVisible()
    expect(KintoBlockCreate.form.isVisible()).to.eq(true)
  })

  it('should validate inputs and not allow  user to create a kb without invalid data', () => {
    KintoBlockCreate.open()
    KintoBlockCreate.name.input.setValue(
      testData.kintoblock.validKintoBlockName
    )
    KintoBlockCreate.submitGlobal()
    KintoBlockCreate.repository.error.waitForVisible()
    expect(KintoBlockCreate.repository.error.getText()).to.eql('Required')
    expect(KintoBlockCreate.shortDescription.error.getText()).to.eql('Required')
    expect(KintoBlockCreate.language.error.getText()).to.eql('Required')
    expect(KintoBlockCreate.protocol.error.getText()).to.eql('Required')
  })

  it('should validate inputs and not allow  user to create a kb with description more than 200 characters', () => {
    KintoBlockCreate.name.input.setValue(
      testData.kintoblock.validKintoBlockName
    )
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.invalidKBDescription
    )
    KintoBlockCreate.submitGlobal()
    KintoBlockCreate.shortDescription.error.waitForVisible()

    expect(KintoBlockCreate.shortDescription.error.getText()).to.eql(
      'Must be 200 characters or less'
    )
  })

  it('should create a new kb and redirect to list kbs page', () => {
    KintoBlockCreate.name.input.setValue(
      testData.kintoblock.validKintoBlockName
    )
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescription
    )
    KintoBlockCreate.language.input.selectByIndex(1)
    KintoBlockCreate.protocol.input.selectByIndex(1)
    KintoBlockCreate.repository.input.setValue(
      testData.kintoblock.validRepoName
    )
    KintoBlockCreate.submitGlobal()
    KintoBlockList.getCard(0).waitForVisible()
    const name = KintoBlockList.getCard(0)
      .element('.name')
      .getText()
    expect(name).to.eql('test name')
  })
})

describe('manage kintoBlock', () => {
  it('should show kb manage when clicking on that kintoblock in list', () => {
    KintoBlockList.open()
    KintoBlockList.getCard(0).waitForVisible()
    const name = KintoBlockList.getCard(0)
      .element('.name')
      .getText()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.title.waitForVisible()
    expect(KintoBlockManage.title.getText()).to.eq(name)
  })

  it('show an error message when clicking tag latest commit', () => {
    KintoBlockManage.createTagButton.click()
    expect(KintoBlockManage.createTagError.isVisible()).to.eql(true)
  })

  it('tag latest commit is only shown when the form has no unsaved changes', () => {
    expect(KintoBlockManage.createTagButton.isVisible()).to.eql(true)
    KintoBlockManage.name.input.setValue(
      testData.kintoblock.validKintoBlockName
    )
    expect(KintoBlockManage.createTagButton.isVisible()).to.eql(false)
    KintoBlockCreate.submitGlobal()
    browser.waitUntil(() => {
      return KintoBlockManage.savebar
        .getAttribute('class')
        .includes('e2e-disabled')
    }, 5000)
    expect(KintoBlockManage.createTagButton.isVisible()).to.eql(true)
  })

  it('env params add button should be disabled when added data is empty', () => {
    expect(
      KintoBlockManage.envInput
        .element('.bottom .icon-column button')
        .isEnabled()
    ).to.eql(false)
    KintoBlockManage.addEnvKey.setValue(testData.kintoblock.validEnvironmentKey)
    KintoBlockManage.addEnvValue.setValue(
      testData.kintoblock.validEnvironmentValue
    )
    expect(
      KintoBlockManage.envInput
        .element('.bottom .icon-column button')
        .isEnabled()
    ).to.eql(true)
  })

  it('should add a new env row when entering data correctly', () => {
    expect(
      KintoBlockManage.envInput.element('.empty-message').isVisible()
    ).to.eql(true)
    KintoBlockManage.addEnvKey.setValue(testData.kintoblock.validEnvironmentKey)
    KintoBlockManage.addEnvValue.setValue(
      testData.kintoblock.validEnvironmentValue
    )

    KintoBlockManage.envInput.element('.bottom .icon-column button').click()

    expect(
      KintoBlockManage.getEnvRow(0)
        .element('[data-test="environmentVariables[0].key"] input')
        .getValue()
    ).to.eql(testData.kintoblock.validEnvironmentKey)
    expect(
      KintoBlockManage.getEnvRow(0)
        .element('[data-test="environmentVariables[0].value"] input')
        .getValue()
    ).to.eql(testData.kintoblock.validEnvironmentValue)
  })

  it('should add a new custom parameter row when entering data correctly', () => {
    KintoBlockManage.addCustomKey.setValue(testData.kintoblock.validCustomKey)
    KintoBlockManage.addCustomValue.setValue(
      testData.kintoblock.validCustomValue
    )
    KintoBlockManage.customInput.element('.bottom .icon-column button').click()

    expect(
      KintoBlockManage.getParamsRow(0)
        .element('[data-test="configParameters[0].key"] input')
        .getValue()
    ).to.eql(testData.kintoblock.validCustomKey)

    expect(
      KintoBlockManage.getParamsRow(0)
        .element('[data-test="configParameters[0].value"] input')
        .getValue()
    ).to.eql(testData.kintoblock.validCustomValue)
  })

  it('should display the updated kb data after successfully updating it', () => {
    KintoBlockManage.name.input.setValue(testData.kintoblock.validUpdatedKBName)
    KintoBlockManage.description.input.setValue(
      testData.kintoblock.validUpdatedKBDescription
    )
    KintoBlockManage.submitGlobal()
    browser.waitUntil(() => {
      return KintoBlockManage.savebar
        .getAttribute('class')
        .includes('e2e-disabled')
    }, 5000)
    KintoBlockList.open()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.title.waitForVisible()
    expect(KintoBlockManage.title.getText()).to.eq(
      testData.kintoblock.validUpdatedKBName
    )
    expect(KintoBlockManage.description.input.getText()).to.eq(
      testData.kintoblock.validUpdatedKBDescription
    )
    expect(
      KintoBlockManage.getEnvRow(0)
        .element('[data-test="environmentVariables[0].key"] input')
        .getValue()
    ).to.eql(testData.kintoblock.validEnvironmentKey)
    expect(
      KintoBlockManage.getEnvRow(0)
        .element('[data-test="environmentVariables[0].value"] input')
        .getValue()
    ).to.eql(testData.kintoblock.validEnvironmentValue)
  })

  it('should be able to edit the environmental parameter and value', () => {
    KintoBlockList.open()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.title.waitForVisible()
    KintoBlockManage.getEnvRow(0)
      .element('[data-test="environmentVariables[0].key"] input')
      .setValue(testData.kintoblock.updatedEnvironmentKey)
    KintoBlockManage.getEnvRow(0)
      .element('[data-test="environmentVariables[0].value"] input')
      .setValue(testData.kintoblock.updatedEnvironmentValue)
    KintoBlockManage.submitGlobal()
    browser.waitUntil(() => {
      return KintoBlockManage.savebar
        .getAttribute('class')
        .includes('e2e-disabled')
    }, 5000)
    KintoBlockList.open()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.title.waitForVisible()
    expect(
      KintoBlockManage.getEnvRow(0)
        .element('[data-test="environmentVariables[0].key"] input')
        .getValue()
    ).to.eql(testData.kintoblock.updatedEnvironmentKey)

    expect(
      KintoBlockManage.getEnvRow(0)
        .element('[data-test="environmentVariables[0].value"] input')
        .getValue()
    ).to.eql(testData.kintoblock.updatedEnvironmentValue)
  })

  it('should be able to edit the custom parameters and value', () => {
    KintoBlockList.open()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.title.waitForVisible()
    KintoBlockManage.getParamsRow(0)
      .element('[data-test="configParameters[0].key"] input')
      .setValue(testData.kintoblock.updatedCustomKey)
    KintoBlockManage.getParamsRow(0)
      .element('[data-test="configParameters[0].value"] input')
      .setValue(testData.kintoblock.updatedCustomValue)
    KintoBlockManage.submitGlobal()
    browser.waitUntil(() => {
      return KintoBlockManage.savebar
        .getAttribute('class')
        .includes('e2e-disabled')
    }, 5000)
    KintoBlockList.open()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.title.waitForVisible()
    expect(
      KintoBlockManage.getParamsRow(0)
        .element('[data-test="configParameters[0].key"] input')
        .getValue()
    ).to.eql(testData.kintoblock.updatedCustomKey)

    expect(
      KintoBlockManage.getParamsRow(0)
        .element('[data-test="configParameters[0].value"] input')
        .getValue()
    ).to.eql(testData.kintoblock.updatedCustomValue)
  })

  it('should highlight the correct list when I click on the corresponding tab in the dropdown, and selected tab matches the breadcrumb', () => {
    KintoBlockManage.breadcrumb.click()
    KintoBlockManage.getTab('branch').click()
    expect(KintoBlockManage.getDropdown('branch').isVisible()).to.eql(true)
    const currentBranchName = KintoBlockManage.breadCrumbTitle.getText()
    expect(
      KintoBlockManage.getDropdown('branch')
        .$('.tag-item .tag-item-text')
        .getText()
    ).to.eql(currentBranchName)
  })

  it('should be able to add multiple environmental parameters', () => {
    KintoBlockList.open()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.title.waitForVisible()
    KintoBlockManage.addEnvKey.setValue(
      testData.kintoblock.validEnvironmentKeyWithSpecialChars
    )
    KintoBlockManage.addEnvValue.setValue(
      testData.kintoblock.validEnvironmentValueWithSpecialChars
    )

    KintoBlockManage.envInput.element('.bottom .icon-column button').click()

    expect(
      KintoBlockManage.getEnvRow(1)
        .element('[data-test="environmentVariables[1].key"] input')
        .getValue()
    ).to.eql(testData.kintoblock.validEnvironmentKeyWithSpecialChars)
    expect(
      KintoBlockManage.getEnvRow(1)
        .element('[data-test="environmentVariables[1].value"] input')
        .getValue()
    ).to.eql(testData.kintoblock.validEnvironmentValueWithSpecialChars)
  })

  // TODO it('should be able to add multiple custom parameters', () => {
  //
  //    KintoBlockList.open()
  //    KintoBlockList.getCard(0).waitForVisible()
  //    KintoBlockList.getCard(0).click()
  //    KintoBlockManage.title.waitForVisible()
  //    KintoBlockManage.addCustomKey.setValue(testData.kintoblock.validCustomKeyWithSpecialChars)
  //    KintoBlockManage.addCustomValue.setValue(
  //      testData.kintoblock.validCustomValueWithSpecialChars
  //    )
  //
  //    KintoBlockManage.customInput.element('.bottom .icon-column button').click()
  //
  //    expect(
  //      KintoBlockManage.getParamsRow(1)
  //        .element('[data-test="configParameters[1].key"] input')
  //        .getValue()
  //    ).to.eql(testData.kintoblock.validCustomKeyWithSpecialChars)
  //    expect(
  //      KintoBlockManage.getParamsRow(1)
  //        .element('[data-test="configParameters[1].value"] input')
  //        .getValue()
  //    ).to.eql(testData.kintoblock.validCustomValueWithSpecialChars)
  //
  //  })
})
