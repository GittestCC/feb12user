import React from 'react'

const Toggle = ({ checkedClass, name, id, toggle, value, text }) => (
  <label className="switch">
    <input
      type="checkbox"
      // className={ checkedClass }
      name={name}
      id={id}
      // onChange={toggle}
      // value={value}
    />
    <span className="slider" />
    <label className="toggle-message" htmlFor={id}>
      <h6>{text}</h6>
    </label>
  </label>
)

export default Toggle
