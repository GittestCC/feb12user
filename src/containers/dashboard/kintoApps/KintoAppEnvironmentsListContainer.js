import { connect } from 'react-redux'
import {
  getKintoAppEnvironments,
  reorderEnvironments,
  addNewEnvironment,
  deployEnvironment,
  cancelDeployment,
  shutDownEnvironment
} from '../../../actions/kintoApps'
import KintoAppEnvironmentsList from '../../../components/dashboard/kintoApps/KintoAppEnvironmentsList'

function mapStateToProps(state, { match }) {
  const { id } = match.params
  const kintoApp = state.kintoApps.byId[id] || {}
  const environments = kintoApp.environments || []
  return {
    id,
    environments,
    kintoApp,
    selectedWorkspace: state.workspaces.selectedWorkspace
  }
}

function mapDispatchToProps(dispatch, { match }) {
  return {
    getKintoAppEnvironments: id => dispatch(getKintoAppEnvironments(id)),
    reorderEnvironments: (id, oldIndex, newIndex) =>
      dispatch(reorderEnvironments(id, oldIndex, newIndex)),
    addNewEnvironment: (id, data) => dispatch(addNewEnvironment(id, data)),
    deployEnvironment: (id, data, name) =>
      dispatch(deployEnvironment(id, data, name)),
    cancelDeployment: () => dispatch(cancelDeployment()),
    shutDownEnvironment: (id, data, envName) =>
      dispatch(shutDownEnvironment(id, data, envName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  KintoAppEnvironmentsList
)
