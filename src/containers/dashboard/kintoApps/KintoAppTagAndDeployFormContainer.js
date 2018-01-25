import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
import { pages } from '../../../constants/pages'
import { getPageUrl } from '../../../helpers/urlHelper'
import { getVersionAsText } from '../../../helpers/versionHelper'
import KintoAppTagAndDeployForm from '../../../components/dashboard/kintoApps/KintoAppTagAndDeployForm'
import { deployEnvironment } from '../../../actions/kintoApps'

const selector = formValueSelector('versionCreate')

function mapStateToProps(state, { kintoApp, isDraft }) {
  const versionText = getVersionAsText(selector(state, 'version'))
  const { selectedWorkspace } = state.workspaces

  const listEnvironmentsUrl = getPageUrl(pages.dashboardKintoAppsEnvironments, {
    id: kintoApp.id,
    workspaceId: selectedWorkspace
  })

  let submitLabel = isDraft ? 'Create' : 'Tag and Deploy'

  if (versionText) {
    submitLabel += ` ${versionText}`
  }

  return {
    kintoApp,
    submitLabel,
    listEnvironmentsUrl,
    initialValues: {
      environment: kintoApp.environments[0].name,
      version: kintoApp.version
    }
  }
}

function mapDispatchToProps(dispatch, { kintoApp, onClose, id }) {
  return {
    onSubmit: formValues => {
      const envName = formValues.environment
      const data = {
        notes: formValues.notes,
        version: formValues.version,
        createNewVersion: true
      }

      return dispatch(deployEnvironment(id, envName, data)).then(onClose)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  KintoAppTagAndDeployForm
)
