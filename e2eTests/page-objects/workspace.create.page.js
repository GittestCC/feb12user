import Page from './page'

class WorkspaceCreate extends Page {
  open() {
    super.open('app/workspaces/create')
  }

  get form() {
    return $('.create-workspace')
  }

  get createNewworkspaceTitle() {
    return $('.create-workspace > h2')
  }

  get editWorkspace() {
    return $('a.avatar.small.edit.hide-text')
  }

  get editWorkspaceForm() {
    return $('form.workspace-form.form-container')
  }

  get editWorkspaceHeading() {
    return $('form.workspace-form.form-container>div>h2')
  }
}

export default new WorkspaceCreate()
