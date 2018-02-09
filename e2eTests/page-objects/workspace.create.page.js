import Page from './page'
import { getInput } from '../helpers/elementSelector'

class WorkspaceCreate extends Page {
  open() {
    super.open('app/workspaces/create')
  }

  get form() {
    return $('.create-workspace')
  }

  get name() {
    return getInput('name')
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

  get createNewWorkspaceTitle() {
    return $('.create-workspace>h2')
  }

  get workspaceExplanationTitle() {
    return $('.what-is-a-workspace .text>h5:nth-child(1)')
  }

  get whatIsWorkspaceExplanation() {
    return $('h5.body-copy')
  }

  get whatIsWorkspaceHelpLink() {
    return $('h5.body-copy >a')
  }

  get basicInfoTitle() {
    return $('.workspace-form.form-container>div:nth-child(2)>h3')
  }

  get basicInfoToggleBtn() {
    return $('span.toggle-slider')
  }

  get workspaceEmptyGreyIcon() {
    return $('.avatar-placeholder')
  }

  get workspaceEmailInputField() {
    return $('input[name=email]')
  }

  get workspacePermissionField() {
    return $('.bottom > select')
  }

  getworkspacePermissionField(index) {
    return $(`.bottom>select>:nth-child(${index})`)
  }

  get workspaceAddIcon() {
    return $('.add')
  }

  get workspaceSaveBar() {
    return $('.global-save-bar.show.e2e-disabled')
  }

  get workspaceCreateBtnDisabled() {
    return $('button.button.default.disabled')
  }

  get workspaceCreateBtnEnabled() {
    return $('button.button.default')
  }
}

export default new WorkspaceCreate()
