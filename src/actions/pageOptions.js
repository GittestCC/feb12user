export const FORM_SUBMITTED = 'FORM_SUBMITTED'
export const SELECT_ENVIRONMENT = 'SELECT_ENVIRONMENT'
export const SELECT_BREADCRUMB_WORKSPACE = 'SELECT_BREADCRUMB_WORKSPACE'

export const formSubmitted = () => ({ type: FORM_SUBMITTED })

export const environmentSelect = id => ({ type: SELECT_ENVIRONMENT, id })

export const workspaceBreadcrumbSelect = id => ({
  type: SELECT_BREADCRUMB_WORKSPACE,
  id
})
