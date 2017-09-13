import { connect } from 'react-redux'
import { submit } from 'redux-form'
import GlobalSaveBar from '../../components/app/GlobalSaveBar'
import forms from '../../constants/forms'

function mapStateToProps(state) {
  const { activePage, canSave } = state.pageOptions
  let form = forms[activePage]
  let isShown = canSave
  if (!form) {
    isShown = false
  }
  form = form || {}
  return {
    isShown,
    formName: form.formName,
    submitLabel: form.submitLabel
  }
}

function mergeProps(stateProps, dispatchProps) {
  return {
    ...stateProps,
    onSubmit: () => {
      dispatchProps.submit(stateProps.formName)
    }
  }
}

export default connect(mapStateToProps, { submit }, mergeProps)(GlobalSaveBar)
