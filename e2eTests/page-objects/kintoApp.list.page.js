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
}

export default new KintoAppList()
