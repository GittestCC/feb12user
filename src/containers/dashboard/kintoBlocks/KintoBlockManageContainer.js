import { connect } from 'react-redux'
import { reset } from 'redux-form'
import { fetchKintoBlock, fetchKintoBlocks } from '../../../actions/kintoBlocks'
import { isBranchVersionEqual } from '../../../helpers/versionHelper'
import { BRANCH } from '../../../constants/version'
import KintoBlockManage from '../../../components/dashboard/kintoBlocks/KintoBlockManage'

function mapStateToProps(state, { match }) {
  const { id, ver, type } = match.params
  const kintoBlock = state.kintoBlocks.byId[id] || {}
  const { canSave } = state.pageOptions
  return {
    id,
    ver,
    type,
    kintoBlock,
    canTagCommit:
      kintoBlock.version && kintoBlock.version.type === BRANCH && !canSave,
    isVersionMatch: isBranchVersionEqual(kintoBlock.version, {
      name: ver,
      type
    }),
    hasActiveBuild: !!kintoBlock.activeBuild,
    canSave
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchKintoBlock: (id, ver, type) =>
      dispatch(fetchKintoBlock(id, ver, type)),
    fetchKintoBlocks: () => dispatch(fetchKintoBlocks()),
    resetForm: () => dispatch(reset('kintoBlockManageForm'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KintoBlockManage)
