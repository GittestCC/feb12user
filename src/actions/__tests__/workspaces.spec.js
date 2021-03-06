import thunk from 'redux-thunk'
import moxios from 'moxios'
import { CALL_HISTORY_METHOD } from 'react-router-redux'
import configureStore from 'redux-mock-store'
import * as actions from '../workspaces'
import { FORM_SUBMITTED, SHOW_ERROR_PAGE } from '../pageOptions'
import { REFRESH_PAGE } from '../../constants/errorPageTypes'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('workspaces actions', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('fetchWorkspaces fires the workspaces fetch function, and the workspaces receive action', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {}
      })
    })
    const store = mockStore()
    await store.dispatch(actions.fetchWorkspaces())
    expect(store.getActions().map(a => a.type)).toEqual([
      actions.FETCH_WORKSPACES,
      actions.RECEIVE_WORKSPACES
    ])
  })

  it('fetchWorkspaces fires showErrorPage with refresh page type when request fails', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 400,
        response: {}
      })
    })
    const store = mockStore()
    await store.dispatch(actions.fetchWorkspaces())
    expect(store.getActions()).toEqual([
      { type: actions.FETCH_WORKSPACES },
      { type: SHOW_ERROR_PAGE, errorType: REFRESH_PAGE }
    ])
  })

  it('createWorkspace fires an formSubmitted and redirect actions', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: { data: { id: '1' } }
      })
    })
    const store = mockStore({ currentUser: { id: '1' } })
    await store.dispatch(actions.createWorkspace({ members: [] }))
    expect(store.getActions().map(a => a.type)).toEqual([
      FORM_SUBMITTED,
      actions.RECEIVE_WORKSPACE,
      CALL_HISTORY_METHOD,
      actions.FETCH_WORKSPACES // TODO we call get all workspaces as a hack for backend
    ])
  })

  it('updateWorkspace fires  formSubmitted and workspaceReceive actions from what is coming from the server', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: { data: { name: 'name' } }
      })
    })
    const store = mockStore()
    await store.dispatch(actions.updateWorkspace('1', { name: 'name' }))
    expect(store.getActions()).toEqual([
      { type: FORM_SUBMITTED },
      {
        type: actions.RECEIVE_WORKSPACE,
        id: '1',
        data: { name: 'name' },
        isAdd: false
      }
    ])
  })
})
