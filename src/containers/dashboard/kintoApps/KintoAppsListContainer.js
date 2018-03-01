import { connect } from 'react-redux'
import { getAllKintoApps } from '../../../selectors/kintoApps'
import KintoAppsList from '../../../components/dashboard/kintoApps/KintoAppsList'

function mapStateToProps(state) {
  return {
    kintoApps: getAllKintoApps(state)
  }
}

export default connect(mapStateToProps)(KintoAppsList)
