import moxios from 'moxios'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import { CALL_HISTORY_METHOD } from 'react-router-redux'
import * as actions from '../auth'
import * as authHelper from '../../helpers/authHelper'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('Auth actions', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('signUp calls the callback function on success', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {}
      })
      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: {}
        })
      })
    })
    const store = mockStore()
    const mockCallback = jest.fn()
    await store.dispatch(actions.signUp({}, mockCallback))
    expect(mockCallback.mock.calls.length).toBe(1)
  })

  it('logIn fires a redirect action', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {}
      })
    })
    const store = mockStore()
    await store.dispatch(actions.logIn())
    expect(store.getActions().map(a => a.type)).toEqual([CALL_HISTORY_METHOD])
  })

  it('setToken fires a update token info action if the setting was successful', async () => {
    const setMock = jest.fn()
    setMock.mockReturnValue(true)
    authHelper.setToken = setMock

    const getMock = jest.fn()
    getMock.mockReturnValue({ auth: true })
    authHelper.getTokenInfoFromLocalStorage = getMock

    const store = mockStore()
    await store.dispatch(actions.setToken())
    expect(store.getActions()).toEqual([
      { type: actions.TOKEN_UPDATE_INFO, data: { auth: true } }
    ])
  })

  it('setToken will not fire any action if setting was unsuccessful', async () => {
    const setMock = jest.fn()
    setMock.mockReturnValue(false)
    authHelper.setToken = setMock

    const store = mockStore()
    await store.dispatch(actions.setToken())
    expect(store.getActions()).toEqual([])
  })
})
