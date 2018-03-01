import reducer from '../currentUser'
import * as actions from '../../actions/currentUser'

describe('Auth Reducer', () => {
  it('currentUserReceiveInfo sets isBasicLoaded', () => {
    const result = reducer(undefined, actions.currentUserReceiveInfo({}))
    expect(result.isBasicLoaded).toBe(true)
  })

  it('currentUserReceiveInfo sets the payload', () => {
    const result = reducer(
      undefined,
      actions.currentUserReceiveInfo({ id: '1', name: 'test' })
    )
    expect(result.id).toBe('1')
    expect(result.name).toBe('test')
  })
})
