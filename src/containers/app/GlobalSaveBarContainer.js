import { connect } from 'react-redux'
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
    formId: form.formId,
    submitLabel: form.submitLabel
  }
}

export default connect(mapStateToProps)(GlobalSaveBar)
