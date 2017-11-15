import reducer from '../workspaces'

import * as actions from '../../actions/workspaces'

describe('workspaces reducer', () => {
  it('workspacesFetch changes the state isFetching from false to true', () => {
    const newState = reducer(undefined, actions.workspacesFetch())
    expect(newState.isFetching).toBe(true)
  })

  it('workspacesReceive changes the state is fetching to false', () => {
    const sampleResponseData = {
      data: [
        {
          id: '1',
          name: 'test'
        }
      ]
    }
    const newState = reducer(
      undefined,
      actions.workspacesReceive(sampleResponseData)
    )
    expect(newState.isFetching).toBe(false)
  })

  it('workspacesReceive should add ids to the store under allIds, and add the object to the store under byId', () => {
    const sampleResponseData = {
      data: [
        {
          id: '1',
          name: 'test'
        }
      ]
    }
    const newState = reducer(
      undefined,
      actions.workspacesReceive(sampleResponseData)
    )
    expect(newState.allIds).toEqual(['1'])
    expect(newState.byId).toEqual({ '1': { id: '1', name: 'test' } })
  })
})
