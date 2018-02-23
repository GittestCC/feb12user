import Page from './page'

class EnvironmentList extends Page {
  get addEnv() {
    return $('.kintoapp-environments-list .page-title>button')
  }

  getEditEnv(index) {
    return $(`.environment-card:nth-child(${index}) .button.secondary`)
  }

  getCardDropDownInEnvList(id) {
    return $(`#id-${id}.dropdown>button`)
  }

  getEditOptionInCardDropDown(index) {
    return $(`#id-${index} .dropdown-scroll-container > a`)
  }

  get envList() {
    return $('div.kintoapp-environments-list')
  }

  getExpandEnvDeploys(index) {
    return $(`.environments-list :nth-child(${index}) .top span.chevron`)
  }

  getEnvViewLogs(index) {
    return $(`.environments-list :nth-child(${index}) .bottom .logs>a`)
  }

  getEnvCardCollapseText(index) {
    return $(`.environments-list :nth-child(${index}) .top .expand>h6`)
  }

  getEnvCardExpandText(index) {
    return $(`.environments-list :nth-child(${index}) .top .expand>h6`)
  }

  getEnvCardTopLeftHandle(index) {
    return $(`.environments-list :nth-child(${index}) .top span.hamburger`)
  }

  getEnvCardTitle(index) {
    return $(`.environments-list :nth-child(${index}) .top >h3`)
  }

  getEnvCardDeploySuccess(index) {
    return $(`.environments-list :nth-child(${index}) .left .status.success`)
  }

  getEnvCardDeployBtn(index) {
    return $(`.environments-list :nth-child(${index}) button.button`)
  }

  get deployPopUp() {
    return $('.add-new-environment .kh-modal-body ')
  }

  get deployBtn() {
    return $('.kh-modal-actions button.button.default')
  }

  get deployCancelBtn() {
    return $('.kh-modal-actions button.button.secondary')
  }

  getselectDelpoyVer(index) {
    return $(`select#version :nth-child(${index})`)
  }

  getEnvCardChangeLogs(index) {
    return $(`.environments-list :nth-child(${index}) .view .changelog>a`)
  }

  getEnvCardViewLogs() {
    return $('.environments-list :nth-child(1) .view .logs>a')
  }

  get envListFromViewLogs() {
    return $('.breadcrumbs li:nth-child(3)>a')
  }

  get kaFromEnvListBreadcrumb() {
    return $('.breadcrumbs li:nth-child(2) .list-container>a')
  }
}

export default new EnvironmentList()
