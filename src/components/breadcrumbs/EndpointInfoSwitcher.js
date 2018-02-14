import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

import DropDown from '../ui/DropDown'

const EndpointInfoSwitcher = ({ text, endpointUrl, infoUrl }) => (
  <div className="list-container">
    <div className="disabled text-disabled">{text}</div>
    <DropDown
      type="simple"
      dropdownClass="breadcrumb-icon"
      id="endpointInfoSwitcher"
    >
      <NavLink activeClassName="active" className="tag-item" to={infoUrl}>
        Info
      </NavLink>
      <NavLink activeClassName="active" className="tag-item" to={endpointUrl}>
        Endpoints
      </NavLink>
    </DropDown>
  </div>
)

EndpointInfoSwitcher.propTypes = {
  text: PropTypes.string,
  endpointUrl: PropTypes.string,
  infoUrl: PropTypes.string
}

export default EndpointInfoSwitcher
