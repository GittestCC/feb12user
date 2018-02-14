import axios from 'axios'
import capitalize from 'lodash/capitalize'
import { getServerUrl } from '../helpers/urlHelper'
import { KINTOBLOCKS } from '../constants/backendMicroservices'

export const KINTO_BLOCK_DOCUMENTATION_RECEIVE =
  'KINTO_BLOCK_DOCUMENTATION_RECEIVE'
export const KINTO_BLOCK_DOCUMENTATION_ENDPOINT_RECEIVE =
  'KINTO_BLOCK_DOCUMENTATION_ENDPOINT_RECEIVE'
export const KINTO_BLOCK_DOCUMENTATION_PROTOCOL_RECEIVE =
  'KINTO_BLOCK_DOCUMENTATION_PROTOCOL_RECEIVE'
export const FETCH_DOCUMENTATION = 'FETCH_DOCUMENTATION'
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

export const documentationFetch = () => ({
  type: FETCH_DOCUMENTATION
})

export const fetchKintoBlockDocumentation = (id, buildId) => dispatch => {
  const response = [
    {
      id: '111',
      type: 'GET',
      url: 'workspaces/:id/github/connect'
    },
    {
      id: '222',
      type: 'PUT',
      url: 'yourmumsplace/:id/github/connect'
    },
    {
      id: '333',
      type: 'POST',
      url: 'yourcousinsplace/super-long/link/here/:id/github/connect'
    },
    {
      id: '444',
      type: 'DELETE',
      url: 'yoursistersplace/:id/github/connect'
    },
    {
      id: '555',
      type: 'PUT',
      url: 'yourbrothersplace/:id/github/connect'
    },
    {
      id: '666',
      type: 'POST',
      url: 'yourdadsplace/:id/github/connect'
    }
  ]

  // return axios.get(getServerUrl(KINTOBLOCKS, `/kintoblocks/${id}/builds/${buildId}/docs`)).then(response => {
  //   dispatch(documentationFetch())
  //   dispatch(documentationReceive(id, buildId, data))
  // })

  dispatch(documentationFetch())
  return Promise.resolve(response).then(data => {
    dispatch(documentationReceive(id, buildId, data))
  })
}

export const fetchKintoBlockDocumentationEndpoint = (
  id,
  buildId,
  endpointId
) => dispatch => {
  const response = {
    id: endpointId,
    type: 'PUT',
    url: 'mockdata/workspaces/:id/github/connect',
    title: "Sets github connect's access token to the specific workspace",
    name: 'ConnectGithubToWorkspace',
    header: {
      session: [
        {
          type: 'String',
          optional: false,
          field: 'AuthBlock-Account-Id',
          description: "Session's account id"
        },
        {
          type: 'String',
          optional: true,
          field: 'YourMums-Account-Id',
          description: "Your mum's session id"
        },
        {
          type: 'String',
          optional: false,
          field: 'YourDads-Account-Id.is.here',
          description: "Your Dad's sesson id is here"
        }
      ],
      exposedSession: [
        {
          type: 'String',
          field: 'Workspace-Id',
          description: "Session's account id"
        },
        {
          type: 'Object',
          field: 'this.is.the.Partyspace-Id',
          description: "Session's account id"
        },
        {
          type: 'Banana',
          field: 'Ravespace-Id',
          description: "Session's account id"
        },
        {
          type: 'Sausage',
          field: 'Mosh-space-Id.woah',
          description: "Session's account id"
        }
      ]
    },
    parameter: {
      url: [
        {
          type: 'String',
          optional: false,
          field: 'id',
          description: 'Specified workspace id'
        }
      ],
      body: [
        {
          type: 'String',
          optional: false,
          field: 'tokenId',
          description: 'Token id used to register to github'
        }
      ],
      query: [
        {
          type: 'String',
          optional: false,
          field: 'tokenId',
          description: 'Token id used to register to github'
        }
      ]
    },
    error: [
      {
        statusCode: '400',
        response: [
          {
            type: 'Object',
            description: 'Error object container',
            field: 'data',
            optional: false
          },
          {
            type: 'String',
            optional: false,
            field: 'data',
            description: 'No permissions to perform this action on workspaces'
          }
        ]
      }
    ],
    success: [
      {
        statusCode: '200',
        response: [
          {
            type: 'Object',
            field: 'data',
            description: 'Workspaces attached to the account id'
          },
          {
            type: 'String',
            optional: false,
            field: 'data.name.sausages',
            description: 'Dummy name for example'
          }
        ]
      },
      {
        statusCode: '200',
        response: [
          {
            type: 'Object',
            optional: false,
            field: 'data',
            description: 'Workspaces attached to the account id'
          },
          {
            type: 'String',
            optional: false,
            field: 'data.name',
            description: 'Dummy name for example'
          }
        ]
      },
      {
        statusCode: '300',
        response: [
          {
            type: 'Object',
            optional: true,
            field: 'data',
            description: 'Workspaces attached to the account id'
          },
          {
            type: 'String',
            optional: true,
            field: 'data.name',
            description: 'Dummy name for example'
          }
        ]
      }
    ]
  }

  //   dispatch(documentationFetch())
  // return axios.get(getServerUrl(KINTOBLOCKS, `/kintoblocks/${id}/builds/${buildId}/docs/${endpointId}`)).then(response => {
  //   dispatch(documentationEndpointReceive(id, buildId, endpointId, data))
  // })

  dispatch(documentationFetch())
  return Promise.resolve(response).then(data => {
    dispatch(documentationEndpointReceive(id, buildId, endpointId, data))
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
  type = capitalize(type)
  const state = getState()
  return axios
    .get(
      getServerUrl(
        KINTOBLOCKS,
        `/kintoblocks/${id}/versions/${version}?type=${type}`
      )
    )
    .then(response => {
      // TODO: remove more mock data here
      response.lastFetch = new Date()
      response.workspaceId = '1'
      response.ownerId = state.auth.authSession.uid
      response.isPublic = true
      response.members = ['1', '2', '3', '4', '5']
      response.version.buildId = '1'
      return dispatch(kintoBlockForDocumentationReceive(id, response))
    })
}
