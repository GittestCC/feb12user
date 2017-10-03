import { connect } from 'react-redux'
import { updateKintoApp } from '../../../../actions/kintoApps'
import { getAppDependenciesFactory } from '../../../../selectors/kintoApps'
import KintoAppForm from '../../../../components/dashboard/kintoApps/KintoAppForm'

function mapStateToProps(state, { kintoApp, version }) {
  const getAppDependencies = getAppDependenciesFactory()
  kintoApp = kintoApp || {}
  return {
    initialValues: {
      name: kintoApp.name,
      appDependencies: kintoApp.appDependencies
    },
    version,
    appDependenciesInfo: getAppDependencies(state, kintoApp.id)
  }
}

export default connect(mapStateToProps, { onSubmit: updateKintoApp })(
  KintoAppForm
)
