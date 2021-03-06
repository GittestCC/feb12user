import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
import { updateKintoApp, createKintoApp } from '../../../actions/kintoApps'
import {
  searchKintoBlocks,
  fetchKintoBlockDependenciesData
} from '../../../actions/kintoBlocks'
import KintoAppForm from '../../../components/dashboard/kintoApps/KintoAppForm'

function mapStateToProps(state, { kintoApp, version, isCreate, isDraft }) {
  const formSelector = formValueSelector('kintoAppForm')
  const appDependencies = formSelector(state, 'appDependencies')
  const textareaContents = formSelector(state, 'shortDescription')
  kintoApp = kintoApp || {}
  const isPublicDefault = isCreate ? true : !!kintoApp.isPublic

  return {
    appDependencies,
    textareaContents,
    id: kintoApp.id,
    version,
    isCreate,
    isDraft,
    initialValues: {
      name: kintoApp.name,
      appDependencies: kintoApp.appDependencies,
      isPublic: isPublicDefault,
      memberIds: kintoApp.memberIds || [],
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
