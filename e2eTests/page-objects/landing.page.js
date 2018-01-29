import Page from './page'

class Landing extends Page {
  open() {
    super.open('')
  }

  get navbar() {
    return $('[data-test=landing-navbar]')
  }

  get workspaceSelect() {
    return $('.workspaces-select')
  }
}

export default new Landing()
