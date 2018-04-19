import { connect } from 'react-redux'
import moment from 'moment'
import { pages } from '../../constants/pages'
import { BRANCH } from '../../constants/version'
import { timeDayMonthYearShort } from '../../constants/dateFormat'
import { getUrl, getPageUrl } from '../../helpers/urlHelper'
import { getLiveEnvironmentListForTag } from '../../helpers/environmentHelper'
import KintoAppTagSelector from '../../components/breadcrumbs/KintoAppTagSelector'

function mapStateToProps(state, { url }) {
  const { selectedKintoAppId, selectedEnvironmentId } = state.pageOptions
  const selectedApp = state.kintoApps.byId[selectedKintoAppId] || {}
  const version = selectedApp.version || {}
  const isDraft = version.type === BRANCH
  let dropdownItems = []

  if (selectedApp.versions) {
    dropdownItems = selectedApp.versions.map(v => {
      return {
        text: v.name,
        url: getUrl(url, {
          id: selectedApp.id,
          version: v.name,
          envId: selectedEnvironmentId || '0',
          workspaceId: state.workspaces.selectedWorkspace
        }),
        liveEnvironments: getLiveEnvironmentListForTag(
          v.name,
          selectedApp.environments
        ),
        lastUpdated: moment(v.lastUpdated).format(timeDayMonthYearShort),
        notes: v.notes,
        active: v.name === version.name
      }
    })
  }

  return {
    isDraft,
    selectedApp,
    dropdownItems,
    selectedTag: version.name,
    selectedVersionUrl:
      selectedApp.id &&
      getPageUrl(pages.dashboardKintoAppsManage, {
        id: selectedApp.id,
        version: version.name,
        workspaceId: state.workspaces.selectedWorkspace
      })
  }
}

export default connect(mapStateToProps)(KintoAppTagSelector)
