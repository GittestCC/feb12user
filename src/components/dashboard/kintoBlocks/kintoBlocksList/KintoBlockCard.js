import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import DropDown from '../../../ui/DropDown'
import TagItem from '../../ui/TagItem'

class KintoBlockCard extends Component {
  static propTypes = {
    kintoBlock: PropTypes.object.isRequired,
    versions: PropTypes.array.isRequired,
    isLatestVersionPending: PropTypes.bool.isRequired,
    latestVersion: PropTypes.object.isRequired,
    dropdownId: PropTypes.string.isRequired,
    dropdownVersionId: PropTypes.string.isRequired,
    onVersionCreate: PropTypes.func.isRequired,
    goToLatest: PropTypes.func.isRequired
  }

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
      versions,
      onVersionCreate,
      goToLatest
    } = this.props
    return (
      <Link
        to={latestVersion.url}
        className={`kintoblock ${kintoBlock.color || 'lapis'}`}
        data-test={`kb-card-${dropdownId}`}
      >
        <div className="top">
          <div className="text">
            <div className="left">
              <img
                src={`/images/app-icon-${Math.floor(Math.random() * 6) +
                  1}.png`}
                alt=""
              />
            </div>
            <div className="right">
              <h4 className="version">{latestVersion.text}</h4>
            </div>
            <div className="name-and-tag">
              <h3 className="name">{kintoBlock.name}</h3>

              {isLatestVersionPending && (
                <div className={`text-highlight ${latestVersion.className}`}>
                  PENDING
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bottom">
          <div className="icons">
            <div className="applications">
              {/* <div className="dependency number">+4</div>
                <div className="dependency service" />
                <div className="dependency application" />
                <div className="dependency service" />
              <div className="dependency kintoblock-dep" /> */}
            </div>
            <DropDown type="simple" dropdownClass="menu" id={dropdownId}>
              <button onClick={onVersionCreate}>Create New Version</button>
              <button onClick={goToLatest}>Edit {latestVersion.text}</button>
              <button onClick={this.showVersionDropdown}>
                View Other Versions
              </button>
            </DropDown>
            <DropDown
              type="filter"
              className="menu-hidden"
              id={dropdownVersionId}
              isShown={this.state.isVerShown}
              onHide={this.hideVersionDropdown}
              list={versions}
              component={TagItem}
              filterField="text"
              actionText="Create New Version"
              actionHandler={onVersionCreate}
            />
          </div>
        </div>
      </Link>
    )
  }
}
export default KintoBlockCard
