import { connect } from 'react-redux'
import { formValueSelector, change, untouch } from 'redux-form'
import { createKintoBlock } from '../../../../actions/kintoBlocks'
import KintoBlockCreateForm from '../../../../components/dashboard/kintoBlocks/kintoBlockCreate/KintoBlockCreateForm'

const formName = 'kintoBlockCreateForm'
const selector = formValueSelector(formName)

function mapStateToProps(state) {
  return {
    isDedicatedCPU: selector(state, 'hardwareData.dedicatedCpu'),
    initialValues: {
      isPublic: true
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: data => dispatch(createKintoBlock(data)),
    resetCPUHandler: () => {
      dispatch(change('kintoBlockCreateForm', 'hardwareData.minCpu', null))
      dispatch(change('kintoBlockCreateForm', 'hardwareData.maxCpu', null))
      dispatch(
        untouch(
          'kintoBlockCreateForm',
          'hardwareData.minCpu',
          'hardwareData.maxCpu'
        )
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  KintoBlockCreateForm
)
