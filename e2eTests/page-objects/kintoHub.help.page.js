import Page from './page'

class KintoHubHelp extends Page {
  open() {
    super.open('https://help.kintohub.com/docs/getting-started.html')
  }

  get companyName() {
    return $('#companyname')
  }
}

export default new KintoHubHelp()
