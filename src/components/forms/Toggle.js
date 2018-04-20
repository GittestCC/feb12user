import React from 'react'
import PropTypes from 'prop-types'
import Tooltip from 'rc-tooltip'

// TODO: checked prop is because of a bug in redux-form
// https://github.com/erikras/redux-form/issues/1372
const Toggle = ({ input, id, label, help, disabled }) => (
  <div className="toggle-content">
    <label className="switch" data-test={id || input.name}>
      <input
        {...input}
        type="checkbox"
        id={id || input.name}
        disabled={disabled}
        checked={input.value === true || input.value === 'true'}
      />
      <span className="toggle-slider" />
    </label>
    <h6 className="toggle-message">
      {label}
      {help && (
        <Tooltip placement="top" overlay={help} trigger="click">
          <span className="tooltip" />
        </Tooltip>
      )}
    </h6>
  </div>
)
Toggle.propTypes = {
  input: PropTypes.object.isRequired,
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  help: PropTypes.string,
  disabled: PropTypes.bool
}

export default Toggle
