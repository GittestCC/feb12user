import Page from './page'
import { getDataTest, getInput } from '../helpers/elementSelector'

class KintoBlockManage extends Page {
  open(id, ver) {
    super.open(`app/dashboard/1/kintoblocks/${id}/versions/${ver}`)
  }

  get title() {
    return getDataTest('title')
  }

  get name() {
    return getInput('name')
  }

  get description() {
    return getInput('shortDescription', 'textarea')
  }

  get language() {
    return getDataTest('language')
  }

  get protocol() {
    return getDataTest('protocol')
  }

  get repository() {
    return getInput('repositoryName')
  }

  get envInput() {
    return getDataTest('kb-manage-env')
  }

  get addEnvKey() {
    return getDataTest('env-add-key')
  }
  get addEnvValue() {
    return getDataTest('env-add-value')
  }

  get addCustomKey() {
    return getDataTest('params-add-key')
  }

  get addCustomValue() {
    return getDataTest('params-add-value')
  }

  get customInput() {
    return getDataTest('kb-manage-params')
  }

  get paramsInput() {
    return getDataTest('kb-manage-params')
  }

  get createTagButton() {
    return getDataTest('create-tag-button')
  }

  get createTagError() {
    return getDataTest('create-tag-error')
  }

  get breadcrumb() {
    return getDataTest('breadcrumb-toggle-tag-and-branch')
  }

  get breadCrumbTitle() {
    return getDataTest('breadcrumb-text')
  }

  getEnvRow(index) {
    return $(`[data-test='kb-manage-env-${index}']`)
  }

  getParamsRow(index) {
    return $(`[data-test='kb-manage-params-${index}']`)
  }

  getTab(index) {
    return $(`[data-test='${index}-tab']`)
  }

  getDropdown(index) {
    return $(`[data-test='${index}-list']`)
  }

  get dropDownfilter() {
    return getDataTest('dropdown-filter')
  }

  get dropDownMenu() {
    return $('#id-0 > button')
  }

  get dropDownMenuOptions() {
    return $('.dropdown-scroll-container')
  }

  get editBranch() {
    return $('.dropdown-scroll-container > button.double-line')
  }

  get viewBranchesAndTag() {
    return $('.dropdown-scroll-container > button:nth-child(2)')
  }

  get delKB() {
    return $('.dropdown-scroll-container > button:nth-child(4)')
  }

  get dropDownTabs() {
    return $('.dropdown-tabs')
  }

  get activeTagSection() {
    return $('.tab.tags.active')
  }

  //23/3
  get form() {
    return getDataTest('kb-manage-form')
  }

  //29/3
  get toKbListPage() {
    return $('.breadcrumbs .unstyled-list li:nth-child(1)>a')
  }

  get kbCreationSuccessMsgText() {
    return $('.notification-message.notification>h4')
  }

  //30/3
  get kbSuccessMsg() {
    return $('#root .notification-message.notification')
  }

  get successMsgCloseBtn() {
    return $('#root .notification-message.notification .close')
  }

  get noCommit() {
    return $('.form-wrapper.full-row.commits .commit-details.no-commit')
  }

  //02/3
  get branchNameFromBreadcrumb() {
    return $(`[data-test='breadcrumb-text']`)
  }

  get tagVersionFromBreadcrumb() {
    return $(`[data-test='breadcrumb-text']`)
  }

  getDependenciesDeleteIcon(index) {
    return $(`.block:nth-child(${index}) .delete-block.hide-text`)
  }

  //04/4
  get kbListDropDown() {
    return $(
      '.breadcrumbs .unstyled-list>li:nth-child(2) #application-dropdown>button'
    )
  }

  get kbListDropDownVisible() {
    return $('div.dropdown-content.isShown.short')
  }

  get createNewKbBtnInBreadcrumb() {
    return $('.dropdown-content-action button.button.dark')
  }

  //05/04
  get repoName() {
    return $('.form-body .section:nth-child(5) .field-input-wrapper>input')
  }

  //09/04
  getKbFromBreadcrumbDropDown(index) {
    return $(
      `#application-dropdown .dropdown-scroll-container button:nth-child(${index})`
    )
  }

  getKbNameFromDropDown(index) {
    return $(
      `#application-dropdown .dropdown-scroll-container button:nth-child(${index}) .tag-item-text`
    )
  }

  get viewEndpointsBtn() {
    return $('.page-title a.button.dark')
  }

  get tagLatestCommitBtn() {
    return $('#savebar-portal button.button.default')
  }

  get basicInfoComponent() {
    return $('.form-wrapper.full-row.basic-info')
  }

  get dependenciesComponent() {
    return $(
      '.kintoblock-manage.form-container .form-body.simple.dependency-management'
    )
  }

  get parametersComponent() {
    return $(
      '.kintoblock-manage.form-container .form-wrapper.custom-paramaters.full-row'
    )
  }

  get tagLatestCommitPopUp() {
    return $('.ReactModal__Content.ReactModal__Content--after-open.kh-modal')
  }

  get languageFieldTitle() {
    return $('.section.section-info .field-wrapper:nth-child(1)>label')
  }

  get protocolFieldTitle() {
    return $('.section.section-info .field-wrapper:nth-child(2)>label')
  }

  get repositoryFieldTitle() {
    return $('.form-body .section:nth-child(5) .field-wrapper>label')
  }

  get languageField() {
    return $(`[data-test='language']`)
  }

  get protocolField() {
    return $(`[data-test='protocol']`)
  }

  get repositoryField() {
    return $('.form-body .section:nth-child(5) .field-wrapper>div>input')
  }

  get kbNameFromBreadcrumb() {
    return $('.breadcrumbs .unstyled-list .list-container>a')
  }

  get kbNameFromViewEndpointsBreadcrumb() {
    return $('.breadcrumbs .unstyled-list li:nth-child(1)>span')
  }
}

export default new KintoBlockManage()
