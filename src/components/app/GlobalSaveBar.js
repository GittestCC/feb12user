import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '../forms'

const GlobalSaveBar = ({
  canSave,
  toggleSaveButton,
  submitLabel,
  onSubmit,
  hasForm
}) => (
  <div
    className={`global-save-bar ${hasForm ? 'show' : ''} ${
      !canSave ? 'e2e-disabled' : ''
    }`}
    data-test="savebar"
  >
    <div className="dashboard-inner">
      <div className="dashboard-content">
        {toggleSaveButton && !canSave ? null : (
          <Button disabled={!canSave} onClick={onSubmit}>
            {submitLabel}
          </Button>
        )}
        <div id="savebar-portal" />
      </div>
    </div>
  </div>
)

GlobalSaveBar.propTypes = {
  canSave: PropTypes.bool,
  toggleSaveButton: PropTypes.bool,
  hasForm: PropTypes.bool.isRequired,
  submitLable: PropTypes.string,
  onSubmit: PropTypes.func.isRequired
}

export default GlobalSaveBar
