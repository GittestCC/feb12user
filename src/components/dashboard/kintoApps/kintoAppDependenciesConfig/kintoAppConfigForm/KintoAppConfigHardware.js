import React from 'react'
import PropTypes from 'prop-types'
import iscroll from 'iscroll'
import IScroll from 'react-iscroll'
import KintoAppConfigHardwareItem from './KintoAppConfigHardwareItem'
import { findDependency } from '../../../../../helpers/kintoBlocksHelper'

function getContainerClass(shownDependenciesIds, fields, key) {
  return !shownDependenciesIds.some(id => fields.get(key).dependencyId === id)
    ? 'hide'
    : ''
}
const KintoAppConfigHardware = ({
  fields,
  allDependenciesInfo,
  shownDependenciesIds,
  resetCPUHandler
}) => {
  return (
    <div className="ka-config-hardware">
      <IScroll
        iScroll={iscroll}
        options={{
          scrollbars: true,
          mouseWheel: true,
          fadeScrollbars: true,
          shrinkScrollbars: 'scale',
          interactiveScrollbars: true,
          disableTouch: true,
          disablePointer: true,
          disableMouse: true
        }}
      >
        <div>
          {fields.map((field, key) => (
            <div
              key={key}
              className={getContainerClass(shownDependenciesIds, fields, key)}
            >
              <KintoAppConfigHardwareItem
                field={field}
                info={findDependency(
                  allDependenciesInfo,
                  fields.get(key).dependencyId
                )}
                data={fields.get(key)}
                resetCPUHandler={resetCPUHandler}
              />
            </div>
          ))}
        </div>
      </IScroll>
    </div>
  )
}
KintoAppConfigHardware.propTypes = {
  fields: PropTypes.object.isRequired,
  allDependenciesInfo: PropTypes.array.isRequired,
  shownDependenciesIds: PropTypes.array.isRequired,
  resetCPUHandler: PropTypes.func.isRequired
}

export default KintoAppConfigHardware
