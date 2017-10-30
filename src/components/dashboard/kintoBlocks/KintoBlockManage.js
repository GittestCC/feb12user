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
import KintoBlockManageFormContainer from '../../../containers/dashboard/kintoBlocks/kintoBlockManage/KintoBlockManageFormContainer'

class KintoBlockManage extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    kintoBlock: PropTypes.object.isRequired,
    ver: PropTypes.string.isRequired,
    version: PropTypes.object,
    baseVersions: PropTypes.array.isRequired,
    versionSelectItems: PropTypes.array.isRequired,
    breadcrumbSelectItems: PropTypes.array.isRequired,
    resetForm: PropTypes.func.isRequired,
    fetchKintoBlocks: PropTypes.func.isRequired,
    fetchKintoBlock: PropTypes.func.isRequired,
    goToCreatePage: PropTypes.func.isRequired
  }

  state = {
    isVersionModalOpen: false
  }

  componentDidMount() {
    this.props.fetchKintoBlocks().then(() => {
      this.props.fetchKintoBlock(this.props.id, this.props.ver)
    })
  }

  componentWillReceiveProps(nextProps) {
    const { id, ver } = nextProps
    if (this.props.ver !== ver || this.props.id !== id) {
      this.props.resetForm()
      this.props.fetchKintoBlock(id, ver)
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
      kintoBlock,
      ver,
      version,
      baseVersions,
      versionSelectItems,
      breadcrumbSelectItems,
      goToCreatePage
    } = this.props
    return (
      <div className="kintoblock-manage">
        <div className="breadcrumbs">
          <ul className="unstyled-list">
            <li>
              <Link to="/app/dashboard/kintoblocks/list">KintoBlocks</Link>
              <img src="/images/icon-breadcrumb-chevron.svg" alt="" />
            </li>
            <li>
              <a>{kintoBlock.name}</a>
              <DropDown
                type="filter"
                dropdownClass="breadcrumb-icon"
                id="application-dropdown"
                list={breadcrumbSelectItems}
                component={TagItem}
                filterField="text"
                actionText="Create New Kintoblock"
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
            {kintoBlock.name}
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

        <KintoBlockManageFormContainer kintoBlock={kintoBlock} ver={ver} />

        <VersionCreateModalContainer
          id={kintoBlock.id}
          title={kintoBlock.name}
          baseVersions={baseVersions}
          isOpen={this.state.isVersionModalOpen}
          onClose={this.onVersionModalClose}
          isKintoBlock={true}
        />
      </div>
    )
  }
}

export default KintoBlockManage
