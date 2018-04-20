import Page from './page'
import { getInput, getDataTest } from '../helpers/elementSelector'

class KintoBlockCreate extends Page {
  open(wsID) {
    super.open(`app/dashboard/${wsID}/kintoblocks/create`)
  }

  get form() {
    return getDataTest('kb-create-form')
  }

  get name() {
    return getInput('name')
  }

  get shortDescription() {
    return getInput('shortDescription', 'textarea')
  }

  get language() {
    return getInput('language', 'select')
  }

  get protocol() {
    return getInput('protocol', 'select')
  }

  get repository() {
    return getInput('repositoryName')
  }

  get createKBTitle() {
    return $('.kintoblocks-master-container >div >h2')
  }

  get linkGitHub() {
    return $('.connect-github > div > a')
  }

  //28/3
  get repositoryType() {
    return getInput('isNewRepository', 'select')
  }

  get existingRepo() {
    return $('.Select-input>input')
  }

  //04/4
  get pageTitle() {
    return $('.kintoblocks-master-container h2')
  }

  get whatisaKintoBlock() {
    return $('.what-is-a-kintoblock .text')
  }

  get whatisaKintoBlockDescp() {
    return $('.what-is-a-kintoblock .text .body-copy')
  }

  get learnMoreHere() {
    return $('.what-is-a-kintoblock .text .body-copy>a')
  }

  get membersToolBar() {
    return $('.kintoblock-create.form-container .workspace-toolbar')
  }

  get nameField() {
    return $('input#name')
  }

  get description() {
    return $('textarea#shortDescription')
  }

  get languageField() {
    return $('select#language.bold')
  }

  get protocolField() {
    return $('select#protocol.bold')
  }

  get gitHubText() {
    return $('.connect-github>h5')
  }

  get learnGitHubCreationLink() {
    return $('.connect-github>a')
  }

  get linkGitHubBtn() {
    return $('.connect-github .connect-button .button.dark')
  }

  get organisationField() {
    return $('select#organizationId.bold.full-width')
  }

  //05/4
  getRepositoryType(index) {
    return $(`select#newRepository.bold>option:nth-child(${index})`)
  }

  get orgNameFromRepoDropDown() {
    return $('div.prefill-wrapper span')
  }

  get loadingIcon() {
    return $('div.loading-icon')
  }

  get loadingText() {
    return $('.loading-spinner>h2')
  }

  get repositoryTypeField() {
    return $('select#newRepository.bold')
  }

  get repositoryNameField() {
    return $(`[data-test='repositoryName'] .prefill-wrapper`)
  }
}

export default new KintoBlockCreate()
