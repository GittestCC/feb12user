import axios from 'axios'
import { push } from 'react-router-redux'
import { formSubmitted } from './pageOptions'
import { WORKSPACES } from '../constants/backendMicroservices'
import { pages } from '../constants/pages'
import { getPageUrl } from '../helpers/urlHelper'
import { getServerUrl } from '../helpers/urlHelper'

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

export const workspaceReceive = (id, data, isAdd) => ({
  type: RECEIVE_WORKSPACE,
  id,
  data,
  isAdd: !!isAdd
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

export const fetchWorkspace = id => dispatch => {
  return axios.get(getServerUrl(WORKSPACES, `/workspaces/${id}`)).then(res => {
    //TODO: remove when the server is returning username
    if (res.data.members) {
      res.data.members.forEach(m => {
        if (!m.userName) {
          m.userName = 'not set'
        }
      })
    }
    dispatch(workspaceReceive(id, res.data))
  })
}

export const fetchWorkspaces = () => dispatch => {
  dispatch(workspacesFetch())
  return axios.get(getServerUrl(WORKSPACES, '/workspaces')).then(response => {
    const workspaces = response.data || []
    workspaces.forEach(w => {
      w.services = [
        {
          service: 'MONGO_DB'
        }
      ]
    })
    dispatch(workspacesReceive(response.data || []))
  })
}

export const createWorkspace = data => (dispatch, getState) => {
  // self is added automatically, remove it from members
  const currentUserId = getState().currentUser.id
  const updatedData = {
    ...data,
    members: data.members.filter(m => m.id !== currentUserId)
  }
  return axios
    .post(getServerUrl(WORKSPACES, '/workspaces'), updatedData)
    .then(response => {
      const newWorkspaceId = response.data.id
      dispatch(formSubmitted())
      dispatch(workspaceReceive(response.data.id, response.data, true))
      dispatch(push(getPageUrl(pages.workspaceEdit, { id: newWorkspaceId })))
      dispatch(fetchWorkspaces()) //TODO: backend issue, workspaces has to be reloaded inorder to add session data
    })
}

export const updateWorkspace = (id, data) => dispatch => {
  return axios
    .put(getServerUrl(WORKSPACES, `/workspaces/${id}`), data)
    .then(response => {
      dispatch(formSubmitted())
      dispatch(workspaceReceive(id, response.data))
    })
}

export const toggleService = (service, isActive) => (dispatch, getState) => {
  const { selectedWorkspace } = getState().workspaces
  return axios
    .put(
      getServerUrl(WORKSPACES, `/workspaces/${selectedWorkspace}/services`),
      {
        service,
        isActive
      }
    )
    .then(res => {
      dispatch(serviceReceive(selectedWorkspace, res.data))
    })
}

export const connectGithub = (workspaceId, githubToken) => () => {
  return axios.put(
    getServerUrl(WORKSPACES, `/workspaces/${workspaceId}/github/connect`),
    {
      code: githubToken
    }
  )
}

export const searchRepositories = query => (dispatch, getState) => {
  const workspaces = getState().workspaces
  const organizations =
    workspaces.byId[workspaces.selectedWorkspace].organizations || []
  if (!organizations.length) {
    // TODO: show error message
    return Promise.reject()
  }
  const organizationIds = organizations.map(o => o.id).join(',')

  return axios
    .get(
      getServerUrl(
        WORKSPACES,
        `/workspaces/${
          workspaces.selectedWorkspace
        }/repositories?name=${query}&orgId=${organizationIds}&limit=10`
      ),
      { noSpinner: true }
    )
    .then(response => ({
      options: response.data.map(repo => {
        const organization = organizations.find(o => o.id === repo.orgId)
        return {
          label: `${organization.name} / ${repo.name}`,
          value: repo.id,
          orgId: repo.orgId
        }
      })
    }))
}
