import { connect } from 'react-redux'
import { fetchKintoApps } from '../../../actions/kintoApps'
import { getAllKintoApps } from '../../../selectors/kintoApps'
import KintoAppsList from '../../../components/dashboard/kintoApps/KintoAppsList'
import { push } from 'react-router-redux'

function mapStateToProps(state) {
  return {
    kintoApps: getAllKintoApps(state)
  }
}

export default connect(mapStateToProps, {
  fetchKintoApps,
  push
})(KintoAppsList)
