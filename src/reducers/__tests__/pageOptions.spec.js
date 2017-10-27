import { LOCATION_CHANGE } from 'react-router-redux'
import { change } from 'redux-form'
import pages from '../../constants/pages'
import reducer from '../pageOptions'

const mockRedirectAction = url => ({
  type: LOCATION_CHANGE,
  payload: { pathname: url }
})

describe('PageOptions Reducer', () => {
  it('location change will set activePage to kintoAppsList and isDashboard true if the url was for kintoapps list', () => {
    const result = reducer(
      undefined,
      mockRedirectAction('/app/dashboard/kintoapps/list')
    )
    expect(result).toEqual({
      isDashboard: true,
      canSave: false,
      activePage: pages.dashboardKintoAppsList
    })
  })

  it('location change will set isDashboard to false if page starts with marketplace url', () => {
    const result = reducer(undefined, mockRedirectAction('/app/marketplace'))
    expect(result).toEqual({
      isDashboard: false,
      canSave: false,
      activePage: null
    })
  })

  it('form change event changes canSave to true when form is inside forms constants and inside the correct active page', () => {
    const changeResult = change('kintoBlockCreateForm', 'field', true)
    const result = reducer(
      { canSave: false, activePage: pages.dashboardBlockCreate },
      changeResult
    )
    expect(result.canSave).toEqual(true)
  })

  it('form change event will not change canSave when form is not inside forms constants', () => {
    const changeResult = change('incorrect', 'field', true)
    const result = reducer(
      { canSave: false, activePage: pages.dashboardBlockCreate },
      changeResult
    )
    expect(result.canSave).toEqual(false)
  })

  it('form change event will not change canSave when active page is incorrect', () => {
    const changeResult = change('kintoBlockCreateForm', 'field', true)
    const result = reducer(
      { canSave: false, activePage: 'incorrect' },
      changeResult
    )
    expect(result.canSave).toEqual(false)
  })
})
