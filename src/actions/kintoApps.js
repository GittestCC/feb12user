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
    return
  }
  dispatch(kintoAppsFetch())
  return axios.get(`/kintoapps/${id}/versions/${ver}`).then(data => {
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
