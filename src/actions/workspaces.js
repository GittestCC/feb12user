import { formSubmitted } from './pageOptions'

export const FETCH_WORKSPACES = 'FETCH_WORKSPACES'
export const RECEIVE_WORKSPACES = 'RECEIVE_WORKSPACES'
export const RECEIVE_WORKSPACE = 'RECEIVE_WORKSPACE'
export const SELECT_WORKSPACE = 'SELECT_WORKSPACE'

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

export const fetchWorkspace = id => (dispatch, getState) => {
  const state = getState()
  const response = {
    data: {
      id,
      name: `Test Workspace ${id}`,
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
        name: 'Test Workspace 1'
      },
      {
        id: '2',
        name: 'Test Workspace 2'
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
