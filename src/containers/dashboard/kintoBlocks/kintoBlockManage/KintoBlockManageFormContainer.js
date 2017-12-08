import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
import { updateKintoBlock } from '../../../../actions/kintoBlocks'
import { TAG } from '../../../../constants/version'
import KintoBlockManageForm from '../../../../components/dashboard/kintoBlocks/kintoBlockManage/KintoBlockManageForm'

function mapStateToProps(state, { kintoBlock, isCreateTagErrorMessageShown }) {
  const formSelector = formValueSelector('kintoBlockManageForm')
  const dependencies = formSelector(state, 'dependencies')
  kintoBlock = kintoBlock || {}

  return {
    initialValues: {
      name: kintoBlock.name,
      shortDescription: kintoBlock.shortDescription,
      dependencies: kintoBlock.dependencies,
      environmentVariables: kintoBlock.environmentVariables,
      configParameters: kintoBlock.configParameters,
      isPublic: kintoBlock.isPublic,
      members: kintoBlock.members
    },
    kintoBlock,
    dependencies,
    isVersionTag: kintoBlock.version && kintoBlock.version.type === TAG,
    isCreateTagErrorMessageShown
  }
}

function mapDispatchToProps(dispatch, { kintoBlock }) {
  return {
    onSubmit: data =>
      dispatch(
        updateKintoBlock(
          kintoBlock.id,
          kintoBlock.version.name,
          kintoBlock.version.type,
          data
        )
      )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  KintoBlockManageForm
)
