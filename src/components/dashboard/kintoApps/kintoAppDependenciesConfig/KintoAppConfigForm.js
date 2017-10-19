import React from 'react'
import { reduxForm, FieldArray } from 'redux-form'
import KintoAppConfigParams from './kintoAppConfigForm/KintoAppConfigParams'
import KintoAppConfigHardware from './kintoAppConfigForm/KintoAppConfigHardware'

const KintoAppConfigForm = ({
  activeTab,
  handleSubmit,
  allDependenciesInfo,
  shownDependenciesIds
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className={activeTab !== 'params' ? 'hide' : ''}>
        <KintoAppConfigParams />
      </div>
      <div className={activeTab !== 'hardware' ? 'hide' : ''}>
        <FieldArray
          name="data"
          component={KintoAppConfigHardware}
          allDependenciesInfo={allDependenciesInfo}
          shownDependenciesIds={shownDependenciesIds}
        />
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'kintoAppConfigForm',
  enableReinitialize: true
})(KintoAppConfigForm)
