import axios from 'axios'
import capitalize from 'lodash/capitalize'
import { getServerUrl } from '../helpers/urlHelper'
import { DOCUMENTATION, KINTOBLOCKS } from '../constants/backendMicroservices'

export const KINTO_BLOCK_DOCUMENTATION_RECEIVE =
  'KINTO_BLOCK_DOCUMENTATION_RECEIVE'
export const KINTO_BLOCK_DOCUMENTATION_ENDPOINT_RECEIVE =
  'KINTO_BLOCK_DOCUMENTATION_ENDPOINT_RECEIVE'
export const KINTO_BLOCK_DOCUMENTATION_PROTOCOL_RECEIVE =
  'KINTO_BLOCK_DOCUMENTATION_PROTOCOL_RECEIVE'
export const KINTO_BLOCK_FOR_DOCUMENTATION_RECEIVE =
  'KINTO_BLOCK_FOR_DOCUMENTATION_RECEIVE'

export const documentationReceive = (id, buildId, data) => ({
  type: KINTO_BLOCK_DOCUMENTATION_RECEIVE,
  id,
  buildId,
  data
})

export const documentationEndpointReceive = (
  id,
  buildId,
  endpointId,
  data
) => ({
  type: KINTO_BLOCK_DOCUMENTATION_ENDPOINT_RECEIVE,
  id,
  buildId,
  endpointId,
  data
})

export const documentationEndpointProtocolReceive = (
  id,
  buildId,
  endpointId,
  protocol,
  data
) => ({
  type: KINTO_BLOCK_DOCUMENTATION_PROTOCOL_RECEIVE,
  id,
  buildId,
  endpointId,
  protocol,
  data
})

export const kintoBlockForDocumentationReceive = (id, data) => ({
  type: KINTO_BLOCK_FOR_DOCUMENTATION_RECEIVE,
  id,
  data
})

export const fetchKintoBlockDocumentation = (id, buildId) => dispatch => {
  return axios
    .get(
      getServerUrl(DOCUMENTATION, `/kintoblocks/${id}/builds/${buildId}/docs`)
    )
    .then(response => {
      dispatch(documentationReceive(id, buildId, response.data))
    })
}

export const fetchKintoBlockDocumentationEndpoint = (
  id,
  buildId,
  endpointId
) => dispatch => {
  return axios
    .get(
      getServerUrl(
        DOCUMENTATION,
        `/kintoblocks/${id}/builds/${buildId}/docs/${endpointId}`
      )
    )
    .then(response => {
      dispatch(
        documentationEndpointReceive(id, buildId, endpointId, response.data)
      )
    })
}

export const fetchKintoBlockEndpointProtocol = (
  id,
  buildId,
  endpointId,
  protocol
) => dispatch => {
  const response = {
    message:
      'I am thou, thou art I... Thou hast acquired a new vow. It shall become the wings of rebellion that breaketh thy chains of captivity. With the birth of the Chariot Persona, I have obtained the winds of blessing that shall lead to freedom and new power...'
  }

  // return axios.get(getServerUrl(KINTOBLOCKS, `/kintoblocks/${id}/builds/${buildId}/docs/${endpointId}/protocols/${protocol}`)).then(response => {
  //   dispatch(documentationFetch())
  //   dispatch(documentationEndpointReceive(id, buildId, endpointId, data))
  // })

  return Promise.resolve(response).then(data => {
    dispatch(
      documentationEndpointProtocolReceive(
        id,
        buildId,
        endpointId,
        protocol,
        data
      )
    )
  })
}
export const fetchKintoBlockForDocumentation = (id, version, type) => (
  dispatch,
  getState
) => {
  const { selectedWorkspace } = getState().workspaces
  type = capitalize(type)
  return axios
    .get(
      getServerUrl(
        KINTOBLOCKS,
        `/${selectedWorkspace}/kintoblocks/${id}/versions/${version}?type=${type}`
      )
    )
    .then(response => {
      return dispatch(kintoBlockForDocumentationReceive(id, response.data))
    })
}
