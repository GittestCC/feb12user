export const FORM_SUBMITTED = 'FORM_SUBMITTED'
export const SELECT_ENVIRONMENT = 'SELECT_ENVIRONMENT'
export const SELECT_ENVIRONMENT_RELEASE = 'SELECT_ENVIRONMENT_RELEASE'
export const SELECT_KINTOAPP = 'SELECT_KINTOAPP'
export const SELECT_BREADCRUMB_WORKSPACE = 'SELECT_BREADCRUMB_WORKSPACE'
export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION'
export const CLOSE_NOTIFICATION = 'CLOSE_NOTIFICATION'
export const SHOW_LOADING_SPINNER = 'SHOW_LOADING_SPINNER'
export const HIDE_LOADING_SPINNER = 'HIDE_LOADING_SPINNER'
export const SHOW_ERROR_PAGE = 'SHOW_ERROR_PAGE'

export const showErrorPage = errorType => ({ type: SHOW_ERROR_PAGE, errorType })

export const formSubmitted = () => ({ type: FORM_SUBMITTED })

export const environmentSelect = id => ({ type: SELECT_ENVIRONMENT, id })

export const releaseVersionSelect = id => ({
  type: SELECT_ENVIRONMENT_RELEASE,
  id
})

export const kintoAppSelect = id => ({
  type: SELECT_KINTOAPP,
  id
})

export const workspaceBreadcrumbSelect = id => ({
  type: SELECT_BREADCRUMB_WORKSPACE,
  id
})

export const showNotification = (type, message) => ({
  type: SHOW_NOTIFICATION,
  notificationType: type,
  message
})

export const closeNotificaton = () => ({
  type: CLOSE_NOTIFICATION
})

export const showSpinner = message => {
  if (!message) {
    message = ['hello world', 'KintoHub']
  }

  return {
    type: SHOW_LOADING_SPINNER,
    message
  }
}

export const hideSpinner = () => ({
  type: HIDE_LOADING_SPINNER
})
