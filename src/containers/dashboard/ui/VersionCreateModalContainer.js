import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
import { createVersionKintoBlock } from '../../../actions/kintoBlocks'
import { createVersionKintoApp } from '../../../actions/kintoApps'
import { getVersionAsText } from '../../../helpers/versionHelper'
import VersionCreateModal from '../../../components/dashboard/ui/VersionCreateModal'

const selector = formValueSelector('versionCreate')

function mapStateToProps(state, { isOpen, title, baseVersions }) {
  let submitLabel = 'Create'
  const versionText = getVersionAsText(selector(state, 'version'))
  if (versionText) {
    submitLabel += ` ${versionText}`
  }
  return {
    isOpen,
    title: `Create New Version - ${title}`,
    submitLabel,
    baseVersions
  }
}

function mapDispatchToProps(
  dispatch,
  { onClose, id, isKintoBlock, disableCloseOnSubmit }
) {
  return {
    onClose,
    onSubmit: data => {
      const action = isKintoBlock
        ? createVersionKintoBlock
        : createVersionKintoApp
      return dispatch(action(id, data)).then(r => {
        if (!disableCloseOnSubmit) onClose()
        return
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  VersionCreateModalContainer
)
