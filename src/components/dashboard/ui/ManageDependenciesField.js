import React from 'react'
import { FieldArray } from 'redux-form'
import DependencyManagement from '../../forms/DependencyManagement'

const ManageDependenciesField = ({
  name,
  dependenciesInfo,
  searchKintoBlocks,
  fetchKintoBlockDependenciesData
}) => (
  <FieldArray
    name={name}
    component={DependencyManagement}
    appDependenciesInfo={dependenciesInfo}
    onSearchKintoBlocks={searchKintoBlocks}
    fetchKintoBlockDependenciesData={fetchKintoBlockDependenciesData}
  />
)

export default ManageDependenciesField
