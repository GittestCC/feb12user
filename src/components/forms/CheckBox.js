import React from 'react'

const CheckBox = ({ checkedClass, name, id, toggle, value, text }) => (
  <div>
    <input
      className={checkedClass}
      type="checkbox"
      name={name}
      id={id}
      onChange={toggle}
      value={value}
    />
    <label className="checkbox-message" htmlFor={id}>
      <h6>{text}</h6>
    </label>
  </div>
)

export default CheckBox
