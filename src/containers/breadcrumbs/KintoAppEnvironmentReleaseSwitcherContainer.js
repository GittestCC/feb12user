import { connect } from 'react-redux'
import { uniqBy, isEmpty, reverse } from 'lodash'
import moment from 'moment'
import { getUrl } from '../../helpers/urlHelper'
import { getVersionAsText } from '../../helpers/versionHelper'
import KintoAppEnvironmentReleaseSwitcher from '../../components/breadcrumbs/KintoAppEnvironmentReleaseSwitcher'
import { timeDayMonthYear } from '../../constants/dateFormat.js'

function mapStateToProps(state, { url }) {
  const {
    selectedKintoAppId,
    selectedEnvironmentId,
    selectedReleaseVersion
  } = state.pageOptions
  const workspaceId = state.workspaces.selectedWorkspace
  const app = state.kintoApps.byId[selectedKintoAppId] || {}
  let environments = app.environments || []
  const selectedEnv =
    environments.find(e => e.id === selectedEnvironmentId) || {}

  const dropdownItems = !isEmpty(selectedEnv)
    ? uniqBy(selectedEnv.releases, release => {
        return getVersionAsText(release.version)
      }).map(r => ({
        text: getVersionAsText(r.version),
        active: getVersionAsText(r.version) === selectedReleaseVersion,
        tag:
          r.version ===
          selectedEnv.releases[selectedEnv.releases.length - 1].version
            ? 'live'
            : '',
        lastDeployed: moment(r.lastUpdated).format(timeDayMonthYear),
        url:
          workspaceId &&
          getUrl(url, {
            workspaceId: workspaceId,
            id: selectedKintoAppId,
            envId: selectedEnvironmentId,
            releaseVersion: getVersionAsText(r.version)
          })
      }))
    : []

  return {
    hideAction: true,
    kintoApp: app,
    dropdownItems: reverse(dropdownItems),
    selectedReleaseVersion
  }
}

export default connect(mapStateToProps, undefined)(
  KintoAppEnvironmentReleaseSwitcher
)
