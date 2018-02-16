import Page from './page'
import { getInput } from '../helpers/elementSelector'

class EnvironmentManage extends Page {
  get form() {
    return $('div.environment-edit-page')
  }

  get name() {
    return getInput('name')
  }

  get breadcrumbEnv() {
    return $('#env-switch-dropdown>button')
  }

  get breadcrumbEnvDropDown() {
    return $('.dropdown-content.isShown.short')
  }

  getbreadCrumbEnv(index) {
    return $(
      `.dropdown-content.isShown.short .dropdown-scroll-container>button:nth-child(${index})`
    )
  }

  getbreadCrumbEnvText(index) {
    return $(
      `.dropdown-content.isShown.short .dropdown-scroll-container>button:nth-child(${index}) .tag-item-text`
    )
  }

  get envTitle() {
    return $('.page-title>h2')
  }

  get envSubtitle() {
    return $('.form-wrapper>h3')
  }

  get envBody() {
    return $('.form-wrapper>h5')
  }

  get envSaveBtn() {
    return $('button.button.default')
  }

  geteditEnv(index) {
    return $(`.environment-card:nth-child(${index}) .button.secondary`)
  }

  get viewEnvList() {
    return $('.buttons .button.button.dark')
  }

  get envList() {
    return $('.kintoapp-environments-list')
  }

  get envListFromBreadCrumb() {
    return $('.breadcrumbs  .unstyled-list>li:nth-child(3)>a')
  }

  getenvNameFromList(index) {
    return $(`.environments-list .top>h3:nth-child(${index})`)
  }
}

export default new EnvironmentManage()
