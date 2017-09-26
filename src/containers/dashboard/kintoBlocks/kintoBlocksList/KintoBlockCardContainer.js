import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import KintoBlockCard from '../../../../components/dashboard/kintoBlocks/kintoBlocksList/KintoBlockCard'
import { getVersionSelectItem } from '../../../../helpers/versionHelper'

function mapStateToProps(state, { kintoBlock, index }) {
  const latestVersion = kintoBlock.versions[0]
  const versions = kintoBlock.versions.map(v => {
    const isFirst = kintoBlock.versions.indexOf(v) === 0
    let result = getVersionSelectItem(v, kintoBlock.id)
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
    dropdownDependencyId: `dep-id-${index}`,
    dropdownId: `id-${index}`,
    dropdownVersionId: `idv-${index}`
  }
}

function mapDispatchToProps(dispatch, { onVersionCreate, kintoBlock }) {
  return {
    onVersionCreate: () => onVersionCreate(kintoBlock),
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
