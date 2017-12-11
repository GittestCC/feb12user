import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
import { getVersionAsText, textToObject } from '../../../helpers/versionHelper'
import TagAndDeployForm from '../../../components/dashboard/ui/TagAndDeployForm'
import { deployEnvironment } from '../../../actions/kintoApps'

const selector = formValueSelector('versionCreate')

function mapStateToProps(state, { kintoApp, isTagged }) {
  kintoApp = kintoApp || {}
  const versionText = getVersionAsText(selector(state, 'version'))
  let submitLabel = isTagged ? 'Redeploy' : 'Create'
  let version = textToObject('0.0.0')
  if (versionText) {
    submitLabel += ` ${versionText}`
  }

  if (isTagged) {
    version = textToObject(getVersionAsText(kintoApp.version))
  }

  return {
    kintoApp,
    submitLabel,
    initialValues: {
      environment: kintoApp.environments[0].name,
      version: version
    }
  }
}

function mapDispatchToProps(
  dispatch,
  { onClose, match, id, disableCloseOnSubmit }
) {
  return {
    onSubmit: formValues => {
      const envName = formValues.environment
      const data = {
        notes: formValues.notes,
        version: formValues.version,
        createNewVersion: true
      }

      return dispatch(deployEnvironment(id, data, envName)).then(() => {
        if (!disableCloseOnSubmit) onClose()
        return
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagAndDeployForm)
