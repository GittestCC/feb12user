import moxios from 'moxios'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import * as actions from '../currentUser'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('currentUser actions', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('fetchCurrentUser when is successful fires currentUserReceiveInfo action', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: { data: { id: 1 } }
      })
    })
    const store = mockStore()
    await store.dispatch(actions.fetchCurrentUser())
    expect(store.getActions()).toEqual([
      {
        type: actions.RECEIVE_CURRENT_USER_INFO,
        data: { id: 1 }
      }
    ])
  })
})