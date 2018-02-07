import { expect } from 'chai'
import Login from '../page-objects/login.page'
import DashboardIndex from '../page-objects/dashboard.index.page'
import WorkspaceCreate from '../page-objects/workspace.create.page'
import WorkspaceManage from '../page-objects/workspace.manage.page'

describe('workspace create/edit members', () => {
  it('should navigate to create new workspace page, when first option create new a workspace is selected from workspace dropdown', () => {
    Login.login()
    DashboardIndex.workspaceDropdown.selectByValue(0)
    expect(WorkspaceCreate.form.isVisible()).to.eql(true)
  })

  it('should navigate to create new workspace page, when create new workspace button is clicked from the  breadcrumb', () => {
    WorkspaceCreate.editWorkspace.click()
    WorkspaceCreate.editWorkspaceForm.waitForVisible()
    WorkspaceManage.workspaceBreadcrum.click()
    WorkspaceManage.breadCrumbDropDown.waitForVisible()
    WorkspaceManage.breadCrumbDropDownCreateWS.click()
    expect(WorkspaceCreate.form.isVisible()).to.eql(true)
  })

  it('should navigate to create new workspace page, when user enters url of create new workspace page in the browser', () => {
    WorkspaceCreate.open()
    expect(WorkspaceCreate.getUrl()).to.eql('/app/workspaces/create')
  })
})
