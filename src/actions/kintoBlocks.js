import { push } from 'react-router-redux'
import axios from 'axios'
import isEmpty from 'lodash/isEmpty'
import capitalize from 'lodash/capitalize'

import { pages } from '../constants/pages'
import { KINTOBLOCKS } from '../constants/backendMicroservices'
import { TAG } from '../constants/version'
import { getVersionType } from '../helpers/versionHelper'
import { getPageUrl, getServerUrl } from '../helpers/urlHelper'

import { formSubmitted } from './pageOptions'

export const RECEIVE_KINTO_BLOCKS = 'RECEIVE_KINTO_BLOCKS'
export const RECEIVE_KINTO_BLOCK = 'RECEIVE_KINTO_BLOCK'
export const ADD_KINTO_BLOCK = 'ADD_KINTO_BLOCK'
export const CREATE_TAG_KINTO_BLOCK = 'CREATE_TAG_KINTO_BLOCK'
export const RECEIVE_KINTO_BLOCK_DEPENDENCIES =
  'RECEIVE_KINTO_BLOCK_DEPENDENCIES'
export const UPDATE_KINTO_BLOCK = 'UPDATE_KINTO_BLOCK'
export const UPDATE_BUILDS_KINTO_BLOCK = 'UPDATE_BUILDS_KINTO_BLOCK'

export const kintoBlockUpdate = (id, data) => ({
  type: UPDATE_KINTO_BLOCK,
  id,
  data
})

export const kintoBlockUpdateBuilds = (id, data) => ({
  type: UPDATE_BUILDS_KINTO_BLOCK,
  id,
  data
})

export const kintoBlocksReceive = (data, metadata) => ({
  type: RECEIVE_KINTO_BLOCKS,
  data,
  metadata
})

export const kintoBlockReceiveDependencies = response => ({
  type: RECEIVE_KINTO_BLOCK_DEPENDENCIES,
  data: response.data,
  metadata: response.metadata
})

export const kintoBlockReceive = (id, data, metadata) => ({
  type: RECEIVE_KINTO_BLOCK,
  id,
  data,
  metadata
})

export const kintoBlockAdd = (id, data) => ({ type: ADD_KINTO_BLOCK, id, data })

export const kintoBlockCreateTag = (id, data) => ({
  type: CREATE_TAG_KINTO_BLOCK,
  id,
  data
})

export const fetchKintoBlocks = () => (dispatch, getState) => {
  const { selectedWorkspace } = getState().workspaces
  const kintoBlockCreateUrl = getPageUrl(pages.dashboardKintoBlocksCreate, {
    workspaceId: selectedWorkspace
  })
  return axios
    .get(getServerUrl(KINTOBLOCKS, `/${selectedWorkspace}/kintoblocks`))
    .then(response => {
      if (isEmpty(response) || isEmpty(response.data)) {
        dispatch(push(kintoBlockCreateUrl))
      } else {
        dispatch(kintoBlocksReceive(response.data, response.metadata))
      }
    })
}

export const fetchKintoBlock = (id, ver, type) => (dispatch, getState) => {
  const { selectedWorkspace } = getState().workspaces
  type = capitalize(type)
  return axios
    .get(
      getServerUrl(
        KINTOBLOCKS,
        `/${selectedWorkspace}/kintoblocks/${id}/versions/${ver}?type=${type}`
      )
    )
    .then(response => {
      return dispatch(kintoBlockReceive(id, response.data, response.metadata))
    })
}

export const createKintoBlockTag = (id, ver, data) => (dispatch, getState) => {
  const { selectedWorkspace } = getState().workspaces
  return axios
    .post(
      getServerUrl(
        KINTOBLOCKS,
        `/${selectedWorkspace}/kintoblocks/${id}/versions/${ver}/tags`
      ),
      data
    )
    .then(response => {
      const newKintoBlock = response.data
      dispatch(kintoBlockCreateTag(id, newKintoBlock))
      const url = getPageUrl(pages.dashboardKintoBlocksManage, {
        id,
        workspaceId: selectedWorkspace,
        version: newKintoBlock.version.name,
        type: getVersionType(newKintoBlock.version)
      })
      dispatch(push(url))
    })
}

export const createKintoBlock = data => (dispatch, getState) => {
  const { selectedWorkspace } = getState().workspaces
  const kintoBlockListUrl = getPageUrl(pages.dashboardKintoBlocksList, {
    workspaceId: selectedWorkspace
  })
  return axios
    .post(getServerUrl(KINTOBLOCKS, `/${selectedWorkspace}/kintoblocks`), data)
    .then(response => {
      dispatch(formSubmitted())
      dispatch(kintoBlockAdd(response.data.id, response.data))
      dispatch(push(kintoBlockListUrl))
    })
}

export const updateKintoBlock = (id, ver, type, data) => (
  dispatch,
  getState
) => {
  const { selectedWorkspace } = getState().workspaces
  type = capitalize(type)
  return axios
    .put(
      getServerUrl(
        KINTOBLOCKS,
        `/${selectedWorkspace}/kintoblocks/${id}/versions/${ver}?type=${type}`
      ),
      data
    )
    .then(() => {
      dispatch(formSubmitted())
      // TODO: make sure the server returns the updated object
      // dispatch(kintoBlockUpdate(id, response))
      dispatch(kintoBlockUpdate(id, { name: data.name }))
    })
}

export const searchKintoBlocks = q => (dispatch, getState) => {
  const { selectedWorkspace } = getState().workspaces
  return axios
    .get(
      getServerUrl(
        KINTOBLOCKS,
        `/${selectedWorkspace}/kintoblocks/search?name=${q}&limit=10`
      ),
      { noSpinner: true }
    )
    .then(response => {
      return {
        options: response.results.map(k => ({
          ...k,
          label: k.name
        }))
      }
    })
}

export const fetchKintoBlockDependenciesData = (id, ver, type) => (
  dispatch,
  getState
) => {
  const { selectedWorkspace } = getState().workspaces
  type = capitalize(type)
  return axios
    .get(
      getServerUrl(
        KINTOBLOCKS,
        `/${selectedWorkspace}/kintoblocks/${id}/versions/${ver}/dependencydata?type=${type}`
      )
    )
    .then(response => {
      dispatch(kintoBlockReceiveDependencies(response))
      return {
        blockId: response.data.id,
        version: response.data.version
      }
    })
}

export const refreshCommits = (id, version, type) => (dispatch, getState) => {
  const { selectedWorkspace } = getState().workspaces
  if (type === TAG) return
  return axios
    .post(
      getServerUrl(
        KINTOBLOCKS,
        `/${selectedWorkspace}/kintoblocks/${id}/versions/${version}/refreshBuilds?type=${type}`
      )
    )
    .then(response => {
      dispatch(kintoBlockUpdateBuilds(id, response.data))
    })
}
