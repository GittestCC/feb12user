import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
import { pages } from '../../../constants/pages'
import { getPageUrl } from '../../../helpers/urlHelper'
import { getVersionAsText, textToObject } from '../../../helpers/versionHelper'
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

  const lastVersion = kintoApp.versions[kintoApp.versions.length - 1].name
  const editedVersion = textToObject(lastVersion)
  if (editedVersion) {
    editedVersion.revision += 1
  }

  return {
    kintoApp,
    submitLabel,
    listEnvironmentsUrl,
    initialValues: {
      environment: kintoApp.environments[0].id,
      version: editedVersion
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
