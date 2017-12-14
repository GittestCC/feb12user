import Page from './page'

class Landing extends Page {
  open() {
    super.open('')
  }

  get navbar() {
    return $('[data-test=landing-navbar]')
  }
}

export default new Landing()
