import React from 'react'
import Tooltip from 'rc-tooltip'

const Toggle = ({ input, id, label, help }) => (
  <label className="switch">
    <input {...input} type="checkbox" id={id || input.name} />
    <span className="toggle-slider" />
    <h6 className="toggle-message">
      {label}
      {help && (
        <Tooltip placement="top" overlay={help} trigger="click">
          <span className="tooltip" />
        </Tooltip>
      )}
    </h6>
  </label>
)

export default Toggle
