import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import DropDown from '../ui/DropDown'
import TagItem from '../dashboard/ui/TagItem'

const KintoSwitcher = ({
  disabled,
  selectedItemName,
  selectedItemUrl,
  dropdownItems,
  actionHandler
}) => (
  <div className="list-container">
    {selectedItemUrl && !disabled ? (
      <Link to={selectedItemUrl}>{selectedItemName}</Link>
    ) : (
      <div className="disabled text-disabled">{selectedItemName}</div>
    )}
    <DropDown
      type="filter"
      dropdownClass="breadcrumb-icon"
      id="application-dropdown"
      list={dropdownItems}
      component={TagItem}
      filterField="text"
      actionText="Create New Application"
      actionHandler={actionHandler}
      dropdownContentClass="short"
      className="margin-right"
    />
  </div>
)

KintoSwitcher.propTypes = {
  disabled: PropTypes.bool,
  selectedItemName: PropTypes.string,
  selectedItemUrl: PropTypes.string,
  createUrl: PropTypes.string.isRequired,
  dropdownItems: PropTypes.array.isRequired
}

export default KintoSwitcher
