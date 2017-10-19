import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import DropDown from '../../ui/DropDown'
import TagItem from '../ui/TagItem'
import {
  filterArrayAndChildren,
  flattenNestedToIds
} from '../../../helpers/arrayHelper'
import KintoAppConfigFormContainer from '../../../containers/dashboard/kintoApps/kintoAppDependenciesConfig/KintoAppConfigFormContainer'
import KintoAppConfigSidebar from './kintoAppDependenciesConfig/KintoAppConfigSidebar'

class KintoAppDependenciesConfig extends Component {
  state = {
    filterText: '',
    activeTab: 'hardware'
  }

  getFilteredDependencies() {
    return filterArrayAndChildren(
      this.props.dependencies,
      'dependencies',
      'name',
      this.state.filterText
    )
  }

  getShownDependenciesIds() {
    const filteredDeps = this.getFilteredDependencies()
    return flattenNestedToIds(filteredDeps, 'dependencies', 'dependencyId')
  }

  componentDidMount() {
    const { id, ver, env } = this.props
    return this.props.fetchKintoApps().then(() => {
      this.loadData(id, ver, env)
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.ver !== nextProps.ver || this.props.env !== nextProps.env) {
      this.loadData(nextProps.id, nextProps.ver, nextProps.env)
    }
  }

  loadData = (id, ver, env) => {
    return this.props.fetchKintoApp(id, ver).then(() => {
      return this.props.fetchKintoAppDependenciesConfig(id, ver, env)
    })
  }

  updateFilterText = text => {
    this.setState({ filterText: text })
  }

  showHardwareTab = () => {
    this.setState({ activeTab: 'hardware' })
  }

  showParamsTab = () => {
    this.setState({ activeTab: 'params' })
  }

  render() {
    const {
      id,
      ver,
      env,
      kintoApp,
      versionsBreadcrumb,
      appSwitchBreadcrumb,
      goToCreatePage,
      environmentsBreadcrumb,
      selectedEnvironmentName,
      dependencies
    } = this.props
    const filteredDep = this.getFilteredDependencies()
    return (
      <div className="ka-dependencies-page">
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
                list={appSwitchBreadcrumb}
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
              <a href="">{ver}</a>
              <DropDown
                type="filter"
                dropdownClass="breadcrumb-icon"
                id="version-dropdown"
                list={versionsBreadcrumb}
                component={TagItem}
                filterField="text"
                actionText="Create New Version"
                actionHandler={this.onVersionModalOpen}
                dropdownContentClass="short"
                className="margin-right"
              />
            </li>
            <li>
              <DropDown
                type="filter"
                id="env-dropdown"
                list={environmentsBreadcrumb}
                component={TagItem}
                filterField="text"
                dropdownText={selectedEnvironmentName}
                dropdownContentClass="short"
              />
            </li>
          </ul>
        </div>

        <div className="ka-config-dependencies">
          <div className="ka-config-header">
            <div className="left-side" />
            <ul className="right-side uppercase tab-list">
              <li>
                <a
                  onClick={this.showParamsTab}
                  className={this.state.activeTab === 'params' ? 'active' : ''}
                >
                  Custom Parameters
                </a>
              </li>
              <li>
                <a
                  onClick={this.showHardwareTab}
                  className={
                    this.state.activeTab === 'hardware' ? 'active' : ''
                  }
                >
                  Hardware Requirements
                </a>
              </li>
            </ul>
          </div>
          <div className="ka-config-body">
            <div className="left-side">
              <KintoAppConfigSidebar
                list={filteredDep}
                filter={this.state.filterText}
                onUpdateFilter={this.updateFilterText}
              />
            </div>
            <div className="right-side">
              <KintoAppConfigFormContainer
                id={id}
                ver={ver}
                env={env}
                activeTab={this.state.activeTab}
                allDependenciesInfo={dependencies}
                shownDependenciesIds={this.getShownDependenciesIds()}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default KintoAppDependenciesConfig
