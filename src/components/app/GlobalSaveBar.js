import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '../forms'

const GlobalSaveBar = ({ isShown, submitLabel, onSubmit }) => (
  <div
    className={`global-save-bar ${isShown ? 'show' : ''}`}
    data-test="savebar"
  >
    <Button onClick={onSubmit}>{submitLabel}</Button>
    <div id="savebar-portal" />
  </div>
)

GlobalSaveBar.propTypes = {
  isShown: PropTypes.bool,
  submitLable: PropTypes.string,
  onSubmit: PropTypes.func.isRequired
}

export default GlobalSaveBar
