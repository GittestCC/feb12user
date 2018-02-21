import { connect } from 'react-redux'
import { reset } from 'redux-form'
import { fetchKintoBlock, fetchKintoBlocks } from '../../../actions/kintoBlocks'
import { showNotification } from '../../../actions/pageOptions'
import { isBranchVersionEqual } from '../../../helpers/versionHelper'
import { BRANCH } from '../../../constants/version'
import KintoBlockManage from '../../../components/dashboard/kintoBlocks/KintoBlockManage'

function mapStateToProps(state, { match }) {
  const { id, ver, type } = match.params
  const kintoBlock = state.kintoBlocks.byId[id] || {}
  const selectedWorkspace = state.workspaces.selectedWorkspace
  const { canSave } = state.pageOptions
  return {
    id,
    ver,
    type,
    kintoBlock,
    selectedWorkspace,
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
    resetForm: () => dispatch(reset('kintoBlockManageForm')),
    showNotification: (type, message) =>
      dispatch(showNotification(type, message))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KintoBlockManage)
