import { connect } from 'react-redux'
import { formValueSelector, SubmissionError } from 'redux-form'
import {
  getVersionAsText,
  isVersionEqual
} from '../../../helpers/versionHelper'
import KintoAppTagAndDeployForm from '../../../components/dashboard/kintoApps/KintoAppTagAndDeployForm'
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

function mapDispatchToProps(dispatch, { kintoApp, onClose, id }) {
  return {
    onSubmit: formValues => {
      if (kintoApp.versions.some(v => isVersionEqual(v, formValues.version))) {
        throw new SubmissionError({
          _error: 'Tag with the same version is already created'
        })
      }
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

export default connect(mapStateToProps, mapDispatchToProps)(
  KintoAppTagAndDeployForm
)
