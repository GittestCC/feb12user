import { connect } from 'react-redux'
import KintoAppLogs from '../../../components/dashboard/kintoApps/KintoAppLogs'
import {
  fetchKintoApps,
  getKintoAppEnvironments,
  getEnvironmentLogs
} from '../../../actions/kintoApps'
import {
  kintoAppSelect,
  environmentSelect,
  releaseVersionSelect
} from '../../../actions/pageOptions'

function mapStateToProps(state, { match }) {
  let { id, envId, releaseVersion } = match.params
  const kintoApp = state.kintoApps.byId[id] || {}
  const environments = kintoApp.environments || []
  const environment = environments.find(e => e.id === envId) || {}
  const selectedLog = kintoApp.selectedLog || {}
  const logs = selectedLog.envId === envId ? selectedLog.logs : null

  return {
    id,
    envId,
    releaseVersion,
    environment,
    logs
  }
}

export default connect(mapStateToProps, {
  fetchKintoApps,
  getKintoAppEnvironments,
  getEnvironmentLogs,
  kintoAppSelect,
  environmentSelect,
  releaseVersionSelect
})(KintoAppLogs)
