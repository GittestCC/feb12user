import { connect } from 'react-redux'
import { kintoAppCreate } from '../../../../actions/kintoApps'
import KintoAppForm from '../../../../components/dashboard/kintoApps/KintoAppForm'

function mapStateToProps(state) {
  return {
    version: '0.1.0'
  }
}
export default connect(mapStateToProps, { onSubmit: kintoAppCreate })(
  KintoAppForm
)
