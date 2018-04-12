import { LOCATION_CHANGE } from 'react-router-redux'
import { change } from 'redux-form'
import { pages } from '../../constants/pages'
import { getPageUrl } from '../../helpers/urlHelper'
import reducer from '../pageOptions'
import * as kintoAppActions from '../../actions/kintoApps'
import * as kintoBlockActions from '../../actions/kintoBlocks'
import * as pageOptionsActions from '../../actions/pageOptions'

const mockRedirectAction = url => ({
  type: LOCATION_CHANGE,
  payload: { pathname: url }
})

describe('PageOptions Reducer', () => {
  it('location change will set activePage to kintoAppsList and isDashboard true if the url was for kintoapps list', () => {
    const result = reducer(
      undefined,
      mockRedirectAction(
        getPageUrl(pages.dashboardKintoAppsList, { workspaceId: 1 })
      )
    )
    expect(result).toEqual({
      isDashboard: true,
      canSave: false,
      scrollToError: false,
      activePage: pages.dashboardKintoAppsList
    })
  })

  it('location change will set isDashboard to false if page starts with marketplace url', () => {
    const result = reducer(undefined, mockRedirectAction('/app/marketplace'))
    expect(result).toEqual({
      isDashboard: false,
      canSave: false,
      activePage: null,
      scrollToError: false
    })
  })

  it('location change always sets canSave/scrollToError to false', () => {
    const result = reducer(
      { canSave: true, scrollToError: true },
      mockRedirectAction(
        getPageUrl(pages.dashboardKintoAppsList, { workspaceId: 1 })
      )
    )
    expect(result).toEqual({
      isDashboard: true,
      canSave: false,
      scrollToError: false,
      activePage: pages.dashboardKintoAppsList
    })
  })

  it('form change event changes canSave to true when form is inside forms constants and inside the correct active page', () => {
    const changeResult = change('kintoBlockCreateForm', 'field', true)
    const result = reducer(
      { canSave: false, activePage: pages.dashboardKintoBlocksCreate },
      changeResult
    )
    expect(result.canSave).toEqual(true)
  })

  it('form change event will not change canSave when form is not inside forms constants', () => {
    const changeResult = change('incorrect', 'field', true)
    const result = reducer(
      { canSave: false, activePage: pages.dashboardKintoBlocksCreate },
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

  it('kintoapp receive will update the selectedKintoAppId to the received kintoapp id', () => {
    const result = reducer(
      { selectedKintoAppId: '1' },
      kintoAppActions.kintoAppReceive('2', {})
    )
    expect(result.selectedKintoAppId).toEqual('2')
  })

  it('environment select will update the selectedEnvironmentId to the one being selected from the action', () => {
    const result = reducer(
      { selectedEnvironmentId: '1' },
      pageOptionsActions.environmentSelect('3')
    )
    expect(result.selectedEnvironmentId).toEqual('3')
  })

  it('kintoblock receive will update the selectedKintoAppId to the received kintoapp id', () => {
    const result = reducer(
      { selectedKintoBlockId: '1' },
      kintoBlockActions.kintoBlockReceive('4', {})
    )
    expect(result.selectedKintoBlockId).toEqual('4')
  })

  it('show notification should set notification object values', () => {
    const result = reducer(
      undefined,
      pageOptionsActions.showNotification('error', 'message')
    )
    expect(result.notification.type).toEqual('error')
    expect(result.notification.message).toEqual('message')
    expect(result.notification.isShown).toEqual(true)
  })

  it('close notification should set the notification object isShown to false', () => {
    const result = reducer(undefined, pageOptionsActions.closeNotificaton())
    expect(result.notification.isShown).toEqual(false)
  })

  it('show loading spinner should set the loadingSpinner object values', () => {
    const result = reducer(undefined, pageOptionsActions.showSpinner('message'))
    expect(result.loadingSpinner.isShown).toEqual(true)
    expect(result.loadingSpinner.message).toEqual('message')
  })

  it('hide loading spinner should set the loadingSpinner object isShown to false', () => {
    const result = reducer(undefined, pageOptionsActions.hideSpinner())
    expect(result.loadingSpinner.isShown).toEqual(false)
  })

  it('showErrorRefreshPage should set isErrorRefreshPageShown to true', () => {
    const result = reducer(undefined, pageOptionsActions.showErrorPage('ERROR'))
    expect(result.errorPageType).toEqual('ERROR')
  })
})
