import Page from './page'

class KintoAppList extends Page {
  open(wsID) {
    super.open(`app/dashboard/${wsID}/kintoapps/list`)
  }

  getCard(index) {
    return $(`[data-test='ka-card-id-${index}']`)
  }

  get mykintoAppList() {
    return $('.my-kintoapps')
  }

  getkaListDropDown(id) {
    return $(`#id-${id}.dropdown .dropdown-button.menu`)
  }

  get kaAppListViewEnv() {
    return $('.dropdown .dropdown-content.isShown :nth-child(5)')
  }

  get kaListDropDown() {
    return $('.dropdown .dropdown-content.isShown')
  }

  get kaListDropDownViewTags() {
    return $('.dropdown-scroll-container>button:nth-child(2)')
  }

  getEnvTagNameFromKaListDropDown(index) {
    return $(
      `.dropdown-scroll-container > button:nth-child(${index}) > .kinto-app-tag > .tag-name-and-environments > div.environments > h6`
    )
  }

  getEnvNameFromKaCardList(id, index) {
    return $(
      `[data-test =ka-card-id-${id}] .right .env-item:nth-child(${index}) .env-item-tag >div`
    )
  }

  get envTagsInKaListPage() {
    return $('.dropdown.dropdown-filter.menu-hidden .dropdown-content.isShown')
  }
}

export default new KintoAppList()
