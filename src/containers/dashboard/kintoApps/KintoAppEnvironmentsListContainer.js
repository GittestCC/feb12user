import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import {
  fetchKintoApps,
  getKintoAppEnvironments,
  reorderEnvironments,
  addNewEnvironment,
  deployEnvironment,
  cancelDeployment
} from '../../../actions/kintoApps'
import { getAllKintoApps } from '../../../selectors/kintoApps'
import KintoAppEnvironmentsList from '../../../components/dashboard/kintoApps/KintoAppEnvironmentsList'
import { getBreadcrumbSelectItem } from '../../../helpers/breadcrumbHelper'

function mapStateToProps(state, { match }) {
  const { id } = match.params
  const kintoApp = state.kintoApps.byId[id] || {}
  const kintoApps = getAllKintoApps(state)
  const env = 'env'
  const environments = state.kintoApps.byId[id]
    ? state.kintoApps.byId[id].environments
    : []
  let breadcrumbSelectItems = []

  breadcrumbSelectItems = kintoApps.length
    ? (breadcrumbSelectItems = kintoApps.map(k =>
        getBreadcrumbSelectItem(k, id, env)
      ))
    : []

  return {
    id,
    kintoApps,
    environments: environments || [],
    kintoApp,
    breadcrumbSelectItems
  }
}

function mapDispatchToProps(dispatch, { match }) {
  return {
    fetchKintoApps: () => dispatch(fetchKintoApps()),
    getKintoAppEnvironments: id => dispatch(getKintoAppEnvironments(id)),
    goToCreatePage: () => dispatch(push('/app/dashboard/kintoapps/create')),
    reorderEnvironments: (id, oldIndex, newIndex) =>
      dispatch(reorderEnvironments(id, oldIndex, newIndex)),
    addNewEnvironment: (id, data) => dispatch(addNewEnvironment(id, data)),
    deployEnvironment: (id, data, name) =>
      dispatch(deployEnvironment(id, data, name)),
    cancelDeployment: () => dispatch(cancelDeployment())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  KintoAppEnvironmentsList
)
