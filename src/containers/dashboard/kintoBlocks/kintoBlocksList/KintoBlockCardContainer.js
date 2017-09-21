import { connect } from 'react-redux'
import KintoBlockCard from '../../../../components/dashboard/kintoBlocks/kintoBlocksList/KintoBlockCard'
import {
  getVersion,
  getVersionStateClassName,
  getManageUrlForKintoBlock
} from '../../../../helpers/versionHelper'

function mapStateToProps(state, { kintoBlock, index }) {
  const latestVersion = kintoBlock.versions[0]
  const versions = kintoBlock.versions.map(v => {
    const isFirst = kintoBlock.versions.indexOf(v) === 0
    let result = {
      text: getVersion(v),
      tag: v.state,
      className: getVersionStateClassName(v.state),
      url: getManageUrlForKintoBlock(kintoBlock, v)
    }
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

export default connect(mapStateToProps)(KintoBlockCard)
