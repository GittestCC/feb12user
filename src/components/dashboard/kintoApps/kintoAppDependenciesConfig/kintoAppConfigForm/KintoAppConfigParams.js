import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FieldArray } from 'redux-form'
import KintoAppConfigScroller from '../KintoAppConfigScroller'
import KintoAppConfigParamsItem from './KintoAppConfigParamsItem'
import SearchInput from '../../../../forms/SearchInput'
import { findDependency } from '../../../../../helpers/kintoBlocksHelper'

function getIsShownClass(shownDependenciesIds, data) {
  return !shownDependenciesIds.some(id => data.dependencyId === id)
    ? 'hide'
    : ''
}

class KintoAppConfigParams extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    allDependenciesInfo: PropTypes.array.isRequired,
    itemToScrollTo: PropTypes.string,
    shownDependenciesIds: PropTypes.array.isRequired,
    onChangeActive: PropTypes.func.isRequired
  }

  state = {
    paramsFilterText: ''
  }

  onChangeActive = (index, isShown) => {
    this.props.onChangeActive(
      this.props.fields.get(index).dependencyId,
      isShown
    )
  }

  updateFilterText = e => {
    this.setState({ paramsFilterText: e.target.value })
  }

  getVisibleParams() {
    const dependencyConfigs = this.props.fields.getAll() || []
    const { paramsFilterText } = this.state
    const result = {}
    dependencyConfigs.forEach(d => {
      result[d.dependencyId] = d.params.filter(p =>
        p.key.toUpperCase().includes(paramsFilterText.toUpperCase())
      )
    })
    return result
  }

  render() {
    const {
      fields,
      allDependenciesInfo,
      itemToScrollTo,
      shownDependenciesIds
    } = this.props

    const visibleParams = this.getVisibleParams()
    return (
      <div>
        <SearchInput
          placeholder="Search custom parameters"
          className="white"
          value={this.state.paramsFilterText}
          onChange={this.updateFilterText}
        />
        <div className="ka-config-params">
          <KintoAppConfigScroller
            type="params"
            itemToScrollTo={itemToScrollTo}
            onChangeActive={this.onChangeActive}
          >
            {fields.map((field, key) => {
              const dependencyConfigRow = fields.get(key)
              const info = findDependency(
                allDependenciesInfo,
                dependencyConfigRow.dependencyId
              )
              return (
                <div
                  key={key}
                  data-scroll={`params-${dependencyConfigRow.dependencyId}`}
                  className={`ka-config-item ka-config-params-item ${getIsShownClass(
                    shownDependenciesIds,
                    fields.get(key)
                  )}`}
                >
                  <h3>{info && info.name}</h3>
                  <FieldArray
                    name={`${field}.params`}
                    component={KintoAppConfigParamsItem}
                    visibleParams={
                      visibleParams[dependencyConfigRow.dependencyId]
                    }
                  />
                </div>
              )
            })}
          </KintoAppConfigScroller>
        </div>
      </div>
    )
  }
}

export default KintoAppConfigParams
