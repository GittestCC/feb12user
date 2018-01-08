import React from 'react'
import { reduxForm } from 'redux-form'
import { getVersionAsText } from '../../../../../helpers/versionHelper'

const ShutDown = ({
  onClose,
  handleSubmit,
  shutDownEnvironment,
  kintoApp,
  environment
}) => {
  const environmentShutDown = () => {
    shutDownEnvironment(environment.id, environment.name, environment)
    onClose()
  }

  const currentRelease = environment.releases[environment.releases.length - 1]

  return (
    <div className="add-new-environment">
      <div className="kh-modal-title">
        <h4>
          Shut Down - {environment.name} -{' '}
          {getVersionAsText(currentRelease.version)}
        </h4>
      </div>
      <div className="kh-modal-body">
        <form onSubmit={handleSubmit(environmentShutDown)}>
          <div className="full-width-field">
            <h4>
              The currently deployed application will be stopped, leaving this
              environment empty. You can deploy another tag directly without
              shutting down the current one and disrupting your users.
            </h4>
          </div>
          <div className="kh-modal-actions">
            <button onClick={onClose} className="button secondary">
              Cancel
            </button>
            <button type="submit" className="button dark">
              Shut Down Anyway
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default reduxForm({ form: 'ShutDown' })(ShutDown)
