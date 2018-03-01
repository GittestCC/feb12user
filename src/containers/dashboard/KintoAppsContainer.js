import { connect } from 'react-redux'
import { fetchKintoApps } from '../../actions/kintoApps'
import KintoApps from '../../components/dashboard/KintoApps'

function mapStateToProps(state, { match }) {
  return {
    match
  }
}

export default connect(mapStateToProps, { fetchKintoApps })(KintoApps)
