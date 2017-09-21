import { connect } from 'react-redux'
import { kintoAppCreate } from '../../../../actions/kintoApps'
import KintoAppCreateForm from '../../../../components/dashboard/kintoApps/kintoAppCreate/KintoAppCreateForm'

export default connect(undefined, { onSubmit: kintoAppCreate })(
  KintoAppCreateForm
)
