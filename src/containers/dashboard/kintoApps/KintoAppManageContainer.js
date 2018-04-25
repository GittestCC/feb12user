import { connect } from 'react-redux'
import { reset } from 'redux-form'
import { push } from 'react-router-redux'
import isEmpty from 'lodash/isEmpty'
import {
  fetchKintoApp,
  getKintoAppEnvironments
} from '../../../actions/kintoApps'
import { getPageUrl } from '../../../helpers/urlHelper'
import { pages } from '../../../constants/pages'
import { BRANCH } from '../../../constants/version'
import KintoAppManage from '../../../components/dashboard/kintoApps/KintoAppManage'

function mapStateToProps(state, { match }) {
  let { id, ver } = match.params
  const workspaceId = state.workspaces.selectedWorkspace
  const kintoApp = state.kintoApps.byId[id] || {}
  const version = kintoApp.version || {}
  const { canSave } = state.pageOptions
  const hasDependencies = !isEmpty(kintoApp.appDependencies)

  return {
    id,
    ver,
    kintoApp,
    canSave,
    hasDependencies,
    selectedWorkspace: workspaceId,
    version: kintoApp.version,
    isDraft: version.type === BRANCH,
    isVersionMatch: version.name === ver
  }
}

function mapDispatchToProps(dispatch, { match }) {
  return {
    push: url => dispatch(push(url)),
    fetchKintoApp: (id, ver) => dispatch(fetchKintoApp(id, ver)),
    getKintoAppEnvironments: id => dispatch(getKintoAppEnvironments(id)),
    resetForm: () => dispatch(reset('kintoAppForm'))
  }
}

function mergeProps(stateProps, dispatchProps) {
  const environmentUrl = getPageUrl(pages.dashboardKintoAppsEnvironments, {
    id: stateProps.id,
    workspaceId: stateProps.selectedWorkspace
  })
  const changelogUrl = getPageUrl(pages.dashboardKintoAppsChangelogs, {
    id: stateProps.id,
    workspaceId: stateProps.selectedWorkspace
  })

  return {
    ...stateProps,
    ...dispatchProps,
    goToEnvironment: () => dispatchProps.push(environmentUrl),
    goToChangelog: () => dispatchProps.push(changelogUrl)
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  KintoAppManage
)
