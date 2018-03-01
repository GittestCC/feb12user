import { connect } from 'react-redux'
import {
  addNewEnvironment,
  updateAppEnvironment
} from '../../../actions/kintoApps'
import KintoAppEnvironmentForm from '../../../components/dashboard/kintoApps/KintoAppEnvironmentForm'

function mapStateToProps(state, { kintoApp, environment }) {
  kintoApp = kintoApp || {}
  environment = environment || {}
  return {
    initialValues: {
      envName: environment.name,
      autoUpdate: !!environment.autoUpdate
    },
    kintoApp,
    environment
  }
}

function mapDispatchToProps(dispatch, { isCreate, kintoApp, environment }) {
  return {
    onSubmit: data => {
      if (isCreate) {
        return dispatch(addNewEnvironment(kintoApp.id, data))
      } else {
        return dispatch(updateAppEnvironment(kintoApp.id, environment.id, data))
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  KintoAppEnvironmentForm
)
