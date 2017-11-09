import { connect } from 'react-redux'
import {
  isVersionEqual,
  getVersionAsText,
  getVersionStateClassName,
  asTextList
} from '../../helpers/versionHelper'
import { pages } from '../../constants/pages'
import { getUrl, getPageUrl } from '../../helpers/urlHelper'
import KintoVersionSwitcher from '../../components/breadcrumbs/KintoVersionSwitcher'

function mapStateToProps(state, { type, disabled, url }) {
  const {
    selectedKintoAppId,
    selectedKintoBlockId,
    selectedEnvironmentId
  } = state.pageOptions
  const isKintoApp = type === 'kintoapp'
  const editPage = isKintoApp
    ? pages.dashboardKintoAppsManage
    : pages.dashboardKintoBlocksManage
  const selectedItem =
    (isKintoApp
      ? state.kintoApps.byId[selectedKintoAppId]
      : state.kintoBlocks.byId[selectedKintoBlockId]) || {}

  let dropdownItems = []
  if (selectedItem.versions) {
    dropdownItems = selectedItem.versions.map(v => ({
      text: getVersionAsText(v),
      url: getUrl(url, {
        id: selectedItem.id,
        version: getVersionAsText(v, true),
        envId: selectedEnvironmentId
      }),
      tag: v.state,
      className: getVersionStateClassName(v),
      active: isVersionEqual(v, selectedItem.version)
    }))
  }
  return {
    selectedItem,
    dropdownItems,
    selectedVersion: getVersionAsText(selectedItem.version),
    selectedVersionUrl:
      selectedItem.id &&
      getPageUrl(editPage, {
        id: selectedItem.id,
        version: getVersionAsText(selectedItem.version, true)
      }),
    baseVersions: asTextList(selectedItem.versions),
    isKintoBlock: !isKintoApp
  }
}

export default connect(mapStateToProps)(KintoVersionSwitcher)
