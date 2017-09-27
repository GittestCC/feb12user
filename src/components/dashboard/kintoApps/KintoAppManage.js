import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  getVersionAsText,
  getVersionStateClassName
} from '../../../helpers/versionHelper'
import DropDown from '../../ui/DropDown'
import TagItem from '../ui/TagItem'
import VersionCreateModalContainer from '../../../containers/dashboard/ui/VersionCreateModalContainer'
import KintoAppManageFormContainer from '../../../containers/dashboard/kintoApps/kintoAppManage/KintoAppManageFormContainer.js'

class KintoAppManage extends Component {
  state = {
    isVersionModalOpen: false
  }

  componentDidMount() {
    this.props.fetchKintoApp(this.props.ver)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.ver !== nextProps.ver) {
      this.props.fetchKintoApp(nextProps.ver)
    }
  }

  onVersionModalClose = () => {
    this.setState({ isVersionModalOpen: false })
  }

  onVersionModalOpen = () => {
    this.setState({ isVersionModalOpen: true })
  }

  render() {
    const { kintoApp, version, versionSelectItems } = this.props
    return (
      <div className="kinto-app-manage">
        <div className="breadcrumbs">
          <ul className="unstyled-list">
            <li>
              <Link to="/app/dashboard/kintoapps/list">Applications</Link>
              <img src="/images/icon-breadcrumb-chevron.svg" alt="" />
            </li>
            <li>
              <a href="">{kintoApp.name}</a>
              <span className="breadcrumb-icon" />
              <img src="/images/icon-breadcrumb-chevron.svg" alt="" />
            </li>
            <li>
              <a href="">{getVersionAsText(version)}</a>
              <DropDown
                type="filter"
                dropdownClass="breadcrumb-icon"
                id="version-dropdown"
                list={versionSelectItems}
                component={TagItem}
                filterField="text"
                actionText="Create New Version"
                actionHandler={this.onVersionModalOpen}
                dropdownContentClass="short"
                className="margin-right"
              />
            </li>
          </ul>
        </div>

        <div className="page-title">
          <h2>
            {kintoApp.name}
            <div
              className={`text-highlight status h6 ${getVersionStateClassName(
                version
              )}`}
            >
              {version && version.state}
            </div>
          </h2>
          <button
            onClick={this.onVersionModalOpen}
            type="button"
            className="button secondary"
          >
            Create New Version
          </button>
        </div>

        <KintoAppManageFormContainer
          kintoApp={this.props.kintoApp}
          version={this.props.ver}
        />

        <VersionCreateModalContainer
          id={kintoApp.id}
          title={kintoApp.name}
          baseVersions={this.props.baseVersions}
          isOpen={this.state.isVersionModalOpen}
          onClose={this.onVersionModalClose}
        />
      </div>
    )
  }
}

export default KintoAppManage
