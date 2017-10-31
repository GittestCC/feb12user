import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
import { updateKintoBlock } from '../../../../actions/kintoBlocks'
import KintoBlockManageForm from '../../../../components/dashboard/kintoBlocks/kintoBlockManage/KintoBlockManageForm'

function mapStateToProps(state, { kintoBlock, ver }) {
  const formSelector = formValueSelector('kintoBlockManageForm')
  const dependencies = formSelector(state, 'dependencies')
  kintoBlock = kintoBlock || {}

  return {
    initialValues: {
      dependencies: kintoBlock.dependencies
    },
    kintoBlock,
    dependencies,
    ver
  }
}

function mapDispatchToProps(dispatch, { kintoBlock, ver }) {
  return {
    onSubmit: data => dispatch(updateKintoBlock(kintoBlock.id, ver, data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  KintoBlockManageForm
)