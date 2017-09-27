import { connect } from 'react-redux'
import { kintoAppCreate } from '../../../../actions/kintoApps'
import KintoAppForm from '../../../../components/dashboard/kintoApps/KintoAppForm'

export default connect(undefined, { onSubmit: kintoAppCreate })(KintoAppForm)
