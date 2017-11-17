import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import qs from 'query-string'

import {
  fetchKintoApps,
  fetchKintoApp,
  fetchKintoAppDependenciesConfig
} from '../../../actions/kintoApps'
import { environmentSelect } from '../../../actions/pageOptions'
import { getKintoAppDependencies } from '../../../selectors/kintoApps'
import KintoAppDependenciesConfig from '../../../components/dashboard/kintoApps/KintoAppDependenciesConfig'

function mapStateToProps(state, { match, location }) {
  const query = qs.parse(location.search)

  const { id, ver, env } = match.params
  const dependencies = getKintoAppDependencies(state, match.params)
  return {
    dependencies,
    id,
    ver,
    env,
    filteredDependency: query.dependency
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchKintoApp: (id, ver) => dispatch(fetchKintoApp(id, ver)),
    fetchKintoApps: () => dispatch(fetchKintoApps()),
    fetchKintoAppDependenciesConfig: (id, ver, env) =>
      dispatch(fetchKintoAppDependenciesConfig(id, ver, env)),
    goToCreatePage: () => dispatch(push('/app/dashboard/kintoapps/create')),
    environmentSelect: id => dispatch(environmentSelect(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  KintoAppDependenciesConfig
)
