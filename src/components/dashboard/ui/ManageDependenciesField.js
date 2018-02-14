import React from 'react'
import PropTypes from 'prop-types'
import { FieldArray } from 'redux-form'
import DependencyManagement from '../../forms/DependencyManagement'

const ManageDependenciesField = ({
  appVersion,
  name,
  workspaceId,
  dependenciesInfo,
  searchKintoBlocks,
  fetchKintoBlockDependenciesData,
  disabled,
  isKintoBlock
}) => (
  <FieldArray
    appVersion={appVersion}
    name={name}
    workspaceId={workspaceId}
    component={DependencyManagement}
    appDependenciesInfo={dependenciesInfo}
    onSearchKintoBlocks={searchKintoBlocks}
    fetchKintoBlockDependenciesData={fetchKintoBlockDependenciesData}
    disabled={disabled}
    isKintoBlock={isKintoBlock}
  />
)

ManageDependenciesField.propTypes = {
  appVersion: PropTypes.string,
  name: PropTypes.string.isRequired,
  dependenciesInfo: PropTypes.object.isRequired,
  searchKintoBlocks: PropTypes.func.isRequired,
  fetchKintoBlockDependenciesData: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  workspaceId: PropTypes.string
}

export default ManageDependenciesField
