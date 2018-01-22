import Page from './page'
import { getDataTest, getInput } from '../helpers/elementSelector'

class KintoAppManage extends Page {
  open(id, ver) {
    super.open(`app/dashboard/1/kintoapps/${id}/versions/${ver}`)
  }

  get title() {
    return $('.page-title')
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
    return $('#savebar-portal > div > button')
  }

  get tagDeployModal() {
    return $('.kh-modal-title')
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

  get envList() {
    return $('.kintoapp-environments-list')
  }

  get wsSwitchDef() {
    return getDataTest('public')
  }
}

export default new KintoAppManage()
