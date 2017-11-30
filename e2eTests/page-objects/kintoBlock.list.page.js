import Page from './page'

class KintoBlockList extends Page {
  open() {
    super.open('app/dashboard/kintoblocks/list')
  }

  getCard(index) {
    return browser.element(`[data-test='kb-card-id-${index}']`)
  }
}

export default new KintoBlockList()