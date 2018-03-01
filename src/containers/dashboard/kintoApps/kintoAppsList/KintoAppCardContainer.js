import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getEnvVersionsList } from '../../../../helpers/versionHelper'
import { getPageUrl } from '../../../../helpers/urlHelper'
import { pages } from '../../../../constants/pages'
import { BRANCH } from '../../../../constants/version'
import { getVersionType } from '../../../../helpers/versionHelper'
import KintoAppCard from '../../../../components/dashboard/kintoApps/kintoAppsList/KintoAppCard'

function mapStateToProps(state, { kintoApp, index }) {
  const workspaceId = state.workspaces.selectedWorkspace

  const appEnvironments = kintoApp.environments || []
  const deployedEnvironments = appEnvironments.filter(e => e.deployedVersion)

  const tagList = kintoApp.versions.map(v => {
    return {
      text: v.name,
      special: v.type === BRANCH,
      releases: v.environments,
      deployedIn: deployedEnvironments
        .filter(e => e.deployedVersion.name === v.name)
        .map(e => e.name),
      url: getPageUrl(pages.dashboardKintoAppsManage, {
        id: kintoApp.id,
        version: v.name,
        workspaceId
      })
    }
  })

  const kintoAppDependencies = kintoApp.dependencies
    ? kintoApp.dependencies.map(d => {
        const manageUrl =
          d.type === 'KINTOBLOCK'
            ? pages.dashboardKintoBlocksManage
            : pages.dashboardKintoAppsManage

        let dependency = {
          name: d.name,
          url: getPageUrl(manageUrl, {
            id: d.blockId,
            version: d.version.name,
            type: getVersionType(d.version),
            workspaceId
          }),
          type: d.type
        }
        return dependency
      })
    : []

  return {
    kintoApp,
    kintoAppDependencies,
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
  const changelogUrl = getPageUrl(pages.dashboardKintoAppsChangelogs, {
    id: stateProps.kintoApp.id,
    workspaceId: stateProps.selectedWorkspace
  })
  return {
    ...stateProps,
    ...dispatchProps,
    goToDraft: () => dispatchProps.push(stateProps.tagList[0].url),
    goToDependencyManage: url => dispatchProps.push(url),
    goToEnvironment: () => dispatchProps.push(environmentUrl),
    goToChangelog: () => dispatchProps.push(changelogUrl)
  }
}

export default connect(mapStateToProps, { push }, mergeProps)(KintoAppCard)
