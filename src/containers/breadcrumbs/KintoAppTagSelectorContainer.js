// kintoapp tag selector container
import { connect } from 'react-redux'
import moment from 'moment'
import { pages } from '../../constants/pages'
import { getVersionAsText, isVersionEqual } from '../../helpers/versionHelper'
import { getUrl, getPageUrl } from '../../helpers/urlHelper'
import KintoAppTagSelector from '../../components/breadcrumbs/KintoAppTagSelector'

function mapStateToProps(state, { type, disabled, url }) {
  const { selectedKintoAppId } = state.pageOptions
  const selectedApp = state.kintoApps.byId[selectedKintoAppId] || {}
  let dropdownItems = []
  let selectedAppVersion = getVersionAsText(selectedApp.version) || ''
  const isDraft =
    selectedAppVersion && selectedAppVersion === '0.0.0' ? true : false

  if (selectedApp.versions) {
    dropdownItems = selectedApp.versions.map(v => ({
      text: getVersionAsText(v),
      url: getUrl(url, {
        id: selectedApp.id,
        version: getVersionAsText(v, true)
      }),
      releases: v.environments,
      lastUpdated: moment(v.lastUpdated).format('h:mmA, DD MMM YYYY'),
      notes:
        selectedApp.version.notes ||
        'Here are some notes that are for this version',
      // TODO: renove mock data when notes from builds are available
      active: isVersionEqual(v, selectedApp.version),
      special: getVersionAsText(v) === '0.0.0' ? true : false
    }))
  }

  return {
    isDraft,
    selectedApp,
    dropdownItems,
    selectedTag: getVersionAsText(selectedApp.version),
    selectedVersionUrl:
      selectedApp.id &&
      getPageUrl(pages.dashboardKintoAppsManage, {
        id: selectedApp.id,
        version: getVersionAsText(selectedApp.version, true)
      })
  }
}

export default connect(mapStateToProps)(KintoAppTagSelector)
