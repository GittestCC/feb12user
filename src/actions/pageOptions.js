export const FORM_SUBMITTED = 'FORM_SUBMITTED'
export const SELECT_ENVIRONMENT = 'SELECT_ENVIRONMENT'

export const formSubmitted = () => ({ type: FORM_SUBMITTED })

export const environmentSelect = id => ({ type: SELECT_ENVIRONMENT, id })
