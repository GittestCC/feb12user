import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
  getVersionAsText,
  getVersionStateClassName
} from '../../../helpers/versionHelper'
import DropDown from '../../ui/DropDown'
import TagItem from '../ui/TagItem'
import VersionCreateModalContainer from '../../../containers/dashboard/ui/VersionCreateModalContainer'
import KintoAppFormContainer from '../../../containers/dashboard/kintoApps/KintoAppFormContainer'

class KintoAppManage extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    ver: PropTypes.string.isRequired,
    version: PropTypes.object,
    kintoApp: PropTypes.object.isRequired,
    versionSelectItems: PropTypes.array.isRequired,
    breadcrumbSelectItems: PropTypes.array.isRequired,
    baseVersions: PropTypes.array.isRequired,
    fetchKintoApps: PropTypes.func.isRequired,
    fetchKintoApp: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    goToCreatePage: PropTypes.func.isRequired
  }

  state = {
    isVersionModalOpen: false
  }

  componentDidMount() {
    this.props.fetchKintoApps()
    this.props.fetchKintoApp(this.props.id, this.props.ver)
  }

  componentWillReceiveProps(nextProps) {
    const { id, ver } = nextProps
    if (this.props.ver !== ver || this.props.id !== id) {
      this.props.resetForm()
      this.props.fetchKintoApp(id, ver)
    }
  }

  onVersionModalClose = () => {
    this.setState({ isVersionModalOpen: false })
  }

  onVersionModalOpen = () => {
    this.setState({ isVersionModalOpen: true })
  }

  render() {
    const {
      kintoApp,
      version,
      versionSelectItems,
      breadcrumbSelectItems,
      goToCreatePage
    } = this.props
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
              <DropDown
                type="filter"
                dropdownClass="breadcrumb-icon"
                id="application-dropdown"
                list={breadcrumbSelectItems}
                component={TagItem}
                filterField="text"
                actionText="Create New Application"
                actionHandler={goToCreatePage}
                dropdownContentClass="short"
                className="margin-right"
              />
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

        <KintoAppFormContainer kintoApp={kintoApp} version={this.props.ver} />

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
