import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import get from 'lodash/get'
import { getUrl, getPageUrl } from '../../helpers/urlHelper'
import { pages } from '../../constants/pages'
import { addNewEnvironment } from '../../actions/kintoApps'
import KintoAppEnvironmentSwitcher from '../../components/breadcrumbs/KintoAppEnvironmentSwitcher'

function mapStateToProps(state, { url, isDependencyConfig }) {
  const { selectedKintoAppId, selectedEnvironmentId } = state.pageOptions
  const workspaceId = state.workspaces.selectedWorkspace
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

  const dropdownItems = environments.map(e => {
    return {
      text: e.name,
      active: e.id === selectedEnvironmentId,
      version: e.releases ? e.releases[e.releases.length - 1].version.name : '',
      url:
        workspaceId &&
        getUrl(url, {
          id: selectedKintoAppId,
          envId: e.id,
          version: get(app, 'version.name'),
          workspaceId
        })
    }
  })

  return {
    kintoApp: app,
    dropdownItems,
    selectedEnvironmentName: selectedEnv.name,
    hideCreateAction: isDependencyConfig,
    workspaceId,
    selectedEnvironmentUrl: getUrl(
      url,
      {
        id: selectedKintoAppId,
        envId: selectedEnvironmentId,
        version: get(app, 'version.name'),
        workspaceId
      },
      true
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addNewEnvironment: (id, data, workspaceId) => {
      return dispatch(addNewEnvironment(id, data)).then(() => {
        dispatch(
          push(
            getPageUrl(pages.dashboardKintoAppsEnvironments, {
              id,
              workspaceId
            })
          )
        )
      })
    }
  }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    addNewEnvironment: (id, data) =>
      dispatchProps.addNewEnvironment(id, data, stateProps.workspaceId)
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  KintoAppEnvironmentSwitcher
)
