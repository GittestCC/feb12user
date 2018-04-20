import { expect } from 'chai'
import KintoBlockList from '../page-objects/kintoBlock.list.page'
import KintoAppList from '../page-objects/kintoApp.list.page'
import KintoAppCreate from '../page-objects/kintoApp.create.page'
import KintoBlockCreate from '../page-objects/kintoBlock.create.page'
import KintoBlockManage from '../page-objects/kintoBlock.manage.page'
import DashboardIndex from '../page-objects/dashboard.index.page'
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
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.open(ws)
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

  it('should display alert pop up message, when user try to navigate to any page of KH from `create new kintoblock` page while `create new kintoblock` button is enabled', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.open(ws)
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.name.input.setValue(testData.kintoapp.validKintoAppName)
    expect(browser.isEnabled('button.button.default')).to.eql(true)
    DashboardIndex.applicationLeftnav.click()
    browser.alertAccept()
  })

  it('should be able to select already existing Repo from my Github account', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.open(ws)
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

describe('KB - Create new block page', () => {
  //TC_502
  it('should navigate user to KB create page, when user clicks on add icon displayed next to KntoBlocks in left navigation bar', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    DashboardIndex.open(ws)
    browser.moveToObject('.kintoblocks')
    DashboardIndex.kbHoveraddicon.waitForVisible()
    DashboardIndex.kbHoveraddicon.click()
    //TODO check whether kintoblocks in left nav bar is blue highlighted
    KintoBlockCreate.form.waitForVisible()
    expect(KintoBlockCreate.form.isVisible()).to.eql(true)
  })

  //TC_503
  it('should navigate user to KB create page, when user clicks on `create new kintoblock` button displayed via breadcrumb drop down of KB name in KB manage page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.kbListDropDown.click()
    KintoBlockManage.kbListDropDownVisible.waitForVisible()
    KintoBlockManage.createNewKbBtnInBreadcrumb.click()
    KintoBlockCreate.form.waitForVisible()
    expect(KintoBlockCreate.form.isVisible()).to.eql(true)
  })

  //TC_504
  it('should navigate user to KB create page, when user enters URL of KB create page in the browser', () => {
    var url = KintoBlockList.getUrl().split('/')
    var ws = url[3]
    KintoBlockList.open(ws)
    KintoBlockList.myKintoBlocksList.waitForVisible()
    expect(KintoBlockList.myKintoBlocksList.isVisible()).to.eql(true)
    browser.url(`/app/dashboard/${ws}/kintoblocks/create`)
    KintoBlockCreate.form.waitForVisible()
    expect(KintoBlockCreate.form.isVisible()).to.eql(true)
  })

  //TC_505
  it('should display create kintoblocks page title as `Create KintoBlocks`', () => {
    expect(KintoBlockCreate.pageTitle.getText()).to.eql('Create KintoBlocks')
  })

  //TC_506
  it('should display what is a kintoblock help text below the page title', () => {
    expect(KintoBlockCreate.whatisaKintoBlock.getText()).to.eql(
      'What is a KintoBlock?\nKIntoBlocks are the new standard format for microservices. They are self-contained, containerized, universally compatible, language agnostic, combineable and shareable bricks of back-end logic. We take off your shoulders the hassle of library configuration, deployment, and infrastructure so you can focus on writing exactly the features you need. Start building KintoBlocks below or learn more here.'
    )
  })

  //TC_507
  it('should navigate user to help page, when user clicks on `learn more here` text link', () => {
    KintoBlockCreate.learnMoreHere.click()
    //TODO add expect statement for asserting help page
    //Help page opens up in new page, check how to verify it
  })

  //TC_508
  it('should display projects member tool bar', () => {
    expect(KintoBlockCreate.membersToolBar.isVisible()).to.eql(true)
  })

  // //TC_509
  //This passes only in staing for now, as in local has dummy github organisation
  // it('should verify that workspace without GitHub integration displays KB create page with following components', () => {
  //   expect(KintoBlockCreate.nameField.isVisible()).to.eql(true)
  //   expect(KintoBlockCreate.description.isVisible()).to.eql(true)
  //   expect(KintoBlockCreate.languageField.isVisible()).to.eql(true)
  //   expect(KintoBlockCreate.protocolField.isVisible()).to.eql(true)
  //   expect(KintoBlockCreate.gitHubText.getText()).to.eql('Linking a GitHub organization allows you to use any existing repositories within and create new ones.Please make sure every workspace member has the correct access to the GitHub organization.Once it’s been linked you cannot unlink it.')
  //   expect(KintoBlockCreate.learnGitHubCreationLink.isVisible()).to.eql(true)
  //   expect(KintoBlockCreate.learnGitHubCreationLink.getText()).to.eql('Learn how to create a GitHub organization.')
  //   expect(KintoBlockCreate.linkGitHubBtn.isVisible()).to.eql(true)
  //   expect(KintoBlockCreate.submitBtn.isVisible()).to.eql(true)
  // })

  //TC_511
  it('should display `create new kintoblock` button as disabled by default, when user navigates to KB create page', () => {
    expect(KintoBlockCreate.submitBtn.isEnabled()).to.eql(false)
  })

  //TC_512
  it('should display validation error message for choose language and protocol, when user changes options to default from selected options and click submit button', () => {
    KintoBlockCreate.name.input.setValue(
      testData.kintoblock.validKintoBlockName
    )
    KintoBlockCreate.submitGlobal()
    expect(KintoBlockCreate.language.error.isVisible()).to.eql(true)
    expect(KintoBlockCreate.protocol.error.isVisible()).to.eql(true)
    KintoBlockCreate.languageField.selectByIndex(1)
    KintoBlockCreate.protocolField.selectByIndex(1)
    expect(KintoBlockCreate.language.error.isVisible()).to.eql(false)
    expect(KintoBlockCreate.protocol.error.isVisible()).to.eql(false)
    KintoBlockCreate.languageField.selectByIndex(0)
    KintoBlockCreate.protocolField.selectByIndex(0)
    KintoBlockCreate.submitBtn.click()
    //Validation fails as its a bug
    expect(KintoBlockCreate.language.error.isVisible()).to.eql(true)
    expect(KintoBlockCreate.protocol.error.isVisible()).to.eql(true)
  })

  //TC_513
  it('should verify that first triggered error message is disappeared, when user enters valid data in second try', () => {
    DashboardIndex.kbHoveraddicon.click()
    browser.alertAccept()
    KintoBlockCreate.form.waitForVisible()
    expect(KintoBlockCreate.form.isVisible()).to.eql(true)
    KintoBlockCreate.name.input.setValue(testData.kintoblock.invalidKBThreeChar)
    expect(KintoBlockCreate.name.error.isVisible()).to.eql(true)
    KintoBlockCreate.name.input.setValue(
      testData.kintoblock.validKintoBlockName
    )
    expect(KintoBlockCreate.name.error.isVisible()).to.eql(false)
  })

  //TC_514
  it('should display language drop down option as `Node.js` and `C#.net`', () => {
    var options = KintoBlockCreate.languageField.getText().split('\n')
    expect(options[1]).to.eql('C#.net')
    expect(options[2]).to.eql('Node.js')
  })

  //TC_515
  it('should display protocol drop down options as `HTTP` and `gRPC`', () => {
    var options = KintoBlockCreate.protocolField.getText().split('\n')
    expect(options[1]).to.eql('HTTP')
    expect(options[2]).to.eql('gRPC')
  })

  //TC_516
  it('should display repository type drop down options as `create new repository` and `Existing Repositories`', () => {
    expect(KintoBlockCreate.getRepositoryType(1).getText()).to.eql(
      'Create new repository'
    )
    expect(KintoBlockCreate.getRepositoryType(2).getText()).to.eql(
      'Existing Repositories'
    )
  })

  //  //TC_517
  //  it('should display existing repositories of linked GitHub account to workspace, when user selects `existing repositories` option in repository type drop down', () => {
  //	    //TODO
  //  })

  //TC_518
  it('should display organisation drop down field, when user selects `create new repository` option in repository type drop down', () => {
    KintoBlockCreate.getRepositoryType(1) //check whether this is correct
    KintoBlockCreate.organisationField.waitForVisible()
    expect(KintoBlockCreate.organisationField.isVisible()).to.eql(true)
  })

  //TC_519
  it('should pre-populate the organisation name in the `repository` drop down field, when user selects an organisation is selected', () => {
    var orgName = KintoBlockCreate.organisationField.getText().split('\n')
    var orgOne = orgName[0]
    expect(KintoBlockCreate.orgNameFromRepoDropDown.getText()).to.eql(
      orgOne + '/'
    )
  })

  //TC_520
  it('should verify that `create new KintoBlock` button stays clickable, if validation conditons are not met', () => {
    KintoBlockCreate.name.input.setValue(testData.kintoblock.invalidKBFortyChar)
    expect(KintoBlockCreate.name.error.isVisible()).to.eql(true)
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.invalidKBDescription
    )
    expect(KintoBlockCreate.shortDescription.error.isVisible()).to.eql(true)
    KintoBlockCreate.submitGlobal()
    expect(KintoBlockCreate.submitBtn.isEnabled()).to.eql(true)
  })

  //TC_521
  it('should display loading symbol and navigate to KB list page, when user clicks `create new kintoblocks` button and validations are met', () => {
    DashboardIndex.kbHoveraddicon.click()
    browser.alertAccept()
    KintoBlockCreate.form.waitForVisible()
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
    KintoBlockCreate.loadingIcon.waitForVisible()
    expect(KintoBlockCreate.loadingIcon.isVisible()).to.eql(true)
    expect(KintoBlockCreate.loadingText.getText()).to.eql('Loading.')
    browser.pause(5000)
    KintoBlockList.myKintoBlocksList.waitForVisible()
  })

  //  //TC_522
  //  This works in staging as in local this is not yet implemented
  //  it('should display repository created via KintoHub in GitHub account repository list', () => {
  //		browser.moveToObject('.kintoblocks')
  //	    DashboardIndex.kbHoveraddicon.click()
  //	    KintoBlockCreate.form.waitForVisible()
  //	    KintoBlockCreate.name.input.setValue(
  //	      testData.kintoblock.validKBNameWithVowels
  //	    )
  //	    KintoBlockCreate.shortDescription.input.setValue(
  //	      testData.kintoblock.validKBDescription
  //	    )
  //	    KintoBlockCreate.language.input.selectByIndex(1)
  //	    KintoBlockCreate.protocol.input.selectByIndex(1)
  //	    KintoBlockCreate.repository.input.setValue(
  //	      testData.kintoblock.validRepoName
  //	    )
  //	    KintoBlockCreate.submitGlobal()
  //	    //Check index as per previous created KB's
  //	    KintoBlockList.myKintoBlocksList.waitForVisible(0)
  //	    KintoBlockList.getCard(0).click()
  //	    var repoName = KintoBlockManage.repoName.getValue()
  //	    browser.url('https://github.com/login')
  //	    WorkspaceManage.githubLoginField.setValue('github8555')
  //	    WorkspaceManage.githubPasswordField.setValue('github@2017')
  //	    workspaceManagePage.githubLoginBtn.click()
  //	    //TODO
  //  })

  //TC_510
  it('should verify that workspace with GitHub integration displays KB create page with following components', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.open(ws)
    KintoBlockCreate.form.waitForVisible()
    expect(KintoBlockCreate.nameField.isVisible()).to.eql(true)
    expect(KintoBlockCreate.description.isVisible()).to.eql(true)
    expect(KintoBlockCreate.languageField.isVisible()).to.eql(true)
    expect(KintoBlockCreate.protocolField.isVisible()).to.eql(true)
    expect(KintoBlockCreate.repositoryTypeField.isVisible()).to.eql(true)
    expect(KintoBlockCreate.getRepositoryType(1).isVisible()).to.eql(true)
    expect(KintoBlockCreate.organisationField.isVisible()).to.eql(true)
    expect(KintoBlockCreate.submitBtn.isVisible()).to.eql(true)
  })
})

describe('KB - List Page overall', () => {
  //	  //TC_442
  //	  it('should navigate user to KB list page, when user clicks on `KintoBlocks` in breadcrumb of KB manage page', () => {
  //	    var ws = Landing.workspaceSelect.getAttribute('data-test')
  //	    KintoBlockList.open(ws)
  //	    KintoBlockList.myKintoBlocksList.waitForVisible()
  //	    KintoBlockList.getCard(0).click()
  //	    KintoBlockManage.form.waitForVisible()
  //	    KintoBlockManage.toKbListPage.click()
  //	    //this is a bug will change workspace id in local
  //	    KintoBlockList.myKintoBlocksList.waitForVisible()
  //	  })

  //TC_443
  it('should navigate user to KB list page, if user enter KB list page URL in browser', () => {
    //added because "DashboardIndex.kintoBlocksleftnav.click()" to get KB list url
    DashboardIndex.kintoBlocksleftnav.click()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    var url = KintoBlockList.getUrl().split('/')
    var ws = url[3]
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    expect(KintoBlockManage.form.isVisible()).to.eql(true)
    browser.url(`/app/dashboard/${ws}/kintoblocks/list`)
    KintoBlockList.myKintoBlocksList.waitForVisible()
    expect(KintoBlockList.myKintoBlocksList.isVisible()).to.eql(true)
  })

  //TC_444
  it('should display KB list page title as `My KIntoBlocks`', () => {
    expect(KintoBlockList.listPageTitle.getText()).to.eql('My KintoBlocks')
  })

  //TC_445
  it('should display `create new kintoblock` button on top right of KB list page', () => {
    expect(KintoBlockList.createNewKbBtn.isVisible()).to.eql(true)
  })

  //TC_446
  it('should display first card in KB list page as `create new kintoblock` with pulsing `+` blue icon', () => {
    expect(KintoBlockList.kbCreateCard.isVisible()).to.eql(true)
    //TODO for pulsing blue icon
  })

  //	  //TC_447
  //	  it('should display every KB card as individual cards in KB list page', () => {
  //	    //TODO
  //	  })

  //TC_448
  it('should navigate user to KB create page, when user clicks on `create new kintoblock` button on top right of KB list page', () => {
    KintoBlockList.createNewKbBtn.click()
    KintoBlockCreate.form.waitForVisible()
    expect(KintoBlockCreate.form.isVisible()).to.eql(true)
  })

  //TC_449
  it('should verify that create KB card is entirely clickable, when user clicks on it should navigate to Kb create page', () => {
    DashboardIndex.kintoBlocksleftnav.click()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.kbCreateCardImg.click()
    KintoBlockCreate.form.waitForVisible()
    expect(KintoBlockCreate.form.isVisible()).to.eql(true)
    DashboardIndex.kintoBlocksleftnav.click()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.kbCreateCardAddIcon.click()
    KintoBlockCreate.form.waitForVisible()
    expect(KintoBlockCreate.form.isVisible()).to.eql(true)
    DashboardIndex.kintoBlocksleftnav.click()
    KintoBlockList.myKintoBlocksList.waitForVisible()
  })

  //TC_450
  it('should verify that any KB card is entirely clickable, when user clicks on it should navigate to Kb manage page', () => {
    KintoBlockList.getKbCardImg(0).waitForVisible()
    KintoBlockList.getKbCardImg(0).click()
    KintoBlockManage.form.waitForVisible()
    expect(KintoBlockManage.form.isVisible()).to.eql(true)
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    browser.url(`/app/dashboard/${ws}/kintoblocks/list`)
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getKbCardName(0).click()
    KintoBlockManage.form.waitForVisible()
    expect(KintoBlockManage.form.isVisible()).to.eql(true)
    browser.url(`/app/dashboard/${ws}/kintoblocks/list`)
    KintoBlockList.myKintoBlocksList.waitForVisible()
    //TODO See whether any other options is there
  })

  //TC_451
  it('should display newly created KB card next to KB create card in KB list page', () => {
    KintoBlockList.createNewKbBtn.waitForVisible()
    KintoBlockList.createNewKbBtn.click()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.name.input.setValue(
      testData.kintoblock.validKBNameWithDollar
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
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).waitForVisible()
    //this will fail its a bug
    expect(KintoBlockList.getKbCardName(0).getText()).to.eql(
      testData.kintoblock.validKBNameWithDollar
    )
  })

  //TC_452
  it('should display recently modified KB card next to KB create card in KB list page', () => {
    KintoBlockList.getCard(1).waitForVisible()
    KintoBlockList.getCard(1).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.name.input.setValue(testData.kintoblock.validKBNameEight)
    browser.pause(2000)
    KintoBlockCreate.submitGlobal()
    browser.pause(2000)
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    browser.url(`/app/dashboard/${ws}/kintoblocks/list`)
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).waitForVisible()
    //this will fail its a bug
    expect(KintoBlockList.getKbCardName(0).getText()).to.eql(
      testData.kintoblock.validKBNameEight
    )
  })

  //	  //TC_453
  //	  it('should display KB list as per the workspace they were created', () => {
  //	    //TODO
  //	  })
})

describe('KB - Success MSG on Creation - Component', () => {
  //TC_449
  it('should dislay success message for KB creation, if that KB doesn`t have any commits', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    expect(KintoBlockManage.noCommit.getText()).to.eql(
      'No commit has been made on GitHub'
    )
    expect(KintoBlockManage.kbSuccessMsg.isVisible()).to.eql(true)
  })

  //TC_450
  it('should display success message for KB creation below top navigation bar', () => {
    expect(KintoBlockManage.kbSuccessMsg.isVisible()).to.eql(true)
  })

  //TC_451
  it('should display success message for KB creation untill user dismisses it', () => {
    //Already its displayed
    KintoBlockManage.successMsgCloseBtn.click()
    expect(KintoBlockManage.kbSuccessMsg.isVisible()).to.eql(false)
  })

  //TC_452
  it('should display success message for KB creation in other pages of KH, if its not yet dismissed', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.kbSuccessMsg.waitForVisible()
    expect(KintoBlockManage.kbSuccessMsg.isVisible()).to.eql(true)
    DashboardIndex.applicationLeftnav.click()
    KintoAppList.mykintoAppList.waitForVisible()
    expect(KintoBlockManage.kbSuccessMsg.isVisible()).to.eql(true)
    DashboardIndex.kintoBlocksleftnav.click()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    expect(KintoBlockManage.kbSuccessMsg.isVisible()).to.eql(true)
    KintoBlockManage.successMsgCloseBtn.click()
    DashboardIndex.homeLeftnav.click()
    DashboardIndex.kintoHubLogo.waitForVisible()
    expect(KintoBlockManage.kbSuccessMsg.isVisible()).to.eql(false)
  })

  //	  //TC_453
  //	  it('should display success message for kB creation inside blue bar', () => {
  //	    //TODO color verification
  //	  })

  //TC_454
  it('should display success message for KB creation as `Kudos for creating a KintoBlock - head over to Github and start coding!`', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    expect(KintoBlockManage.kbSuccessMsg.isVisible()).to.eql(true)
    expect(KintoBlockManage.kbCreationSuccessMsgText.getText()).to.eql(
      'Kudos for creating a KintoBlock - head over to Github and start coding!'
    )
  })

  //TC_455
  it('should display close icon for success message for KB creation on left side of blue bar', () => {
    expect(KintoBlockManage.successMsgCloseBtn.isVisible()).to.eql(true)
  })
})

describe('KB - List cards', () => {
  //TC_461
  //   it('should display KB colored top matching with KB icon color', () => {
  //     //TODO
  //   })

  //TC_462
  it('should display icon for every KB on new KB creation', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.open(ws)
    KintoBlockCreate.name.input.setValue(
      testData.kintoblock.validKBNameWithVowels
    )
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescriptionWithChar
    )
    KintoBlockCreate.language.input.selectByIndex(1)
    KintoBlockCreate.protocol.input.selectByIndex(1)
    KintoBlockCreate.repository.input.setValue(
      testData.kintoblock.validRepoName
    )
    KintoBlockCreate.submitGlobal()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getKbCardImg(4).waitForVisible()
    expect(KintoBlockList.getKbCardImg(4).isVisible()).to.eql(true)
    expect(KintoBlockList.getKbCardName(4).getText()).to.eql(
      testData.kintoblock.validKBNameWithVowels
    )
  })

  //TC_463
  it('should display branch name on top right of any KB card', () => {
    //TODO For latest commit of branch
    KintoBlockList.getKbBranchNameFromCard(0).waitForVisible()
    expect(KintoBlockList.getKbBranchNameFromCard(0).isVisible()).to.eql(true)
  })

  //TC_464
  it('should display KB card title text as per KB created or modified', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.open(ws)
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.name.input.setValue(
      testData.kintoblock.validKBNameWithOddNumbers
    )
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescriptionWithChar
    )
    KintoBlockCreate.language.input.selectByIndex(1)
    KintoBlockCreate.protocol.input.selectByIndex(1)
    KintoBlockCreate.repository.input.setValue(
      testData.kintoblock.validRepoName
    )
    KintoBlockCreate.submitGlobal()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(5).waitForVisible()
    expect(KintoBlockList.getKbCardName(5).getText()).to.eql(
      testData.kintoblock.validKBNameWithOddNumbers
    )
    KintoBlockList.getCard(5).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.name.input.setValue(testData.kintoblock.validUpdatedKBName)
    browser.pause(2000)
    KintoBlockManage.submitGlobal()
    browser.pause(2000)
    KintoBlockList.open(ws)
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getKbCardName(5).waitForVisible()
    expect(KintoBlockList.getKbCardName(5).getText()).to.eql(
      testData.kintoblock.validUpdatedKBName
    )
  })

  //TC_465
  it('should display upto four dependencies of KB in stacked manner if there is more than four dependencies in a KB', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.getCard(4).click()
    KintoBlockManage.form.waitForVisible()
    KintoAppCreate.kbdropDown.setValue('u')
    browser.leftClick('div.Select-input > input')
    browser.keys('Return')
    KintoAppCreate.kbdropDown.setValue('u')
    browser.leftClick('div.Select-input > input')
    browser.keys('Return')
    KintoAppCreate.kbdropDown.setValue('u')
    browser.leftClick('div.Select-input > input')
    browser.keys('Return')
    KintoAppCreate.kbdropDown.setValue('u')
    browser.leftClick('div.Select-input > input')
    browser.keys('Return')
    KintoAppCreate.kbdropDown.setValue('u')
    browser.leftClick('div.Select-input > input')
    browser.keys('Return')
    KintoBlockManage.submitGlobal()
    browser.pause(2000)
    KintoBlockList.open(ws)
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getStackedDependenciesFromKbCard(4, 1).waitForVisible()
    expect(
      KintoBlockList.getStackedDependenciesFromKbCard(4, 1).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockList.getStackedDependenciesFromKbCard(4, 2).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockList.getStackedDependenciesFromKbCard(4, 3).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockList.getStackedDependenciesFromKbCard(4, 4).isVisible()
    ).to.eql(true)
    expect(
      KintoBlockList.getStackedDependenciesFromKbCard(4, 5).isVisible()
    ).to.eql(false)
  })

  //TC_466
  it('should display `+X` if dependencies count is more than four, where X is total count of dependencies which is not displayed', () => {
    //Try to get environments counts by for loop, instead of hard coding value 1
    expect(KintoBlockList.getRemainingDependenciesCount(4).getText()).to.eql(
      '+1'
    )
  })

  //TC_467
  //   it('should display remaining number of dependencies in `+X`, where X is remaining number of dependencies', () => {
  //     //TODO Try to get environments counts by for loop, instead of hard coding X value
  //   })

  //TC_468
  it('should display branch name on top right of KB card', () => {
    KintoBlockList.getKbBranchNameFromCard(0).waitForVisible()
    expect(KintoBlockList.getKbBranchNameFromCard(0).isVisible()).to.eql(true)
  })

  //TC_469
  it('should display `...` button in every KB card', () => {
    KintoBlockList.getkbListDropDown(0).waitForVisible()
    expect(KintoBlockList.getkbListDropDown(0).isVisible()).to.eql(true)
  })

  //TC_470
  it('should display options edit branch, view all branches and tags and view endpoints in drop down displayed via `...` button on KB card', () => {
    var branchName = KintoBlockList.getKbBranchNameFromCard(0).getText()
    KintoBlockList.getkbListDropDown(0).click()
    //TODO for wait for visible
    expect(KintoBlockList.getEditBranchOption(0).isVisible()).to.eql(true)
    expect(KintoBlockList.getBranchNameFromKbCardDropDown(0).getText()).to.eql(
      branchName
    )
    expect(
      KintoBlockList.getViewAllBranchesAndTagsOption(0).isVisible()
    ).to.eql(true)
    expect(KintoBlockList.getViewEndpointsOption(0).isVisible()).to.eql(true)
  })

  //TC_471
  it('should display 2 tabs(Branches and tags), search bar, scrollable branch list, scrollable tags list and commit code with time&date and comments in `view all branches and tags` drop down', () => {
    expect(KintoBlockList.getBranchListFromKbDropDown(0).isVisible()).to.eql(
      true
    )
    expect(KintoBlockList.getTagsListFromKbDropDown(0).isVisible()).to.eql(true)
    expect(KintoBlockList.getViewAllBranchesAndTagSearchBar(0)).to.eql(true)
    //TODO for checking scrollable
    expect(KintoBlockList.getTagVersionFromTagList(0, 1).isVisible()).to.eql(
      true
    )
    expect(
      KintoBlockList.getTagTimeAndDateFromTagList(0, 1).isVisible()
    ).to.eql(true)
    expect(KintoBlockList.getTagNotesFromTagList(0, 1).isVisible()).to.eql(true)
  })

  //TC_472
  it('should display dependencies drop down title as `Dependencies(X), where X is the total count of dependencies`', () => {
    KintoBlockList.getRemainingDependenciesCount(4).click()
    KintoBlockList.kbListDropDown.waitForVisible()
    //For now hard coding the count
    expect(KintoBlockList.getDependenciesDropDownTitle(4).getText()).to.eql(
      'Dependencies (5)'
    )
  })

  // //TC_473
  // it('should display total count of dependencies currently in KA, where X in `Dependencies(X)` is total count', () => {
  //   //TODO Try to get environments counts by for loop, instead of hard coding X value
  // })

  //TC_474
  // it('should display dependencies drop down as a scrollable list', () => {
  //   //TODO Need clarification on how to check whether its scrollable or not
  // })

  //TC_475
  it('should display dependencies drop down, when user clicks on stacked dependencies icon or `+X` icon next to stacked dependencies', () => {
    KintoBlockList.getStackedDependenciesFromKbCard(4, 3).click()
    expect(KintoBlockList.getDependenciesDropDown(4).isVisible()).to.eql(true)
    KintoBlockList.getStackedDependenciesFromKbCard(4, 3).click()
    KintoBlockList.getRemainingDependenciesCount(4).click()
    expect(KintoBlockList.getDependenciesDropDown(4).isVisible()).to.eql(true)
  })

  //TC_476
  //   it('should turn `+X` icon to blue which is next to stacked dependencies, when user hover over it', () => {
  //     //TODO
  //   })

  //TC_477
  //   it('should display grey highlight for any row for drop down which is visible, when user clicks on `...` button in any KB card', () => {
  //     //TODO
  //   })

  //TC_478
  it('should navigate user to KB manage page, when user clicks on `edit branch` option which appears via `...` button in any KB card', () => {
    var kbName = KintoBlockList.getKbCardName(0).getText()
    KintoBlockList.getkbListDropDown(0).click()
    KintoBlockList.getEditBranchOption(0).waitForVisible()
    KintoBlockList.getEditBranchOption(0).click()
    KintoBlockManage.form.waitForVisible()
    expect(KintoBlockManage.form.isVisible()).to.eql(true)
    expect(kbName).to.eql(KintoBlockManage.title.getText())
  })

  //TC_479
  it('should replace first drop down displayed via `...` button in any KB card with drop down visible via `view all branches and tags` drop down', () => {
    DashboardIndex.kintoBlocksleftnav.click()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getkbListDropDown(0).click()
    //first drop down
    KintoBlockList.kbListDropDown.waitForVisible()
    expect(KintoBlockList.kbListDropDown.isVisible()).to.eql(true)
    KintoBlockList.getViewAllBranchesAndTagsOption(0).click()
    //second drop down
    KintoBlockList.kbListDropDown.waitForVisible()
    expect(KintoBlockList.kbListDropDown.isVisible()).to.eql(true)
    expect(
      KintoBlockList.getViewAllBranchesAndTagSearchBar(0).isVisible()
    ).to.eql(true)
  })

  //TC_480
  it('should navigate to documentation page of that KB current version, when user clicks on `view endpoints` option via `...` button in KB card', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getkbListDropDown(0).click()
    KintoBlockList.getViewEndpointsOption(0).waitForVisible()
    KintoBlockList.getViewEndpointsOption(0).click()
    KintoBlockList.viewEndpointsTitle.waitForVisible()
    expect(KintoBlockList.viewEndpointsTitle.getText()).to.eql(
      'ENDPOINT DOCUMENTATION'
    )
  })

  //TC_481
  //This test script runs only on staging as in local GitHub is not yet integrated
  it('should display upto 5 branches and upto 2 tags in drop down displayed via `view all branches and tags`', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.getkbListDropDown(0).click()
    KintoBlockList.kbListDropDown.waitForVisible()
    KintoBlockList.getViewAllBranchesAndTagsOption(0).click()
    KintoBlockList.getViewAllBranchesAndTagSearchBar(0).waitForVisible()
    //TODO for checking branch list and tag list
  })

  //TC_482
  it('should filter branches and tags list using the search bar displayed via `view all branches and tags`', () => {
    //For filtering branches
    KintoBlockList.getViewAllBranchesAndTagSearchBar(0).setValue('master')
    KintoBlockList.getBranchFromBranchList(0, 1).waitForVisible()
    expect(KintoBlockList.getBranchFromBranchList(0, 1).getText()).to.eql(
      'master'
    )
    //For filtering tags
    KintoBlockList.getTagsListFromKbDropDown(0).click()
    KintoBlockList.getTagFromTagsList(0, 1).waitForVisible()
    KintoBlockList.getViewAllBranchesAndTagSearchBar(0).setValue('3')
    //This fails as in local we can't do commit
    expect(KintoBlockList.getTagVersionFromTagList(0, 1).getText()).to.eql(
      '1.2.3'
    )
  })

  //TC_483
  it('should navigate user to KB manage page of that branch, when user clicks on any branch from branch drop down list', () => {
    KintoBlockList.getBranchListFromKbDropDown(0).click()
    KintoBlockList.getBranchFromBranchList(0, 1).waitForVisible()
    var branchName = KintoBlockList.getBranchFromBranchList(0, 1).getText()
    KintoBlockList.getBranchFromBranchList(0, 1).click()
    KintoBlockManage.form.waitForVisible()
    expect(branchName).to.eql(
      KintoBlockManage.branchNameFromBreadcrumb.getText()
    )
  })

  //TC_484
  //This fails as in local we can't do commit
  it('should navigate user to KB tagged page of that version, when user clicks on any tag from tags drop down list', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getkbListDropDown(0).click()
    KintoBlockList.getViewAllBranchesAndTagsOption(0).waitForVisible()
    KintoBlockList.getViewAllBranchesAndTagsOption(0).click()
    KintoBlockList.getViewAllBranchesAndTagSearchBar(0).waitForVisible()
    KintoBlockList.getTagsListFromKbDropDown(0).click()
    KintoBlockList.getViewAllBranchesAndTagSearchBar(0).setValue('3')
    var tagVersion = KintoBlockList.getTagFromTagsList(0, 1).getText()
    KintoBlockList.getTagFromTagsList(0, 1).click()
    KintoBlockManage.form.waitForVisible()
    expect(tagVersion).to.eql(
      KintoBlockManage.tagVersionFromBreadcrumb.getText()
    )
  })

  //TC_485
  it('should verify that only basic info component is editable in KB tagged page', () => {
    expect(KintoBlockManage.submitBtn.isEnabled()).to.eql(false)
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.name.input.setValue(
      testData.kintoblock.validKBNameWithVowels
    )
    KintoBlockManage.submitBtn.waitForVisible()
    expect(KintoBlockManage.submitBtn.isEnabled()).to.eql(true)
    KintoBlockManage.submitGlobal()
    browser.pause(2000)
    expect(KintoBlockManage.submitBtn.isEnabled()).to.eql(false)
    KintoBlockManage.description.input.setValue(
      testData.kintoblock.validKBDescriptionWithChar
    )
    KintoBlockManage.submitBtn.waitForVisible()
    expect(KintoBlockManage.submitBtn.isEnabled()).to.eql(true)
    KintoBlockManage.submitGlobal()
    browser.pause(2000)
    expect(KintoBlockManage.getDependenciesDeleteIcon(1).isVisible()).to.eql(
      false
    )
  })

  //TC_486
  it('should make disappear drop downs visible via KB card, when user clicks any where on page other than on KB card', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getkbListDropDown(0).click()
    KintoBlockList.kbListDropDown.waitForVisible()
    expect(KintoBlockList.kbListDropDown.isVisible()).to.eql(true)
    DashboardIndex.kintoBlocksleftnav.click()
    expect(KintoBlockList.kbListDropDown.isVisible()).to.eql(false)
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getkbListDropDown(0).click()
    KintoBlockList.kbListDropDown.waitForVisible()
    KintoBlockList.getViewAllBranchesAndTagsOption(0).click()
    KintoBlockList.branchesAndTagsDropDownVisible.waitForVisible()
    expect(KintoBlockList.branchesAndTagsDropDownVisible.isVisible()).to.eql(
      true
    )
    DashboardIndex.kintoBlocksleftnav.click()
    expect(KintoBlockList.kbListDropDown.isVisible()).to.eql(false)
  })
})

describe('KB - Basic info Component', () => {
  //TC_565
  it('should display title for "Basic Info" component as `Basic Info` in KB manage and tagged page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    expect(KintoAppCreate.basicInfoComponentTitle.getText()).to.eql(
      'Basic Info'
    )
    //TODO in KB tagged page as in local we can't do tag latest commit
  })

  //TC_566
  it('should display subtitle for "Basic Info" component as `Choose the name for this KintoBlock and give a a short description. If you make the KintoBlock public, they will help other people discover your application. Let us know your preferred coding flavor and connect your repo.` in in KB manage and tagged page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    expect(KintoAppCreate.basicInfoComponentSubtitle.getText()).to.eql(
      'Choose the name for this KintoBlock and give a a short description. If you make the KintoBlock public, they will help other people discover your application. Let us know your preferred coding flavor and connect your repo.'
    )
    //TODO in KB tagged page as in local we can't do tag latest commit
  })

  //TC_567
  it('should display title for language, protocol and repository fields in KB manage and tagged page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    expect(KintoBlockManage.languageFieldTitle.getText()).to.eql('LANGUAGE')
    expect(KintoBlockManage.protocolFieldTitle.getText()).to.eql('PROTOCOL')
    expect(KintoBlockManage.repositoryFieldTitle.getText()).to.eql('REPOSITORY')
    //TODO in KB tagged page as in local we can't do tag latest commit
  })

  // //TC_568
  // it('should display one line input field and text area field under basic info component in KB manage page and tagged page', () => {
  //     //TODO
  // })

  //TC_569
  it('should display title for text fields in "Basic Info" component in KB manage page and tagged page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    expect(KintoAppCreate.basicInfoComponentNameFieldTitle.getText()).to.eql(
      'KINTOBLOCK NAME'
    )
    expect(
      KintoAppCreate.basicInfoComponentDescriptionFieldTitle.getText()
    ).to.eql('DESCRIPTION')
    //TODO in KB tagged page as in local we can't do tag latest commit
  })

  //TC_570
  it('should display placeholder text as "Enter a name for your KintoBlock" in KB name field of KB create page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.open(ws)
    KintoBlockCreate.form.waitForVisible()
    expect(KintoBlockCreate.nameField.getAttribute('placeholder')).to.eql(
      'Enter a name for your KintoBlock'
    )
  })

  //TC_571
  it('should display placeholder text as "Enter a short description of your KintoBlock" in KB description field of KB create, manage and tagged page', () => {
    //Already in KB create page
    expect(KintoBlockCreate.description.getAttribute('placeholder')).to.eql(
      'Enter a short description of your KintoBlock'
    )
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    expect(
      KintoBlockCreate.description.input.getAttribute('placeholder')
    ).to.eql('Enter a short description of your KintoBlock')
    //TODO in KB tagged page as in local we can't do tag latest commit
  })

  //TC_572
  it('should display language, protocol and repository fields greyed out/disabled in KB manage and tagged page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    expect(KintoBlockManage.languageField.isEnabled()).to.eql(false)
    expect(KintoBlockManage.protocolField.isEnabled()).to.eql(false)
    expect(KintoBlockManage.repositoryField.isEnabled()).to.eql(false)
    //TODO in KB tagged page as in local we can't do tag latest commit
  })

  // //TC_573
  // it('should display an icon in "Basic Info" component and `Expand` button on top right of the component', () => {
  //     //TODO Not implemented
  // })

  //TC_574
  it('should display "Basic Info" component text fields as empty, when user navigates to KB create page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.open(ws)
    KintoBlockCreate.form.waitForVisible()
    expect(KintoBlockCreate.nameField.getText()).to.eql('')
    expect(KintoBlockCreate.description.getText()).to.eql('')
  })

  //TC_575
  it('should verify that `create new kintoblock` button becomes enabled, when user enters at least KB name or description', () => {
    //Already in KB create page
    expect(KintoBlockCreate.submitBtn.isEnabled()).to.eql(false)
    KintoBlockCreate.name.input.setValue(
      testData.kintoblock.validKintoBlockName
    )
    expect(KintoBlockCreate.submitBtn.isEnabled()).to.eql(true)
  })

  //TC_576
  it('should not allow user to create a KB without entering the description', () => {
    //Previously entered KB name only in KB create page
    KintoBlockCreate.submitGlobal()
    expect(KintoBlockCreate.shortDescription.error.isVisible()).to.eql(true)
  })

  //TC_577
  it('should verify that only KB name and description fields are editable in "Basic Info" component of KB manage and tagged page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    browser.alertAccept()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.name.input.setValue(
      testData.kintoblock.validKintoBlockName
    )
    KintoBlockManage.description.input.setValue(
      testData.kintoblock.validKBDescriptionWithChar
    )
    expect(KintoBlockManage.languageField.isEnabled()).to.eql(false)
    expect(KintoBlockManage.protocolField.isEnabled()).to.eql(false)
    expect(KintoBlockManage.repositoryField.isEnabled()).to.eql(false)
    KintoBlockManage.submitBtn.waitForVisible()
    KintoBlockManage.submitGlobal()
    //TODO in KB tagged page as in local we can't do tag latest commit
  })

  //TC_578
  it('should display previously saved KB name and description in KB manage and tagged page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    browser.alertAccept()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    expect(KintoBlockCreate.nameField.getValue()).to.eql(
      testData.kintoblock.validKintoBlockName
    )
    expect(KintoBlockCreate.description.getValue()).to.eql(
      testData.kintoblock.validKBDescriptionWithChar
    )
  })

  //TC_579
  it('should allow user to edit and save KB name as well as description for multiple times', () => {
    //Already in KB manage page
    expect(KintoBlockManage.submitBtn.getText()).to.eql('Tag Latest Commit')
    KintoBlockCreate.nameField.setValue(testData.kintoblock.validKintoBlockName)
    KintoBlockCreate.description.setValue(
      testData.kintoblock.validKBDescriptionWithChar
    )
    expect(KintoBlockManage.submitBtn.getText()).to.eql('Save Changes')
    KintoBlockManage.submitBtn.click()
    expect(KintoBlockManage.submitBtn.getText()).to.eql('Tag Latest Commit')
    KintoBlockCreate.nameField.setValue(
      testData.kintoblock.validKintoBlockNameWithDigit
    )
    KintoBlockCreate.description.setValue(
      testData.kintoblock.validKBDescriptionWithChar
    )
    expect(KintoBlockManage.submitBtn.getText()).to.eql('Save Changes')
    KintoBlockManage.submitBtn.click()
    expect(KintoBlockManage.submitBtn.getText()).to.eql('Tag Latest Commit')
    KintoBlockCreate.nameField.setValue(
      testData.kintoblock.validKBNameWithDollar
    )
    KintoBlockCreate.description.setValue(
      testData.kintoblock.validKBDescriptionWithChar
    )
    expect(KintoBlockManage.submitBtn.getText()).to.eql('Save Changes')
    KintoBlockManage.submitBtn.waitForVisible()
    KintoBlockManage.submitGlobal()
  })

  //TC_580
  it('should reflect the changes of KB name and description, where ever its displayed', () => {
    //Already edited and saved
    var branchName = KintoBlockManage.branchNameFromBreadcrumb.getText()
    var kbName = KintoBlockManage.kbNameFromBreadcrumb.getText()
    expect(KintoBlockManage.title.getText()).to.eql(kbName + ' - ' + branchName)
    expect(KintoBlockManage.kbNameFromBreadcrumb.getText()).to.eql(
      testData.kintoblock.validKBNameWithDollar
    )
    expect(KintoBlockCreate.nameField.getText()).to.eql(
      testData.kintoblock.validKBNameWithDollar
    )
    expect(KintoBlockCreate.description.getText()).to.eql(
      testData.kintoblock.validKBDescriptionWithChar
    )
    KintoBlockManage.kbListDropDown.click()
    KintoBlockManage.getKbNameFromDropDown(1).waitForVisible()
    expect(KintoBlockManage.getKbNameFromDropDown(1).getText()).to.eql(kbName)
    KintoBlockManage.viewEndpointsBtn.click()
    KintoBlockList.viewEndpointsTitle.waitForVisible()
    expect(KintoBlockManage.kbNameFromViewEndpointsBreadcrumb.getText()).to.eql(
      kbName
    )
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getKbCardName(0).waitForVisible()
    expect(KintoBlockList.getKbCardName(0).getText()).to.eql(kbName)
    //TODO for KB tagged page
  })

  //TC_581
  it('should verify that language, protocol and repository name are displayed in KB manage page as per entered during KB creation', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.open(ws)
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.name.input.setValue(testData.kintoblock.validKBNameEight)
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescription
    )
    KintoBlockCreate.language.input.selectByIndex(1)
    var language = KintoBlockCreate.languageField.getText('option:checked')
    KintoBlockCreate.protocol.input.selectByIndex(1)
    var protocol = KintoBlockCreate.protocolField.getText('option:checked')
    KintoBlockCreate.repository.input.setValue(
      testData.kintoblock.validRepoName
    )
    KintoBlockCreate.submitGlobal()
    KintoBlockList.getCard(5).waitForVisible()
    KintoBlockList.getCard(5).click()
    KintoBlockManage.form.waitForVisible()
    var branchName = KintoBlockManage.branchNameFromBreadcrumb.getText()
    expect(KintoBlockManage.title.getText()).to.eql(
      testData.kintoblock.validKBNameEight + ' - ' + branchName
    )
    expect(KintoBlockManage.languageField.getText('option:checked')).to.eql(
      language
    )
    expect(KintoBlockManage.protocolField.getText('option:checked')).to.eql(
      protocol
    )
    expect(KintoBlockManage.repositoryField.getText('option:checked')).to.eql(
      testData.kintoblock.validRepoName
    )
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

  it('should display alert pop up message, when user try to navigate to any page of KH from `manage KB` page without saving the changes made', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.name.input.setValue(testData.kintoapp.validKintoAppName)
    DashboardIndex.kintoBlocksleftnav.click()
    browser.alertAccept()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
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
    KintoBlockManage.submitBtn.waitForVisible()
    KintoBlockManage.submitGlobal()
    browser.waitUntil(() => {
      return KintoBlockManage.savebar
        .getAttribute('class')
        .includes('e2e-disabled')
    }, 5000)
  })
})
describe('KB - Edit Page Overall', () => {
  //TC_523
  it('should navigate to KB manage page, when user selects a KB from KB drop down list displayed via breadcrumb', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    browser.alertAccept()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.kbListDropDown.click()
    KintoBlockManage.kbListDropDownVisible.waitForVisible()
    var kbName = KintoBlockManage.getKbNameFromDropDown(1).getText()
    KintoBlockManage.getKbFromBreadcrumbDropDown(1).click()
    KintoBlockManage.form.waitForVisible()
    expect(KintoBlockManage.branchNameFromBreadcrumb.getText()).to.eql(kbName)
  })

  //TC_524
  it('should navigate user to KB manage page, when user enters the URL of KB manage page in the browser', () => {
    //Already in KB manage page
    var url = KintoBlockManage.getUrl()
    var ws = url[3]
    var kbId = url[5]
    var branchName = url[7]
    //Navigating to KB list page
    var kbTitle = KintoBlockManage.title.getText()
    KintoBlockList.open(ws)
    KintoBlockList.myKintoBlocksList.waitForVisible()
    expect(KintoBlockList.myKintoBlocksList.isVisible()).to.eql(true)
    //Entering URL for KB manage page
    browser.url(
      `/app/dashboard/${ws}/kintoblocks/${kbId}/versions/${branchName}/branch`
    )
    KintoBlockManage.form.waitForVisible()
    expect(KintoBlockManage.form.isVisible()).to.eql(true)
    expect(KintoBlockManage.title.getText()).to.eql(kbTitle)
  })

  //TC_525
  it('should display `view endpoints` button on top right of KB manage page', () => {
    KintoBlockManage.viewEndpointsBtn.waitForVisible()
    expect(KintoBlockManage.viewEndpointsBtn.isVisible()).to.eql(true)
    expect(KintoBlockManage.viewEndpointsBtn.getText()).to.eql('View Endpoints')
  })

  //TC_526
  it('should display KB manage title as per KB selected', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).waitForVisible()
    var branchName = KintoBlockList.getKbBranchNameFromCard(0).getText()
    var kbName = KintoBlockList.getKbCardName(0).getText()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    expect(KintoBlockManage.title.getText()).to.eql(kbName + ' - ' + branchName)
  })

  //TC_527
  it('should display members tool bar component of KB manage page', () => {
    expect(KintoBlockManage.membersBar.isVisible()).to.eql(true)
  })

  //TC_528
  it('should display basic info component of KB manage page', () => {
    expect(KintoBlockManage.basicInfoComponent.isVisible()).to.eql(true)
  })

  //TC_529
  it('should display dependencies component of KB manage page', () => {
    expect(KintoBlockManage.dependenciesComponent.isVisible()).to.eql(true)
  })

  //TC_530
  it('should display environment and custom parameters component of KB manage page', () => {
    expect(KintoBlockManage.parametersComponent.isVisible()).to.eql(true)
  })

  //TC_531
  it('should display `Tag latest commit` button on bottom right of KB manage page', () => {
    expect(KintoBlockManage.tagLatestCommitBtn.isVisible()).to.eql(true)
    expect(KintoBlockManage.tagLatestCommitBtn.getText()).to.eql(
      'Tag Latest Commit'
    )
  })

  //TC_532
  it('should display validation error message as `Must be 3 characters or more`, when user enters less than 3 characters in KB name field', () => {
    KintoBlockManage.name.input.setValue(testData.kintoblock.invalidKBThreeChar)
    expect(KintoBlockManage.name.error.getText()).to.eql(
      'Must be 3 characters or more'
    )
  })

  //TC_533
  it('should display validation error message as `Must be 35 characters or less`, when user enters more than 35 characters in KB name field', () => {
    KintoBlockManage.name.input.setValue(testData.kintoblock.invalidKBFortyChar)
    expect(KintoBlockManage.name.error.getText()).to.eql(
      'Must be 35 characters or less'
    )
  })

  //TC_534
  it('should display validation error message as `Must be 200 characters or less`, when user enters more than 200 characters in KB description field', () => {
    KintoBlockManage.description.input.setValue(
      testData.kintoblock.invalidKBDescription
    )
    expect(KintoBlockManage.description.error.getText()).to.eql(
      'Must be 200 characters or less'
    )
  })

  //TC_535
  it('should display validation error message as `Only lowercase characters and digits are allowed`, when user enters invalid characters in KB name field', () => {
    KintoBlockManage.name.input.setValue(testData.kintoblock.invalidKBCAPSChar)
    expect(KintoBlockManage.name.error.getText()).to.eql(
      'Only lowercase characters and digits are allowed'
    )
  })

  //TC_536
  it('should display validation error message as `The first character can`t be a digit`, when user enters first character as number in KB name field', () => {
    KintoBlockManage.name.input.setValue(
      testData.kintoblock.invalidKBNameWithDigit
    )
    expect(KintoBlockManage.name.error.getText()).to.eql(
      `The first character can't be a digit`
    )
  })

  //TC_537
  it('should make disappear triggered error message, when user enters valid data in second try', () => {
    KintoBlockManage.name.input.setValue(testData.kintoblock.invalidKBThreeChar)
    expect(KintoBlockManage.name.error.isVisible()).to.eql(true)
    //Entering valid data on second try
    KintoBlockManage.name.input.setValue(
      testData.kintoblock.validKBNameWithStar
    )
    expect(KintoBlockManage.name.error.isVisible()).to.eql(false)
  })

  //TC_538
  it('should display `Tag latest commit` button enabled, when user open up a KB manage page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    browser.alertAccept()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    expect(KintoBlockManage.tagLatestCommitBtn.isEnabled()).to.eql(true)
  })

  //TC_539
  it('should trigger `tag this commit` pop up, when user clicks on `tag latest commit` button', () => {
    KintoBlockManage.tagLatestCommitBtn.click()
    //This validation will fail as it's a bug
    KintoBlockManage.tagLatestCommitPopUp.waitForVisible()
    expect(KintoBlockManage.tagLatestCommitPopUp.isVisible()).to.eql(true)
  })

  //TC_540
  it('should revert `Tag latest commit` button to `save changes` button, when user edits the KB manage page', () => {
    expect(KintoBlockManage.tagLatestCommitBtn.getText()).to.eql(
      'Tag Latest Commit'
    )
    KintoBlockManage.name.input.setValue(
      testData.kintoblock.validKBNameWithStar
    )
    browser.pause(2000)
    expect(KintoBlockManage.submitBtn.getText()).to.eql('Save Changes')
  })

  //TC_541
  it('should revert `save changes` button to `Tag latest commit` button, when user save the changes', () => {
    //Saving the previous changes
    KintoBlockManage.submitGlobal()
    browser.pause(2000)
    expect(KintoBlockManage.tagLatestCommitBtn.getText()).to.eql(
      'Tag Latest Commit'
    )
  })

  //TC_542
  it('should not revert back to `Tag latest commit` button from `save changes` button, when validation conditions are not met during edit', () => {
    expect(KintoBlockManage.tagLatestCommitBtn.getText()).to.eql(
      'Tag Latest Commit'
    )
    KintoBlockManage.name.input.setValue(testData.kintoblock.invalidKBThreeChar)
    expect(KintoBlockManage.name.error.isVisible()).to.eql(true)
    browser.pause(2000)
    KintoBlockManage.submitGlobal()
    expect(KintoBlockManage.submitBtn.getText()).to.eql('Save Changes')
  })

  //TC_543
  it('should navigate to documentation that KB, when user clicks on `view endpoints` button in KB manage page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    browser.alertAccept()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.viewEndpointsBtn.click()
    KintoBlockList.viewEndpointsTitle.waitForVisible()
    expect(KintoBlockList.viewEndpointsTitle.getText()).to.eql(
      'ENDPOINT DOCUMENTATION'
    )
  })

  //TC_545
  it('should navigate user to requested page, when user accepts the alert message while editing the KB manage page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    browser.alertAccept()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.name.input.setValue(
      testData.kintoblock.validKBNameWithStar
    )
    DashboardIndex.kintoBlocksleftnav.click()
    browser.alertAccept()
    KintoBlockList.myKintoBlocksList.waitForVisible()
    expect(KintoBlockList.myKintoBlocksList.isVisible()).to.eql(true)
  })

  //TC_546
  it('should retain user in KB manage page, when user declines the alert message', () => {
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.name.input.setValue(
      testData.kintoblock.validKBNameWithStar
    )
    browser.pause(2000)
    expect(KintoBlockManage.submitBtn.getText()).to.eql('Save Changes')
    DashboardIndex.kintoBlocksleftnav.click()
    browser.alertDismiss()
    expect(KintoBlockManage.submitBtn.getText()).to.eql('Save Changes')
  })
})
