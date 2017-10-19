import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import {
  fetchKintoApps,
  fetchKintoApp,
  fetchKintoAppDependenciesConfig
} from '../../../actions/kintoApps'
import {
  getAllKintoApps,
  getKintoAppDependencies
} from '../../../selectors/kintoApps'
import {
  getVersionSelectItem,
  isVersionEqual
} from '../../../helpers/versionHelper'
import { getBreadcrumbSelectItem } from '../../../helpers/breadcrumbHelper'
import { getEnvironmentSelectList } from '../../../helpers/environmentHelper'
import KintoAppDependenciesConfig from '../../../components/dashboard/kintoApps/KintoAppDependenciesConfig'

function mapStateToProps(state, { match }) {
  const { id, ver, env } = match.params

  const dependencies = getKintoAppDependencies(state, match.params)
  const kintoApp = state.kintoApps.byId[id] || {}
  const kintoApps = getAllKintoApps(state) || []

  const versionsBreadcrumb = kintoApp.versions
    ? kintoApp.versions.map(v => {
        let result = getVersionSelectItem(v, id, true)
        if (isVersionEqual(v, ver)) {
          result.active = true
        }
        return result
      })
    : []

  const appSwitchBreadcrumb = kintoApps.map(k =>
    getBreadcrumbSelectItem(k, id, 'app')
  )

  const environments = kintoApp.environments || []
  const environmentsBreadcrumb = getEnvironmentSelectList(
    environments,
    id,
    ver,
    env
  )
  const selectedEnvironment = environmentsBreadcrumb.find(e => e.active) || {}

  return {
    dependencies,
    kintoApp,
    versionsBreadcrumb,
    environmentsBreadcrumb,
    appSwitchBreadcrumb,
    id,
    ver,
    env,
    selectedEnvironmentName: selectedEnvironment.text
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchKintoApp: (id, ver) => dispatch(fetchKintoApp(id, ver)),
    fetchKintoApps: () => dispatch(fetchKintoApps()),
    fetchKintoAppDependenciesConfig: (id, ver, env) =>
      dispatch(fetchKintoAppDependenciesConfig(id, ver, env)),
    goToCreatePage: () => dispatch(push('/app/dashboard/kintoapps/create'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  KintoAppDependenciesConfig
)
