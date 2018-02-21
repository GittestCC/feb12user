import axios from 'axios'
import { getServerUrl } from '../helpers/urlHelper'

import { formSubmitted } from './pageOptions'
import { WORKSPACES } from '../constants/backendMicroservices'

export const FETCH_WORKSPACES = 'FETCH_WORKSPACES'
export const RECEIVE_WORKSPACES = 'RECEIVE_WORKSPACES'
export const RECEIVE_WORKSPACE = 'RECEIVE_WORKSPACE'
export const SELECT_WORKSPACE = 'SELECT_WORKSPACE'
export const RECEIVE_SERVICE = 'RECEIVE_SERVICE'

export const workspacesFetch = () => ({ type: FETCH_WORKSPACES })

export const workspaceSelect = id => ({
  type: SELECT_WORKSPACE,
  id
})

export const workspaceReceive = (id, data) => ({
  type: RECEIVE_WORKSPACE,
  id,
  data
})

export const workspacesReceive = data => ({
  type: RECEIVE_WORKSPACES,
  data
})

export const serviceReceive = (id, data) => ({
  type: RECEIVE_SERVICE,
  id,
  data
})

export const fetchWorkspace = id => (dispatch, getState) => {
  const state = getState()
  const response = {
    data: {
      id,
      name: `Test Workspace ${id}`,
      organizations: [
        { name: 'weyland-yutani', id: '1' },
        { name: 'tyrell-corporation', id: '2' },
        { name: 'wallace', id: '3' }
      ],
      members: [
        {
          role: 'ADMIN',
          username: 'Super',
          email: 'super@gmail.com',
          id: state.auth.authSession.uid
        },
        {
          role: 'MEMBER',
          username: 'Oranges',
          email: 'yourOrange@gmail.com',
          id: '1'
        },
        {
          role: 'MEMBER',
          username: 'SolidAbs92',
          email: 'Raven@gmail.com',
          id: '2'
        },
        {
          role: 'MEMBER',
          username: 'DisturbinG',
          email: 'Joseph@gmail.com',
          id: '3'
        },
        {
          role: 'ADMIN',
          username: 'FanFanSausageMan',
          email: 'FanFan@gmail.com',
          id: '4'
        },
        {
          role: 'ADMIN',
          username: 'Neferititi',
          email: 'Naedeem@gmail.com',
          id: '5'
        },
        {
          role: 'ADMIN',
          username: 'Banana',
          email: 'Banana@gmail.com',
          id: '6'
        },
        {
          role: 'MEMBER',
          username: 'Pineapple',
          email: 'Pineapple@gmail.com',
          id: '7'
        }
      ]
    }
  }
  return Promise.resolve(response).then(res => {
    dispatch(workspaceReceive(id, res.data))
  })
}

export const fetchWorkspaces = () => (dispatch, getState) => {
  const response = {
    data: [
      {
        id: '1',
        name: 'Test Workspace 1',
        services: [
          {
            service: 'MONGO_DB',
            isActive: true
          },
          {
            service: 'MESSAGE_PASSING',
            isActive: false
          },
          {
            service: 'SHARED_MEMORY',
            isActive: false
          },
          {
            service: 'KIBANA',
            isActive: true,
            serviceUrl: 'https://www.google.com.hk'
          },
          {
            service: 'PROMETHEUS',
            isActive: false
          },
          {
            service: 'ZIPKIN',
            isActive: false
          }
        ]
      },
      {
        id: '2',
        name: 'Test Workspace 2',
        services: [
          {
            service: 'MONGO_DB',
            isActive: true,
            serviceUrl: 'https://www.google.com.hk'
          },
          {
            service: 'MESSAGE_PASSING',
            isActive: false,
            serviceUrl: 'https://www.google.com.hk'
          },
          {
            service: 'SHARED_MEMORY',
            isActive: false,
            serviceUrl: 'https://www.google.com.hk'
          },
          {
            service: 'KIBANA',
            isActive: true,
            serviceUrl: 'https://www.google.com.hk'
          },
          {
            service: 'PROMETHEUS',
            isActive: false,
            serviceUrl: 'https://www.google.com.hk'
          },
          {
            service: 'ZIPKIN',
            isActive: false,
            serviceUrl: 'https://www.google.com.hk'
          }
        ]
      }
    ]
  }
  dispatch(workspacesFetch())
  return Promise.resolve(response).then(res => {
    dispatch(workspacesReceive(res.data))
  })
}

export const createWorkspace = data => dispatch => {
  //TODO: Api integration
  return Promise.resolve().then(() => {
    dispatch(formSubmitted())
  })
}

export const updateWorkspace = (id, data) => dispatch => {
  return Promise.resolve({ data }).then(res => {
    dispatch(formSubmitted())
    dispatch(workspaceReceive(id, res.data))
  })
}

export const toggleService = (service, isActive) => (dispatch, getState) => {
  const workspaces = getState().workspaces
  const workspaceId = workspaces.selectedWorkspace
  // TODO: enable comments when API is ready
  // return axios.put(
  //   getServerUrl(
  //     WORKSPACES,
  //     `/${workspaceId}/services/toggleServices/${service}`
  //   )
  // )
  return Promise.resolve({
    data: {
      service: service,
      isActive: isActive,
      serviceUrl: 'https://www.google.com'
    }
  }).then(res => {
    dispatch(serviceReceive(workspaceId, res.data))
  })
}

export const connectGithub = (workspaceId, githubToken) => () => {
  return axios.put(getServerUrl(WORKSPACES, `/${workspaceId}/github/connect`), {
    code: githubToken
  })
}

export const searchRepositories = query => (dispatch, getState) => {
  const workspaces = getState().workspaces
  const organizations =
    workspaces.byId[workspaces.selectedWorkspace].organizations || []
  if (!organizations.length) {
    // TODO: show error message
    return Promise.reject()
  }
  /* TODO when api is done
    const organizationIds = organizations.map(o => o.id).join(',')
    const requestPromise = axios.get(
    `/${workspaceId}/repositories?name=${query}&orgId=${organizationIds}`)
   */
  return Promise.resolve({
    data: [
      {
        orgName: 'weyland-yutani',
        orgId: '1',
        repoName: 'bioweapons-division',
        repoId: '1'
      },
      {
        orgName: 'tyrell-corporation',
        orgId: '2',
        repoName: 'replicant-program',
        repoId: '2'
      },
      {
        orgName: 'wallace',
        orgId: '3',
        repoName: 'bladerunner-prototype',
        repoId: '3'
      }
    ]
  }).then(response => ({
    options: response.data.map(repo => ({
      label: `${repo.orgName} / ${repo.repoName}`,
      value: repo.repoId,
      orgId: repo.orgId
    }))
  }))
}
