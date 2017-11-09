import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import DropDown from '../ui/DropDown'
import TagItem from '../dashboard/ui/TagItem'
import VersionCreateModalContainer from '../../containers/dashboard/ui/VersionCreateModalContainer'

class KintoAppVersionSwitcher extends Component {
  static propTypes = {
    selectedItem: PropTypes.object,
    baseVersions: PropTypes.array.isRequired,
    disabled: PropTypes.bool,
    dropdownItems: PropTypes.array.isRequired,
    selectedVersion: PropTypes.string,
    selectedVersionUrl: PropTypes.string,
    isKintoBlock: PropTypes.bool.isRequired
  }

  state = {
    isVersionModalOpen: false
  }

  onVersionModalClose = () => {
    this.setState({ isVersionModalOpen: false })
  }

  onVersionModalOpen = () => {
    this.setState({ isVersionModalOpen: true })
  }

  render() {
    const {
      selectedItem,
      baseVersions,
      disabled,
      dropdownItems,
      selectedVersion,
      selectedVersionUrl,
      isKintoBlock
    } = this.props
    return (
      <div className="list-container">
        {selectedVersionUrl && !disabled ? (
          <Link to={selectedVersionUrl}>{selectedVersion}</Link>
        ) : (
          <div className="disabled text-disabled">{selectedVersion}</div>
        )}
        <DropDown
          type="filter"
          dropdownClass="breadcrumb-icon"
          id="version-dropdown"
          list={dropdownItems}
          component={TagItem}
          filterField="text"
          actionText="Create New Version"
          actionHandler={this.onVersionModalOpen}
          dropdownContentClass="short"
          className="margin-right"
        />
        <VersionCreateModalContainer
          id={selectedItem.id}
          title={selectedItem.name}
          baseVersions={baseVersions}
          isOpen={this.state.isVersionModalOpen}
          onClose={this.onVersionModalClose}
          isKintoBlock={isKintoBlock}
        />
      </div>
    )
  }
}

export default KintoAppVersionSwitcher
