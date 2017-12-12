import { SubmissionError } from 'redux-form'
import { push } from 'react-router-redux'
import axios from 'axios'
import isEmpty from 'lodash/isEmpty'

import { formSubmitted } from './pageOptions'
import {
  isVersionEqual,
  getManageUrlForKintoApp
} from '../helpers/versionHelper'
import { isRecent } from '../helpers/dateHelper'

export const FETCH_KINTO_APPS = 'FETCH_KINTO_APPS'
export const RECEIVE_KINTO_APPS = 'RECEIVE_KINTO_APPS'
export const RECEIVE_KINTO_APP = 'RECEIVE_KINTO_APP'
export const CREATE_VERSION_KINTO_APP = 'CREATE_VERSION_KINTO_APP'
export const RECIEVE_KINTO_APP_ENVIRONMENTS = 'RECIEVE_KINTO_APP_ENVIRONMENTS'
export const RECEIVE_KINTO_APP_DEPENDENCIES_CONFIG =
  'RECEIVE_KINTO_APP_DEPENDENCIES_CONFIG'
export const NEW_ENVIRONMENT_RECEIVE = 'NEW_ENVIRONMENT_RECEIVE'
export const KINTO_APP_ENVIRONMENT_UPDATE = 'KINTO_APP_ENVIRONMENT_UPDATE'
export const KINTO_APP_ENVIRONMENT_LIST_REORDER =
  'KINTO_APP_ENVIRONMENT_LIST_REORDER'

export const kintoAppCreateVersion = (id, data) => ({
  type: CREATE_VERSION_KINTO_APP,
  id,
  data
})

export const kintoAppsFetch = () => ({ type: FETCH_KINTO_APPS })

export const kintoAppsReceive = data => ({
  type: RECEIVE_KINTO_APPS,
  data: data.data,
  metadata: data.metadata
})

export const kintoAppReceive = (id, data) => ({
  type: RECEIVE_KINTO_APP,
  id,
  data: data.data,
  metadata: data.metadata
})

export const kintoAppEnvironmentsReceive = (id, data) => ({
  type: RECIEVE_KINTO_APP_ENVIRONMENTS,
  id,
  data: data.data
})

export const kintoAppDependenciesConfigReceive = (id, ver, envId, data) => ({
  type: RECEIVE_KINTO_APP_DEPENDENCIES_CONFIG,
  id,
  envId,
  ver,
  data
})

export const kintoAppEnvironmentListReorder = (id, oldIndex, newIndex) => ({
  type: KINTO_APP_ENVIRONMENT_LIST_REORDER,
  id,
  oldIndex: oldIndex,
  newIndex: newIndex
})

export const newEnvironmentReceive = (id, data) => ({
  type: NEW_ENVIRONMENT_RECEIVE,
  id,
  data: data.data
})

export const appEnvironmentUpdate = (id, result) => ({
  type: KINTO_APP_ENVIRONMENT_UPDATE,
  id,
  data: result.data
})

export const fetchKintoApp = (id, ver) => (dispatch, getState) => {
  const state = getState()
  const kintoApp = state.kintoApps.byId[id]
  if (
    kintoApp &&
    kintoApp.version &&
    isVersionEqual(ver, kintoApp.version) &&
    kintoApp.lastFetch &&
    isRecent(kintoApp.lastFetch)
  ) {
    return Promise.resolve()
  }
  dispatch(kintoAppsFetch())
  return axios.get(`/kintoapps/${id}/versions/${ver}`).then(data => {
    if (data.data) {
      data.data.lastFetch = new Date()
      // TODO: remove below mock data after API set up
      data.data.workspaceId = '1'
      data.data.ownerId = state.auth.authSession.uid
      data.data.isPublic = true
      if (data.data.isPublic === false) {
        data.data.members = [
          { permission: 'Owner', id: '5a0be165af2b8e0001faa6de' },
          { permission: 'Admin', id: '1' },
          { permission: 'Editor', id: '2' },
          { permission: 'Admin', id: '3' },
          { permission: 'Editor', id: '4' },
          { permission: 'Editor', id: '5' },
          { permission: 'Editor', id: '6' }
        ]
      }
    }
    return dispatch(kintoAppReceive(id, data))
  })
}

export const fetchKintoApps = () => dispatch => {
  dispatch(kintoAppsFetch())
  return axios.get('/kintoapps/all').then(result => {
    if (isEmpty(result.data)) {
      dispatch(push('/app/dashboard/kintoapps/create'))
    } else {
      dispatch(kintoAppsReceive(result))
    }
  })
}

export const fetchKintoAppDependenciesConfig = (id, ver, envId) => dispatch => {
  return axios
    .get(`/kintoapps/${id}/versions/${ver}/config/${envId}`)
    .then(response => {
      //TODO: a server side fix for initing params to empty array
      response.data.forEach(i => {
        if (!i.params) {
          i.params = []
        }
      })
      dispatch(kintoAppDependenciesConfigReceive(id, ver, envId, response.data))
    })
}

export const createVersionKintoApp = (id, data) => dispatch => {
  return axios.post(`/kintoapps/${id}/versions`, data).then(result => {
    if (result.errors) {
      throw new SubmissionError(result.errors)
    }
    dispatch(kintoAppCreateVersion(id, result.newVersion))
    dispatch(push(getManageUrlForKintoApp(id, data.version)))
  })
}

export const createKintoApp = data => dispatch => {
  return axios.post('/kintoapps/create', data).then(() => {
    dispatch(formSubmitted())
    dispatch(push('/app/dashboard/kintoapps/list'))
  })
}

export const updateKintoApp = (id, ver, data) => dispatch => {
  return axios.put(`/kintoapps/${id}/versions/${ver}`, data).then(result => {
    dispatch(formSubmitted())
    dispatch(push(`/app/dashboard/kintoapps/${id}/versions/${ver}`))
  })
}

export const updateAppDependenciesConfigData = (
  id,
  ver,
  env,
  data
) => dispatch => {
  return axios
    .put(`/kintoapps/${id}/versions/${ver}/config/${env}`, data)
    .then(result => {
      if (result.errors) {
        throw new SubmissionError(result.errors)
      }
      dispatch(formSubmitted())
    })
}

export const getKintoAppEnvironments = id => dispatch => {
  dispatch(kintoAppsFetch())
  return axios.get(`/kintoapps/${id}/environments`).then(result => {
    if (isEmpty(result.data)) {
      dispatch(push('/app/dashboard/kintoapps/list'))
    } else {
      dispatch(kintoAppEnvironmentsReceive(id, result))
    }
  })
}

export const addNewEnvironment = (id, data) => dispatch => {
  dispatch(kintoAppsFetch())
  return axios.post(`/kintoapps/${id}/environments`, data).then(result => {
    dispatch(formSubmitted())
    dispatch(newEnvironmentReceive(id, result))
  })
}

export const deployEnvironment = (id, data, envName) => dispatch => {
  dispatch(kintoAppsFetch())
  return axios
    .put(`/kintoapps/${id}/environments/${envName}/deploy`, data)
    .then(result => {
      dispatch(formSubmitted())
      dispatch(appEnvironmentUpdate(id, result))
    })
}

export const updateAppEnvironment = (id, envId, data) => dispatch => {
  dispatch(kintoAppsFetch())
  //TODO: Add API call when ready
  return Promise.resolve({ data: { ...data, id: envId } }).then(result => {
    dispatch(formSubmitted())
    dispatch(appEnvironmentUpdate(id, result))
  })
}

export const cancelDeployment = id => dispatch => {
  // the API does not have this functionality yet
  dispatch(kintoAppsFetch())
  dispatch(push(`/app/dashboard/kintoapps/${id}/environments`))
}

export const shutDownEnvironment = (id, envName, data) => dispatch => {
  dispatch(kintoAppsFetch())
  return axios
    .put(`/kintoapps/${id}/environments/${envName}/shutdown`, data)
    .then(() => {
      dispatch(formSubmitted())
      dispatch(push(`/app/dashboard/kintoapps/${id}/environments`))
    })
}

export const reorderEnvironments = (id, oldIndex, newIndex) => (
  dispatch,
  getState
) => {
  dispatch(kintoAppsFetch())
  dispatch(kintoAppEnvironmentListReorder(id, oldIndex, newIndex))
  const state = getState()
  const sortedEnvironmentsIds = state.kintoApps.byId[id].environments.map(
    e => e.id
  )
  return axios.put(`/kintoapps/${id}/environments/order`, {
    data: sortedEnvironmentsIds
  })
}
