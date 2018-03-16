import { connect } from 'react-redux'
import { formValueSelector, change } from 'redux-form'
import {
  updateKintoBlock,
  refreshCommits
} from '../../../../actions/kintoBlocks'
import { TAG } from '../../../../constants/version'
import KintoBlockManageForm from '../../../../components/dashboard/kintoBlocks/kintoBlockManage/KintoBlockManageForm'

function mapStateToProps(state, { kintoBlock, isCreateTagErrorMessageShown }) {
  const formSelector = formValueSelector('kintoBlockManageForm')
  const dependencies = formSelector(state, 'dependencies')
  const services = formSelector(state, 'services')

  return {
    initialValues: {
      name: kintoBlock.name,
      shortDescription: kintoBlock.shortDescription,
      dependencies: kintoBlock.dependencies,
      environmentVariables: kintoBlock.environmentVariables,
      configParameters: kintoBlock.configParameters,
      isPublic: kintoBlock.isPublic,
      memberIds: kintoBlock.memberIds || [],
      services: kintoBlock.services || []
    },
    selectedServices: kintoBlock.services,
    services,
    kintoBlock,
    dependencies,
    isVersionTag: kintoBlock.version && kintoBlock.version.type === TAG,
    isCreateTagErrorMessageShown
  }
}

function mapDispatchToProps(dispatch, { kintoBlock }) {
  return {
    updateServicesField: newArray =>
      dispatch(change('kintoBlockManageForm', 'services', newArray)),
    refreshCommits: () => {
      dispatch(
        refreshCommits(
          kintoBlock.id,
          kintoBlock.version.name,
          kintoBlock.version.type
        )
      )
    },
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

function mergeProps(stateProps, dispatchProps) {
  let newArray = stateProps.services || []

  return {
    ...stateProps,
    ...dispatchProps,
    updateServicesField: service => {
      if (newArray.some(item => item === service)) {
        newArray = newArray.filter(newService => {
          return newService !== service
        })
      } else {
        newArray = [...stateProps.services, service]
      }
      dispatchProps.dispatch(
        change('kintoBlockManageForm', 'services', newArray)
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  KintoBlockManageForm
)
