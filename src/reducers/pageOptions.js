import { actionTypes } from 'redux-form'
import { LOCATION_CHANGE } from 'react-router-redux'
import { getActivePageKey } from '../helpers/pageHelper'
import {
  FORM_SUBMITTED,
  SELECT_ENVIRONMENT,
  SELECT_ENVIRONMENT_RELEASE,
  SELECT_KINTOAPP,
  SELECT_BREADCRUMB_WORKSPACE,
  CLOSE_NOTIFICATION,
  SHOW_NOTIFICATION,
  SHOW_LOADING_SPINNER,
  HIDE_LOADING_SPINNER
} from '../actions/pageOptions'
import {
  RECEIVE_KINTO_APP,
  RECIEVE_KINTO_APP_ENVIRONMENTS,
  KINTO_APP_ENVIRONMENT_LOG_UPDATE
} from '../actions/kintoApps'
import { RECEIVE_KINTO_BLOCK } from '../actions/kintoBlocks'
import forms from '../constants/forms'

export default function pageOptions(state = {}, action) {
  switch (action.type) {
    // TODO: fix caching requests (not firing a request, this will not update)
    // TODO: fix when a request is happening hide the old data
    case RECEIVE_KINTO_APP:
    case RECIEVE_KINTO_APP_ENVIRONMENTS:
      return {
        ...state,
        selectedKintoAppId: action.id
      }
    case RECEIVE_KINTO_BLOCK:
      return {
        ...state,
        selectedKintoBlockId: action.id
      }
    case SELECT_ENVIRONMENT:
      return {
        ...state,
        selectedEnvironmentId: action.id
      }
    case SELECT_ENVIRONMENT_RELEASE:
      return {
        ...state,
        selectedReleaseVersion: action.id
      }
    case SELECT_KINTOAPP:
      return {
        ...state,
        selectedKintoAppId: action.id
      }
    case KINTO_APP_ENVIRONMENT_LOG_UPDATE:
      return {
        ...state,
        selectedKintoAppId: action.id,
        selectedEnvironmentId: action.envId,
        selectedReleaseVersion: action.releaseVersion
      }
    case SELECT_BREADCRUMB_WORKSPACE:
      return {
        ...state,
        selectedEditingWorkspaceId: action.id
      }
    case actionTypes.CHANGE:
    case actionTypes.ARRAY_REMOVE:
    case actionTypes.ARRAY_PUSH:
      if (
        forms[state.activePage] &&
        forms[state.activePage].formName === action.meta.form
      ) {
        return {
          ...state,
          canSave: true,
          scrollToError: false
        }
      }
      return state
    case actionTypes.SET_SUBMIT_FAILED:
      if (
        forms[state.activePage] &&
        forms[state.activePage].formName === action.meta.form
      ) {
        return {
          ...state,
          scrollToError: true
        }
      }
      return state
    case LOCATION_CHANGE:
      const url = action.payload.pathname
      const isDashboard = !url.startsWith('/app/market')
      const activePage = getActivePageKey(url, isDashboard)
      return {
        ...state,
        canSave: false,
        scrollToError: false,
        activePage,
        isDashboard
      }
    case FORM_SUBMITTED:
      return {
        ...state,
        canSave: false
      }
    case SHOW_NOTIFICATION:
      return {
        ...state,
        notification: {
          type: action.notificationType,
          message: action.message,
          isShown: true
        }
      }
    case CLOSE_NOTIFICATION:
      return {
        ...state,
        notification: {
          isShown: false
        }
      }
    case SHOW_LOADING_SPINNER:
      return {
        ...state,
        loadingSpinner: {
          isShown: true,
          message: action.message
        }
      }
    case HIDE_LOADING_SPINNER:
      return {
        ...state,
        loadingSpinner: {
          isShown: false
        }
      }
    default:
      return state
  }
}
