import { formSubmitted } from './pageOptions'

export const FETCH_WORKSPACES = 'FETCH_WORKSPACES'
export const RECEIVE_WORKSPACES = 'RECEIVE_WORKSPACES'
export const SELECT_WORKSPACE = 'SELECT_WORKSPACE'

export const workspacesFetch = () => ({ type: FETCH_WORKSPACES })

export const workspaceSelect = id => ({
  type: SELECT_WORKSPACE,
  id
})

export const workspacesReceive = response => ({
  type: RECEIVE_WORKSPACES,
  data: response.data
})

export const fetchWorkspaces = () => (dispatch, getState) => {
  const state = getState()
  const response = {
    data: [
      {
        id: '1',
        name: 'Test Workspace One',
        members: [
          {
            permission: 'Member',
            username: 'Super',
            email: 'super@gmail.com',
            id: state.auth.authSession.uid
          },
          {
            permission: 'Member',
            username: 'SolidAbs92',
            email: 'Raven@gmail.com',
            id: '2'
          },
          {
            permission: 'Member',
            username: 'DisturbinG',
            email: 'Joseph@gmail.com',
            id: '3'
          },
          {
            permission: 'Admin',
            username: 'FanFanSausageMan',
            email: 'FanFan@gmail.com',
            id: '4'
          },
          {
            permission: 'Admin',
            username: 'Neferititi',
            email: 'Naedeem@gmail.com',
            id: '5'
          },
          {
            permission: 'Admin',
            username: 'Banana',
            email: 'Banana@gmail.com',
            id: '6'
          },
          {
            permission: 'Member',
            username: 'Pineapple',
            email: 'Pineapple@gmail.com',
            id: '7'
          },
          {
            permission: 'Member',
            username: 'Oranges',
            email: 'yourOrange@gmail.com',
            id: '8'
          }
        ]
      },
      {
        id: '2',
        name: 'Test Workspace Two',
        members: [
          {
            permission: 'Member',
            username: 'Super',
            email: 'super@gmail.com',
            id: state.auth.authSession.uid
          },
          {
            permission: 'Member',
            username: 'nines',
            email: 'Nine_S@gmail.com',
            id: '2'
          },
          {
            permission: 'Member',
            username: 'killTheMachines',
            email: 'killthemachines@gmail.com',
            id: '3'
          },
          {
            permission: 'Admin',
            username: 'TheOperator',
            email: 'support@gmail.com',
            id: '4'
          },
          {
            permission: 'Admin',
            username: 'Jackazz',
            email: 'EatMyMackrelPlease@gmail.com',
            id: '5'
          }
        ]
      }
    ]
  }
  dispatch(workspacesFetch())
  return Promise.resolve(response).then(result => {
    dispatch(workspacesReceive(result))
  })
}

export const createWorkspace = data => dispatch => {
  //TODO: Api integration
  return Promise.resolve().then(() => {
    dispatch(formSubmitted())
  })
}

export const updateWorkspace = (id, data) => dispatch => {
  const updateData = {
    data: [
      {
        id: '1',
        name: 'updatedWorkspace'
      }
    ]
  }
  return Promise.resolve(updateData).then(result => {
    dispatch(formSubmitted())
  })
}
