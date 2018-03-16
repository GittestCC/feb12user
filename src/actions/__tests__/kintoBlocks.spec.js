import moxios from 'moxios'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import { CALL_HISTORY_METHOD } from 'react-router-redux'
import * as actions from '../kintoBlocks'
import { FORM_SUBMITTED } from '../pageOptions'
import { BRANCH, TAG } from '../../constants/version'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const now = new Date()
let secondAgo = new Date(now.getTime())
secondAgo.setSeconds(secondAgo.getSeconds() - 1)

describe('KintoBlocks actions', () => {
  beforeEach(() => {
    moxios.install()
  })
  afterEach(() => {
    moxios.uninstall()
  })

  it('fetchKintoBlocks if result is empty fire a redirect action', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {}
      })
    })
    const store = mockStore({
      workspaces: { selectedWorkspace: '1' }
    })
    await store.dispatch(actions.fetchKintoBlocks())
    expect(store.getActions().map(a => a.type)).toEqual([CALL_HISTORY_METHOD])
  })

  it('fetchKintoBlocks if result is not empty fire a kintoBlockReceive action', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          data: [
            {
              data: 'data',
              versions: [],
              version: { name: 'name', type: BRANCH }
            }
          ]
        }
      })
    })
    const store = mockStore({
      workspaces: { selectedWorkspace: '1' }
    })
    await store.dispatch(actions.fetchKintoBlocks())
    expect(store.getActions()).toEqual([
      {
        type: actions.RECEIVE_KINTO_BLOCKS,
        data: [
          {
            data: 'data',
            versions: [],
            version: { name: 'name', type: BRANCH }
          }
        ]
      }
    ])
  })

  it('fetchKintoBlock fires a receive action', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          data: {
            id: '1',
            version: {},
            versions: [],
            metadata: {
              dependencies: {
                '1': {}
              }
            }
          }
        }
      })
    })

    const store = mockStore({
      workspaces: { selectedWorkspace: '1' },
      kintoBlocks: { byId: {} }
    })

    await store.dispatch(actions.fetchKintoBlock('1', '1.3.1'))
    expect(store.getActions().map(t => t.type)).toEqual([
      actions.RECEIVE_KINTO_BLOCK
    ])
  })

  it('createKintoBlock fires a form submitted and redirect if response is a success', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: { data: { id: '1' } }
      })
    })
    const store = mockStore({
      workspaces: { selectedWorkspace: '1' }
    })
    await store.dispatch(actions.createKintoBlock({}))
    expect(store.getActions().map(a => a.type)).toEqual([
      FORM_SUBMITTED,
      actions.ADD_KINTO_BLOCK,
      CALL_HISTORY_METHOD
    ])
  })

  it("updateKintoBlock fires formsubmitted and kintoBlockUpdate actions if response doesn't have an error", async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: { id: '1', name: 'test' }
      })
    })
    const store = mockStore({
      workspaces: { selectedWorkspace: '1' }
    })
    await store.dispatch(
      actions.updateKintoBlock('1', '0.1.0', 'BRANCH', { name: 'test' })
    )
    expect(store.getActions()).toEqual([
      {
        type: FORM_SUBMITTED
      },
      {
        type: actions.UPDATE_KINTO_BLOCK,
        id: '1',
        data: {
          name: 'test'
        }
      }
    ])
  })

  it('updateKintoBlock throws if result has errors', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: { errors: 'error' }
      })
    })
    const store = mockStore({
      workspaces: { selectedWorkspace: '1' }
    })
    const result = store.dispatch(actions.updateKintoBlock('1', {}))
    await expect(result).rejects.toEqual({ errors: 'error' })
  })

  it('createKintoBlockTag fires a create version and redirect actions on success', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          data: { id: 1, name: 'test', version: { name: 'new', type: BRANCH } }
        }
      })
    })
    const store = mockStore({
      workspaces: { selectedWorkspace: '1' }
    })
    await store.dispatch(actions.createKintoBlockTag(1, {}))
    expect(store.getActions().map(a => a.type)).toEqual([
      actions.CREATE_TAG_KINTO_BLOCK,
      CALL_HISTORY_METHOD
    ])
  })

  it('createKintoBlockTag throws if result has errors', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: { errors: 'error' }
      })
    })
    const store = mockStore({
      workspaces: { selectedWorkspace: '1' }
    })
    const result = store.dispatch(
      actions.createKintoBlockTag('1', { errors: 'error' })
    )
    await expect(result).rejects.toEqual({ errors: 'error' })
  })

  it('fetchKintoBlockDependenciesData fires kintoBlockReceiveDependencies actions and returns processed object', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          data: { id: '1', name: 'test', version: '1.3.1' },
          metadata: []
        }
      })
    })
    const store = mockStore({
      workspaces: { selectedWorkspace: '1' }
    })
    const result = await store.dispatch(
      actions.fetchKintoBlockDependenciesData('1', '1.3.1')
    )
    expect(result).toEqual({ blockId: '1', version: '1.3.1' })
    expect(store.getActions()).toEqual([
      {
        type: actions.RECEIVE_KINTO_BLOCK_DEPENDENCIES,
        data: { id: '1', name: 'test', version: '1.3.1' },
        metadata: []
      }
    ])
  })

  it("refreshCommits doesn't fire any action if type is TAG", async () => {
    const store = mockStore({ workspaces: {} })
    await store.dispatch(actions.refreshCommits('1', '1.3.1', TAG))
    expect(store.getActions()).toEqual([])
  })

  it('refreshCommits fires kintoBlockUpdateBuilds when its successful', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          data: { id: '1' }
        }
      })
    })
    const store = mockStore({
      workspaces: { selectedWorkspace: '1' }
    })
    await store.dispatch(actions.refreshCommits('1', '1.3.1', BRANCH))
    expect(store.getActions()).toEqual([
      {
        type: actions.UPDATE_BUILDS_KINTO_BLOCK,
        id: '1',
        data: { id: '1' }
      }
    ])
  })
})
