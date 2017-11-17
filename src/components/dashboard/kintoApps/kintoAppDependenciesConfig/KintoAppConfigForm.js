import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, FieldArray } from 'redux-form'
import KintoAppConfigParams from './kintoAppConfigForm/KintoAppConfigParams'
import KintoAppConfigHardware from './kintoAppConfigForm/KintoAppConfigHardware'

const KintoAppConfigForm = ({
  activeTab,
  itemToScrollTo,
  handleSubmit,
  allDependenciesInfo,
  shownDependenciesIds,
  resetCPUHandler,
  onChangeActive
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className={activeTab !== 'params' ? 'hide' : null}>
        <FieldArray
          name="data"
          component={KintoAppConfigParams}
          allDependenciesInfo={allDependenciesInfo}
          shownDependenciesIds={shownDependenciesIds}
          onChangeActive={onChangeActive}
          itemToScrollTo={itemToScrollTo}
        />
      </div>
      <div className={activeTab !== 'hardware' ? 'hide' : null}>
        <FieldArray
          name="data"
          component={KintoAppConfigHardware}
          allDependenciesInfo={allDependenciesInfo}
          shownDependenciesIds={shownDependenciesIds}
          resetCPUHandler={resetCPUHandler}
          onChangeActive={onChangeActive}
          itemToScrollTo={itemToScrollTo}
        />
      </div>
    </form>
  )
}

KintoAppConfigForm.propTypes = {
  activeTab: PropTypes.string.isRequired,
  itemToScrollTo: PropTypes.string,
  allDependenciesInfo: PropTypes.array.isRequired,
  shownDependenciesIds: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetCPUHandler: PropTypes.func.isRequired,
  onChangeActive: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'kintoAppConfigForm',
  enableReinitialize: true
})(KintoAppConfigForm)
