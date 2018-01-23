import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import DropDown from '../ui/DropDown'
import TagItem from '../dashboard/ui/TagItem'

import ComplexModal from '../dashboard/ui/ComplexModal'

import AddNewEnvironmentModalForm from '../dashboard/kintoApps/kintoAppEnvironmentsList/environmentModals/AddNewEnvironmentModalForm'

class KintoAppEnvironmentSwitcher extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    kintoApp: PropTypes.object,
    dropdownItems: PropTypes.array.isRequired,
    selectedEnvironmentName: PropTypes.string,
    selectedEnvironmentUrl: PropTypes.string,
    addNewEnvironment: PropTypes.func.isRequired,
    hideCreateAction: PropTypes.bool
  }

  state = {
    isModalOpen: false
  }

  onModalOpen = () => {
    this.setState({ isModalOpen: true })
  }

  onModalClose = () => {
    this.setState({ isModalOpen: false })
  }

  render() {
    const {
      kintoApp,
      disabled,
      dropdownItems,
      selectedEnvironmentName,
      selectedEnvironmentUrl,
      addNewEnvironment,
      hideCreateAction
    } = this.props
    return (
      <div className="list-container">
        {selectedEnvironmentUrl && !disabled ? (
          <Link to={selectedEnvironmentUrl}>{selectedEnvironmentName}</Link>
        ) : (
          <div className="disabled text-disabled">
            {selectedEnvironmentName}
          </div>
        )}
        <DropDown
          type="filter"
          dropdownClass="breadcrumb-icon"
          id="env-switch-dropdown"
          list={dropdownItems}
          component={TagItem}
          filterField="text"
          actionText="Add New Environment"
          actionHandler={this.onModalOpen}
          dropdownContentClass="short"
          className="margin-right"
          hideAction={hideCreateAction}
          placeholderText="Search environments..."
        />

        <ComplexModal
          className="string"
          component={AddNewEnvironmentModalForm}
          isOpen={this.state.isModalOpen}
          onClose={this.onModalClose}
          data={{
            kintoApp
          }}
          actions={{
            addNewEnvironment: addNewEnvironment
          }}
        />
      </div>
    )
  }
}

export default KintoAppEnvironmentSwitcher
