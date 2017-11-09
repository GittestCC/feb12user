import { connect } from 'react-redux'
import { reset } from 'redux-form'
import { fetchKintoApp, fetchKintoApps } from '../../../actions/kintoApps'
import { findInArrayByText, asTextList } from '../../../helpers/versionHelper'
import KintoAppManage from '../../../components/dashboard/kintoApps/KintoAppManage'

function mapStateToProps(state, { match }) {
  const { id, ver } = match.params
  const kintoApp = state.kintoApps.byId[id] || {}

  return {
    id,
    ver,
    kintoApp,
    version: findInArrayByText(kintoApp.versions, ver),
    baseVersions: asTextList(kintoApp.versions)
  }
}

function mapDispatchToProps(dispatch, { match }) {
  return {
    fetchKintoApp: (id, ver) => dispatch(fetchKintoApp(id, ver)),
    fetchKintoApps: () => dispatch(fetchKintoApps()),
    resetForm: () => dispatch(reset('kintoAppForm'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KintoAppManage)
