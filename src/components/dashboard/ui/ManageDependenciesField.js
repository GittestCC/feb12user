import React from 'react'
import PropTypes from 'prop-types'
import { FieldArray } from 'redux-form'
import DependencyManagement from '../../forms/DependencyManagement'

const ManageDependenciesField = ({
  appVersion,
  name,
  dependenciesInfo,
  searchKintoBlocks,
  fetchKintoBlockDependenciesData,
  disabled
}) => (
  <FieldArray
    appVersion={appVersion}
    name={name}
    component={DependencyManagement}
    appDependenciesInfo={dependenciesInfo}
    onSearchKintoBlocks={searchKintoBlocks}
    fetchKintoBlockDependenciesData={fetchKintoBlockDependenciesData}
    disabled={disabled}
  />
)

ManageDependenciesField.propTypes = {
  appVersion: PropTypes.string,
  name: PropTypes.string.isRequired,
  dependenciesInfo: PropTypes.object.isRequired,
  searchKintoBlocks: PropTypes.func.isRequired,
  fetchKintoBlockDependenciesData: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}

export default ManageDependenciesField
