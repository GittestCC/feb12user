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
    return $(`.environments-list :nth-child(${index}) .status-and-build>div>h6`)
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

  get envCardCompareVersions() {
    return $(`.environments-list :nth-child(1) .view .changelog>a`)
  }

  get envCardViewLogs() {
    return $('.environments-list :nth-child(1) .view .logs>a')
  }

  get envListFromViewLogs() {
    return $('.breadcrumbs li:nth-child(3)>a')
  }

  get kaNameFromEnvListPage() {
    return $('.list-container >a')
  }

  getenvCardVerNumber(index) {
    return `.environments-list :nth-child(${index}) .left .version`
  }

  get envCardDropDown() {
    return $('.dropdown .dropdown-content.isShown')
  }

  getenvCardShutDownBtn(index) {
    return $(`#id-${index} .dropdown-scroll-container > button`)
  }

  getIntermediateDeployProgress(index) {
    return $(`.environments-list :nth-child(${index}) .step h6`)
  }

  get envCardDeployRollbackBtn() {
    return $('.release-button .button.secondary.false')
  }

  get envDeployShutDownPopUp() {
    return $('.add-new-environment .kh-modal-body')
  }

  get envBuildViewLogsPage() {
    return $('.logs-header >h3')
  }

  getEnvNoDeploySubText(index) {
    return $(
      `.environments-list :nth-child(${index}) .left .lower>div :nth-child(1)`
    )
  }

  getDateOfEnvDeploy(index) {
    return $(`.environments-list :nth-child(${index}) .left .lower .date`)
  }

  getEnvCardDeployBtn(index) {
    return $(
      `.environments-list :nth-child(${index}) .right.expanded-buttons>button`
    )
  }

  getenvDeployDate(index) {
    return $(
      `.environments-list .environment-card:nth-child(${index}) .lower .date`
    )
  }

  get shutDownAnywayBtn() {
    return $('.kh-modal-body .button.dark')
  }

  get shutDownPopUpCancelBtn() {
    return $('.kh-modal-body .button.secondary')
  }

  get shutDownTitle() {
    return $('.kh-modal-title >h4')
  }

  get shutDownContent() {
    return $('.full-width-field>h4')
  }

  getEnvNoDeployText(index) {
    return $(
      `.environments-list .environment-card:nth-child(${index}) .upper>h4`
    )
  }
}

export default new EnvironmentList()
