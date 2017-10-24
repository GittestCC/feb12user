import moxios from 'moxios'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import { CALL_HISTORY_METHOD } from 'react-router-redux'
import * as actions from '../kintoBlocks'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('KintoBlocks actions', () => {
  beforeEach(() => moxios.install())
  afterEach(() => moxios.uninstall())

  it('kintoBlockReceive extracts metadata', () => {
    const result = actions.kintoBlockReceive(1, {
      id: 1,
      metadata: { name: 'test' }
    })
    expect(result.data.id).toBe(1)
    expect(result.data.metadata).toBe(undefined)
  })

  it('fetchKintoBlocks if result is empty fire a redirect action', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {}
      })
    })
    const store = mockStore()
    await store.dispatch(actions.fetchKintoBlocks())
    expect(store.getActions().map(a => a.type)).toEqual([
      actions.FETCH_KINTO_BLOCKS,
      CALL_HISTORY_METHOD
    ])
  })

  it('fetchKintoBlocks if result is not empty fire a kintoBlockReceive action', async () => {
    const result = { blocks: [] }
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: result
      })
    })
    const store = mockStore()
    await store.dispatch(actions.fetchKintoBlocks())
    expect(store.getActions()).toEqual([
      { type: actions.FETCH_KINTO_BLOCKS },
      { type: actions.RECEIVE_KINTO_BLOCKS, data: result }
    ])
  })

  it('fetchKintoBlock fires a receive action', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          id: '1',
          metadata: {
            dependencies: {
              '1': {}
            }
          }
        }
      })
    })
    const store = mockStore({ kintoBlocks: { byId: {} } })
    await store.dispatch(actions.fetchKintoBlock('1', '1.3.1'))
    expect(store.getActions().map(t => t.type)).toEqual([
      actions.FETCH_KINTO_BLOCKS,
      actions.RECEIVE_KINTO_BLOCK
    ])
  })

  it('fetchKintoBlock process metadata for name and send it in the receive action', async () => {
    const TEST_NAME = 'Test KintoBlock'
    const metadata = {
      dependencies: {
        '1': { name: TEST_NAME }
      }
    }
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          id: '1',
          otherInfo: 'otherInfo',
          metadata
        }
      })
    })
    const store = mockStore({ kintoBlocks: { byId: {} } })
    await store.dispatch(actions.fetchKintoBlock('1', '1.3.1'))
    expect(store.getActions()).toEqual([
      { type: actions.FETCH_KINTO_BLOCKS },
      {
        type: actions.RECEIVE_KINTO_BLOCK,
        id: '1',
        metadata,
        data: {
          id: '1',
          name: TEST_NAME,
          otherInfo: 'otherInfo'
        }
      }
    ])
  })

  it('fetchKintoBlock if item was recently fetched nothing is fired', async () => {
    let secondAgo = new Date()
    secondAgo.setSeconds(secondAgo.getSeconds() - 1)
    const store = mockStore({
      kintoBlocks: {
        byId: {
          '1': {
            name: 'test',
            version: { major: 1, minor: 3, revision: 1 },
            lastFetch: secondAgo
          }
        }
      }
    })
    await store.dispatch(actions.fetchKintoBlock('1', '1.3.1'))
    expect(store.getActions()).toEqual([])
  })

  it('fetchKintoBlock if item fetched was recent with a different version, will still fetch', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          id: '1',
          metadata: {
            dependencies: {
              '1': {}
            }
          }
        }
      })
    })
    let secondAgo = new Date()
    secondAgo.setSeconds(secondAgo.getSeconds() - 1)
    const store = mockStore({
      kintoBlocks: {
        byId: {
          '1': {
            name: 'test',
            version: { major: 1, minor: 3, revision: 2 },
            lastFetch: secondAgo
          }
        }
      }
    })
    await store.dispatch(actions.fetchKintoBlock('1', '1.3.1'))
    expect(store.getActions().map(t => t.type)).toEqual([
      actions.FETCH_KINTO_BLOCKS,
      actions.RECEIVE_KINTO_BLOCK
    ])
  })
})
