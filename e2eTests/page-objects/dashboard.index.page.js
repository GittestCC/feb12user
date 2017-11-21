import Page from './page'

class DashboardIndex extends Page {
  open() {
    super.open('')
  }

  get container() {
    return browser.element('[data-test=dashboard-index-page]')
  }
}

export default new DashboardIndex()
