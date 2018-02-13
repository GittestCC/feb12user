import Page from './page'
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
}

export default new WorkspaceManage()
