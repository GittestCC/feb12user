import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { pages } from '../../../../constants/pages'
import { getPageUrl } from '../../../../helpers/urlHelper'
import { getVersionType } from '../../../../helpers/versionHelper'
import KintoBlockCard from '../../../../components/dashboard/kintoBlocks/kintoBlocksList/KintoBlockCard'

function mapStateToProps(state, { kintoBlock, index }) {
  const { selectedWorkspace } = state.workspaces
  const latestVersion = kintoBlock.versions[0]
  const versions = kintoBlock.versions.map(v => {
    let result = {
      text: v.name,
      type: v.type,
      url: getPageUrl(pages.dashboardKintoBlocksManage, {
        id: kintoBlock.id,
        version: v.name,
        type: getVersionType(v),
        workspaceId: selectedWorkspace
      })
    }
    const isFirst = kintoBlock.versions.indexOf(v) === 0
    if (isFirst) {
      result.active = true
    }
    return result
  })

  const kintoBlockDependencies = kintoBlock.dependencies
    ? kintoBlock.dependencies.map(d => {
        const manageUrl =
          d.type === 'KINTOBLOCK'
            ? pages.dashboardKintoBlocksManage
            : pages.dashboardKintoAppsManage

        return {
          name: state.kintoBlocks.byId[d.blockId].name,
          url: getPageUrl(manageUrl, {
            id: d.blockId,
            version: d.version.name,
            type: getVersionType(d.version),
            workspaceId: selectedWorkspace
          }),
          type: d.type
        }
      })
    : []

  return {
    kintoBlock,
    versions,
    latestVersion: versions[0],
    isLatestVersionPending: latestVersion.state === 'PENDING',
    dropdownId: `id-${index}`,
    dropdownVersionId: `idv-${index}`,
    dropdownDependencyId: `idd-${index}`,
    kintoBlockDependencies,
    selectedWorkspace
  }
}

function mapDispatchToProps(dispatch) {
  return {
    push: url => dispatch(push(url))
  }
}

function mergeProps(stateProps, dispatchProps) {
  const endpointUrl = getPageUrl(
    pages.dashboardDocumentation,
    {
      workspaceId: stateProps.selectedWorkspace,
      id: stateProps.kintoBlock.id,
      version: stateProps.latestVersion.text,
      type: stateProps.latestVersion.type
    },
    null,
    true
  )
  return {
    ...stateProps,
    ...dispatchProps,
    goToLatest: () => dispatchProps.push(stateProps.latestVersion.url),
    goToDependencyManage: url => dispatchProps.push(url),
    goToEndpoint: () => dispatchProps.push(endpointUrl)
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  KintoBlockCard
)
