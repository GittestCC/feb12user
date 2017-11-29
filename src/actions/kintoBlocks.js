import { push } from 'react-router-redux'
import { SubmissionError } from 'redux-form'
import axios from 'axios'
import isEmpty from 'lodash/isEmpty'

import { formSubmitted } from './pageOptions'
import { pages } from '../constants/pages'
import {
  getManageUrlForKintoBlock,
  isVersionEqual
} from '../helpers/versionHelper'
import { isRecent } from '../helpers/dateHelper'
import { getPageUrl } from '../helpers/urlHelper'

export const FETCH_KINTO_BLOCKS = 'FETCH_KINTO_BLOCKS'
export const RECEIVE_KINTO_BLOCKS = 'RECEIVE_KINTO_BLOCKS'
export const RECEIVE_KINTO_BLOCK = 'RECEIVE_KINTO_BLOCK'
export const CREATE_VERSION_KINTO_BLOCK = 'CREATE_VERSION_KINTO_BLOCK'
export const RECEIVE_KINTO_BLOCK_DEPENDENCIES =
  'RECEIVE_KINTO_BLOCK_DEPENDENCIES'
export const UPDATE_KINTO_BLOCK = 'UPDATE_KINTO_BLOCK'

export const kintoBlockUpdate = (id, data) => ({
  type: UPDATE_KINTO_BLOCK,
  id,
  data
})

export const kintoBlocksFetch = () => ({ type: FETCH_KINTO_BLOCKS })
export const kintoBlocksReceive = data => ({
  type: RECEIVE_KINTO_BLOCKS,
  data
})

export const kintoBlockReceiveDependencies = data => ({
  type: RECEIVE_KINTO_BLOCK_DEPENDENCIES,
  data: data.data,
  metadata: data.metadata
})

export const kintoBlockReceive = (id, data) => {
  const { metadata } = data
  delete data.metadata
  return {
    type: RECEIVE_KINTO_BLOCK,
    id,
    data,
    metadata
  }
}

export const kintoBlockCreateVersion = (id, data) => ({
  type: CREATE_VERSION_KINTO_BLOCK,
  id,
  data
})

export const fetchKintoBlocks = () => dispatch => {
  dispatch(kintoBlocksFetch())
  return axios.get('/kintoblocks/all').then(result => {
    if (isEmpty(result) || isEmpty(result.blocks)) {
      dispatch(push(getPageUrl(pages.dashboardKintoBlocksCreate)))
    } else {
      dispatch(kintoBlocksReceive(result.blocks))
    }
  })
}

// checks if the last fetched kintoblock has the same ver and is fetched recently
// if that is the case, then don't do anything
export const fetchKintoBlock = (id, ver) => (dispatch, getState) => {
  const state = getState()
  const kintoBlock = state.kintoBlocks.byId[id]
  if (
    kintoBlock &&
    kintoBlock.version &&
    isVersionEqual(ver, kintoBlock.version) &&
    kintoBlock.lastFetch &&
    isRecent(kintoBlock.lastFetch)
  ) {
    return
  }
  dispatch(kintoBlocksFetch())
  return axios.get(`/kintoblocks/${id}/versions/${ver}`).then(data => {
    data.name = data.metadata.dependencies[data.id].name
    data.lastFetch = new Date()
    return dispatch(kintoBlockReceive(id, data))
  })
}

export const createKintoBlock = data => dispatch => {
  return axios.post('/kintoblocks/create', data).then(() => {
    dispatch(formSubmitted())
    dispatch(push('/app/dashboard/kintoblocks/list'))
  })
}

export const updateKintoBlock = (id, ver, data) => dispatch => {
  return axios.put(`/kintoblocks/${id}/versions/${ver}`, data).then(result => {
    if (result.errors) {
      throw new SubmissionError(result.errors)
    }
    dispatch(formSubmitted())
    // TODO: make sure the server returns the updated object
    dispatch(kintoBlockUpdate(id, result))
  })
}

export const createVersionKintoBlock = (id, data) => dispatch => {
  return axios.post(`/kintoblocks/${id}/versions`, data).then(result => {
    if (result.errors) {
      throw new SubmissionError(result.errors)
    }
    dispatch(kintoBlockCreateVersion(id, result.newVersion))
    dispatch(push(getManageUrlForKintoBlock(id, data.version)))
  })
}

export const searchKintoBlocks = q => () => {
  return axios.get(`/kintoblocks/search?name=${q}&limit=10`).then(result => {
    return {
      options: result.results.map(k => ({
        ...k,
        label: k.name
      }))
    }
  })
}

export const fetchKintoBlockDependenciesData = (id, ver) => dispatch => {
  return axios
    .get(`/kintoblocks/${id}/versions/${ver}/dependencydata`)
    .then(result => {
      dispatch(kintoBlockReceiveDependencies(result))
      return {
        blockId: result.data.id,
        version: result.data.version
      }
    })
}
