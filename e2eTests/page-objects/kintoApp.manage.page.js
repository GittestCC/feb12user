import Page from './page'
import { getDataTest, getInput } from '../helpers/elementSelector'

class KintoAppManage extends Page {
  open(id, ver) {
    super.open(`app/dashboard/1/kintoapps/${id}/versions/${ver}`)
  }

  get form() {
    return getDataTest('ka-form')
  }

  get title() {
    return $('.page-title > h2')
  }

  get name() {
    return getInput('name')
  }

  get description() {
    return getInput('shortDescription', 'textarea')
  }

  get kbName() {
    return $('div.main-icon.kintoblock')
  }

  get kaTagNDeploy() {
    return $('#savebar-portal button')
  }

  get tagDeployModal() {
    return $(
      '.ReactModal__Content.ReactModal__Content--after-open.kh-modal.tag-and-deploy-modal'
    )
  }

  get majorVersion() {
    return $('input[name="version.major"]')
  }

  get minorVersion() {
    return $('input[name="version.minor"]')
  }

  get revision() {
    return $('input[name="version.revision"]')
  }

  get notes() {
    return $('#notes')
  }

  get createTagBtn() {
    return $('.kh-modal-actions > button.button.dark')
  }

  get createTagBtnDisabled() {
    return $('.kh-modal-actions > button.button.dark.disabled')
  }

  get cancelTagBtn() {
    return $('.kh-modal-actions > button.button.secondary')
  }

  get envList() {
    return $('.kintoapp-environments-list')
  }

  get wsSwitchDef() {
    return getDataTest('public')
  }

  get envName() {
    return $('#environment')
  }

  get tagDeployErrMsg() {
    return $('div.kh-modal-body > form > div:nth-child(2) > div.error-message')
  }

  get successDeployMsg() {
    return $(
      '.environments-list .environment-card > div.bottom > div.left > div > div.upper > div > h6'
    )
  }

  get successDeployVersion() {
    return $(
      '.environments-list .environment-card > div.bottom > div.left > div > div.upper > div > h4.version'
    )
  }

  get switchValueForWS() {
    return $('#public')
  }

  get errorMsgDuplicateVersion() {
    return $('div.kh-modal-body > form > div.error-message-form.error-message')
  }

  get compareVersions() {
    return $('.buttons > button.button.secondary')
  }

  get viewEnvironments() {
    return $('.buttons > button.button.dark')
  }

  get addNewEnvironment() {
    return $('.kintoapp-environments-list .button.button.secondary')
  }

  get environmentName() {
    return $('#envName')
  }

  get addEnvBtn() {
    return $('.kh-modal-actions .button.button.dark')
  }

  envListItem(index) {
    return $(`.environments-list .environment-card:nth-child(${index})`)
  }

  get clientIdFieldColumn() {
    return $('.field-container.false.two-columns >div:nth-child(1)')
  }

  get clientIdFieldTitle() {
    return $('.field-container.false.two-columns >div:nth-child(1)> .label')
  }

  get clientIdField() {
    return $(
      '.field-container.false.two-columns >div:nth-child(1)> .false-input'
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
      '.field-container.false.two-columns >div:nth-child(2)> .false-input'
    )
  }

  get tagNDeployDropDownField() {
    return $('.prefill-wrapper>select')
  }
  getTagNDeployDropDown(index) {
    return $(`.prefill-wrapper>select>option:nth-child(${index})`)
  }

  get kaListPageFromKaManagePage() {
    return $('.breadcrumbs .unstyled-list>li:nth-child(1)')
  }

  getDependencies(index) {
    return $(`div.blocks-or-services .block:nth-child(${index})`)
  }

  get tagVersionFromBreadcrumb() {
    return $(
      '.breadcrumbs .unstyled-list>li:nth-child(3) .breadcrumb-text.disabled.text-disabled'
    )
  }

  get saveChangesBtn() {
    return $('button.button.default')
  }

  //21/3
  get kaListDropDownBtn() {
    return $(
      '.breadcrumbs .unstyled-list>li:nth-child(2) #application-dropdown>button'
    )
  }

  get kaDropDownVisible() {
    return $('div.dropdown-content.isShown.short')
  }

  get createNewKaBtnInBreadcrumb() {
    return $('.dropdown-content-action button.button.dark')
  }

  getKaFromBreadcrumbDropDown(index) {
    return $(
      `#application-dropdown .dropdown-scroll-container button:nth-child(${index})`
    )
  }

  getKaNameFromDropDown(index) {
    return $(
      `#application-dropdown .dropdown-scroll-container button:nth-child(${index}) .tag-item-text`
    )
  }

  get draftDropDownFromBreadcrumb() {
    return $(
      '#tagDropdown.dropdown.dropdown-filter.margin-right.ka-version-switcher .dropdown-button.breadcrumb-icon'
    )
  }

  get draftOptionFromDraftDropDown() {
    return $(
      '#tagDropdown.dropdown.dropdown-filter.margin-right.ka-version-switcher .dropdown-scroll-container button:nth-child(1) .tag-item-text'
    )
  }

  get draftIconFromDraftDropDown() {
    return $(
      '#tagDropdown.dropdown.dropdown-filter.margin-right.ka-version-switcher .dropdown-scroll-container button:nth-child(1) .draft-icon'
    )
  }

  getTagNumberFromDraftDropDown(index) {
    return $(
      `#tagDropdown.dropdown.dropdown-filter.margin-right.ka-version-switcher .dropdown-scroll-container button:nth-child(${index}) .tag-item-text`
    )
  }

  get tagNumberFromBreadcrumb() {
    return $(
      '.breadcrumbs li:nth-child(3) .breadcrumb-text.disabled.text-disabled'
    )
  }

  get draftTextFormBreadcrumb() {
    return $(
      '.breadcrumbs li:nth-child(3) .breadcrumb-text.disabled.text-disabled'
    )
  }

  get appDescriptonMaxCount() {
    return $(`[data-test='shortDescription'] .characters-remaining`)
  }

  //29/3
  get kaNameFromInputField() {
    return $('input#name')
  }

  get membersBar() {
    return $('.form-wrapper.workspaces .workspace-toolbar')
  }

  get deployBtn() {
    return $('button.button.default.tag-deploy')
  }

  get compareVersionsTitle() {
    return $('.changelogs-title>h3')
  }

  //12/04
  getEditDependenciesBtn(index) {
    return $(
      `.form-body.simple.dependency-management .button-group:nth-child(${index})> .button.secondary`
    )
  }

  get editDependenciesIconBelowBtnRow() {
    return $(
      '.form-body.simple.dependency-management .button-group:nth-child(3) :nth-child(2)'
    )
  }

  getEditDependenciesIconFromDependenciesCard(index) {
    return $(
      `.blocks-or-services .block:nth-child(${index}) .version .pen-edit`
    )
  }

  get environmentDefaultsTextFromBreadcrumb() {
    return $(
      '.breadcrumbs .unstyled-list li:nth-child(4) .disabled.text-disabled'
    )
  }

  get draftDropDownVisible() {
    return $('div.dropdown-content.isShown')
  }

  get environmentDefaultsDropDown() {
    return $('#env-switch-dropdown .dropdown-button.breadcrumb-icon')
  }

  get searchFilterInAppSwitcherDropDown() {
    return $(
      '.breadcrumbs .unstyled-list>li:nth-child(2) .dropdown-filter-input'
    )
  }

  get draftDropDownFilter() {
    return $('div.dropdown-content.isShown  .dropdown-filter-input')
  }

  getTagDateFromTagDropDown(index) {
    return $(
      `#tagDropdown.dropdown.dropdown-filter.margin-right.ka-version-switcher .dropdown-scroll-container button:nth-child(${index}) .date>h5`
    )
  }

  getTagNotesFromTagDropDown(index) {
    return $(
      `#tagDropdown.dropdown.dropdown-filter.margin-right.ka-version-switcher .dropdown-scroll-container button:nth-child(${index}) .notes>h5`
    )
  }

  get searchFilterInEnvSwitcherDropDown() {
    return $('.dropdown-content.isShown.short input')
  }

  get searchFilterInLogSwitcherDropDown() {
    return $('.dropdown-content.isShown.short input')
  }

  getEnvironmentDefaultsDropDownEnvText(index) {
    return `#env-switch-dropdown .dropdown-scroll-container button:nth-child(${index}) .tag-item-text`
  }

  get dependenciesTitle() {
    return $('.form-wrapper.blocks-and-services>div>h3')
  }

  get dependenciesSubtitle() {
    return $('.form-wrapper.blocks-and-services>div>h5')
  }

  get dependenciesSearchBar() {
    return $('.form-body.simple.dependency-management .Select-input>input')
  }

  get editDependneciesBtn() {
    return $(
      '.form-body.simple.dependency-management .button-group:nth-child(3) :nth-child(1)'
    )
  }

  getDependenciesCards(index) {
    return $(
      `.form-body.simple.dependency-management .blocks-or-services .block:nth-child(${index})`
    )
  }

  getDependenciesCardTitle(index) {
    return $(
      `.form-body.simple.dependency-management .blocks-or-services .block:nth-child(${index}) .name`
    )
  }

  getDependenciesCardSubtitle(index) {
    return $(
      `.form-body.simple.dependency-management .blocks-or-services .block:nth-child(${index}) .description`
    )
  }

  getDependenciesCardIcon(index) {
    return $(
      `.form-body.simple.dependency-management .blocks-or-services .block:nth-child(${index}) .main-icon.kintoblock`
    )
  }

  getExpandTextFromDependencyCard(index) {
    return $(
      `.form-body.simple.dependency-management .blocks-or-services .block:nth-child(${index}) .dependencies-exist .expand-close-indicator>h6`
    )
  }

  getSecondLevelDependencyStackedIcons(id, index) {
    return $(
      `.form-body.simple.dependency-management .blocks-or-services .block:nth-child(${id}) .expand .icons .icon.kintoblock:nth-child(${index})`
    )
  }

  getSecondLevelDependencyAddIcon(index) {
    return $(
      `.form-body.simple.dependency-management .blocks-or-services .block:nth-child(${index}) .expand .icons .number`
    )
  }

  getSecondLevelDependencyTitle(id, index) {
    return $(
      `.form-body.simple.dependency-management .blocks-or-services .block:nth-child(${id}) .dependencies-exist .row:nth-child(${index}) .text>h3`
    )
  }

  getSecondLevelDependencySubtitle(id, index) {
    return $(
      `.form-body.simple.dependency-management .blocks-or-services .block:nth-child(${id}) .dependencies-exist .row:nth-child(${index}) .text>h6`
    )
  }

  getSecondLevelDependencyIcon(id, index) {
    return $(
      `.form-body.simple.dependency-management .blocks-or-services .block:nth-child(${id}) .dependencies-exist .row:nth-child(${index}) ..icon.kintoblock`
    )
  }

  getDependencyInformationLinkIcon(index) {
    return $(
      `.form-body.simple.dependency-management .blocks-or-services .block:nth-child(${index}) .text .information-link-icon`
    )
  }

  get kbDocumentionPage() {
    return $('.layout-inner .endpoint-title>h3')
  }

  getFocusedKbInEditDependenciesPage(index) {
    return $(
      `.right-side .ka-config-params .ka-config-item.ka-config-params-item:nth-child(${index})>h3`
    )
  }
}

export default new KintoAppManage()
