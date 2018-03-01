import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import DropDown from '../ui/DropDown'
import KintoAppTagItem from '../dashboard/ui/KintoAppTagItem'

class KintoAppTagSelector extends Component {
  static propTypes = {
    selectedApp: PropTypes.object,
    disabled: PropTypes.bool,
    dropdownItems: PropTypes.array.isRequired,
    selectedTag: PropTypes.string,
    selectedVersionUrl: PropTypes.string
  }

  render() {
    const {
      isDraft,
      disabled,
      dropdownItems,
      selectedTag,
      selectedVersionUrl
    } = this.props

    return (
      <div className="list-container">
        <div className={`kintoapp-tag-breadcrumb ${isDraft ? 'draft' : ''}`}>
          {selectedVersionUrl && !disabled ? (
            <div>
              {isDraft && <div className="draft-icon" />}
              <Link className="breadcrumb-text" to={selectedVersionUrl}>
                {selectedTag}
              </Link>
            </div>
          ) : (
            <div>
              {isDraft && <div className="draft-icon" />}
              <div className="breadcrumb-text disabled text-disabled">
                {selectedTag}
              </div>
            </div>
          )}
        </div>
        <DropDown
          type="filter"
          dropdownClass="breadcrumb-icon"
          id="tagDropdown"
          list={dropdownItems}
          component={KintoAppTagItem}
          filterField="text"
          hideAction={true}
          className="margin-right ka-version-switcher"
        />
      </div>
    )
  }
}

export default KintoAppTagSelector
