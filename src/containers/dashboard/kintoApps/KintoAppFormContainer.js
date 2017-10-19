import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
import { updateKintoApp, createKintoApp } from '../../../actions/kintoApps'
import {
  searchKintoBlocks,
  fetchKintoBlockDependenciesData
} from '../../../actions/kintoBlocks'
import KintoAppForm from '../../../components/dashboard/kintoApps/KintoAppForm'

function mapStateToProps(state, { kintoApp, version }) {
  const formSelector = formValueSelector('kintoAppForm')
  const appDependencies = formSelector(state, 'appDependencies')
  kintoApp = kintoApp || {}
  return {
    initialValues: {
      name: kintoApp.name,
      appDependencies: kintoApp.appDependencies
    },
    appDependencies,
    id: kintoApp.id,
    version
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
