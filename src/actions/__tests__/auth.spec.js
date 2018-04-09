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

  it('signUp fires a redirect when its a success', async () => {
    await moxios.wait(async () => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {}
      })
    })
    const store = mockStore()
    await store.dispatch(actions.signUp({}))
    expect(store.getActions().map(a => a.type)).toEqual([CALL_HISTORY_METHOD])
  })

  it('logIn fires a redirect and login actions', async () => {
    authHelper.setIsLoggedIn = jest.fn()
    await moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {}
      })
    })
    const store = mockStore()
    await store.dispatch(actions.logIn())
    expect(store.getActions().map(a => a.type)).toEqual([
      actions.LOGIN,
      CALL_HISTORY_METHOD
    ])
  })

  it('logIn user got an error that he is logged in will auth and login again ', async () => {
    authHelper.setToken = jest.fn()
    authHelper.setIsLoggedIn = jest.fn()
    await moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 400,
        response: {
          error: 'Cannot login when already logged in!'
        }
      })
      moxios.stubRequest(/.+\/auth/, {
        status: 200,
        response: { data: { token: '1' } }
      })
    })
    const store = mockStore()
    await store.dispatch(actions.logIn())
    expect(store.getActions().map(a => a.type)).toEqual([
      actions.UPDATE_TOKEN,
      actions.LOGIN,
      CALL_HISTORY_METHOD
    ])
  })

  it('authApp fires an updateToken action if the setting was successful', async () => {
    authHelper.setToken = jest.fn()

    await moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: { data: { token: '1' } }
      })
    })

    const store = mockStore()
    await store.dispatch(actions.authApp())
    expect(store.getActions()).toEqual([
      {
        type: actions.UPDATE_TOKEN,
        token: '1'
      }
    ])
  })
})
