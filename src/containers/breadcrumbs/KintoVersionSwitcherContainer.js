import { connect } from 'react-redux'
import {
  isVersionEqual,
  getVersionAsText,
  getVersionStateClassName,
  asTextList,
  getVersionType
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
  const workspaceId = state.workspaces.selectedWorkspace
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
      text: isKintoApp ? getVersionAsText(v) : v.name,
      url:
        workspaceId &&
        getUrl(url, {
          id: selectedItem.id,
          version: isKintoApp ? getVersionAsText(v, true) : v.name,
          type: getVersionType(v),
          envId: selectedEnvironmentId || '0',
          workspaceId
        }),
      tag: v.state,
      className: getVersionStateClassName(v),
      active: isVersionEqual(v, selectedItem.version)
    }))
  }

  const version = selectedItem.version
  return {
    selectedItem,
    dropdownItems,
    selectedVersion: isKintoApp
      ? getVersionAsText(selectedItem.version)
      : version && version.name,
    selectedVersionUrl:
      selectedItem.id &&
      workspaceId &&
      getPageUrl(editPage, {
        id: selectedItem.id,
        version: isKintoApp
          ? getVersionAsText(selectedItem.version, true)
          : selectedItem.version.name,
        type: getVersionType(selectedItem.version),
        workspaceId
      }),
    baseVersions: asTextList(selectedItem.versions),
    isKintoBlock: !isKintoApp
  }
}

export default connect(mapStateToProps)(KintoVersionSwitcher)
