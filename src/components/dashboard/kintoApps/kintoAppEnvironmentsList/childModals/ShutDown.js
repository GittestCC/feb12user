import React from 'react'
import { reduxForm } from 'redux-form'

const ShutDown = ({ onClose, handleSubmit, shutDownEnvironment, kintoApp }) => {
  const EnvironmentShutDown = result => {
    // shutDownEnvironment()
    onClose()
  }

  return (
    <div className="add-new-environment">
      <div className="kh-modal-title">Shut Down - </div>
      <div className="kh-modal-body">
        <form onSubmit={handleSubmit(EnvironmentShutDown)}>
          <div className="full-width-field">
            <h4>
              You can deploy another build without shutting down the current
              build and affecting your users.
            </h4>
          </div>
          <div className="kh-modal-actions">
            <button onClick={onClose} className="button secondary">
              Cancel
            </button>
            <button type="submit" className="button dark">
              Shut Down Environment
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default reduxForm({ form: 'ShutDown' })(ShutDown)
