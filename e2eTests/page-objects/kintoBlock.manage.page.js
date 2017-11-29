import Page from './page'
import { getDataTest } from '../helpers/elementSelector'

class KintoBlockCreate extends Page {
  open(id, ver) {
    super.open(`app/dashboard/kintoblocks/${id}/versions/${ver}`)
  }

  get title() {
    return getDataTest('title')
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

  getEnvRow(index) {
    return browser.element(`[data-test='kb-manage-env-${index}']`)
  }
  getParamsRow(index) {
    return browser.element(`[data-test='kb-manage-params-${index}']`)
  }
}

export default new KintoBlockCreate()
