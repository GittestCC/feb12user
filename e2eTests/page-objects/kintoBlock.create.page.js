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
}

export default new KintoBlockCreate()
