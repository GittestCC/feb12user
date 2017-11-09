import { connect } from 'react-redux'
import { reset } from 'redux-form'
import { fetchKintoBlock, fetchKintoBlocks } from '../../../actions/kintoBlocks'
import { findInArrayByText, asTextList } from '../../../helpers/versionHelper'
import KintoBlockManage from '../../../components/dashboard/kintoBlocks/KintoBlockManage'

function mapStateToProps(state, { match }) {
  const { id, ver } = match.params
  const kintoBlock = state.kintoBlocks.byId[id] || {}

  return {
    id,
    ver,
    kintoBlock,
    version: findInArrayByText(kintoBlock.versions, ver),
    baseVersions: asTextList(kintoBlock.versions)
  }
}

function mapDispatchToProps(dispatch, { match }) {
  return {
    fetchKintoBlock: (id, ver) => dispatch(fetchKintoBlock(id, ver)),
    fetchKintoBlocks: () => dispatch(fetchKintoBlocks()),
    resetForm: () => dispatch(reset('kintoBlockManageForm'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KintoBlockManage)
