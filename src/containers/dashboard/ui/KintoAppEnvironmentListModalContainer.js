import { connect } from 'react-redux'
import {
  addNewEnvironment,
  deployEnvironment,
  cancelDeployment
} from '../../../actions/kintoApps'
import KintoAppEnvironmentModal from '../../../components/dashboard/kintoApps/kintoAppEnvironmentsList/KintoAppEnvironmentModal'

function mapStateToProps(
  state,
  { isOpen, modalType, title, kintoApp, environment }
) {
  return {
    isOpen,
    modalType,
    kintoApp
  }
}

function mapDispatchToProps(dispatch, { kintoApp }) {
  return {
    addNewEnvironment: (id, data) => dispatch(addNewEnvironment(id, data)),
    deployEnvironment: (id, data, name) =>
      dispatch(deployEnvironment(id, data, name)),
    cancelDeployment: () => dispatch(cancelDeployment())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  KintoAppEnvironmentModal
)
