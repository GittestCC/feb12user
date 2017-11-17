import React, { Component } from 'react'
import PropTypes from 'prop-types'
import KintoAppConfigScroller from '../KintoAppConfigScroller'
import KintoAppConfigHardwareItem from './KintoAppConfigHardwareItem'
import { findDependency } from '../../../../../helpers/kintoBlocksHelper'

function getIsShownClass(shownDependenciesIds, data) {
  return !shownDependenciesIds.some(id => data.dependencyId === id)
    ? 'hide'
    : ''
}

class KintoAppConfigHardware extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    allDependenciesInfo: PropTypes.array.isRequired,
    itemToScrollTo: PropTypes.string,
    shownDependenciesIds: PropTypes.array.isRequired,
    resetCPUHandler: PropTypes.func.isRequired,
    onChangeActive: PropTypes.func.isRequired
  }

  onChangeActive = (index, isShown) => {
    this.props.onChangeActive(
      this.props.fields.get(index).dependencyId,
      isShown
    )
  }

  render() {
    const {
      fields,
      allDependenciesInfo,
      itemToScrollTo,
      shownDependenciesIds,
      resetCPUHandler
    } = this.props
    return (
      <div className="ka-config-hardware">
        <KintoAppConfigScroller
          type="hardware"
          itemToScrollTo={itemToScrollTo}
          onChangeActive={this.onChangeActive}
        >
          {fields.map((field, key) => {
            const data = fields.get(key)
            return (
              <div
                key={key}
                className={getIsShownClass(
                  shownDependenciesIds,
                  fields.get(key)
                )}
                data-scroll={`hardware-${data.dependencyId}`}
              >
                <KintoAppConfigHardwareItem
                  field={field}
                  info={findDependency(allDependenciesInfo, data.dependencyId)}
                  data={data}
                  resetCPUHandler={resetCPUHandler}
                />
              </div>
            )
          })}
        </KintoAppConfigScroller>
      </div>
    )
  }
}

export default KintoAppConfigHardware
