import keyBy from 'lodash/keyBy'

import reducer from '../kintoBlocks'
import * as actions from '../../actions/kintoBlocks'

const simpleBlocks = [
  { id: '1', name: 'first', simple: true },
  { id: '2', name: 'second', simple: true }
]
const detailedBlock = {
  id: '1',
  name: 'first',
  detailed: true
}

describe('KintoBlocks Reducer', () => {
  it('receiveKintoBlocks reset allIds with the new ids', () => {
    const newState = reducer(
      { byId: {}, allIds: ['3', '4'] },
      actions.kintoBlocksReceive({ blocks: simpleBlocks })
    )
    expect(newState.allIds).toEqual(['1', '2'])
  })

  it('receiveKintoBlocks merges byId data for received entities', () => {
    const newState = reducer(
      {
        byId: { '1': { special: 'one' }, '2': { special: 'two' } },
        allIds: ['1', '2']
      },
      actions.kintoBlocksReceive({ blocks: simpleBlocks })
    )
    expect(newState.byId['1']).toEqual({
      id: '1',
      name: 'first',
      simple: true,
      special: 'one'
    })
    expect(newState.byId['2']).toEqual({
      id: '2',
      name: 'second',
      simple: true,
      special: 'two'
    })
  })

  it('receiveKintoBlock add a new entity if there is no fetched kintoblocks', () => {
    const newState = reducer(
      undefined,
      actions.kintoBlockReceive('1', detailedBlock)
    )
    expect(newState.byId['1']).toEqual(detailedBlock)
  })

  it('receiveKintoBlock merges existing kintoblock with the new one', () => {
    const newState = reducer(
      {
        byId: keyBy(simpleBlocks, 'id'),
        allIds: ['1', '2']
      },
      actions.kintoBlockReceive('1', detailedBlock)
    )
    expect(newState.byId['1']).toEqual({
      id: '1',
      name: 'first',
      simple: true,
      detailed: true
    })
  })

  it('kintoBlockUpdate merges result with existing kintoblock', () => {
    const newState = reducer(
      {
        byId: keyBy(simpleBlocks, 'id'),
        allIds: ['1', '2']
      },
      actions.kintoBlockUpdate('1', detailedBlock)
    )
    expect(newState.byId['1']).toEqual({
      id: '1',
      name: 'first',
      simple: true,
      detailed: true
    })
  })
})
