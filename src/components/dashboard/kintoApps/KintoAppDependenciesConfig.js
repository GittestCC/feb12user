import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  filterArrayAndChildren,
  flattenNestedToIds
} from '../../../helpers/arrayHelper'
import KintoAppConfigFormContainer from '../../../containers/dashboard/kintoApps/kintoAppDependenciesConfig/KintoAppConfigFormContainer'
import KintoAppConfigSidebar from './kintoAppDependenciesConfig/KintoAppConfigSidebar'

class KintoAppDependenciesConfig extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    ver: PropTypes.string.isRequired,
    env: PropTypes.string.isRequired,
    dependencies: PropTypes.array.isRequired
  }

  state = {
    filterText: '',
    activeTab: 'params',
    activeDependencies: {},
    itemToScrollTo: null
  }

  componentDidMount() {
    const { id, ver, env, filteredDependency } = this.props
    this.loadData(id, ver, env)
    this.props.environmentSelect(env)
    if (filteredDependency) {
      this.setState({ filterText: `id:${filteredDependency}` })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.ver !== nextProps.ver || this.props.env !== nextProps.env) {
      this.loadData(nextProps.id, nextProps.ver, nextProps.env)
      this.props.environmentSelect(nextProps.env)
    }
  }

  getFilteredDependencies() {
    const filter = this.state.filterText
    return filterArrayAndChildren(
      this.props.dependencies,
      'dependencies',
      item => {
        if (filter.startsWith('id:')) {
          return item['dependencyId'] === filter.substring(3)
        } else {
          return item['name'].toUpperCase().includes(filter.toUpperCase())
        }
      }
    )
  }

  getShownDependenciesIds() {
    const filteredDeps = this.getFilteredDependencies()
    return flattenNestedToIds(filteredDeps, 'dependencies', 'dependencyId')
  }

  getActiveFilteredDependencies(filteredDependencies) {
    const { activeDependencies } = this.state
    return filteredDependencies.map(d => {
      const dependencies = d.dependencies || []
      return {
        ...d,
        active: activeDependencies[d.dependencyId],
        dependencies: dependencies.map(cd => ({
          ...cd,
          active: activeDependencies[cd.dependencyId]
        }))
      }
    })
  }

  loadData = (id, ver, env) => {
    this.props.fetchKintoApp(id, ver)
    this.props.fetchKintoAppDependenciesConfig(id, ver, env)
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

  onChangeActive = (dependencyId, isShown) => {
    this.setState(oldState => ({
      activeDependencies: {
        ...oldState.activeDependencies,
        [dependencyId]: isShown
      }
    }))
  }

  onScrollToItem = dependencyId => {
    this.setState({
      itemToScrollTo: `${this.state.activeTab}-${dependencyId}`
    })
  }

  render() {
    const { id, ver, env, dependencies } = this.props
    const filteredDependencies = this.getFilteredDependencies()
    return (
      <div className="ka-dependencies-page">
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
              {/*
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
              */}
            </ul>
          </div>
          <div className="ka-config-body">
            <div className="left-side">
              <KintoAppConfigSidebar
                list={this.getActiveFilteredDependencies(filteredDependencies)}
                filter={this.state.filterText}
                onUpdateFilter={this.updateFilterText}
                onScrollToItem={this.onScrollToItem}
              />
            </div>
            <div className="right-side">
              <KintoAppConfigFormContainer
                id={id}
                ver={ver}
                env={env}
                activeTab={this.state.activeTab}
                itemToScrollTo={this.state.itemToScrollTo}
                allDependenciesInfo={dependencies}
                shownDependenciesIds={this.getShownDependenciesIds()}
                onChangeActive={this.onChangeActive}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default KintoAppDependenciesConfig
