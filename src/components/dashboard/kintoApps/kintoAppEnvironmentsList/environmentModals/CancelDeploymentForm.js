import React from 'react'
import { reduxForm } from 'redux-form'

const CancelDeploymentForm = ({
  onClose,
  handleSubmit,
  cancelDeployment,
  kintoApp,
  environment
}) => {
  const cancelDeploy = result => {
    // cancelDeployment()
    onClose()
  }

  return (
    <div className="add-new-environment">
      <div className="kh-modal-title">Cancel Deployment</div>
      <div className="kh-modal-body">
        <form onSubmit={handleSubmit(cancelDeploy)}>
          <div className="full-width-field">
            <h4>
              You will have to restart the process if you change your mind
              later.
            </h4>
          </div>
          <div className="kh-modal-actions">
            <button onClick={onClose} className="button secondary">
              Cancel
            </button>
            <button type="submit" className="button dark">
              Cancel Deployment
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default reduxForm({ form: 'CancelDeploymentForm' })(CancelDeploymentForm)
