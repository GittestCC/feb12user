import Page from './page'
import { getInput } from '../helpers/elementSelector'

class DashboardIndex extends Page {
  open(wsID) {
    super.open(`app/dashboard/${wsID}`)
  }

  get container() {
    return $('[data-test=dashboard-index-page]')
  }

  get getStartedBtn() {
    return $('a.button.default')
  }

  get visitGithubLink() {
    return $('a:nth-child(5)')
  }

  get joinSlackLink() {
    return $('a:nth-child(6)')
  }

  get kintoHubLogo() {
    return $('img.home-logo')
  }

  get kintoHubLogolefttop() {
    return $('.navigation-logo')
  }

  get dashboardButton() {
    return $('.on-dashboard')
  }

  get goTodashboard() {
    return $('.go-to-dashboard')
  }

  get goTomarket() {
    return $('.go-to-market')
  }

  get searchBar() {
    return $('.right .search')
  }

  get bellIcon() {
    return $('.notifications')
  }

  get userIcon() {
    return $('button.dropdown-button.user-avatar.uppercase')
  }

  get applicationLeftnav() {
    return $('.kintoapps')
  }

  get kintoBlocksleftnav() {
    return $('.kintoblocks')
  }

  get homeLeftnav() {
    return $('.home')
  }

  get analyticsLeftnav() {
    return $('.analytics.dimmed.no-click')
  }

  get servicesLeftnav() {
    return $('.services')
  }

  get kaHoveraddicon() {
    return $('h4.kintoapps>img')
  }

  get kbHoveraddicon() {
    return $('h4.kintoblocks>img')
  }

  get workSpaceTitle() {
    return $('.workspaces-select>h3')
  }

  get workspaceSelect() {
    return getInput('.workspaces-select>select', 'select')
  }

  get workspaceDropdown() {
    return $('.workspaces-select>select')
  }

  getWSDropdownElement(index) {
    return $(`.workspaces-select>select>:nth-child(${index})`)
  }

  get editWorkspace() {
    return $('a.avatar.small.edit.hide-text')
  }
}

export default new DashboardIndex()
