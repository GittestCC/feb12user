import { connect } from 'react-redux'
import { reset } from 'redux-form'
import {
  fetchKintoApp,
  fetchKintoApps,
  getKintoAppEnvironments
} from '../../../actions/kintoApps'
import { findInArrayByText, asTextList } from '../../../helpers/versionHelper'
import KintoAppManage from '../../../components/dashboard/kintoApps/KintoAppManage'

function mapStateToProps(state, { match }) {
  const { id, ver } = match.params
  const kintoApp = state.kintoApps.byId[id] || {}
  const { canSave } = state.pageOptions
  let isTagged = false

  if (ver !== '0.0.0') {
    isTagged = true
  }

  return {
    id,
    ver,
    kintoApp,
    canSave,
    isTagged,
    version: findInArrayByText(kintoApp.versions, ver),
    baseVersions: asTextList(kintoApp.versions)
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
