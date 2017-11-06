import reducer from '../kintoApps'
import isArray from 'lodash/isArray'

import * as actions from '../../actions/kintoApps'

const mockStore = {
  byId: {
    '1': {
      id: '1',
      name: 'OriginalStore',
      yourMum: true
    },
    '2': {
      id: '2',
      name: 'OriginalStore2'
    }
  },
  allIds: ['1', '2']
}

describe('kintoApps Reducer', () => {
  it('kintoAppsFetch changes state isFetching from false to true', () => {
    const newState = reducer(undefined, actions.kintoAppsFetch())
    expect(newState.isFetching).toBe(true)
  })

  it('kintoAppsReceive changes the state is fetching to false', () => {
    const sampleResponseData = {
      data: [
        {
          id: '1'
        }
      ]
    }

    const newState = reducer(
      undefined,
      actions.kintoAppsReceive(sampleResponseData)
    )
    expect(newState.isFetching).toBe(false)
  })

  it('kintoAppsReceive should store allIds as an array', () => {
    const sampleResponseData = {
      data: [
        {
          id: '1'
        }
      ]
    }

    const newState = reducer(
      undefined,
      actions.kintoAppsReceive(sampleResponseData)
    )
    expect(isArray(newState.allIds)).toBe(true)
  })

  it('kintoAppsReceive should update the list of KintoApps allIds in the store, and replace what was there', () => {
    const kintoAppsMockState = {
      allIds: ['666', '777'],
      byId: {}
    }

    const sampleResponseData = {
      data: [
        {
          id: 'abc'
        }
      ]
    }

    const newState = reducer(
      kintoAppsMockState,
      actions.kintoAppsReceive(sampleResponseData)
    )

    expect(newState.allIds[0]).toBe('abc')
    expect(newState.allIds.length).toBe(1)
  })

  it('kintoAppsReceive merges environments with existing entities', () => {
    const oldState = {
      allIds: ['1'],
      byId: {
        '1': {
          id: '1',
          detailed: true,
          environments: [{ id: '2', detailed: true }]
        }
      }
    }

    const newState = reducer(
      oldState,
      actions.kintoAppsReceive({
        data: [
          {
            id: '1',
            environments: [{ id: '2', simple: true }]
          }
        ]
      })
    )

    const stateEnvironment = newState.byId['1'].environments[0]
    expect(stateEnvironment).toEqual({
      id: '2',
      detailed: true,
      simple: true
    })
  })

  it('kintoAppReceive should update the correct KintoApp in the byId object, and leave the other items unchanged', () => {
    const sampleSingleResponseData = {
      data: {
        id: '1',
        name: 'SingleApp',
        sausages: true
      }
    }
    const newState = reducer(
      mockStore,
      actions.kintoAppReceive('1', sampleSingleResponseData)
    )
    expect(newState.byId['1'].name).toBe('SingleApp')
    expect(newState.byId['2'].name).toBe('OriginalStore2')
  })

  it('kintoAppReceive merges existing kintoApp with the received entity', () => {
    const oldState = {
      byId: {
        '1': {
          name: 'old app',
          simple: true
        }
      },
      allIds: ['1']
    }
    const newState = reducer(
      oldState,
      actions.kintoAppReceive('1', {
        data: {
          id: '1',
          name: 'app',
          detailed: true
        }
      })
    )

    expect(newState.byId['1']).toEqual({
      id: '1',
      name: 'app',
      simple: true,
      detailed: true
    })
  })

  it('kintoAppEnvironmentsReceive should set isFetching to false', () => {
    const environmentsResponse = {
      data: [
        {
          id: '1'
        }
      ]
    }

    const newState = reducer(
      undefined,
      actions.kintoAppEnvironmentsReceive('1', environmentsResponse)
    )

    expect(newState.isFetching).toBe(false)
  })

  it('kintoAppEnvironmentsReceive should add an object containing all environments belonging to a single kintoApp to the store', () => {
    const kintoAppMockState = {
      byId: {
        '20': {
          id: '20',
          name: 'KintoApp'
        }
      }
    }

    const environmentsResponse = {
      data: [
        {
          id: '1',
          name: 'EnvironmentName'
        },
        {
          id: '2',
          name: 'Sausages'
        }
      ]
    }

    const newState = reducer(
      kintoAppMockState,
      actions.kintoAppEnvironmentsReceive('1', environmentsResponse)
    )

    expect(newState.byId['1'].environments[0].name).toBe('EnvironmentName')
    expect(newState.byId['1'].environments.length).toBe(2)
  })

  it('kintoAppEnvironmentsReceive should override the list of environments currently in the store', () => {
    const environmentMockState = {
      byId: {
        '20': {
          id: '20',
          name: 'kintocloud',
          environments: [
            {
              id: '1',
              name: 'original_environment'
            },
            {
              id: '2',
              name: 'original_environment2'
            },
            {
              id: '3',
              name: 'original_environment3'
            }
          ]
        }
      }
    }

    const environmentsResponse = {
      data: [
        {
          id: '1',
          name: 'EnvironmentName'
        },
        {
          id: '2',
          name: 'Sausages'
        }
      ]
    }

    const newState = reducer(
      environmentMockState,
      actions.kintoAppEnvironmentsReceive('1', environmentsResponse)
    )

    expect(newState.byId['1'].environments[0].name).toBe('EnvironmentName')
    expect(newState.byId['1'].environments.length).toBe(2)
  })

  it('kintoAppEnvironmentListReorder should change the order of environments belonging to a single app in the store', () => {
    const environmentMockState = {
      byId: {
        '20': {
          id: '20',
          name: 'kintocloud',
          environments: [
            {
              id: '1',
              name: 'FIRST_ENVIRONMENT'
            },
            {
              id: '2',
              name: 'SECOND_ENVIRONMENT'
            }
          ]
        }
      }
    }

    const newState = reducer(
      environmentMockState,
      actions.kintoAppEnvironmentListReorder('20', 0, 1)
    )

    expect(newState.byId['20'].environments[0].name).toBe('SECOND_ENVIRONMENT')
  })

  it('newEnvironmentReceive should add a new environment to the array of environments belonging to a KintoApp in the store', () => {
    const environmentMockState = {
      byId: {
        '20': {
          id: '20',
          name: 'kintocloud',
          environments: [
            {
              id: '1',
              name: 'FIRST_ENVIRONMENT'
            },
            {
              id: '2',
              name: 'SECOND_ENVIRONMENT'
            }
          ]
        }
      }
    }

    const sampleSingleResponseData = {
      data: {
        id: '1',
        name: 'NewEnvironment'
      }
    }

    const newState = reducer(
      environmentMockState,
      actions.newEnvironmentReceive('20', sampleSingleResponseData)
    )

    expect(newState.byId['20'].environments.length === 3)
  })

  // it
  // .skip
  // // 'updateAppEnvironment should update the app environment belonging to a single KintoApp in the store',
  // // () => {
  // //   const newState = reducer(
  // //     environmentMockState,
  // //     actions.updateAppEnvironment('20', environmentsResponse)
  // //   )
  // // TODO: I want to get what the server returns to write this test but the server is broken. going to pause here for now.
  // //   expect(newState.byId['20'].environments[1].name).toBe('PROD')
  // // }
})
