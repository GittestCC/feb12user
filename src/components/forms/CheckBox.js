import React from 'react'

const CheckBox = ({ input, id, label }) => (
  <div className="checked-field-wrapper">
    <input
      {...input}
      className={`checkbox ${input.value ? 'checked' : ''}`}
      type="checkbox"
      id={id || input.name}
    />
    <label className="checkbox-message" htmlFor={id || input.name}>
      <h6>{label}</h6>
    </label>
  </div>
)

export default CheckBox
