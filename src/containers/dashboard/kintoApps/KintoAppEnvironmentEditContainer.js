import { connect } from 'react-redux'
import KintoAppEnvironmentEdit from '../../../components/dashboard/kintoApps/KintoAppEnvironmentEdit'
import { push } from 'react-router-redux'
import {
  getKintoAppEnvironments,
  fetchKintoApps
} from '../../../actions/kintoApps'
import {
  getBreadcrumbSelectItem,
  getEnvironmentSelectItem
} from '../../../helpers/breadcrumbHelper'
import { getAllKintoApps } from '../../../selectors/kintoApps'

function mapStateToProps(state, { match }) {
  const { id, envId } = match.params
  const kintoApp = state.kintoApps.byId[id] || {}
  const kintoApps = getAllKintoApps(state)
  const environments = state.kintoApps.byId[id]
    ? state.kintoApps.byId[id].environments
    : []
  let environment = {}
  let kintoAppBreadCrumbSelectItems = []
  let environmentBreadCrumbSelectItems = []

  kintoAppBreadCrumbSelectItems = kintoApps.length
    ? (kintoAppBreadCrumbSelectItems = kintoApps.map(k =>
        getBreadcrumbSelectItem(k, id, true)
      ))
    : []

  environmentBreadCrumbSelectItems = environments.length
    ? (environmentBreadCrumbSelectItems = environments.map(k =>
        getEnvironmentSelectItem(k, id, envId)
      ))
    : []

  environment = environments.find(e => e.id === envId)

  return {
    id,
    envId,
    kintoApps,
    kintoApp,
    environment: environment || {},
    environments: environments || [],
    kintoAppBreadCrumbSelectItems,
    environmentBreadCrumbSelectItems
  }
}

function mapDispatchToProps(dispatch, { match }) {
  return {
    goToCreateEnvironmentPage: () => dispatch(push('/')),
    goToCreatePage: () => dispatch(push('/app/dashboard/kintoapps/create')),
    getKintoAppEnvironments: id => dispatch(getKintoAppEnvironments(id)),
    fetchKintoApps: () => dispatch(fetchKintoApps())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  KintoAppEnvironmentEdit
)
