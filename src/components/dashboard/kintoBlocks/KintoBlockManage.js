import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  getVersionAsText,
  getVersionStateClassName
} from '../../../helpers/versionHelper'
import DropDown from '../../ui/DropDown'
import TagItem from '../ui/TagItem'
import VersionCreateModalContainer from '../../../containers/dashboard/ui/VersionCreateModalContainer'
import KintoBlockManageForm from './kintoBlockManage/KintoBlockManageForm'

class KintoBlockManage extends Component {
  state = {
    isVersionModalOpen: false
  }

  componentDidMount() {
    this.props.fetchKintoBlocks().then(() => {
      this.props.fetchKintoBlock(this.props.id, this.props.ver)
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.ver !== nextProps.ver) {
      this.props.fetchKintoBlock(nextProps.id, nextProps.ver)
    }
  }

  goToCreatePage = () => {
    this.props.push('/app/dashboard/kintoblocks/create')
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
      version,
      versionSelectItems,
      breadcrumbSelectItems
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
              <a href="">{kintoBlock.name}</a>
              <DropDown
                type="filter"
                dropdownClass="breadcrumb-icon"
                id="application-dropdown"
                list={breadcrumbSelectItems}
                component={TagItem}
                filterField="text"
                actionText="Create New Kintoblock"
                actionHandler={this.goToCreatePage}
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

        <KintoBlockManageForm kintoBlock={kintoBlock} ver={this.props.ver} />

        <VersionCreateModalContainer
          id={kintoBlock.id}
          title={kintoBlock.name}
          baseVersions={this.props.baseVersions}
          isOpen={this.state.isVersionModalOpen}
          onClose={this.onVersionModalClose}
          isKintoBlock={true}
        />
      </div>
    )
  }
}

export default KintoBlockManage
