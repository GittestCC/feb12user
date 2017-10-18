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
      versions,
      onVersionCreate,
      goToLatest,
      goToEnvironment
    } = this.props

    return (
      <Link to={latestVersion.url} className="kintoapp coral">
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
                <h4>Components ({kintoApp.dependencies.length})</h4>
              </button>

              <div className="line" />

              {kintoApp.dependencies.map((k, index) => (
                <button key={index}>
                  <div
                    className={`dependency ${k.type
                      ? k.type.toLowerCase()
                      : ''}-dep`}
                  />
                  <h5>{k.name}</h5>
                </button>
              ))}
            </DropDown>
            <div className="applications" onClick={this.showDependencyDropdown}>
              {kintoApp.dependencies
                .slice(0, 4)
                .map((d, i) => (
                  <div
                    key={i}
                    className={`dependency ${d.type
                      ? d.type.toLowerCase()
                      : ''}-dep`}
                  />
                ))}

              {kintoApp.dependencies.length > 4 && (
                <div className="dependency number">
                  +{kintoApp.dependencies.length - 4}
                </div>
              )}
            </div>
            <DropDown type="simple" dropdownClass="menu" id={dropdownId}>
              <button onClick={onVersionCreate}>Create New Version</button>
              <button onClick={goToLatest}>Edit {latestVersion.text}</button>
              <button onClick={this.showVersionDropdown}>
                View Other Versions
              </button>
              <div className="dropdown line" />
              <button onClick={goToEnvironment}>View Environments</button>
              <div className="dropdown line" />
              <button>Delete {latestVersion.text}</button>
              <button>Delete Application</button>
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

export default KintoAppCard
