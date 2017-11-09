import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getUrl, getPageUrl } from '../../helpers/urlHelper'
import { getVersionAsText } from '../../helpers/versionHelper'
import { pages } from '../../constants/pages'
import { addNewEnvironment } from '../../actions/kintoApps'
import KintoAppEnvironmentSwitcher from '../../components/breadcrumbs/KintoAppEnvironmentSwitcher'

function mapStateToProps(state, { url, isDependencyConfig }) {
  const { selectedKintoAppId, selectedEnvironmentId } = state.pageOptions
  const app = state.kintoApps.byId[selectedKintoAppId] || {}
  let environments = app.environments || []
  if (isDependencyConfig && app.id) {
    environments = [
      {
        id: '0',
        name: 'Environment Defaults'
      },
      ...environments
    ]
  }
  const selectedEnv =
    environments.find(e => e.id === selectedEnvironmentId) || {}
  const dropdownItems = environments.map(e => ({
    text: e.name,
    active: e.id === selectedEnvironmentId,
    url: getUrl(url, {
      id: app.id,
      envId: e.id,
      version: getVersionAsText(app.version, true)
    })
  }))

  return {
    kintoApp: app,
    dropdownItems,
    selectedEnvironmentName: selectedEnv.name,
    hideCreateAction: isDependencyConfig,
    selectedEnvironmentUrl:
      app.id &&
      getUrl(url, {
        id: app.id,
        envId: selectedEnvironmentId,
        version: getVersionAsText(app.version, true)
      })
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addNewEnvironment: (id, data) => {
      dispatch(addNewEnvironment(id, data)).then(() => {
        dispatch(push(getPageUrl(pages.dashboardKintoAppsEnvironments, { id })))
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  KintoAppEnvironmentSwitcher
)
