import Page from './page'
import DashboardIndex from '../page-objects/dashboard.index.page'
import { getInput } from '../helpers/elementSelector'

class WorkspaceManage extends Page {
  open(ws) {
    super.open(`app/workspaces/${ws}/edit`)
  }

  get form() {
    return $('.edit-workspace')
  }

  get name() {
    return getInput('name')
  }

  get workspaceBreadcrum() {
    return $('button.dropdown-button.breadcrumb-icon')
  }

  get editWorkspaceHeading() {
    return $('form.workspace-form.form-container>div>h2')
  }

  get workspaceEmailInputField() {
    return $('input[name=email]')
  }

  get breadCrumbDropDown() {
    return $('div.dropdown-content.isShown.short')
  }

  get breadCrumbDropDownCreateWS() {
    return $('button.button.dark')
  }

  get membersListTitle() {
    return $('.workspace-form.form-container>div:nth-child(3)>h3')
  }

  get membersSubtitle() {
    return $('.workspace-form.form-container>div:nth-child(3)>h5')
  }

  get workspaceAddIcon() {
    return $('.form-body.members-list .add')
  }

  getpermissionDropDown(index) {
    return $(`div.bottom>select>:nth-child(${index})`)
  }

  getbreadCrumbEditWorkspace(index) {
    return $(
      `.dropdown-content-items.dropdown-content-items-scroll .dropdown-scroll-container>button:nth-child(${index})`
    )
  }

  get githubTitle() {
    return $('div.form-wrapper.github-form > h3')
  }

  get githubLink() {
    return $('a.button.dark')
  }

  get workspaceTitle() {
    return $('form.workspace-form.form-container>div>h2')
  }

  get toggleBar() {
    return $('#autoShareProjects')
  }
  get switchTogglerBtn() {
    return $('span.toggle-slider')
  }
  get toggleBarToolTip() {
    return $('span.tooltip')
  }

  get toggleBarToolTipText() {
    return $('.rc-tooltip-content .rc-tooltip-inner')
  }

  get basicInfoSubtitle() {
    return $('.workspace-form.form-container>div:nth-child(2)>h5')
  }

  get githubSubtitle() {
    return $('.form-wrapper.github-form > h5')
  }

  get githubExplanatoryText() {
    return $('.intro >b')
  }

  get githubLinkBtn() {
    return $('.connect-button .button')
  }

  get githubLoginField() {
    return $('input#login_field')
  }

  get githubPasswordField() {
    return $('input#password')
  }

  get githubLoginBtn() {
    return $('.btn.btn-primary.btn-block')
  }

  linkGithub() {
    //Click on edit workspace
    DashboardIndex.editWorkspace.waitForVisible()
    DashboardIndex.editWorkspace.click()
    this.form.waitForVisible()
    //Click on Link
    this.githubLinkBtn.waitForVisible()
    var href = this.githubLinkBtn.getAttribute('href')
    browser.url(href)
    this.githubLoginField.setValue('seema@calibrecode.com')
    this.githubPasswordField.setValue('calibre@2017')
    this.githubLoginBtn.click()
    this.form.waitForVisible()
    DashboardIndex.kintoHubLogolefttop.click()
  }
}

export default new WorkspaceManage()
