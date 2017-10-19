import React from 'react'
import { FieldArray } from 'redux-form'
import DependencyManagement from '../../forms/DependencyManagement'

const ManageDependenciesField = ({
  name,
  dependenciesInfo,
  searchKintoBlocks,
  fetchKintoBlockDependenciesData,
  id,
  version
}) => (
  <FieldArray
    name={name}
    component={DependencyManagement}
    appDependenciesInfo={dependenciesInfo}
    onSearchKintoBlocks={searchKintoBlocks}
    fetchKintoBlockDependenciesData={fetchKintoBlockDependenciesData}
    id={id}
    version={version}
  />
)

export default ManageDependenciesField
