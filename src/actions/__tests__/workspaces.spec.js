// actions test
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import * as actions from '../workspaces'
import { FORM_SUBMITTED } from '../pageOptions'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('workspaces actions', () => {
  it('fetchWorkspaces fires the workspaces fetch function, and the workspaces receive action', async () => {
    const store = mockStore()
    await store.dispatch(actions.fetchWorkspaces())
    expect(store.getActions().map(a => a.type)).toEqual([
      actions.FETCH_WORKSPACES,
      actions.RECEIVE_WORKSPACES
    ])
  })

  it('createWorkspace fires an formSubmitted action', async () => {
    const store = mockStore()
    await store.dispatch(actions.createWorkspace())
    expect(store.getActions()).toEqual([{ type: FORM_SUBMITTED }])
  })

  it('updateWorkspace fires  formSubmitted action', async () => {
    const store = mockStore()
    await store.dispatch(actions.updateWorkspace())
    expect(store.getActions()).toEqual([{ type: FORM_SUBMITTED }])
  })
})
