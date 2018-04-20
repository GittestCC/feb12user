class Page {
  TEST_USERNAME = process.env.E2E_TEST_USERNAME
  TEST_PASSWORD = process.env.E2E_TEST_PASSWORD

  get sidebar() {
    return $('[data-test=sidebar]')
  }

  get navbar() {
    return $('[data-test=navbar]')
  }

  get savebar() {
    return $('[data-test=savebar]')
  }

  get avatarBtn() {
    return $('div.dropdown.direction-left button')
  }

  get logoutBtn() {
    return $('.dropdown-scroll-container > button')
  }

  logout() {
    if (this.avatarBtn.isVisible()) {
      this.avatarBtn.click()
      this.logoutBtn.click()
    }
  }

  get submitBtn() {
    return $('[data-test=savebar] > button')
  }

  submitGlobal() {
    return $('[data-test=savebar] > button').click()
  }

  open(path) {
    browser.url('/' + path)

    browser.windowHandleFullscreen()
  }

  // relative path checking
  getUrl(url) {
    const browserUrl = browser.getUrl()
    // get the relative path instead of domain.com/url , you get /url
    return browserUrl.replace(/^(?:\/\/|[^/]+)*\//, '/')
  }
}
export default Page
