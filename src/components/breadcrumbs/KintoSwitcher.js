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
  actionHandler,
  isKintoApp
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
      actionText={
        isKintoApp ? 'Create New Application' : 'Create New KintoBlock'
      }
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
  dropdownItems: PropTypes.array.isRequired,
  actionHandler: PropTypes.func.isRequired,
  isKintoApp: PropTypes.bool.isRequired
}

export default KintoSwitcher
