import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import {
  isVersionEqual,
  getVersionAsText,
  getEnvVersionsList
} from '../../../../helpers/versionHelper'
import { getPageUrl } from '../../../../helpers/urlHelper'
import { pages } from '../../../../constants/pages'
import KintoAppCard from '../../../../components/dashboard/kintoApps/kintoAppsList/KintoAppCard'

function mapStateToProps(state, { kintoApp, index }) {
  const workspaceId = state.workspaces.selectedWorkspace
  const tagList = kintoApp.versions.map(v => {
    const isDraft = isVersionEqual(v, '0.0.0')
    return {
      text: isDraft ? 'Draft' : getVersionAsText(v),
      special: isDraft,
      releases: v.environments,
      url: getPageUrl(pages.dashboardKintoAppsManage, {
        id: kintoApp.id,
        version: getVersionAsText(v),
        workspaceId
      })
    }
  })
  return {
    kintoApp,
    tagList,
    envVersionsList: getEnvVersionsList(kintoApp.versions),
    selectedWorkspace: workspaceId,
    dropdownId: `id-${index}`,
    dropdownVersionId: `idv-${index}`,
    dropdownDependencyId: `idd-${index}`
  }
}

function mergeProps(stateProps, dispatchProps) {
  const environmentUrl = getPageUrl(pages.dashboardKintoAppsEnvironments, {
    id: stateProps.kintoApp.id,
    workspaceId: stateProps.selectedWorkspace
  })
  return {
    ...stateProps,
    ...dispatchProps,
    goToDraft: () => dispatchProps.push(stateProps.tagList[0].url),
    goToEnvironment: () => dispatchProps.push(environmentUrl)
  }
}

export default connect(mapStateToProps, { push }, mergeProps)(KintoAppCard)
