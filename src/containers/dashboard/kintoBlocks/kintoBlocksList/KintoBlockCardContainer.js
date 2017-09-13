import { connect } from 'react-redux'
import KintoBlockCard from '../../../../components/dashboard/kintoBlocks/kintoBlocksList/KintoBlockCard'
import { getVersion } from '../../../../helpers/versionHelper'

function mapStateToProps(state, { kintoBlock }) {
  const latestVersion = kintoBlock.versions[0]
  return {
    kintoBlock,
    isLatestVersionPending: latestVersion.state === 'PENDING',
    latestVersion: getVersion(latestVersion)
  }
}

export default connect(mapStateToProps)(KintoBlockCard)
