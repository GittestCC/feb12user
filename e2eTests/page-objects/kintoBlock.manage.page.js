import Page from './page'
import { getDataTest, getInput } from '../helpers/elementSelector'

class KintoBlockManage extends Page {
  open(id, ver) {
    super.open(`app/dashboard/kintoblocks/${id}/versions/${ver}`)
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
}

export default new KintoBlockManage()
