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
    className={`global-save-bar ${hasForm ? 'show' : ''}`}
    data-test="savebar"
  >
    {toggleSaveButton && !canSave ? null : (
      <Button disabled={!canSave} onClick={onSubmit}>
        {submitLabel}
      </Button>
    )}

    <div id="savebar-portal" />
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
