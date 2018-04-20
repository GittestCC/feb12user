import Page from './page'
import { getInput, getDataTest } from '../helpers/elementSelector'

class KintoAppCreate extends Page {
  open(wsID) {
    super.open(`app/dashboard/${wsID}/kintoapps/create`)
  }

  get form() {
    return getDataTest('ka-form')
  }

  get name() {
    return getInput('name')
  }

  get shortDescription() {
    return getInput('shortDescription', 'textarea')
  }

  get whatisanApp() {
    return $('.what-is-a-kintoapp .text')
  }

  get whatisanAppDescp() {
    return $('.what-is-a-kintoapp .text .body-copy')
  }

  get switchValueForWS() {
    return $('#public')
  }

  get switchTogglerBtn() {
    return $('span.toggle-slider')
  }

  get wsEditorButton() {
    return $('a.avatar.normal.edit.hide-text')
  }

  get kbdropDown() {
    return $('div.Select-input > input')
  }

  get createKintoAppTitle() {
    return $('.create-kintoapp > h2')
  }

  //21/3
  get membersToolBar() {
    return $('.kintoapp-create.form-container .workspace-toolbar')
  }

  get basicInfoComponent() {
    return $('.kintoapp-create.form-container .form-wrapper.basic-info')
  }

  get dependenciesComponent() {
    return $(
      '.kintoapp-create.form-container .form-body.simple.dependency-management'
    )
  }

  get kaCreateNewApplicationBtnDisabled() {
    return $('button.button.default.disabled ')
  }

  get basicInfoComponentTitle() {
    return $('.form-wrapper.basic-info>h3')
  }

  get basicInfoComponentSubtitle() {
    return $('.form-wrapper.basic-info>h5')
  }

  get basicInfoComponentNameFieldTitle() {
    return $(`[data-test='name'] label`)
  }

  get basicInfoComponentDescriptionFieldTitle() {
    return $(`[data-test='shortDescription'] label`)
  }

  get kaDescriptionTextArea() {
    return $('textarea#shortDescription')
  }

  get ownerTextFromMembersBar() {
    return $('.user-section>h5')
  }
}

export default new KintoAppCreate()
