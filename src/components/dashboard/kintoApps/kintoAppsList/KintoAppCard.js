import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import DropDown from '../../../ui/DropDown'
import TagItem from '../../ui/TagItem'

class KintoAppCard extends Component {
  state = {
    isVerShown: false,
    areDependenciesShown: false
  }

  showVersionDropdown = () => {
    this.setState({ isVerShown: true })
  }

  hideVersionDropdown = () => {
    this.setState({ isVerShown: false })
  }

  showDependencyDropdown = e => {
    e.preventDefault()
    this.setState({ areDependenciesShown: true })
  }

  hideDependencyDropdown = () => {
    this.setState({ areDependenciesShown: false })
  }

  render() {
    const {
      kintoApp,
      isLatestVersionPending,
      latestVersion,
      dropdownDependencyId,
      dropdownId,
      dropdownVersionId,
      versions
    } = this.props

    return (
      <Link
        to={`/app/dashboard/kintoapps/${kintoApp.id}/versions/${latestVersion.text}`}
        className={`kintoapp ${kintoApp.color}`}
      >
        <div className="top">
          <div className="text">
            <div className="left">
              <img src={`/images/app-icon-${kintoApp.id}.png`} alt="" />
            </div>
            <div className="right">
              <h4 className="version">{latestVersion.text}</h4>
            </div>
            <div className="name-and-tag">
              <h3 className="name">{kintoApp.name}</h3>
              {isLatestVersionPending && (
                <div className="text-highlight orange">PENDING</div>
              )}
            </div>
          </div>
        </div>

        <div className="bottom">
          <div className="icons">
            <DropDown
              type="dependencies"
              dropdownClass="dependencies"
              className="menu-hidden dependency-dropdown"
              id={dropdownDependencyId}
              isShown={this.state.areDependenciesShown}
              onHide={this.hideDependencyDropdown}
            >
              <button className="title">
                <h4>Components (14)</h4>
              </button>
              <div className="line" />
              <button>
                <div className="dependency service" />
                <h5>Service</h5>
              </button>
              <button>
                <div className="dependency kintoblock-dep" />{' '}
                <h5>KintoBlock</h5>
              </button>
              <button>
                <div className="dependency application" />
                <h5>Application</h5>
              </button>
              <button>
                <div className="dependency service" />
                <h5>Service!</h5>
              </button>
            </DropDown>
            <div className="applications" onClick={this.showDependencyDropdown}>
              <div className="dependency number">+10</div>
              <div className="dependency application" />
              <div className="dependency application" />
              <div className="dependency kintoblock-dep" />
              <div className="dependency service" />
            </div>
            <DropDown type="simple" dropdownClass="menu" id={dropdownId}>
              <button>Create New Version</button>
              <button>Edit {latestVersion.text}</button>
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
              actionHandler={() => {
                console.log('create new kinto app version')
              }}
            />
          </div>
        </div>
      </Link>
    )
  }
}

export default KintoAppCard
