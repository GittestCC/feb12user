import Page from './page'

class WorkspaceManage extends Page {
  open(ws) {
    super.open(`app/workspaces/${ws}/edit`)
  }

  get workspaceBreadcrum() {
    return $('button.dropdown-button.breadcrumb-icon')
  }

  get breadCrumbDropDown() {
    return $('div.dropdown-content.isShown.short')
  }

  get breadCrumbDropDownCreateWS() {
    return $('button.button.dark')
  }
}

export default new WorkspaceManage()
