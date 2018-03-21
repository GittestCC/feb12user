import { expect } from 'chai'
import Login from '../page-objects/login.page'
import DashboardIndex from '../page-objects/dashboard.index.page'
import WorkspaceCreate from '../page-objects/workspace.create.page'
import WorkspaceManage from '../page-objects/workspace.manage.page'
import KintoAppList from '../page-objects/kintoApp.list.page'
import KintoAppCreate from '../page-objects/kintoApp.create.page'
import KintoAppManage from '../page-objects/kintoApp.manage.page'
import testData from '../constants/testdata.json'
import Landing from '../page-objects/landing.page'
import { flashyGreen, green, grey } from '../constants/colors'

describe('workspace create/edit members', () => {
  it('should navigate to create new workspace page, when first option create new a workspace is selected from workspace dropdown', () => {
    Login.login()
    DashboardIndex.workspaceDropdown.selectByValue(0)
    expect(WorkspaceCreate.form.isVisible()).to.eql(true)
  })

  it('should navigate to create new workspace page, when create new workspace button is clicked from the  breadcrumb', () => {
    DashboardIndex.editWorkspace.click()
    WorkspaceManage.form.waitForVisible()
    WorkspaceManage.workspaceBreadcrum.click()
    WorkspaceManage.breadCrumbDropDown.waitForVisible()
    WorkspaceManage.breadCrumbDropDownCreateWS.click()
    expect(WorkspaceCreate.form.isVisible()).to.eql(true)
  })

  it('should navigate to create new workspace page, when user enters url of create new workspace page in the browser', () => {
    WorkspaceCreate.open()
    expect(WorkspaceCreate.getUrl()).to.eql('/app/workspaces/create')
  })

  it('should display the Permission dropdown with default setting as "member", in the create workspace page', () => {
    expect(
      WorkspaceCreate.workspacePermissionField.getText('option:checked')
    ).to.eql('Member')
  })

  it('should validate that workspacename does not accept blank', () => {
    WorkspaceCreate.name.input.click()
    browser.keys('Tab')
    expect(WorkspaceCreate.name.error.getText()).to.eql('Required')
  })

  it('should validate that workspacename does not accept less than 3 characters', () => {
    WorkspaceCreate.name.input.setValue(testData.workspace.invalidWSThreeChar)
    browser.keys('Tab')
    expect(WorkspaceCreate.name.error.getText()).to.eql(
      'Must be 3 characters or more'
    )
  })

  it('shouldvalidate that workspace does not accept more than 256 characters', () => {
    WorkspaceCreate.name.input.setValue(
      testData.workspace.invalidWSTwoFiftySixChar
    )
    expect(WorkspaceCreate.name.error.getText()).to.eql(
      'Must be 256 characters or less'
    )
  })

  it('should dispaly validation error message, when creating workspace with invalid characters', () => {
    WorkspaceCreate.name.input.setValue(testData.workspace.invalidWorkSpaceName)
    expect(WorkspaceCreate.name.error.getText()).to.eql(
      `Only the following special characters @_'. are valid`
    )
  })

  it('should validate that username accepts  letters (a-z, both caps), numbers (0-9), underscores, apostrophes, periods (.), at (@)', () => {
    WorkspaceCreate.name.input.setValue(testData.workspace.validWorkSpaceName)
    expect(WorkspaceCreate.name.error.isVisible()).to.eql(false)
    WorkspaceCreate.name.input.setValue(
      testData.workspace.allValidWorkSpaceName
    )
    expect(WorkspaceCreate.name.error.isVisible()).to.eql(false)
    WorkspaceCreate.submitGlobal()
  })

  it('should navigate to edit page of workspace, when user click edit icon', () => {
    DashboardIndex.editWorkspace.click()
    expect(WorkspaceManage.form.isVisible()).to.eql(true)
  })

  it('should navigate to edit page of any workspace, when any workspace is selected from the breadcrumb', () => {
    WorkspaceManage.workspaceBreadcrum.click()
    WorkspaceManage.breadCrumbDropDown.waitForVisible()
    WorkspaceManage.getbreadCrumbEditWorkspace(2).click()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    expect(WorkspaceManage.getUrl()).to.eql(`/app/workspaces/${ws}/edit`)
  })

  it('should navigate to edit page of workspace, when user enters the url for edit page of workspace', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    WorkspaceManage.open(ws)
    expect(WorkspaceManage.getUrl()).to.eql(`/app/workspaces/${ws}/edit`)
  })

  it('should display title as members for memebers list section', () => {
    expect(WorkspaceManage.membersListTitle.getText()).to.eql('Members')
  })

  it('should display subtitle below the title member', () => {
    expect(WorkspaceManage.membersSubtitle.getText()).to.eql(
      'Invite workspace members (they will receive an email invite and a notification)'
    )
  })
})

describe('workspace create Overall', () => {
  it('should display title as `Create New Workspace` at top of the `create workspace form` page', () => {
    DashboardIndex.workspaceDropdown.selectByValue(0)
    expect(WorkspaceCreate.form.isVisible()).to.eql(true)
    expect(WorkspaceCreate.createNewWorkspaceTitle.getText()).to.eql(
      'Create New Workspace'
    )
  })

  it('should display placeholder of email text field in members component as `Enter workspace member email` in `create workspace` page', () => {
    expect(
      WorkspaceCreate.workspaceEmailInputField.getAttribute('placeholder')
    ).to.eql('Enter workspace member email')
  })

  it('should display title and subtitle for `Members` component, when user navigates to `create workspace` page', () => {
    expect(WorkspaceCreate.membersTitle.getText()).to.eql('Members')
    expect(WorkspaceCreate.membersSubtitle.getText()).to.eql(
      'An admin can create and edit any project, and manage permissions for every member. A member can create new projects and edit the ones they have access to.'
    )
  })

  it('should display placeholder text of workspace name field in `create workspace` page is `Enter an name for your workspace`', () => {
    expect(WorkspaceCreate.name.input.getAttribute('placeholder')).to.eql(
      'Enter an name for your workspace'
    )
  })

  it('should not create new workspace using tspaces(` `) as workspace name', () => {
    WorkspaceCreate.name.input.setValue(
      testData.workspace.validWorkSpaceNameOnlyWithSpaces
    )
    WorkspaceCreate.submitGlobal()
    //TODO check for error message
  })

  it('should display explanation of workspace in the explanation zone of create new workspace', () => {
    expect(WorkspaceCreate.workspaceExplanationTitle.isVisible()).to.eql(true)
    expect(WorkspaceCreate.whatIsWorkspaceExplanation.isVisible()).to.eql(true)
    expect(WorkspaceCreate.whatIsWorkspaceHelpLink.isVisible()).to.eql(true)
  })

  it('should display `Basic component` with title, workspace name input field and permission toggle button', () => {
    expect(WorkspaceCreate.basicInfoTitle.getText()).to.eql('Basic Info')
    expect(WorkspaceCreate.basicInfoSubtitle.getText()).to.eql(
      'Enter a name for your workspace.'
    )
    expect(WorkspaceCreate.name.input.isVisible()).to.eql(true)
    expect(WorkspaceCreate.basicInfoToggleBtn.isVisible()).to.eql(true)
  })

  it('should display Empty grey icon, email input field, permission dropdown and `+` blue add icon in `Member` component of the `create workspace` form', () => {
    expect(WorkspaceCreate.workspaceEmptyGreyIcon.isVisible()).to.eql(true)
    expect(WorkspaceCreate.workspaceEmailInputField.isVisible()).to.eql(true)
    expect(WorkspaceCreate.workspacePermissionField.isVisible()).to.eql(true)
    expect(WorkspaceCreate.workspaceAddIcon.isVisible()).to.eql(true)
  })

  it('should display member as first option in the permission dropdown, when user is in create page of workspace', () => {
    var options = WorkspaceCreate.workspacePermissionField.getText().split('\n')
    expect(options[0]).to.eql('Member')
  })

  it('should display `Save bar` always at bottom of the `create workspace` page', () => {
    expect(WorkspaceCreate.workspaceSaveBar.isVisible()).to.eql(true)
  })

  it('should display disabled `Create New Workspace` button at bottom right, when user navigates to `create workspace page`', () => {
    expect(WorkspaceCreate.workspaceCreateBtnDisabled.isVisible()).to.eql(true)
  })

  it('should display a enabled `Create New Workspace` button at bottom right, when user navigates to `create workspace page` and enter name in the Workspace name field', () => {
    WorkspaceCreate.name.input.setValue(testData.workspace.validWorkSpaceName)
    WorkspaceCreate.workspaceCreateBtnEnabled.waitForVisible()
    expect(WorkspaceCreate.workspaceCreateBtnEnabled.isVisible()).to.eql(true)
  })

  it('should display alert pop up message, when user try to navigate to any page of KH from `create workspace` page while `create new workspace` button is enabled', () => {
    DashboardIndex.applicationLeftnav.click()
    browser.alertAccept()
  })

  it('should display member as first option in the permission dropdown, when user is in edit page of workspace', () => {
    WorkspaceManage.open(1)
    WorkspaceManage.form.waitForVisible()
    expect(
      WorkspaceCreate.workspacePermissionField.getText('option:checked')
    ).to.eql('Member')
  })

  it('should display the Permission dropdown with default setting as "member", when adding a new member in edit page of the workspace', () => {
    var options = WorkspaceCreate.workspacePermissionField.getText().split('\n')
    expect(options[0]).to.eql('Member')
  })

  it('should display `Github connection` component in `edit` page of workspace, when user navigates to workspace edit page', () => {
    expect(WorkspaceManage.githubTitle.getText()).to.eql('Github Connection')
    expect(WorkspaceManage.githubLink.isVisible()).to.eql(true)
  })

  // it('should display user as current member added to workspace under members list, when creating a new workspace',()=>{
  //    TODO
  // })

  // it('should not allow user of workspace to delete members with admin rights in workspace',()=>{
  //   TODO
  // })

  // it('should display members with admin rights in top of members list and members with member rights below the members with admin rights',()=>{
  //   TODO
  // })

  // it('should allow admin to change members rights from permission dropdown,when user is in edit page of workspace',()=>{
  //   TODO
  // })

  // it('should allow remove members from members list of edit page with member rights',()=>{
  //    TODO
  // })

  // it('should allow add new member to existing members list',()=>{
  //    TODO
  // })

  // it('should send email notification to member added to the workspace and workspace should be listed for member in his  workspace dropdown',()=>{
  //     TODO
  // })

  // it('should allow to add non-registered members of KH and when non-registered member creates KH account, then workspace should be listed in his workspace dropdown',()=>{
  //    TODO
  // })

  // it('should display all members details of the workspace as a list with user icon, name and email, permission dropdown and delete icon',()=>{
  //   TODO
  // })
})

describe('workspace edit Overall', () => {
  it('should have title of page according to current workspace selected, when user navigates to edit page of workspace', () => {
    var ws = DashboardIndex.workspaceDropdown.getText('option:checked')
    expect(WorkspaceManage.workspaceTitle.getText()).to.eql(ws)
  })

  it('should display `Basic component` with title, workspace name input field and permission toggle button, when user navigates to `edit workspace` form', () => {
    expect(WorkspaceCreate.basicInfoTitle.getText()).to.eql('Basic Info')
    expect(WorkspaceManage.basicInfoSubtitle.getText()).to.eql(
      'Enter a name for your workspace.'
    )
    expect(WorkspaceCreate.name.input.isVisible()).to.eql(true)
    expect(WorkspaceCreate.basicInfoToggleBtn.isVisible()).to.eql(true)
  })

  it('should display Empty grey icon, email input field, permission dropdown and `+` blue add icon in `Member` component of the `edit workspace` form', () => {
    expect(WorkspaceCreate.workspaceEmptyGreyIcon.isVisible()).to.eql(true)
    expect(WorkspaceCreate.workspaceEmailInputField.isVisible()).to.eql(true)
    expect(WorkspaceCreate.workspacePermissionField.isVisible()).to.eql(true)
    expect(WorkspaceCreate.workspaceAddIcon.isVisible()).to.eql(true)
  })

  it('should display validation error, when user duplicates members in the members list of `edit workspace` page', () => {
    WorkspaceManage.workspaceEmailInputField.setValue(
      testData.workspace.validWorkSpaceMemberEmail
    )
    WorkspaceManage.workspaceAddIcon.click()
    WorkspaceManage.workspaceEmailInputField.setValue(
      testData.workspace.validWorkSpaceMemberEmail
    )
    WorkspaceManage.workspaceAddIcon.click()

    //TODO Implement Error message check when validation is implemented..
  })

  it('should display `Save bar` always at bottom of the `edit workspace` page', () => {
    expect(WorkspaceCreate.workspaceSaveBar.isVisible()).to.eql(true)
  })

  it('should display disabled `edit New Workspace` button at bottom right, when user navigates to `edit workspace page`', () => {
    expect(WorkspaceCreate.workspaceCreateBtnDisabled.isVisible()).to.eql(true)
  })

  it('should display a enabled `edit New Workspace` button at bottom right, when user navigates to `edit workspace page` and enter name in the Workspace name field', () => {
    WorkspaceCreate.name.input.setValue(testData.workspace.validWorkSpaceName)
    WorkspaceCreate.workspaceCreateBtnEnabled.waitForVisible()
    expect(WorkspaceCreate.workspaceCreateBtnEnabled.isVisible()).to.eql(true)
    WorkspaceCreate.submitGlobal()
  })

  //it('should display changes in members icon list present below workspace drop down, when user edit members list in `edit workspace` page',()=>{
  //   TODO
  //})

  // it('should display user as current member added to workspace under members list, when creating a new workspace',()=>{
  //    TODO
  // })

  // it('should not allow user of workspace to delete members with admin rights in workspace',()=>{
  //   TODO
  // })

  // it('should display members with admin rights in top of members list and members with member rights below the members with admin rights',()=>{
  //   TODO
  // })

  // it('should allow admin to change members rights from permission dropdown,when user is in edit page of workspace',()=>{
  //   TODO
  // })

  // it('should allow remove members from members list of edit page with member rights',()=>{
  //    TODO
  // })

  // it('should allow add new member to existing members list',()=>{
  //    TODO
  // })

  // it('should send email notification to member added to the workspace and workspace should be listed for member in his  workspace dropdown',()=>{
  //     TODO
  // })

  // it('should allow to add non-registered members of KH and when non-registered member creates KH account, then workspace should be listed in his workspace dropdown',()=>{
  //    TODO
  // })

  // it('should display all members details of the workspace as a list with user icon, name and email, permission dropdown and delete icon',()=>{
  //   TODO
  // })
})

describe('workspace create/edit Basic Info', () => {
  it('should display toggle button switched on by default, when user navigates to `create workspace` page', () => {
    WorkspaceCreate.open()
    WorkspaceCreate.form.waitForVisible()
    expect(WorkspaceCreate.toggleBar.getAttribute('value')).to.eql('true')
  })

  it('should not do nothing while toggle button is switched on, when user navigates to `create workspace` page and hover over `Toggle` button', () => {
    WorkspaceCreate.switchTogglerBtn.click() //Turning it Off, as its on by default
    expect(WorkspaceCreate.toggleBar.getAttribute('value')).to.eql('false')
    browser.moveToObject('span.toggle-slider')
    expect(WorkspaceCreate.toggleBar.getAttribute('value')).to.eql('false')
  })

  it('should display tool tip text, when user clicks on `?` icon present beside `toggle` bar in `create workspace` page ', () => {
    WorkspaceCreate.toggleBarToolTip.click()
    WorkspaceCreate.toggleBarToolTipText.waitForVisible()
    expect(WorkspaceCreate.toggleBarToolTipText.getText()).to.eql(
      'Turn this on to make all projects visible to every workspace member by default.'
    )
  })

  it('should display toggle bar turned green, when user switches toggle button on while user is in `create workspace` page', () => {
    WorkspaceCreate.switchTogglerBtn.click() //Turn the switch on to green
    expect(WorkspaceCreate.toggleBar.getAttribute('value')).to.eql('true')
    var elemProperties = WorkspaceCreate.switchTogglerBtn.getCssProperty(
      'background-color'
    ).parsed.hex
    expect(elemProperties).to.eql(green) //Green
  })

  it('should display toggle bar turned grey, when user switches toggle button on while user is in `create workspace` page', () => {
    WorkspaceCreate.switchTogglerBtn.click() //Switch it off
    expect(WorkspaceCreate.toggleBar.getAttribute('value')).to.eql('false')
    var elemProperties = WorkspaceCreate.switchTogglerBtn.getCssProperty(
      'background-color'
    ).parsed.hex
    expect(elemProperties).to.eql(grey) //Green
  })

  it('should display toggle button as light flashy green on hover , when user is in  `create workspace` page and if the toggle button is switched off ', () => {
    browser.moveToObject('span.toggle-slider')
    var elemProperties = WorkspaceCreate.switchTogglerBtn.getCssProperty(
      'background-color'
    ).parsed.hex
    expect(elemProperties).to.eql(flashyGreen)
  })

  it('should display members bar toggle switched off for any project (KA or KB) created in the workspace, when `Toggle` button switched off in the `create workspace` page', () => {
    WorkspaceCreate.name.input.setValue(testData.workspace.validWorkSpaceName)
    WorkspaceCreate.submitGlobal()
    //TODO Verify details after workspace save is implemented.
    KintoAppCreate.open()
    KintoAppCreate.name.input.setValue(testData.kintoapp.validKintoAppName)
    KintoAppCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescription
    )
    KintoAppCreate.submitGlobal()
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getCard(0).waitForVisible()
    KintoAppList.getCard(0).click()
    KintoAppManage.title.waitForVisible()
    expect(KintoAppManage.switchValueForWS.getAttribute('value')).to.eql('true')
  })

  it('should display members bar toggle switched on for any project (KA or KB) created in the workspace, when `Toggle` button switched on in the `create workspace` page', () => {
    WorkspaceCreate.open()
    WorkspaceCreate.switchTogglerBtn.click()
    expect(WorkspaceCreate.toggleBar.getAttribute('value')).to.eql('true')
    WorkspaceCreate.name.input.setValue(testData.workspace.validWorkSpaceName)
    WorkspaceCreate.submitGlobal()
    //TODO Verify details after workspace save is implemented.
    KintoAppCreate.open()
    KintoAppCreate.name.input.setValue(testData.kintoapp.validKintoAppName)
    KintoAppCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescription
    )
    KintoAppCreate.submitGlobal()
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getCard(0).waitForVisible()
    KintoAppList.getCard(0).click()
    KintoAppManage.title.waitForVisible()
    expect(KintoAppManage.switchValueForWS.getAttribute('value')).to.eql('true')
  })

  it('should display toggle bar turned green, when user switches toggle button on,  while user is in `edit workspace` page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    WorkspaceManage.open(ws)
    WorkspaceManage.form.waitForVisible()
    var toggleState = WorkspaceCreate.toggleBar.getAttribute('value')
    if (toggleState === 'true') {
      var elemProperties = WorkspaceCreate.switchTogglerBtn.getCssProperty(
        'background-color'
      ).parsed.hex
      expect(elemProperties).to.eql(green)
      WorkspaceManage.switchTogglerBtn.click() //Turn it off
      WorkspaceManage.switchTogglerBtn.click() //Turn it On
      elemProperties = WorkspaceCreate.switchTogglerBtn.getCssProperty(
        'background-color'
      ).parsed.hex
      expect(elemProperties).to.eql(green)
    } else {
      elemProperties = WorkspaceCreate.switchTogglerBtn.getCssProperty(
        'background-color'
      ).parsed.hex
      expect(elemProperties).to.eql(grey)
      WorkspaceManage.switchTogglerBtn.click() //Turn it on
      elemProperties = WorkspaceCreate.switchTogglerBtn.getCssProperty(
        'background-color'
      ).parsed.hex
      expect(elemProperties).to.eql(green) //Green
    }
  })

  it('should display toggle button as light flashy green on hover , when user navigate to `editworkspace` page and if the toggle button is switched off ', () => {
    WorkspaceManage.switchTogglerBtn.click() //Turn it Off
    browser.moveToObject('span.toggle-slider')
    var elemProperties = WorkspaceCreate.switchTogglerBtn.getCssProperty(
      'background-color'
    ).parsed.hex
    expect(elemProperties).to.eql(flashyGreen) //Green
  })

  it('should display tool tip text, when user clicks on `?` icon present beside `toggle` bar in `edit workspace` page ', () => {
    WorkspaceManage.toggleBarToolTip.click()
    WorkspaceManage.toggleBarToolTipText.waitForVisible()
    expect(WorkspaceManage.toggleBarToolTipText.getText()).to.eql(
      'Turn this on to make all projects visible to every workspace member by default.'
    )
  })

  it('should not display error message if workspace name follow validation criteria, when user edits the existing workspace name and validates', () => {
    WorkspaceManage.name.input.setValue(testData.workspace.validWorkSpaceName)
    expect(WorkspaceManage.name.error.isVisible()).to.eql(false)
    WorkspaceManage.submitGlobal()
  })

  it('should display members bar toggle switched on for any project (KA or KB) created in the workspace, when `Toggle` button switched on in the `edit workspace` page', () => {
    DashboardIndex.editWorkspace.click()
    WorkspaceManage.form.waitForVisible()
    WorkspaceManage.switchTogglerBtn.click()
    expect(WorkspaceManage.toggleBar.getAttribute('value')).to.eql('true')
    WorkspaceManage.submitGlobal()
    //TODO Verify details after workspace save feature is implemented.

    KintoAppCreate.open()
    KintoAppCreate.name.input.setValue(testData.kintoapp.validKintoAppName)
    KintoAppCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescription
    )
    KintoAppCreate.submitGlobal()
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getCard(0).waitForVisible()
    KintoAppList.getCard(0).click()
    KintoAppManage.title.waitForVisible()
    expect(KintoAppManage.switchValueForWS.getAttribute('value')).to.eql('true')
  })

  it('should display members bar toggle switched off for any project (KA or KB) created in the workspace, when `Toggle` button switched off in the `edit workspace` page', () => {
    DashboardIndex.editWorkspace.click()
    WorkspaceManage.form.waitForVisible()
    WorkspaceManage.switchTogglerBtn.click()
    expect(WorkspaceManage.toggleBar.getAttribute('value')).to.eql('true')
    WorkspaceManage.submitGlobal()
    //TODO Verify details after workspace save feature is implemented.
    KintoAppCreate.open()
    KintoAppCreate.name.input.setValue(testData.kintoapp.validKintoAppName)
    KintoAppCreate.shortDescription.input.setValue(
      testData.kintoapp.validKintoAppDescription
    )
    KintoAppCreate.submitGlobal()
    KintoAppList.mykintoAppList.waitForVisible()
    KintoAppList.getCard(0).waitForVisible()
    KintoAppList.getCard(0).click()
    KintoAppManage.title.waitForVisible()
    expect(KintoAppManage.switchValueForWS.getAttribute('value')).to.eql('true')
  })

  it('should display error message if workspace name doesn`t follow validation criteria, when user edit the existing workspace name and validate', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    WorkspaceManage.open(ws)
    WorkspaceManage.form.waitForVisible()
    WorkspaceCreate.name.input.setValue(testData.workspace.invalidWorkSpaceName)
    browser.keys('Tab')
    expect(WorkspaceCreate.name.error.getText()).to.eql(
      `Only the following special characters @_'. are valid`
    )
  })

  it('should not do nothing while toggle button is switched on, when user navigates to `edit workspace` page and hover over `Toggle` button', () => {
    WorkspaceCreate.switchTogglerBtn.click()
    expect(WorkspaceCreate.toggleBar.getAttribute('value')).to.eql('true')
    browser.moveToObject('span.toggle-slider')
    // expect(WorkspaceCreate.toggleBar.getAttribute('value')).to.eql('true')
    WorkspaceCreate.name.input.setValue(testData.workspace.validWorkSpaceName)
    WorkspaceCreate.submitGlobal()
  })
})

describe('Workspaces edit Github connection', () => {
  it('should display title and subtitle in the `Github component`, when user navigates to `edit workspace` page', () => {
    WorkspaceManage.open(1)
    WorkspaceManage.form.waitForVisible()
    expect(WorkspaceManage.githubTitle.getText()).to.eql('Github Connection')
    expect(WorkspaceManage.githubSubtitle.getText()).to.eql(
      'Configure your GitHub organization to work with KintoHub.'
    )
  })

  it('should display explanatory text, disclaimer, Github button and Link to Github tutorial under the `Github component` of `edit workspace` page, when no organisation is linked', () => {
    expect(WorkspaceManage.githubExplanatoryText.getText()).to.eql(
      'Please make sure every workspace member has the correct access to the GitHub organization.'
    )
    expect(WorkspaceManage.githubLinkBtn.isVisible()).to.eql(true)
    //TODO Disclaimer and Link to Github tutorial
  })

  // it('should display explanatory text, disclaimer, Github button and Link to Github tutorial at the bottom of newly added organisation in the `Github component` of `edit workspace` page',()=>{
  //   //TODO
  // })

  // it('should display default icon and Name of the organization at the top of the component, when new organisation is linked through `github connect` component',()=>{
  //  //TODO
  // })

  it('should start the Github link flow, when user clicks on `GitHub button` in the `edit workspace` page', () => {
    WorkspaceManage.githubLinkBtn.click()
    WorkspaceManage.githubSignInPage.waitForVisible()
    expect(WorkspaceManage.githubSignInPage.isVisible()).to.eql(true)
  })

  // it('should give permission for read / write access to KintoHub in the github link flow(part of flow) , when user clicks on `link Github organization` button in `edit workspace` page',()=>{
  //   //TODO
  // })

  // it('should navigate back to `edit workspace` page of corressponding workspace, once the github link flow is completed as well as the new organization should be linked',()=>{
  //   //TODO
  // })

  // it('should display the new organization linked in the list of linked organizations, once the github link flow is completed',()=>{
  //   //TODO
  // })

  // it('should display the organization linked in the `github` component to the workspace in the organization dropdown of KB create page, when creating a KintoBlock in the same workspace',()=>{
  //   //TODO
  // })
})
