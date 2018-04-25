import { connect } from 'react-redux'
import {
  getVersionAsText,
  textToObject
} from '../../../../helpers/versionHelper'
import { TAG } from '../../../../constants/version'
import { createKintoBlockTag } from '../../../../actions/kintoBlocks'
import KintoBlockCreateTagModal from '../../../../components/dashboard/kintoBlocks/kintoBlockManage/KintoBlockCreateTagModal'

function mapStateToProps(state, { kintoBlock }) {
  const versions = kintoBlock.versions.filter(v => v.type === TAG)
  let editedVersion = null
  if (versions.length) {
    const lastTag = versions[versions.length - 1].name
    editedVersion = textToObject(lastTag)
    editedVersion.revision += 1
  }
  return {
    initialValues: {
      version: editedVersion
    }
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(
  KintoBlockCreateTagModal
)
