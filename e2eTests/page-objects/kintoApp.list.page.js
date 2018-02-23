import Page from './page'

class KintoAppList extends Page {
  open(wsID) {
    super.open(`app/dashboard/${wsID}/kintoapps/list`)
  }

  getCard(index) {
    return $(`[data-test='ka-card-id-${index}']`)
  }

  get mykintoAppList() {
    return $('.my-kintoapps')
  }

  getkaListDropDown(id) {
    return $(`#id-${id}.dropdown .dropdown-button.menu`)
  }

  get kaAppListViewEnv() {
    return $('.dropdown .dropdown-content.isShown :nth-child(5)')
  }

  get kaListDropDown() {
    return $('.dropdown .dropdown-content.isShown')
  }
}

export default new KintoAppList()
