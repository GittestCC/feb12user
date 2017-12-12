import { connect } from 'react-redux'
import { getVersionAsText } from '../../../../helpers/versionHelper'
import { createKintoBlockTag } from '../../../../actions/kintoBlocks'
import KintoBlockCreateTagModal from '../../../../components/dashboard/kintoBlocks/kintoBlockManage/KintoBlockCreateTagModal'

function mapDispatchToProps(dispatch, { kintoBlock, onClose }) {
  return {
    onSubmit: data => {
      const result = {
        tag: getVersionAsText(data.version),
        notes: data.notes,
        commitSha: kintoBlock.activeBuild.commitSha
      }
      dispatch(
        createKintoBlockTag(kintoBlock.id, kintoBlock.version.name, result)
      ).then(onClose)
    }
  }
}

export default connect(undefined, mapDispatchToProps)(KintoBlockCreateTagModal)
