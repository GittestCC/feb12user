import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
import { getVersionAsText } from '../../../helpers/versionHelper'
import TagAndDeployForm from '../../../components/dashboard/ui/TagAndDeployForm'
import { deployEnvironment } from '../../../actions/kintoApps'

const selector = formValueSelector('versionCreate')

function mapStateToProps(state, { kintoApp, isDraft }) {
  kintoApp = kintoApp || {}
  const versionText = getVersionAsText(selector(state, 'version'))
  let submitLabel = isDraft ? 'Create' : 'Redeploy'
  if (versionText) {
    submitLabel += ` ${versionText}`
  }

  return {
    kintoApp,
    submitLabel,
    initialValues: {
      environment: kintoApp.environments[0].name,
      version: kintoApp.version
    }
  }
}

function mapDispatchToProps(dispatch, { onClose, id }) {
  return {
    onSubmit: formValues => {
      const envName = formValues.environment
      const data = {
        notes: formValues.notes,
        version: formValues.version,
        createNewVersion: true
      }

      return dispatch(deployEnvironment(id, data, envName)).then(onClose)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagAndDeployForm)
