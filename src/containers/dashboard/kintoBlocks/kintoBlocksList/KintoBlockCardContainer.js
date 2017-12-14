import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { pages } from '../../../../constants/pages'
import { getPageUrl } from '../../../../helpers/urlHelper'
import { getVersionType } from '../../../../helpers/versionHelper'
import KintoBlockCard from '../../../../components/dashboard/kintoBlocks/kintoBlocksList/KintoBlockCard'

function mapStateToProps(state, { kintoBlock, index }) {
  const latestVersion = kintoBlock.versions[0]
  const versions = kintoBlock.versions.map(v => {
    let result = {
      text: v.name,
      type: v.type,
      url: getPageUrl(pages.dashboardKintoBlocksManage, {
        id: kintoBlock.id,
        version: v.name,
        type: getVersionType(v)
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
  return {
    ...stateProps,
    ...dispatchProps,
    goToLatest: () => dispatchProps.push(stateProps.latestVersion.url)
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  KintoBlockCard
)
