import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
import { createVersionKintoBlock } from '../../../actions/kintoBlocks'
import { getVersionAsText } from '../../../helpers/versionHelper'
import VersionCreateModalContainer from '../../../components/dashboard/ui/VersionCreateModal'

const selector = formValueSelector('versionCreate')

function mapStateToProps(state, { isOpen, title, baseVersions }) {
  let submitLabel = 'Create'
  const versionText = getVersionAsText(selector(state, 'versionData'))
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
      return dispatch(createVersionKintoBlock(id, data)).then(() => {
        if (!disableCloseOnSubmit) onClose()
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  VersionCreateModalContainer
)
