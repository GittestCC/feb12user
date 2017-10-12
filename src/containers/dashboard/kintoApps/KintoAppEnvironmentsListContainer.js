import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import {
  fetchKintoApps,
  getKintoAppEnvironments
} from '../../../actions/kintoApps'
import { getAllKintoApps } from '../../../selectors/kintoApps'
import { findInArrayByText } from '../../../helpers/versionHelper'
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

  kintoApps.length
    ? (breadcrumbSelectItems = kintoApps.map(k =>
        getBreadcrumbSelectItem(k, id, env)
      ))
    : null

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
    goToCreatePage: () => dispatch(push('/app/dashboard/kintoapps/create'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  KintoAppEnvironmentsList
)
