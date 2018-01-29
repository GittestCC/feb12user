import Page from './page'

class KintoAppList extends Page {
  open() {
    super.open('app/dashboard/1/kintoapps/list')
  }

  getCard(index) {
    return $(`[data-test='ka-card-id-${index}']`)
  }

  get mykintoAppList() {
    return $('.my-kintoapps')
  }
}

export default new KintoAppList()
