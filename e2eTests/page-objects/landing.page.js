import Page from './page'

class Landing extends Page {
  open() {
    super.open('')
  }

  get navbar() {
    return browser.element('[data-test=landing-navbar]')
  }
}

export default new Landing()
