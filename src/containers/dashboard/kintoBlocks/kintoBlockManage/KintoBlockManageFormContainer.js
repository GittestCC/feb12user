import { connect } from 'react-redux'
import moment from 'moment'
import { formValueSelector, change } from 'redux-form'
import { updateKintoBlock } from '../../../../actions/kintoBlocks'
import { TAG } from '../../../../constants/version'
import KintoBlockManageForm from '../../../../components/dashboard/kintoBlocks/kintoBlockManage/KintoBlockManageForm'

function mapStateToProps(state, { kintoBlock, isCreateTagErrorMessageShown }) {
  const formSelector = formValueSelector('kintoBlockManageForm')
  const dependencies = formSelector(state, 'dependencies')
  const services = formSelector(state, 'services')

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
      memberIds: kintoBlock.memberIds || [],
      services: kintoBlock.services || []
    },
    selectedServices: kintoBlock.services,
    services,
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
    updateServicesField: newArray =>
      dispatch(change('kintoBlockManageForm', 'services', newArray)),
    dispatch,
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
