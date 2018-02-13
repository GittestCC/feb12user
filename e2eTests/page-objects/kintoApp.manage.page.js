import Page from './page'
import { getDataTest, getInput } from '../helpers/elementSelector'

class KintoAppManage extends Page {
  open(id, ver) {
    super.open(`app/dashboard/1/kintoapps/${id}/versions/${ver}`)
  }

  get title() {
    return $('.page-title > h2')
  }

  get name() {
    return getInput('name')
  }

  get description() {
    return getInput('shortDescription', 'textarea')
  }

  get kbName() {
    return $('div.main-icon.kintoblock')
  }

  get kbTagNDeploy() {
    return $('#savebar-portal button')
  }

  get tagDeployModal() {
    return $(
      'ReactModal__Content ReactModal__Content--after-open.kh-modal.tag-and-deploy-modal'
    )
  }

  get majorVersion() {
    return $('input[name="version.major"]')
  }

  get minorVersion() {
    return $('input[name="version.minor"]')
  }

  get revision() {
    return $('input[name="version.revision"]')
  }

  get notes() {
    return $('#notes')
  }

  get createTagBtn() {
    return $('.kh-modal-actions > button.button.dark')
  }

  get createTagBtnDisabled() {
    return $('.kh-modal-actions > button.button.dark.disabled')
  }

  get cancelTagBtn() {
    return $('.kh-modal-actions > button.button.secondary')
  }

  get envList() {
    return $('.kintoapp-environments-list')
  }

  get wsSwitchDef() {
    return getDataTest('public')
  }

  get envName() {
    return $('#environment')
  }

  get tagDeployErrMsg() {
    return $('div.kh-modal-body > form > div:nth-child(2) > div.error-message')
  }

  get successDeployMsg() {
    return $(
      '.environments-list .environment-card > div.bottom > div.left > div > div.upper > div > h6'
    )
  }

  get successDeployVersion() {
    return $(
      '.environments-list .environment-card > div.bottom > div.left > div > div.upper > div > h4.version'
    )
  }

  get switchValueForWS() {
    return $('#public')
  }

  get errorMsgDuplicateVersion() {
    return $('div.kh-modal-body > form > div.error-message-form.error-message')
  }

  get compareVersions() {
    return $('.buttons > button.button.secondary')
  }

  get viewEnvironments() {
    return $('.buttons > button.button.dark')
  }

  get addNewEnvironment() {
    return $('.kintoapp-environments-list .button.button.secondary')
  }

  get environmentName() {
    return $('#envName')
  }

  get addEnvBtn() {
    return $('.kh-modal-actions .button.button.dark')
  }

  envListItem(index) {
    return $(`.environments-list .environment-card:nth-child(${index})`)
  }
}

export default new KintoAppManage()
