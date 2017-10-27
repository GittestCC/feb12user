import reducer from '../auth'
import * as actions from '../../actions/auth'
import * as authHelper from '../../helpers/authHelper'

describe('Auth Reducer', () => {
  it('tokenUpdateInfo updates the state to whatever is passed', () => {
    const result = reducer(undefined, actions.tokenUpdateInfo({ auth: true }))
    expect(result.auth).toBe(true)
  })
  it('logout removes existing state', () => {
    authHelper.setToken = jest.fn()
    const result = reducer({ auth: true }, actions.logout())
    expect(result).toEqual({})
  })
})
