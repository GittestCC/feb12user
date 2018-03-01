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
      `.dropdown-content .dropdown-scroll-container>button:nth-child(${index}) .tag-item-text`
    )
  }

  get environmentName() {
    return $('#envName')
  }

  get addEnvBtn() {
    return $('.kh-modal-actions .button.button.dark')
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

  geteditEnvBtn(index) {
    return $(
      `.environments-list .environment-card:nth-child(${index}) .right.expanded-buttons > a`
    )
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

  get clientIdFieldColumn() {
    return $('.field-container.false.two-columns >div:nth-child(1)')
  }

  get clientIdFieldTitle() {
    return $('.field-container.false.two-columns >div:nth-child(1)> .label')
  }

  get clientIdField() {
    return $(
      '.field-container.false.two-columns :nth-child(1) .false-input.disabled'
    )
  }

  get secretKeyFieldColumn() {
    return $('.field-container.false.two-columns >div:nth-child(2)')
  }

  get secretKeyFieldTitle() {
    return $('.field-container.false.two-columns >div:nth-child(2)> .label')
  }

  get secretKeyField() {
    return $(
      '.field-container.false.two-columns :nth-child(2) .false-input.disabled'
    )
  }
  get addNewEnv() {
    return $('#env-switch-dropdown .dropdown-content-action>button')
  }

  get envNameFromBreadcrumb() {
    return $('.unstyled-list .disabled.text-disabled')
  }
}

export default new EnvironmentManage()
