import { connect } from 'react-redux'
import KintoAppEnvironmentEdit from '../../../components/dashboard/kintoApps/KintoAppEnvironmentEdit'
import {
  getKintoAppEnvironments,
  fetchKintoApps
} from '../../../actions/kintoApps'
import { environmentSelect, kintoAppSelect } from '../../../actions/pageOptions'

function mapStateToProps(state, { match }) {
  const { id, envId } = match.params

  const kintoApp = state.kintoApps.byId[id] || {}
  const environments = kintoApp.environments || []
  const environment = environments.find(e => e.id === envId) || {}

  return {
    id,
    envId,
    kintoApp,
    environment
  }
}

export default connect(mapStateToProps, {
  getKintoAppEnvironments,
  fetchKintoApps,
  kintoAppSelect,
  environmentSelect
})(KintoAppEnvironmentEdit)
