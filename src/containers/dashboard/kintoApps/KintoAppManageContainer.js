import { connect } from 'react-redux'
import { reset } from 'redux-form'
import {
  fetchKintoApp,
  fetchKintoApps,
  getKintoAppEnvironments
} from '../../../actions/kintoApps'
import { isVersionEqual } from '../../../helpers/versionHelper'
import KintoAppManage from '../../../components/dashboard/kintoApps/KintoAppManage'

function mapStateToProps(state, { match }) {
  let { id, ver } = match.params
  const kintoApp = state.kintoApps.byId[id] || {}
  const { canSave } = state.pageOptions
  if (ver === 'draft') {
    ver = '0.0.0'
  }
  return {
    id,
    ver,
    kintoApp,
    canSave,
    version: kintoApp.version,
    isDraft: isVersionEqual(kintoApp.version, '0.0.0'),
    isVersionMatch: isVersionEqual(kintoApp.version, ver)
  }
}

function mapDispatchToProps(dispatch, { match }) {
  return {
    fetchKintoApp: (id, ver) => dispatch(fetchKintoApp(id, ver)),
    fetchKintoApps: () => dispatch(fetchKintoApps()),
    getKintoAppEnvironments: id => dispatch(getKintoAppEnvironments(id)),
    resetForm: () => dispatch(reset('kintoAppForm'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KintoAppManage)
