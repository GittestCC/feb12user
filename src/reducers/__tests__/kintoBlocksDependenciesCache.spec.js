import reducer from '../kintoBlocksDependenciesCache'
import isEmpty from 'lodash/isEmpty'

import * as actions from '../../actions/kintoApps'
import * as kbActions from '../../actions/kintoBlocks'
import { workspaceSelect } from '../../actions/workspaces'

const sampleResponseData = {
  metadata: {
    dependencies: {
      '1': {
        name: 'test'
      }
    }
  }
}

describe('KintoBlocksDependenciesCache Reducer', () => {
  it('kintoAppsReceive saves metadata if the response has it', () => {
    const newState = reducer(
      undefined,
      actions.kintoAppsReceive(sampleResponseData)
    )
    expect(newState['1'].name).toBe('test')
  })

  it("kintoAppsReceive doesn't save anything if there is no metadata", () => {
    const responseData = {}
    const newState = reducer(undefined, actions.kintoAppsReceive(responseData))
    expect(isEmpty(newState)).toBe(true)
  })

  it('kintoAppReceive saves metadata if the response has it', () => {
    const newState = reducer(
      undefined,
      actions.kintoAppReceive('1', {}, sampleResponseData.metadata)
    )
    expect(newState['1'].name).toBe('test')
  })

  it('kintoBlockReceiveDependencies saves metadata if the response has it', () => {
    const newState = reducer(
      undefined,
      kbActions.kintoBlockReceiveDependencies(sampleResponseData)
    )
    expect(newState['1'].name).toBe('test')
  })

  it('kintoBlockReceive saves metadata if the response has it', () => {
    const newState = reducer(
      undefined,
      kbActions.kintoBlockReceive('1', {}, sampleResponseData.metadata)
    )
    expect(newState['1'].name).toBe('test')
  })

  it('selectWorkspace removes all cache', () => {
    const oldState = {
      '1': { data: 'test' }
    }
    const newState = reducer(oldState, workspaceSelect('1'))
    expect(newState).toEqual({})
  })
})
