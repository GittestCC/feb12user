import { push } from 'react-router-redux'
import { SubmissionError } from 'redux-form'
import axios from 'axios'
import isEmpty from 'lodash/isEmpty'
import capitalize from 'lodash/capitalize'

import { formSubmitted } from './pageOptions'
import { pages } from '../constants/pages'
import { isBranchVersionEqual, getVersionType } from '../helpers/versionHelper'
import { isRecent } from '../helpers/dateHelper'
import { getPageUrl } from '../helpers/urlHelper'

export const FETCH_KINTO_BLOCKS = 'FETCH_KINTO_BLOCKS'
export const RECEIVE_KINTO_BLOCKS = 'RECEIVE_KINTO_BLOCKS'
export const RECEIVE_KINTO_BLOCK = 'RECEIVE_KINTO_BLOCK'
export const CREATE_TAG_KINTO_BLOCK = 'CREATE_TAG_KINTO_BLOCK'
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

export const kintoBlockCreateTag = (id, data) => ({
  type: CREATE_TAG_KINTO_BLOCK,
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
export const fetchKintoBlock = (id, ver, type) => (dispatch, getState) => {
  type = capitalize(type)
  const state = getState()
  const kintoBlock = state.kintoBlocks.byId[id]
  const version = { name: ver, type }
  if (
    kintoBlock &&
    kintoBlock.version &&
    isBranchVersionEqual(version, kintoBlock.version) &&
    kintoBlock.lastFetch &&
    isRecent(kintoBlock.lastFetch)
  ) {
    return
  }
  dispatch(kintoBlocksFetch())
  return axios
    .get(`/kintoblocks/${id}/versions/${ver}?type=${type}`)
    .then(data => {
      data.lastFetch = new Date()
      // TODO: remove below mock data after API set up
      data.workspaceId = '1'
      data.ownerId = state.auth.authSession.uid
      data.isPublic = true
      if (data.isPublic === false) {
        data.members = [
          { permission: 'Owner', id: '5a0be165af2b8e0001faa6de' },
          { permission: 'Admin', id: '1' },
          { permission: 'Editor', id: '2' },
          { permission: 'Admin', id: '3' },
          { permission: 'Editor', id: '4' },
          { permission: 'Editor', id: '5' },
          { permission: 'Editor', id: '6' }
        ]
      }
      return dispatch(kintoBlockReceive(id, data))
    })
}

export const createKintoBlockTag = (id, ver, data) => dispatch => {
  return axios
    .post(`/kintoblocks/${id}/versions/${ver}/tags`, data)
    .then(response => {
      const newKintoBlock = response.data
      dispatch(kintoBlockCreateTag(id, newKintoBlock))
      const url = getPageUrl(pages.dashboardKintoBlocksManage, {
        id: id,
        version: newKintoBlock.version.name,
        type: getVersionType(newKintoBlock.version)
      })
      dispatch(push(url))
    })
}

export const createKintoBlock = data => dispatch => {
  return axios.post('/kintoblocks/create', data).then(() => {
    dispatch(formSubmitted())
    dispatch(push('/app/dashboard/kintoblocks/list'))
  })
}

export const updateKintoBlock = (id, ver, type, data) => dispatch => {
  type = capitalize(type)
  return axios
    .put(`/kintoblocks/${id}/versions/${ver}?type=${type}`, data)
    .then(
      result => {
        dispatch(formSubmitted())
        // TODO: make sure the server returns the updated object
        dispatch(kintoBlockUpdate(id, result))
      },
      err => {
        if (err.errors) {
          throw new SubmissionError(err.errors)
        }
      }
    )
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

export const fetchKintoBlockDependenciesData = (id, ver, type) => dispatch => {
  type = capitalize(type)
  return axios
    .get(`/kintoblocks/${id}/versions/${ver}/dependencydata?type=${type}`)
    .then(result => {
      dispatch(kintoBlockReceiveDependencies(result))
      return {
        blockId: result.data.id,
        version: result.data.version
      }
    })
}
