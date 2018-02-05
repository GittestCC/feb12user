import Page from './page'

class KintoHubHelp extends Page {
  open() {
    super.open('https://desk.zoho.com/portal/kintohub/kb')
  }

  get companyName() {
    return $('#companyname')
  }
}

export default new KintoHubHelp()
