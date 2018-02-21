import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import DropDown from '../../../ui/DropDown'
import KintoBlockTagAndBranchDropDownContainer from '../../../../containers/breadcrumbs/KintoBlockTagAndBranchDropDownContainer'
import { pages, urls } from '../../../../constants/pages'

class KintoBlockCard extends Component {
  static propTypes = {
    kintoBlock: PropTypes.object.isRequired,
    isLatestVersionPending: PropTypes.bool.isRequired,
    latestVersion: PropTypes.object.isRequired,
    dropdownId: PropTypes.string.isRequired,
    dropdownVersionId: PropTypes.string.isRequired,
    goToLatest: PropTypes.func.isRequired,
    goToEndpoint: PropTypes.func.isRequired
  }

  state = {
    areTagsAndBranchesShown: false
  }

  showVersionDropdown = () => {
    this.setState({ areTagsAndBranchesShown: true })
  }

  hideVersionDropdown = () => {
    this.setState({ areTagsAndBranchesShown: false })
  }

  render() {
    const {
      kintoBlock,
      isLatestVersionPending,
      latestVersion,
      dropdownId,
      dropdownVersionId,
      goToLatest,
      goToEndpoint
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
                src={`/images/icon-generic-kintoblock-${Math.floor(
                  Math.random() * 6
                ) + 1}.svg`}
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
            <DropDown
              type="simple"
              dropdownClass="menu"
              className="wide"
              id={dropdownId}
            >
              <button onClick={goToLatest} className="double-line">
                <h5>Edit Branch</h5>
                <div className="faded">{latestVersion.text}</div>
              </button>
              <button onClick={this.showVersionDropdown}>
                View All Branches & Tags
              </button>
              <button onClick={goToEndpoint}>View Endpoints</button>
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
      </Link>
    )
  }
}
export default KintoBlockCard
