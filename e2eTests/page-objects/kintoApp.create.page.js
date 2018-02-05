import Page from './page'
import { getInput, getDataTest } from '../helpers/elementSelector'

class KintoAppCreate extends Page {
  open() {
    super.open('app/dashboard/1/kintoapps/create')
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
}

export default new KintoAppCreate()
