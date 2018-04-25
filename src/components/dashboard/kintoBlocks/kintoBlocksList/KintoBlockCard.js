import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import DropDown from '../../../ui/DropDown'
import KintoBlockTagAndBranchDropDownContainer from '../../../../containers/breadcrumbs/KintoBlockTagAndBranchDropDownContainer'
import { pages, urls } from '../../../../constants/pages'

class KintoBlockCard extends Component {
  static propTypes = {
    kintoBlock: PropTypes.object.isRequired,
    latestVersion: PropTypes.object.isRequired,
    dropdownId: PropTypes.string.isRequired,
    dropdownVersionId: PropTypes.string.isRequired,
    goToLatest: PropTypes.func.isRequired,
    goToEndpoint: PropTypes.func.isRequired,
    kintoBlockDependencies: PropTypes.array.isRequired,
    goToDependencyManage: PropTypes.func.isRequired
  }

  state = {
    areTagsAndBranchesShown: false,
    areDependenciesShown: false
  }

  showVersionDropdown = () => {
    this.setState({ areTagsAndBranchesShown: true })
  }

  hideVersionDropdown = () => {
    this.setState({ areTagsAndBranchesShown: false })
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
      kintoBlock,
      latestVersion,
      dropdownId,
      dropdownVersionId,
      dropdownDependencyId,
      goToLatest,
      goToEndpoint,
      kintoBlockDependencies,
      goToDependencyManage
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
                src={`/images/${kintoBlock.iconImageName ||
                  'icon-generic-kintoblock-9.svg'}`}
                alt=""
              />
            </div>
            <div className="right">
              <h4 className="version">{latestVersion.name}</h4>
            </div>
            <div className="name-and-tag">
              <h3 className="name">{kintoBlock.name}</h3>

              {/* TODO isLatestVersionPending && (
                <div className={`text-highlight ${latestVersion.className}`}>
                  PENDING
                </div>
                )*/}
            </div>
          </div>
        </div>

        <div className="bottom">
          <div className="icons">
            <div className="left">
              <DropDown
                type="dependencies"
                dropdownClass="dependencies"
                className="menu-hidden dependency-dropdown"
                id={dropdownDependencyId}
                isShown={this.state.areDependenciesShown}
                onHide={this.hideDependencyDropdown}
              >
                <h4 className="title">
                  Dependencies ({kintoBlockDependencies.length})
                </h4>

                <div className="line" />

                {kintoBlockDependencies.map((d, index) => (
                  <button
                    onClick={() => goToDependencyManage(d.url)}
                    type="button"
                    key={index}
                  >
                    <div
                      className={`dependency ${
                        d.type ? d.type.toLowerCase() : ''
                      }-dep`}
                    />
                    <h5>{d.name}</h5>
                  </button>
                ))}
              </DropDown>

              <div
                className="applications"
                onClick={this.showDependencyDropdown}
              >
                {kintoBlockDependencies
                  .slice(0, 4)
                  .map((d, i) => (
                    <div
                      key={i}
                      className={`dependency ${
                        d.type ? d.type.toLowerCase() : ''
                      }-dep`}
                    />
                  ))}

                {kintoBlockDependencies.length > 4 && (
                  <div className="dependency number">
                    +{kintoBlockDependencies.length - 4}
                  </div>
                )}
              </div>
            </div>

            <div className="right">
              <DropDown
                type="simple"
                dropdownClass="menu"
                className="wide"
                id={dropdownId}
              >
                <button
                  onClick={goToLatest}
                  className="double-line"
                  type="button"
                >
                  <h5>Edit Branch</h5>
                  <div className="faded">{latestVersion.name}</div>
                </button>
                <button onClick={this.showVersionDropdown} type="button">
                  View All Branches & Tags
                </button>
                <button onClick={goToEndpoint} type="button">
                  View Endpoints
                </button>
                <div className="line with-padding" />
              </DropDown>

              <KintoBlockTagAndBranchDropDownContainer
                onHide={this.hideVersionDropdown}
                isShown={this.state.areTagsAndBranchesShown}
                id={dropdownVersionId}
                url={urls[pages.dashboardKintoBlocksManage]}
                kintoBlock={kintoBlock}
                noHighlight={true}
                className="menu-hidden"
              />
            </div>
          </div>
        </div>
      </Link>
    )
  }
}
export default KintoBlockCard
