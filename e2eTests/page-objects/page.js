class Page {
  TEST_USERNAME = process.env.E2E_TEST_USERNAME
  TEST_PASSWORD = process.env.E2E_TEST_PASSWORD

  get sidebar() {
    return browser.element('[data-test=sidebar]')
  }

  get navbar() {
    return browser.element('[data-test=navbar]')
  }

  open(path) {
    browser.url('/' + path)
  }

  // relative path checking
  getUrl(url) {
    const browserUrl = browser.getUrl()
    // get the relative path instead of domain.com/url , you get /url
    return browserUrl.replace(/^(?:\/\/|[^/]+)*\//, '/')
  }
}
export default Page
