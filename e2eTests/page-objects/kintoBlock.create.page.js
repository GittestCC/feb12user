import Page from './page'
import { getInput, getDataTest } from '../helpers/elementSelector'

class KintoBlockCreate extends Page {
  open() {
    super.open('app/dashboard/kintoblocks/create')
  }

  get form() {
    return getDataTest('kb-create-form')
  }

  get name() {
    return getInput('name')
  }

  get starterPack() {
    return getInput('starterPack', 'select')
  }

  get repository() {
    return getInput('repositoryName')
  }
}

export default new KintoBlockCreate()