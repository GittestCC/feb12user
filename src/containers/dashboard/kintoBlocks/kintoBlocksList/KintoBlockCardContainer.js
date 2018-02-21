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
  return {
    kintoBlock,
    versions,
    latestVersion: versions[0],
    isLatestVersionPending: latestVersion.state === 'PENDING',
    dropdownId: `id-${index}`,
    dropdownVersionId: `idv-${index}`
  }
}

function mapDispatchToProps(dispatch) {
  return {
    push: url => dispatch(push(url))
  }
}

function mergeProps(stateProps, dispatchProps) {
  const endpointList = getPageUrl(pages.dashboardDocumentation, {
    workspaceId: stateProps.selectedWorkspace,
    id: stateProps.kintoBlock.id,
    version: stateProps.latestVersion.text,
    type: stateProps.latestVersion.type
  })
  return {
    ...stateProps,
    ...dispatchProps,
    goToLatest: () => dispatchProps.push(stateProps.latestVersion.url),
    goToEndpoint: () => dispatchProps.push(endpointList)
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  KintoBlockCard
)
