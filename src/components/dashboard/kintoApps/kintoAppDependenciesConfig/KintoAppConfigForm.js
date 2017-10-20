import React from 'react'
import { reduxForm, FieldArray } from 'redux-form'
import KintoAppConfigParams from './kintoAppConfigForm/KintoAppConfigParams'
import KintoAppConfigHardware from './kintoAppConfigForm/KintoAppConfigHardware'

const KintoAppConfigForm = ({
  activeTab,
  handleSubmit,
  allDependenciesInfo,
  shownDependenciesIds,
  resetCPUHandler
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className={activeTab !== 'params' ? 'hide' : null}>
        <KintoAppConfigParams />
      </div>
      <div className={activeTab !== 'hardware' ? 'hide' : null}>
        <FieldArray
          name="data"
          component={KintoAppConfigHardware}
          allDependenciesInfo={allDependenciesInfo}
          shownDependenciesIds={shownDependenciesIds}
          resetCPUHandler={resetCPUHandler}
        />
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'kintoAppConfigForm',
  enableReinitialize: true
})(KintoAppConfigForm)
