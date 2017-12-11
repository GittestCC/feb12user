import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
import isBoolean from 'lodash/isBoolean'
import { updateKintoApp, createKintoApp } from '../../../actions/kintoApps'
import {
  searchKintoBlocks,
  fetchKintoBlockDependenciesData
} from '../../../actions/kintoBlocks'
import KintoAppForm from '../../../components/dashboard/kintoApps/KintoAppForm'

function mapStateToProps(state, { kintoApp, version, isCreate, isTagged }) {
  const formSelector = formValueSelector('kintoAppForm')
  const appDependencies = formSelector(state, 'appDependencies')
  const textareaContents = formSelector(state, 'shortDescription')
  kintoApp = kintoApp || {}
  const isPublicDefault = isBoolean(kintoApp.isPublic)
    ? kintoApp.isPublic
    : true

  return {
    appDependencies,
    textareaContents,
    id: kintoApp.id,
    version,
    isCreate,
    isTagged,
    initialValues: {
      name: kintoApp.name,
      appDependencies: kintoApp.appDependencies,
      isPublic: isPublicDefault,
      members: kintoApp.members,
      shortDescription: kintoApp.shortDescription
    }
  }
}

function mapDispatchToProps(dispatch, { isCreate, kintoApp, version }) {
  return {
    searchKintoBlocks: q => dispatch(searchKintoBlocks(q)),
    fetchKintoBlockDependenciesData: (id, ver) =>
      dispatch(fetchKintoBlockDependenciesData(id, ver)),
    onSubmit: data => {
      if (isCreate) {
        dispatch(createKintoApp(data))
      } else {
        dispatch(updateKintoApp(kintoApp.id, version, data))
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KintoAppForm)
