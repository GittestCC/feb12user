import React from 'react'
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
  shownDependenciesIds
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
              />
            </div>
          ))}
        </div>
      </IScroll>
    </div>
  )
}

export default KintoAppConfigHardware
