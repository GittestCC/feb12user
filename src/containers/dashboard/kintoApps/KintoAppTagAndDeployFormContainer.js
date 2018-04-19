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
      environment: kintoApp.environments[0].id,
      version: kintoApp.version
    }
  }
}

function mapDispatchToProps(dispatch, { kintoApp, id }) {
  return {
    onSubmit: formValues => {
      const envId = formValues.environment
      const data = {
        notes: formValues.notes,
        version: { name: getVersionAsText(formValues.version) },
        createNewVersion: true
      }
      return dispatch(deployEnvironment(id, envId, data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  KintoAppTagAndDeployForm
)
