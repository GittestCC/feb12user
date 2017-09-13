import { connect } from 'react-redux'
import { formValueSelector, change, untouch } from 'redux-form'
import { kintoBlockCreate } from '../../../../actions/kintoBlocks'
import KintoBlockCreateForm from '../../../../components/dashboard/kintoBlocks/kintoBlockCreate/KintoBlockCreateForm'

const formName = 'kintoBlockCreateForm'
const selector = formValueSelector(formName)
function mapStateToProps(state) {
  return {
    isDedicatedCPU: selector(state, 'toggleCPU')
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: data => dispatch(kintoBlockCreate(data)),
    resetCPUHandler: () => {
      dispatch(change('kintoBlockCreateForm', 'cpuLimits', null))
      dispatch(change('kintoBlockCreateForm', 'cpuRequests', null))
      dispatch(untouch('kintoBlockCreateForm', 'cpuLimits', 'cpuRequests'))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  KintoBlockCreateForm
)
