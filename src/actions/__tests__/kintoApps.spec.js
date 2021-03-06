import moxios from 'moxios'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import { CALL_HISTORY_METHOD } from 'react-router-redux'
import * as actions from '../kintoApps'
import { FORM_SUBMITTED } from '../pageOptions'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('KintoApps actions', () => {
  beforeEach(() => {
    moxios.install()
  })
  afterEach(() => {
    moxios.uninstall()
  })

  it('fetchKintoApp fires the kintoAppReceive action', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          data: {
            id: '1',
            name: 'test'
          },
          metadata: {}
        }
      })
    })
    const store = mockStore({ workspaces: { selectedWorkspace: '1' } })
    await store.dispatch(actions.fetchKintoApp('1', '1.1.0'))
    expect(store.getActions()).toEqual([
      {
        type: actions.RECEIVE_KINTO_APP,
        id: '1',
        data: {
          id: '1',
          name: 'test'
        },
        metadata: {}
      }
    ])
  })

  it('fetchKintoApps should redirect if there are no KintoApps', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()

      request.respondWith({
        status: 200,
        reponse: {}
      })
    })
    const store = mockStore({ workspaces: { selectedWorkspace: '1' } })
    await store.dispatch(actions.fetchKintoApps())
    expect(store.getActions().map(a => a.type)).toEqual([CALL_HISTORY_METHOD])
  })

  it('fetchKintoApps should call a receive action if there are KintoApps', async () => {
    const result = {
      data: {
        id: '1',
        name: 'Your Mum'
      }
    }
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: result
      })
    })
    const store = mockStore({
      workspaces: { selectedWorkspace: '1' }
    })
    await store.dispatch(actions.fetchKintoApps())
    expect(store.getActions()).toEqual([
      { type: actions.RECEIVE_KINTO_APPS, data: result.data }
    ])
  })

  it('fetchKintoAppDependenciesConfig should call a receive action', async () => {
    const response = {
      data: [
        {
          id: '1',
          version: {
            minor: 1,
            state: 'DRAFT'
          }
        }
      ],
      metadata: {
        dependencies: {
          '1': {
            name: 'your mum',
            type: 'KINTOBLOCK',
            description: 'some stuff',
            versions: [
              {
                minor: 1
              }
            ]
          }
        }
      }
    }
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: response
      })
    })
    const store = mockStore({ workspaces: { selectedWorkspace: '1' } })
    await store.dispatch(
      actions.fetchKintoAppDependenciesConfig('1', '0.1.0', '1')
    )
    expect(store.getActions()).toEqual([
      {
        type: actions.RECEIVE_KINTO_APP_DEPENDENCIES_CONFIG,
        id: '1',
        envId: '1',
        ver: '0.1.0',
        data: response.data
      }
    ])
  })

  it('createKintoApp should fire a form submitted action, add kintoapp and redirect upon success', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: { data: '1' }
      })
    })
    const store = mockStore({
      workspaces: { selectedWorkspace: '1' }
    })
    await store.dispatch(actions.createKintoApp({}))
    expect(store.getActions().map(a => a.type)).toEqual([
      FORM_SUBMITTED,
      actions.ADD_KINTO_APP,
      CALL_HISTORY_METHOD
    ])
  })

  it('updateKintoApp should fire a form submitted action and updateKintoApp action', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: { id: '1', version: '1.0.0' }
      })
    })
    const store = mockStore({
      workspaces: { selectedWorkspace: '1' }
    })
    await store.dispatch(actions.updateKintoApp('1', '1.0.0', {}))
    expect(store.getActions().map(a => a.type)).toEqual([
      FORM_SUBMITTED,
      actions.UPDATE_KINTO_APP
    ])
  })

  it('updateKintoApp throws if the result has errors', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: { errors: 'noop' }
      })
    })
    const store = mockStore({
      workspaces: { selectedWorkspace: '1' }
    })
    const result = store.dispatch(actions.updateKintoApp('1', '1.0.0', {}))
    await expect(result).rejects.toEqual({ errors: 'noop' })
  })

  it('updateAppDependenciesConfigData should submit a form', async () => {
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
    await store.dispatch(
      actions.updateAppDependenciesConfigData(
        '1',
        '1.0.0',
        'environmentName',
        {}
      )
    )
    expect(store.getActions().map(a => a.type)).toEqual([FORM_SUBMITTED])
  })

  it('updateAppDependenciesConfigData throw if there are errors', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: { errors: 'noop' }
      })
    })
    const store = mockStore({
      workspaces: { selectedWorkspace: '1' }
    })
    const result = store.dispatch(
      actions.updateAppDependenciesConfigData(
        '1',
        '1.0.0',
        'environmentName',
        {}
      )
    )
    await expect(result).rejects.toEqual({ errors: 'noop' })
  })

  it('getKintoAppEnvironments should fire an action to receive the kintoApp environments', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          id: '1',
          data: {
            data: {}
          }
        }
      })
    })
    const store = mockStore({
      kintoApps: { byId: {} },
      workspaces: { selectedWorkspace: '1' }
    })
    await store.dispatch(actions.getKintoAppEnvironments('1'))
    expect(store.getActions().map(a => a.type)).toEqual([
      actions.RECIEVE_KINTO_APP_ENVIRONMENTS
    ])
  })

  it('getKintoAppEnvironments should fire a redirect to kintoapps/list if the result is empty', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: { data: {} }
      })
    })
    const store = mockStore({
      workspaces: { selectedWorkspace: '1' }
    })
    await store.dispatch(actions.getKintoAppEnvironments('1'))
    expect(store.getActions().map(a => a.type)).toEqual([CALL_HISTORY_METHOD])
  })

  it('addNewEnvironment should fire an action to submit a form and receive a new environment', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: { data: {} }
      })
    })
    const store = mockStore({
      workspaces: { selectedWorkspace: '1' }
    })
    await store.dispatch(actions.addNewEnvironment('1', {}))
    expect(store.getActions().map(a => a.type)).toEqual([
      FORM_SUBMITTED,
      actions.NEW_ENVIRONMENT_RECEIVE
    ])
  })

  it('deployEnvironment should fire an action to submit a form and update the app environments and redirect the page', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: { data: {} }
      })
    })
    const store = mockStore({
      workspaces: { selectedWorkspace: '1' }
    })
    await store.dispatch(actions.deployEnvironment('1', 'envName', {}))
    expect(store.getActions().map(a => a.type)).toEqual([
      FORM_SUBMITTED,
      actions.KINTO_APP_ENVIRONMENT_UPDATE,
      CALL_HISTORY_METHOD
    ])
  })

  it('shutDownEnvironment should fire an action to submit a form, envUpdate and redirect', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: { data: {} }
      })
    })
    const store = mockStore({
      workspaces: { selectedWorkspace: '1' }
    })
    await store.dispatch(actions.shutDownEnvironment('1', 'envName', {}))
    expect(store.getActions().map(a => a.type)).toEqual([
      FORM_SUBMITTED,
      CALL_HISTORY_METHOD,
      actions.KINTO_APP_ENVIRONMENT_UPDATE
    ])
  })

  it('reorderEnvironments should dispatch an action to reorder the list', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          id: '1',
          data: {
            data: {}
          }
        }
      })
    })
    const store = mockStore({
      kintoApps: {
        byId: {
          '1': {
            version: { major: 1, minor: 2, revion: 1 },
            environments: []
          }
        }
      }
    })
    await store.dispatch(actions.reorderEnvironments('1', 1, 2))
    expect(store.getActions().map(a => a.type)).toEqual([
      actions.KINTO_APP_ENVIRONMENT_LIST_REORDER
    ])
  })

  it('updateAppEnvironment should dispatch an action to update a kintoapp environment', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          data: {
            id: '1',
            name: 'env'
          }
        }
      })
    })
    const store = mockStore({
      workspaces: { selectedWorkspace: '1' }
    })
    await store.dispatch(actions.updateAppEnvironment('1', '1', {}))
    expect(store.getActions()).toEqual([
      { type: 'FORM_SUBMITTED' },
      {
        type: 'KINTO_APP_ENVIRONMENT_UPDATE',
        id: '1',
        data: { id: '1', name: 'env' }
      }
    ])
  })
})
