import { connect } from 'react-redux'
import { updateKintoApp } from '../../../../actions/kintoApps'
import KintoAppForm from '../../../../components/dashboard/kintoApps/KintoAppForm'

function mapStateToProps(state, { kintoApp, version }) {
  return {
    initialValues: kintoApp,
    version
  }
}

export default connect(mapStateToProps, { onSubmit: updateKintoApp })(
  KintoAppForm
)
