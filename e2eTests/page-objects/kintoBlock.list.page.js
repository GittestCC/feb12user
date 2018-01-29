import Page from './page'

class KintoBlockList extends Page {
  open(wsID) {
    super.open(`app/dashboard/${wsID}/kintoblocks/list`)
  }

  getCard(index) {
    return $(`[data-test='kb-card-id-${index}']`)
  }
}

export default new KintoBlockList()
