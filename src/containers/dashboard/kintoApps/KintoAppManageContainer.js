import { connect } from 'react-redux'
import { reset } from 'redux-form'
import { fetchKintoApp, fetchKintoApps } from '../../../actions/kintoApps'
import { getAllKintoApps } from '../../../selectors/kintoApps'
import { push } from 'react-router-redux'
import KintoAppManage from '../../../components/dashboard/kintoApps/KintoAppManage'
import {
  findInArrayByText,
  asTextList,
  getVersionSelectItem,
  isVersionEqual
} from '../../../helpers/versionHelper'
import { getBreadcrumbSelectItem } from '../../../helpers/breadcrumbHelper'

function mapStateToProps(state, { match }) {
  const { id, ver } = match.params
  const kintoApp = state.kintoApps.byId[id] || {}
  const kintoApps = getAllKintoApps(state)
  const app = 'app'
  let versionSelectItems = []
  let breadcrumbSelectItems = []

  if (kintoApps.length) {
    breadcrumbSelectItems = kintoApps.map(k =>
      getBreadcrumbSelectItem(k, id, app)
    )
  }

  if (kintoApp.versions) {
    versionSelectItems = kintoApp.versions.map(v => {
      let result = getVersionSelectItem(v, id, true)
      if (isVersionEqual(v, ver)) {
        result.active = true
      }
      return result
    })
  }

  return {
    id,
    ver,
    kintoApp,
    version: findInArrayByText(kintoApp.versions, ver),
    baseVersions: asTextList(kintoApp.versions),
    versionSelectItems,
    breadcrumbSelectItems,
    kintoApps
  }
}

function mapDispatchToProps(dispatch, { match }) {
  return {
    fetchKintoApp: (id, ver) => dispatch(fetchKintoApp(id, ver)),
    fetchKintoApps: () => dispatch(fetchKintoApps()),
    goToCreatePage: () => dispatch(push('/app/dashboard/kintoapps/create')),
    resetForm: () => dispatch(reset('kintoAppForm'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KintoAppManage)
