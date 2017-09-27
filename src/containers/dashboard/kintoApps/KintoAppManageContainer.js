import { connect } from 'react-redux'
import { fetchKintoApp } from '../../../actions/kintoApps'
import KintoAppManage from '../../../components/dashboard/kintoApps/KintoAppManage'
import {
  findInArrayByText,
  asTextList,
  getVersionSelectItem,
  isVersionEqual
} from '../../../helpers/versionHelper'

function mapStateToProps(state, { match }) {
  const { id, ver } = match.params
  const kintoApp = state.kintoApps.byId[id] || {}
  let versionSelectItems = []
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
    ver,
    kintoApp,
    version: findInArrayByText(kintoApp.versions, ver),
    baseVersions: asTextList(kintoApp.versions),
    versionSelectItems
  }
}

function mapDispatchToProps(dispatch, { match }) {
  return {
    fetchKintoApp: ver => dispatch(fetchKintoApp(match.params.id, ver))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KintoAppManage)
