import React from 'react'
import { FieldArray } from 'redux-form'
import DependencyManagement from '../../forms/DependencyManagement'

const ManageDependenciesField = ({
  id,
  version,
  name,
  dependenciesInfo,
  searchKintoBlocks,
  fetchKintoBlockDependenciesData
}) => (
  <FieldArray
    id={id}
    version={version}
    name={name}
    component={DependencyManagement}
    appDependenciesInfo={dependenciesInfo}
    onSearchKintoBlocks={searchKintoBlocks}
    fetchKintoBlockDependenciesData={fetchKintoBlockDependenciesData}
  />
)

export default ManageDependenciesField
