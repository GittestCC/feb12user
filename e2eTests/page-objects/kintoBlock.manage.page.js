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
}

export default new KintoBlockManage()
