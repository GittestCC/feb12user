import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, FieldArray } from 'redux-form'
import KintoAppConfigParams from './kintoAppConfigForm/KintoAppConfigParams'

const KintoAppConfigForm = ({
  activeTab,
  itemToScrollTo,
  handleSubmit,
  allDependenciesInfo,
  shownDependenciesIds,
  resetCPUHandler,
  onChangeActive,
  isTag
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
          isDisabled={isTag}
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
  onChangeActive: PropTypes.func.isRequired,
  isTag: PropTypes.bool
}

export default reduxForm({
  form: 'kintoAppConfigForm',
  enableReinitialize: true
})(KintoAppConfigForm)
