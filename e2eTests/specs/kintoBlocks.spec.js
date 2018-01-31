import { expect } from 'chai'
import KintoBlockList from '../page-objects/kintoBlock.list.page'
import KintoBlockCreate from '../page-objects/kintoBlock.create.page'
import KintoBlockManage from '../page-objects/kintoBlock.manage.page'
import Login from '../page-objects/login.page'
import Landing from '../page-objects/landing.page'
import testData from '../constants/testdata.json'

describe('create kintoBlock', () => {
  it('should redirect the user to login  when he is trying to access list of kbs and he is not logged in', () => {
    KintoBlockList.open(1) //Default workspace ID 1 passed as user is not yet logged in in this case
    Login.loginForm.waitForVisible()
    expect(Login.getUrl()).to.eql('/log-in')
  })

  it('should redirect the user to create kb when he is trying to access list kbs with no kbs created', () => {
    Login.login()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockCreate.form.waitForVisible()
    expect(KintoBlockCreate.form.isVisible()).to.eq(true)
  })

  it('should validate inputs and not allow  user to create a kb with invalid data', () => {
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

  it('should validate inputs and not allow  user to create a kb with name less than 3 characters', () => {
    KintoBlockCreate.name.input.setValue(testData.kintoblock.invalidKBThreeChar)
    KintoBlockCreate.submitGlobal()
    KintoBlockCreate.name.error.waitForVisible()
    expect(KintoBlockCreate.name.error.getText()).to.eql(
      'Must be 3 characters or more'
    )
  })

  it('should validate inputs and not allow user to create a kb with name more than 35 characters', () => {
    KintoBlockCreate.name.input.setValue(testData.kintoblock.invalidKBFortyChar)
    KintoBlockCreate.submitGlobal()
    KintoBlockCreate.name.error.waitForVisible()
    expect(KintoBlockCreate.name.error.getText()).to.eql(
      'Must be 35 characters or less'
    )
  })

  it('should validate inputs and not allow user to create a kb with name in Upper case', () => {
    KintoBlockCreate.name.input.setValue(testData.kintoblock.invalidKBCAPSChar)
    KintoBlockCreate.submitGlobal()
    KintoBlockCreate.name.error.waitForVisible()
    expect(KintoBlockCreate.name.error.getText()).to.eql(
      'Only lowercase characters and digits are allowed'
    )
  })

  it('should validate inputs and not allow user to create a kb with name containing special characters', () => {
    KintoBlockCreate.name.input.setValue(
      testData.kintoblock.invalidKBNameWithChar
    )
    KintoBlockCreate.submitGlobal()
    KintoBlockCreate.name.error.waitForVisible()
    expect(KintoBlockCreate.name.error.getText()).to.eql(
      'Only lowercase characters and digits are allowed'
    )
  })

  it('should validate inputs and not allow user to create a kb with name starting with number', () => {
    KintoBlockCreate.name.input.setValue(
      testData.kintoblock.invalidKBNameWithDigit
    )
    KintoBlockCreate.submitGlobal()
    KintoBlockCreate.name.error.waitForVisible()
    expect(KintoBlockCreate.name.error.getText()).to.eql(
      "The first character can't be a digit"
    )
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
    expect(name).to.eql(testData.kintoblock.validKintoBlockName)
  })

  it('should be able to select already existing Repo from my Github account', () => {
    KintoBlockCreate.open()
    KintoBlockCreate.name.input.setValue(
      testData.kintoblock.validKintoBlockNameWithDigit
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
    KintoBlockList.getCard(1).waitForVisible()
    const name = KintoBlockList.getCard(1)
      .element('.name')
      .getText()
    expect(name).to.eql(testData.kintoblock.validKintoBlockNameWithDigit)
  })
})

describe('manage kintoBlock', () => {
  it('should show kb manage when clicking on that kintoblock in list', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.getCard(0).waitForVisible()
    const name = KintoBlockList.getCard(0)
      .element('.name')
      .getText()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.title.waitForVisible()
    expect(KintoBlockManage.title.getText()).to.eq(name + ' - master')
  })

  it('show an error message when clicking tag latest commit', () => {
    KintoBlockManage.createTagButton.click()
    expect(KintoBlockManage.createTagError.isVisible()).to.eql(true)
    expect(KintoBlockManage.createTagError.getText()).to.eql(
      'At least one successful commit must be made on GitHub in order to create a tag.'
    )
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
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.title.waitForVisible()
    expect(KintoBlockManage.title.getText()).to.eq(
      testData.kintoblock.validUpdatedKBName + ' - master'
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
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
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
    ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
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
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
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
    ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
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
    KintoBlockManage.getTab('tag').click()
    expect(KintoBlockManage.activeTagSection.isVisible()).to.eql(true)
  })

  it('should reset search bar while switching tabs', () => {
    KintoBlockManage.getTab('branch').click()
    KintoBlockManage.dropDownfilter.setValue('test')
    KintoBlockManage.getTab('tag').click()
    expect(KintoBlockManage.dropDownfilter.getValue()).to.eql('')
    KintoBlockManage.dropDownfilter.setValue('test')
    KintoBlockManage.getTab('branch').click()
    expect(KintoBlockManage.dropDownfilter.getValue()).to.eql('')
  })

  it('should be able to add multiple environmental parameters', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
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
    KintoBlockManage.submitGlobal()
    browser.waitUntil(() => {
      return KintoBlockManage.savebar
        .getAttribute('class')
        .includes('e2e-disabled')
    }, 5000)
  })

  it('should validate and show error message when adding duplicate environmental parameters', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.title.waitForVisible()
    KintoBlockManage.addEnvKey.setValue(
      testData.kintoblock.updatedEnvironmentKey
    )
    KintoBlockManage.addEnvValue.setValue(
      testData.kintoblock.validEnvironmentValueWithSpecialChars
    )

    KintoBlockManage.envInput.element('.bottom .icon-column button').click()

    expect(
      KintoBlockManage.getEnvRow(2)
        .element('[data-test="environmentVariables[2].key"] input')
        .getValue()
    ).to.eql(testData.kintoblock.updatedEnvironmentKey)
    expect(
      KintoBlockManage.getEnvRow(2)
        .element('[data-test="environmentVariables[2].value"] input')
        .getValue()
    ).to.eql(testData.kintoblock.validEnvironmentValueWithSpecialChars)

    KintoBlockManage.submitGlobal()

    expect(
      KintoBlockManage.getEnvRow(0)
        .element('[data-test="environmentVariables[0].key"] .error-message')
        .getText()
    ).to.eql('Must be unique')

    KintoBlockManage.getEnvRow(2)
      .element('[data-test="environmentVariables[2].key"] input')
      .setValue(testData.kintoblock.validEnvKeyWithCAPS)
    KintoBlockManage.submitGlobal()

    browser.waitUntil(() => {
      return KintoBlockManage.savebar
        .getAttribute('class')
        .includes('e2e-disabled')
    }, 5000)
  })

  it('it should be able to see three options - Edit Branch, View all branches and tags and  Delete kintoblock options for my KintoBlock', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockManage.dropDownMenu.click()
    KintoBlockManage.dropDownMenuOptions.waitForVisible()

    expect(KintoBlockManage.editBranch.getText()).to.eql('Edit Branch\nmaster')
    expect(KintoBlockManage.viewBranchesAndTag.getText()).to.eql(
      'View All Branches & Tags'
    )
    expect(KintoBlockManage.delKB.getText()).to.eql('Delete KintoBlock')
  })

  it('it should be able to click on View all branches and tags and switch between Branches and Tags', () => {
    KintoBlockManage.viewBranchesAndTag.click()
    KintoBlockManage.dropDownTabs.waitForVisible()

    expect(KintoBlockManage.getTab('branch').isVisible()).to.eql(true)
    KintoBlockManage.getTab('tag').click()
    expect(KintoBlockManage.getTab('tag').isVisible()).to.eql(true)
  })

  it('should be able to add multiple custom parameters', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.title.waitForVisible()
    KintoBlockManage.addCustomKey.setValue(
      testData.kintoblock.validCustomKeyWithSpecialChars
    )
    KintoBlockManage.addCustomValue.setValue(
      testData.kintoblock.validCustomValueWithSpecialChars
    )

    KintoBlockManage.customInput.element('.bottom .icon-column button').click()

    expect(
      KintoBlockManage.getParamsRow(1)
        .element('[data-test="configParameters[1].key"] input')
        .getValue()
    ).to.eql(testData.kintoblock.validCustomKeyWithSpecialChars)
    expect(
      KintoBlockManage.getParamsRow(1)
        .element('[data-test="configParameters[1].value"] input')
        .getValue()
    ).to.eql(testData.kintoblock.validCustomValueWithSpecialChars)
    KintoBlockManage.submitGlobal()
    browser.waitUntil(() => {
      return KintoBlockManage.savebar
        .getAttribute('class')
        .includes('e2e-disabled')
    }, 5000)
  })
})
