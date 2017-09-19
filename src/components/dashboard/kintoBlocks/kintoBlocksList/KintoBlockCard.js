import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import DropDown from '../../../ui/DropDown'
import TagItem from '../TagItem'

class KintoBlockCard extends Component {
  state = {
    isVerShown: false
  }

  showVersionDropdown = () => {
    this.setState({ isVerShown: true })
  }

  hideVersionDropdown = () => {
    this.setState({ isVerShown: false })
  }

  render() {
    const {
      kintoBlock,
      isLatestVersionPending,
      latestVersion,
      dropdownId,
      dropdownVersionId,
      versions
    } = this.props
    return (
      <Link to={latestVersion.url} className={`kintoblock ${kintoBlock.color}`}>
        <div className="text">
          <h3>{kintoBlock.name}</h3>
          <h4 className="version">{latestVersion.text}</h4>
          {isLatestVersionPending && (
            <div className={`text-highlight ${latestVersion.className}`}>
              PENDING
            </div>
          )}
        </div>
        <div className="icons">
          <div className="applications">
            <div className="application" />
            <div className="application" />
          </div>
          <DropDown type="simple" dropdownClass="menu" id={dropdownId}>
            <button>Create New Version</button>
            <button>Edit {latestVersion.text}</button>
            <button onClick={this.showVersionDropdown}>
              View Other Versions
            </button>
            <button>Rename</button>
          </DropDown>
          <DropDown
            type="filter"
            className="menu-hidden"
            id={dropdownVersionId}
            isShown={this.state.isVerShown}
            list={versions}
            component={TagItem}
            filterField="text"
            actionText="Create New Version"
            actionHandler={() => {
              console.log('create new version')
            }}
          />
        </div>
      </Link>
    )
  }
}
export default KintoBlockCard
