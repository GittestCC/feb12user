import { connect } from 'react-redux'
import moment from 'moment'
import { formValueSelector } from 'redux-form'
import { updateKintoBlock } from '../../../../actions/kintoBlocks'
import { TAG } from '../../../../constants/version'
import KintoBlockManageForm from '../../../../components/dashboard/kintoBlocks/kintoBlockManage/KintoBlockManageForm'

function mapStateToProps(state, { kintoBlock, isCreateTagErrorMessageShown }) {
  const formSelector = formValueSelector('kintoBlockManageForm')
  const dependencies = formSelector(state, 'dependencies')
  kintoBlock = kintoBlock || {}

  const indexClass = index => {
    if (index === 0) {
      return 'first'
    }
    if (index === kintoBlock.builds.length - 1) {
      return 'last'
    }
  }

  const commitDate = date => {
    return moment(date).format('h:mmA, DD MMM YYYY')
  }

  const commitNo = number => number.substring(0, 6).toUpperCase()

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
    indexClass,
    commitDate,
    commitNo,
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
